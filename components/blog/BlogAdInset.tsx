import { cn } from '@/lib/utils';
import AdBlock, { type AdFormat } from '@/components/ads/AdBlock';

export type BlogAdInsetProps = {
  slot: string;
  format: AdFormat;
  placement: string;
  className?: string;
};

/**
 * Editorial ad frame: extra vertical rhythm, divider, and a more visible “Sponsored” line
 * than the default {@link AdBlock} label (inner label hidden to avoid duplication).
 */
export default function BlogAdInset({ slot, format, placement, className }: BlogAdInsetProps) {
  return (
    <aside
      data-ad-placement={placement}
      aria-label={`Sponsored — ${placement}`}
      className={cn(
        'my-12 scroll-mt-28 border-y border-brand-teal/25 py-8 md:my-16 md:py-10',
        className
      )}
    >
      <p className="mb-5 text-center font-body text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
        Sponsored
      </p>
      <AdBlock slot={slot} format={format} className="mx-auto my-0 max-w-5xl px-0" showSponsoredLabel={false} />
    </aside>
  );
}
