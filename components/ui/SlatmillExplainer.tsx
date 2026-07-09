import type { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const SLATMILL_ILLUSTRATION_SRC = '/images/slatmill/slatmill-two-dogs-dark.webp';
export const SLATMILL_ILLUSTRATION_ALT =
  'A self-powered slatmill - the dog sets its own pace, no motor';
export const SLATMILL_ILLUSTRATION_CAPTION = 'Illustration of slatmill conditioning equipment.';

export type SlatmillExplainerProps = {
  /** Wrap in a full-width section with vertical padding */
  asSection?: boolean;
  /** Show "What Is a Slatmill?" heading block */
  showHeading?: boolean;
  /** Body copy — defaults to the full canonical explanation (kept on /faq/) */
  body?: ReactNode;
  className?: string;
};

const DEFAULT_BODY = (
  <>
    <p>
      A slatmill is a self-powered treadmill with no motor. The dog controls the pace entirely - 
      every step drives the belt, and nothing forces a minimum speed.
    </p>
    <p>
      That self-paced work builds sustained aerobic output the way natural running does: focused
      effort the dog chooses on their own terms, not stop-and-start loops on a sidewalk.
    </p>
  </>
);

export default function SlatmillExplainer({
  asSection = false,
  showHeading = true,
  body = DEFAULT_BODY,
  className,
}: SlatmillExplainerProps) {
  const content = (
    <div className={cn('mx-auto max-w-3xl', className)}>
      {showHeading ? (
        <>
          <p className="mb-4 text-center font-body text-sm uppercase tracking-[0.25em] text-brand-teal-light">
            The Equipment
          </p>
          <h2 className="mb-4 text-center font-display text-4xl tracking-tight text-brand-offwhite md:text-5xl">
            What Is a Slatmill?
          </h2>
          <p className="mb-10 text-center font-body text-sm text-brand-gray">
            Paired with{' '}
            <Link
              href="/equipment/julius-k9-idc-powerharness/"
              className="text-brand-teal-light underline-offset-2 hover:underline"
            >
              the Julius-K9 IDC Powerharness we run on every dog
            </Link>
            .
          </p>
        </>
      ) : null}

      <figure className="mb-8">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-brand-teal/15 bg-brand-black">
          <img
            src={SLATMILL_ILLUSTRATION_SRC}
            alt={SLATMILL_ILLUSTRATION_ALT}
            width={1200}
            height={675}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-brand-black/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-black/40 via-transparent to-brand-black/40" />
        </div>
        <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
          {SLATMILL_ILLUSTRATION_CAPTION}
        </figcaption>
      </figure>

      <div className="space-y-4 text-center font-body text-base leading-relaxed text-brand-gray md:text-lg">
        {body}
      </div>

      <p className="mt-6 text-center font-body text-xs uppercase tracking-[0.2em] text-brand-teal-light/80">
        One dog at a time - every Kai&apos;s Run session is private.
      </p>
    </div>
  );

  if (asSection) {
    return (
      <section className="bg-brand-black px-6 py-24 md:py-32">
        {content}
      </section>
    );
  }

  return content;
}
