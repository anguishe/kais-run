import type { Metadata } from 'next';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { EQUIPMENT_JULIUS_K9_OG_URL } from '@/lib/site-images';
import { JuliusK9HarnessPageClient } from './JuliusK9HarnessPageClient';
import { faqItems } from './faq-items';

const PAGE_URL = 'https://kaisrun.xyz/equipment/julius-k9-idc-powerharness/';
const OG_IMAGE = `https://kaisrun.xyz${EQUIPMENT_JULIUS_K9_OG_URL}`;

const DESCRIPTION =
  'Why Kai\'s Run runs the Julius-K9 IDC Powerharness on every slatmill dog - chest-strap force distribution, spine-protecting saddle, sizing, and sourced reviews.';

export const metadata: Metadata = {
  title: "Julius-K9 IDC Powerharness - The Harness We Run | Kai's Run",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Julius-K9 IDC Powerharness - The Harness We Run | Kai's Run",
    description: DESCRIPTION,
    type: 'article',
    url: PAGE_URL,
    locale: 'en_US',
    images: [
      {
        url: EQUIPMENT_JULIUS_K9_OG_URL,
        width: 1200,
        height: 630,
        alt: 'Julius-K9 IDC Powerharness - the harness Kai\'s Run runs on every dog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Julius-K9 IDC Powerharness - The Harness We Run | Kai's Run",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment/' },
  { name: 'Julius-K9 IDC Powerharness', path: '/equipment/julius-k9-idc-powerharness/' },
]);

// Article about the harness (no Offer/aggregateRating - Kai's Run does not sell it
// and cannot claim third-party ratings as its own). author/publisher reference the
// canonical entity nodes defined on /about/ and in the root layout.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': PAGE_URL,
  headline: 'THE JULIUS-K9 IDC POWERHARNESS',
  description: DESCRIPTION,
  image: OG_IMAGE,
  datePublished: '2026-07-06',
  dateModified: '2026-07-06',
  mainEntityOfPage: PAGE_URL,
  author: { '@id': 'https://kaisrun.xyz/about/#travis' },
  publisher: { '@id': 'https://kaisrun.xyz/#business' },
  about: {
    '@type': 'Product',
    name: 'Julius-K9 IDC Powerharness',
    brand: { '@type': 'Brand', name: 'Julius-K9' },
    category: 'Dog harness',
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
      <JuliusK9HarnessPageClient />
    </>
  );
}
