#!/usr/bin/env node
/**
 * Tool logic check. Run: npm run check:tools
 *
 * Guards the hourly logic behind the day strip, and pins down one thing that
 * surprised us: the walkable boundary is set by the PAVEMENT rule, not the heat
 * index. Sun pavement is air + 50F, so it crosses the 125F paw-burn threshold at
 * exactly 75F air - below any temperature where the heat index starts to bite.
 *
 * That means the dog's risk modifiers shade every hour one band stricter but
 * never move the walk/no-walk line, and that is correct: a flat-faced dog is
 * worse at shedding heat, but hot asphalt burns every dog's pads the same. The
 * assertions below lock in both behaviors so a future change to either threshold
 * has to be deliberate.
 *
 * ponytail: no test runner. Node's built-in type stripping imports the TS module
 * directly (Node 22.6+); on older Node it skips with a message rather than failing
 * the developer's day.
 */
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const load = (rel) => import(pathToFileURL(path.join(process.cwd(), rel)).href);

let verdictModule;
let exerciseModule;
let bcsModule;
try {
  verdictModule = await load('lib/heat/verdict.ts');
  exerciseModule = await load('lib/exercise/gap.ts');
  bcsModule = await load('lib/bcs/history.ts');
} catch (err) {
  console.log('Skipped: this Node cannot import TypeScript directly.');
  console.log(`Run with Node 22.6+ (current ${process.version}), or: node --experimental-strip-types scripts/check-tools.mjs`);
  console.log(`  (${err.message})`);
  process.exit(0);
}

const { hourlyBands, safeWindows, heatIndexF, pavementEstimateF } = verdictModule;

/** A Gulf Coast summer day: cool at dawn, brutal at 2pm, cooling after 7pm. */
const day = [58, 60, 62, 64, 66, 68, 72, 76, 80, 84, 88, 91, 93, 94, 94, 93, 90, 86, 82, 78, 74, 70, 66, 62].map(
  (tempF, hour) => ({
    hourISO: `2026-07-15T${String(hour).padStart(2, '0')}:00`,
    tempF,
    humidity: 70,
  }),
);

const plain = hourlyBands(day);
const atRisk = hourlyBands(day, { brachycephalic: true });

const plainWalkable = plain.filter((h) => h.walkable).length;
const atRiskWalkable = atRisk.filter((h) => h.walkable).length;

console.log(`fit dog:      ${plainWalkable} of 24 hours walkable`);
console.log(`flat-faced:   ${atRiskWalkable} of 24 hours walkable`);
console.log(`window (fit): ${JSON.stringify(safeWindows(day))}`);
console.log(`window (mod): ${JSON.stringify(safeWindows(day, { brachycephalic: true }))}`);

assert.equal(plain.length, 24, 'one band per forecast hour');
assert.ok(plainWalkable > 0 && plainWalkable < 24, 'a summer day should be mixed, not all-or-nothing');

// Modifiers reach the strip: at least one hour reads strictly worse for an
// at-risk dog. Before hourlyBands() the modifier checkboxes never touched the
// day view at all.
const stricter = plain.filter((h, i) => h.band !== atRisk[i].band).length;
assert.ok(stricter > 0, 'modifiers must change at least one hour band on the strip');

// ...but they do not move the walk/no-walk line, because pavement binds first.
assert.equal(
  atRiskWalkable,
  plainWalkable,
  'pavement sets the walkable boundary, so modifiers shade bands without moving it',
);

// The boundary itself: 75F air is the first unwalkable temperature, from
// pavementEstimateF(75, "sun") === 125 hitting the paw-burn threshold.
const walkableAt = (tempF) =>
  hourlyBands([{ hourISO: '2026-07-15T12:00', tempF, humidity: 70 }])[0].walkable;
assert.equal(walkableAt(74), true, '74F air is still walkable');
assert.equal(walkableAt(75), false, '75F air crosses the 125F sun-pavement threshold');

assert.equal(
  safeWindows(day).morningBefore,
  plain.find((h) => !h.walkable)?.label,
  'the morning cutoff must be the first unwalkable hour',
);

// The old rule, preserved: with no modifiers, walkable means heat index under 86
// and sun pavement under 125F. Any drift here changes every published verdict.
for (const h of plain) {
  const legacy = heatIndexF(day[Number(h.hourISO.slice(11, 13))].tempF, 70) < 86 && h.pavementSunF < 125;
  assert.equal(h.walkable, legacy, `hour ${h.label} drifted from the original safe-window rule`);
}
assert.equal(pavementEstimateF(77, 'sun'), 127, 'Berens-based sun estimate is air + 50F');

// -------------------------------------------------------------------------
// Exercise calculator: the deficit readout
// -------------------------------------------------------------------------
const { exerciseGap } = exerciseModule;
const target = [60, 90];

const short = exerciseGap(30, target);
assert.equal(short.status, 'short');
assert.equal(short.dailyGapMin, 30, 'gap is measured against the LOW end of the range');
assert.equal(short.weeklyGapMin, 210, 'weekly figure is the daily gap times seven');

// A dog at the bottom of its range is covered, not short. Off-by-one here would
// tell thousands of owners they are failing when they are not.
assert.equal(exerciseGap(60, target).status, 'on-target');
assert.equal(exerciseGap(59, target).status, 'short');
assert.equal(exerciseGap(90, target).status, 'on-target');
assert.equal(exerciseGap(91, target).status, 'above');

assert.equal(exerciseGap(0, target).dailyGapMin, 60, 'zero minutes owes the whole low-end target');
assert.equal(exerciseGap(-5, target).currentMin, 0, 'negative input clamps to zero');
for (const g of [exerciseGap(30, target), exerciseGap(60, target), exerciseGap(200, target)]) {
  assert.ok(g.headline && g.detail, 'every status renders copy');
  assert.ok(!g.detail.includes('!'), 'no exclamation points in tool copy');
  assert.ok(!g.detail.includes('\u2014'), 'no em dashes in tool copy');
}

console.log(`\ngap at 30 min:  ${short.headline} (${short.weeklyGapMin} min/week)`);
// -------------------------------------------------------------------------
// Body condition score: the saved-reading log
// -------------------------------------------------------------------------
const { addEntry, summarize, MAX_ENTRIES } = bcsModule;

// Same-day rescore is a correction, not a second data point.
const corrected = addEntry([{ date: '2026-09-01', bcs: 7 }], { date: '2026-09-01', bcs: 6 });
assert.deepEqual(corrected, [{ date: '2026-09-01', bcs: 6 }], 'same-day entry replaces, never appends');

// Out-of-order writes still produce a chronological log, because the trend
// summary reads position 0 and position n-1 as first and latest.
const outOfOrder = addEntry([{ date: '2026-10-01', bcs: 6 }], { date: '2026-09-01', bcs: 7 });
assert.deepEqual(
  outOfOrder.map((e) => e.date),
  ['2026-09-01', '2026-10-01'],
  'entries stay sorted oldest first',
);

// The cap drops the oldest, not the newest.
let capped = [];
for (let i = 1; i <= MAX_ENTRIES + 3; i++) {
  capped = addEntry(capped, { date: `2026-01-${String(i).padStart(2, '0')}`, bcs: 5 });
}
assert.equal(capped.length, MAX_ENTRIES, 'log is capped');
assert.equal(capped[capped.length - 1].date, `2026-01-${MAX_ENTRIES + 3}`, 'newest reading survives the cap');

assert.equal(summarize([]).status, 'empty');
assert.equal(summarize([{ date: '2026-09-01', bcs: 7 }]).status, 'first');

const losing = summarize([
  { date: '2026-09-01', bcs: 7 },
  { date: '2026-10-27', bcs: 6 },
]);
assert.equal(losing.status, 'trend');
assert.equal(losing.delta, -1, 'delta is latest minus first');
assert.ok(losing.headline.includes('8 weeks'), `span should read in weeks, got: ${losing.headline}`);

const flat = summarize([
  { date: '2026-09-01', bcs: 5 },
  { date: '2026-10-01', bcs: 5 },
]);
assert.equal(flat.delta, 0);
assert.ok(flat.headline.startsWith('Holding'), 'no change reads as holding, not as failure');

for (const t of [losing, flat]) {
  assert.ok(!t.detail.includes('!'), 'no exclamation points in tool copy');
  assert.ok(!t.detail.includes('\u2014'), 'no em dashes in tool copy');
}

console.log(`bcs trend:      ${losing.headline}`);
console.log('\nTool checks OK.');
