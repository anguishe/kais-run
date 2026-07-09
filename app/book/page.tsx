import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import BookPageClient from './BookPageClient';

export const metadata: Metadata = {
  title: 'Join the Founding Athlete Program | Kai\'s Run',
  description: 'Book a mobile dog conditioning session in Destin, Fort Walton Beach, or Niceville. Private slatmill work at your driveway - choose a time that fits.',
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
  return (
    <main className="min-h-screen bg-brand-black pt-24">
      <div className="mx-auto max-w-4xl px-6 pb-12 text-center">
        <p className="mb-3 font-body text-sm tracking-[0.25em] text-brand-teal-light uppercase">
          Destin · Fort Walton Beach · Niceville
        </p>
        <h1 className="mb-4 font-display text-5xl text-brand-offwhite md:text-7xl">
          Book a Mobile Dog Conditioning Session
        </h1>
        <p className="mx-auto max-w-2xl font-body text-lg text-brand-gray">
          Every session happens at your home. We bring the slatmill, the Julius-K9 harness, and the
          cameras to your driveway - you bring the dog. Start with an Intro Session, or claim one of
          the remaining spots in the{' '}
          <Link href="/pricing/" className="text-brand-teal-light underline-offset-2 hover:underline">
            Founding Athlete Program
          </Link>
          . Details on both are on the{' '}
          <Link href="/pricing/" className="text-brand-teal-light underline-offset-2 hover:underline">
            pricing page
          </Link>
          .
        </p>

        <ul className="mx-auto mt-8 max-w-xl space-y-2 text-left font-body text-sm text-brand-offwhite/80">
          <li>Dogs must be at least 4 months old</li>
          <li>Current rabies vaccination</li>
          <li>Signed waiver before the first run</li>
          <li>Vet clearance required for dogs with cardiac or respiratory conditions</li>
        </ul>

        <p className="mx-auto mt-8 max-w-xl font-body text-brand-gray">
          Prefer to talk first? Call or text{' '}
          <a href="tel:+18502185855" className="text-brand-teal-light underline-offset-2 hover:underline">
            850-218-5855
          </a>
          .
        </p>

        <div className="mx-auto mt-8 h-px w-16 bg-brand-teal" />
      </div>

      <Suspense
        fallback={
          <div
            className="mx-auto max-w-4xl px-6 pb-16 text-center font-body text-brand-gray"
            aria-busy="true"
          >
            Loading booking calendar
          </div>
        }
      >
        <BookPageClient />
      </Suspense>
    </main>
  );
}
