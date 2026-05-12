'use client';

import { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { event } from '@/lib/gtag';
import Button from '@/components/ui/Button';
import ThankYouConversionTracker from '@/app/thank-you/ThankYouConversionTracker';

const preparationSteps = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Potty Break Before',
    description: 'Let your dog use the bathroom right before the session starts.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: 'Harness On',
    description: 'Have your dog\'s harness ready. We provide Julius K9 harnesses S/M/L if needed.',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Bring Favorite Treats',
    description: 'Pack your dog\'s preferred treats for motivation and positive reinforcement.',
  },
];

export default function ThankYouContent() {
  useEffect(() => {
    event('booking_complete', {
      event_category: 'conversion',
      event_label: 'booking_thank_you_page',
    });
  }, []);

  const shareText = encodeURIComponent(
    "Just booked with Kai's Run — the mobile dog gym that brings structured conditioning to your driveway. Your high-drive dog needs this. Check it out: https://kaisrun.com"
  );

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6">
      <Suspense fallback={null}>
        <ThankYouConversionTracker />
      </Suspense>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Main Headline */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h1 className="text-7xl md:text-9xl font-display tracking-tight mb-6 text-brand-teal">
            YOU&apos;RE IN.
          </h1>
          <p className="text-xl md:text-2xl font-body text-brand-offwhite max-w-2xl mx-auto">
            Check your phone for a confirmation text. We&apos;ll send an ETA text the morning of your session.
          </p>
        </motion.div>

        {/* What to Prepare Section */}
        <motion.div variants={fadeUp} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display tracking-tight text-center mb-10 text-brand-offwhite">
            WHAT TO PREPARE
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {preparationSteps.map((step) => (
              <div
                key={step.title}
                className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-6 text-center"
              >
                <div className="text-brand-teal mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-display tracking-tight text-brand-offwhite mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-brand-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Referral Section */}
        <motion.div
          variants={fadeUp}
          className="bg-brand-charcoal border-2 border-brand-teal/20 rounded-xl p-8 md:p-12 mb-12"
        >
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-brand-gold font-body text-sm tracking-[0.25em] uppercase mb-4">
              SPREAD THE WORD
            </p>
            <h2 className="text-4xl md:text-5xl font-display tracking-tight mb-6 text-brand-offwhite">
              Know another dog that needs to run?
            </h2>
            <p className="text-base md:text-lg font-body text-brand-gray mb-8">
              Share Kai&apos;s Run — you&apos;ll earn a free add-on session for every referral who completes their first paid session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`sms:?&body=${shareText}`}
                className="inline-block px-8 py-4 font-medium text-sm tracking-wide transition-colors bg-brand-teal text-white hover:bg-brand-teal/90"
              >
                Share with a Friend
              </a>
              <Button href="/" variant="secondary">
                Back to Home
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={fadeUp} className="text-center">
          <p className="text-brand-gray font-body text-sm mb-4">
            Questions before your session?
          </p>
          <a
            href="tel:850-218-5855"
            className="text-brand-teal font-body text-lg hover:text-brand-teal/80 transition-colors"
          >
            Call or text: 850-218-5855
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
