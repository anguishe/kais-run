import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: "About | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Travis and Kai's story — born and raised in Destin. The slatmill changed everything. Now we bring structured canine conditioning to the Emerald Coast.",
  openGraph: {
    title: "About | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Travis and Kai's story — born and raised in Destin. The slatmill changed everything. Now we bring structured canine conditioning to the Emerald Coast.",
    type: 'website',
    locale: 'en_US',
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
