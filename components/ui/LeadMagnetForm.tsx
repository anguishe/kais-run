'use client';

import { useState, FormEvent } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqbbwrl';

interface FormData {
  firstName: string;
  dogName: string;
  dogBreed: string;
  email: string;
}

export default function LeadMagnetForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    dogName: '',
    dogBreed: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Energy Guide Request — Kai's Run",
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        const subscribeEmail = formData.email;
        const subscribeName = formData.firstName;
        setFormData({
          firstName: '',
          dogName: '',
          dogBreed: '',
          email: '',
        });
        setStatus('success');
        try {
          fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              email: subscribeEmail,
              name: subscribeName,
              tags: ['energy-guide'],
            }),
          }).catch(() => {});
        } catch {
          /* fire-and-forget */
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-teal/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-brand-teal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-display tracking-tight text-brand-offwhite mb-3">
          Check your email!
        </h3>
        <p className="text-brand-gray font-body text-base">
          Your guide is on the way. We&apos;ll also send you info on the Founding Athlete Program.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-brand-charcoal border border-red-500/30 rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-display tracking-tight text-brand-offwhite mb-3">
          Something went wrong.
        </h3>
        <p className="text-brand-gray font-body text-base mb-6">
          Call or text us at{' '}
          <a href="tel:850-218-5855" className="text-brand-teal hover:text-brand-teal/80">
            850-218-5855
          </a>
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand-teal font-body text-sm hover:text-brand-teal/80 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-brand-offwhite font-body text-sm mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 bg-brand-black border border-brand-teal/30 rounded-lg text-brand-offwhite font-body text-base focus:outline-none focus:border-brand-teal transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Dog's Name */}
        <div>
          <label htmlFor="dogName" className="block text-brand-offwhite font-body text-sm mb-2">
            Dog&apos;s Name *
          </label>
          <input
            type="text"
            id="dogName"
            name="dogName"
            value={formData.dogName}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 bg-brand-black border border-brand-teal/30 rounded-lg text-brand-offwhite font-body text-base focus:outline-none focus:border-brand-teal transition-colors"
            placeholder="Your dog's name"
          />
        </div>

        {/* Dog's Breed */}
        <div>
          <label htmlFor="dogBreed" className="block text-brand-offwhite font-body text-sm mb-2">
            Dog&apos;s Breed *
          </label>
          <input
            type="text"
            id="dogBreed"
            name="dogBreed"
            value={formData.dogBreed}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 bg-brand-black border border-brand-teal/30 rounded-lg text-brand-offwhite font-body text-base focus:outline-none focus:border-brand-teal transition-colors"
            placeholder="e.g. Belgian Malinois"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-brand-offwhite font-body text-sm mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'submitting'}
            className="w-full px-4 py-3 bg-brand-black border border-brand-teal/30 rounded-lg text-brand-offwhite font-body text-base focus:outline-none focus:border-brand-teal transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-brand-teal text-white px-8 py-4 font-medium text-base tracking-wide transition-colors hover:bg-brand-teal/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Get the Free Guide'}
        </button>
      </div>

      <p className="text-brand-gray font-body text-xs text-center mt-4">
        No spam. Just useful info on keeping high-drive dogs balanced.
      </p>
    </form>
  );
}
