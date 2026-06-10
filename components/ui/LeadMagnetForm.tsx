'use client';

import { useState, FormEvent } from 'react';
import { trackLeadCapture } from '@/lib/googleAds';
import { subscribeToMailchimp } from '@/lib/subscribe';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqbbwrl';
const FORMSPREE_SUBJECT = "New email signup — Kai's Run website";
const FORMSPREE_FORM_TAG = 'energy-guide';

const inputClass =
  'w-full bg-[#1A1F2E] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-2 font-body';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadMagnetForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    try {
      const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          _replyto: trimmedEmail,
          _honeypot: '',
          _subject: FORMSPREE_SUBJECT,
          _tag: FORMSPREE_FORM_TAG,
        }),
      });

      if (formspreeRes.ok) {
        subscribeToMailchimp(trimmedEmail, trimmedName, ['energy-guide']).catch(() => {
          // Silent fail — Formspree already captured the lead
        });
        setName('');
        setEmail('');
        setStatus('success');
        try {
          trackLeadCapture();
        } catch {
          /* defensive */
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      {status === 'success' ? (
        <p className="text-brand-offwhite font-body text-lg text-center">
          You&apos;re on the list. We&apos;ll reach out before we open.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="_honeypot" defaultValue="" />
          <input type="hidden" name="_subject" defaultValue={FORMSPREE_SUBJECT} />
          <input type="hidden" name="_tag" defaultValue={FORMSPREE_FORM_TAG} />
          {status === 'error' && (
            <p className="font-body text-sm md:text-base text-[#C9963A] text-center" role="alert" aria-live="polite">
              Something went wrong. Call or text us at{' '}
              <a href="tel:+18502185855" className="underline underline-offset-2 hover:opacity-90">
                850-218-5855
              </a>
              .
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lead-name" className={labelClass}>
                Your Name
              </label>
              <input
                id="lead-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name is fine"
                className={inputClass}
                disabled={status === 'submitting'}
              />
            </div>

            <div>
              <label htmlFor="lead-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputClass}
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-[#0A5C52] text-white font-display text-xl rounded-none min-h-[52px] px-4 py-3 tracking-wide hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Get Updates'}
          </button>
        </form>
      )}
      <p className="text-brand-gray font-body text-xs text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
