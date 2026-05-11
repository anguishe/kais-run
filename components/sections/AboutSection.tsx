'use client';

import { motion } from 'framer-motion';
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
    <section className="py-section px-6 bg-brand-charcoal">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp}>
            {/* <!-- REPLACE WITH REAL PHOTO --> */}
            <div className="w-full aspect-[4/5] bg-brand-black border border-brand-teal/10 rounded-xl flex items-center justify-center">
              <span className="text-brand-gray text-sm">Travis + Kai photo</span>
            </div>
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
              Built for Kai.
              <br />
              Brought to You.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-brand-gray font-body leading-relaxed mb-8">
              <p>
                Travis grew up in Destin. His Rhodesian Ridgeback mix Kai had uncontrollable energy — destructive behavior, anxiety, impossible to tire out with normal walks.
              </p>
              <p>
                He discovered the slatmill: a self-powered treadmill where the dog sets their own pace. No motor. Nothing forced. Kai ran, then slept. Everything changed.
              </p>
              <p>
                Travis built Kai&apos;s Run to bring that same solution to every high-drive dog on the Emerald Coast.
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
