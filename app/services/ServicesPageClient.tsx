'use client';

import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import SlatmillExplainer from '@/components/ui/SlatmillExplainer';

const services = [
  {
    id: 'intro',
    label: 'INTRO SESSION',
    title: 'Intro Session',
    price: '$35 one dog / $55 two dogs, same household',
    duration: '30–45 min',
    includes: [
      'Fitness assessment',
      'Personalized "Run Profile" card',
      'Progress photo texted',
      'Protein treat for your dog(s) after the session',
    ],
    bestFor: 'First-time clients, skeptical owners, proof-of-concept session',
    narrative:
      "The intro is not a sales pitch in disguise - it is a structured evaluation. We watch how your dog loads into the harness, how they respond to the moving surface, and how quickly they find a sustainable rhythm. You leave with a Run Profile card that captures baseline fitness notes, behavior cues we noticed, and a recommended cadence if you decide to continue.\n\nBecause we operate on routed schedules, the intro also confirms your address fits the day's geography without guessing. If the slatmill is not the right tool for your dog, we will tell you directly rather than pushing another package.",
  },
  {
    id: 'founding',
    label: 'LIMITED - 20 SPOTS',
    title: 'Founding Athlete',
    price: '$200 for 5 sessions ($40/session)',
    duration: '30–45 min per session',
    includes: [
      '5 full conditioning sessions',
      'Lowest rate ever offered',
      'Never available again',
    ],
    bestFor: 'Owners who want the lowest rate before Founding spots run out',
    narrative:
      "The Founding Athlete program is a one-time offer for the first 20 dogs through the door. Five sessions at $40 each effective - an introductory rate we will never offer again once these spots are gone.\n\nFounding Athletes get the same private session protocol as every other tier: warm-up, structured intervals, cool-down, and a photo plus recap after each visit. The difference is purely economic - you are betting on the service early, and we reward that with our best-ever per-session rate for this limited window only.",
  },
  {
    id: 'private',
    label: 'PRIVATE SESSION',
    title: 'Private Conditioning Session',
    price: '$70 one dog / $135 two dogs, same household',
    duration: '30–45 min per dog (up to 90 min for two dogs)',
    includes: [
      'Structured conditioning session, pay per visit',
      'Two dogs, same household = two individual sessions, back-to-back',
      'Same private session protocol every visit',
    ],
    bestFor: 'Owners who want a single session without a package',
    narrative:
      "A Private Conditioning Session is a single visit - no package, no commitment. One dog runs $70 for 30–45 minutes of structured work. Two dogs from the same household run $135 for two individual, back-to-back sessions in one visit - up to 45 minutes each, 90 minutes total. Every session runs the same protocol: warm-up, working sets, cool-down, and a photo plus recap texted within the hour.\n\nIf you already know your cadence, Session Packages lock in a lower per-session rate. If you want to test the water first, book a Private Conditioning Session.",
  },
  {
    id: 'packages',
    label: 'SESSION PACKAGES',
    title: 'Session Packages',
    price: '3-session $195 (1 dog) / $380 (2 dogs) · 5-session $300 (1 dog) / $580 (2 dogs)',
    duration: '30–45 min per session',
    includes: [
      'Prepaid session block at a lower per-session rate',
      'Two dogs, same household = one individual session per dog, every visit',
      'Same private session protocol every visit',
    ],
    bestFor: 'Owners locking in a cadence and a lower per-session rate',
    narrative:
      "Session Packages prepay a block of visits at a lower rate than paying one session at a time. Three sessions bring the rate to $65 each; five sessions bring it to $60 each. Two-dog households get a modest discount built into the two-dog package total - you are still booking one individual session per dog, back-to-back, every visit.\n\nPackages suit owners who already know the slatmill works for their dog and want to lock in savings without committing to a recurring membership.",
  },
];

const steps = [
  {
    number: '01',
    title: 'Book Online',
    description: 'Choose your session type and pick a time that works for you.',
  },
  {
    number: '02',
    title: 'We Come to You',
    description: 'Our mobile gym arrives at your driveway - no travel, no stress.',
  },
  {
    number: '03',
    title: 'Your Dog Runs',
    description: '30–45 minutes of structured conditioning. Photo + report texted after.',
  },
];

const protocols: { icon: string; text: ReactNode }[] = [
  {
    icon: '🦮',
    text: (
      <>
        <Link
          href="/equipment/julius-k9-idc-powerharness/"
          className="text-brand-teal-light underline-offset-2 hover:underline"
        >
          Julius-K9 IDC Powerharnesses
        </Link>{' '}
        provided (S/M/L) - or bring your own
      </>
    ),
  },
  { icon: '💉', text: 'Rabies vaccination required' },
  { icon: '🐕', text: 'Dogs 4 months and older' },
  { icon: '📝', text: 'Digital waiver completed before first session' },
  { icon: '📸', text: 'Photo + run report texted within 1 hour after session' },
];

export function ServicesPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal-light font-body text-sm tracking-[0.25em] uppercase mb-6"
          >
            SERVICES
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            Dog Conditioning Sessions - Destin, Fort Walton Beach &amp; Niceville FL
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Performance conditioning for high-drive dogs. Not dog walking. Not daycare.
            Structured athletic sessions - at your door. When you are ready to compare rates
            or lock a time, jump to{' '}
            <Link href="/pricing/" className="text-brand-teal-light underline-offset-2 hover:underline">
              pricing
            </Link>{' '}
            or{' '}
            <Link href="/book/" className="text-brand-teal-light underline-offset-2 hover:underline">
              booking
            </Link>
            .
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-brand-charcoal px-6 py-24 md:py-32">
        <SlatmillExplainer
          body={
            <p>
              Every session runs on a commercial slatmill - built for controlled pace, not backyard
              chaos.{' '}
              <Link href="/faq/" className="text-brand-teal-light underline-offset-2 hover:underline">
                See the full breakdown.
              </Link>
            </p>
          }
        />
      </section>

      {/* Service Details */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <div className="mx-auto max-w-7xl">
          <div className="min-w-0 flex-1 space-y-12">
            {services.map((service) => (
              <Fragment key={service.id}>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8 md:p-10"
                >
              <motion.p
                variants={fadeUp}
                className="text-brand-teal-light font-body text-xs tracking-[0.25em] uppercase mb-3"
              >
                {service.label}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl tracking-tight mb-4"
              >
                {service.title}
              </motion.h2>

              {service.price && (
                <motion.p
                  variants={fadeUp}
                  className="font-body text-lg font-medium mb-2 text-brand-gold"
                >
                  {service.price}
                </motion.p>
              )}

              <motion.p
                variants={fadeUp}
                className="text-brand-gray font-body text-sm mb-6"
              >
                {service.duration}
              </motion.p>

              {service.includes && (
                <motion.div variants={fadeUp} className="mb-6">
                  <p className="text-brand-offwhite font-body text-sm font-medium mb-3">
                    Includes:
                  </p>
                  <ul className="space-y-2">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-brand-gray font-body text-sm">
                        <span className="text-brand-teal-light mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.p variants={fadeUp} className="text-brand-gray font-body text-sm">
                <span className="text-brand-offwhite font-medium">Best for:</span>{' '}
                {service.bestFor}
              </motion.p>

              {'narrative' in service && service.narrative ? (
                <motion.div
                  variants={fadeUp}
                  className="mt-6 space-y-4 border-t border-brand-teal/15 pt-6 text-brand-gray font-body text-sm leading-relaxed"
                >
                  {String(service.narrative)
                    .split('\n\n')
                    .map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                </motion.div>
              ) : null}
                </motion.div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal-light font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-16"
          >
            Three Steps. Zero Hassle.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.number} variants={fadeUp} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-brand-teal rounded-full flex items-center justify-center">
                  <span className="font-display text-3xl text-brand-gold">{step.number}</span>
                </div>
                <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray font-body text-sm leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 text-brand-teal-light/40">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Session Protocol */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal-light font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            SESSION PROTOCOL
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            What to Know
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8"
          >
            <ul className="space-y-5">
              {protocols.map((protocol, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">{protocol.icon}</span>
                  <span className="text-brand-gray font-body leading-relaxed">
                    {protocol.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* What to Expect — session narrative */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-6 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal-light font-body text-sm tracking-[0.25em] uppercase text-center"
          >
            WHAT TO EXPECT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-display tracking-tight text-center text-brand-offwhite"
          >
            Inside a Kai&apos;s Run visit
          </motion.h2>
          <motion.p variants={fadeUp}>
            When the rig stops at your curb we level it, open climate control, and walk your dog through a
            short introduction to the sound of the slats and the feel of the belt underfoot. There is no
            crowd cheering them on - just clear cues, steady rewards, and a handler who reads pant, tail
            set, and foot placement the same way a track coach reads splits.
          </motion.p>
          <motion.p variants={fadeUp}>
            Warm-up is non-negotiable: a few minutes of loose-leash movement, figure eights, or controlled
            turns so tendons are awake before we ask for power. Working sets are intervals of self-paced
            trotting or running with planned micro-breaks for water and reset. Cool-down mirrors warm-up
            in reverse so the dog walks away loose instead of crated-tight.
          </motion.p>
          <motion.p variants={fadeUp}>
            After we pack up you receive a photo plus a plain-language recap - distance estimates when
            helpful, attitude notes, and what we would adjust next visit. That feedback loop is how owners
            see progress stack week over week instead of guessing from zoomies alone. If anything felt off,
            read the{' '}
            <Link href="/faq/" className="text-brand-teal-light underline-offset-2 hover:underline">
              FAQ
            </Link>{' '}
            or message us before the next booking.
          </motion.p>
          <motion.p variants={fadeUp}>
            Every session is{' '}
            <Link href="/how-we-record/" className="text-brand-teal-light underline-offset-2 hover:underline">
              recorded start to finish on two cameras
            </Link>{' '}
            for safety and progress tracking.
          </motion.p>
          <motion.p variants={fadeUp} className="text-center text-brand-offwhite">
            <Link href="/book/" className="text-brand-teal-light font-medium underline-offset-4 hover:underline">
              Book your intro
            </Link>{' '}
            ·{' '}
            <Link href="/pricing/" className="text-brand-teal-light font-medium underline-offset-4 hover:underline">
              View pricing
            </Link>
          </motion.p>
        </motion.div>
      </section>

      {/* Tired Dog Guarantee */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeUp}
            className="bg-brand-black border-2 border-brand-gold rounded-xl p-10 md:p-14"
          >
            <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-4">
              OUR PROMISE
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              The Tired Dog Guarantee
            </h2>
            <p className="text-brand-gray font-body text-lg leading-relaxed max-w-2xl mx-auto">
              Every dog will be noticeably tired or we work with them on the next session at no charge.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
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
            Ready to Run?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg mb-10"
          >
            Book your intro session and see the difference structured conditioning makes.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/book/" variant="primary" className="px-10 py-4" bookIntentSource="services-cta">
              Book a Session
            </Button>
            <Button href="/pricing" variant="secondary" className="px-10 py-4">
              View Pricing
            </Button>
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}
