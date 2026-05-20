import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: "Services | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    'Mobile slatmill conditioning sessions for high-drive dogs. Intro sessions $35, performance sessions from $65. Private, climate-controlled sessions delivered to your driveway in Destin, Fort Walton Beach & Niceville FL.',
  alternates: { canonical: 'https://kaisrun.xyz/services/' },
  openGraph: {
    title: "Services | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      'Mobile slatmill conditioning sessions for high-drive dogs. Intro sessions $35, performance sessions from $65. Private, climate-controlled sessions delivered to your driveway in Destin, Fort Walton Beach & Niceville FL.',
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
    title: "Kai's Run Services | Mobile Dog Gym Destin FL",
    description:
      'Mobile slatmill conditioning sessions for high-drive dogs. Intro sessions $35, performance sessions from $65. Private, climate-controlled sessions delivered to your driveway in Destin, Fort Walton Beach & Niceville FL.',
    images: ['https://kaisrun.xyz/images/og-image.png'],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Dog Conditioning Session',
  provider: { '@type': 'LocalBusiness', name: "Kai's Run" },
  areaServed: 'Okaloosa County, FL',
  offers: [
    { '@type': 'Offer', name: 'Intro Session (1 dog)', price: '35', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Intro Session (2 dogs)', price: '55', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Performance Session (1 dog)', price: '65', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Performance Session (2 dogs)', price: '85', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '4-Session Bundle (1 dog)', price: '220', priceCurrency: 'USD' },
    { '@type': 'Offer', name: '8-Session Bundle (1 dog)', price: '400', priceCurrency: 'USD' },
    {
      '@type': 'Offer',
      name: 'Monthly Membership Coastal (bi-weekly, 1 dog)',
      price: '120',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Monthly Membership Emerald (weekly, 1 dog)',
      price: '220',
      priceCurrency: 'USD',
    },
  ],
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
