'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const sessionTypes = [
  {
    id: 'intro',
    name: "Kai's Run Welcome (Intro)",
    price: '$35 / $55 (two dogs)',
    description: 'Includes fitness assessment and personalized Run Profile card.',
  },
  {
    id: 'performance',
    name: 'Performance Session',
    price: '$65 / $85 (two dogs)',
    description: 'Full structured conditioning session for continued athletes.',
  },
  {
    id: 'founding',
    name: 'Founding Athlete',
    price: 'Limited spots available',
    description: '$200 for 5 sessions — a rate that will never exist again.',
    highlight: true,
  },
];

const timeline = [
  {
    number: '1',
    title: 'Confirmation Text',
    description: 'Receive booking confirmation same day',
  },
  {
    number: '2',
    title: 'ETA Text',
    description: 'Get arrival time the morning of your session',
  },
  {
    number: '3',
    title: 'Photo Report',
    description: 'Run metrics and photos sent within 1 hour',
  },
];

export default function BookingContent() {
  const [selectedSession, setSelectedSession] = useState<string>('intro');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const offer = params.get('offer');
    const type = params.get('type');

    if (offer === 'founding') {
      setSelectedSession('founding');
    } else if (type === 'intro') {
      setSelectedSession('intro');
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-display tracking-tight mb-6">
            BOOK YOUR SESSION
          </h1>
          <p className="text-base md:text-lg font-body text-brand-gray max-w-2xl mx-auto">
            Select your session type below. Intro sessions include a fitness assessment and personalized Run Profile card.
          </p>
        </motion.div>

        {/* Session Type Selector */}
        <motion.div variants={fadeUp} className="mb-12">
          <h2 className="text-2xl font-display tracking-tight mb-6 text-brand-offwhite">
            SELECT SESSION TYPE
          </h2>
          <div className="grid gap-4">
            {sessionTypes.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session.id)}
                className={`text-left p-6 rounded-xl border-2 transition-all ${
                  selectedSession === session.id
                    ? 'border-brand-teal bg-brand-charcoal/80'
                    : 'border-brand-teal/20 bg-brand-charcoal/40 hover:border-brand-teal/40'
                } ${session.highlight ? 'border-brand-gold' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedSession === session.id
                            ? 'border-brand-teal'
                            : 'border-brand-gray'
                        }`}
                      >
                        {selectedSession === session.id && (
                          <div className="w-3 h-3 rounded-full bg-brand-teal" />
                        )}
                      </div>
                      <h3 className="text-xl font-display tracking-tight text-brand-offwhite">
                        {session.name}
                      </h3>
                      {session.highlight && (
                        <span className="text-xs font-body tracking-[0.2em] uppercase text-brand-gold">
                          LIMITED
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-body text-brand-gray ml-8">
                      {session.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-display text-brand-teal">
                      {session.price}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Square Appointments Embed */}
        <motion.div variants={fadeUp} className="mb-12">
          <div className="bg-brand-charcoal border-2 border-brand-teal/20 rounded-xl p-12 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="text-brand-teal font-display text-2xl mb-4">
                Booking System Loading...
              </p>
              <div className="text-brand-gray font-body text-sm max-w-md space-y-2">
                <p>
                  {/* SQUARE APPOINTMENTS EMBED: */}
                </p>
                <p>
                  1. Go to squareup.com/appointments
                </p>
                <p>
                  2. Set up your services as listed in the brand guide
                </p>
                <p>
                  3. Get embed code from Appointments → Settings → Online Booking → Embed
                </p>
                <p>
                  4. Paste iframe code here replacing this div
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alternative CTA */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-brand-gray font-body text-base mb-4">
            Prefer to book by phone?
          </p>
          <a
            href="tel:850-218-5855"
            className="text-brand-teal font-display text-3xl hover:text-brand-teal/80 transition-colors"
          >
            Call or text: 850-218-5855
          </a>
        </motion.div>

        {/* What to Expect Timeline */}
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl font-display tracking-tight text-center mb-10 text-brand-offwhite">
            WHAT TO EXPECT AFTER BOOKING
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-brand-teal bg-brand-charcoal">
                    <span className="text-3xl font-display text-brand-teal">
                      {step.number}
                    </span>
                  </span>
                </div>
                <h3 className="text-xl font-display tracking-tight text-brand-offwhite mb-2">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-brand-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
