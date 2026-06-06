'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA4_MEASUREMENT_ID = 'G-1P5ST40L2E';

function hasAnalyticsConsent(): boolean {
  return localStorage.getItem('cookie-consent') === 'accepted';
}

export function GA4Script() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      setEnabled(true);
      return;
    }

    const onConsentAccepted = () => setEnabled(true);
    window.addEventListener('cookie-consent-accepted', onConsentAccepted);
    return () => window.removeEventListener('cookie-consent-accepted', onConsentAccepted);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA4_MEASUREMENT_ID)});
`}
      </Script>
    </>
  );
}
