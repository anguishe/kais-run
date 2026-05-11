'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const stats = [
  { number: '5%', label: 'energy released', detail: '20 min walk =' },
  { number: '3–5×', label: 'output needed', detail: 'High-drive breeds need' },
  { number: '∞', label: 'consequences', detail: 'Pent-up energy = anxiety, destruction, reactivity' },
];

export function ProblemSection() {
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
          A tired walk doesn&apos;t solve a high-drive dog.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.number}
              variants={fadeUp}
              className="bg-brand-black border border-brand-teal/20 rounded-xl p-8 text-center"
            >
              <span className="font-display text-brand-gold text-6xl block mb-3">
                {stat.number}
              </span>
              <p className="font-display text-xl tracking-wider text-brand-offwhite mb-2">
                {stat.label}
              </p>
              <p className="text-brand-gray text-sm font-body">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
