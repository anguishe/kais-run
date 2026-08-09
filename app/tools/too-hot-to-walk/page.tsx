import type { Metadata } from 'next';
import Link from 'next/link';
import { generatedOgUrl } from '@/lib/blog/post-metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { HeatChecker } from './HeatChecker';

const TITLE = 'Too Hot to Walk Your Dog? Pavement Temperature Checker';
const DESC =
  'Enter your city or ZIP to see current air temperature, heat index, and pavement surface temperature - so you know before your dog\'s paws touch the asphalt.';
const CANONICAL = 'https://kaisrun.xyz/tools/too-hot-to-walk/';
const OG_CARD = generatedOgUrl('Pavement Heat Checker', 'Free Tool');

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
    images: [
      {
        url: OG_CARD,
        width: 1200,
        height: 630,
        alt: "Kai's Run - Is It Too Hot to Walk Your Dog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [OG_CARD],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: TITLE,
  url: CANONICAL,
  applicationCategory: 'UtilitiesApplication',
  isAccessibleForFree: true,
  provider: { '@id': 'https://kaisrun.xyz/#business' },
};

const faqItems = [
  {
    q: 'Is it too hot to walk my dog?',
    a: 'A good rule of thumb: if the air temperature is above 77F, check the pavement first. Asphalt in direct sun can reach 125F or more even when the air feels manageable. Use the checker above to get a real-time read for your city.',
  },
  {
    q: 'How hot is too hot for pavement?',
    a: 'Research published in JAMA (Berens, 1970) found that 77F air produced 125F asphalt in direct sun. Paw pads can sustain burns in under 60 seconds at that temperature. Shade buys some margin, but asphalt still runs 10 to 15 degrees above air temp in the shade.',
  },
  {
    q: 'What temperature is dangerous for dogs?',
    a: 'The heat index - air temperature adjusted for humidity - is the more accurate risk signal than raw temperature alone. A heat index above 85F is caution territory for most dogs. Above 90F is dangerous, and above that the risk of heatstroke rises fast. Brachycephalic breeds, seniors, dark-coated dogs, and overweight dogs reach that threshold sooner.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${CANONICAL}#faq`,
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Free Tools', path: '/tools/' },
  { name: 'Too Hot to Walk?', path: '/tools/too-hot-to-walk/' },
]);

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TooHotToWalkPage({ searchParams }: Props) {
  const sp = await searchParams;
  const embed = sp.embed === '1';

  if (embed) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-3xl text-brand-offwhite mb-6">{TITLE}</h1>
        <HeatChecker />
        <p className="mt-6 font-body text-sm text-brand-gray text-center">
          Powered by{' '}
          <a href="https://kaisrun.xyz/" className="text-brand-teal-light underline">
            Kai&apos;s Run
          </a>
        </p>
      </main>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl text-brand-offwhite leading-tight">
          {TITLE}
        </h1>
        <p className="mt-6 font-body text-brand-gray leading-relaxed">
          Asphalt on the Emerald Coast routinely hits 130F or higher mid-afternoon in summer. Travis
          built this checker after watching dogs pull back from driveways before a session even
          started. Enter your city below - the tool pulls live weather, runs the NOAA heat index
          calculation, and estimates pavement temperature based on Berens (1970, JAMA), which found
          77F air reached 125F asphalt in direct sun.
        </p>

        <div className="mt-10">
          <HeatChecker />
        </div>

        <section className="mt-20 font-body text-brand-gray leading-relaxed space-y-5">
          <h2 className="font-display text-3xl text-brand-offwhite">How to read the results</h2>
          <p>
            The checker returns three numbers, and they answer different questions. Air temperature
            is what the forecast told you this morning - it is the least useful of the three on its
            own. Heat index is air temperature adjusted for humidity, and on the Gulf Coast humidity
            is usually the number doing the damage - it tells you how hard your dog has to work to
            shed heat, because a panting dog cools by evaporation and saturated air takes that tool
            away. Pavement temperature is the estimate that protects the paws - asphalt holds and
            radiates heat long after the air starts to drop, which is why a 6 PM walk can still burn
            pads that a 7 AM walk never would.
          </p>
          <p>
            Act on the worst number, not the friendliest one. If the pavement estimate is high but
            the heat index is moderate, grass routes and shade solve it. If the heat index is the
            problem, shorter duration and water breaks do not fix it - the air itself is the limit,
            and the walk should move to early morning or indoors. And know the signs that the margin
            is already gone: heavy relentless panting, a tongue wide and spooned at the tip, gums
            turning deep red, wobble or sudden lag on the leash. That is not a rest-in-the-shade
            situation - cooling and a vet call come first, because heatstroke moves fast and the
            window for getting ahead of it is short. If your dog is brachycephalic, overweight,
            senior, or dark-coated, treat every threshold on this page as if it arrives 5 degrees
            earlier.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl text-brand-offwhite mb-8">Common Questions</h2>
          <div className="space-y-8">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="border-l-2 border-brand-teal pl-5">
                <h3 className="font-display text-xl text-brand-gold mb-2">{q}</h3>
                <p className="font-body text-brand-gray">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 font-body text-brand-gray leading-relaxed">
          <p>
            When the pavement is off-limits - whether to summer heat or a{' '}
            <Link href="/blog/dog-thunderstorm-anxiety/" className="text-brand-teal-light underline">
              summer thunderstorm
            </Link>{' '}
            - the next question is what to do instead. A{' '}
            <Link href="/blog/what-is-a-dog-slatmill/" className="text-brand-teal-light underline">
              climate-controlled slatmill session
            </Link>{' '}
            keeps the workout going without the heat risk. Before you ramp intensity on any session,
            read the guide on{' '}
            <Link href="/blog/can-you-over-exercise-a-dog/" className="text-brand-teal-light underline">
              whether you can over-exercise a dog
            </Link>
            . For the full data behind summer heat risk on the Emerald Coast, the post on{' '}
            <Link href="/blog/too-hot-to-walk-your-dog/" className="text-brand-teal-light underline">
              walking dogs in hot weather
            </Link>{' '}
            goes deeper. If you want to dial in exercise volume for your specific dog,{' '}
            <Link href="/tools/dog-exercise-calculator/" className="text-brand-teal-light underline">
              the exercise calculator
            </Link>{' '}
            is the other free tool here. When you are ready to schedule a session,{' '}
            <Link href="/book/" className="text-brand-teal-light underline">
              book here
            </Link>{' '}
            or review{' '}
            <Link href="/services/" className="text-brand-teal-light underline">
              what a session includes
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
