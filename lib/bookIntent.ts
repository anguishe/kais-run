/** sessionStorage keys for booking funnel attribution (CTA → /book → conversions). */
export const BOOK_INTENT_KEY = 'kr_book_intent';
export const INTRO_DOG_COUNT_KEY = 'kr_intro_dogs';
export const MEMBERSHIP_TIER_KEY = 'kr_membership_tier';
export const INTRO_ADS_TRACKED_KEY = 'kr_intro_square_tracked';
export const FOUNDING_SQUARE_TRACKED_KEY = 'kr_founding_square_tracked';

export function setBookIntentSource(source: string): void {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(BOOK_INTENT_KEY, source);
    if (process.env.NODE_ENV === 'development') {
      console.info('[Kai\'s Run funnel] book intent', source);
    }
  } catch {
    /* storage blocked */
  }
}

export function setIntroDogCount(count: 1 | 2): void {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(INTRO_DOG_COUNT_KEY, String(count));
  } catch {
    /* ignore */
  }
}

export function getIntroDogCount(): 1 | 2 {
  try {
    if (typeof window === 'undefined') return 1;
    const v = sessionStorage.getItem(INTRO_DOG_COUNT_KEY);
    return v === '2' ? 2 : 1;
  } catch {
    return 1;
  }
}

export function getIntroSessionValue(): number {
  return getIntroDogCount() === 2 ? 55 : 35;
}

export function hasIntroSquareConversionTracked(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(INTRO_ADS_TRACKED_KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSquareConversionTracked(): void {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(INTRO_ADS_TRACKED_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function hasFoundingSquareConversionTracked(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(FOUNDING_SQUARE_TRACKED_KEY) === '1';
  } catch {
    return false;
  }
}

export function markFoundingSquareConversionTracked(): void {
  try {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(FOUNDING_SQUARE_TRACKED_KEY, '1');
  } catch {
    /* ignore */
  }
}
