import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
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
    url: 'https://kaisrun.xyz/about/',
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

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/' },
]);

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://kaisrun.xyz/about/#travis',
  name: 'Travis',
  url: 'https://kaisrun.xyz/about/',
  description: 'Founder of Kai\'s Run Mobile Dog Gym',
  jobTitle: 'Owner',
  telephone: '+18502185855',
  homeLocation: {
    '@type': 'Place',
    name: 'Destin, Florida',
  },
  worksFor: {
    '@type': 'AnimalService',
    '@id': 'https://kaisrun.xyz/#business',
    name: 'Kai\'s Run',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutPageClient />
    </>
  );
}
