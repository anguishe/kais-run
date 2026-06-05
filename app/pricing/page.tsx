import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { PricingPageClient } from './PricingPageClient';

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing/' },
]);

const PRICING_DESCRIPTION =
  'Mobile dog gym sessions in Destin, Fort Walton Beach & Niceville FL. Intro from $35. Founding Athlete: $200 for 5 sessions — 20 spots.';

export const metadata: Metadata = {
  title: 'Pricing | Mobile Dog Gym Destin FL',
  description: PRICING_DESCRIPTION,
  alternates: { canonical: 'https://kaisrun.xyz/pricing/' },
  openGraph: {
    title: 'Pricing | Mobile Dog Gym Destin FL',
    description: PRICING_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    url: 'https://kaisrun.xyz/pricing/',
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
    description: PRICING_DESCRIPTION,
    images: ['https://kaisrun.xyz/images/og-image.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept all major credit cards, Apple Pay, and Google Pay through Square. Payment is collected at time of booking or at the session for walk-ups.',
      },
    },
    {
      '@type': 'Question',
      name: 'When will standard session pricing be announced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard walk-up pricing will be announced after the Founding Athlete program closes. Intro sessions and Founding Athlete spots are available now.',
      },
    },
    {
      '@type': 'Question',
      name: "What if my dog doesn't take to the slatmill?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Every dog gets the Tired Dog Guarantee. If your dog isn't noticeably tired after a session, we'll work with them on the next session at no charge.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer discounts for multiple dogs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all our pricing includes options for two dogs from the same household at a reduced rate. Additional dogs beyond two can be discussed on a case-by-case basis.',
      },
    },
  ],
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
    { '@type': 'Offer', name: 'Intro Session (2 dogs, same household)', price: '55', priceCurrency: 'USD' },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Google Ads placements: pricing-top, pricing-mid, pricing-bottom — see PricingPageClient */}
      <PricingPageClient />
    </>
  );
}
