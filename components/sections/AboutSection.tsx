'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/variants';

const trustSignals = [
  'Born and raised in Destin, FL',
  'Licensed & Insured',
  'Julius K9 harnesses provided (S/M/L)',
  'Rabies vaccination required',
  'Digital waiver + health screening',
];

export function AboutSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden"
          >
            <img
              src="/images/about/travis-kai-2.webp"
              alt="Travis and Kai - Founders of Kai's Run mobile dog gym"
              width={800}
              height={1000}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div>
            <motion.p
              variants={fadeUp}
              className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-4"
            >
              THE STORY
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl font-display tracking-tight mb-8"
            >
              Where It Started.
              <br />
              Brought to You.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-brand-gray font-body leading-relaxed mb-8">
              <p>
                Kai&apos;s Run started with one high-drive dog and a driveway. Now Travis brings the same structured conditioning to yours.
              </p>
              <p>
                <Link href="/about/" className="text-brand-teal underline-offset-2 hover:underline">
                  The full story →
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-brand-offwhite font-body text-sm font-medium mb-3">
                Trust & Safety
              </p>
              <ul className="space-y-2">
                {trustSignals.map((signal) => (
                  <li key={signal} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                    <span className="text-brand-gray text-sm font-body">{signal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
