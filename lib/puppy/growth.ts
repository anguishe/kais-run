// Growth-plate-aware exercise ceilings for puppies.
//
// The tool this backs exists to correct one specific piece of folklore: the
// "five minutes per month of age, twice a day" rule. That rule is associated
// with UK Kennel Club and British Veterinary Association puppy materials and has
// been repeated for decades, but it is not a peer-reviewed threshold. It is a
// memorable summary of a real concern - repetitive loading of immature joints -
// and it gets misread as a cap on ALL movement, which is the opposite of what
// the evidence supports.
//
// The evidence that does exist points the other way on type and surface.
// Krontveit et al. (2012, American Journal of Veterinary Research 73:838-846)
// followed Newfoundlands, Labrador Retrievers, Leonbergers and Irish Wolfhounds
// in Norway and found that using stairs before three months of age was
// associated with INCREASED hip dysplasia risk, while daily off-leash exercise
// on soft, moderately uneven park terrain was associated with DECREASED risk.
//
// So this module returns two separate numbers: a ceiling on forced repetitive
// work, and an explicit statement that self-directed play on forgiving ground is
// not the thing being limited.
//
// No imports on purpose - scripts/check-tools.mjs exercises this directly.

export type SizeClass = "toy" | "small" | "medium" | "large" | "giant";

export type SizeProfile = {
  key: SizeClass;
  label: string;
  /** Estimated ADULT weight range in pounds. Upper bound of "giant" is open. */
  adultLb: [number, number];
  /**
   * Months in which the long-bone growth plates typically finish closing.
   * Sources vary - radiographic closure runs earlier than full skeletal
   * maturity - so this is a window, and the plan below waits for its top before
   * calling a dog cleared for sustained conditioning.
   */
  closureMonths: [number, number];
};

export const SIZE_PROFILES: SizeProfile[] = [
  { key: "toy", label: "Toy (under 12 lb adult)", adultLb: [0, 12], closureMonths: [8, 11] },
  { key: "small", label: "Small (12 to 25 lb adult)", adultLb: [12, 25], closureMonths: [9, 12] },
  { key: "medium", label: "Medium (25 to 50 lb adult)", adultLb: [25, 50], closureMonths: [10, 14] },
  { key: "large", label: "Large (50 to 90 lb adult)", adultLb: [50, 90], closureMonths: [12, 16] },
  { key: "giant", label: "Giant (over 90 lb adult)", adultLb: [90, Infinity], closureMonths: [14, 20] },
];

export function profileFor(size: SizeClass): SizeProfile {
  const found = SIZE_PROFILES.find((p) => p.key === size);
  if (!found) throw new Error(`unknown size class: ${size}`);
  return found;
}

/** Nearest size class for an estimated adult weight. */
export function sizeClassForAdultWeight(lb: number): SizeClass {
  const match = SIZE_PROFILES.find((p) => lb >= p.adultLb[0] && lb < p.adultLb[1]);
  return match?.key ?? "giant";
}

export type Stage = "under-four-months" | "plates-open" | "plates-closing" | "plates-closed";

export type PuppyPlan = {
  size: SizeProfile;
  ageMonths: number;
  stage: Stage;
  stageHeadline: string;
  stageDetail: string;
  /** Ceiling for ONE session of forced, repetitive work, in minutes. */
  structuredCeilingMin: number;
  /** Sessions of that kind per day. */
  sessionsPerDay: number;
  /** What the five-minute rule alone would have said, for comparison. */
  fiveMinuteRuleMin: number;
  freePlay: string;
  green: string[];
  red: string[];
  /** Months until the top of the closure window, 0 once past it. */
  monthsToCleared: number;
  vetHumility: string;
};

const VET_HUMILITY =
  "This is a planning estimate, not veterinary advice. Growth plate closure is confirmed by radiograph, not by a calculator, and breeds and individuals vary. If your dog has a known orthopedic issue, limps, or is a breed with a dysplasia history, your veterinarian sets the ceiling and this tool does not.";

function stageFor(ageMonths: number, closure: [number, number]): Stage {
  if (ageMonths < 4) return "under-four-months";
  if (ageMonths < closure[0]) return "plates-open";
  if (ageMonths < closure[1]) return "plates-closing";
  return "plates-closed";
}

/**
 * Build the plan.
 *
 * The structured ceiling still uses five minutes per month of age, because as a
 * conservative starting point it is reasonable and there is nothing better to
 * replace it with. What changes is the scope: it caps leashed road walking,
 * jogging, repetitive fetch and stair work, and it does not cap self-directed
 * play. Past the closure window it stops applying at all.
 */
export function puppyPlan(ageMonths: number, size: SizeClass): PuppyPlan {
  const profile = profileFor(size);
  const age = Math.max(0, Math.round(ageMonths));
  const stage = stageFor(age, profile.closureMonths);
  const fiveMinuteRuleMin = age * 5;
  const monthsToCleared = Math.max(0, profile.closureMonths[1] - age);

  const base = {
    size: profile,
    ageMonths: age,
    stage,
    fiveMinuteRuleMin,
    monthsToCleared,
    vetHumility: VET_HUMILITY,
  };

  if (stage === "under-four-months") {
    return {
      ...base,
      stageHeadline: "Growth plates wide open",
      stageDetail: `At ${age} month${age === 1 ? "" : "s"} this skeleton is at its most vulnerable, and it is also the window where the research is most specific. In the Norwegian cohort study, regular stair use before three months of age was associated with a higher rate of hip dysplasia, while daily off-leash movement on soft, uneven ground was associated with a lower rate. The instruction is not "do less." It is "do it on grass, off leash, and let the dog stop when it wants to."`,
      structuredCeilingMin: Math.min(fiveMinuteRuleMin, 15),
      sessionsPerDay: 2,
      freePlay:
        "Unrestricted on grass, sand, or soft uneven ground, as long as the dog is choosing the pace and is free to quit. This is the movement that builds a joint correctly, and it is not what the five-minute rule was ever meant to limit.",
      green: [
        "Off-leash pottering on grass or soft, uneven ground",
        "Short leashed walks for socialization and surface exposure",
        "Play with other appropriately sized, appropriately matched dogs",
        "Nose games and short training sessions, which tire a puppy without loading joints",
      ],
      red: [
        "Stairs, up or down, including the ones you carry the dog past every day",
        "Jogging or cycling with the dog on a leash",
        "Repetitive fetch, especially with hard stops and turns",
        "Jumping down from furniture, tailgates, or the back of a vehicle",
        "Long walks on pavement or concrete",
      ],
    };
  }

  if (stage === "plates-open") {
    return {
      ...base,
      stageHeadline: "Growth plates still open",
      stageDetail: `For a ${profile.label.toLowerCase().split(" (")[0]} dog the plates typically finish closing somewhere between ${profile.closureMonths[0]} and ${profile.closureMonths[1]} months, so at ${age} months there is still real growing going on. This is the stage where owners start feeling guilty, because the dog now looks like an adult and clearly wants more. It is not an adult skeleton yet, and the gap between how a dog looks and what its joints can absorb is at its widest right here.`,
      structuredCeilingMin: Math.min(fiveMinuteRuleMin, 40),
      sessionsPerDay: 2,
      freePlay:
        "Still not the thing being limited. Self-directed play on forgiving ground, where the dog sets the pace and takes its own breaks, remains the best movement available at this age.",
      green: [
        "Leashed walks up to the ceiling above, ideally on grass, dirt, or packed sand",
        "Off-leash play on soft, uneven ground",
        "Swimming, if the dog is confident and supervised",
        "Introduction-level conditioning: short, light, dog-paced work about confidence rather than load",
        "Structured training, which drains a young dog more than most owners expect",
      ],
      red: [
        "Running alongside a bike or a jogger",
        "Repetitive jumping, agility equipment at height, or hard-surface fetch",
        "Long-distance hikes with no option to stop",
        "Weighted vests or drag work",
        "Any session where the dog cannot choose to quit",
      ],
    };
  }

  if (stage === "plates-closing") {
    return {
      ...base,
      stageHeadline: "Growth plates closing",
      stageDetail: `At ${age} months this dog is inside the ${profile.closureMonths[0]} to ${profile.closureMonths[1]} month window where the plates finish closing. Load tolerance is rising fast, and this is where a gradual ramp belongs rather than a switch flip. A radiograph is the only way to confirm closure, and it is a reasonable thing to ask your vet about at the next visit if you intend to do real work with this dog.`,
      structuredCeilingMin: Math.min(fiveMinuteRuleMin, 60),
      sessionsPerDay: 2,
      freePlay:
        "Unrestricted, and now genuinely useful for building the muscle that will support the joints for the next decade.",
      green: [
        "Longer leashed walks, still favoring forgiving surfaces",
        "Steady, sustained work at a pace the dog sets",
        "Gradual increases of roughly ten percent a week",
        "Hill walking at a moderate grade",
      ],
      red: [
        "Sudden jumps in distance or intensity because the dog 'seems ready'",
        "Repetitive high-impact landings",
        "Sustained road running on concrete",
        "Ignoring next-morning stiffness, which at this age is the signal that matters most",
      ],
    };
  }

  return {
    ...base,
    stageHeadline: "Skeletally mature",
    stageDetail: `At ${age} months a ${profile.label.toLowerCase().split(" (")[0]} dog is past the typical ${profile.closureMonths[0]} to ${profile.closureMonths[1]} month closure window. The five-minute rule no longer applies to this dog, and continuing to follow it is now the mistake - an adult working-drive dog held at puppy volumes is an under-exercised dog. Build from where the dog actually is, not from where it was.`,
    structuredCeilingMin: 0,
    sessionsPerDay: 0,
    freePlay:
      "No age-based restriction. What limits this dog now is its current conditioning, which is a different question with a different answer.",
    green: [
      "Sustained conditioning at a controlled effort",
      "A build of roughly ten percent a week from the dog's current baseline",
      "Real duration rather than scattered bursts",
    ],
    red: [
      "Going from puppy volumes to adult volumes in one week",
      "Assuming a mature skeleton means a conditioned body, which it does not",
    ],
  };
}
