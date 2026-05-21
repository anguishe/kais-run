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

function BookPageInner() {
  const params = useSearchParams();
  const offerFounding = params.get('offer') === 'founding';
  const widgetHostRef = useRef<HTMLDivElement>(null);
  const [dogCount, setDogCount] = useState<1 | 2>(1);

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
    <>
      <main className="min-h-screen bg-[#0F1117] pt-24">
        <div className="mx-auto max-w-4xl px-6 pb-12 text-center">
          <p className="mb-3 font-sans text-sm tracking-[0.25em] text-[#0A5C52] uppercase">
            Destin · Fort Walton Beach · Niceville
          </p>
          <h1 className="mb-4 font-display text-6xl text-[#F0EDE6] md:text-8xl">BOOK YOUR SESSION</h1>
          <p className="mx-auto max-w-xl text-lg text-[#9A9590]">
            {offerFounding
              ? 'Founding Athlete — $200 for 5 sessions. Use the form below to claim your spot, or book a standard session in the calendar.'
              : "New dogs start with the Kai's Run Welcome — $35. Select your session type below."}
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-[#0A5C52]" />
        </div>

        {offerFounding ? (
          <section className="border-y border-white/10 bg-[#1A1F2E] px-6 py-16">
            <div className="mx-auto max-w-2xl text-center md:text-left">
              <p className="font-body text-xs tracking-[0.28em] text-[#0A5C52] uppercase">Founding Athlete</p>
              <h2 className="mt-3 font-display text-4xl text-[#F0EDE6] md:text-5xl">Reserve at $200</h2>
              <p className="mt-4 font-body text-[#9A9590]">
                Submit the form — Travis confirms each founding spot personally. Conversion fires only after a
                successful send.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl">
              <FoundingInlineForm />
            </div>
          </section>
        ) : null}

        <div className="mx-auto max-w-4xl px-6 pt-10">
          <p className="mb-4 text-center font-body text-sm text-[#9A9590]">
            Intro pricing uses your selection below ($35 one dog / $55 two dogs).
          </p>
          <div className="mx-auto mb-6 flex max-w-md flex-wrap justify-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-[#F0EDE6]">
              <input
                type="radio"
                name="intro-dogs"
                checked={dogCount === 1}
                onChange={() => setDogCount(1)}
                className="accent-[#0A5C52]"
              />
              1 dog ($35 intro)
            </label>
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-[#F0EDE6]">
              <input
                type="radio"
                name="intro-dogs"
                checked={dogCount === 2}
                onChange={() => setDogCount(2)}
                className="accent-[#0A5C52]"
              />
              2 dogs ($55 intro)
            </label>
          </div>
        </div>

        <div
          ref={widgetHostRef}
          className="mx-auto max-w-4xl px-6 pb-24"
          style={{ minHeight: '700px', width: '100%' }}
        />
      </main>
    </>
  );
}

/** Founding-only inline form so conversions fire only for `?offer=founding` (not the global footer form). */
function FoundingInlineForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const inputClass =
    'w-full bg-[#0F1117] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';
  const labelClass = 'mb-2 block font-body text-xs uppercase tracking-widest text-[#9A9590]';

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
        subscribeToMailchimp(email.trim(), name.trim(), ['founding-athlete']).catch(() => {});
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
    return (
      <p className="font-body text-lg text-[#0A5C52]">
        You&apos;re in. Travis will reach out personally to confirm your founding spot.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' ? (
        <p className="font-body text-sm text-[#C9963A]" role="alert">
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
        className="w-full bg-[#0A5C52] py-3 font-display text-xl tracking-wide text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit founding request'}
      </button>
    </form>
  );
}

function BookPageFallback() {
  return (
    <main className="min-h-screen bg-[#0F1117] pt-24">
      <div className="mx-auto max-w-4xl px-6 pb-12 text-center">
        <h1 className="font-display text-6xl text-[#F0EDE6] md:text-8xl">BOOK YOUR SESSION</h1>
        <p className="mt-4 text-[#9A9590]">Loading booking options…</p>
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
