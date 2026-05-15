import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: "About | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Meet Travis, Kai the ridgeback mix, and the mobile gym built after one dog's energy finally met its match—then learn how Kai's Run compares to walkers and daycare for Okaloosa County athletes.",
  openGraph: {
    title: "About | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Meet Travis, Kai the ridgeback mix, and the mobile gym built after one dog's energy finally met its match—then learn how Kai's Run compares to walkers and daycare for Okaloosa County athletes.",
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
