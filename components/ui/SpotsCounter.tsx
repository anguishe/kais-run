'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { FOUNDING_SPOTS_TOTAL } from '@/lib/constants';
import config from '@/public/data/config.json';

type FoundingSpots = {
  total: number;
  remaining: number;
};

// Build-time seed from the local static config so the prerendered HTML already
// shows the live number instead of a skeleton; the client fetch only reconciles
// if config.json changed after the build.
const SEED: FoundingSpots = {
  total: FOUNDING_SPOTS_TOTAL,
  remaining: config.foundingSpots.remaining,
};

type Props = {
  /** Render the full standalone section (charcoal band + heading + subline). Bare widget by default. */
  standalone?: boolean;
};

export default function SpotsCounter({ standalone = false }: Props) {
  const [spots, setSpots] = useState<FoundingSpots>(SEED);

  useEffect(() => {
    fetch('/data/config.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load spots config');
        return res.json();
      })
      .then((data: { foundingSpots?: { total?: number; remaining?: number } }) => {
        const fs = data.foundingSpots;
        setSpots({
          total: fs?.total ?? FOUNDING_SPOTS_TOTAL,
          remaining: fs?.remaining ?? SEED.remaining,
        });
      })
      .catch(() => setSpots(SEED));
  }, []);

  const { total, remaining } = spots;
  const sold = total - remaining;
  const pct = (sold / total) * 100;

  const inner = (
    <>
      <motion.p
        variants={fadeUp}
        className="font-display text-xl md:text-2xl tracking-wider text-brand-offwhite mb-4"
      >
        {standalone && 'FOUNDING ATHLETE PROGRAM - '}
        <span className="text-brand-gold">{remaining} / {total}</span>{' '}
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

      {standalone && (
        <motion.p variants={fadeUp} className="text-brand-gray text-sm font-body mt-4">
          $200 for 5 sessions · This offer will never exist again
        </motion.p>
      )}
    </>
  );

  if (!standalone) {
    return <div className="text-center">{inner}</div>;
  }

  return (
    <section className="bg-brand-charcoal py-24 md:py-32 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl mx-auto text-center"
      >
        {inner}
      </motion.div>
    </section>
  );
}
