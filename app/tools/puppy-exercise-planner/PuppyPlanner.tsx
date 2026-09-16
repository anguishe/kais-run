'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { puppyPlan, SIZE_PROFILES, type PuppyPlan, type SizeClass } from '@/lib/puppy/growth';
import { trackToolUse } from '@/lib/analytics/trackToolUse';

export function PuppyPlanner() {
  const [ageValue, setAgeValue] = useState('');
  const [size, setSize] = useState<SizeClass | null>(null);
  const [plan, setPlan] = useState<PuppyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function calculate() {
    const age = parseFloat(ageValue);
    if (!Number.isFinite(age) || age < 0 || age > 36) {
      setError('Enter an age in months, from 0 to 36.');
      return;
    }
    if (!size) {
      setError('Pick the expected adult size.');
      return;
    }
    setError(null);
    const result = puppyPlan(age, size);
    setPlan(result);
    setCopied(false);
    trackToolUse('puppy-exercise-planner', { stage: result.stage, size });
  }

  function copyPlan() {
    if (!plan) return;
    const lines = [
      "Kai's Run - Puppy Exercise Plan",
      `${plan.ageMonths} months, ${plan.size.label}`,
      plan.stageHeadline,
      plan.stage === 'plates-closed'
        ? 'No age-based ceiling - build from current conditioning.'
        : `Forced repetitive work: up to ${plan.structuredCeilingMin} min per session, ${plan.sessionsPerDay}x daily`,
      `Free play on soft ground: ${plan.freePlay}`,
      `Avoid: ${plan.red.join('; ')}`,
      plan.vetHumility,
      'https://kaisrun.xyz/tools/puppy-exercise-planner/',
    ];
    navigator.clipboard?.writeText(lines.join('\n')).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => setCopied(false),
    );
  }

  return (
    <div className="font-body">
      {/* Age */}
      <div className="mb-6">
        <label htmlFor="puppy-age" className="block text-brand-offwhite text-sm font-semibold mb-2">
          Age in months
        </label>
        <input
          id="puppy-age"
          type="number"
          min="0"
          max="36"
          inputMode="numeric"
          value={ageValue}
          onChange={(e) => setAgeValue(e.target.value)}
          placeholder="e.g. 7"
          className="w-full bg-brand-black border border-brand-gray/40 text-brand-offwhite px-4 py-3 rounded-lg focus:outline-none focus:border-brand-teal"
        />
      </div>

      {/* Adult size */}
      <fieldset className="mb-6">
        <legend className="block text-brand-offwhite text-sm font-semibold mb-2">
          Expected adult size
        </legend>
        <p className="text-brand-gray text-sm mb-3 leading-relaxed">
          Grown weight, not current weight. If you are not sure, your breeder or your vet can
          estimate it, or use the larger parent as a guide.
        </p>
        <div className="space-y-2">
          {SIZE_PROFILES.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setSize(p.key)}
              aria-pressed={size === p.key}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm border transition-colors ${
                size === p.key
                  ? 'bg-brand-teal border-brand-teal text-white'
                  : 'bg-transparent border-brand-gray/40 text-brand-gray hover:border-brand-teal'
              }`}
            >
              <span className="font-semibold">{p.label}</span>
              <span className={`block text-xs mt-0.5 ${size === p.key ? 'text-white/80' : 'text-brand-gray'}`}>
                Growth plates typically close around {p.closureMonths[0]} to {p.closureMonths[1]} months
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={calculate}
        className="w-full bg-brand-teal text-white font-display text-xl py-4 rounded-lg hover:bg-brand-teal/90 transition-colors tracking-wide"
      >
        Build the plan
      </button>

      <AnimatePresence>
        {plan && (
          <motion.div
            key={`${plan.stage}-${plan.ageMonths}-${plan.size.key}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-10 bg-brand-charcoal rounded-xl border border-brand-teal/30 p-6 space-y-6"
          >
            <div>
              <p className="text-brand-gray text-xs uppercase tracking-widest mb-1">
                {plan.ageMonths} months, {plan.size.label.split(' (')[0].toLowerCase()} breed
              </p>
              <h2 className="font-display text-4xl text-brand-gold leading-none">
                {plan.stageHeadline}
              </h2>
              <p className="mt-4 text-brand-gray text-sm leading-relaxed">{plan.stageDetail}</p>
              {plan.monthsToCleared > 0 && (
                <p className="mt-3 text-brand-gray text-sm leading-relaxed">
                  Roughly <strong className="text-brand-offwhite">{plan.monthsToCleared} more month
                  {plan.monthsToCleared === 1 ? '' : 's'}</strong> before this dog is typically past
                  the closure window and ready for sustained conditioning.
                </p>
              )}
            </div>

            {/* The two numbers */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-brand-gold/40 bg-brand-gold/10 p-4">
                <p className="text-brand-gray text-xs uppercase tracking-widest mb-1">
                  Forced repetitive work
                </p>
                {plan.stage === 'plates-closed' ? (
                  <p className="font-display text-3xl text-brand-gold leading-none">No age cap</p>
                ) : (
                  <>
                    <p className="font-display text-4xl text-brand-gold leading-none">
                      {plan.structuredCeilingMin}
                      <span className="text-2xl ml-2">min</span>
                    </p>
                    <p className="mt-2 text-brand-gray text-sm leading-relaxed">
                      per session, up to {plan.sessionsPerDay} times a day. Leashed road walking,
                      jogging, repetitive fetch, and stairs all count against this.
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-lg border border-brand-teal/40 bg-brand-teal/10 p-4">
                <p className="text-brand-gray text-xs uppercase tracking-widest mb-1">
                  Free play on soft ground
                </p>
                <p className="font-display text-3xl text-brand-teal-light leading-none">
                  Not capped
                </p>
                <p className="mt-2 text-brand-gray text-sm leading-relaxed">{plan.freePlay}</p>
              </div>
            </div>

            {/* The correction that is the whole point of the tool */}
            {plan.stage !== 'plates-closed' && (
              <div className="rounded-lg border border-brand-gray/25 p-4">
                <h3 className="font-display text-lg text-brand-offwhite tracking-wide mb-2">
                  What the five-minute rule would have told you
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed">
                  Five minutes per month of age puts this dog at{' '}
                  <strong className="text-brand-offwhite">{plan.fiveMinuteRuleMin} minutes</strong>{' '}
                  twice a day. That figure is associated with UK Kennel Club and British Veterinary
                  Association puppy guidance, and it is a reasonable ceiling for repetitive work -
                  but it was never a peer-reviewed threshold, and it was never meant to cap a
                  puppy&apos;s total movement. Krontveit and colleagues, following four large breeds
                  in Norway, found stair use before three months was associated with more hip
                  dysplasia while daily off-leash exercise on soft, uneven ground was associated with
                  less. Surface and type matter at least as much as minutes.
                </p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg text-brand-offwhite tracking-wide mb-2">
                  Good right now
                </h3>
                <ul className="space-y-2">
                  {plan.green.map((item) => (
                    <li key={item} className="text-brand-gray text-sm leading-relaxed flex gap-2">
                      <span aria-hidden="true" className="text-brand-teal-light">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg text-brand-offwhite tracking-wide mb-2">
                  Not yet
                </h3>
                <ul className="space-y-2">
                  {plan.red.map((item) => (
                    <li key={item} className="text-brand-gray text-sm leading-relaxed flex gap-2">
                      <span aria-hidden="true" className="text-brand-gold">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-brand-gray text-xs leading-relaxed border-t border-brand-gray/20 pt-4">
              {plan.vetHumility}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={copyPlan}
                className="text-sm text-brand-gray hover:text-brand-offwhite border border-brand-gray/40 px-4 py-2 rounded-lg transition-colors"
              >
                {copied ? 'Copied' : 'Copy plan'}
              </button>
              <Link
                href={
                  plan.stage === 'plates-closed'
                    ? '/tools/dog-exercise-calculator/'
                    : '/blog/dog-adolescence-phase/'
                }
                className="text-sm text-brand-teal-light underline"
              >
                {plan.stage === 'plates-closed'
                  ? 'Get an adult daily target'
                  : 'Why the behavior gets harder around now'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
