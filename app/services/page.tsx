import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { ServicesPageClient } from './ServicesPageClient';

const SERVICES_DESCRIPTION =
  'Mobile slatmill conditioning delivered to your driveway in Destin and Fort Walton Beach FL. Intro from $35. Founding Athlete: $200 for 5 sessions — 20 spots.';

export const metadata: Metadata = {
  title: "Services | Kai's Run — Mobile Dog Gym Destin FL",
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: 'https://kaisrun.xyz/services/' },
  openGraph: {
    title: "Services | Kai's Run — Mobile Dog Gym Destin FL",
    description: SERVICES_DESCRIPTION,
    type: 'website',
    url: 'https://kaisrun.xyz/services/',
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
    description: SERVICES_DESCRIPTION,
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
    { '@type': 'Offer', name: 'Intro Session (2 dogs, same household)', price: '55', priceCurrency: 'USD' },
    { '@type': 'Offer', name: 'Founding Athlete Program (5 sessions)', price: '200', priceCurrency: 'USD' },
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
