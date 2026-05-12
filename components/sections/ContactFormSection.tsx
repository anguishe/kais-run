'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykolrrr';

const inputClass =
  'w-full bg-[#1A1F2E] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-2 font-body';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactFormSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
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
          dog_name: dogName,
          dog_breed: dogBreed,
          message,
          _replyto: email,
          _subject: "Kai's Run — website contact",
        }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setDogName('');
        setDogBreed('');
        setMessage('');
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            name: name,
            tags: ['contact-inquiry'],
          }),
        }).catch(() => {
          // silent fail — Mailchimp sync is non-blocking
        });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-2xl mx-auto"
      >
        <motion.div variants={fadeUp} className="mb-10 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-brand-offwhite mb-4">
            Got a question? Let&apos;s talk.
          </h2>
          <p className="font-body text-base md:text-lg text-brand-gray leading-relaxed max-w-xl mx-auto md:mx-0">
            Whether you&apos;re not sure if your dog&apos;s the right fit or just want to know more before booking
            — reach out. Travis responds personally.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.p
              key="success"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -8 }}
              className="font-body text-base md:text-lg text-[#0A5C52] text-center md:text-left"
            >
              Got it. Travis will be back to you within 24 hours — usually faster.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {status === 'error' && (
                <p
                  className="font-body text-sm md:text-base text-[#C9963A]"
                  role="alert"
                  aria-live="polite"
                >
                  Something went wrong. Email us directly at kaisrunmobile@gmail.com
                </p>
              )}

              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Your Name
                </label>
                <input
                  id="contact-name"
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
                <label htmlFor="contact-email" className={labelClass}>
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Where should we reply?"
                  className={inputClass}
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor="contact-dog-name" className={labelClass}>
                  Dog&apos;s Name
                </label>
                <input
                  id="contact-dog-name"
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

              <div>
                <label htmlFor="contact-dog-breed" className={labelClass}>
                  Dog&apos;s Breed
                </label>
                <input
                  id="contact-dog-breed"
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
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind? Scheduling, whether your dog is a good fit, general questions — all fair game."
                  className={`${inputClass} resize-y min-h-[6.5rem]`}
                  disabled={status === 'submitting'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#0A5C52] text-white font-display text-xl rounded-none min-h-[52px] px-4 py-3 tracking-wide hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending…' : 'Send It'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
