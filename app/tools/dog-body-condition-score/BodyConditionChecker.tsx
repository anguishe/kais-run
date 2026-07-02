'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { trackToolUse } from '@/lib/analytics/trackToolUse';

type Answer = 'A' | 'B' | 'C' | 'D';
type Band = 'underweight' | 'ideal' | 'slightlyOver' | 'overweight' | 'obese';

const ANSWER_VALUE: Record<Answer, number> = { A: 2, B: 5, C: 6.5, D: 8.5 };

type Question = {
  key: 'q1' | 'q2' | 'q3';
  heading: string;
  helper: string;
  options: { key: Answer; label: string }[];
};

const QUESTIONS: Question[] = [
  {
    key: 'q1',
    heading: 'The ribs',
    helper:
      "Rest both hands flat on your dog's sides, over the ribcage. Do not press hard - use the pressure you'd use to feel the bones on the back of your own hand.",
    options: [
      { key: 'A', label: 'I can see the ribs, or feel them with almost no covering over them' },
      { key: 'B', label: 'I can feel each rib easily with a light touch, with a thin layer over them' },
      { key: 'C', label: "I have to press to feel the ribs - there's a noticeable layer of padding" },
      { key: 'D', label: "I can't feel the ribs, or only by pressing in firmly" },
    ],
  },
  {
    key: 'q2',
    heading: 'The waist',
    helper: 'Stand over your dog and look straight down at its back, behind the ribcage.',
    options: [
      { key: 'A', label: 'Sharp hourglass - the hips and ribs jut out' },
      { key: 'B', label: 'A clear waist - the body narrows noticeably behind the ribs' },
      { key: 'C', label: 'The waist is hard to make out - the back looks broad and straight' },
      { key: 'D', label: 'No waist at all - the back is as wide as, or wider than, the ribs' },
    ],
  },
  {
    key: 'q3',
    heading: 'The profile',
    helper: 'Look at your dog from the side, at its level. Watch the belly line behind the ribcage.',
    options: [
      { key: 'A', label: 'Extreme tuck - the belly and flank are very drawn up' },
      { key: 'B', label: 'The belly tucks up behind the ribcage' },
      { key: 'C', label: 'The belly line runs roughly level - little to no tuck' },
      { key: 'D', label: 'The belly hangs down or sags below the ribcage' },
    ],
  },
];

type ModifierKey = 'deepChested' | 'stocky' | 'thickCoat';

const MODIFIER_OPTIONS: { key: ModifierKey; label: string }[] = [
  { key: 'deepChested', label: 'Deep-chested or sighthound-type build (Greyhound, Whippet, Rhodesian Ridgeback, Vizsla)' },
  { key: 'stocky', label: 'Stocky or barrel-chested build (Labrador, Bulldog, Pug, Beagle)' },
  { key: 'thickCoat', label: 'Very thick or double coat (Husky, Shepherd, Chow, Golden)' },
];

const BAND_CARD: Record<Band, string> = {
  underweight: 'bg-brand-gold text-brand-black',
  ideal: 'bg-brand-teal text-white',
  slightlyOver: 'bg-brand-gold text-brand-black',
  overweight: 'bg-brand-gold text-brand-black',
  obese: 'bg-brand-black text-brand-gold border-2 border-brand-gold',
};

const BAND_LABEL: Record<Band, string> = {
  underweight: 'Underweight (1-3)',
  ideal: 'Ideal (4-5)',
  slightlyOver: 'Slightly over (6)',
  overweight: 'Overweight (7)',
  obese: 'Obese (8-9)',
};

const BAND_VERDICT: Record<Band, string> = {
  underweight:
    'Your dog is reading underweight. You can see or easily feel the ribs with little covering, and the tuck and waist are pronounced.',
  ideal:
    'Your dog is in ideal condition. You can feel the ribs with a light touch, there is a clear waist from above, and the belly tucks up from the side. This is exactly where you want to be.',
  slightlyOver:
    'Your dog is carrying a little extra. The ribs take some pressure to feel, the waist is softening, and the tuck is shallow. This is the easiest stage to turn around - and the one most owners miss, because a slightly heavy dog still looks fine.',
  overweight:
    'Your dog is overweight. The ribs are hard to feel under a clear layer, the waist is mostly gone from above, and there is little to no tuck from the side.',
  obese:
    'Your dog is reading obese. The ribs are buried, there is no waist and no tuck, and there may be fat over the spine and at the base of the tail. This is a health issue, not a cosmetic one.',
};

const BAND_PLAN: Record<Band, React.ReactNode> = {
  underweight: (
    <>
      A dog that is too thin is a vet conversation before anything else - sudden or unexplained
      weight loss can point to a medical issue, and that has to be ruled out first. Do not add hard
      exercise to a dog that is underweight, and do not try to &ldquo;build it up&rdquo; with more
      food on your own. See your vet, get the cause identified, and let them set the plan. Once your
      dog is cleared and back to a healthy condition, steady, controlled conditioning is how you
      build real muscle rather than just fat - but that comes after the vet, not before.
    </>
  ),
  ideal: (
    <>
      The job now is holding it here, and the thing that keeps a dog at a healthy condition is not a
      diet - it is a consistent daily outlet. A dog that moves every day holds its weight and its
      muscle far more easily than one that gets exercised in bursts. The trap is coasting: skip the
      movement for a few weeks and condition slips before the scale ever shows it. Keep a real
      routine, and re-run this check monthly. If you want to make sure your dog is getting the right
      amount of work for its drive and age,{' '}
      <Link href="/tools/dog-exercise-calculator/" className="underline">
        the exercise calculator
      </Link>{' '}
      gives you a starting range.
    </>
  ),
  slightlyOver: (
    <>
      Catching it here is the win. The fix has two halves, and only one of them is exercise. The
      food side - how much, and what - is a conversation for your vet, who can set real targets for
      your specific dog. I will not put a number on that; it is a medical call. The movement side is
      where a consistent outlet does the work: steady daily conditioning builds the muscle that
      burns more even at rest and keeps the extra from becoming a real problem. Do not crash-diet or
      over-exercise your way there. Read{' '}
      <Link href="/blog/is-my-dog-overweight/" className="underline">
        why the scale is the wrong number to watch
      </Link>{' '}
      for the full picture, and dial in the right workload with{' '}
      <Link href="/tools/dog-exercise-calculator/" className="underline">
        the exercise calculator
      </Link>
      .
    </>
  ),
  overweight: (
    <>
      This is worth taking seriously, but it is fixable, and it is not your fault - carrying weight
      creeps up slowly and looks normal until you check with your hands. Two things move the needle.
      The food side belongs to your vet - they set the calorie target and rule out anything medical,
      and I will not guess at numbers that a professional should own. The movement side is a steady,
      controlled outlet: an overweight dog needs consistent low-to-moderate work, not a sudden hard
      push that its joints and heart are not ready for. That balance - real movement without
      overloading a body carrying extra weight - is exactly what a structured, self-paced session is
      built for. Before you ramp anything, read{' '}
      <Link href="/blog/can-you-over-exercise-a-dog/" className="underline">
        how to read the exercise limit
      </Link>
      , because an overweight dog is the one you most need to avoid pushing too hard too fast.
    </>
  ),
  obese: (
    <>
      This one goes to your vet first, and soon - carrying this much extra weight strains the
      joints, the heart, and the metabolism, and it takes real years off a dog&apos;s life. Your vet
      sets the plan: the diet, the pace, and clearance for activity. Do not start hard exercise on an
      obese dog on your own - a body carrying this much load can be hurt by the wrong kind of push.
      Once your vet has cleared movement, the right start is gentle, steady, low-impact work that
      builds tolerance without pounding the joints, increased slowly over weeks. A self-paced outlet
      where the dog controls the effort fits that brief well, but only after the vet signs off. For
      older dogs especially,{' '}
      <Link href="/blog/senior-dog-exercise/" className="underline">
        keeping an aging body moving the right way
      </Link>{' '}
      matters even more here.
    </>
  ),
};

// ponytail: deterministic scoring per spec — rib check weighted x2, rounded to 0.5, clamped 1-9.
function computeBcs(q1: Answer, q2: Answer, q3: Answer): number {
  const raw = (2 * ANSWER_VALUE[q1] + ANSWER_VALUE[q2] + ANSWER_VALUE[q3]) / 4;
  const rounded = Math.round(raw * 2) / 2;
  return Math.min(9, Math.max(1, rounded));
}

function bandFor(bcs: number): Band {
  if (bcs <= 3.5) return 'underweight';
  if (bcs <= 5.5) return 'ideal';
  if (bcs <= 6.5) return 'slightlyOver';
  if (bcs <= 7.25) return 'overweight';
  return 'obese';
}

function modifierNotes(band: Band, mods: Record<ModifierKey, boolean>): string[] {
  const notes: string[] = [];
  if (mods.deepChested && band === 'underweight') {
    notes.push(
      'One caveat: on a deep-chested or sighthound build, visible ribs and a deep tuck can be completely normal. If your hands told you the ribs have a thin layer over them and your dog has energy and muscle, it may be at a healthy weight for its build. Your vet is the tiebreaker.',
    );
  }
  if (mods.stocky && (band === 'slightlyOver' || band === 'overweight')) {
    notes.push(
      'Note: stocky, barrel-chested breeds naturally carry less of a tuck and a broader outline, so the waist and profile checks read heavier than they are. Weight the rib check most - if the ribs are easy to feel, your dog may be closer to ideal than the outline suggests.',
    );
  }
  if (mods.thickCoat) {
    notes.push(
      "Because your dog has a heavy coat, the waist and profile you see are less reliable than what your hands feel. Trust the rib check above the visual ones, and re-check with the coat wet or pressed flat if you're unsure.",
    );
  }
  return notes;
}

export function BodyConditionChecker() {
  const [answers, setAnswers] = useState<Record<'q1' | 'q2' | 'q3', Answer | null>>({
    q1: null,
    q2: null,
    q3: null,
  });
  const [mods, setMods] = useState<Record<ModifierKey, boolean>>({
    deepChested: false,
    stocky: false,
    thickCoat: false,
  });
  const [result, setResult] = useState<{ bcs: number; band: Band; notes: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      setError('Answer all three questions to get a result.');
      return;
    }
    setError(null);
    const bcs = computeBcs(answers.q1, answers.q2, answers.q3);
    const band = bandFor(bcs);
    setResult({ bcs, band, notes: modifierNotes(band, mods) });
    trackToolUse('body-condition-score', { band });
  }

  return (
    <div className="font-body">
      {QUESTIONS.map((q) => (
        <div key={q.key} className="mb-8">
          <h3 className="font-display text-lg text-brand-offwhite tracking-wide">{q.heading}</h3>
          <p className="text-brand-gray text-sm mt-1 mb-3 leading-relaxed">{q.helper}</p>
          <div className="space-y-2">
            {q.options.map((opt) => {
              const selected = answers[q.key] === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.key]: opt.key }))}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm border transition-colors ${
                    selected
                      ? 'bg-brand-teal border-brand-teal text-white'
                      : 'bg-transparent border-brand-gray/40 text-brand-gray hover:border-brand-teal'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Optional breed / coat context */}
      <div className="mb-8">
        <h3 className="font-display text-lg text-brand-offwhite tracking-wide">
          Breed / coat context
        </h3>
        <p className="text-brand-gray text-sm mt-1 mb-3 leading-relaxed">
          Optional - select any that apply. This adds context to the read, it does not change the
          score.
        </p>
        <div className="space-y-3">
          {MODIFIER_OPTIONS.map(({ key, label }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={mods[key]}
                onChange={() => setMods((m) => ({ ...m, [key]: !m[key] }))}
                className="mt-0.5 accent-brand-teal"
              />
              <span className="text-brand-offwhite text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={calculate}
        className="w-full bg-brand-teal text-white font-display text-xl py-4 rounded-lg hover:bg-brand-teal/90 transition-colors tracking-wide"
      >
        Calculate
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            key={`${result.band}-${result.bcs}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`mt-10 rounded-xl p-6 ${BAND_CARD[result.band]}`}
          >
            <div className="text-xs uppercase tracking-widest opacity-70 mb-1">
              Estimate, not a diagnosis
            </div>
            <div className="font-display text-4xl tracking-wide mb-1">{BAND_LABEL[result.band]}</div>
            <p className="text-sm opacity-90 mb-5">roughly a BCS of {result.bcs} / 9</p>

            <h4 className="font-display text-lg tracking-wide mb-1">Verdict</h4>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">{BAND_VERDICT[result.band]}</p>

            <h4 className="font-display text-lg tracking-wide mb-1">Plan</h4>
            <p className="text-sm opacity-90 leading-relaxed">{BAND_PLAN[result.band]}</p>

            {result.notes.map((note, i) => (
              <p key={i} className="text-sm opacity-80 leading-relaxed mt-4 border-t border-current/20 pt-4">
                {note}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
