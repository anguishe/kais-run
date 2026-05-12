'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const FORMSPREE_FOUNDING_ENDPOINT = 'https://formspree.io/f/mojrrvdd';
const FORMSPREE_FOOTER_ENDPOINT = 'https://formspree.io/f/mvzllpwg';

const inputClass =
  'w-full bg-brand-charcoal border border-white/10 focus:border-brand-teal focus:outline-none text-brand-offwhite placeholder:text-brand-gray rounded-none py-3 px-4 font-body';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-1 font-body';

type Variant = 'full' | 'footer';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const foundingSuccessCopy =
  "You're in. Travis will reach out personally to confirm your spot.";

export function WaitlistForm({ variant = 'full' }: { variant?: Variant }) {
  const idPrefix = variant === 'full' ? 'waitlist-full' : 'waitlist-footer';

  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [merge7, setMerge7] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleFullSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(FORMSPREE_FOUNDING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          first_name: fname,
          email,
          phone,
          dog_name: dogName,
          dog_breed: dogBreed,
          location: merge7,
          _replyto: email,
          _subject: "Founding Athlete Signup — Kai's Run",
        }),
      });

      if (res.ok) {
        try {
          fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email,
              name: fname,
              tags: ['founding-20'],
            }),
          }).catch(() => {});
        } catch {
          /* fire-and-forget */
        }
        setFname('');
        setEmail('');
        setPhone('');
        setDogName('');
        setDogBreed('');
        setMerge7('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleFooterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(FORMSPREE_FOOTER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          _subject: "Footer Signup — Kai's Run",
        }),
      });

      if (res.ok) {
        try {
          fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email,
              name: '',
              tags: ['footer-signup'],
            }),
          }).catch(() => {});
        } catch {
          /* fire-and-forget */
        }
        setEmail('');
        setStatus('success');
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  if (variant === 'footer') {
    return (
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.p
              key="success"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="font-body text-sm sm:text-base text-brand-gray leading-snug"
            >
              You&apos;re on the list.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              onSubmit={handleFooterSubmit}
              className="flex flex-col sm:flex-row gap-2 sm:items-stretch relative"
            >
              <label htmlFor={`${idPrefix}-email`} className="sr-only">
                Email Address
              </label>
              <input
                id={`${idPrefix}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`${inputClass} flex-1 min-w-0`}
                disabled={status === 'submitting'}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="shrink-0 bg-brand-teal text-white font-display text-lg tracking-wide rounded-none px-6 py-3 hover:bg-brand-teal/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Join the List'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section className="bg-brand-black border-t border-white/5 py-24 md:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-2xl mx-auto px-6"
      >
        <motion.p
          variants={fadeUp}
          className="font-body text-brand-teal text-xs tracking-widest uppercase mb-3"
        >
          FOUNDING ATHLETE PROGRAM
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-5xl md:text-6xl text-brand-offwhite mb-4"
        >
          Join the Founding 20.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-body text-brand-gray max-w-xl mb-10 leading-relaxed"
        >
          Launching this summer — the first 20 dogs get in at $40/session. Standard sessions start at
          $65. Drop your info and we&apos;ll reach out personally before spots open to the public.
        </motion.p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.p
              key="success"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="font-body text-lg text-brand-teal"
            >
              {foundingSuccessCopy}
            </motion.p>
          ) : (
            <motion.form
              key="form"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              onSubmit={handleFullSubmit}
              className="space-y-5 relative"
            >
              {status === 'error' && (
                <p className="font-body text-amber-400 mb-2" role="alert" aria-live="polite">
                  Something went wrong. Email us at kaisrunmobile@gmail.com
                </p>
              )}

              <div>
                <label htmlFor={`${idPrefix}-fname`} className={labelClass}>
                  First Name
                </label>
                <input
                  id={`${idPrefix}-fname`}
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="First name is fine"
                  className={inputClass}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${idPrefix}-email`} className={labelClass}>
                  Email Address
                </label>
                <input
                  id={`${idPrefix}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClass}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
                  Phone Number
                </label>
                <input
                  id={`${idPrefix}-phone`}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 850 000 0000"
                  className={inputClass}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${idPrefix}-dogname`} className={labelClass}>
                  Dog&apos;s Name
                </label>
                <input
                  id={`${idPrefix}-dogname`}
                  name="dog_name"
                  type="text"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  placeholder="What do we call the athlete?"
                  className={inputClass}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${idPrefix}-dogbreed`} className={labelClass}>
                  Dog&apos;s Breed
                </label>
                <input
                  id={`${idPrefix}-dogbreed`}
                  name="dog_breed"
                  type="text"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  placeholder="e.g. Labrador, German Shepherd, Mixed"
                  className={inputClass}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor={`${idPrefix}-location`} className={labelClass}>
                  Location
                </label>
                <select
                  id={`${idPrefix}-location`}
                  name="location"
                  value={merge7}
                  onChange={(e) => setMerge7(e.target.value)}
                  className={inputClass}
                  disabled={status === 'submitting'}
                >
                  <option value="">Select your city</option>
                  <option value="Destin">Destin</option>
                  <option value="Fort Walton">Fort Walton</option>
                  <option value="Niceville">Niceville</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-brand-teal text-white font-display text-xl tracking-wide rounded-none py-4 mt-2 hover:bg-brand-teal/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Reserve My Spot'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
