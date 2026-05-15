import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { FAQ_ENTRIES, faqAnswerPlainForSchema } from '@/lib/faq-data';
import { FAQPageClient } from './FAQPageClient';

export const metadata: Metadata = {
  title: "FAQ | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    "Straight answers on slatmill safety, reactive dogs, session length, waivers, cancellations, memberships, and military or teacher discounts—specifically for Kai's Run's driveway-based model.",
  openGraph: {
    title: "FAQ | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      "Straight answers on slatmill safety, reactive dogs, session length, waivers, cancellations, memberships, and military or teacher discounts—specifically for Kai's Run's driveway-based model.",
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
      <FAQPageClient />
    </>
  );
}
