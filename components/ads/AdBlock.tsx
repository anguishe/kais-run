"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type AdFormat = "horizontal" | "vertical" | "rectangle" | "billboard";

export type AdBlockProps = {
  /** Google AdSense ad unit slot id. */
  slot: string;
  /** Layout preset; drives responsive width/height of the ad frame. */
  format: AdFormat;
  className?: string;
  /** When false, hides the built-in label (e.g. editorial wrapper supplies its own). @default true */
  showSponsoredLabel?: boolean;
};

const AD_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID?.trim() || "ca-pub-6289405922667797";

/** Outer frame: responsive min box per spec (mobile / md+). */
const FORMAT_FRAME: Record<AdFormat, string> = {
  horizontal:
    "w-[min(100%,320px)] max-w-full h-[50px] md:w-[728px] md:h-[90px]",
  vertical: "w-[min(100%,300px)] max-w-full h-[250px] md:w-[300px] md:h-[600px]",
  rectangle: "w-[min(100%,300px)] max-w-full h-[250px]",
  billboard:
    "w-[min(100%,320px)] max-w-full h-[100px] md:w-[min(100%,970px)] md:h-[90px]",
};

export default function AdBlock({ slot, format, className, showSponsoredLabel = true }: AdBlockProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);
  const [inView, setInView] = useState(false);

  const tryPushAd = useCallback(() => {
    if (pushedRef.current || !AD_CLIENT || !slot.trim()) return;
    const ins = insRef.current;
    if (!ins || typeof window === "undefined") return;

    const w = window as Window & { adsbygoogle?: unknown[] };
    if (!w.adsbygoogle) return;

    try {
      w.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      /* AdSense may throw if slot invalid — keep shell */
    }
  }, [slot]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { root: null, rootMargin: "120px 0px", threshold: 0.01 }
    );

    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 80;

    const tick = () => {
      if (cancelled) return;
      if (pushedRef.current) return;
      const w = typeof window !== "undefined" ? (window as Window & { adsbygoogle?: unknown[] }) : null;
      if (w?.adsbygoogle && insRef.current) {
        tryPushAd();
        return;
      }
      if (attempts++ < maxAttempts) {
        window.setTimeout(tick, 50);
      }
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [inView, tryPushAd]);

  return (
    <div
      ref={rootRef}
      className={cn("max-w-5xl mx-auto my-8 md:my-12 px-4 sm:px-0", className)}
    >
      <div
        className={cn(
          "rounded-lg border border-brand-teal/20 bg-brand-charcoal",
          "p-4 md:p-6",
          "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:border-brand-teal/40",
          "hover:shadow-[0_0_28px_rgba(10,92,82,0.22)]"
        )}
      >
        {showSponsoredLabel ? (
        <p
          className={cn(
            "mb-3 font-body md:mb-4",
            "text-xs uppercase tracking-wider text-brand-gray opacity-60"
          )}
        >
          Sponsored
        </p>
        ) : null}

        <div className="flex justify-center overflow-x-auto">
          <div
            className={cn(
              "relative shrink-0 overflow-hidden rounded-md bg-brand-black/40 ring-1 ring-brand-teal/10",
              FORMAT_FRAME[format]
            )}
          >
            {AD_CLIENT ? (
              <ins
                ref={insRef}
                className="adsbygoogle block h-full w-full"
                style={{ display: "block" }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={slot.trim()}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-2">
                <span className="font-body text-center text-brand-gray text-xs">
                  Ad placeholder — set NEXT_PUBLIC_ADSENSE_PUB_ID
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
