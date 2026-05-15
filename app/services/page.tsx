import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: "Services | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Performance conditioning for high-drive dogs. Mobile slatmill sessions delivered to your door in Destin, Fort Walton Beach & Niceville FL. Intro sessions from $35.",
  openGraph: {
    title: "Services | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Performance conditioning for high-drive dogs. Mobile slatmill sessions delivered to your door in Destin, Fort Walton Beach & Niceville FL. Intro sessions from $35.",
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
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Dog Exercise and Conditioning',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Kai\'s Run',
    telephone: '850-218-5855',
    areaServed: [
      {
        '@type': 'City',
        name: 'Destin',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Destin',
          addressRegion: 'FL',
        },
      },
      {
        '@type': 'City',
        name: 'Fort Walton Beach',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Fort Walton Beach',
          addressRegion: 'FL',
        },
      },
      {
        '@type': 'City',
        name: 'Niceville',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Niceville',
          addressRegion: 'FL',
        },
      },
    ],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mobile Dog Gym Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Intro Session',
          description: 'First-time fitness assessment with personalized Run Profile card and progress photo.',
        },
        price: '35',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Performance Session',
          description: 'On-demand mobile slatmill conditioning session with no commitment required.',
        },
        price: '65',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Session Bundles',
          description: 'Pre-purchased session packages that never expire. Available in 4-pack and 8-pack options.',
        },
        price: '220',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Monthly Memberships',
          description: 'Recurring membership plans with priority booking. Coastal Member (bi-weekly) and Emerald Member (weekly) options.',
        },
        price: '120',
        priceCurrency: 'USD',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Google Ads placements: services-top, services-mid, services-sidebar — see ServicesPageClient */}
      <ServicesPageClient />
    </>
  );
}
