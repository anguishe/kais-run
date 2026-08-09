'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GA4_MEASUREMENT_ID = 'G-1P5ST40L2E';

export function GA4Script() {
  useEffect(() => {
    // Consent Mode v2: the loader below runs unconditionally - the default-deny
    // block in app/layout.tsx keeps pings cookieless until the visitor accepts,
    // at which point this upgrades analytics_storage to granted.
    const grant = () =>
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    if (localStorage.getItem('cookie-consent') === 'accepted') grant();
    window.addEventListener('cookie-consent-accepted', grant);
    return () => window.removeEventListener('cookie-consent-accepted', grant);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
