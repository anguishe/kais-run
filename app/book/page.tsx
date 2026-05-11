import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import BookingContent from '@/app/book/BookingContent';

export const metadata: Metadata = {
  title: 'Book | Kai\'s Run — Mobile Dog Gym Destin FL',
  description: 'Book your mobile dog gym session online. Structured slatmill conditioning delivered to your driveway. Serving Destin, Fort Walton Beach & Niceville FL.',
  openGraph: {
    title: 'Book | Kai\'s Run — Mobile Dog Gym Destin FL',
    description: 'Book your mobile dog gym session online. Structured slatmill conditioning delivered to your driveway. Serving Destin, Fort Walton Beach & Niceville FL.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1600,
        height: 900,
        alt: "Athletic dog in motion — Kai's Run mobile dog gym",
      },
    ],
  },
};

export default function BookPage() {
  return <BookingContent />;
}
