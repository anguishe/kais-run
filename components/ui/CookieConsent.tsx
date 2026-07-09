'use client';

import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    window.dispatchEvent(new Event('cookie-consent-accepted'));
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
    window.dispatchEvent(new Event('cookie-consent-declined'));
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-charcoal border-t border-brand-teal/30 px-4 py-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-sm text-brand-gray">
          We use analytics cookies to improve the site.{' '}
          <a href="/privacy/" className="text-brand-teal-light underline">Privacy Policy</a>
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="rounded border border-brand-gray px-4 py-2 font-body text-sm text-brand-gray hover:border-brand-offwhite hover:text-brand-offwhite"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded bg-brand-teal px-4 py-2 font-body text-sm text-brand-offwhite hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
