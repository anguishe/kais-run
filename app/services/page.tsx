import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { serviceOffers } from '@/lib/schema/offers';
import { ServicesPageClient } from './ServicesPageClient';

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
]);

const SERVICES_DESCRIPTION =
  'Private mobile slatmill conditioning at your driveway across Destin & the Emerald Coast. Intro sessions, private conditioning, and multi-session packages.';

export const metadata: Metadata = {
  title: "Services | Kai's Run - Mobile Dog Gym Destin FL",
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: 'https://kaisrun.xyz/services/' },
  openGraph: {
    title: "Services | Kai's Run - Mobile Dog Gym Destin FL",
    description: SERVICES_DESCRIPTION,
    type: 'website',
    url: 'https://kaisrun.xyz/services/',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Kai's Run - Mobile Dog Gym serving Destin, Fort Walton Beach & Niceville FL",
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
  offers: serviceOffers,
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Google Ads placements: services-top, services-mid, services-sidebar — see ServicesPageClient */}
      <ServicesPageClient />
    </>
  );
}
