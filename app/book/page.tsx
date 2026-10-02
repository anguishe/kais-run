import type { Metadata } from 'next';
import Link from 'next/link';
import LaunchWaitlist from '@/components/ui/LaunchWaitlist';

// Parked 2026-09-28: Kai's Run is not taking dogs yet. /book/ stays alive (it is
// linked from old posts, FB, and Google) but now serves the launch list instead of
// the Square booking widget. When sessions open, restore the widget from git history
// (app/book/BookPageClient.tsx, removed in the same commit as this note).

const TITLE = "Join the Launch List | Kai's Run";
const DESC =
  "Kai's Run is not taking dogs yet. Join the launch list for one email when mobile slatmill conditioning opens in Destin, Fort Walton Beach, and Niceville.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: 'https://kaisrun.xyz/book/',
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://kaisrun.xyz/book/',
    type: 'website',
    images: [{ url: 'https://kaisrun.xyz/images/og-image.png', width: 1200, height: 630 }],
  },
};

const TOOLS = [
  { href: '/tools/too-hot-to-walk/', label: 'Too Hot to Walk?', blurb: 'Pavement and heat check for your ZIP.' },
  { href: '/tools/dog-exercise-calculator/', label: 'Dog Exercise Calculator', blurb: "Your dog's daily number, split three ways." },
  { href: '/tools/dog-body-condition-score/', label: 'Body Condition Score', blurb: 'A hands-on check in under two minutes.' },
  { href: '/tools/puppy-exercise-planner/', label: 'Puppy Exercise Planner', blurb: 'Safe work by age and size, to growth-plate closure.' },
];

export default function BookPage() {
  return (
    <main className="min-h-screen bg-brand-black pt-24">
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <p className="mb-3 text-center font-body text-sm tracking-[0.25em] text-brand-teal-light uppercase">
          Destin · Fort Walton Beach · Niceville
        </p>
        <h1 className="mb-4 text-center font-display text-5xl text-brand-offwhite md:text-7xl">
          Kai&apos;s Run Is Not Taking Dogs Yet
        </h1>
        <p className="mx-auto max-w-2xl text-center font-body text-lg text-brand-gray">
          The mobile slatmill trailer is still being built. There is nothing to book today. Leave
          your email and city below and you get one email when driveway conditioning opens near you.
        </p>

        <LaunchWaitlist source="book-page" />

        <section aria-labelledby="book-tools" className="mt-4">
          <h2 id="book-tools" className="font-display text-3xl text-brand-offwhite md:text-4xl">
            Free tools you can use now
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <li key={t.href} className="rounded-lg border border-white/10 bg-brand-charcoal/60 p-5">
                <Link href={t.href} className="font-body font-medium text-brand-teal-light underline-offset-2 hover:underline">
                  {t.label}
                </Link>
                <p className="mt-1 font-body text-sm text-brand-gray">{t.blurb}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-body text-brand-gray">
            Want the method behind the tools? Read the{' '}
            <Link href="/blog/" className="text-brand-teal-light underline-offset-2 hover:underline">
              Kai&apos;s Run blog
            </Link>{' '}
            or see{' '}
            <Link href="/services/" className="text-brand-teal-light underline-offset-2 hover:underline">
              what a session will look like
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
