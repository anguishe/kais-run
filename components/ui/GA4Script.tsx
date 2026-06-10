'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA4_MEASUREMENT_ID = 'G-1P5ST40L2E';

export function GA4Script() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      setConsented(true);
    }
    const handleConsent = () => setConsented(true);
    window.addEventListener('cookie-consent-accepted', handleConsent);
    return () => window.removeEventListener('cookie-consent-accepted', handleConsent);
  }, []);

  if (!consented) return null;

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
