/**
 * Target weight range from a current weight and a 9-point body condition score.
 *
 * WSAVA / AAHA body condition guidance: each point above 5 is roughly 10 percent
 * excess body weight, so ideal ~= current / (1 + 0.10 * (bcs - 5)). A hands-on score
 * is only good to about half a point, so we return the range for bcs +/- 0.5 and never
 * a single number. Pure, no imports - tested in scripts/check-tools.mjs.
 *
 * Only for dogs scoring above ideal. Underweight dogs get no target (vet referral);
 * ideal dogs hold their weight.
 */
export const TARGET_SOURCE =
  'Each point above 5 on the 9-point scale is roughly 10 percent excess body weight (WSAVA and AAHA body condition guidance).';

export function targetWeightRange(currentLb: number, bcs: number): { lowLb: number; highLb: number } | null {
  if (!Number.isFinite(currentLb) || currentLb <= 0 || currentLb > 350) return null;
  if (bcs <= 5.5) return null;
  const ideal = (score: number) => currentLb / (1 + 0.1 * Math.max(0, score - 5));
  const lowLb = Math.round(ideal(bcs + 0.5));
  const highLb = Math.round(ideal(bcs - 0.5));
  return { lowLb, highLb: Math.max(lowLb, highLb) };
}
