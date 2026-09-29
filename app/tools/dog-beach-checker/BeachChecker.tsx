'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AREAS, AREA_SLUG, DEFAULT_SPOT_ID, SPOTS, spotById } from '@/lib/beach/rules';
import type { Spot } from '@/lib/beach/rules';
import {
  VERDICT_CHIP,
  formatCountdown,
  verdictFor,
  wallFromDate,
  wallFromLocalInput,
  wallToLocalInput,
} from '@/lib/beach/verdict';
import type { BeachVerdict, Wall } from '@/lib/beach/verdict';
import {
  exposureAt,
  heatIndexF,
  pavementEstimateF,
  safeWindows,
  splitDays,
  verdict as heatVerdict,
} from '@/lib/heat/verdict';
import type { HourSample } from '@/lib/heat/verdict';
import { trackToolUse } from '@/lib/analytics/trackToolUse';
import { printOnlyTarget } from '@/lib/printTarget';

const SITE = 'https://kaisrun.xyz';
const PAGE = '/tools/dog-beach-checker/';

const CHIP_STYLE: Record<BeachVerdict, string> = {
  allowed: 'bg-brand-teal text-white',
  'allowed-window': 'bg-brand-gold text-brand-black',
  'closed-now': 'bg-brand-gold text-brand-black',
  'trails-only': 'bg-brand-gray text-brand-black',
  'not-allowed': 'bg-brand-danger text-white',
  unverified: 'bg-brand-gray text-brand-black',
};

type Conditions =
  | { status: 'idle' | 'loading' | 'error' }
  | { status: 'done'; line: string; windowLine: string };

function nowHourISO(): string {
  return new Date().toLocaleString('sv-SE', { timeZone: 'America/Chicago' }).replace(' ', 'T').slice(0, 13) + ':00';
}

function formatVerified(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function shareUrl(spotId: string, resident: boolean): string {
  const p = new URLSearchParams({ spot: spotId });
  if (resident) p.set('resident', '1');
  return `${SITE}${PAGE}?${p.toString()}`;
}

export function BeachChecker({ embed = false }: { embed?: boolean }) {
  const params = useSearchParams();
  const areaParam = params.get('area');
  const presetSpot = spotById(params.get('spot'));
  const presetResident = params.get('resident') === '1';

  const areas = useMemo(() => {
    const match = AREAS.find((a) => AREA_SLUG[a] === areaParam);
    return match ? [match] : AREAS;
  }, [areaParam]);

  const [spotId, setSpotId] = useState<string>(
    presetSpot?.id ?? SPOTS.find((s) => areas.includes(s.area))?.id ?? DEFAULT_SPOT_ID,
  );
  const [resident, setResident] = useState(presetResident);
  const [customTime, setCustomTime] = useState<string | null>(null);
  const [showTime, setShowTime] = useState(false);
  const [now, setNow] = useState<Wall | null>(null);
  const [copied, setCopied] = useState(false);
  const [conditions, setConditions] = useState<Conditions>({ status: 'idle' });
  const rootRef = useRef<HTMLDivElement>(null);

  // Clock starts after mount so the server render never bakes in a build-time verdict.
  useEffect(() => {
    const tick = () => setNow(wallFromDate(new Date()));
    tick();
    const t = setInterval(tick, 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const spot: Spot = spotById(spotId) ?? SPOTS[0];
  const at: Wall | null = customTime ? wallFromLocalInput(customTime) : now;
  const result = at ? verdictFor(spot, { resident, at }) : null;
  const isNow = !customTime;

  // Track each distinct check once.
  useEffect(() => {
    if (!result) return;
    const detail: Record<string, string | number> = {
      spot: spot.id,
      resident: resident ? 1 : 0,
      verdict: result.verdict,
      embed: embed ? 1 : 0,
    };
    if (embed && typeof document !== 'undefined' && document.referrer) {
      try {
        detail.host = new URL(document.referrer).origin;
      } catch {
        /* ignore bad referrer */
      }
    }
    trackToolUse('dog-beach-checker', detail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot.id, resident, result?.verdict, embed]);

  // Live conditions for the spot, "now" only. Failure hides the strip; it never blocks the verdict.
  useEffect(() => {
    if (!isNow) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading flag for a fetch keyed on the spot
    setConditions({ status: 'loading' });
    fetch(`/api/heat?lat=${spot.lat}&lon=${spot.lon}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { tempF: number; humidity: number; hourly: HourSample[] }) => {
        if (cancelled) return;
        const hi = heatIndexF(d.tempF, d.humidity);
        const pav = pavementEstimateF(d.tempF, exposureAt(nowHourISO()));
        const v = heatVerdict({ heatIndexF: hi, pavementSunF: pav });
        const w = safeWindows(splitDays(d.hourly)[0]?.hours ?? []);
        const windowLine = w.allDayUnsafe
          ? 'No safe walking window left today.'
          : w.allDaySafe
            ? 'Safe for a walk all day.'
            : [w.morningBefore && `walk before ${w.morningBefore}`, w.eveningAfter && `after ${w.eveningAfter}`]
                .filter(Boolean)
                .join(', ')
                .replace(/^./, (c) => c.toUpperCase()) + '.';
        setConditions({
          status: 'done',
          line: `${Math.round(d.tempF)}F air, sand and pavement near ${pav}F. ${v.headline}.`,
          windowLine,
        });
      })
      .catch(() => {
        if (!cancelled) setConditions({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [spot.lat, spot.lon, isNow]);

  // Embed: tell the host page our height (optional listener in the snippet).
  useEffect(() => {
    if (!embed || typeof window === 'undefined' || window.parent === window) return;
    const el = rootRef.current;
    if (!el) return;
    const post = () =>
      window.parent.postMessage({ type: 'kaisrun-embed-height', height: document.documentElement.scrollHeight }, '*');
    const ro = new ResizeObserver(post);
    ro.observe(el);
    post();
    return () => ro.disconnect();
  }, [embed]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(spot.id, resident));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked - the URL is still in the address bar on the main page */
    }
  };

  const alternatives = (result?.alternatives ?? [])
    .map((id) => spotById(id))
    .filter((s): s is Spot => Boolean(s))
    .slice(0, 3);

  return (
    <div ref={rootRef} className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-brand-charcoal/60 p-5 space-y-5">
        <div>
          <label htmlFor="beach-spot" className="block font-body text-sm font-medium text-brand-offwhite">
            Where are you taking the dog?
          </label>
          <select
            id="beach-spot"
            value={spot.id}
            onChange={(e) => setSpotId(e.target.value)}
            className="mt-2 w-full rounded-none border border-white/10 bg-brand-black px-4 py-3 font-body text-brand-offwhite focus:border-teal-600"
          >
            {areas.map((area) => (
              <optgroup key={area} label={area}>
                {SPOTS.filter((s) => s.area === area).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.short}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <label className="flex items-start gap-3 font-body text-sm text-brand-gray">
          <input
            type="checkbox"
            checked={resident}
            onChange={(e) => setResident(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#0A5C52]"
          />
          <span>I live in or own property in Walton County and have a dog beach permit</span>
        </label>

        <div className="font-body text-sm text-brand-gray">
          {customTime ? 'Checking for ' : 'Checking for right now'}
          {customTime && at && <span className="text-brand-offwhite">{customTime.replace('T', ' at ')}</span>}{' '}
          <button
            type="button"
            onClick={() => {
              if (showTime) {
                setShowTime(false);
                setCustomTime(null);
              } else {
                setShowTime(true);
                if (now) setCustomTime(wallToLocalInput(now));
              }
            }}
            className="text-brand-teal-light underline"
          >
            {showTime ? 'Back to now' : 'Change'}
          </button>
          {showTime && (
            <div className="mt-2">
              <label htmlFor="beach-time" className="sr-only">
                Date and time (Central)
              </label>
              <input
                id="beach-time"
                type="datetime-local"
                value={customTime ?? ''}
                onChange={(e) => setCustomTime(e.target.value || null)}
                className="rounded-none border border-white/10 bg-brand-black px-3 py-2 font-body text-brand-offwhite"
              />
              <span className="ml-2 text-xs">Central time</span>
            </div>
          )}
        </div>
      </div>

      <div id="beach-result" aria-live="polite" className="print-target rounded-xl border border-white/10 bg-brand-charcoal/60 p-5">
        {!result ? (
          <p className="font-body text-brand-gray">Checking the rule for {spot.short}.</p>
        ) : (
          <div className="space-y-4">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-teal-light">{spot.short}</p>
            <p className={`inline-block rounded px-3 py-2 font-body text-sm font-semibold ${CHIP_STYLE[result.verdict]}`}>
              {VERDICT_CHIP[result.verdict]}
            </p>
            <p className="font-body text-brand-offwhite leading-relaxed">{result.reason}</p>

            {result.nextLegalWindow && (
              <p className="font-body text-brand-offwhite">
                Next legal window: <strong>{result.nextLegalWindow.startLabel}</strong> to{' '}
                {result.nextLegalWindow.endLabel}{' '}
                <span className="text-brand-gray">(in {formatCountdown(result.nextLegalWindow.minutesUntil)})</span>
              </p>
            )}
            {result.closesAt && (
              <p className="font-body text-brand-gray">Legal until {result.closesAt}.</p>
            )}

            <dl className="grid gap-2 font-body text-sm text-brand-gray sm:grid-cols-2">
              <div>
                <dt className="text-brand-offwhite">Hours</dt>
                <dd>{result.todayHours ? `Today: ${result.todayHours}` : spot.rule.hoursText}</dd>
              </div>
              <div>
                <dt className="text-brand-offwhite">Leash</dt>
                <dd>{spot.rule.leashText}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-brand-offwhite">Who</dt>
                <dd>{spot.rule.whoText}</dd>
              </div>
            </dl>
            <p className="font-body text-sm text-brand-gray leading-relaxed">{spot.rule.notes}</p>

            <p className="font-body text-sm text-brand-gray">
              Source:{' '}
              <a href={spot.source.url} target="_blank" rel="noopener" className="text-brand-teal-light underline">
                {spot.source.label}
                {spot.source.section ? ` ${spot.source.section}` : ''}
              </a>
              , verified {formatVerified(spot.verifiedOn)}.
              {spot.source.quote && (
                <span className="mt-1 block italic">&ldquo;{spot.source.quote}&rdquo;</span>
              )}
            </p>

            {(spot.kind === 'gulf-beach' || spot.kind === 'dog-beach') && (
              <p className="font-body text-sm text-brand-gray">
                During a red tide bloom, keep the dog off the sand and out of the water even where it is legal.{' '}
                <Link
                  href="/blog/red-tide-dogs-emerald-coast/"
                  className="text-brand-teal-light underline"
                  target={embed ? '_blank' : undefined}
                >
                  Why
                </Link>
                .
              </p>
            )}

            {alternatives.length > 0 && (
              <div className="print-hide">
                <h3 className="font-display text-2xl text-brand-offwhite">Nearest legal alternatives</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {alternatives.map((alt) => {
                    const altResult = at ? verdictFor(alt, { resident, at }) : null;
                    return (
                      <li key={alt.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSpotId(alt.id);
                            rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="h-full w-full rounded-lg border border-white/10 bg-brand-black/60 p-3 text-left transition-colors hover:border-brand-teal"
                        >
                          <span className="block font-body text-sm font-medium text-brand-offwhite">{alt.short}</span>
                          {altResult && (
                            <span className="mt-1 block font-body text-xs text-brand-gray">
                              {VERDICT_CHIP[altResult.verdict]}
                            </span>
                          )}
                          {alt.driveMinutesFromDestin && (
                            <span className="mt-1 block font-body text-xs text-brand-gray">
                              about {alt.driveMinutesFromDestin} min from Destin
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {isNow && conditions.status === 'done' && (
              <div className="print-hide rounded-lg border border-brand-gold/30 bg-brand-gold/10 p-3 font-body text-sm text-brand-offwhite">
                <p>
                  <strong>Conditions now:</strong> {conditions.line} {conditions.windowLine}
                </p>
                <Link
                  href={spot.heatZip ? `/tools/too-hot-to-walk/?zip=${spot.heatZip}` : '/tools/too-hot-to-walk/'}
                  className="text-brand-teal-light underline"
                  target={embed ? '_blank' : undefined}
                >
                  Full hour-by-hour
                </Link>
              </div>
            )}

            {(result.verdict === 'not-allowed' || result.verdict === 'closed-now' || result.verdict === 'trails-only') && (
              <p className="print-hide font-body text-sm">
                <Link
                  href="/tools/dog-exercise-calculator/"
                  className="text-brand-teal-light underline"
                  target={embed ? '_blank' : undefined}
                >
                  No beach today? Get your dog&apos;s daily number
                </Link>
              </p>
            )}

            <div className="print-hide flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={copyLink}
                className="bg-brand-teal px-4 py-2 font-body text-sm font-medium text-white hover:bg-brand-teal/90"
              >
                {copied ? 'Link copied' : 'Copy link to this rule'}
              </button>
              {!embed && (
                <button
                  type="button"
                  onClick={printOnlyTarget}
                  className="border border-white/20 px-4 py-2 font-body text-sm text-brand-offwhite hover:border-brand-teal"
                >
                  Print this rule
                </button>
              )}
            </div>
            <p className="font-body text-xs text-brand-gray">
              Not legal advice. Posted signs and the current ordinance govern.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
