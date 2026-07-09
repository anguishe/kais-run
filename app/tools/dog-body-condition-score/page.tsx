import type { Metadata } from 'next';
import Link from 'next/link';
import { generatedOgUrl } from '@/lib/blog/post-metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { BodyConditionChecker } from './BodyConditionChecker';

const TITLE = "Dog Body Condition Score Checker (No Scale) | Kai's Run";
const DESC =
  "Answer three questions about your dog's ribs, waist, and profile to estimate its body condition score - the hands-on check vets use. No scale needed.";
const CANONICAL = 'https://kaisrun.xyz/tools/dog-body-condition-score/';
const OG_CARD = generatedOgUrl('Dog Body Condition Checker', 'Free Tool');

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
        alt: "Kai's Run - Is My Dog Overweight Body Check",
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
  name: 'Dog Body Condition Score Checker',
  url: CANONICAL,
  applicationCategory: 'HealthApplication',
  isAccessibleForFree: true,
  provider: { '@id': 'https://kaisrun.xyz/#business' },
};

const faqItems = [
  {
    q: 'How can I tell if my dog is overweight without a scale?',
    a: 'Use your hands, the way a vet does. Feel for the ribs (you should feel them easily with a light touch), look for a waist from above, and check whether the belly tucks up from the side. Those three checks - the body condition score - tell you more than any number on a scale, because a healthy weight varies enormously between two dogs of the same breed.',
  },
  {
    q: 'What is a body condition score?',
    a: 'It is the standard 9-point scale vets use to judge whether a dog is at a healthy weight, based on feel and shape rather than pounds. A 4 to 5 out of 9 is ideal, below that is underweight, and above it is overweight to obese. It is the same assessment this tool walks you through.',
  },
  {
    q: "My dog looks fine but my vet says it's overweight - who's right?",
    a: 'Usually the vet. A slightly heavy dog looks completely normal to the eye, which is exactly why weight creeps up unnoticed - the hands-on check catches it well before the mirror does. If the ribs take real pressure to feel, believe the hands.',
  },
  {
    q: 'Can I just exercise the weight off my dog?',
    a: 'Not by exercise alone, and not fast. Weight comes off through a calorie deficit your vet sets, with consistent movement supporting it - and an overweight or obese dog has to build activity gradually so its joints and heart are not overloaded. Movement is half the plan; the food side belongs to your vet.',
  },
  {
    q: "Is it bad if I can see my dog's ribs?",
    a: 'It depends on the build. On a deep-chested or sighthound-type dog, a faint rib outline and a deep tuck can be perfectly normal. On most other breeds, clearly visible ribs with no covering lean toward underweight. Feel matters more than sight - if the ribs have a thin layer over them and your dog has energy and muscle, it is likely fine. Your vet is the tiebreaker.',
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
  { name: 'Dog Body Condition Score', path: '/tools/dog-body-condition-score/' },
]);

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DogBodyConditionScorePage({ searchParams }: Props) {
  const sp = await searchParams;
  const embed = sp.embed === '1';

  if (embed) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-3xl text-brand-offwhite mb-6">
          Is My Dog Overweight? The 30-Second Body Check
        </h1>
        <BodyConditionChecker />
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
          Is My Dog Overweight? The 30-Second Body Check
        </h1>
        <p className="mt-6 font-body text-brand-gray leading-relaxed">
          The scale lies. A number on it means nothing without knowing what a healthy weight is for
          your specific dog, and that varies so much between two dogs of the same breed that the
          number alone tells you almost nothing. Vets do not go by weight - they go by feel. It is
          called a body condition score, and it comes down to three things you can check with your
          own hands in under a minute: the ribs, the waist, and the profile. Answer honestly below
          and this tool estimates where your dog lands on the 9-point scale vets use, plus what to
          do about it. It does not replace your vet, and it will never hand you a diet - it tells you
          what your hands are telling you, and what the next move is.
        </p>

        <div className="mt-10 bg-brand-charcoal rounded-xl p-6 sm:p-8">
          <BodyConditionChecker />
        </div>

        <section className="mt-20 font-body text-brand-gray leading-relaxed">
          <p>
            The check tells you where your dog stands. The movement side of the fix is what we do.
            Kai&apos;s Run brings a self-powered slatmill to your driveway for private, one-on-one
            conditioning - the dog sets the pace, so an out-of-shape dog is never forced past what
            its body can handle, and it is climate-controlled against the Florida heat. When you are
            ready to build the movement half of a weight plan,{' '}
            <Link href="/book/" className="text-brand-teal-light underline">
              book an intro session
            </Link>{' '}
            or see{' '}
            <Link href="/services/" className="text-brand-teal-light underline">
              what a session includes
            </Link>
            . For the diet half, talk to your vet - that part is theirs. We serve Destin, Fort
            Walton Beach, Niceville, and the rest of the Emerald Coast.
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
            Want the reasoning behind the check? Read{' '}
            <Link href="/blog/is-my-dog-overweight/" className="text-brand-teal-light underline">
              why the scale is the wrong number to watch
            </Link>
            . Once you know where your dog stands, dial in the right workload with{' '}
            <Link href="/tools/dog-exercise-calculator/" className="text-brand-teal-light underline">
              the exercise calculator
            </Link>{' '}
            and read{' '}
            <Link
              href="/blog/how-much-exercise-does-my-dog-need/"
              className="text-brand-teal-light underline"
            >
              how much exercise your dog needs
            </Link>
            . Before you ramp anything on a heavier dog,{' '}
            <Link href="/blog/can-you-over-exercise-a-dog/" className="text-brand-teal-light underline">
              read the exercise limit
            </Link>
            , and for older dogs,{' '}
            <Link href="/blog/senior-dog-exercise/" className="text-brand-teal-light underline">
              keeping an aging body moving the right way
            </Link>{' '}
            matters more. When you are ready,{' '}
            <Link href="/book/" className="text-brand-teal-light underline">
              book a session
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
