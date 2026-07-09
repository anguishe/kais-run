import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { ServiceAreaPageClient } from './ServiceAreaPageClient';

export const metadata: Metadata = {
  title: "Service Area | Kai's Run - Mobile Dog Gym Destin FL",
  description:
    "Mobile dog conditioning across the Emerald Coast - Destin, Fort Walton Beach, Niceville, Miramar Beach, and seven more cities. We come to your driveway.",
  alternates: { canonical: 'https://kaisrun.xyz/service-area/' },
  openGraph: {
    title: "Service Area | Kai's Run - Mobile Dog Gym Destin FL",
    description:
      "Mobile dog conditioning across the Emerald Coast - Destin, Fort Walton Beach, Niceville, Miramar Beach, and seven more cities. We come to your driveway.",
    type: 'website',
    locale: 'en_US',
    url: 'https://kaisrun.xyz/service-area/',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Kai's Run - Mobile Dog Gym serving Destin, Fort Walton Beach & Niceville FL",
      },
    ],
  },
};

export default function ServiceAreaPage() {
  return <ServiceAreaPageClient />;
}
