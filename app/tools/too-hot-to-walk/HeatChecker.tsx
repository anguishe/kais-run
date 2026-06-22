'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { CITIES } from '@/lib/heat/cities';
import {
  heatIndexF,
  pavementEstimateF,
  verdict as computeVerdict,
  safeWindows,
  PAVEMENT_SOURCE,
} from '@/lib/heat/verdict';
import type { Band, HourSample, Modifiers } from '@/lib/heat/verdict';
import { trackToolUse } from '@/lib/analytics/trackToolUse';

type WeatherData = {
  tempF: number;
  humidity: number;
  feelsLikeF: number;
  hourly: HourSample[];
};

type CheckState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; kind: 'out-of-area' | 'weather-unavailable' }
  | { status: 'done'; weather: WeatherData; city: string; zip: string };

const MODIFIER_OPTIONS: { key: keyof Modifiers; label: string; why: string }[] = [
  { key: 'brachycephalic', label: 'Flat-faced breed', why: 'Cannot pant efficiently - overheats faster' },
  { key: 'senior', label: 'Senior dog', why: 'Thermoregulation declines with age' },
  { key: 'darkCoat', label: 'Dark coat', why: 'Absorbs more solar radiation' },
  { key: 'overweight', label: 'Overweight', why: 'Extra mass generates more heat under exertion' },
];

const BAND_CARD: Record<Band, string> = {
  safe: 'bg-brand-teal text-white',
  watch: 'bg-brand-teal/70 text-white',
  caution: 'bg-brand-gold text-brand-black',
  dangerous: 'bg-brand-danger text-white',
  'do-not-walk': 'bg-brand-black text-brand-gold border-2 border-brand-gold',
};

function HandTest({ className }: { className?: string }) {
  return (
    <p className={`text-sm italic ${className}`}>
      7-second hand test: press the back of your hand to the pavement. If you cannot hold it there
      for 7 seconds, the surface is too hot for paw pads.
    </p>
  );
}

export function HeatChecker() {
  const [exposure, setExposure] = useState<'sun' | 'shade'>('sun');
  const [modifiers, setModifiers] = useState<Modifiers>({});
  const [zipInput, setZipInput] = useState('');
  const [checkState, setCheckState] = useState<CheckState>({ status: 'idle' });
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  async function run(zip: string, cityLabel: string) {
    setCheckState({ status: 'loading' });
    try {
      const res = await fetch(`/api/heat?zip=${zip}`);
      const data = await res.json();
      if (!res.ok) {
        setCheckState({
          status: 'error',
          kind: data.error === 'out-of-area' ? 'out-of-area' : 'weather-unavailable',
        });
        return;
      }
      const weather = data as WeatherData;
      setCheckState({ status: 'done', weather, city: cityLabel, zip });
      const hi = heatIndexF(weather.tempF, weather.humidity);
      const pavSun = pavementEstimateF(weather.tempF, 'sun');
      const v = computeVerdict({ heatIndexF: hi, pavementSunF: pavSun, modifiers });
      trackToolUse('heat-checker', { city: cityLabel, band: v.band });
    } catch {
      setCheckState({ status: 'error', kind: 'weather-unavailable' });
    }
  }

  function handleZipSubmit() {
    if (zipInput.length !== 5) return;
    const known = CITIES.find((c) => c.zip === zipInput);
    run(zipInput, known?.city ?? zipInput);
  }

  function copyResult() {
    if (checkState.status !== 'done') return;
    const { weather, city } = checkState;
    const hi = heatIndexF(weather.tempF, weather.humidity);
    const pavSun = pavementEstimateF(weather.tempF, 'sun');
    const pavShade = pavementEstimateF(weather.tempF, 'shade');
    const v = computeVerdict({ heatIndexF: hi, pavementSunF: pavSun, modifiers });
    const windows = safeWindows(weather.hourly);
    const windowLine = windows.allDayUnsafe
      ? 'No safe window today.'
      : [
          windows.morningBefore && `Walk before ${windows.morningBefore}`,
          windows.eveningAfter && `Walk after ${windows.eveningAfter}`,
        ]
          .filter(Boolean)
          .join(' / ');

    const text = [
      `Kai's Run - Too Hot to Walk?`,
      `City: ${city}`,
      `Verdict: ${v.headline} (${v.band})`,
      `Air: ${weather.tempF}F | Heat index: ${hi}F`,
      `Pavement sun: ${pavSun}F | Pavement shade: ${pavShade}F`,
      v.reason,
      windowLine,
      '',
      PAVEMENT_SOURCE,
      'kaisrun.xyz/tools/too-hot-to-walk/',
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Derived verdict for AnimatePresence key (changes when band or exposure changes)
  let verdictKey = 'idle';
  if (checkState.status === 'done') {
    const hi = heatIndexF(checkState.weather.tempF, checkState.weather.humidity);
    const pavSun = pavementEstimateF(checkState.weather.tempF, 'sun');
    const v = computeVerdict({ heatIndexF: hi, pavementSunF: pavSun, modifiers });
    verdictKey = `${checkState.zip}-${v.band}`;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <div className="font-body">
      {/* City chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {CITIES.map((c) => (
          <button
            key={`${c.zip}-${c.city}`}
            onClick={() => run(c.zip, c.city)}
            className="px-3 py-1.5 rounded-full text-sm border border-brand-charcoal bg-brand-charcoal text-brand-offwhite hover:border-brand-teal transition-colors"
          >
            {c.city}
          </button>
        ))}
      </div>

      {/* ZIP input */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="ZIP code"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && handleZipSubmit()}
          className="w-36 px-4 py-2 rounded-lg bg-brand-charcoal border border-brand-charcoal text-brand-offwhite placeholder:text-brand-gray focus:border-brand-teal focus:outline-none"
        />
        <button
          onClick={handleZipSubmit}
          disabled={zipInput.length !== 5}
          className="px-4 py-2 rounded-lg bg-brand-teal text-white font-display tracking-wide disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Check
        </button>
      </div>

      {/* Sun / shade toggle */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-brand-gray text-sm">Surface:</span>
        <div className="flex rounded-lg overflow-hidden border border-brand-charcoal">
          {(['sun', 'shade'] as const).map((exp) => (
            <button
              key={exp}
              onClick={() => setExposure(exp)}
              className={`px-4 py-1.5 text-sm capitalize transition-colors ${
                exposure === exp
                  ? 'bg-brand-gold text-brand-black'
                  : 'bg-brand-charcoal text-brand-gray hover:text-brand-offwhite'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Modifier toggles */}
      <div className="mb-8">
        <p className="text-brand-gray text-xs mb-3 uppercase tracking-wider">
          Dog profile - bumps verdict one step stricter if any apply
        </p>
        <div className="space-y-2">
          {MODIFIER_OPTIONS.map(({ key, label, why }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!modifiers[key]}
                onChange={(e) =>
                  setModifiers((prev) => ({ ...prev, [key]: e.target.checked || undefined }))
                }
                className="mt-0.5 accent-brand-teal"
              />
              <span>
                <span className="text-brand-offwhite text-sm">{label}</span>
                <span className="text-brand-gray text-xs ml-2">- {why}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Loading */}
      {checkState.status === 'loading' && (
        <div className="py-10 text-center text-brand-gray animate-pulse">
          Fetching weather data...
        </div>
      )}

      {/* Out-of-area */}
      {checkState.status === 'error' && checkState.kind === 'out-of-area' && (
        <div className="rounded-lg border border-brand-charcoal bg-brand-charcoal p-6">
          <p className="text-brand-offwhite mb-3">
            That ZIP is outside the Emerald Coast service area. No weather data available.
          </p>
          <HandTest className="text-brand-gray" />
        </div>
      )}

      {/* Weather unavailable */}
      {checkState.status === 'error' && checkState.kind === 'weather-unavailable' && (
        <div className="rounded-lg border border-brand-charcoal bg-brand-charcoal p-6">
          <p className="text-brand-offwhite mb-3">
            Weather data is unavailable right now. Use the hand test instead.
          </p>
          <HandTest className="text-brand-gray" />
        </div>
      )}

      {/* Verdict card */}
      <AnimatePresence mode="wait">
        {checkState.status === 'done' && (() => {
          const { weather, city } = checkState;
          const hi = heatIndexF(weather.tempF, weather.humidity);
          const pavSun = pavementEstimateF(weather.tempF, 'sun');
          const pavShade = pavementEstimateF(weather.tempF, 'shade');
          const pavDisplay = exposure === 'sun' ? pavSun : pavShade;
          const v = computeVerdict({ heatIndexF: hi, pavementSunF: pavSun, modifiers });
          const windows = safeWindows(weather.hourly);
          const isSafe = v.band === 'safe' || v.band === 'watch';

          return (
            <motion.div
              key={verdictKey}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`rounded-xl p-6 mb-5 ${BAND_CARD[v.band]}`}
            >
              <div className="text-xs uppercase tracking-widest opacity-70 mb-1">{city}</div>
              <div className="font-display text-4xl tracking-wide mb-2">{v.headline}</div>
              <p className="text-sm opacity-90 mb-5 leading-relaxed">{v.reason}</p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm mb-5">
                <div>
                  <div className="opacity-60 uppercase text-xs tracking-wider mb-0.5">Air Temp</div>
                  <div className="font-display text-2xl">{weather.tempF}F</div>
                </div>
                <div>
                  <div className="opacity-60 uppercase text-xs tracking-wider mb-0.5">Heat Index</div>
                  <div className="font-display text-2xl">{hi}F</div>
                </div>
                <div>
                  <div className="opacity-60 uppercase text-xs tracking-wider mb-0.5">
                    Pavement ({exposure})
                  </div>
                  <div className="font-display text-2xl">{pavDisplay}F</div>
                </div>
                <div>
                  <div className="opacity-60 uppercase text-xs tracking-wider mb-0.5">
                    Pavement ({exposure === 'sun' ? 'shade' : 'sun'})
                  </div>
                  <div className="font-display text-2xl">
                    {exposure === 'sun' ? pavShade : pavSun}F
                  </div>
                </div>
              </div>

              <p className="text-xs opacity-50 mb-4 leading-relaxed">{PAVEMENT_SOURCE}</p>

              {/* Safe windows */}
              <div className="text-sm mb-4">
                {windows.allDayUnsafe ? (
                  <p className="font-display tracking-wide">No safe window today.</p>
                ) : (
                  <>
                    {windows.morningBefore && (
                      <p>Walk before <strong>{windows.morningBefore}</strong></p>
                    )}
                    {windows.eveningAfter && (
                      <p>Safe after <strong>{windows.eveningAfter}</strong></p>
                    )}
                    {!windows.morningBefore && !windows.eveningAfter && (
                      <p>Conditions are currently safe.</p>
                    )}
                  </>
                )}
              </div>

              {/* 7-second test */}
              <p className="text-xs opacity-70 italic mb-5">
                Still uncertain? Press the back of your hand to the pavement for 7 seconds.
                If you pull away, it is too hot for paw pads.
              </p>

              {/* CTA */}
              {isSafe ? (
                <Link
                  href="/blog/what-is-a-dog-slatmill/"
                  className="text-xs underline opacity-80 hover:opacity-100"
                >
                  What is a slatmill?
                </Link>
              ) : (
                <div>
                  <p className="text-sm mb-3">
                    Pavement is not an option today. A climate-controlled session is.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/book/"
                      className="text-xs underline opacity-90 hover:opacity-100"
                    >
                      Book a session
                    </Link>
                    <Link
                      href="/blog/too-hot-to-walk-your-dog/"
                      className="text-xs underline opacity-90 hover:opacity-100"
                    >
                      Read the heat guide
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Copy result */}
      {checkState.status === 'done' && (
        <button
          onClick={copyResult}
          className="text-sm text-brand-gray hover:text-brand-offwhite border border-brand-charcoal px-4 py-2 rounded-lg transition-colors"
        >
          {copied ? 'Copied' : 'Copy result'}
        </button>
      )}
    </div>
  );
}
