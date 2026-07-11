import type { Metadata } from 'next';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { RonzeilSlatmillPageClient } from './RonzeilSlatmillPageClient';
import { faqItems } from './faq-items';

const PAGE_URL = 'https://kaisrun.xyz/equipment/ronzeil-slatmill/';
const OG_IMAGE =
  'https://kaisrun.xyz/images/equipment/ronzeil-slatmill/kai-with-ronzeil-slatmill-hero.webp';

const TITLE = "Ronzeil Large Slatmill - The Mill We Run | Kai's Run";
const DESCRIPTION =
  'The Ronzeil Large Slatmill is the self-powered mill behind every Kai\'s Run conditioning session on the Emerald Coast. Why we chose it, what it does, and how to get one.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    url: PAGE_URL,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1013,
        height: 1800,
        alt: 'Kai the Rhodesian Ridgeback mix inspecting the Ronzeil Large Slatmill during final assembly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Equipment', path: '/equipment/' },
  { name: 'Ronzeil Large Slatmill', path: '/equipment/ronzeil-slatmill/' },
]);

// No Offer or rating schema here on purpose - we do not publish ratings we have not earned.
// author/publisher reference the canonical entity nodes defined on /about/ and in the root layout.
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': PAGE_URL,
  headline: TITLE,
  description: DESCRIPTION,
  image: OG_IMAGE,
  datePublished: '2026-07-10',
  dateModified: '2026-07-10',
  mainEntityOfPage: PAGE_URL,
  author: { '@id': 'https://kaisrun.xyz/about/#travis' },
  publisher: { '@id': 'https://kaisrun.xyz/#business' },
  about: {
    '@type': 'Product',
    name: 'Ronzeil Large Slatmill',
    brand: { '@type': 'Brand', name: 'Ronzeil' },
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
      <RonzeilSlatmillPageClient />
    </>
  );
}
