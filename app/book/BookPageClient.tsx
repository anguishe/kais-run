'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackFoundingAthlete } from '@/lib/googleAds';
import {
  BOOK_INTENT_KEY,
  hasFoundingSquareConversionTracked,
  markFoundingSquareConversionTracked,
} from '@/lib/bookIntent';

function BookSpotsRemaining() {
  const [spots, setSpots] = useState<{ remaining: number; total: number } | null>(null);

  useEffect(() => {
    fetch('/data/config.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load spots config');
        return res.json();
      })
      .then((data: { foundingSpots?: { total?: number; remaining?: number } }) => {
        const fs = data.foundingSpots;
        if (fs?.remaining != null && fs?.total != null) {
          setSpots({ remaining: fs.remaining, total: fs.total });
        }
      })
      .catch(() => {
        /* leave null — skeleton below */
      });
  }, []);

  if (!spots) {
    return (
      <p className="mx-auto mt-4 max-w-xl animate-pulse font-body text-lg text-brand-gray">
        Loading spots…
      </p>
    );
  }

  return (
    <p className="mx-auto mt-4 max-w-xl font-body text-lg text-brand-gold">
      {spots.remaining} of {spots.total} spots remaining — this offer closes permanently when
      they&apos;re gone.
    </p>
  );
}

function BookPageInner() {
  const params = useSearchParams();
  const tier = params.get('tier');
  const isFounding = tier !== 'intro' && tier !== 'private' && tier !== 'packages';
  const widgetHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.get('offer') === 'founding' && process.env.NODE_ENV === 'development') {
      console.info('[Kai\'s Run funnel] /book with offer=founding');
    }
  }, [params]);

  useEffect(() => {
    try {
      const src = sessionStorage.getItem(BOOK_INTENT_KEY);
      if (src && process.env.NODE_ENV === 'development') {
        console.info('[Kai\'s Run funnel] landed on /book with intent', src);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const shouldScroll =
      params.get('offer') === 'founding' ||
      (typeof window !== 'undefined' && window.location.hash === '#founding-checkout');

    if (!shouldScroll) return;

    const timer = window.setTimeout(() => {
      document.getElementById('founding-checkout')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [params]);

  useEffect(() => {
    const host = widgetHostRef.current;
    if (!host) return;

    const existing = document.getElementById('square-widget-script');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'square-widget-script';
    script.src = 'https://square.site/appointments/buyer/widget/x06wxfzw47ogj7/LY4W4QTX4A1PF.js';
    script.async = true;
    host.appendChild(script);

    return () => {
      const s = document.getElementById('square-widget-script');
      if (s) s.remove();
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        if (hasFoundingSquareConversionTracked()) return;
        const origin = typeof event.origin === 'string' ? event.origin : '';
        const squareOrigin =
          /square\.(site|com)/i.test(origin) ||
          origin.includes('squareup.com') ||
          origin.includes('squarecdn.com');
        if (!squareOrigin) return;

        const raw = event.data;
        const blob =
          typeof raw === 'string'
            ? raw
            : raw && typeof raw === 'object'
              ? JSON.stringify(raw)
              : '';

        const completionHint =
          /appointment|booking|confirmed|complete|success|scheduled|purchase|checkout|thank/i.test(blob);

        if (!completionHint) return;

        markFoundingSquareConversionTracked();
        try {
          trackFoundingAthlete(200);
        } catch {
          /* defensive */
        }
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[Google Ads] Square postMessage handler', e);
        }
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <main className="min-h-screen bg-brand-black pt-24">
      <div className="mx-auto max-w-4xl px-6 pb-12 text-center">
        <p className="mb-3 font-body text-sm tracking-[0.25em] text-brand-teal uppercase">
          Destin · Fort Walton Beach · Niceville
        </p>
        <h1 className="mb-4 font-display text-5xl text-brand-offwhite md:text-7xl">
          {isFounding ? 'Join the Founding Athlete Program' : 'Book Your Session'}
        </h1>
        <BookSpotsRemaining />
        <div className="mx-auto mt-8 h-px w-16 bg-brand-teal" />
      </div>

      {isFounding && (
        <section className="mx-auto max-w-2xl px-6 pb-8">
          <p className="font-body text-xs tracking-[0.28em] text-brand-teal uppercase">Founding Athlete</p>
          <h2 className="mt-3 font-display text-4xl text-brand-offwhite md:text-5xl">
            $200 for 5 Sessions — $40 Effective
          </h2>
          <p className="mt-4 font-body text-brand-gray">
            A one-time founding rate for the first 20 dogs — structured slatmill conditioning delivered
            to your driveway.
          </p>
          <ul className="mt-6 space-y-2 text-left font-body text-sm text-brand-offwhite/80">
            <li>Priority booking when Kai&apos;s Run opens to the public</li>
            <li>Founding Athlete status — recognized first believers</li>
            <li>Personal Run Profile Card on your first session</li>
            <li>One-time rate — never offered again</li>
          </ul>
        </section>
      )}

      <section id="founding-checkout" className="mx-auto max-w-4xl px-6 pb-16">
        <p className="mb-6 text-center font-body text-sm text-brand-gray">
          {isFounding ? 'Complete your founding purchase below' : 'Complete your purchase below'}
        </p>
        <div
          ref={widgetHostRef}
          className="mx-auto w-full"
          style={{ minHeight: '700px' }}
        />
      </section>
    </main>
  );
}

function BookPageFallback() {
  return (
    <main className="min-h-screen bg-brand-black pt-24">
      <div className="mx-auto max-w-4xl px-6 pb-12 text-center">
        <p className="font-display text-5xl text-brand-offwhite md:text-7xl">
          Join the Founding Athlete Program
        </p>
        <p className="mt-4 font-body text-brand-gray">Loading…</p>
      </div>
    </main>
  );
}

export default function BookPageClient() {
  return (
    <Suspense fallback={<BookPageFallback />}>
      <BookPageInner />
    </Suspense>
  );
}
