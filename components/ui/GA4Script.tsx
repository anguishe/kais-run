'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GA4_MEASUREMENT_ID = 'G-NWMG7SJ274'; // property 557170383 under anguisheh1 (2026-10-02); replaced draft G-1P5ST40L2E

export function GA4Script() {
  useEffect(() => {
    // Consent Mode v2: the loader below runs unconditionally. Defaults live in
    // app/layout.tsx (denied in EEA/UK/CH, granted elsewhere); accepting grants
    // here, declining denies via GoogleAds.tsx.
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
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
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
