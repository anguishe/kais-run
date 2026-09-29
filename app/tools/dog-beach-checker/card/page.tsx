import type { Metadata } from 'next';
import Link from 'next/link';
import GuestCard from './GuestCard';

export const metadata: Metadata = {
  title: "Dog Beach Guest Card for Rental Hosts | Kai's Run",
  description:
    'Print a free guest card for your vacation rental binder: the dog rule for the nearest beach, legal alternatives, and a QR code to the live rule.',
  alternates: { canonical: 'https://kaisrun.xyz/tools/dog-beach-checker/' },
  robots: { index: false, follow: true },
};

export default function GuestCardPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-5xl text-brand-offwhite leading-tight">Dog Beach Guest Card</h1>
      <p className="mt-4 font-body text-brand-gray leading-relaxed">
        For vacation rental hosts on the Emerald Coast. Pick the beach your guests use, print the card
        for the house binder, and link the{' '}
        <Link href="/tools/dog-beach-checker/" className="text-brand-teal-light underline">
          Dog Beach Checker
        </Link>{' '}
        on your pet policy page. The QR code always opens the current rule.
      </p>
      <div className="mt-8">
        <GuestCard />
      </div>
    </main>
  );
}
