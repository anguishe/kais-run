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
    <div ref={ref} className={className}>
      <ins
        className="adsbygoogle"
        // minHeight reserves layout space before the ad fills, so the load is CLS-safe.
        style={{ display: 'block', minHeight: 250 }}
        data-ad-client="ca-pub-5399156622542127"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
