import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { FAQ_ENTRIES, faqAnswerPlainForSchema } from '@/lib/faq-data';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { FAQPageClient } from './FAQPageClient';

export const metadata: Metadata = {
  title: "Slatmill Dog FAQ — Kai's Run Mobile Dog Gym Destin FL",
  description:
    "Straight answers on slatmill safety, reactive dogs, session length, waivers, cancellations, and discounts — for Kai's Run driveway sessions in Destin FL.",
  alternates: { canonical: 'https://kaisrun.xyz/faq/' },
  openGraph: {
    title: "Slatmill Dog FAQ — Kai's Run Mobile Dog Gym Destin FL",
    description:
      "Straight answers on slatmill safety, reactive dogs, session length, waivers, cancellations, and discounts — for Kai's Run driveway sessions in Destin FL.",
    type: 'website',
    url: 'https://kaisrun.xyz/faq/',
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
  twitter: {
    card: 'summary_large_image',
    title: "Slatmill Dog FAQ — Kai's Run Mobile Dog Gym Destin FL",
    description:
      "Straight answers on slatmill safety, reactive dogs, session length, waivers, cancellations, and discounts — for Kai's Run driveway sessions in Destin FL.",
    images: ['https://kaisrun.xyz/images/og-image.png'],
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq/' },
]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ENTRIES.map((e) => ({
    '@type': 'Question',
    name: e.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faqAnswerPlainForSchema(e.a),
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FAQPageClient />
    </>
  );
}
