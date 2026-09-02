// Body condition score history, stored in the browser only.
//
// Weight work is a multi-month project and the tool was a one-shot reading, so a
// score taken in September was gone by the time the October one was taken. This
// keeps a short local log so the trend is visible.
//
// Nothing here leaves the device: no account, no API, no analytics payload. That
// is also why the pure functions live in this file with no imports - the storage
// wrapper is the only part that touches the browser, and scripts/check-tools.mjs
// exercises the rest directly.

export const BCS_HISTORY_KEY = "kaisrun.bcs.history.v1";

/** Enough to show a trend across a season without turning into a health record. */
export const MAX_ENTRIES = 12;

export type BcsEntry = {
  /** YYYY-MM-DD, local date. */
  date: string;
  bcs: number;
};

export type BcsTrend =
  | { status: "empty" }
  | { status: "first"; latest: BcsEntry }
  | {
      status: "trend";
      first: BcsEntry;
      latest: BcsEntry;
      /** Positive means the score went up (heavier). */
      delta: number;
      daysApart: number;
      headline: string;
      detail: string;
    };

/**
 * Add a reading. Two scores on the same day is a correction, not a data point,
 * so the later one replaces the earlier. Entries stay sorted oldest first and
 * the log is capped from the front.
 */
export function addEntry(
  history: BcsEntry[],
  entry: BcsEntry,
  max: number = MAX_ENTRIES,
): BcsEntry[] {
  const withoutSameDay = history.filter((e) => e.date !== entry.date);
  const next = [...withoutSameDay, entry].sort((a, b) => (a.date < b.date ? -1 : 1));
  return next.slice(Math.max(0, next.length - max));
}

function daysBetween(aISO: string, bISO: string): number {
  const a = Date.parse(`${aISO}T00:00:00Z`);
  const b = Date.parse(`${bISO}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

/**
 * Read the log as a sentence. Direction is reported without a verdict attached -
 * a score moving from 7 toward 5 is progress, and a score moving from 3 toward 5
 * is also progress, so the copy describes the movement and leaves the judgment
 * to the band text and the owner's vet.
 */
export function summarize(history: BcsEntry[]): BcsTrend {
  if (history.length === 0) return { status: "empty" };
  const latest = history[history.length - 1];
  if (history.length === 1) return { status: "first", latest };

  const first = history[0];
  const delta = Math.round((latest.bcs - first.bcs) * 2) / 2;
  const daysApart = daysBetween(first.date, latest.date);
  const weeks = Math.max(1, Math.round(daysApart / 7));
  const span = daysApart >= 7 ? `${weeks} week${weeks === 1 ? "" : "s"}` : `${daysApart} days`;

  if (delta === 0) {
    return {
      status: "trend",
      first,
      latest,
      delta,
      daysApart,
      headline: `Holding at ${latest.bcs} over ${span}`,
      detail:
        "No change across your readings. Body condition moves slowly, so a flat stretch is normal - it is only worth acting on if it holds across a couple of months and the score is outside the ideal range.",
    };
  }

  const direction = delta > 0 ? "up" : "down";
  const size = Math.abs(delta);
  return {
    status: "trend",
    first,
    latest,
    delta,
    daysApart,
    headline: `${first.bcs} to ${latest.bcs} over ${span}`,
    detail: `The score has moved ${direction} by ${size} across ${history.length} readings. One point of body condition score is roughly ten percent of body weight, so this is a real change rather than measurement noise. Bring the numbers to your veterinarian if you are working on a weight plan - they are more useful than a single reading.`,
  };
}

/** Today as YYYY-MM-DD in the viewer's own timezone. en-CA formats as ISO. */
export function todayISO(now: Date = new Date()): string {
  return now.toLocaleDateString("en-CA");
}

/**
 * localStorage can throw outright, not only return null: private windows,
 * blocked site data, and embedded contexts all do it. Every access is wrapped and
 * every failure degrades to "no history" rather than breaking the tool.
 */
export function loadHistory(): BcsEntry[] {
  try {
    const raw = window.localStorage.getItem(BCS_HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is BcsEntry =>
        !!e &&
        typeof e === "object" &&
        typeof (e as BcsEntry).date === "string" &&
        typeof (e as BcsEntry).bcs === "number",
    );
  } catch {
    return [];
  }
}

export function saveHistory(history: BcsEntry[]): void {
  try {
    window.localStorage.setItem(BCS_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Storage unavailable. The reading on screen is still correct.
  }
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(BCS_HISTORY_KEY);
  } catch {
    // Nothing to do.
  }
}
