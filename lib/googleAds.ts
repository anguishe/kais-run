import type { CurrencyCode, GoogleAdsConversionPayload, MembershipTier } from "@/types/googleAds";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";

const isDev = process.env.NODE_ENV === "development";

/** Dispatched in development after a conversion is sent to gtag (for DevTools / local QA). */
export const GOOGLE_ADS_DEV_LOG_EVENT = "kaisrun:google-ads-dev-log";

const ADS_DEV_LOG_MAX = 40;

export type GoogleAdsDevLogEntry = {
  ts: number;
  /** Logical name, e.g. `conversion` or `membership_conversion`. */
  event: string;
  detail: Record<string, unknown>;
};

const adsDevEventLog: GoogleAdsDevLogEntry[] = [];

export function getAdsDevEventLog(): readonly GoogleAdsDevLogEntry[] {
  return adsDevEventLog.slice();
}

export function clearAdsDevEventLog(): void {
  adsDevEventLog.length = 0;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(GOOGLE_ADS_DEV_LOG_EVENT));
  }
}

function appendAdsDevLog(event: string, detail: Record<string, unknown>): void {
  if (!isDev || typeof window === "undefined") return;
  adsDevEventLog.unshift({ ts: Date.now(), event, detail });
  if (adsDevEventLog.length > ADS_DEV_LOG_MAX) {
    adsDevEventLog.length = ADS_DEV_LOG_MAX;
  }
  window.dispatchEvent(new CustomEvent(GOOGLE_ADS_DEV_LOG_EVENT));
}

function devLog(event: string, detail?: unknown): void {
  if (!isDev) return;
  if (detail !== undefined) {
    console.info(`[Google Ads] ${event}`, detail);
  } else {
    console.info(`[Google Ads] ${event}`);
  }
}

function devWarn(event: string, err: unknown): void {
  if (!isDev) return;
  console.warn(`[Google Ads] ${event}`, err);
}

function getGtag(): Window["gtag"] | undefined {
  if (typeof window === "undefined") return undefined;
  return window.gtag;
}

function buildSendTo(conversionLabel: string): string | null {
  if (!ADS_ID || !conversionLabel.trim()) return null;
  return `${ADS_ID}/${conversionLabel.trim()}`;
}

/**
 * Fires a Google Ads conversion via gtag.
 *
 * @param conversionLabel — The label segment after `/` in `send_to` (not the full `AW-…/label`).
 * @param value — Optional monetary value for the conversion.
 * @param currency — ISO 4217 code; defaults to `USD`.
 */
export function trackConversion(
  conversionLabel: string,
  value?: number,
  currency: CurrencyCode = "USD"
): void {
  try {
    devLog("trackConversion", { conversionLabel, value, currency });
    const sendTo = buildSendTo(conversionLabel);
    if (!sendTo) return;

    const gtag = getGtag();
    if (!gtag) return;

    const payload: GoogleAdsConversionPayload = { send_to: sendTo };
    if (value !== undefined && Number.isFinite(value)) {
      payload.value = value;
      payload.currency = currency;
    }

    try {
      gtag("event", "conversion", payload);
      appendAdsDevLog("conversion", {
        send_to: sendTo,
        value: payload.value,
        currency: payload.currency,
      });
    } catch (e) {
      devWarn("gtag(event, conversion)", e);
    }
  } catch (e) {
    devWarn("trackConversion", e);
  }
}

/**
 * Tracks the founding-athlete conversion from `NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL`.
 *
 * @param value — Optional conversion value in major currency units.
 * @param currency — ISO 4217 code; defaults to `USD`.
 */
export function trackFoundingAthlete(value?: number, currency: CurrencyCode = "USD"): void {
  try {
    devLog("trackFoundingAthlete", { value, currency });
    const label = process.env.NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL?.trim();
    if (!label) return;
    trackConversion(label, value, currency);
  } catch (e) {
    devWarn("trackFoundingAthlete", e);
  }
}

/**
 * Tracks the intro-session conversion from `NEXT_PUBLIC_INTRO_SESSION_LABEL`.
 *
 * @param value — Optional conversion value in major currency units.
 * @param currency — ISO 4217 code; defaults to `USD`.
 */
export function trackIntroSession(value?: number, currency: CurrencyCode = "USD"): void {
  try {
    devLog("trackIntroSession", { value, currency });
    const label = process.env.NEXT_PUBLIC_INTRO_SESSION_LABEL?.trim();
    if (!label) return;
    trackConversion(label, value, currency);
  } catch (e) {
    devWarn("trackIntroSession", e);
  }
}

/**
 * Tracks a membership conversion from `NEXT_PUBLIC_MEMBERSHIP_LABEL`.
 * Sends `membership_tier` on the conversion payload for downstream reporting.
 *
 * @param value — Conversion value in major currency units.
 * @param tier — Membership tier name or id (string).
 * @param currency — ISO 4217 code; defaults to `USD`.
 */
export function trackMembership(
  value: number,
  tier: MembershipTier,
  currency: CurrencyCode = "USD"
): void {
  try {
    devLog("trackMembership", { value, tier, currency });
    const label = process.env.NEXT_PUBLIC_MEMBERSHIP_LABEL?.trim();
    if (!label || !Number.isFinite(value)) return;

    const sendTo = buildSendTo(label);
    if (!sendTo) return;

    const gtag = getGtag();
    if (!gtag) return;

    const payload: GoogleAdsConversionPayload = {
      send_to: sendTo,
      value,
      currency,
      membership_tier: tier,
    };

    try {
      gtag("event", "conversion", payload);
      appendAdsDevLog("membership_conversion", {
        send_to: sendTo,
        value: payload.value,
        currency: payload.currency,
        membership_tier: tier,
      });
    } catch (e) {
      devWarn("gtag membership conversion", e);
    }
  } catch (e) {
    devWarn("trackMembership", e);
  }
}

/**
 * Tracks a lead-capture conversion from `NEXT_PUBLIC_LEAD_CAPTURE_LABEL` with value 0.
 */
export function trackLeadCapture(): void {
  try {
    devLog("trackLeadCapture", { value: 0, currency: "USD" });
    const label = process.env.NEXT_PUBLIC_LEAD_CAPTURE_LABEL?.trim();
    if (!label) return;
    trackConversion(label, 0, "USD");
  } catch (e) {
    devWarn("trackLeadCapture", e);
  }
}
