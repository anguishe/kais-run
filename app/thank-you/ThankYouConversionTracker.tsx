'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  trackFoundingAthlete,
  trackIntroSession,
  trackLeadCapture,
  trackMembership,
} from '@/lib/googleAds';

/**
 * Fires Google Ads conversions from `/thank-you?type=…` once per page load (deduped with a ref).
 */
export default function ThankYouConversionTracker() {
  const params = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    const type = params.get('type');
    if (!type) return;
    fired.current = true;

    try {
      switch (type) {
        case 'founding':
          trackFoundingAthlete(200);
          break;
        case 'intro': {
          const dogs = params.get('dogs');
          const value = dogs === '2' ? 55 : 35;
          trackIntroSession(value);
          break;
        }
        case 'membership': {
          const tier = params.get('tier') ?? 'membership';
          const raw = params.get('value');
          const value = raw ? Number.parseFloat(raw) : NaN;
          if (Number.isFinite(value)) {
            trackMembership(value, tier);
          }
          break;
        }
        case 'lead':
          trackLeadCapture();
          break;
        default:
          if (process.env.NODE_ENV === 'development') {
            console.info('[Google Ads] thank-you unknown type', type);
          }
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Google Ads] thank-you conversion', e);
      }
    }
  }, [params]);

  return null;
}
