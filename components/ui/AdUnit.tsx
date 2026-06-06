'use client';
import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export function AdUnit({ slot, format = 'auto', className }: AdUnitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cookie-consent') === 'accepted') setConsented(true);
    }
    const handler = () => setConsented(true);
    window.addEventListener('cookie-consent-accepted', handler);
    return () => window.removeEventListener('cookie-consent-accepted', handler);
  }, []);

  useEffect(() => {
    if (!consented || !ref.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, [consented]);

  if (!consented) return null;

  return (
    // TODO: Replace ca-pub-XXXXXXXXXXXXXXXXX with real publisher ID after AdSense approval
    <div ref={ref} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
