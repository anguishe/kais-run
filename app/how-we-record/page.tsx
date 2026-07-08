import type { Metadata } from 'next';
import { HOW_WE_RECORD_OG_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { DEFAULT_SITE_KEYWORDS } from '@/lib/seo/defaults';
import { HowWeRecordPageClient } from './HowWeRecordPageClient';

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'How We Record', path: '/how-we-record/' },
]);

const HOW_WE_RECORD_DESCRIPTION =
  "Every Kai's Run session is filmed start to finish on two cameras - for your dog's safety, and so you can see the work. Here's the rig and how it works.";

const HOW_WE_RECORD_TITLE = "How We Record Every Session | Kai's Run";

export const metadata: Metadata = {
  title: HOW_WE_RECORD_TITLE,
  description: HOW_WE_RECORD_DESCRIPTION,
  keywords: [
    ...DEFAULT_SITE_KEYWORDS,
    'dog trainer records sessions',
    'dog conditioning session recording',
    'mobile dog trainer transparency',
  ],
  alternates: { canonical: 'https://kaisrun.xyz/how-we-record/' },
  openGraph: {
    title: HOW_WE_RECORD_TITLE,
    description: HOW_WE_RECORD_DESCRIPTION,
    type: 'website',
    url: 'https://kaisrun.xyz/how-we-record/',
    locale: 'en_US',
    images: [
      {
        url: HOW_WE_RECORD_OG_URL,
        width: 1200,
        height: 630,
        alt: "How Kai's Run records every session",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOW_WE_RECORD_TITLE,
    description: HOW_WE_RECORD_DESCRIPTION,
    images: [HOW_WE_RECORD_OG_URL],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'How We Record Every Session',
  description: HOW_WE_RECORD_DESCRIPTION,
  url: 'https://kaisrun.xyz/how-we-record/',
  isPartOf: { '@id': 'https://kaisrun.xyz/#website' },
  publisher: { '@id': 'https://kaisrun.xyz/#business' },
  primaryImageOfPage: HOW_WE_RECORD_OG_URL,
};

export default function HowWeRecordPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HowWeRecordPageClient />
    </>
  );
}
