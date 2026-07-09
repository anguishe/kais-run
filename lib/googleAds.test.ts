/**
 * Runtime testing utilities for Google Ads (gtag conversions).
 * Not a Jest/Vitest suite — safe to import from client components in development.
 */

import type { CurrencyCode } from "@/types/googleAds";
import {
  clearAdsDevEventLog,
  getAdsDevEventLog,
  GOOGLE_ADS_DEV_LOG_EVENT,
  trackFoundingAthlete,
  trackIntroSession,
  trackLeadCapture,
  trackMembership,
  type GoogleAdsDevLogEntry,
} from "@/lib/googleAds";

export {
  clearAdsDevEventLog,
  getAdsDevEventLog,
  GOOGLE_ADS_DEV_LOG_EVENT,
  type GoogleAdsDevLogEntry,
};

/** Mirrors production thank-you / funnel values for QA. */
export const MOCK_CONVERSION_SCENARIOS = {
  foundingAthlete: {
    description: "Founding athlete waitlist (matches /thank-you?type=founding)",
    value: 200 as const,
    currency: "USD" as const satisfies CurrencyCode,
    envLabelKey: "NEXT_PUBLIC_FOUNDING_ATHLETE_LABEL",
  },
  introSessionOneDog: {
    description: "Intro session - single dog (matches ?type=intro&dogs=1 default)",
    value: 35 as const,
    currency: "USD" as const satisfies CurrencyCode,
    envLabelKey: "NEXT_PUBLIC_INTRO_SESSION_LABEL",
  },
  introSessionTwoDogs: {
    description: "Intro session - two dogs (?type=intro&dogs=2)",
    value: 55 as const,
    currency: "USD" as const satisfies CurrencyCode,
    envLabelKey: "NEXT_PUBLIC_INTRO_SESSION_LABEL",
  },
  leadCapture: {
    description: "Email / lead capture (value forced to 0 in trackLeadCapture)",
    value: 0 as const,
    currency: "USD" as const satisfies CurrencyCode,
    envLabelKey: "NEXT_PUBLIC_LEAD_CAPTURE_LABEL",
  },
  membershipExample: {
    description: "Example membership purchase (tier + value from URL on thank-you)",
    value: 149,
    tier: "standard",
    currency: "USD" as const satisfies CurrencyCode,
    envLabelKey: "NEXT_PUBLIC_MEMBERSHIP_LABEL",
  },
} as const;

export type SimulatedConversionKind =
  | "founding_athlete"
  | "intro_session_1dog"
  | "intro_session_2dogs"
  | "lead_capture"
  | "membership_example";

function assertDevMode(fn: string): boolean {
  if (process.env.NODE_ENV === "development") return true;
  if (typeof console !== "undefined") {
    console.warn(`[Kai's Run | Google Ads Test] ${fn} is only available in development.`);
  }
  return false;
}

/** True when `window.gtag` is a function (script initialized). */
export function isGtagLoaded(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.gtag === "function";
}

/**
 * Fires the same helpers production uses, with mock values from {@link MOCK_CONVERSION_SCENARIOS}.
 * Requires `NEXT_PUBLIC_GOOGLE_ADS_ID` and the relevant label env vars.
 */
export function simulateTestConversion(kind: SimulatedConversionKind): void {
  if (!assertDevMode("simulateTestConversion")) return;

  switch (kind) {
    case "founding_athlete":
      trackFoundingAthlete(
        MOCK_CONVERSION_SCENARIOS.foundingAthlete.value,
        MOCK_CONVERSION_SCENARIOS.foundingAthlete.currency
      );
      break;
    case "intro_session_1dog":
      trackIntroSession(
        MOCK_CONVERSION_SCENARIOS.introSessionOneDog.value,
        MOCK_CONVERSION_SCENARIOS.introSessionOneDog.currency
      );
      break;
    case "intro_session_2dogs":
      trackIntroSession(
        MOCK_CONVERSION_SCENARIOS.introSessionTwoDogs.value,
        MOCK_CONVERSION_SCENARIOS.introSessionTwoDogs.currency
      );
      break;
    case "lead_capture":
      trackLeadCapture();
      break;
    case "membership_example":
      trackMembership(
        MOCK_CONVERSION_SCENARIOS.membershipExample.value,
        MOCK_CONVERSION_SCENARIOS.membershipExample.tier,
        MOCK_CONVERSION_SCENARIOS.membershipExample.currency
      );
      break;
  }
}

export type GoogleAdsDebugLogger = {
  log: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
};

const defaultScope = "Google Ads Debug";

/**
 * Prefixed console wrapper for local debugging (development only).
 */
export function createGoogleAdsDebugLogger(scope: string = defaultScope): GoogleAdsDebugLogger {
  const prefix = `[Kai's Run | ${scope}]`;
  const noop = (): void => {};
  if (process.env.NODE_ENV !== "development") {
    return { log: noop, info: noop, warn: noop };
  }
  return {
    log: (...args: unknown[]) => {
      console.log(prefix, ...args);
    },
    info: (...args: unknown[]) => {
      console.info(prefix, ...args);
    },
    warn: (...args: unknown[]) => {
      console.warn(prefix, ...args);
    },
  };
}
