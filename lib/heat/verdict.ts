// Pure heat-safety math for the walk/no-walk tool. No network, no side effects —
// every export here is unit-testable without a fetch.

export type Exposure = "sun" | "shade";

export type Band = "safe" | "watch" | "caution" | "dangerous" | "do-not-walk";

export type Modifiers = {
  brachycephalic?: boolean;
  senior?: boolean;
  darkCoat?: boolean;
  overweight?: boolean;
};

export type Verdict = {
  band: Band;
  headline: string;
  reason: string;
  pawBurnRisk: boolean;
};

export type HourSample = { hourISO: string; tempF: number; humidity: number };

// NOAA/NWS heat index (Rothfusz regression).
// https://www.wpc.ncep.noaa.gov/html/heatindex_equation.shtml
export function heatIndexF(tempF: number, humidity: number): number {
  if (tempF < 80) return tempF;
  if (humidity < 40) return Math.round(tempF);

  const T = tempF;
  const R = humidity;
  let hi =
    -42.379 +
    2.04901523 * T +
    10.14333127 * R -
    0.22475541 * T * R -
    0.00683783 * T * T -
    0.05481717 * R * R +
    0.00122874 * T * T * R +
    0.00085282 * T * R * R -
    0.00000199 * T * T * R * R;

  // Low-humidity / high-humidity corrections per NWS.
  if (R < 13 && T >= 80 && T <= 112) {
    hi -= ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
  } else if (R > 85 && T >= 80 && T <= 87) {
    hi += ((R - 85) / 10) * ((87 - T) / 5);
  }

  return Math.round(hi);
}

// Berens 1970 JAMA: 77F air -> 125F asphalt in direct sun (~+48F); asphalt
// commonly runs 40-60F over air temp in full sun. Shade is far milder.
export const PAVEMENT_SOURCE =
  "Surface estimate based on Berens (1970, JAMA): 77F air reached 125F asphalt in direct sun. Asphalt commonly runs 40-60F above air temperature in full sun.";

export function pavementEstimateF(airTempF: number, exposure: Exposure): number {
  const delta = exposure === "sun" ? 50 : 12;
  return Math.round(airTempF + delta);
}

// ponytail: fixed clock window, not solar elevation. The +50F sun delta is a
// full-sun figure; before mid-morning and after sunset asphalt is nowhere near
// it, and applying it to 2 AM made every Gulf Coast summer night "unwalkable".
// The end hour is late on purpose - asphalt holds heat until about sunset.
// Tune SUN_HOURS if dawn or dusk verdicts look wrong.
export const SUN_HOURS: [number, number] = [9, 20]; // local wall-clock hours, [start, end)

/** hourISO is local wall time, e.g. "2026-07-15T14:00". */
export function exposureAt(hourISO: string): Exposure {
  const hh = Number(hourISO.slice(11, 13));
  return hh >= SUN_HOURS[0] && hh < SUN_HOURS[1] ? "sun" : "shade";
}

const ORDER: Band[] = ["safe", "watch", "caution", "dangerous", "do-not-walk"];

function stricter(band: Band, steps = 1): Band {
  const i = ORDER.indexOf(band);
  return ORDER[Math.min(i + steps, ORDER.length - 1)];
}

function bandFromHeatIndex(hi: number): Band {
  if (hi <= 70) return "safe";
  if (hi <= 77) return "watch";
  if (hi <= 85) return "caution";
  if (hi <= 90) return "dangerous";
  return "do-not-walk";
}

const HEADLINES: Record<Band, string> = {
  safe: "Good to go",
  watch: "Walk with care",
  caution: "Caution - keep it short",
  dangerous: "Dangerous - high risk",
  "do-not-walk": "Do not walk",
};

const MODIFIER_REASONS: Record<keyof Modifiers, string> = {
  brachycephalic: "flat-faced dogs cool inefficiently",
  senior: "senior dogs handle heat poorly",
  darkCoat: "a dark coat absorbs more heat",
  overweight: "extra weight raises heat strain",
};

export function verdict(input: {
  heatIndexF: number;
  pavementSunF: number;
  modifiers?: Modifiers;
}): Verdict {
  const { heatIndexF: hi, pavementSunF, modifiers } = input;

  const hiBand = bandFromHeatIndex(hi);

  // Pavement override — surface can be lethal to paws even in mild air.
  let pavementBand: Band = "safe";
  const pawBurnRisk = pavementSunF >= 125;
  if (pavementSunF >= 140) pavementBand = "do-not-walk";
  else if (pavementSunF >= 125) pavementBand = "dangerous";

  // The binding constraint is whichever risk is worse.
  const pavementBinds = ORDER.indexOf(pavementBand) > ORDER.indexOf(hiBand);
  let band = pavementBinds ? pavementBand : hiBand;

  let reason = pavementBinds
    ? `Pavement near ${pavementSunF}F in sun - paw burns from the hot surface.`
    : hi <= 70
      ? "Heat index is comfortable for a normal-length walk."
      : `Heat index ${hi}F - heatstroke risk rises the longer you stay out.`;

  // Modifiers: at most one step stricter total, regardless of how many apply.
  if (modifiers) {
    const firstKey = (Object.keys(MODIFIER_REASONS) as (keyof Modifiers)[]).find(
      (k) => modifiers[k],
    );
    if (firstKey) {
      band = stricter(band, 1);
      reason += ` Bumped one step stricter - ${MODIFIER_REASONS[firstKey]}.`;
    }
  }

  return { band, headline: HEADLINES[band], reason, pawBurnRisk };
}

function formatHour(hourISO: string): string {
  // hourISO is local America/Chicago wall time, e.g. "2026-06-22T09:00".
  const hh = Number(hourISO.slice(11, 13));
  const period = hh < 12 ? "AM" : "PM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12} ${period}`;
}

export type HourBand = {
  hourISO: string;
  /** "7 AM" - already localized for display. */
  label: string;
  band: Band;
  heatIndexF: number;
  /** Pavement estimate for this hour: full-sun delta inside SUN_HOURS, shade delta outside. */
  pavementSunF: number;
  exposure: Exposure;
  walkable: boolean;
};

/**
 * Run the full verdict for every forecast hour, modifiers included, so the
 * day-long picture answers the same question the headline card answers.
 *
 * This is the whole reason the hourly view exists: a flat-faced senior dog does
 * not get the same safe window as a fit adult, and until this function existed
 * the window math ignored the modifier checkboxes entirely.
 */
export function hourlyBands(
  hourly: HourSample[],
  modifiers?: Modifiers,
): HourBand[] {
  return hourly.map((h) => {
    const hi = heatIndexF(h.tempF, h.humidity);
    const exposure = exposureAt(h.hourISO);
    const pavementSunF = pavementEstimateF(h.tempF, exposure);
    const v = verdict({ heatIndexF: hi, pavementSunF, modifiers });
    return {
      hourISO: h.hourISO,
      label: formatHour(h.hourISO),
      band: v.band,
      heatIndexF: hi,
      pavementSunF,
      exposure,
      walkable: ORDER.indexOf(v.band) <= ORDER.indexOf("caution"),
    };
  });
}

/**
 * Contiguous hours safe to walk. With no modifiers this is identical to the old
 * "heat index < 86 AND sun pavement < 125F" rule, because a band at or below
 * "caution" means exactly that. Passing modifiers narrows the window by the same
 * one step the headline verdict uses.
 */
export function safeWindows(
  hourly: HourSample[],
  modifiers?: Modifiers,
): {
  morningBefore?: string;
  eveningAfter?: string;
  allDayUnsafe?: boolean;
  allDaySafe?: boolean;
} {
  const safe = hourlyBands(hourly, modifiers).map((h) => h.walkable);

  if (safe.every((s) => !s)) return { allDayUnsafe: true };
  if (safe.every(Boolean)) return { allDaySafe: true };

  const result: { morningBefore?: string; eveningAfter?: string } = {};

  // Leading safe run -> walk before the first unsafe hour.
  let lead = 0;
  while (lead < safe.length && safe[lead]) lead++;
  if (lead > 0 && lead < safe.length) {
    result.morningBefore = formatHour(hourly[lead].hourISO);
  }

  // Trailing safe run -> walk after it becomes safe again.
  let trail = safe.length - 1;
  while (trail >= 0 && safe[trail]) trail--;
  const trailStart = trail + 1;
  if (trailStart > 0 && trailStart < safe.length) {
    result.eveningAfter = formatHour(hourly[trailStart].hourISO);
  }

  return result;
}

/**
 * Groups hourly samples by local calendar date ("YYYY-MM-DD" prefix of hourISO),
 * in order. The API returns today + tomorrow (forecast_days=2); every per-day
 * helper here (safeWindows, hourlyBands) expects one day at a time.
 */
export function splitDays(hourly: HourSample[]): { date: string; hours: HourSample[] }[] {
  const out: { date: string; hours: HourSample[] }[] = [];
  for (const h of hourly) {
    const date = h.hourISO.slice(0, 10);
    const last = out[out.length - 1];
    if (last && last.date === date) last.hours.push(h);
    else out.push({ date, hours: [h] });
  }
  return out;
}
