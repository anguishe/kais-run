"use client";

import Script from "next/script";

export type GoogleAdsProps = {
  /**
   * Google Ads account / conversion ID, e.g. `AW-123456789`.
   * When omitted or empty, nothing is rendered (safe for static export builds without secrets).
   */
  conversionId?: string;
};

/**
 * Loads Google Ads gtag.js and initializes `gtag('config', conversionId)`.
 * Uses `next/script` with `afterInteractive` so the tag is non-blocking and static-export friendly.
 */
export default function GoogleAds({ conversionId }: GoogleAdsProps) {
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
