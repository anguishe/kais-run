'use client';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Top-of-viewport reading progress bar.
 * Driven by the document scroll (useScroll) and smoothed with a single
 * spring (useSpring) that animates scaleX — one rAF loop, GPU-composited,
 * no per-scroll setState. Same export name + zero props, so the existing
 * mount in app/blog/[slug]/page.tsx keeps working untouched.
 */
export function ReadingProgressBar() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // prefers-reduced-motion: render nothing — no spring, no animation loop.
  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-brand-teal"
      style={{ scaleX }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
