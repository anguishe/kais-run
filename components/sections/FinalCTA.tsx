'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section className="py-section px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-6xl md:text-8xl font-display tracking-tight mb-6"
        >
          YOUR DOG IS READY.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg font-body text-brand-gray max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          High-drive dogs deserve structured exercise. Not just a walk.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Button href="/book?type=intro" variant="secondary" className="text-base px-10 py-4">
            Book Intro Session — $35
          </Button>
          <Button href="/book?offer=founding" variant="primary" className="text-base px-10 py-4">
            Join the Founding 20
          </Button>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-brand-gray font-body text-sm mb-2">Prefer to talk?</p>
          <a
            href="tel:850-218-5855"
            className="text-brand-offwhite font-display text-2xl tracking-wider hover:text-white transition-colors"
          >
            Call or text: 850-218-5855
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
