'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const FALLBACK_TOTAL = 20;
const FALLBACK_REMAINING = 20;

type FoundingSpots = {
  total: number;
  remaining: number;
};

function SpotsCounterSkeleton() {
  return (
    <section className="bg-brand-charcoal py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center animate-pulse">
        <div className="h-8 bg-brand-black/60 rounded mx-auto max-w-md mb-4" />
        <div className="w-full h-2 bg-brand-black rounded-full mb-4" />
        <div className="h-4 bg-brand-black/40 rounded mx-auto max-w-xs" />
      </div>
    </section>
  );
}

export function SpotsCounter() {
  const [spots, setSpots] = useState<FoundingSpots | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/config.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load spots config');
        return res.json();
      })
      .then((data: { foundingSpots?: { total?: number; remaining?: number } }) => {
        const fs = data.foundingSpots;
        setSpots({
          total: fs?.total ?? FALLBACK_TOTAL,
          remaining: fs?.remaining ?? FALLBACK_REMAINING,
        });
      })
      .catch(() => {
        setSpots({ total: FALLBACK_TOTAL, remaining: FALLBACK_REMAINING });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SpotsCounterSkeleton />;
  }

  const total = spots?.total ?? FALLBACK_TOTAL;
  const remaining = spots?.remaining ?? FALLBACK_REMAINING;
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
