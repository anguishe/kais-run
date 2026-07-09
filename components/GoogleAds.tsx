"use client";

import { useEffect } from "react";
import Script from "next/script";

export type GoogleAdsProps = {
  /**
   * Google Ads account / conversion ID, e.g. `AW-123456789`.
   * When omitted or empty, the Ads library/config are not rendered — but the
   * consent-update wiring below still runs (it governs GA4 + Clarity too).
   */
  conversionId?: string;
};

/**
 * Consent-mode-aware Google Ads loader.
 *
 * The Consent Mode v2 DEFAULT stub (all denied + wait_for_update) lives in
 * app/layout.tsx <head> so it executes before any gtag('config') from GA4 or
 * Ads. Here we own the UPDATE side, mirroring the GA4Script gate: read stored
 * consent on mount and react to the accept/decline events. The Ads gtag.js
 * library + config load (afterInteractive) only when a conversion ID is set.
 */
export default function GoogleAds({ conversionId }: GoogleAdsProps) {
  useEffect(() => {
    const setConsent = (state: "granted" | "denied") => {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("consent", "update", {
        ad_storage: state,
        analytics_storage: state,
        ad_user_data: state,
        ad_personalization: state,
      });
    };

    if (localStorage.getItem("cookie-consent") === "accepted") setConsent("granted");

    const onAccept = () => setConsent("granted");
    const onDecline = () => setConsent("denied");
    window.addEventListener("cookie-consent-accepted", onAccept);
    window.addEventListener("cookie-consent-declined", onDecline);
    return () => {
      window.removeEventListener("cookie-consent-accepted", onAccept);
      window.removeEventListener("cookie-consent-declined", onDecline);
    };
  }, []);

  const id = conversionId?.trim();
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});
`}
      </Script>
    </>
  );
}
