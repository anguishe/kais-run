"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { MotionConfig } from "framer-motion";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Reduced-motion users get native scroll, no smooth-scroll hijack.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" makes framer-motion skip transform/layout animations
  // (the y in fadeUp, scale in scaleIn) while still animating opacity — i.e.
  // opacity-only reveals for every variant, no per-consumer changes.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
