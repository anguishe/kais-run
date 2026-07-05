import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { PricingPageClient } from './PricingPageClient';

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing/' },
]);

const PRICING_DESCRIPTION =
  "Kai's Run pricing: intro sessions from $35, private conditioning from $70, and 3- and 5-session packages. Founding Athlete: $200 for 5 sessions, limited to 20 dogs.";

export const metadata: Metadata = {
  title: "Pricing | Kai's Run Mobile Dog Gym Destin FL",
  description: PRICING_DESCRIPTION,
  alternates: { canonical: 'https://kaisrun.xyz/pricing/' },
  openGraph: {
    title: "Pricing | Kai's Run Mobile Dog Gym Destin FL",
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
    title: "Pricing | Kai's Run Mobile Dog Gym Destin FL",
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
      name: 'What does a Private Conditioning Session cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Private Conditioning Session is $70 for one dog. Two dogs from the same household run $135 — two individual back-to-back sessions in one visit, up to 45 minutes each. No commitment required. Session Packages are also available for a lower per-session rate.',
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
    { '@type': 'Offer', name: 'Private Conditioning Session (1 dog)', price: '70', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Private Conditioning Session (2 dogs, same household)', price: '135', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '3-Session Package (1 dog)', price: '195', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '5-Session Package (1 dog)', price: '300', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '3-Session Package (2 dogs, same household)', price: '380', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '5-Session Package (2 dogs, same household)', price: '580', priceCurrency: 'USD' },
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
