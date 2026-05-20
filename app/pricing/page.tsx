import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { PricingPageClient } from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing | Mobile Dog Gym Destin FL',
  description:
    'Intro sessions from $35. Performance sessions $65. Bundle packs and monthly memberships available. Founding Athlete Program: $200 for 5 sessions — limited to 20 spots. Mobile dog gym serving Destin, Fort Walton Beach & Niceville FL.',
  alternates: { canonical: 'https://kaisrun.xyz/pricing/' },
  openGraph: {
    title: 'Pricing | Mobile Dog Gym Destin FL',
    description:
      'Intro sessions from $35. Performance sessions $65. Bundle packs and monthly memberships available. Founding Athlete Program: $200 for 5 sessions — limited to 20 spots. Mobile dog gym serving Destin, Fort Walton Beach & Niceville FL.',
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
    title: 'Pricing | Mobile Dog Gym Destin FL',
    description:
      'Intro sessions from $35. Performance sessions $65. Bundle packs and monthly memberships available. Founding Athlete Program: $200 for 5 sessions — limited to 20 spots. Mobile dog gym serving Destin, Fort Walton Beach & Niceville FL.',
    images: ['https://kaisrun.xyz/images/og-image.png'],
  },
};

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Mobile Dog Gym Conditioning',
  provider: { '@type': 'LocalBusiness', name: "Kai's Run" },
  areaServed: 'Okaloosa County, FL',
  offers: [
    { '@type': 'Offer', name: 'Founding Athlete Program (5 sessions)', price: '200', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Intro Session (1 dog)', price: '35', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Intro Session (2 dogs)', price: '55', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Performance Session (1 dog)', price: '65', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Performance Session (2 dogs)', price: '85', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '4-Session Bundle (1 dog)', price: '220', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '4-Session Bundle (2 dogs)', price: '300', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '8-Session Bundle (1 dog)', price: '400', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '8-Session Bundle (2 dogs)', price: '560', priceCurrency: 'USD' },
    {
      '@type': 'Offer',
      name: 'Coastal Member — bi-weekly (1 dog)',
      price: '120',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Coastal Member — bi-weekly (2 dogs)',
      price: '170',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Emerald Member — weekly (1 dog)',
      price: '220',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Emerald Member — weekly (2 dogs)',
      price: '300',
      priceCurrency: 'USD',
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      {/* Google Ads placements: pricing-top, pricing-mid, pricing-bottom — see PricingPageClient */}
      <PricingPageClient />
    </>
  );
}
