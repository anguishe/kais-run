import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { PricingPageClient } from './PricingPageClient';

export const metadata: Metadata = {
  title: "Pricing | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Compare intro welcomes, walk-up performance sessions, never-expire bundles, Coastal and Emerald memberships, and seasonal snowbird packages—all with clear per-session math before you book.",
  alternates: { canonical: 'https://kaisrun.xyz/pricing/' },
  openGraph: {
    title: "Pricing | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Compare intro welcomes, walk-up performance sessions, never-expire bundles, Coastal and Emerald memberships, and seasonal snowbird packages—all with clear per-session math before you book.",
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Kai's Run — Mobile Dog Gym serving Destin, Fort Walton Beach & Niceville FL",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kai's Run Pricing | Mobile Dog Gym Sessions Destin FL",
    description:
      'Intro sessions from $35. Bundles, memberships, and Founding Athlete Program. Mobile dog gym serving Destin, Fort Walton Beach & Niceville FL.',
    images: ['https://kaisrun.xyz/images/og-image.png'],
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
