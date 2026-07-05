'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import SlatmillExplainer from '@/components/ui/SlatmillExplainer';
import KaiGallery, { type KaiImage } from '@/components/ui/KaiGallery';

const kaiAboutImages: KaiImage[] = [
  {
    src: '/images/kai/kai-looking-up.webp',
    alt: 'Kai looking up at the camera, tongue out, mid-turn',
  },
  {
    src: '/images/kai/kai-running-toward-camera.webp',
    alt: 'Kai running toward the camera at full stride',
  },
  {
    src: '/images/kai/kai-trail-profile.webp',
    alt: 'Kai moving along a coastal hedge line in profile',
  },
  {
    src: '/images/kai/kai-golden-light.webp',
    alt: 'Kai walking into late-day light along the treeline',
  },
];
const comparison = [
  { attribute: 'Comes to you', kaisRun: 'YES', walker: 'YES', daycare: 'No' },
  { attribute: 'Climate controlled', kaisRun: 'YES', walker: 'No', daycare: 'Varies' },
  { attribute: 'One dog at a time', kaisRun: 'YES', walker: 'Often groups', daycare: 'Groups' },
  { attribute: 'Performance framing', kaisRun: 'YES', walker: 'No', daycare: 'No' },
  { attribute: 'Slatmill / no motor', kaisRun: 'YES', walker: 'No', daycare: 'No' },
  { attribute: 'Membership model', kaisRun: 'YES', walker: 'Rarely', daycare: 'Yes' },
];

const trustSignals = [
  { icon: '🛡️', text: 'Licensed & Insured' },
  { icon: '🦮', text: 'Julius K9 harnesses provided S/M/L' },
  { icon: '💉', text: 'Vaccinations required' },
  { icon: '📝', text: 'Digital waiver before first session' },
  { icon: '❄️', text: 'Climate-controlled mobile unit' },
  { icon: '🐕', text: '1-dog-at-a-time private sessions' },
  { icon: '📱', text: 'Confirmation + ETA texts' },
  { icon: '📸', text: 'Photo report after every session' },
];

export function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hero-2.webp"
            alt="High-performance dog training at Kai's Run"
            width={1264}
            height={848}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center py-24 md:py-32"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-6"
          >
            OUR STORY
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            BUILT FOR KAI.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed"
          >
            Brought to every high-drive dog on the Emerald Coast.
          </motion.p>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="bg-brand-black border border-brand-teal/20 rounded-xl p-8 md:p-12"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-8 text-center">
              How It Started
            </h2>
            <div className="space-y-6 text-brand-gray font-body text-base md:text-lg leading-relaxed">
              <p>
                Travis grew up on the same sugar-white sand his clients walk today — Destin is not a
                backdrop chosen for marketing photos; it is home. That matters because high-drive dogs here
                are not a niche hobby; they are neighbors, dock dogs, boat dogs, and security partners who
                still have to live politely in HOAs and rental kitchens when the beach day ends.
              </p>
              <p>
                Kai, Travis&apos;s Rhodesian Ridgeback mix, had the classic high-octane spiral: shredded
                bedding, leash reactivity born from frustration, and a body that never quite hit empty after
                what looked like plenty of exercise. The missing ingredient was structured output — work
                measured in minutes at sustainable effort, not just miles of sniffing.
              </p>
              <p>
                The slatmill clicked because it respected dog biomechanics. There is no motor smuggling extra
                speed past the animal; the belt only moves when paws drive it. That self-regulation lets dogs
                open their stride when they feel strong and shorten up when they need recovery — the same
                variability you see on a field sprint, just in a controlled lane. Once Kai could finally
                spend real watts in a session, the nervous system followed: deeper sleep, less frantic
                rehearsing at the window, a dog who could think before reacting.
              </p>
              <p>
                Kai&apos;s Run exists so other Emerald Coast families get that same lever without inventing
                it from scratch. If you want the full protocol list before you commit, read{' '}
                <Link href="/services/" className="text-brand-teal underline-offset-2 hover:underline">
                  Services
                </Link>
                , then grab an intro on{' '}
                <Link href="/book/" className="text-brand-teal underline-offset-2 hover:underline">
                  Book
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-brand-black px-6 py-24 md:py-32">
        <SlatmillExplainer
          body={
            <p>
              Kai needed more than a backyard could give him — that&apos;s the slatmill&apos;s whole
              job. Structured pace, real output, every session.
            </p>
          }
        />
      </section>

      {/* Destin roots + safety posture */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <motion.div variants={fadeUp} className="space-y-5 text-brand-gray font-body leading-relaxed">
            <h2 className="font-display text-3xl md:text-4xl text-brand-offwhite tracking-tight">
              Why Destin stays in the DNA
            </h2>
            <p>
              Tourist seasons, military rotations, and second-home owners all create dogs that need
              consistency even when human schedules wobble. Building a mobile gym instead of a strip-mall
              storefront keeps overhead honest and puts the mileage on us — not on your dog before the
              session even starts.
            </p>
            <p>
              We route geographically because that is how a solo operator keeps quality high without
              turning your appointment into a three-hour window. If you are curious whether your street is
              inside the batch, read{' '}
              <Link href="/service-area/" className="text-brand-teal underline-offset-2 hover:underline">
                Service Area
              </Link>{' '}
              before you request a time.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-5 text-brand-gray font-body leading-relaxed">
            <h2 className="font-display text-3xl md:text-4xl text-brand-offwhite tracking-tight">
              Insurance, gear, and non-negotiables
            </h2>
            <p>
              Kai&apos;s Run operates as a licensed and insured mobile vendor — ask for a certificate of
              insurance if your HOA or property manager needs it on file. Harnessing is Julius K9 by default
              because the hardware is proven under working-dog loads; we still adjust fit like a climbing
              harness check — no loose buckles, no twisted webbing.
            </p>
            <p>
              Rabies vaccination and the digital waiver are not red tape; they are the fastest way to make
              sure we are not pushing exercise on a dog with a hidden contraindication. If your veterinarian
              wants a written clearance plan, we will honor it. Ready to talk numbers?{' '}
              <Link href="/pricing/" className="text-brand-teal underline-offset-2 hover:underline">
                Pricing
              </Link>{' '}
              lays out intros, bundles, memberships, and founding offers side by side.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Kai the Dog */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            THE ORIGINAL ATHLETE
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Meet Kai
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <KaiGallery images={kaiAboutImages} className="grid grid-cols-2 gap-3" />
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <div>
                <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-2">
                  BREED
                </p>
                <p className="text-brand-offwhite font-body text-lg">
                  Rhodesian Ridgeback Mix
                </p>
              </div>
              <div>
                <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-2">
                  ROLE
                </p>
                <p className="text-brand-offwhite font-body text-lg">
                  Mascot · Origin Dog · Content Star
                </p>
              </div>
              <div>
                <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-2">
                  STORY
                </p>
                <p className="text-brand-gray font-body leading-relaxed">
                  Kai is the dog who proved the thesis. Ridgeback mix stubbornness plus sporting-dog lungs
                  meant he could fake calm for ten minutes and then explode back into chaos once the leash
                  clipped on. The slatmill gave him a job with a beginning, middle, and end — not an endless
                  loop of half-tired. Today he is the reference dog on the truck: the one who shows nervous
                  newcomers that the surface moves, that stopping is allowed, and that the handler is not
                  going to wrestle them into speed. When owners ask &quot;will my dog ever look like
                  that?&quot; the honest answer is: they will look like the best-conditioned version of
                  themselves, not a carbon copy of Kai — and that is the point.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why We're Different */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            COMPARISON
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Why We&apos;re Different
          </motion.h2>

          <motion.div variants={fadeUp} className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-teal/30">
                  <th className="text-left py-4 px-4 text-brand-offwhite font-body font-medium text-sm md:text-base">
                    Attribute
                  </th>
                  <th className="text-center py-4 px-4 text-brand-gold font-display text-lg md:text-xl">
                    Kai&apos;s Run
                  </th>
                  <th className="text-center py-4 px-4 text-brand-gray font-body text-sm md:text-base">
                    Dog Walker
                  </th>
                  <th className="text-center py-4 px-4 text-brand-gray font-body text-sm md:text-base">
                    Doggy Daycare
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-brand-teal/10">
                    <td className="py-4 px-4 text-brand-offwhite font-body text-sm md:text-base">
                      {row.attribute}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-brand-teal font-body font-medium text-sm md:text-base">
                        {row.kaisRun}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-brand-gray font-body text-sm">
                      {row.walker}
                    </td>
                    <td className="py-4 px-4 text-center text-brand-gray font-body text-sm">
                      {row.daycare}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Signals */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            WHAT TO EXPECT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Professional Standards
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {trustSignals.map((signal, i) => (
              <div
                key={i}
                className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-6 flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0">{signal.icon}</span>
                <span className="text-brand-gray font-body leading-relaxed">
                  {signal.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight mb-6"
          >
            Book Your First Session
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg mb-10 max-w-2xl mx-auto"
          >
            Experience the difference structured conditioning makes — start with the intro, or scan{' '}
            <Link href="/faq/" className="text-brand-teal underline-offset-2 hover:underline">
              FAQs
            </Link>{' '}
            if you still have questions.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/book/" variant="primary" className="px-10 py-4" bookIntentSource="about-cta">
              Book Intro — $35
            </Button>
            <Button href="/pricing" variant="secondary" className="px-10 py-4">
              View All Pricing
            </Button>
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}
