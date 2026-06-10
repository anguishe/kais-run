'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import LeadMagnetForm from '@/components/ui/LeadMagnetForm';
import SlatmillExplainer from '@/components/ui/SlatmillExplainer';
import type { ReactNode } from 'react';

interface FAQPageClientProps {
  faqAccordion: ReactNode;
}

export function FAQPageClient({ faqAccordion }: FAQPageClientProps) {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-6"
          >
            FREQUENTLY ASKED
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            COMMON QUESTIONS
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed"
          >
            Everything you need to know about mobile slatmill sessions.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-brand-charcoal px-6 py-24 md:py-32">
        <SlatmillExplainer />
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            {faqAccordion}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-12 text-center text-base md:text-lg font-body text-brand-gray"
          >
            Ready to book?{' '}
            <Link href="/book/" className="text-brand-teal underline-offset-2 hover:underline">
              Intro sessions start at $35 →
            </Link>
          </motion.p>
        </motion.div>
      </section>

      {/* Lead Magnet */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6">
              Get Early Access Updates
            </h2>
            <p className="text-base md:text-lg font-body text-brand-gray max-w-2xl mx-auto">
              We&apos;re pre-launch. Enter your email to get updates on our opening date, founding
              athlete availability, and conditioning tips from Travis.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadMagnetForm />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
