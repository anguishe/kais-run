'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { trackFoundingAthlete } from '@/lib/googleAds';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykolrrr';
const FORMSPREE_SUBJECT = "New inquiry — Founding Athlete signup — Kai's Run website";
const FORMSPREE_FORM_TAG = 'founding-20';

const inputClass =
  'w-full bg-[#1A1F2E] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-2 font-body';

const LOCATION_OPTIONS = ['Destin', 'Fort Walton Beach', 'Niceville', 'Other'] as const;

type Variant = 'full' | 'footer';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const foundingSuccessCopy =
  "You're in. Travis will reach out personally to confirm your spot.";

type WaitlistFormProps = {
  variant?: Variant;
  buttonLabel?: string;
};

export function WaitlistForm({ variant = 'full', buttonLabel }: WaitlistFormProps) {
  const idPrefix = variant === 'full' ? 'waitlist-full' : 'waitlist-footer';
  const resolvedButtonLabel = buttonLabel ?? 'Reserve My Spot';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          dog_name: dogName,
          dog_breed: dogBreed,
          location,
          message,
          _replyto: email,
          _honeypot: '',
          _subject: FORMSPREE_SUBJECT,
          _tag: FORMSPREE_FORM_TAG,
        }),
      });

      if (res.ok) {
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name,
            tags: ['founding-20'],
          }),
        }).catch(() => {});
        try {
          trackFoundingAthlete(200);
        } catch {
          /* lib/googleAds is defensive */
        }
        setName('');
        setEmail('');
        setPhone('');
        setDogName('');
        setDogBreed('');
        setLocation('');
        setMessage('');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const fields = (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            Your Name
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
            Phone Number
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 850 218 5855"
            className={inputClass}
            disabled={status === 'submitting'}
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-dog-name`} className={labelClass}>
            Dog&apos;s Name
          </label>
          <input
            id={`${idPrefix}-dog-name`}
            name="dog_name"
            type="text"
            required
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="What do we call the athlete?"
            className={inputClass}
            disabled={status === 'submitting'}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${idPrefix}-dog-breed`} className={labelClass}>
            Dog&apos;s Breed
          </label>
          <input
            id={`${idPrefix}-dog-breed`}
            name="dog_breed"
            type="text"
            required
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            placeholder="e.g. Labrador, German Shepherd, Mixed"
            className={inputClass}
            disabled={status === 'submitting'}
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-location`} className={labelClass}>
            City / Location
          </label>
          <select
            id={`${idPrefix}-location`}
            name="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
            disabled={status === 'submitting'}
          >
            <option value="">Select your city</option>
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={"Tell us a bit about your dog and why you're signing up early."}
          className={`${inputClass} resize-y min-h-[6.5rem]`}
          disabled={status === 'submitting'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#0A5C52] text-white font-display text-xl rounded-none min-h-[52px] px-4 py-3 tracking-wide hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : resolvedButtonLabel}
      </button>
    </>
  );

  if (variant === 'footer') {
    return (
      <div className="w-full max-w-2xl mx-auto md:mx-0">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.p
              key="success"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="font-body text-base md:text-lg text-[#0A5C52] leading-snug"
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
              onSubmit={handleSubmit}
              className="space-y-6 relative"
            >
              {/* Hidden fields — not visible to user */}
              <input type="hidden" name="_honeypot" defaultValue="" />
              <input type="hidden" name="_subject" defaultValue={FORMSPREE_SUBJECT} />
              <input type="hidden" name="_tag" defaultValue={FORMSPREE_FORM_TAG} />
              {status === 'error' && (
                <p className="font-body text-sm md:text-base text-[#C9963A]" role="alert" aria-live="polite">
                  Something went wrong. Email us at kaisrunmobile@gmail.com
                </p>
              )}
              {fields}
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
              className="font-body text-base md:text-lg text-[#0A5C52]"
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
              onSubmit={handleSubmit}
              className="space-y-6 relative"
            >
              {/* Hidden fields — not visible to user */}
              <input type="hidden" name="_honeypot" defaultValue="" />
              <input type="hidden" name="_subject" defaultValue={FORMSPREE_SUBJECT} />
              <input type="hidden" name="_tag" defaultValue={FORMSPREE_FORM_TAG} />
              {status === 'error' && (
                <p className="font-body text-sm md:text-base text-[#C9963A]" role="alert" aria-live="polite">
                  Something went wrong. Email us at kaisrunmobile@gmail.com
                </p>
              )}
              {fields}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
