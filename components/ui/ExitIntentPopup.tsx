'use client';
import { useEffect, useState } from 'react';

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-md rounded-lg bg-brand-charcoal p-8 text-center">
        <button
          className="absolute right-4 top-4 text-brand-gray hover:text-brand-offwhite"
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          ✕
        </button>
        <p className="mb-1 font-display text-sm tracking-widest text-brand-teal uppercase">
          Before you go
        </p>
        <h2 className="mb-3 font-display text-3xl text-brand-offwhite">
          $35 Intro Session
        </h2>
        <p className="mb-6 font-body text-brand-gray text-sm">
          Your dog's first structured conditioning session — delivered to your driveway.
          One dog. Private. No drop-off.
        </p>
        <a
          href="/book/"
          className="block w-full rounded bg-brand-teal py-3 font-display text-lg tracking-wider text-brand-offwhite hover:opacity-90"
        >
          Book Now
        </a>
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
