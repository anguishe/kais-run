import type { Metadata } from 'next';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { EQUIPMENT_FIRST_AID_KIT_OG_URL } from '@/lib/site-images';
import { DEFAULT_SITE_KEYWORDS } from '@/lib/seo/defaults';
import { FirstAidKitPageClient } from './FirstAidKitPageClient';
import { faqItems } from './faq-items';

const PAGE_URL = 'https://kaisrun.xyz/equipment/first-aid-kit/';
const OG_IMAGE = `https://kaisrun.xyz${EQUIPMENT_FIRST_AID_KIT_OG_URL}`;

const DESCRIPTION =
  'A stocked canine first-aid kit travels to every Kai\'s Run session - wound care, thermometer, muzzle, tick tools, trauma shears and more. Conditioning done responsibly.';

export const metadata: Metadata = {
  title: "The First-Aid Kit That Rides to Every Session | Kai's Run",
  description: DESCRIPTION,
  keywords: [
    ...DEFAULT_SITE_KEYWORDS,
    'dog first aid kit',
    'canine first aid',
    'mobile dog conditioning safety',
    'dog exercise safety Destin',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "The First-Aid Kit That Rides to Every Session | Kai's Run",
    description: DESCRIPTION,
    type: 'article',
    url: PAGE_URL,
    locale: 'en_US',
    images: [
      {
        url: EQUIPMENT_FIRST_AID_KIT_OG_URL,
        width: 1200,
        height: 630,
        alt: "Kai's Run canine first-aid kit",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The First-Aid Kit That Rides to Every Session | Kai's Run",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment/' },
  { name: 'First-Aid Kit', path: '/equipment/first-aid-kit/' },
]);

// Article about the first-aid kit (no Offer/aggregateRating - Kai's Run does not
// sell it and cannot claim third-party ratings as its own). author/publisher
// reference the canonical entity nodes defined on /about/ and in the root layout.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': PAGE_URL,
  headline: 'The First-Aid Kit That Rides to Every Session',
  description: DESCRIPTION,
  image: OG_IMAGE,
  datePublished: '2026-07-09',
  dateModified: '2026-07-09',
  mainEntityOfPage: PAGE_URL,
  author: { '@id': 'https://kaisrun.xyz/about/#travis' },
  publisher: { '@id': 'https://kaisrun.xyz/#business' },
  about: {
    '@type': 'Product',
    name: 'GPUSFAK Canine First-Aid Kit',
    brand: { '@type': 'Brand', name: 'GPUSFAK' },
    category: 'Pet first aid kit',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#faq`,
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function EquipmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FirstAidKitPageClient />
    </>
  );
}
