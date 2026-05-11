'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import SpotsCounter from '@/components/ui/SpotsCounter';
import Button from '@/components/ui/Button';

const benefits = [
  '$200 for 5 sessions — $40/session effective rate',
  'Priority booking for all future sessions',
  '"Founding Athlete" status — recognized first believers',
  'Personal Run Profile Card on your first session',
];

export function FoundingOffer() {
  return (
    <section className="py-section px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          variants={fadeUp}
          className="border-2 border-brand-teal rounded-xl p-8 md:p-12 bg-brand-charcoal/50"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-gold font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            LIMITED AVAILABILITY
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-display tracking-tight text-center mb-4"
          >
            JOIN THE FOUNDING 20.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-body text-brand-gray text-center max-w-2xl mx-auto mb-8"
          >
            A rate that will never exist again. For the 20 who believed first.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-10">
            <SpotsCounter />
          </motion.div>

          <motion.ul variants={fadeUp} className="space-y-4 mb-10 max-w-md mx-auto">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="text-brand-teal mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-brand-offwhite font-body text-sm">{benefit}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="text-center mb-6">
            <Button href="/book?offer=founding" variant="primary" className="text-base px-12 py-5">
              Claim Your Founding Spot
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-brand-gray text-sm font-body text-center"
          >
            Once these 20 spots are gone, standard sessions start at $65.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
