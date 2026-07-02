import type { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';

const TOOLS_DESCRIPTION =
  'Free dog tools for Emerald Coast owners. Check if it is too hot to walk your dog and estimate how much exercise your dog needs.';

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools/' },
]);

export const metadata: Metadata = {
  title: "Free Dog Tools | Kai's Run — Emerald Coast FL",
  description: TOOLS_DESCRIPTION,
  alternates: { canonical: 'https://kaisrun.xyz/tools/' },
  openGraph: {
    title: "Free Dog Tools | Kai's Run — Emerald Coast FL",
    description: TOOLS_DESCRIPTION,
    type: 'website',
    url: 'https://kaisrun.xyz/tools/',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Kai's Run — Free dog tools for the Emerald Coast",
      },
    ],
  },
};

const tools = [
  {
    href: '/tools/too-hot-to-walk/',
    title: 'Too Hot to Walk?',
    blurb: 'Enter the temperature and find out if the pavement is safe for your dog right now.',
  },
  {
    href: '/tools/dog-exercise-calculator/',
    title: 'Dog Exercise Calculator',
    blurb: 'Estimate how much daily exercise your dog needs based on breed, age, and weight.',
  },
  {
    href: '/tools/dog-body-condition-score/',
    title: 'Is My Dog Overweight?',
    blurb:
      "Skip the scale. A 30-second hands-on body check that estimates your dog's condition score - and tells you the next move.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl text-brand-offwhite">
          Free Dog Tools for the Emerald Coast
        </h1>
        <p className="mt-6 font-body text-brand-gray">
          Built these for local owners between sessions. No sign-up, no catch -
          just quick answers to the questions I get asked most on the driveway.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block rounded-lg border border-brand-charcoal bg-brand-charcoal p-6 transition-colors hover:border-brand-teal"
            >
              <h2 className="font-display text-2xl text-brand-gold">{tool.title}</h2>
              <p className="mt-2 font-body text-sm text-brand-gray">{tool.blurb}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
