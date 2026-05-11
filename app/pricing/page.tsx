import type { Metadata } from 'next';
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
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
