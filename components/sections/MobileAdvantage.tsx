'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const features = [
  {
    title: 'Climate Controlled',
    description:
      'Florida summers hit 95°+ with brutal humidity. Our mobile unit is fully climate controlled — your dog runs in comfort, never overheats.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: 'One Dog at a Time',
    description:
      'Fully private sessions. No other dogs. No distractions. No reactivity triggers. Just your dog, the slatmill, and focused conditioning.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    title: 'We Come to You',
    description:
      'No drop-off. No daycare. No commute. We pull up to your driveway, run the session, and leave you with a tired, happy dog.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export function MobileAdvantage() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl font-display tracking-tight text-center mb-16"
        >
          The gym comes to your driveway.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="bg-brand-black border border-brand-teal/20 rounded-xl p-8"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-brand-teal/30 text-brand-teal mb-6">
                {feature.icon}
              </div>
              <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-4">
                {feature.title}
              </h3>
              <p className="text-brand-gray text-sm font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
