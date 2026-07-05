import type { Metadata } from 'next';
import BookPageClient from './BookPageClient';

export const metadata: Metadata = {
  title: 'Join the Founding Athlete Program | Kai\'s Run',
  description: 'Lock in 5 dog conditioning sessions for $200 ($40 each) before Kai\'s Run opens to the public. Mobile slatmill delivered to your driveway across the Emerald Coast.',
  alternates: {
    canonical: 'https://kaisrun.xyz/book/',
  },
  openGraph: {
    title: 'Join the Founding Athlete Program | Kai\'s Run',
    description: "Lock in 5 conditioning sessions for $200 before Kai's Run opens to the public.",
    url: 'https://kaisrun.xyz/book/',
    type: 'website',
    images: [{ url: 'https://kaisrun.xyz/images/og-image.png', width: 1200, height: 630 }],
  },
};

export default function BookPage() {
  return <BookPageClient />;
}
