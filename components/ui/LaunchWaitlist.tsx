'use client';

import { useState, FormEvent } from 'react';
import { trackLeadCapture } from '@/lib/googleAds';
import { subscribeToMailchimp } from '@/lib/subscribe';

// Same Formspree form as the footer waitlist (email to Travis); _tag tells them apart.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykolrrr';

// ponytail: names copied from lib/service-area/cities.ts so this client form does not
// bundle every city page's copy. Add a city there, add it here.
const CITIES = [
  'Destin',
  'Fort Walton Beach',
  'Niceville',
  'Miramar Beach',
  'Sandestin',
  'Shalimar',
  'Mary Esther',
  'Navarre',
  'Santa Rosa Beach',
  'Bluewater Bay',
  'Valparaiso',
];
const OTHER = 'Somewhere else';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Two-field launch list for readers of the blog and tools. The trailer is not
 * operational yet, so this captures the demand those pages create until it is.
 * Mailchimp gets the city and the source as tags (the worker only stores tags + name).
 */
export default function LaunchWaitlist({ source }: { source: string }) {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gotcha) return; // honeypot: a person never fills the hidden field
    setStatus('submitting');
    const trimmed = email.trim();
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          city,
          source,
          _replyto: trimmed,
          _subject: `Launch waitlist - ${city} - Kai's Run website`,
          _tag: 'launch-waitlist',
        }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      subscribeToMailchimp(trimmed, '', [
        'launch-waitlist',
        `city-${city === OTHER ? 'other' : slug(city)}`,
        `src-${slug(source)}`,
      ]).catch(() => {
        // Formspree already has the lead
      });
      try {
        trackLeadCapture();
      } catch {
        /* defensive */
      }
      setEmail('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      aria-labelledby={`launch-waitlist-${slug(source)}`}
      className="my-12 rounded-xl border border-brand-gold/30 bg-brand-charcoal/60 px-6 py-8"
    >
      <h2
        id={`launch-waitlist-${slug(source)}`}
        className="font-display text-3xl tracking-tight text-brand-offwhite md:text-4xl"
      >
        The trailer is almost ready
      </h2>
      <p className="mt-3 font-body text-brand-gray leading-relaxed">
        Kai&apos;s Run is finishing the mobile slatmill trailer now. Leave your email and city - you
        get one email when sessions open near you, and nothing else.
      </p>

      {status === 'success' ? (
        <p className="mt-5 font-body text-brand-offwhite" role="status">
          You are on the list. One email when the trailer reaches {city === OTHER ? 'the Emerald Coast' : city}.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor={`lw-email-${slug(source)}`}>
            Email
          </label>
          <input
            id={`lw-email-${slug(source)}`}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 rounded-none border border-white/10 bg-brand-black px-4 py-3 font-body text-brand-offwhite focus:border-teal-600"
          />
          <label className="sr-only" htmlFor={`lw-city-${slug(source)}`}>
            City
          </label>
          <select
            id={`lw-city-${slug(source)}`}
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-none border border-white/10 bg-brand-black px-4 py-3 font-body text-brand-offwhite focus:border-teal-600"
          >
            <option value="" disabled>
              Your city
            </option>
            {[...CITIES, OTHER].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
            className="hidden"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-brand-teal px-6 py-3 font-body font-medium text-white transition hover:bg-brand-teal/90 disabled:opacity-60"
          >
            {status === 'submitting' ? 'Adding you' : 'Tell me at launch'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-3 font-body text-sm text-brand-gold" role="alert">
          That did not go through. Try again, or email kaisrunmobile@gmail.com.
        </p>
      )}
    </section>
  );
}
