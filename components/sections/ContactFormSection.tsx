'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykolrrr';
const DEFAULT_MAILCHIMP_TAG = 'contact-inquiry';

export type ContactFormSectionProps = {
  endpoint?: string;
  tag?: string;
  /** Invoked after Formspree returns OK and before success UI (e.g. Google Ads). */
  onSuccess?: () => void;
};

const inputClass =
  'w-full bg-[#1A1F2E] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-2 font-body';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const LOCATION_OPTIONS = ['Destin', 'Fort Walton Beach', 'Niceville', 'Other'] as const;

export function ContactFormSection({
  endpoint,
  tag,
  onSuccess,
}: ContactFormSectionProps = {}) {
  const formspreeUrl = endpoint ?? DEFAULT_FORMSPREE_ENDPOINT;
  const mailchimpTag = tag ?? DEFAULT_MAILCHIMP_TAG;
  const formspreeSubject =
    mailchimpTag === 'founding-20'
      ? "New inquiry — Founding 20 — Kai's Run website"
      : "New inquiry — Kai's Run website";
  const formspreeIntegrationTag = mailchimpTag === 'founding-20' ? 'founding-20' : 'contact-form';
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
      const res = await fetch(formspreeUrl, {
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
          _subject: formspreeSubject,
          _tag: formspreeIntegrationTag,
        }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setPhone('');
        setDogName('');
        setDogBreed('');
        setLocation('');
        setMessage('');
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            name: name,
            tags: [mailchimpTag],
          }),
        }).catch(() => {
          // silent fail — Mailchimp sync is non-blocking
        });
        try {
          onSuccess?.();
        } catch {
          /* conversion helpers are self-contained */
        }
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
              {/* Hidden fields — not visible to user */}
              <input type="hidden" name="_honeypot" defaultValue="" />
              <input type="hidden" name="_subject" defaultValue={formspreeSubject} />
              <input type="hidden" name="_tag" defaultValue={formspreeIntegrationTag} />
              {status === 'error' && (
                <p
                  className="font-body text-sm md:text-base text-[#C9963A]"
                  role="alert"
                  aria-live="polite"
                >
                  Something went wrong. Email us directly at kaisrunmobile@gmail.com
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                  <label htmlFor="contact-location" className={labelClass}>
                    City / Location
                  </label>
                  <select
                    id="contact-location"
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
