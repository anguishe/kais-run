'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import LeadMagnetForm from '@/components/ui/LeadMagnetForm';

export function LeadMagnetSection() {
  return (
    <section className="py-section px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl font-display tracking-tight mb-6">
            FREE GUIDE: Tire Out Your High-Drive Dog.
          </h2>
          <p className="text-base md:text-lg font-body text-brand-gray max-w-2xl mx-auto">
            Get the Emerald Coast Dog Energy Guide — structured exercise for working breeds. Free. No spam.
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <LeadMagnetForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
