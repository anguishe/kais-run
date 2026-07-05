'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/variants';
import SlatmillExplainer from '@/components/ui/SlatmillExplainer';

const pillars = [
  {
    title: 'Energy Release',
    description:
      '30–45 minutes of self-paced running that drains excess energy the way nature intended — through sustained effort, not aimless wandering.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Behavioral Regulation',
    description:
      'A properly conditioned dog is calmer, less reactive, and easier to live with. Physical output directly reduces anxiety, destructive habits, and hyper-arousal.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Physical Conditioning',
    description:
      'Builds lean muscle, cardiovascular endurance, and joint strength. Your dog gets fitter every session — measurable, repeatable progress.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
];

export function SolutionSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl font-display tracking-tight text-center mb-6"
        >
          Structured. Measurable. Results.
        </motion.h2>

        <motion.div variants={fadeUp} className="mb-16">
          <SlatmillExplainer
            showHeading={false}
            body={
              <p>
                A slatmill drives structured, low-impact conditioning most backyards can&apos;t
                replicate.{' '}
                <Link href="/faq/" className="text-brand-teal underline-offset-2 hover:underline">
                  See exactly how a session works.
                </Link>
              </p>
            }
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-brand-teal/30 text-brand-teal mb-6">
                {pillar.icon}
              </div>
              <h3 className="font-display text-2xl tracking-wider text-brand-teal mb-4">
                {pillar.title}
              </h3>
              <p className="text-brand-gray text-sm font-body leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
