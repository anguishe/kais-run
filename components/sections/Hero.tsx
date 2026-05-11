'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-black overflow-hidden">
      {/* <!-- REPLACE WITH KAI HERO PHOTO --> */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-brand-black" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeUp}
          className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-8"
        >
          DESTIN · FORT WALTON BEACH · NICEVILLE
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-7xl md:text-9xl tracking-tight leading-[0.9] mb-8"
        >
          YOUR DOG
          <br />
          <span className="text-brand-teal">DESERVES</span>
          <br />
          TO RUN.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg font-body text-brand-gray max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Structured canine conditioning. Delivered to your driveway.
          <br className="hidden md:block" />
          Not a dog walk. A performance session.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book?offer=founding" variant="primary" className="text-base px-10 py-4">
            Claim Founding Spot — 20 Only
          </Button>
          <Button href="/book?type=intro" variant="secondary" className="text-base px-10 py-4">
            Book Intro Session — $35
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
