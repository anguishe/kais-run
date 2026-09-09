import type { Metadata } from 'next';
import VoteCta from '@/components/VoteCta';

// Not a Kai's Run service page — it is a short, sayable URL for the Super Dad 2026 vote
// drive that print, QR codes and the Flock case site all point at. Kept out of the index
// so it never competes with the business pages for kaisrun.xyz's own terms.
export const metadata: Metadata = {
  title: 'Vote for Travis — Super Dad 2026',
  description:
    'One free vote a day for Travis in Super Dad 2026, benefiting Children’s Miracle Network. Confirm the email once, then it is one tap a day.',
  alternates: { canonical: 'https://kaisrun.xyz/vote/' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Vote free, once a day — Super Dad 2026',
    description:
      'Three taps. Confirm the email once. Then it is one tap a day until November.',
    url: 'https://kaisrun.xyz/vote/',
  },
};

export default function VotePage() {
  return (
    <main className="min-h-screen bg-brand-black px-6 py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-5xl tracking-tight text-brand-offwhite">
          Vote free, once a day
        </h1>
        <p className="mt-4 text-lg text-brand-gray">
          Travis is competing in Super Dad 2026, benefiting Children&apos;s Miracle Network.
          Voting is free and the totals reset every round, so a vote today does not carry
          over to the next one.
        </p>

        <div className="mt-10">
          <VoteCta />
        </div>

        <div className="mt-12 border-t border-brand-charcoal pt-8">
          <h2 className="font-display text-2xl tracking-wide text-brand-offwhite">
            Never remember on your own
          </h2>
          <p className="mt-3 text-brand-gray">
            One tap adds a daily reminder to your phone&apos;s calendar, running until the
            final round in November. It fires whether or not you ever open this page again.
          </p>
          <a
            href="/vote-daily.ics"
            className="mt-4 inline-block rounded-lg border border-brand-gold px-6 py-3 font-body text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
          >
            Add the daily reminder
          </a>
        </div>

        <p className="mt-12 text-sm text-brand-gray">
          Extra votes can be bought as a donation to Children&apos;s Miracle Network.
          Genuinely optional — the free daily vote is the ask, and it is what this page is
          for.{' '}
          <a
            href="https://yoursuperdad.org/competitor/group/sd-xmxr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold underline"
          >
            Live group standings
          </a>
          .
        </p>

        <p className="mt-6 text-xs text-brand-gray">
          This page remembers your last vote in your own browser so it can show the
          countdown and the streak. That never leaves your device and is not sent anywhere.
        </p>
      </div>
    </main>
  );
}
