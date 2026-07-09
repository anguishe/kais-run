import type { Metadata } from 'next';
import Link from 'next/link';
import { generatedOgUrl } from '@/lib/blog/post-metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { Calculator } from './Calculator';

const TITLE = 'Dog Exercise Calculator - How Much Does My Dog Need?';
const DESC =
  "Enter your dog's breed, age, and weight to get a daily exercise range with structured, play, and enrichment splits - built for Emerald Coast owners.";
const CANONICAL = 'https://kaisrun.xyz/tools/dog-exercise-calculator/';
const OG_CARD = generatedOgUrl('Dog Exercise Calculator', 'Free Tool');

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
        alt: "Kai's Run - Dog Exercise Calculator",
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
    q: 'How much exercise does my dog need?',
    a: 'The real answer depends on drive tier, life stage, and current conditioning level. A working-tier dog like a Belgian Malinois needs 120 to 150 minutes of structured daily work at full conditioning - roughly four to five times what a Basset Hound needs. Most breed-based charts understate high-drive requirements and overstate low-drive ones. Use the calculator above to get a starting range based on your specific dog.',
  },
  {
    q: 'How long should I walk my puppy?',
    a: "The widely cited guideline is roughly five minutes of exercise per month of age, up to twice daily. That is a rule of thumb, not a hard medical limit - growth plates in most breeds are not fully closed until 12 to 18 months, and high-impact repetitive loading before that point carries some risk. Keep sessions short, on soft surfaces, and stop well before the puppy shows fatigue. Two shorter sessions beat one long one.",
  },
  {
    q: 'Do working breeds need more exercise than other dogs?',
    a: 'Yes - substantially more. But the gap is not just in duration. Working and high-drive dogs need structured, goal-oriented physical load: consistent rhythmic work that taxes the aerobic system and engages the mind. Chaotic play and leash walks often spike arousal without discharging it. If a working-tier dog is wound up at home, the first question is not how long the walk was - it is what kind of load the dog got.',
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
  { name: 'Dog Exercise Calculator', path: '/tools/dog-exercise-calculator/' },
]);

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DogExerciseCalculatorPage({ searchParams }: Props) {
  const sp = await searchParams;
  const embed = sp.embed === '1';

  if (embed) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-3xl text-brand-offwhite mb-6">{TITLE}</h1>
        <Calculator />
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
        <h1 className="font-display text-5xl text-brand-offwhite leading-tight">{TITLE}</h1>

        <p className="mt-6 font-body text-brand-gray leading-relaxed">
          Two dogs stand at the same front door. Same breed, same age, same 30-minute walk on the
          schedule. One comes home settled. The other is already scanning for something to destroy.
          The difference is rarely the walk - it is usually the load. This calculator estimates
          daily exercise requirements by drive tier, life stage, and health status. It does not
          flatten every dog into a single number; it gives you a range and the reasoning behind it.
        </p>

        <div className="mt-10 bg-brand-charcoal rounded-xl p-6 sm:p-8">
          <Calculator />
        </div>

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

        <section className="mt-20 font-body text-brand-gray leading-relaxed space-y-5">
          <p>
            The calculator gives you a number. These posts give you the reasoning.{' '}
            <Link
              href="/blog/how-much-exercise-does-my-dog-need/"
              className="text-brand-teal-light underline"
            >
              How much exercise does a dog need
            </Link>{' '}
            covers the research in more detail.{' '}
            <Link
              href="/blog/high-energy-dog-breeds-exercise-guide/"
              className="text-brand-teal-light underline"
            >
              High-energy breed exercise requirements
            </Link>{' '}
            goes deeper on the working and high-drive tiers.{' '}
            <Link
              href="/blog/how-to-tire-out-a-high-energy-dog/"
              className="text-brand-teal-light underline"
            >
              How to actually tire out a high-energy dog
            </Link>{' '}
            covers what works beyond the leash walk.
          </p>
          <p>
            If you are watching the ceiling,{' '}
            <Link href="/blog/can-you-over-exercise-a-dog/" className="text-brand-teal-light underline">
              can you over-exercise a dog
            </Link>{' '}
            walks through the warning signals. For settled dogs,{' '}
            <Link href="/blog/why-structured-runs-matter/" className="text-brand-teal-light underline">
              why structured runs matter
            </Link>{' '}
            is worth reading even when the number looks manageable. The adolescent window from
            roughly 6 to 18 months is the hardest phase - the{' '}
            <Link href="/blog/dog-adolescence-phase/" className="text-brand-teal-light underline">
              dog adolescence post
            </Link>{' '}
            covers what is happening and what actually helps.
          </p>
          <p>
            If summer heat is a factor on the Emerald Coast,{' '}
            <Link href="/tools/too-hot-to-walk/" className="text-brand-teal-light underline">
              check the pavement temperature first
            </Link>{' '}
            before any outdoor session, and if you are not sure your dog is at a healthy starting
            weight, the{' '}
            <Link
              href="/tools/dog-body-condition-score/"
              className="text-brand-teal-light underline"
            >
              body condition score check
            </Link>{' '}
            is the companion tool. When you are ready to put a program in place,{' '}
            <Link href="/book/" className="text-brand-teal-light underline">
              book a session
            </Link>{' '}
            or review{' '}
            <Link href="/pricing/" className="text-brand-teal-light underline">
              pricing
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
