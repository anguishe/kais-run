import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { ServiceAreaPageClient } from './ServiceAreaPageClient';

export const metadata: Metadata = {
  title: "Service Area | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Kai's Run serves Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar & surrounding Okaloosa County with mobile dog conditioning.",
  alternates: { canonical: 'https://kaisrun.xyz/service-area/' },
  openGraph: {
    title: "Service Area | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Kai's Run serves Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar & surrounding Okaloosa County with mobile dog conditioning.",
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

export default function ServiceAreaPage() {
  return <ServiceAreaPageClient />;
}
