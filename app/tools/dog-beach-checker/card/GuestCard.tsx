'use client';

import { useEffect, useMemo, useState } from 'react';
import qrcode from 'qrcode-generator';
import { SPOTS, DEFAULT_SPOT_ID, spotById, AREAS } from '@/lib/beach/rules';
import type { Spot } from '@/lib/beach/rules';
import { printOnlyTarget } from '@/lib/printTarget';
import { trackToolUse } from '@/lib/analytics/trackToolUse';

const SITE = 'https://kaisrun.xyz';

function sandLine(s: Spot): string {
  if (s.rule.sand === 'yes') return 'Dogs are allowed here.';
  if (s.rule.sand === 'permit')
    return 'Guests cannot bring a dog onto this sand. The county permit is for residents and property owners only.';
  if (s.rule.sand === 'unknown') return 'No official rule found. Follow the posted signs.';
  return s.rule.trails ? 'No dogs on the sand. Leashed dogs are OK on trails and paths.' : 'No dogs on this sand, leashed or not.';
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Rental-host kit: a print-ready half page for the house binder. QR is generated in the
 * browser (qrcode-generator, no third-party service) and points back to the live rule.
 */
export default function GuestCard() {
  const [spotId, setSpotId] = useState(DEFAULT_SPOT_ID);

  // Read ?spot= after mount so the page stays static with no Suspense boundary.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('spot');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time preset from the URL
    if (spotById(id)) setSpotId(id as string);
  }, []);

  const spot = spotById(spotId) ?? SPOTS[0];
  const url = `${SITE}/tools/dog-beach-checker/?spot=${spot.id}`;
  const svg = useMemo(() => {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }, [url]);

  const alternatives = spot.alternatives
    .map((id) => spotById(id))
    .filter((s): s is Spot => Boolean(s) && s!.rule.sand !== 'no' && s!.rule.sand !== 'unknown')
    .slice(0, 2);

  return (
    <div>
      <div className="print-hide mb-6 flex flex-wrap items-end gap-4 font-body text-sm text-brand-gray">
        <label className="flex flex-col gap-1">
          <span>Beach near your rental</span>
          <select
            value={spot.id}
            onChange={(e) => {
              setSpotId(e.target.value);
              try {
                const u = new URL(window.location.href);
                u.searchParams.set('spot', e.target.value);
                window.history.replaceState(null, '', u.toString());
              } catch {
                /* ignore */
              }
            }}
            className="rounded-none border border-white/10 bg-brand-black px-3 py-2 text-brand-offwhite"
          >
            {AREAS.map((area) => (
              <optgroup key={area} label={area}>
                {SPOTS.filter((s) => s.area === area).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.short}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            trackToolUse('dog-beach-checker', { action: 'guest-card-print', spot: spot.id });
            printOnlyTarget();
          }}
          className="bg-brand-teal px-4 py-2 font-medium text-white hover:bg-brand-teal/90"
        >
          Print guest card
        </button>
      </div>

      <article className="print-target rounded-xl border border-white/20 bg-brand-charcoal/60 p-6 font-body text-brand-offwhite">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-teal-light">Dogs and the beach</p>
        <h2 className="mt-1 font-display text-3xl">{spot.short}</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-[1fr_auto]">
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="text-base font-semibold">{sandLine(spot)}</p>
            {spot.rule.sand !== 'no' && (
              <p>
                <span className="text-brand-gray">Hours:</span> {spot.rule.hoursText}
              </p>
            )}
            {spot.rule.sand !== 'no' && (
              <p>
                <span className="text-brand-gray">Leash:</span> {spot.rule.leashText}
              </p>
            )}
            {alternatives.length > 0 && (
              <div>
                <p className="text-brand-gray">Where a visiting dog can go instead:</p>
                <ul className="mt-1 list-disc pl-5">
                  {alternatives.map((a) => (
                    <li key={a.id}>
                      {a.short} - {a.rule.hoursText}
                      {a.driveMinutesFromDestin ? `, about ${a.driveMinutesFromDestin} min from Destin` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-brand-gray">
              Source: {spot.source.label}
              {spot.source.section ? ` ${spot.source.section}` : ''}, checked {formatDate(spot.verifiedOn)}. Posted
              signs govern. Rules change - scan for the current rule.
            </p>
          </div>
          <div className="text-center">
            <div
              className="mx-auto h-36 w-36 rounded bg-white p-1"
              aria-label={`QR code linking to ${url}`}
              role="img"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            <p className="mt-2 text-[11px] text-brand-gray">Scan for today&apos;s rule</p>
          </div>
        </div>
        <p className="mt-4 border-t border-white/10 pt-3 text-xs text-brand-gray">
          Emerald Coast Dog Beach Checker by Kai&apos;s Run - kaisrun.xyz/tools/dog-beach-checker/
        </p>
      </article>
    </div>
  );
}
