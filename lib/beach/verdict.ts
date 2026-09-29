/**
 * Pure verdict logic for the Dog Beach Checker. No I/O, no path aliases, type-only
 * imports, so scripts/check-tools.mjs can import it with Node's type stripping.
 *
 * All clock math is America/Chicago wall time (every spot in the checker is Central).
 * A "window" is a span of wall-clock minutes on one calendar day, [start, end).
 * Overnight rules (Walton 3:30 PM to 8:30 AM) are split at midnight and merged back
 * when we report the next legal window.
 */
import type { HoursRule, Spot } from './rules';

export type BeachVerdict =
  | 'allowed'
  | 'allowed-window'
  | 'closed-now'
  | 'trails-only'
  | 'not-allowed'
  | 'unverified';

export const VERDICT_CHIP: Record<BeachVerdict, string> = {
  allowed: 'Dogs allowed now',
  'allowed-window': 'Allowed with a Walton permit, 3:30 PM to 8:30 AM, leashed',
  'closed-now': 'Allowed here, but not at this hour',
  'trails-only': 'Not on the sand - leashed on trails is OK',
  'not-allowed': 'Dogs not allowed',
  unverified: 'No official rule found - check posted signs',
};

/** Chicago wall clock. month is 1-12, minutes is minutes after local midnight. */
export type Wall = { y: number; m: number; d: number; minutes: number };

export type NextWindow = {
  /** e.g. "today 3:30 PM", "tomorrow 7:00 AM", "Sat, Jan 10 6:48 AM" */
  startLabel: string;
  endLabel: string;
  /** Minutes from `at` until the window opens. */
  minutesUntil: number;
};

export type VerdictResult = {
  verdict: BeachVerdict;
  reason: string;
  /** Today's legal hours in plain words, when the spot has hours. */
  todayHours?: string;
  /** Only set for closed-now: when the dog is next legal here. */
  nextLegalWindow?: NextWindow;
  /** When a legal window closes, if the dog is legal right now under hours. */
  closesAt?: string;
  /** Spot ids, nearest first. Empty when the spot itself is legal now. */
  alternatives: string[];
};

const TZ = 'America/Chicago';
const DAY = 1440;

// ---------------------------------------------------------------------------
// Time helpers
// ---------------------------------------------------------------------------

export function wallFromDate(date: Date): Wall {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { y: get('year'), m: get('month'), d: get('day'), minutes: get('hour') * 60 + get('minute') };
}

/** Parses a datetime-local value ("2027-01-10T07:00") as Chicago wall time. */
export function wallFromLocalInput(value: string): Wall | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!m) return null;
  return { y: +m[1], m: +m[2], d: +m[3], minutes: +m[4] * 60 + +m[5] };
}

/** Formats a Wall back into a datetime-local value. */
export function wallToLocalInput(w: Wall): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${w.y}-${p(w.m)}-${p(w.d)}T${p(Math.floor(w.minutes / 60))}:${p(w.minutes % 60)}`;
}

function addDays(w: Wall, days: number): Wall {
  const t = new Date(Date.UTC(w.y, w.m - 1, w.d + days));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate(), minutes: w.minutes };
}

/** Chicago UTC offset in minutes for a calendar date (-300 CDT, -360 CST), taken at local noon. */
function chicagoOffsetMinutes(y: number, m: number, d: number): number {
  const probe = new Date(Date.UTC(y, m - 1, d, 18, 0)); // ~noon Chicago either way
  const w = wallFromDate(probe);
  const asUtc = Date.UTC(w.y, w.m - 1, w.d, Math.floor(w.minutes / 60), w.minutes % 60);
  return Math.round((asUtc - probe.getTime()) / 60000);
}

export function formatClock(minutes: number): string {
  const mm = ((minutes % DAY) + DAY) % DAY;
  const h = Math.floor(mm / 60);
  const min = mm % 60;
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, '0')} ${period}`;
}

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dayLabel(base: Wall, target: Wall): string {
  const diff = Math.round(
    (Date.UTC(target.y, target.m - 1, target.d) - Date.UTC(base.y, base.m - 1, base.d)) / 86400000,
  );
  if (diff === 0) return 'today';
  if (diff === 1) return 'tomorrow';
  const dow = new Date(Date.UTC(target.y, target.m - 1, target.d)).getUTCDay();
  return `${DOW[dow]}, ${MON[target.m - 1]} ${target.d}`;
}

// ---------------------------------------------------------------------------
// Solar calc (NOAA general solar position equations). Accurate to a minute or
// two, which is plenty for "sunrise to sunset" park hours. No API.
// ---------------------------------------------------------------------------

/** Sunrise and sunset in Chicago wall minutes for a date and location. */
export function sunTimes(y: number, m: number, d: number, lat: number, lon: number): { sunrise: number; sunset: number } {
  const start = Date.UTC(y, 0, 1);
  const doy = Math.round((Date.UTC(y, m - 1, d) - start) / 86400000) + 1;
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const gamma = ((2 * Math.PI) / (isLeap ? 366 : 365)) * (doy - 1);
  const eqtime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);
  const latR = (lat * Math.PI) / 180;
  const zenith = (90.833 * Math.PI) / 180;
  const cosHa = Math.cos(zenith) / (Math.cos(latR) * Math.cos(decl)) - Math.tan(latR) * Math.tan(decl);
  const ha = (Math.acos(Math.min(1, Math.max(-1, cosHa))) * 180) / Math.PI;
  const offset = chicagoOffsetMinutes(y, m, d);
  const sunriseUtc = 720 - 4 * (lon + ha) - eqtime;
  const sunsetUtc = 720 - 4 * (lon - ha) - eqtime;
  return { sunrise: Math.round(sunriseUtc + offset), sunset: Math.round(sunsetUtc + offset) };
}

// ---------------------------------------------------------------------------
// Windows
// ---------------------------------------------------------------------------

function monthApplies(rule: HoursRule, month: number): boolean {
  if (!rule.months) return true;
  const [a, b] = rule.months;
  return a <= b ? month >= a && month <= b : month >= a || month <= b;
}

function resolvePoint(point: string, sun: { sunrise: number; sunset: number }): number {
  if (point === 'sunrise') return sun.sunrise;
  if (point === 'sunset') return sun.sunset;
  const [h, mm] = point.split(':').map(Number);
  return h * 60 + mm;
}

/** Legal windows for one calendar day, in wall minutes. Spots with no hours are open all day. */
export function windowsForDay(spot: Spot, y: number, m: number, d: number): [number, number][] {
  const hours = spot.rule.hours;
  if (!hours || hours.length === 0) return [[0, DAY]];
  const sun = sunTimes(y, m, d, spot.lat, spot.lon);
  const out: [number, number][] = [];
  for (const rule of hours) {
    if (!monthApplies(rule, m)) continue;
    const from = resolvePoint(rule.from, sun);
    const to = resolvePoint(rule.to, sun);
    if (from < to) out.push([from, to]);
    else {
      // Overnight: split at midnight.
      out.push([0, to]);
      out.push([from, DAY]);
    }
  }
  return out.sort((a, b) => a[0] - b[0]);
}

function hoursLabel(spot: Spot, w: Wall): string | undefined {
  if (!spot.rule.hours || spot.rule.hours.length === 0) return undefined;
  const wins = windowsForDay(spot, w.y, w.m, w.d);
  if (wins.length === 0) return 'Closed all day';
  // Overnight rule: show as one span "3:30 PM to 8:30 AM".
  if (wins.length === 2 && wins[0][0] === 0 && wins[1][1] === DAY) {
    return `${formatClock(wins[1][0])} to ${formatClock(wins[0][1])} the next morning`;
  }
  return wins.map(([a, b]) => `${formatClock(a)} to ${formatClock(b)}`).join(', ');
}

/** Absolute minute index from the base day's midnight. */
type Span = [number, number];

function spansFrom(spot: Spot, base: Wall, days: number): Span[] {
  const spans: Span[] = [];
  for (let i = 0; i < days; i++) {
    const day = addDays(base, i);
    for (const [a, b] of windowsForDay(spot, day.y, day.m, day.d)) spans.push([i * DAY + a, i * DAY + b]);
  }
  // Merge touching spans (overnight rules meet at midnight).
  const merged: Span[] = [];
  for (const s of spans) {
    const last = merged.at(-1);
    if (last && s[0] <= last[1]) last[1] = Math.max(last[1], s[1]);
    else merged.push([...s]);
  }
  return merged;
}

function labelAbs(base: Wall, abs: number): string {
  const dayOffset = Math.floor(abs / DAY);
  const target = addDays(base, dayOffset);
  return `${dayLabel(base, target)} ${formatClock(abs - dayOffset * DAY)}`;
}

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------

export function verdictFor(spot: Spot, opts: { resident: boolean; at: Date | Wall }): VerdictResult {
  const w: Wall = opts.at instanceof Date ? wallFromDate(opts.at) : opts.at;
  const rule = spot.rule;
  const todayHours = hoursLabel(spot, w);

  if (rule.sand === 'unknown') {
    return {
      verdict: 'unverified',
      reason: `We found no official rule for ${spot.short}. Posted signs govern, and a closed beach nearby still means no dogs on that sand.`,
      alternatives: spot.alternatives,
    };
  }

  if (rule.sand === 'no') {
    if (rule.trails) {
      return {
        verdict: 'trails-only',
        reason: `${spot.jurisdiction} does not allow dogs on the beach here. Leashed dogs are fine off the sand${
          rule.leashFt ? `, on a leash of ${rule.leashFt} feet or less` : ''
        }.`,
        alternatives: spot.alternatives,
      };
    }
    return {
      verdict: 'not-allowed',
      reason: `${spot.jurisdiction} bans dogs on this sand for residents and visitors alike, leashed or not.`,
      alternatives: spot.alternatives,
    };
  }

  if (rule.sand === 'permit' && rule.residentOnly && !opts.resident) {
    return {
      verdict: 'not-allowed',
      reason:
        'Only Walton County property owners and permanent residents can get the dog beach permit. Visitors, including vacation renters, cannot bring a dog onto the sand at any hour.',
      todayHours,
      alternatives: spot.alternatives,
    };
  }

  // Hours-based: 'yes' spots, or 'permit' spots for a permit holder.
  const spans = spansFrom(spot, w, 9);
  const now = w.minutes;
  const current = spans.find(([a, b]) => now >= a && now < b);
  const permit = rule.sand === 'permit';

  if (current) {
    const closesAt = current[1] >= 9 * DAY || !spot.rule.hours?.length ? undefined : labelAbs(w, current[1]);
    return {
      verdict: permit ? 'allowed-window' : 'allowed',
      reason: permit
        ? 'With a current permit, a leashed dog under direct control is legal on the sand right now.'
        : spot.kind === 'dog-park'
          ? 'This is a legal dog park and it is open right now. Follow the posted park rules.'
          : `This is a designated dog beach and it is open right now${
              rule.leashFt ? ` - leash of ${rule.leashFt} feet or less, held at all times` : ''
            }.`,
      todayHours,
      closesAt,
      alternatives: [],
    };
  }

  const next = spans.find(([a]) => a > now);
  return {
    verdict: 'closed-now',
    reason: permit
      ? 'Your permit covers 3:30 PM to 8:30 AM only. Outside those hours the sand is closed to dogs, permit or not.'
      : 'Dogs are legal here, but not at this hour.',
    todayHours,
    nextLegalWindow: next
      ? { startLabel: labelAbs(w, next[0]), endLabel: labelAbs(w, next[1]), minutesUntil: next[0] - now }
      : undefined,
    alternatives: spot.alternatives,
  };
}

/** "2 h 10 m" style countdown. */
export function formatCountdown(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} m` : `${h} h`;
}
