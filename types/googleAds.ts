/**
 * Shared types for Google Ads (gtag.js) conversion tracking.
 */

/** ISO 4217 currency code (e.g. USD). */
export type CurrencyCode = string;

/** Membership product tier label for analytics context. */
export type MembershipTier = string;

/**
 * Payload for `gtag('event', 'conversion', …)` as used by Google Ads.
 * @see https://support.google.com/google-ads/answer/6331314
 */
export interface GoogleAdsConversionPayload {
  /** Full `AW-CONVERSION_ID/CONVERSION_LABEL` token. */
  send_to: string;
  /** Conversion monetary value. */
  value?: number;
  /** ISO 4217 currency code. */
  currency?: CurrencyCode;
  /** Optional deduplication or correlation id. */
  transaction_id?: string;
  /** Optional tier context for membership conversions (forwarded on dataLayer). */
  membership_tier?: MembershipTier;
  /** Allow future-safe extensions without breaking callers. */
  [key: string]: unknown;
}

/** Maps logical conversion kinds to env-backed labels (string labels only). */
export interface ConversionConfig {
  foundingAthleteLabel: string | undefined;
  introSessionLabel: string | undefined;
  membershipLabel: string | undefined;
  leadCaptureLabel: string | undefined;
}

/**
 * High-level tracking categories used by this app’s helpers.
 * Distinct from raw gtag event names.
 */
export type TrackingEvent =
  | "conversion"
  | "founding_athlete"
  | "intro_session"
  | "membership"
  | "lead_capture";

/** Minimal gtag surface used by this codebase. */
export type GtagFn = (command: "event" | "config" | "js" | "set" | "consent", ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export {};
