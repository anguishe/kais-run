import type { Metadata } from 'next';
import { ServiceAreaPageClient } from './ServiceAreaPageClient';

export const metadata: Metadata = {
  title: "Service Area | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Kai's Run serves Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar & surrounding Okaloosa County with mobile dog conditioning.",
  openGraph: {
    title: "Service Area | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Kai's Run serves Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar & surrounding Okaloosa County with mobile dog conditioning.",
    type: 'website',
    locale: 'en_US',
  },
};

export default function ServiceAreaPage() {
  return <ServiceAreaPageClient />;
}
