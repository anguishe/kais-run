'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const MAILCHIMP_ACTION =
  'https://xyz.us4.list-manage.com/subscribe/post?u=cfc3dccd2c21b015ecc30e2a5&id=334201f588&f_id=00b60fe3f0';

const HONEYPOT_NAME = 'b_cfc3dccd2c21b015ecc30e2a5_334201f588';

const inputClass =
  'w-full bg-brand-charcoal border border-white/10 focus:border-brand-teal focus:outline-none text-brand-offwhite placeholder:text-brand-gray rounded-none py-3 px-4 font-body';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-1 font-body';

type Variant = 'full' | 'footer';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function HoneypotField() {
  return (
    <input
      type="text"
      name={HONEYPOT_NAME}
      tabIndex={-1}
      defaultValue=""
      autoComplete="off"
      className="absolute left-[-5000px] h-px w-px overflow-hidden opacity-0"
      aria-hidden="true"
    />
  );
}

function appendHoneypot(params: URLSearchParams, form: HTMLFormElement) {
  const hp = form.elements.namedItem(HONEYPOT_NAME) as HTMLInputElement | null;
  if (hp?.name) params.set(hp.name, hp.value);
}

export function WaitlistForm({ variant = 'full' }: { variant?: Variant }) {
  const idPrefix = variant === 'full' ? 'waitlist-full' : 'waitlist-footer';

  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [merge7, setMerge7] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const submitMailchimp = async (form: HTMLFormElement, params: URLSearchParams) => {
    appendHoneypot(params, form);
    await fetch(MAILCHIMP_ACTION, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
  };

  const handleFullSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = e.currentTarget;
      const params = new URLSearchParams();
      params.set('FNAME', fname);
      params.set('EMAIL', email);
      params.set('PHONE', phone);
      params.set('DOGNAME', dogName);
      params.set('DOGBREED', dogBreed);
      params.set('MMERGE7', merge7);
      await submitMailchimp(form, params);
      setFname('');
      setEmail('');
      setPhone('');
      setDogName('');
      setDogBreed('');
      setMerge7('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleFooterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = e.currentTarget;
      const params = new URLSearchParams();
      params.set('EMAIL', email);
      await submitMailchimp(form, params);
      setEmail('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const successCopy =
    "You're on the list. Travis will reach out personally before spots open to the public.";

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
              className="font-body text-sm sm:text-base text-brand-teal leading-snug"
            >
              {successCopy}
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
              {status === 'error' && (
                <p
                  className="font-body text-sm text-amber-400 sm:absolute sm:-top-8 left-0 w-full"
                  role="alert"
                  aria-live="polite"
                >
                  Something went wrong. Email us at kaisrunmobile@gmail.com
                </p>
              )}
              <HoneypotField />
              <label htmlFor={`${idPrefix}-email`} className="sr-only">
                Email Address
              </label>
              <input
                id={`${idPrefix}-email`}
                name="EMAIL"
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
              {successCopy}
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
                  name="FNAME"
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
                  name="EMAIL"
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
                  name="PHONE"
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
                  name="DOGNAME"
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
                  name="DOGBREED"
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
                  name="MMERGE7"
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

              <HoneypotField />

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
