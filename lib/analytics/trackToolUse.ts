import type { GtagFn } from '@/types/googleAds';

declare global {
  interface Window {
    gtag?: GtagFn;
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Records a free-tool interaction. Mirrors the site analytics setup:
 * GA4 is consent-gated (only fires when cookie-consent === 'accepted'),
 * Clarity is ungated.
 */
export function trackToolUse(tool: string, detail?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;

  if (
    localStorage.getItem('cookie-consent') === 'accepted' &&
    typeof window.gtag === 'function'
  ) {
    window.gtag('event', 'tool_use', { tool, ...detail });
  }

  if (typeof window.clarity === 'function') {
    window.clarity('event', `tool_use_${tool}`);
  }
}

/** Records an outbound affiliate-link click. Same consent gating as trackToolUse. */
export function trackAffiliateClick(product: string) {
  if (typeof window === 'undefined') return;

  if (
    localStorage.getItem('cookie-consent') === 'accepted' &&
    typeof window.gtag === 'function'
  ) {
    window.gtag('event', 'affiliate_click', { product });
  }

  if (typeof window.clarity === 'function') {
    window.clarity('event', `affiliate_click_${product}`);
  }
}
