import {
  ADULT_BASELINE_MIN,
  DriveTier,
  getLifeStage,
  getTierForBreed,
} from "./targets";

export interface ComputeInput {
  breedName?: string;
  manualTier?: DriveTier;
  ageMonths: number;
  weightLb: number;
  activity: "sedentary" | "light" | "active";
  flags: {
    arthritis: boolean;
    overweight: boolean;
    brachycephalic: boolean;
    heartResp: boolean;
  };
}

export interface ExerciseSplit {
  structuredMin: [number, number];
  playMin: [number, number];
  enrichmentMin: [number, number];
}

export type DriveFlag = "walk-wont-cover-this" | "settled" | null;

export interface ComputeResult {
  dailyMin: [number, number];
  split: ExerciseSplit;
  weeklyShape: string;
  driveFlag: DriveFlag;
  mechanism: string;
  vetHumility: string;
  notes: string[];
}

function resolveTier(input: ComputeInput): DriveTier {
  if (input.breedName) {
    const found = getTierForBreed(input.breedName);
    if (found) return found;
  }
  return input.manualTier ?? "moderate";
}

// Split daily minutes into structured / play / enrichment by tier.
// high/working: structured gets the largest share; enrichment rises with drive; play is remainder.
// low: mostly play + light structured; enrichment minimal.
function buildSplit(
  daily: [number, number],
  tier: DriveTier
): ExerciseSplit {
  const [lo, hi] = daily;

  // Fractions [structured, play, enrichment] by tier
  const fractions: Record<DriveTier, [number, number, number]> = {
    low:      [0.30, 0.55, 0.15],
    moderate: [0.40, 0.40, 0.20],
    high:     [0.55, 0.25, 0.20],
    working:  [0.60, 0.15, 0.25],
  };
  const [sf, pf, ef] = fractions[tier];

  return {
    structuredMin:  [Math.round(lo * sf), Math.round(hi * sf)],
    playMin:        [Math.round(lo * pf), Math.round(hi * pf)],
    enrichmentMin:  [Math.round(lo * ef), Math.round(hi * ef)],
  };
}

function weeklyShapeText(
  tier: DriveTier,
  activity: ComputeInput["activity"],
  flags: ComputeInput["flags"]
): string {
  if (flags.arthritis || flags.heartResp) {
    return "Consistent low-intensity daily sessions; avoid back-to-back high-exertion days. Your vet sets the cadence.";
  }
  if (tier === "working" || tier === "high") {
    if (activity === "sedentary") {
      return "Ramp up over 3-4 weeks: add 5-10 minutes of structured work every 5-7 days until full target is reached.";
    }
    return "5-6 days of structured conditioning; 1 day of lighter self-paced activity. Rotate surfaces and intensity to prevent overuse.";
  }
  if (tier === "moderate") {
    return "5 days of mixed structured + play; 2 days lighter or pure enrichment (sniff walks, puzzle feeders).";
  }
  return "4-5 days of light activity; 2-3 days of rest or calm enrichment. Short, positive sessions beat marathon walks.";
}

export function computeTarget(input: ComputeInput): ComputeResult {
  const tier = resolveTier(input);
  const stage = getLifeStage(input.ageMonths);
  const notes: string[] = [];
  const vetHumility =
    "This is a starting estimate, not a veterinary prescription. For a dog with a health condition, your vet sets the ceiling.";

  let daily: [number, number];

  // --- life-stage overrides ---
  if (stage === "puppy") {
    // ponytail: UK Kennel Club "five minutes per month of age, up to twice daily" rule of thumb -
    //   widely cited, not a hard medical limit; framed conservatively for developing joints.
    const fiveMin = input.ageMonths * 5;
    daily = [Math.max(5, fiveMin - 5), fiveMin];
    notes.push(
      `Puppy growth plates are still developing. The widely cited guideline is roughly 5 minutes per month of age, up to twice daily - this is a rule of thumb, not a hard medical limit. Keep sessions short, low-impact, and on forgiving surfaces.`
    );
    notes.push(
      "Two short sessions (morning + evening) beat one long one for young dogs."
    );
  } else if (stage === "adolescent") {
    const [blo, bhi] = ADULT_BASELINE_MIN[tier];
    daily = [blo, bhi];
    notes.push(
      "Adolescent dogs (roughly 6-18 months) hit peak impulsivity before impulse control matures. A steady daily outlet keeps the teenage window manageable - consistency matters more than intensity."
    );
  } else if (stage === "senior") {
    const [blo, bhi] = ADULT_BASELINE_MIN[tier];
    // reduce intensity 20-30%, floor at [10, 20]
    daily = [Math.max(10, Math.round(blo * 0.75)), Math.max(20, Math.round(bhi * 0.75))];
    notes.push(
      "Senior dogs still need daily movement - never zero. Shift toward self-paced, low-impact activity (slatmill on a gentle angle, slow sniff walks, controlled leash work on soft ground)."
    );
    notes.push(
      "Watch for fatigue signals: lagging behind, excessive panting, reluctance to move. Shorten sessions before they become a struggle."
    );
  } else {
    // adult
    daily = [...ADULT_BASELINE_MIN[tier]] as [number, number];
  }

  // --- activity modifier (applies to adult/adolescent/senior, not puppy) ---
  if (stage !== "puppy") {
    if (input.activity === "sedentary") {
      // Do not cut the number - instead explain gradual ramp
      notes.push(
        "Current activity level is sedentary. Don't jump to the full target on day one - ramp up over 3-4 weeks, adding a few minutes of structured work every 4-5 days. The body (and brain) adapt better with a gradual build."
      );
    }
    // active: baseline as-is (no adjustment needed)
  }

  // --- health flag overrides ---
  // These WIN over the numeric output and always surface vet humility.
  if (input.flags.heartResp) {
    notes.push(
      "Heart or respiratory condition detected. Do not begin any conditioning program without explicit veterinary clearance. Your vet will set both the ceiling and the format."
    );
  }

  if (input.flags.arthritis) {
    // Clamp to low-impact regardless of tier
    const arthrLo = Math.min(daily[0], 20);
    const arthrHi = Math.min(daily[1], 40);
    daily = [arthrLo, arthrHi];
    notes.push(
      "Arthritis flag active. Steady-state, low-impact movement beats high-impact bursts - think consistent gentle rhythm, not sprints. A slatmill set to a self-paced, low angle can be joint-friendly when introduced slowly. Your vet sets the ceiling on duration and intensity."
    );
  }

  if (input.flags.overweight) {
    // Conservative: shave 15% from top
    daily = [daily[0], Math.round(daily[1] * 0.85)];
    notes.push(
      "Overweight flag active. Build duration conservatively - joints and the cardiovascular system are under additional load. Route specifics on diet and body condition to your vet and veterinary nutritionist."
    );
  }

  if (input.flags.brachycephalic) {
    // Hard heat caution + shorten hi end
    daily = [daily[0], Math.round(daily[1] * 0.80)];
    notes.push(
      "Brachycephalic breed: airway anatomy limits heat and exertion tolerance hard. Exercise in early morning or evening only. Watch for open-mouth breathing, slowing pace, or any blue tinge to gums - stop immediately if any appear. Cross-reference the heat safety tool before any outdoor session."
    );
  }

  const split = buildSplit(daily, tier);

  const driveFlag: DriveFlag =
    tier === "high" || tier === "working"
      ? "walk-wont-cover-this"
      : tier === "moderate" && input.activity === "sedentary"
      ? "walk-wont-cover-this"
      : tier === "low"
      ? "settled"
      : null;

  const mechanism =
    "Steady-state structured work - a consistent, rhythmic physical load - lowers a dog's resting arousal over time. That means the dog handles everyday life more calmly, not because the energy is gone but because the nervous system has learned a lower baseline. Chaotic high-arousal play can wind a dog up rather than drain it; structured conditioning does the opposite.";

  const weeklyShape = weeklyShapeText(tier, input.activity, input.flags);

  return {
    dailyMin: daily,
    split,
    weeklyShape,
    driveFlag,
    mechanism,
    vetHumility,
    notes,
  };
}
