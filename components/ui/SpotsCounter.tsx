'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/variants';

const SPOTS_REMAINING = 20;
const TOTAL_SPOTS = 20;

export default function SpotsCounter() {
  const sold = TOTAL_SPOTS - SPOTS_REMAINING;
  const pct = (sold / TOTAL_SPOTS) * 100;

  return (
    <div className="text-center">
      <motion.p
        variants={fadeUp}
        className="font-display text-xl md:text-2xl tracking-wider text-brand-offwhite mb-4"
      >
        <span className="text-brand-gold">{SPOTS_REMAINING} / {TOTAL_SPOTS}</span>{' '}
        SPOTS REMAINING
      </motion.p>

      <motion.div variants={fadeUp} className="w-full h-2 bg-brand-black rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-teal rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
}
