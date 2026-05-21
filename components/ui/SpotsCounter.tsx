'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/variants';

const FALLBACK_TOTAL = 20;
const FALLBACK_REMAINING = 20;

type FoundingSpots = {
  total: number;
  remaining: number;
};

function SpotsCounterSkeleton() {
  return (
    <div className="text-center animate-pulse">
      <div className="h-8 bg-brand-black/60 rounded mx-auto max-w-xs mb-4" />
      <div className="w-full h-2 bg-brand-black rounded-full" />
    </div>
  );
}

export default function SpotsCounter() {
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
    <div className="text-center">
      <motion.p
        variants={fadeUp}
        className="font-display text-xl md:text-2xl tracking-wider text-brand-offwhite mb-4"
      >
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
    </div>
  );
}
