'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Super Dad 2026 — first-round vote prompt, homepage only.
 *
 * Self-expiring: after ROUND_ENDS this renders nothing, so the campaign copy
 * cannot outlive the round it refers to. Delete the component after the season.
 *
 * Deliberately NOT a full-screen interstitial. This is a mobile lead-gen page,
 * and an overlay covering the content would put both bookings and Google's
 * intrusive-interstitial guidance at risk. It sits in the corner instead.
 */

// Thursday, September 17 2026, 7:00 PM PDT.
const ROUND_ENDS = new Date('2026-09-18T02:00:00Z');
const DISMISS_KEY = 'sd-vote-dismissed';

export function VotePromo() {
  const [show, setShow] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const msLeft = ROUND_ENDS.getTime() - Date.now();
    if (msLeft <= 0) return;

    let dismissed = false;
    let consentAnswered = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1';
      // The cookie bar owns the bottom edge until it is answered. Wait our turn.
      consentAnswered = localStorage.getItem('cookie-consent') !== null;
    } catch {
      // Storage blocked (private mode). Treat as a first visit rather than breaking.
      consentAnswered = true;
    }
    if (dismissed || !consentAnswered) return;

    setDaysLeft(Math.ceil(msLeft / 86_400_000));
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* nothing to persist to; the card is closed for this page view */
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show, dismiss]);

  if (!show) return null;

  return (
    <aside
      role="complementary"
      aria-label="Super Dad competition"
      className="fixed bottom-4 left-4 right-4 z-40 sm:right-auto sm:max-w-sm
                 rounded-lg border border-brand-gold/40 bg-brand-charcoal/95
                 p-4 shadow-2xl backdrop-blur"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded
                   text-brand-gray transition-colors hover:text-brand-offwhite
                   focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex items-baseline gap-3">
        <span className="font-display text-5xl leading-none text-brand-gold">{daysLeft}</span>
        <span className="font-body text-sm text-brand-gray">
          {daysLeft === 1 ? 'day left to vote' : 'days left to vote'}
        </span>
      </div>

      <p className="mt-2 font-body text-sm leading-snug text-brand-offwhite">
        Travis, who runs Kai&apos;s Run, is competing for a national Ace Hardware commercial
        and $25,000, raising money for Children&apos;s Miracle Network. Free, once a day.
      </p>

      <a
        href="/vote"
        target="_blank"
        rel="noopener"
        onClick={dismiss}
        className="mt-3 block rounded bg-brand-gold px-4 py-3 text-center font-body
                   text-sm font-semibold text-brand-black transition-opacity hover:opacity-90
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-brand-gold"
      >
        Vote free
      </a>
    </aside>
  );
}
