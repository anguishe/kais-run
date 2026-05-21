import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: "About | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Travis built Kai's Run in Destin FL after his Rhodesian Ridgeback mix Kai needed more than walks. Mobile canine conditioning for the Emerald Coast.",
  alternates: { canonical: 'https://kaisrun.xyz/about/' },
  openGraph: {
    title: "About | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Travis built Kai's Run in Destin FL after his Rhodesian Ridgeback mix Kai needed more than walks. Mobile canine conditioning for the Emerald Coast.",
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

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Travis',
  description: 'Founder of Kai\'s Run Mobile Dog Gym',
  jobTitle: 'Owner',
  worksFor: {
    '@type': 'LocalBusiness',
    name: 'Kai\'s Run',
    description: 'Mobile canine conditioning service offering structured slatmill sessions for high-drive dogs.',
    telephone: '850-218-5855',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Destin',
      addressRegion: 'FL',
    },
  },
  alumniOf: 'Destin, Florida',
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
