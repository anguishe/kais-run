import type { Metadata } from 'next';
import BookPageClient from './BookPageClient';

export const metadata: Metadata = {
  title: 'Join the Founding Athlete Program | Kai\'s Run',
  description: 'Lock in 5 dog conditioning sessions for $200 — $40 per session — before Kai\'s Run opens to the public. Only 17 spots remain. Mobile slatmill delivered to your driveway in Destin, Fort Walton Beach, Niceville, and surrounding Emerald Coast cities.',
  alternates: {
    canonical: 'https://www.kaisrun.xyz/book/',
  },
  openGraph: {
    title: 'Join the Founding Athlete Program | Kai\'s Run',
    description: 'Lock in 5 conditioning sessions for $200 before we open. 17 spots left.',
    url: 'https://www.kaisrun.xyz/book/',
    type: 'website',
    images: [{ url: 'https://www.kaisrun.xyz/images/og-image.png', width: 1200, height: 630 }],
  },
};

export default function BookPage() {
  return <BookPageClient />;
}
