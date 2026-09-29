/**
 * 7-day plan built from a ComputeResult. Pure and dependency-free (type-only import)
 * so scripts/check-tools.mjs can test it.
 *
 * Day shapes follow the weekly-shape text in compute.ts:
 *  - low-impact dogs (arthritis / heart-respiratory flags): every day low intensity,
 *    no back-to-back hard days - alternate "steady" and "easy".
 *  - working/high: 6 structured days + 1 lighter day.
 *  - moderate: 5 structured-plus-play days + 2 lighter enrichment days.
 *  - low: 4 light-activity days + 3 rest or calm-enrichment days.
 */
import type { ComputeResult } from './compute';

export type PlanTier = 'low' | 'moderate' | 'high' | 'working';

export type PlanDay = {
  day: string;
  kind: 'structured' | 'light' | 'rest';
  label: string;
  structuredMin: number;
  playMin: number;
  enrichmentMin: number;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mid = ([lo, hi]: [number, number]) => Math.round((lo + hi) / 2);

export function weeklyPlan(result: ComputeResult, opts: { tier: PlanTier; lowImpact: boolean }): PlanDay[] {
  const s = mid(result.split.structuredMin);
  const p = mid(result.split.playMin);
  const e = mid(result.split.enrichmentMin);

  const full = (day: string): PlanDay => ({
    day,
    kind: 'structured',
    label: 'Structured work + play',
    structuredMin: s,
    playMin: p,
    enrichmentMin: e,
  });
  const light = (day: string): PlanDay => ({
    day,
    kind: 'light',
    label: 'Lighter day: easy movement + enrichment',
    structuredMin: 0,
    playMin: Math.round(p * 0.75),
    enrichmentMin: e + Math.round(s * 0.25),
  });
  const rest = (day: string): PlanDay => ({
    day,
    kind: 'rest',
    label: 'Rest or calm enrichment',
    structuredMin: 0,
    playMin: Math.round(p * 0.5),
    enrichmentMin: e,
  });

  if (opts.lowImpact) {
    return DAYS.map((day, i) =>
      i % 2 === 0
        ? { ...full(day), label: 'Steady low-intensity session', structuredMin: Math.round(s * 0.8) }
        : { ...light(day), label: 'Easy day: short walk + enrichment' },
    );
  }

  // Which weekdays are lighter, spread out so hard days never run more than 3 in a row.
  const pattern: Record<PlanTier, ('S' | 'L' | 'R')[]> = {
    working: ['S', 'S', 'S', 'L', 'S', 'S', 'S'],
    high: ['S', 'S', 'S', 'L', 'S', 'S', 'S'],
    moderate: ['S', 'S', 'L', 'S', 'S', 'L', 'S'],
    low: ['S', 'R', 'S', 'R', 'S', 'S', 'R'],
  };
  return pattern[opts.tier].map((k, i) => (k === 'S' ? full(DAYS[i]) : k === 'L' ? light(DAYS[i]) : rest(DAYS[i])));
}

/** Total minutes for a day. */
export function dayTotal(d: PlanDay): number {
  return d.structuredMin + d.playMin + d.enrichmentMin;
}

/**
 * A client-side .ics with one weekly-repeating event per plan day, starting the
 * next Monday at `hour` local time. Floating time (no TZID) so it lands at that
 * wall-clock hour wherever the owner is.
 */
export function planToIcs(plan: PlanDay[], start: Date, hour = 7): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const monday = new Date(start);
  const shift = (8 - monday.getDay()) % 7 || 7; // next Monday, never today
  monday.setDate(monday.getDate() + shift);
  const stamp = `${start.getUTCFullYear()}${pad(start.getUTCMonth() + 1)}${pad(start.getUTCDate())}T000000Z`;
  const byday = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', "PRODID:-//Kai's Run//Exercise Plan//EN", 'CALSCALE:GREGORIAN'];
  plan.forEach((d, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dt = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hour)}0000`;
    const desc = `Structured ${d.structuredMin} min, play ${d.playMin} min, enrichment ${d.enrichmentMin} min. Plan from kaisrun.xyz/tools/dog-exercise-calculator/`;
    lines.push(
      'BEGIN:VEVENT',
      `UID:kaisrun-plan-${i}-${stamp}@kaisrun.xyz`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${dt}`,
      'DURATION:PT30M',
      `RRULE:FREQ=WEEKLY;BYDAY=${byday[i]}`,
      `SUMMARY:Dog plan - ${d.label} (${dayTotal(d)} min)`,
      `DESCRIPTION:${desc}`,
      'END:VEVENT',
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
