'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BREEDS, type DriveTier, getLifeStage } from '@/lib/exercise/targets';
import { computeTarget, type ComputeResult } from '@/lib/exercise/compute';
import { trackToolUse } from '@/lib/analytics/trackToolUse';

const TIER_LABELS: Record<DriveTier, string> = {
  low: 'Low drive',
  moderate: 'Moderate drive',
  high: 'High drive',
  working: 'Working / extreme drive',
};

const SPLIT_WHY = {
  structured: 'Builds a conditioned aerobic baseline and lowers resting arousal over time.',
  play: 'Develops body awareness and cognitive engagement; feeds social drive without spiking cortisol.',
  enrichment: 'Nose work, sniff walks, and puzzle feeding tire the brain without taxing the joints.',
};

const FLAG_LABELS: Record<string, string> = {
  arthritis: 'Arthritis',
  overweight: 'Overweight',
  brachycephalic: 'Brachycephalic (flat-faced)',
  heartResp: 'Heart or respiratory condition',
};

const FLAG_NOTES: Record<string, string> = {
  arthritis: 'Low-impact, steady-state movement is recommended. Your vet sets the ceiling.',
  overweight: 'Build duration conservatively - joints and the cardiovascular system carry extra load.',
  brachycephalic: 'Airway anatomy limits heat and exertion tolerance. Exercise in early morning or evening only.',
  heartResp: 'Veterinary clearance is required before any conditioning program begins.',
};

// ponytail: auto-flag known brachy breeds on select so user doesn't miss it
const BRACHY_BREEDS = new Set([
  'french bulldog', 'bulldog', 'pug', 'shih tzu', 'cavalier king charles spaniel',
]);

export function Calculator() {
  const [breedQuery, setBreedQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
  const [manualTier, setManualTier] = useState<DriveTier>('moderate');
  const [showManualTier, setShowManualTier] = useState(false);

  const [ageValue, setAgeValue] = useState('');
  const [ageUnit, setAgeUnit] = useState<'months' | 'years'>('months');
  const [weightLb, setWeightLb] = useState('');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'active'>('light');
  const [flags, setFlags] = useState({
    arthritis: false,
    overweight: false,
    brachycephalic: false,
    heartResp: false,
  });

  const [result, setResult] = useState<ComputeResult | null>(null);
  const [lifeStage, setLifeStage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const filtered =
    breedQuery.length > 0
      ? BREEDS.filter((b) => b.name.toLowerCase().includes(breedQuery.toLowerCase()))
      : BREEDS;

  function selectBreed(name: string) {
    setSelectedBreed(name);
    setBreedQuery(name);
    setShowDropdown(false);
    const isMixed = name === 'Mixed / Other';
    setShowManualTier(isMixed);
    if (!isMixed && BRACHY_BREEDS.has(name.toLowerCase())) {
      setFlags((f) => ({ ...f, brachycephalic: true }));
    }
  }

  function compute() {
    if (!selectedBreed && !showManualTier) {
      setError('Select a breed or choose Mixed / Other.');
      return;
    }
    const age = parseFloat(ageValue);
    if (!age || age <= 0) {
      setError('Enter a valid age.');
      return;
    }
    const weight = parseFloat(weightLb);
    if (!weight || weight <= 0) {
      setError('Enter a valid weight in lb.');
      return;
    }
    setError(null);

    const ageMonths = ageUnit === 'years' ? Math.round(age * 12) : Math.round(age);
    const stage = getLifeStage(ageMonths);

    const r = computeTarget({
      breedName: showManualTier ? undefined : (selectedBreed ?? undefined),
      manualTier: showManualTier ? manualTier : undefined,
      ageMonths,
      weightLb: weight,
      activity,
      flags,
    });

    setResult(r);
    setLifeStage(stage);

    const tier = showManualTier
      ? manualTier
      : (BREEDS.find((b) => b.name === selectedBreed)?.tier ?? 'moderate');

    trackToolUse('exercise-calculator', {
      tier,
      lifeStage: stage,
      driveFlag: r.driveFlag ?? 'none',
    });
  }

  function copyResult() {
    if (!result) return;
    const text = [
      "Kai's Run - Dog Exercise Estimate",
      `Daily: ${result.dailyMin[0]}-${result.dailyMin[1]} min`,
      `Structured: ${result.split.structuredMin[0]}-${result.split.structuredMin[1]} min`,
      `Play: ${result.split.playMin[0]}-${result.split.playMin[1]} min`,
      `Enrichment: ${result.split.enrichmentMin[0]}-${result.split.enrichmentMin[1]} min`,
      '',
      `Weekly shape: ${result.weeklyShape}`,
      '',
      result.vetHumility,
      '',
      'Full calculator: https://kaisrun.xyz/tools/dog-exercise-calculator/',
    ].join('\n');
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="font-body">
      {/* Breed search */}
      <div className="mb-6">
        <label className="block text-brand-offwhite text-sm font-semibold mb-2">Breed</label>
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            value={breedQuery}
            placeholder="Type to search breeds..."
            className="w-full bg-brand-black border border-brand-gray/40 text-brand-offwhite px-4 py-3 rounded-lg focus:outline-none focus:border-brand-teal"
            onChange={(e) => {
              setBreedQuery(e.target.value);
              setSelectedBreed(null);
              setShowManualTier(false);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && filtered.length > 0 && (
            <ul className="absolute z-20 w-full mt-1 bg-brand-charcoal border border-brand-gray/40 rounded-lg max-h-52 overflow-y-auto shadow-xl">
              {filtered.map((b) => (
                <li
                  key={b.name}
                  onMouseDown={() => selectBreed(b.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-brand-teal/20 text-brand-offwhite text-sm flex justify-between"
                >
                  <span>{b.name}</span>
                  <span className="text-brand-gray text-xs self-center ml-2 flex-shrink-0">
                    {TIER_LABELS[b.tier]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Manual tier selector (Mixed / Other) */}
      {showManualTier && (
        <div className="mb-6">
          <label className="block text-brand-offwhite text-sm font-semibold mb-2">
            Drive tier - your best read
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(TIER_LABELS) as [DriveTier, string][]).map(([t, label]) => (
              <button
                key={t}
                type="button"
                onClick={() => setManualTier(t)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  manualTier === t
                    ? 'bg-brand-teal border-brand-teal text-white'
                    : 'bg-transparent border-brand-gray/40 text-brand-gray hover:border-brand-teal'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Age */}
      <div className="mb-6">
        <label className="block text-brand-offwhite text-sm font-semibold mb-2">Age</label>
        <div className="flex gap-3">
          <input
            type="number"
            min="1"
            value={ageValue}
            onChange={(e) => setAgeValue(e.target.value)}
            placeholder="e.g. 18"
            className="flex-1 bg-brand-black border border-brand-gray/40 text-brand-offwhite px-4 py-3 rounded-lg focus:outline-none focus:border-brand-teal"
          />
          <div className="flex rounded-lg overflow-hidden border border-brand-gray/40">
            {(['months', 'years'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setAgeUnit(u)}
                className={`px-4 py-3 text-sm transition-colors ${
                  ageUnit === u
                    ? 'bg-brand-teal text-white'
                    : 'bg-brand-charcoal text-brand-gray hover:text-brand-offwhite'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weight */}
      <div className="mb-6">
        <label className="block text-brand-offwhite text-sm font-semibold mb-2">
          Weight (lb)
        </label>
        <input
          type="number"
          min="1"
          value={weightLb}
          onChange={(e) => setWeightLb(e.target.value)}
          placeholder="e.g. 65"
          className="w-full bg-brand-black border border-brand-gray/40 text-brand-offwhite px-4 py-3 rounded-lg focus:outline-none focus:border-brand-teal"
        />
      </div>

      {/* Activity level */}
      <div className="mb-6">
        <label className="block text-brand-offwhite text-sm font-semibold mb-2">
          Current activity level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              ['sedentary', 'Sedentary', 'Little to no regular exercise'],
              ['light', 'Light', 'Short daily walks'],
              ['active', 'Active', 'Regular structured sessions'],
            ] as const
          ).map(([val, label, desc]) => (
            <button
              key={val}
              type="button"
              onClick={() => setActivity(val)}
              className={`px-3 py-3 rounded-lg text-sm border transition-colors text-left ${
                activity === val
                  ? 'bg-brand-teal border-brand-teal text-white'
                  : 'bg-transparent border-brand-gray/40 text-brand-gray hover:border-brand-teal'
              }`}
            >
              <div className="font-semibold">{label}</div>
              <div
                className={`text-xs mt-0.5 ${
                  activity === val ? 'text-white/80' : 'text-brand-gray'
                }`}
              >
                {desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Health flags */}
      <div className="mb-8">
        <label className="block text-brand-offwhite text-sm font-semibold mb-3">
          Health considerations (optional)
        </label>
        <div className="space-y-3">
          {(Object.keys(flags) as Array<keyof typeof flags>).map((key) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={flags[key]}
                onChange={() => setFlags((f) => ({ ...f, [key]: !f[key] }))}
                className="mt-0.5 accent-brand-teal"
              />
              <div>
                <span className="text-brand-offwhite text-sm">{FLAG_LABELS[key]}</span>
                <p className="text-brand-gray text-xs mt-0.5">{FLAG_NOTES[key]}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={compute}
        className="w-full bg-brand-teal text-white font-display text-xl py-4 rounded-lg hover:bg-brand-teal/90 transition-colors tracking-wide"
      >
        Calculate
      </button>

      {/* Result card - framer-motion reveal */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-10 bg-brand-charcoal rounded-xl border border-brand-teal/30 p-6 space-y-6"
          >
            {/* Daily target */}
            <div className="text-center">
              <p className="text-brand-gray text-xs uppercase tracking-widest mb-1">
                Daily exercise target
              </p>
              <p className="font-display text-5xl text-brand-gold leading-none">
                {result.dailyMin[0]}-{result.dailyMin[1]}
                <span className="text-3xl ml-2">min</span>
              </p>
            </div>

            {/* Split */}
            <div>
              <h3 className="font-display text-lg text-brand-offwhite mb-3 tracking-wide">
                How to split it
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: 'Structured',
                    range: result.split.structuredMin,
                    why: SPLIT_WHY.structured,
                  },
                  { label: 'Play', range: result.split.playMin, why: SPLIT_WHY.play },
                  {
                    label: 'Enrichment',
                    range: result.split.enrichmentMin,
                    why: SPLIT_WHY.enrichment,
                  },
                ].map(({ label, range, why }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-28 flex-shrink-0">
                      <p className="text-brand-gold text-xs font-semibold uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-brand-offwhite text-lg font-bold leading-tight">
                        {range[0]}-{range[1]} min
                      </p>
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed pt-1">{why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly shape */}
            <div>
              <h3 className="font-display text-lg text-brand-offwhite mb-2 tracking-wide">
                Weekly shape
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">{result.weeklyShape}</p>
            </div>

            {/* Mechanism */}
            <div>
              <h3 className="font-display text-lg text-brand-offwhite mb-2 tracking-wide">
                Why it works
              </h3>
              <p className="text-brand-gray text-sm leading-relaxed">{result.mechanism}</p>
            </div>

            {/* Notes from compute */}
            {result.notes.length > 0 && (
              <div className="space-y-2">
                {result.notes.map((note, i) => (
                  <div
                    key={i}
                    className="flex gap-2 text-sm text-brand-gray bg-brand-black/40 rounded-lg px-4 py-3"
                  >
                    <span className="text-brand-teal-light flex-shrink-0 mt-0.5 select-none">-</span>
                    <p className="leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            )}

            {/* driveFlag: walk won't cover this */}
            {result.driveFlag === 'walk-wont-cover-this' && (
              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg px-5 py-4">
                <p className="font-display text-lg text-brand-gold mb-1">
                  A neighborhood walk will not cover this.
                </p>
                <p className="text-brand-gray text-sm leading-relaxed">
                  Here is what will -{' '}
                  <Link href="/book/" className="text-brand-teal-light underline">
                    book a structured conditioning session
                  </Link>{' '}
                  or read{' '}
                  <Link
                    href="/blog/how-to-tire-out-a-high-energy-dog/"
                    className="text-brand-teal-light underline"
                  >
                    how to actually tire out a high-energy dog
                  </Link>
                  .
                </p>
              </div>
            )}

            {/* Adolescent callout */}
            {lifeStage === 'adolescent' && (
              <div className="bg-brand-teal/10 border border-brand-teal/30 rounded-lg px-5 py-4">
                <p className="text-brand-offwhite text-sm leading-relaxed">
                  The adolescent window is the hardest phase to manage - and the one where
                  consistency matters most.{' '}
                  <Link
                    href="/blog/dog-adolescence-phase/"
                    className="text-brand-teal-light underline"
                  >
                    Read what is happening during dog adolescence and what actually helps.
                  </Link>
                </p>
              </div>
            )}

            {/* Brachycephalic heat callout */}
            {flags.brachycephalic && (
              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg px-5 py-4">
                <p className="text-brand-offwhite text-sm leading-relaxed">
                  In Florida summers, check the pavement first.{' '}
                  <Link href="/tools/too-hot-to-walk/" className="text-brand-teal-light underline">
                    Use the pavement heat checker
                  </Link>{' '}
                  before any outdoor session.
                </p>
              </div>
            )}

            {/* Settled callout */}
            {result.driveFlag === 'settled' && (
              <div className="rounded-lg border border-brand-gray/30 px-5 py-4">
                <p className="text-brand-gray text-sm leading-relaxed">
                  Settled dogs still benefit from regular structure.{' '}
                  <Link
                    href="/blog/why-structured-runs-matter/"
                    className="text-brand-teal-light underline"
                  >
                    Why structured runs matter even for low-drive dogs.
                  </Link>
                </p>
              </div>
            )}

            {/* Vet humility - always present */}
            <div className="border-t border-brand-gray/20 pt-4">
              <p className="text-brand-gray text-xs leading-relaxed italic">
                {result.vetHumility}
              </p>
            </div>

            {/* Print / copy fridge card */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 border border-brand-gray/40 text-brand-gray text-sm py-2.5 rounded-lg hover:border-brand-teal hover:text-brand-offwhite transition-colors"
              >
                Print fridge card
              </button>
              <button
                type="button"
                onClick={copyResult}
                className="flex-1 border border-brand-gray/40 text-brand-gray text-sm py-2.5 rounded-lg hover:border-brand-teal hover:text-brand-offwhite transition-colors"
              >
                {copied ? 'Copied' : 'Copy result'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
