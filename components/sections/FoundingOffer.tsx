'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import SpotsCounter from '@/components/ui/SpotsCounter';
import Button from '@/components/ui/Button';

const benefits = [
  'Priority booking for all future sessions',
  '"Founding Athlete" status - recognized first believers',
  'Personal Run Profile Card on your first session',
  'One-time founding rate - never offered again',
];

export function FoundingOffer() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          variants={fadeUp}
          className="border border-brand-teal/30 p-8 md:p-16 relative overflow-hidden"
        >
          {/* Left teal accent border */}
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-teal" />

          <motion.p
            variants={fadeUp}
            className="text-brand-teal-light font-body text-xs tracking-[0.3em] uppercase mb-4"
          >
            LIMITED AVAILABILITY
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-display tracking-tight mb-4"
          >
            JOIN THE FOUNDING 20.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-body text-brand-gray max-w-2xl mb-10"
          >
            A one-time founding offer - an introductory rate we will never offer again. For the 20 who believed first.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-10">
            <p className="font-display text-5xl md:text-6xl text-brand-offwhite mb-1">$200</p>
            <p className="text-brand-gray font-body text-sm tracking-wide">
              5 sessions · $40/session effective rate
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10">
            <SpotsCounter />
          </motion.div>

          <motion.ul variants={fadeUp} className="space-y-3 mb-10">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="text-brand-teal-light mt-0.5 flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-brand-offwhite/80 font-body text-sm">{benefit}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mb-6">
            <Button
              href="/book?offer=founding"
              variant="primary"
              className="text-base px-12 py-5 w-full sm:w-auto"
              bookIntentSource="founding-offer-section"
            >
              Claim Your Founding Spot
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-brand-gray text-xs font-body"
          >
            Standard pricing is live now - Intro Session, Private Conditioning Session, and Session Packages are all bookable. See full pricing.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
