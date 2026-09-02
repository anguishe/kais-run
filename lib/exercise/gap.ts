// Comparison between the exercise a dog actually gets and the target computed in
// ./compute. Deliberately dependency-free so scripts/check-tools.mjs can import
// it directly without dragging the breed tables along.

export type ExerciseGap = {
  /** short = below the low end of the target, on-target = inside it, above = past the high end. */
  status: "short" | "on-target" | "above";
  currentMin: number;
  /** Minutes per day still owed. 0 unless status is "short". */
  dailyGapMin: number;
  /** The same shortfall expressed weekly, which is the number that lands. */
  weeklyGapMin: number;
  /** Share of the low-end target the dog is currently getting, 0-1+. */
  fractionOfTarget: number;
  headline: string;
  detail: string;
};

/**
 * Compare what the dog actually gets against what it needs.
 *
 * The gap is measured against the LOW end of the range on purpose - the tool
 * should never overstate a shortfall, and a dog at the bottom of its range is
 * genuinely covered. Copy stays on the plan and off the owner: nobody books a
 * session because a calculator made them feel bad.
 */
export function exerciseGap(
  currentMin: number,
  dailyMin: [number, number],
): ExerciseGap {
  const [lo, hi] = dailyMin;
  const current = Math.max(0, Math.round(currentMin));
  const fractionOfTarget = lo > 0 ? current / lo : 1;

  if (current > hi) {
    return {
      status: "above",
      currentMin: current,
      dailyGapMin: 0,
      weeklyGapMin: 0,
      fractionOfTarget,
      headline: "Above the estimated range",
      detail: `${current} minutes a day is more than this estimate calls for. That is not automatically a problem - a conditioned dog with the drive for it can carry more. Watch recovery the next morning rather than the clock, and back off if the dog is stiff or slow to start.`,
    };
  }

  if (current >= lo) {
    return {
      status: "on-target",
      currentMin: current,
      dailyGapMin: 0,
      weeklyGapMin: 0,
      fractionOfTarget,
      headline: "Inside the range",
      detail: `${current} minutes a day puts this dog inside its estimated range. The work now is consistency and quality - whether those minutes are sustained effort or scattered activity matters more than the number.`,
    };
  }

  const dailyGapMin = lo - current;
  return {
    status: "short",
    currentMin: current,
    dailyGapMin,
    weeklyGapMin: dailyGapMin * 7,
    fractionOfTarget,
    headline: `${dailyGapMin} minutes a day short`,
    detail: `${current} minutes against a low-end target of ${lo}. That is ${dailyGapMin * 7} minutes a week this dog is not getting, and it is the most common reason a dog looks restless in the evening. This is a scheduling problem, not a character flaw - in you or the dog.`,
  };
}
