'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

type Props = {
  remaining: number;
  total: number;
};

export function SpotsCounter({ remaining, total }: Props) {
  const sold = total - remaining;
  const pct = (sold / total) * 100;

  return (
    <section className="bg-brand-charcoal py-24 md:py-32 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-display text-xl md:text-2xl tracking-wider text-brand-offwhite mb-4"
        >
          FOUNDING ATHLETE PROGRAM —{' '}
          <span className="text-brand-gold">{remaining} / {total}</span>{' '}
          SPOTS REMAINING
        </motion.p>

        <motion.div variants={fadeUp} className="w-full h-2 bg-brand-black rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-brand-teal rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </motion.div>

        <motion.p variants={fadeUp} className="text-brand-gray text-sm font-body">
          $200 for 5 sessions · This offer will never exist again
        </motion.p>
      </motion.div>
    </section>
  );
}
