import { cn } from "@/lib/utils";
import AdBlock, { type AdFormat } from "./AdBlock";

export type { AdFormat };

export type AdSectionProps = {
  slot: string;
  format: AdFormat;
  /** Logical placement id for analytics / GTM (e.g. `article-mid`). */
  placement: string;
  className?: string;
};

/**
 * Section wrapper around {@link AdBlock} with stable spacing and a `data-ad-placement`
 * hook for Tag Manager or in-page analytics.
 */
export default function AdSection({ slot, format, placement, className }: AdSectionProps) {
  return (
    <section
      className={cn("w-full", className)}
      data-ad-placement={placement}
      aria-label={`Sponsored content — ${placement}`}
    >
      <AdBlock slot={slot} format={format} />
    </section>
  );
}
