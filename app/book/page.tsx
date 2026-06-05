import type { Metadata } from 'next';
import BookPageClient from './BookPageClient';

const BOOK_DESCRIPTION =
  "Book a mobile dog conditioning session in Destin, Fort Walton Beach or Niceville FL. Intro sessions start at $35. Schedule online — we come to your driveway.";

export const metadata: Metadata = {
  title: "Book a Session | Kai's Run — Mobile Dog Gym Destin FL",
  description: BOOK_DESCRIPTION,
  alternates: { canonical: 'https://kaisrun.xyz/book/' },
  openGraph: {
    title: "Book a Session | Kai's Run — Mobile Dog Gym Destin FL",
    description: BOOK_DESCRIPTION,
    type: 'website',
    url: 'https://kaisrun.xyz/book/',
    locale: 'en_US',
    images: [
      {
        url: 'https://kaisrun.xyz/images/og-image.png',
        width: 1200,
        height: 630,
        alt: "Kai's Run — Book a Mobile Dog Conditioning Session",
      },
    ],
  },
};

export default function BookPage() {
  return <BookPageClient />;
}
