// Ronzeil affiliate pitch - self-contained, no required props. FTC-compliant:
// the disclosure sits directly beneath the link/code (adjacency requirement).
import {
  RONZEIL_AFFILIATE_URL,
  RONZEIL_PROMO_CODE,
  RONZEIL_PROMO_DISCOUNT,
} from '@/lib/affiliates';

export function RonzeilAffiliateCta() {
  return (
    <div className="rounded-xl border border-brand-gold/30 bg-brand-charcoal p-6 md:p-10">
      <h2 className="font-display text-3xl md:text-4xl tracking-tight text-brand-gold">
        GET YOUR OWN RONZEIL
      </h2>
      <p className="mt-4 font-body text-brand-gray text-base md:text-lg leading-relaxed">
        This is the Ronzeil Large Slatmill, the mill we run at every Kai&apos;s Run session. If you
        want one in your own garage, use the link and code below.
      </p>
      <div className="mt-6">
        <a
          href={RONZEIL_AFFILIATE_URL}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-block bg-brand-gold text-brand-black px-8 py-3 font-medium tracking-wide rounded-sm hover:shadow-[0_0_20px_rgba(201,150,58,0.4)] transition-all duration-300"
        >
          Shop Ronzeil →
        </a>
        <p className="mt-2 font-body text-xs text-brand-gray">
          Disclosure: this is an affiliate link. We earn a commission on qualifying purchases at no
          extra cost to you. We only point people at gear we actually run.
        </p>
      </div>
      <p className="mt-6 font-body text-brand-offwhite text-base md:text-lg">
        Promo code <span className="font-medium text-brand-gold">{RONZEIL_PROMO_CODE}</span> -{' '}
        {RONZEIL_PROMO_DISCOUNT}
      </p>
    </div>
  );
}
