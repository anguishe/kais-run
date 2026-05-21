'use client';

import { useState, FormEvent } from 'react';
import { trackLeadCapture } from '@/lib/googleAds';
import { subscribeToMailchimp } from '@/lib/subscribe';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqbbwrl';
const FORMSPREE_SUBJECT = "New inquiry — Energy Guide — Kai's Run website";
const FORMSPREE_FORM_TAG = 'energy-guide';

const PDF_URL =
  'https://mcusercontent.com/cfc3dccd2c21b015ecc30e2a5/files/4a070690-30ae-ea53-89d8-042f167eb554/emerald_coast_dog_energy_guide.pdf';

const inputClass =
  'w-full bg-[#1A1F2E] border border-white/10 focus:border-teal-600 text-[#F0EDE6] rounded-none py-3 px-4 font-body outline-none transition-colors';

const labelClass = 'block uppercase tracking-widest text-xs text-brand-gray mb-2 font-body';

const LOCATION_OPTIONS = ['Destin', 'Fort Walton Beach', 'Niceville', 'Other'] as const;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadMagnetForm() {
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

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    try {
      const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone,
          dog_name: dogName,
          dog_breed: dogBreed,
          location,
          message,
          _replyto: trimmedEmail,
          _honeypot: '',
          _subject: FORMSPREE_SUBJECT,
          _tag: FORMSPREE_FORM_TAG,
        }),
      });

      if (formspreeRes.ok) {
        subscribeToMailchimp(trimmedEmail, trimmedName, ['energy-guide']).catch(() => {
          // Silent fail — Formspree already captured the lead
        });
        setName('');
        setEmail('');
        setPhone('');
        setDogName('');
        setDogBreed('');
        setLocation('');
        setMessage('');
        setStatus('success');
        try {
          trackLeadCapture();
        } catch {
          /* defensive */
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="space-y-6">
      {status === 'success' ? (
        <div className="flex flex-col items-start gap-4">
          <p className="text-brand-offwhite font-body text-lg">
            You&apos;re in. Your guide is ready to download.
          </p>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-brand-offwhite font-body font-semibold rounded-lg hover:bg-brand-teal/80 transition-colors"
          >
            Download Your Energy Guide →
          </a>
          <p className="text-brand-gray text-sm">A copy is also on its way to your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="_honeypot" defaultValue="" />
          <input type="hidden" name="_subject" defaultValue={FORMSPREE_SUBJECT} />
          <input type="hidden" name="_tag" defaultValue={FORMSPREE_FORM_TAG} />
          {status === 'error' && (
            <p className="font-body text-sm md:text-base text-[#C9963A] text-center" role="alert" aria-live="polite">
              Something went wrong. Call or text us at{' '}
              <a href="tel:850-218-5855" className="underline underline-offset-2 hover:opacity-90">
                850-218-5855
              </a>
              .
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lead-name" className={labelClass}>
                Your Name
              </label>
              <input
                id="lead-name"
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
              <label htmlFor="lead-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Where should we send the guide?"
                className={inputClass}
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="lead-phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="lead-phone"
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
              <label htmlFor="lead-dog-name" className={labelClass}>
                Dog&apos;s Name
              </label>
              <input
                id="lead-dog-name"
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
              <label htmlFor="lead-dog-breed" className={labelClass}>
                Dog&apos;s Breed
              </label>
              <input
                id="lead-dog-breed"
                name="dog_breed"
                type="text"
                required
                value={dogBreed}
                onChange={(e) => setDogBreed(e.target.value)}
                placeholder="e.g. Belgian Malinois, Lab, Mixed"
                className={inputClass}
                disabled={status === 'submitting'}
              />
            </div>

            <div>
              <label htmlFor="lead-location" className={labelClass}>
                City / Location
              </label>
              <select
                id="lead-location"
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
            <label htmlFor="lead-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="lead-message"
              name="message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you struggle with most — leash pulling, reactivity, boredom, or anything else we should know."
              className={`${inputClass} resize-y min-h-[6.5rem]`}
              disabled={status === 'submitting'}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-[#0A5C52] text-white font-display text-xl rounded-none min-h-[52px] px-4 py-3 tracking-wide hover:opacity-95 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Get the Free Guide'}
          </button>
        </form>
      )}
      <p className="text-brand-gray font-body text-xs text-center">
        No spam. Just useful info on keeping high-drive dogs balanced.
      </p>
    </div>
  );
}
