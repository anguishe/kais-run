'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import { event } from '@/lib/gtag';

export function Hero() {
  return (
    <section className="grain-overlay relative min-h-screen flex items-end bg-brand-black overflow-hidden">
      {/* Cinematic radial gradient — always visible as fallback */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #1A1F2E 0%, #0F1117 70%)',
        }}
      />

      {/* Background hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Kai running at full speed on professional dog treadmill"
          fill
          className="object-cover opacity-40"
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 md:pb-32"
      >
        {/* Teal accent rule */}
        <motion.div variants={fadeUp} className="w-16 h-px bg-brand-teal mb-6" />

        <motion.p
          variants={fadeUp}
          className="text-brand-teal font-body text-xs tracking-[0.3em] uppercase mb-8"
        >
          Destin · Fort Walton Beach · Niceville
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-7xl md:text-[120px] lg:text-[160px] tracking-tight leading-[0.85] mb-8 text-brand-offwhite"
        >
          YOUR DOG
          <br />
          <span className="text-brand-teal">DESERVES</span>
          <br />
          TO RUN.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg font-body text-brand-gray max-w-xl mb-12 leading-relaxed"
        >
          Structured canine conditioning. Delivered to your driveway.{' '}
          Not a dog walk. A performance session.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
          <Button
            href="/book?offer=founding"
            variant="primary"
            className="text-base px-10 py-4"
            bookIntentSource="hero-founding-primary"
            onClick={() =>
              event('cta_click', { event_label: 'hero_book_now' })
            }
          >
            Claim Founding Spot — 20 Only
          </Button>
          <Button
            href="/book/"
            variant="secondary"
            className="text-base px-10 py-4"
            bookIntentSource="hero-intro"
          >
            Book Intro Session — $35
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
