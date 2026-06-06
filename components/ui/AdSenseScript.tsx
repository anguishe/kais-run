'use client';
import { useEffect } from 'react';

export function AdSenseScript() {
  useEffect(() => {
    const load = () => {
      if (document.querySelector('script[data-adsense]')) return;
      // TODO: Replace ca-pub-XXXXXXXXXXXXXXXXX with real publisher ID after AdSense approval
      const s = document.createElement('script');
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX';
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.setAttribute('data-adsense', '1');
      document.head.appendChild(s);
    };
    if (typeof window !== 'undefined' && localStorage.getItem('cookie-consent') === 'accepted') load();
    window.addEventListener('cookie-consent-accepted', load);
    return () => window.removeEventListener('cookie-consent-accepted', load);
  }, []);
  return null;
}
