import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { generatedOgUrl } from '@/lib/blog/post-metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { getAllPostMeta } from '@/lib/blog/posts';
import {
  AREAS,
  AREA_SERVICE_PAGE,
  CHANGE_LOG,
  SPOTS,
  newestVerifiedOn,
} from '@/lib/beach/rules';
import LaunchWaitlist from '@/components/ui/LaunchWaitlist';
import { BeachChecker } from './BeachChecker';
import EmbedSnippet from './EmbedSnippet';

// Static page (no searchParams read here - presets are read client-side inside
// Suspense). Re-rendered daily so date-gated posts in "Related reading" appear on
// their publish day without a deploy.
export const revalidate = 86400;

const TITLE = 'Can My Dog Go to the Beach? Destin, 30A, Navarre & Pensacola Dog Beach Checker';
const DESC =
  'Pick a beach and see if your dog is allowed right now - Okaloosa, Destin, Walton permit hours (3:30 PM to 8:30 AM), Navarre, Pensacola Beach and PCB dog beaches, with the ordinance for each.';
const CANONICAL = 'https://kaisrun.xyz/tools/dog-beach-checker/';
const OG_CARD = generatedOgUrl('Dog Beach Checker', 'Free Tool');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'website',
    url: CANONICAL,
    locale: 'en_US',
    images: [{ url: OG_CARD, width: 1200, height: 630, alt: "Kai's Run - Emerald Coast Dog Beach Checker" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [OG_CARD],
  },
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'Are dogs allowed on the beach in Destin?',
    a: 'No. Okaloosa County bans dogs and cats on all public beaches (County Code Sec. 5-25), and the City of Destin separately bans any animal on its public beaches (City Code Sec. 4-7). That covers Destin, Okaloosa Island and the Fort Walton Beach Gulf beaches, for residents and visitors, leashed or not. Henderson Beach State Park allows leashed dogs on its trails and in the parking areas, not on the sand.',
  },
  {
    q: 'What are the Walton County dog beach hours?',
    a: 'With a current Walton County dog beach permit, a leashed dog is allowed on Walton public beaches from 3:30 PM to 8:30 AM the next day, year-round (County Code Sec. 22-31, as amended by Ord. 2025-22 in November 2025). Older guides that say 4 PM to 8 AM, or different summer hours, are out of date.',
  },
  {
    q: 'Can visitors bring a dog to the beach on 30A?',
    a: 'No. The Walton County permit is only available to county property owners and permanent residents, so vacation renters and day visitors cannot bring a dog onto 30A or Miramar Beach sand at any hour. The state parks along 30A (Grayton Beach, Topsail Hill, Deer Lake) also keep dogs off the beach.',
  },
  {
    q: 'Is there a dog beach in Navarre?',
    a: 'No. Santa Rosa County code bans animals on beaches except dog friendly parks, and the county says no pets are allowed on Navarre Beach. The nearest legal off-leash option in Navarre is the Navarre Central Bark dog park; the nearest legal Gulf sand is the Pensacola Beach dog beaches.',
  },
  {
    q: 'Where is the closest dog-friendly beach to Destin?',
    a: 'The two designated dog beaches on Pensacola Beach (Park East and Park West, about an hour west) and the dog-friendly stretch on the west side of the Panama City Beach City Pier (about an hour east). Both require a leash. Pensacola Beach dog beaches open at 7 AM from May through October and at sunrise the rest of the year, and close at sunset.',
  },
];

const RELATED = [
  { slug: 'can-you-take-your-dog-to-the-beach-destin', label: 'Every beach rule on the coast, explained county by county' },
  { slug: 'red-tide-dogs-emerald-coast', label: 'Red tide and dogs: why you stay off even legal sand during a bloom' },
  { slug: 'too-hot-to-walk-your-dog', label: 'When summer sand and pavement are too hot for paws' },
  { slug: 'dog-park-not-tiring-dog-out', label: 'Why the dog park does not tire a high-drive dog out' },
  { slug: 'why-does-my-dog-get-zoomies', label: 'Zoomies, and why loose sand is a slip surface' },
];

const dateModified = newestVerifiedOn();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${CANONICAL}#app`,
      name: 'Emerald Coast Dog Beach Checker',
      url: CANONICAL,
      description: DESC,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      dateModified,
      provider: { '@id': 'https://kaisrun.xyz/#business' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${CANONICAL}#faq`,
      mainEntity: faqItems.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@type': 'Dataset',
      '@id': `${CANONICAL}#rules`,
      name: 'Emerald Coast dog beach rules by spot',
      description:
        'Whether dogs are allowed on the sand, hours, who qualifies, leash rules, and the governing ordinance for public beaches, dog beaches and dog parks from Pensacola Beach to Panama City Beach, Florida.',
      dateModified,
      creator: { '@id': 'https://kaisrun.xyz/#business' },
      isBasedOn: Array.from(new Set(SPOTS.map((s) => s.source.url))),
      spatialCoverage: 'Okaloosa, Walton, Santa Rosa, Escambia and Bay counties, Florida',
    },
    {
      // @context lives on the graph; undefined drops out of JSON.stringify.
      ...buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Free Tools', path: '/tools/' },
        { name: 'Dog Beach Checker', path: '/tools/dog-beach-checker/' },
      ]),
      '@context': undefined,
    },
  ],
};

function sandLabel(sand: string, trails?: boolean): string {
  if (sand === 'yes') return 'Yes';
  if (sand === 'permit') return 'Permit holders only';
  if (sand === 'unknown') return 'No official rule found';
  return trails ? 'No (trails OK)' : 'No';
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export default function DogBeachCheckerPage() {
  const published = new Set(getAllPostMeta().map((p) => p.slug));
  const related = RELATED.filter((r) => published.has(r.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl text-brand-offwhite leading-tight">{TITLE}</h1>
        <p className="mt-6 font-body text-lg text-brand-offwhite leading-relaxed">
          Not in Okaloosa County or Destin. Walton allows permit holders 3:30 PM to 8:30 AM. Visitors can
          use the Pensacola Beach and Panama City Beach dog beaches.
        </p>
        <p className="mt-4 font-body text-brand-gray leading-relaxed">
          Pick a spot and the checker tells you whether your dog is legal there right now, when it next
          will be, and where to go instead. Every rule links the ordinance behind it and shows the date we
          last checked it.
        </p>

        <div className="mt-10">
          <Suspense
            fallback={
              <p className="rounded-xl border border-white/10 bg-brand-charcoal/60 p-5 font-body text-brand-gray" aria-busy="true">
                Loading the checker. The full rules table is below.
              </p>
            }
          >
            <BeachChecker />
          </Suspense>
        </div>

        <section className="mt-20" aria-labelledby="rules-matrix">
          <h2 id="rules-matrix" className="font-display text-3xl text-brand-offwhite">
            Dog beach rules, spot by spot
          </h2>
          <p className="mt-3 font-body text-brand-gray leading-relaxed">
            The same data the checker uses. Hours are Central time. Posted signs govern where they differ.
          </p>
          {AREAS.map((area) => {
            const rows = SPOTS.filter((s) => s.area === area);
            const areaPage = AREA_SERVICE_PAGE[area];
            return (
              <div key={area} className="mt-8">
                <h3 className="font-display text-2xl text-brand-gold">
                  {areaPage ? (
                    <Link href={areaPage} className="hover:underline">
                      {area}
                    </Link>
                  ) : (
                    area
                  )}
                </h3>
                <div className="mt-3 overflow-x-auto rounded-lg border border-brand-teal/20">
                  <table className="w-full min-w-[720px] border-collapse text-left font-body text-sm text-brand-gray">
                    <thead className="bg-brand-charcoal text-brand-offwhite">
                      <tr>
                        <th scope="col" className="px-3 py-2 font-semibold">Spot</th>
                        <th scope="col" className="px-3 py-2 font-semibold">Dogs on sand</th>
                        <th scope="col" className="px-3 py-2 font-semibold">Hours</th>
                        <th scope="col" className="px-3 py-2 font-semibold">Who</th>
                        <th scope="col" className="px-3 py-2 font-semibold">Leash</th>
                        <th scope="col" className="px-3 py-2 font-semibold">Source</th>
                        <th scope="col" className="px-3 py-2 font-semibold">Verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((s) => (
                        <tr key={s.id} id={`spot-${s.id}`} className="border-t border-white/5 align-top">
                          <th scope="row" className="px-3 py-2 font-medium text-brand-offwhite">
                            {s.name}
                          </th>
                          <td className="px-3 py-2">{sandLabel(s.rule.sand, s.rule.trails)}</td>
                          <td className="px-3 py-2">{s.rule.hoursText}</td>
                          <td className="px-3 py-2">{s.rule.whoText}</td>
                          <td className="px-3 py-2">{s.rule.leashText}</td>
                          <td className="px-3 py-2">
                            <a href={s.source.url} target="_blank" rel="noopener" className="text-brand-teal-light underline">
                              {s.source.label}
                              {s.source.section ? ` ${s.source.section}` : ''}
                            </a>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">{formatDate(s.verifiedOn)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-16" aria-labelledby="rule-changes">
          <h2 id="rule-changes" className="font-display text-3xl text-brand-offwhite">
            Rule changes
          </h2>
          <ul className="mt-4 space-y-3 font-body text-brand-gray">
            {CHANGE_LOG.map((c) => (
              <li key={c.date + c.text} className="border-l-2 border-brand-teal pl-4">
                <span className="text-brand-offwhite">{formatDate(c.date)}:</span> {c.text}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-body text-sm text-brand-gray">
            Every source is re-checked each quarter (January, April, July, October). The next check is the
            week of January 18, 2027.
          </p>
        </section>

        <section className="mt-16" aria-labelledby="beach-faq">
          <h2 id="beach-faq" className="font-display text-3xl text-brand-offwhite mb-8">
            Common Questions
          </h2>
          <div className="space-y-8">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="border-l-2 border-brand-teal pl-5">
                <h3 className="font-display text-xl text-brand-gold mb-2">{q}</h3>
                <p className="font-body text-brand-gray">{a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-body text-brand-gray">
            Is beach sand OK for a puppy? Loose sand loads young joints harder than it looks - check the{' '}
            <Link href="/tools/puppy-exercise-planner/" className="text-brand-teal-light underline">
              puppy exercise planner
            </Link>{' '}
            before a long beach day. On a legal dog park day,{' '}
            <Link href="/tools/dog-exercise-calculator/" className="text-brand-teal-light underline">
              the exercise calculator
            </Link>{' '}
            gives you the daily number to aim for.
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="beach-related">
            <h2 id="beach-related" className="font-display text-3xl text-brand-offwhite">
              Related reading
            </h2>
            <ul className="mt-4 space-y-2 font-body">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}/`} className="text-brand-teal-light underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <EmbedSnippet />

        <LaunchWaitlist source="tool-dog-beach-checker" />

        <p className="mt-8 font-body text-sm text-brand-gray">
          Not legal advice. Posted signs and the current ordinance govern. Rules change - each rule shows
          the date we last checked it. Spotted a change?{' '}
          <Link href="/contact/" className="text-brand-teal-light underline">
            Tell us
          </Link>
          .
        </p>
      </main>
    </>
  );
}
