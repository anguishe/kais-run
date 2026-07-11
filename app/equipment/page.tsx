import type { Metadata } from 'next';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { EquipmentHubPageClient } from './EquipmentHubPageClient';

const PAGE_URL = 'https://kaisrun.xyz/equipment/';

const DESCRIPTION =
  "The gear behind every Kai's Run session - the Julius-K9 IDC Powerharness, a canine first-aid kit, and a two-camera recording rig. Chosen for safety, built for real work.";

export const metadata: Metadata = {
  title: "Equipment We Run | Kai's Run",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Equipment We Run | Kai's Run",
    description: DESCRIPTION,
    type: 'website',
    url: PAGE_URL,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "The equipment Kai's Run runs on every session",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Equipment We Run | Kai's Run",
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment/' },
]);

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#page`,
  name: 'Equipment We Run',
  description: DESCRIPTION,
  url: PAGE_URL,
  isPartOf: { '@id': 'https://kaisrun.xyz/#website' },
  publisher: { '@id': 'https://kaisrun.xyz/#business' },
  hasPart: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://kaisrun.xyz/equipment/julius-k9-idc-powerharness/',
        name: 'The Julius-K9 IDC Powerharness',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://kaisrun.xyz/equipment/first-aid-kit/',
        name: 'The Canine First-Aid Kit',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://kaisrun.xyz/how-we-record/',
        name: 'The Two-Camera Recording Rig',
      },
      {
        '@type': 'ListItem',
        position: 4,
        url: 'https://kaisrun.xyz/equipment/ronzeil-slatmill/',
        name: 'Ronzeil Large Slatmill',
      },
    ],
  },
};

export default function EquipmentHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <EquipmentHubPageClient />
    </>
  );
}
