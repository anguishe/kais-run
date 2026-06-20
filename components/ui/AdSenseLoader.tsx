'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const ADSENSE_CLIENT = 'ca-pub-5399156622542127';

/**
 * Loads the Google AdSense library only after cookie consent is granted.
 * Mirrors GA4Script's consent gating: reads the 'cookie-consent' === 'accepted'
 * flag on mount and listens for the 'cookie-consent-accepted' event. Until
 * consent is granted this renders nothing, so the loader never fires for a
 * visitor who has not accepted.
 */
export function AdSenseLoader() {
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
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
