import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { FAQ_SCHEMA_ENTRIES, faqAnswerPlainForSchema } from '@/lib/faq-data';
import { FAQPageClient } from './FAQPageClient';

export const metadata: Metadata = {
  title: "Slatmill Dog FAQ — Kai's Run Mobile Dog Gym Destin FL",
  description:
    "Is a slatmill safe? What breeds benefit? Do you work with reactive dogs? What if my dog won't run? Every answer about Kai's Run mobile dog gym sessions in Destin, Fort Walton Beach & Niceville FL.",
  alternates: { canonical: 'https://kaisrun.xyz/faq/' },
  openGraph: {
    title: "Slatmill Dog FAQ — Kai's Run Mobile Dog Gym Destin FL",
    description:
      "Is a slatmill safe? What breeds benefit? Do you work with reactive dogs? What if my dog won't run? Every answer about Kai's Run mobile dog gym sessions in Destin, Fort Walton Beach & Niceville FL.",
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
  twitter: {
    card: 'summary_large_image',
    title: "Slatmill Dog FAQ — Kai's Run Mobile Dog Gym Destin FL",
    description:
      "Is a slatmill safe? What breeds benefit? Do you work with reactive dogs? What if my dog won't run? Every answer about Kai's Run mobile dog gym sessions in Destin, Fort Walton Beach & Niceville FL.",
    images: ['https://kaisrun.xyz/images/og-image.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SCHEMA_ENTRIES.map((e) => ({
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
      <FAQPageClient />
    </>
  );
}
