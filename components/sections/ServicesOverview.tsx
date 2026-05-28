'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/variants';

const services = [
  {
    category: 'INTRO SESSION',
    title: 'Intro Session',
    price: '$35 / $55 (2 dogs, same household)',
    description: 'Your first session. Includes fitness assessment, introduction to the slatmill, and your dog\'s personal Run Profile card.',
  },
  {
    category: 'FOUNDING ATHLETE',
    title: 'Founding Athlete',
    price: '$200 / 5 sessions',
    description: 'Limited to 20 dogs. $40 per session effective rate — never offered again once spots are gone.',
  },
  {
    category: 'STANDARD SESSION',
    title: 'Standard Session',
    price: 'Coming soon',
    description: 'Walk-up conditioning sessions. Standard pricing will be announced after the Founding Athlete program closes.',
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <motion.p
          variants={fadeUp}
          className="text-brand-teal font-body text-xs tracking-[0.3em] uppercase mb-4"
        >
          SERVICES
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl font-display tracking-tight mb-16"
        >
          Find Your Fit
        </motion.h2>

        <div>
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="border-b border-white/10 py-10 first:pt-0 last:border-b-0"
            >
              <p className="text-brand-teal font-body text-xs tracking-[0.3em] uppercase mb-3">
                {service.category}
              </p>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8 mb-4">
                <h3 className="font-display text-3xl tracking-wider text-brand-offwhite">
                  {service.title}
                </h3>
                <p className={`font-body text-base font-medium whitespace-nowrap ${
                  service.price === 'Coming soon' ? 'text-brand-gray italic' : 'text-brand-offwhite'
                }`}>
                  {service.price}
                </p>
              </div>
              <p className="text-brand-gray text-sm font-body leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-brand-teal font-body text-sm hover:text-brand-teal/80 transition-colors"
          >
            View full pricing details
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
