'use client';

import { Suspense, useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackFoundingAthlete, trackIntroSession } from '@/lib/googleAds';
import { subscribeToMailchimp } from '@/lib/subscribe';
import {
  BOOK_INTENT_KEY,
  getIntroSessionValue,
  hasIntroSquareConversionTracked,
  markIntroSquareConversionTracked,
  setIntroDogCount,
} from '@/lib/bookIntent';

const FOUNDING_SUCCESS_COPY =
  "You're in. Travis will reach out personally within 24 hours to confirm your founding spot and collect payment.";

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
  const widgetHostRef = useRef<HTMLDivElement>(null);
  const [dogCount, setDogCount] = useState<1 | 2>(1);

  useEffect(() => {
    if (params.get('offer') === 'founding' && process.env.NODE_ENV === 'development') {
      console.info('[Kai\'s Run funnel] /book with offer=founding');
    }
  }, [params]);

  useEffect(() => {
    setIntroDogCount(dogCount);
  }, [dogCount]);

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
        if (hasIntroSquareConversionTracked()) return;
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

        markIntroSquareConversionTracked();
        const value = getIntroSessionValue();
        try {
          trackIntroSession(value);
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
          Join the Founding Athlete Program
        </h1>
        <BookSpotsRemaining />
        <div className="mx-auto mt-8 h-px w-16 bg-brand-teal" />
      </div>

      <section className="mx-auto max-w-2xl px-6 pb-16">
        <p className="font-body text-xs tracking-[0.28em] text-brand-teal uppercase">Founding Athlete</p>
        <h2 className="mt-3 font-display text-4xl text-brand-offwhite md:text-5xl">
          $200 for 5 Sessions — $40 Effective
        </h2>
        <p className="mt-4 font-body text-brand-gray">
          A one-time founding rate for the first 20 dogs — structured slatmill conditioning delivered
          to your driveway. Travis confirms each spot personally within 24 hours.
        </p>
        <ul className="mt-6 space-y-2 text-left font-body text-sm text-brand-offwhite/80">
          <li>Priority booking when Kai&apos;s Run opens to the public</li>
          <li>Founding Athlete status — recognized first believers</li>
          <li>Personal Run Profile Card on your first session</li>
          <li>One-time rate — never offered again</li>
        </ul>
        <div className="mt-10">
          <FoundingInlineForm />
        </div>
      </section>

      <section className="border-t border-white/10 bg-brand-charcoal/50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-10 h-px w-24 bg-white/10" />
            <p className="font-body text-brand-gray">
              Want to book an intro session? Sessions open when we launch.
            </p>
            <p className="mt-3 font-body text-sm text-brand-gray/80">
              Intro sessions open at launch — sign up above to get founding member pricing first.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-md opacity-60">
            <p className="mb-4 text-center font-body text-xs text-brand-gray">
              Intro pricing when available: $35 one dog / $55 two dogs from the same household.
            </p>
            <div className="mb-6 flex flex-wrap justify-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-brand-offwhite/70">
                <input
                  type="radio"
                  name="intro-dogs"
                  checked={dogCount === 1}
                  onChange={() => setDogCount(1)}
                  className="accent-brand-teal"
                />
                1 dog
              </label>
              <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-brand-offwhite/70">
                <input
                  type="radio"
                  name="intro-dogs"
                  checked={dogCount === 2}
                  onChange={() => setDogCount(2)}
                  className="accent-brand-teal"
                />
                2 dogs, same household
              </label>
            </div>
          </div>

          <div
            ref={widgetHostRef}
            className="mx-auto max-w-4xl opacity-60"
            style={{ minHeight: '700px', width: '100%' }}
          />
        </div>
      </section>
    </main>
  );
}

function FoundingInlineForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const inputClass =
    'w-full bg-brand-black border border-white/10 focus:border-brand-teal text-brand-offwhite rounded-none py-3 px-4 font-body outline-none transition-colors';
  const labelClass = 'mb-2 block font-body text-xs uppercase tracking-widest text-brand-gray';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) return;
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/mojrrvdd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          _replyto: email.trim(),
          _honeypot: '',
          _subject: "Founding Athlete — booking page — Kai's Run",
          _tag: 'founding-20',
        }),
      });
      if (res.ok) {
        try {
          trackFoundingAthlete(200);
        } catch {
          /* defensive */
        }
        subscribeToMailchimp(email.trim(), name.trim(), ['founding-20']).catch(() => {});
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className="font-body text-lg text-brand-teal">{FOUNDING_SUCCESS_COPY}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' ? (
        <p className="font-body text-sm text-brand-gold" role="alert">
          Something went wrong. Email kaisrunmobile@gmail.com or call 850-218-5855.
        </p>
      ) : null}
      <div>
        <label htmlFor="founding-name" className={labelClass}>
          Name
        </label>
        <input
          id="founding-name"
          required
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="founding-email" className={labelClass}>
          Email
        </label>
        <input
          id="founding-email"
          type="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="founding-phone" className={labelClass}>
          Phone
        </label>
        <input
          id="founding-phone"
          type="tel"
          required
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="founding-msg" className={labelClass}>
          Message
        </label>
        <textarea
          id="founding-msg"
          required
          rows={4}
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          className={`${inputClass} min-h-[6.5rem] resize-y`}
          disabled={status === 'submitting'}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-brand-teal py-3 font-display text-xl tracking-wide text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit founding request'}
      </button>
    </form>
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
