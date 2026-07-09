export type Category = 'Behavior' | 'Conditioning' | 'Health' | 'Seasonal';

/**
 * Curated slug -> category map. Unmapped slugs surface under "All" only.
 * Shared by the Field Notes index (category filters) and related-post ranking.
 * Keep in sync with the post library when new notes ship.
 */
export const CATEGORY_MAP: Record<string, Category> = {
  'dog-adolescence-phase': 'Behavior',
  'dog-anxiety-destructive-behavior-exercise': 'Behavior',
  'meet-kai-the-dog-behind-kais-run': 'Behavior',
  'dog-treadmill-vs-walk-comparison': 'Conditioning',
  'high-energy-dog-breeds-exercise-guide': 'Conditioning',
  'how-much-exercise-does-my-dog-need': 'Conditioning',
  'how-to-tire-out-a-high-energy-dog': 'Conditioning',
  'what-is-a-dog-slatmill': 'Conditioning',
  'what-to-expect-first-slatmill-session': 'Conditioning',
  'why-structured-runs-matter': 'Conditioning',
  'why-we-record-every-session': 'Conditioning',
  'is-my-dog-overweight': 'Health',
  'can-you-over-exercise-a-dog': 'Health',
  'senior-dog-exercise': 'Health',
  'too-hot-to-walk-your-dog': 'Seasonal',
  'calm-dog-during-fireworks': 'Seasonal',
  'dog-thunderstorm-anxiety': 'Seasonal',
  'dog-reactive-on-leash': 'Behavior',
  'dog-park-not-tiring-dog-out': 'Conditioning',
};

export function categoryOf(slug: string): Category | null {
  return CATEGORY_MAP[slug] ?? null;
}
