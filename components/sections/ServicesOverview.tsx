'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/variants';

const services = [
  {
    title: "Kai's Run Welcome",
    subtitle: 'Intro Session',
    price: '$35 / $55 (2 dogs)',
    description: 'First session for new dogs. Includes fitness assessment, introduction to the slatmill, and your dog\'s personal Run Profile card.',
  },
  {
    title: 'Performance Session',
    subtitle: 'On-Demand',
    price: '$65 / $85 (2 dogs)',
    description: 'Single session, no commitment. Book whenever your dog needs to burn energy. 30–45 minutes of structured conditioning.',
  },
  {
    title: 'Session Bundles',
    subtitle: 'Never Expire',
    price: '4-pack $220 · 8-pack $400',
    description: 'Buy sessions in bulk, use anytime. No expiration. Best value for consistent conditioning without a monthly commitment.',
  },
  {
    title: 'Monthly Membership',
    subtitle: 'Priority Booking',
    price: 'From $120/mo',
    description: 'Bi-weekly or weekly sessions. Priority booking windows. Cancel anytime with 30-day notice. The serious athlete\'s choice.',
  },
];

export function ServicesOverview() {
  return (
    <section className="py-section px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-6xl mx-auto"
      >
        <motion.p
          variants={fadeUp}
          className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
        >
          SERVICES
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl font-display tracking-tight text-center mb-16"
        >
          Find Your Fit
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <Link href="/pricing" className="block group">
                <div className="bg-brand-charcoal border-t-2 border-brand-teal rounded-xl p-8 h-full transition-all duration-300 hover:bg-brand-charcoal/80">
                  <p className="text-brand-gray font-body text-xs tracking-[0.2em] uppercase mb-2">
                    {service.subtitle}
                  </p>
                  <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-gold font-body text-sm font-medium mb-4">
                    {service.price}
                  </p>
                  <p className="text-brand-gray text-sm font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center mt-10">
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
