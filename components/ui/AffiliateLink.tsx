'use client';

import { trackAffiliateClick } from '@/lib/analytics/trackToolUse';

// ponytail: tag inlined at build time - set NEXT_PUBLIC_AMAZON_TAG in Vercel and redeploy.
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG;

function withTag(href: string): string {
  if (!AMAZON_TAG) return href;
  const url = new URL(href);
  url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}

type AffiliateLinkProps = {
  href: string;
  product: string;
  children: React.ReactNode;
  className?: string;
};

/** Outbound Amazon link. Appends the Associates tag when configured, plain link otherwise. */
export function AffiliateLink({ href, product, children, className }: AffiliateLinkProps) {
  return (
    <a
      href={withTag(href)}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={() => trackAffiliateClick(product)}
      className={className}
    >
      {children}
    </a>
  );
}

type AffiliateBoxProps = {
  href: string;
  product: string;
  cta: string;
};

/** CTA box with the FTC/Amazon disclosure line rendered inline above the link. */
export function AffiliateBox({ href, product, cta }: AffiliateBoxProps) {
  return (
    <div className="rounded-xl border border-brand-teal/20 bg-brand-black p-6 text-center">
      <AffiliateLink
        href={href}
        product={product}
        className="inline-block bg-brand-teal text-white px-8 py-3 font-body font-medium tracking-wide hover:shadow-[0_0_20px_rgba(10,92,82,0.5)] transition-all duration-300 rounded-sm"
      >
        {cta}
      </AffiliateLink>
      <p className="mt-4 font-body text-xs text-brand-gray/80 leading-relaxed">
        {AMAZON_TAG
          ? 'Affiliate disclosure: as an Amazon Associate, Kai’s Run earns from qualifying purchases made through this link, at no extra cost to you. We only link gear we run on our own truck.'
          : 'This is a plain link to Amazon - Kai’s Run currently earns nothing from it. We only link gear we run on our own truck.'}
      </p>
    </div>
  );
}
