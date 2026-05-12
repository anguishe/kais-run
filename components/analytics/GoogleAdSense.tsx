'use client';
import Script from 'next/script';
const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
export default function GoogleAdSense() {
  if (!PUB_ID) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
