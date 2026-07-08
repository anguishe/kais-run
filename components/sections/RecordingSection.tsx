'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/variants';

export function RecordingSection() {
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
              src="/images/how-we-record-reveal-card.jpg"
              alt="A recorded Kai's Run session shown on screen"
              width={1080}
              height={1350}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div>
            <motion.p
              variants={fadeUp}
              className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-4"
            >
              Transparency
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl font-display tracking-tight mb-8"
            >
              Every session is on the record
            </motion.h2>

            <motion.p variants={fadeUp} className="text-brand-gray font-body leading-relaxed mb-8">
              Two cameras roll on every run, start to finish - for your dog&apos;s safety, and so you
              can see the work.
            </motion.p>

            <motion.p variants={fadeUp}>
              <Link href="/how-we-record/" className="text-brand-teal underline-offset-2 hover:underline">
                How we record →
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
