import type { Metadata } from 'next';
import Link from 'next/link';
import { generatedOgUrl } from '@/lib/blog/post-metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/breadcrumb-schema';
import { PuppyPlanner } from './PuppyPlanner';
import EmbedThisTool, { EMBED_CHROME_CSS, EmbedCredit } from '@/components/tools/EmbedThisTool';
import LaunchWaitlist from '@/components/ui/LaunchWaitlist';

const TITLE = "Puppy Exercise Planner - Growth Plates & the 5-Minute Rule | Kai's Run";
const DESC =
  "How much exercise a puppy can safely handle, by age and adult size. Shows when growth plates close, what the five-minute rule actually limits, and what to avoid at each stage.";
const CANONICAL = 'https://kaisrun.xyz/tools/puppy-exercise-planner/';
const OG_CARD = generatedOgUrl('Puppy Exercise Planner', 'Free Tool');

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
        alt: "Kai's Run - Puppy exercise and growth plate planner",
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
  name: 'Puppy Exercise Planner',
  url: CANONICAL,
  applicationCategory: 'HealthApplication',
  isAccessibleForFree: true,
  provider: { '@id': 'https://kaisrun.xyz/#business' },
};

const faqItems = [
  {
    q: 'How much exercise does a puppy need per day?',
    a: 'The common answer is five minutes per month of age, twice a day, so twenty minutes twice daily for a four-month-old. That figure is a reasonable ceiling for forced repetitive work like leashed road walking, jogging, and stairs. It was never meant to cap a puppy’s total movement, and self-directed play on soft ground is not what it limits.',
  },
  {
    q: 'Is the 5-minute rule for puppies real?',
    a: 'It is real advice with a real concern behind it, but it is not a peer-reviewed threshold. The rule is associated with UK Kennel Club and British Veterinary Association puppy materials and has circulated for decades. The underlying worry - that repetitive loading of immature joints is bad for them - is well founded even though the specific number is not a study result.',
  },
  {
    q: 'When do a dog’s growth plates close?',
    a: 'It depends mostly on adult size. Toy and small breeds typically finish somewhere around eight to twelve months, medium breeds around ten to fourteen, large breeds around twelve to sixteen, and giant breeds can run to twenty months or beyond. A radiograph is the only way to confirm closure in an individual dog, and it is a fair thing to ask your vet about.',
  },
  {
    q: 'Can I take my puppy running with me?',
    a: 'Not while the growth plates are open. Running alongside a person or a bike is sustained repetitive loading at a pace the dog cannot choose to leave, which is the exact combination worth avoiding on an immature skeleton. Wait until the dog is past its closure window, then build gradually rather than starting at your normal distance.',
  },
  {
    q: 'Are stairs bad for puppies?',
    a: 'For young large-breed puppies the evidence points that way. In a Norwegian cohort study of Newfoundlands, Labrador Retrievers, Leonbergers and Irish Wolfhounds, regular stair use before three months of age was associated with a higher rate of hip dysplasia. The same study found daily off-leash exercise on soft, moderately uneven ground was associated with a lower rate.',
  },
  {
    q: 'My puppy still has energy after its walk. Am I under-exercising it?',
    a: 'Probably not physically, and this is the hardest part of raising a young dog. A puppy that is still wired after its walk usually needs sleep and mental work rather than more miles - training sessions, scent games, and enforced naps drain a young dog without loading its joints. The physical ceiling is real; the mental one is not.',
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
  { name: 'Puppy Exercise Planner', path: '/tools/puppy-exercise-planner/' },
]);

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PuppyExercisePlannerPage({ searchParams }: Props) {
  const sp = await searchParams;
  const embed = sp.embed === '1';

  if (embed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <style>{EMBED_CHROME_CSS}</style>
        <h1 className="font-display text-3xl text-brand-offwhite mb-6">
          Puppy Exercise Planner
        </h1>
        <PuppyPlanner />
        <EmbedCredit path="/tools/puppy-exercise-planner/" />
      </div>
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
          Puppy Exercise Planner
        </h1>
        <p className="mt-6 font-body text-brand-gray leading-relaxed">
          Everyone repeats the same line: five minutes per month of age, twice a day. It is not
          wrong, and it is not the whole answer. That number is a ceiling on forced repetitive work -
          leashed walks on concrete, jogging, stairs, fetch with hard stops - and it says nothing
          about the movement a growing dog actually needs, which is self-directed play on ground that
          gives. The distinction matters, because owners hear the rule, cap everything, and end up
          with an under-moved puppy that is also under-tired. Enter an age and an expected adult size
          and this tool gives you both numbers, the growth plate window for that size, and the
          specific things worth avoiding at this stage.
        </p>

        <div className="mt-10 bg-brand-charcoal rounded-xl p-6 sm:p-8">
          <PuppyPlanner />
          <LaunchWaitlist source="tool-puppy-exercise-planner" />
        </div>

        <section className="mt-20 font-body text-brand-gray leading-relaxed">
          <p>
            Kai&apos;s Run takes dogs from four months for introduction-level work: short, light,
            entirely at the dog&apos;s pace, on a self-powered mill the dog controls. That is
            confidence work, not conditioning, and it is deliberately separate from the sustained
            workload that waits until the skeleton is finished. If you want to know how that first
            session actually goes, read{' '}
            <Link
              href="/blog/what-to-expect-first-slatmill-session/"
              className="text-brand-teal-light underline"
            >
              what to expect from a first slatmill session
            </Link>
            , or the honest version of{' '}
            <Link href="/blog/is-a-slatmill-safe-for-dogs/" className="text-brand-teal-light underline">
              when a slatmill is and is not safe
            </Link>
            , which includes the age rules we hold ourselves to. We serve Destin, Fort Walton Beach,
            Niceville, and the rest of the Emerald Coast.
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
            Once the plates close, the question changes from &quot;how little&quot; to &quot;how
            much,&quot; and{' '}
            <Link href="/tools/dog-exercise-calculator/" className="text-brand-teal-light underline">
              the exercise calculator
            </Link>{' '}
            picks up there. The behavior side of this age is its own problem, covered in{' '}
            <Link href="/blog/dog-adolescence-phase/" className="text-brand-teal-light underline">
              why a puppy stops listening around eight months
            </Link>
            . For the ceiling on the other end, read{' '}
            <Link href="/blog/can-you-over-exercise-a-dog/" className="text-brand-teal-light underline">
              whether you can over-exercise a dog
            </Link>
            , and before any warm-weather outing here, check{' '}
            <Link href="/tools/too-hot-to-walk/" className="text-brand-teal-light underline">
              whether the pavement is safe
            </Link>{' '}
            - young paw pads are softer than adult ones. When you are ready,{' '}
            <Link href="/book/" className="text-brand-teal-light underline">
              book an intro session
            </Link>{' '}
            or review{' '}
            <Link href="/services/" className="text-brand-teal-light underline">
              what a session includes
            </Link>
            .
          </p>
        </section>
        <EmbedThisTool
          path="/tools/puppy-exercise-planner/"
          iframeTitle="Puppy exercise planner"
          credit="Puppy exercise planner"
          height={1200}
        />
      </main>
    </>
  );
}
