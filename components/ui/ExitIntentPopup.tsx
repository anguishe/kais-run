'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { setBookIntentSource } from '@/lib/bookIntent';

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Move focus into the dialog on open, close on Escape, restore focus on close.
  useEffect(() => {
    if (!visible) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      prevFocusRef.current?.focus();
    };
  }, [visible]);

  useEffect(() => {
    if (sessionStorage.getItem('exit-intent-dismissed')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setVisible(true);
        setDismissed(true);
        sessionStorage.setItem('exit-intent-dismissed', '1');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [dismissed]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div className="relative w-full max-w-md rounded-lg bg-brand-charcoal p-8 text-center">
        <button
          ref={closeBtnRef}
          className="absolute right-4 top-4 text-brand-gray hover:text-brand-offwhite"
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          ✕
        </button>
        <p className="mb-1 font-display text-sm tracking-widest text-brand-teal-light uppercase">
          Before you go
        </p>
        <h2 id="exit-intent-title" className="mb-3 font-display text-3xl text-brand-offwhite">
          Join the Founding 20 - $200
        </h2>
        <p className="mb-6 font-body text-brand-gray text-sm">
          Five structured slatmill sessions at $40 each - delivered to your driveway. A one-time
          founding rate for the first 20 dogs. Never offered again.
        </p>
        <Link
          href="/book/?offer=founding#founding-checkout"
          className="block w-full rounded bg-brand-teal py-3 font-display text-lg tracking-wider text-brand-offwhite hover:opacity-90"
          onClick={() => setBookIntentSource('exit-intent-founding')}
        >
          Claim Your Founding Spot
        </Link>
        <button
          className="mt-3 font-body text-xs text-brand-gray underline"
          onClick={() => setVisible(false)}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
