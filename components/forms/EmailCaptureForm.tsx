'use client';

import { useState, FormEvent } from 'react';
import { trackLeadCapture } from '@/lib/googleAds';

const inputClass =
  'w-full bg-[#1A1F2E] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-2 font-body';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export type EmailCaptureFormProps = {
  formspreeEndpoint: string;
  subject: string;
  formTag: string;
  mailchimpTags?: string[];
  submitLabel?: string;
  className?: string;
};

/**
 * Minimal email capture for newsletter / lead magnets. Posts to Formspree, optionally syncs
 * `/api/subscribe`, and fires {@link trackLeadCapture} only after a successful submission.
 */
export default function EmailCaptureForm({
  formspreeEndpoint,
  subject,
  formTag,
  mailchimpTags = ['newsletter'],
  submitLabel = 'Subscribe',
  className = '',
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName || undefined,
          _replyto: trimmedEmail,
          _honeypot: '',
          _subject: subject,
          _tag: formTag,
        }),
      });

      if (res.ok) {
        try {
          trackLeadCapture();
        } catch {
          /* tracked in lib */
        }
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmedEmail,
            name: trimmedName,
            tags: mailchimpTags,
          }),
        }).catch(() => {});
        setEmail('');
        setName('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={className}>
      {status === 'success' ? (
        <p className="font-body text-base text-[#0A5C52]" role="status">
          You&apos;re subscribed. Watch your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <input type="hidden" name="_honeypot" defaultValue="" />
          <div className="flex-1">
            <label htmlFor="email-capture-email" className={labelClass}>
              Email
            </label>
            <input
              id="email-capture-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              disabled={status === 'submitting'}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email-capture-name" className={labelClass}>
              Name (optional)
            </label>
            <input
              id="email-capture-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              className={inputClass}
              disabled={status === 'submitting'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="min-h-[52px] bg-[#0A5C52] px-8 font-display text-lg tracking-wide text-white transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : submitLabel}
          </button>
          {status === 'error' ? (
            <p className="font-body text-sm text-[#C9963A] sm:col-span-full" role="alert">
              Something went wrong. Try again or call 850-218-5855.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
