import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { PricingPageClient } from './PricingPageClient';

export const metadata: Metadata = {
  title: "Pricing | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    'Transparent pricing for mobile dog conditioning in Destin FL. Intro sessions, bundles, and memberships. Military, first responder, and teacher discounts available.',
  openGraph: {
    title: "Pricing | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      'Transparent pricing for mobile dog conditioning in Destin FL. Intro sessions, bundles, and memberships. Military, first responder, and teacher discounts available.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1600,
        height: 900,
        alt: "Athletic dog in motion — Kai's Run mobile dog gym",
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Google Ads placements: pricing-top, pricing-mid, pricing-bottom — see PricingPageClient */}
      <PricingPageClient />
    </>
  );
}
