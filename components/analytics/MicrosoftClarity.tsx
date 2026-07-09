'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CLARITY_ID = 'wurwoh6v8a';

export default function MicrosoftClarity() {
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
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
