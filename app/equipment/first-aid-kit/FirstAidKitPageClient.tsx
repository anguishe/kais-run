'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { faqItems } from './faq-items';

export function FirstAidKitPageClient() {
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
            The Gear
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl tracking-tight mb-8"
          >
            THE FIRST-AID KIT THAT RIDES ALONG
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            A stocked canine first-aid kit travels to every Kai&apos;s Run session. Here is what is
            in it, and why a conditioning service carries one in the first place.
          </motion.p>
        </motion.div>
      </section>

      {/* Hero image */}
      <section className="px-6 pb-8 bg-brand-black">
        <motion.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-4xl mx-auto"
        >
          <img
            src="/images/equipment/first-aid-kit-hero.webp"
            alt="Kai's Run canine first-aid kit, closed water-resistant case"
            width={1600}
            height={1000}
            fetchPriority="high"
            className="w-full rounded-xl border border-brand-teal/15"
          />
          <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
            The kit that rides with the equipment to every driveway.
          </figcaption>
        </motion.figure>
      </section>

      {/* Quick facts (AEO) */}
      <section className="py-12 px-6 bg-brand-charcoal">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto rounded-xl border border-brand-teal/20 bg-brand-charcoal p-6 md:p-8"
        >
          <p className="font-body text-sm uppercase tracking-[0.2em] text-brand-teal-light mb-5">
            Quick facts
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 font-body text-brand-gray leading-relaxed">
            <div>
              <dt className="text-brand-offwhite font-medium">What it is</dt>
              <dd>A full canine first-aid kit carried to every session</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Why it rides along</dt>
              <dd>Structured exercise is real physical work, and preparation is the baseline</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">What is inside</dt>
              <dd>
                Wound care, a digital thermometer, a soft muzzle, tick tools, trauma shears, a
                collapsible bowl and more
              </dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">When it is used</dt>
              <dd>The five-minute post-session cool-down and health check</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">What it is not</dt>
              <dd>A substitute for veterinary care. It covers first response, not treatment</dd>
            </div>
          </dl>
        </motion.div>
      </section>

      {/* What is in the kit */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
        >
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite">
              What is in a Kai&apos;s Run first-aid kit
            </h2>
            <p>
              The kit is built for the two things that actually come up in the field - wound care
              and a fast health check.
            </p>
            <ul className="space-y-3">
              <li>
                <span className="text-brand-offwhite font-medium">Wound care</span> - sterile gauze,
                roller and conforming bandages, adhesive bandages, alcohol prep pads, cotton swabs,
                medical tape, trauma shears and tweezers
              </li>
              <li>
                <span className="text-brand-offwhite font-medium">Health check</span> - a digital
                thermometer, a magnifier for splinters, thorns and ticks, and wooden tongue
                depressors
              </li>
              <li>
                <span className="text-brand-offwhite font-medium">Safe handling</span> - a soft
                muzzle, because a hurting dog, even the calmest one, can react on instinct, and a
                muzzle lets me help without making things worse
              </li>
              <li>
                <span className="text-brand-offwhite font-medium">Field extras</span> - a
                collapsible water bowl for the cool-down, a refillable spray bottle, a pill and
                organizer box, and a waste bag dispenser with refills
              </li>
              <li>
                <span className="text-brand-offwhite font-medium">And more</span> - the case is
                packed, and I keep it stocked between sessions
              </li>
            </ul>
            <p>Everything lives in a water-resistant zip case that rides with the equipment.</p>
          </motion.div>
          <motion.figure variants={fadeUp}>
            <img
              src="/images/equipment/first-aid-kit-contents.webp"
              alt="Full canine first-aid kit contents laid out - wound care, thermometer, muzzle, collapsible bowl and more"
              width={1400}
              height={1867}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
            <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
              The kit laid out - wound care, a thermometer, a soft muzzle, tools and field extras.
            </figcaption>
          </motion.figure>
        </motion.div>
      </section>

      {/* Why a conditioning service carries one */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Why a conditioning service carries one
          </motion.h2>
          <motion.p variants={fadeUp}>
            I ask dogs to do real physical work. A self-powered slatmill run raises a dog&apos;s
            heart rate and holds it there - that is the whole point, and it is also the honest reason
            a first-aid kit rides along. Structured exercise is far safer than a dog wearing itself
            out on hot pavement or bolting after something on a walk, but safer is not the same as
            nothing ever happens. A split pad, a scrape, a bug bite, a dog that got a little too
            warm - I would rather have the kit in arm&apos;s reach and never open it than need it
            once and not have it. Most services that come to your home do not think about this. I
            treat it as the baseline.
          </motion.p>
        </motion.div>
      </section>

      {/* The five-minute cool-down */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.figure variants={fadeUp} className="order-last md:order-first">
            <img
              src="/images/equipment/first-aid-kit-open.webp"
              alt="Kai's Run first-aid kit open, packed with wound-care supplies"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
            <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
              Open and packed - right there for the end-of-session check.
            </figcaption>
          </motion.figure>
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite">
              The five-minute cool-down
            </h2>
            <p>
              The kit is not decoration - it is part of how a session ends. After every run, your dog
              and I spend about five minutes on a cool-down. Water goes down, breathing comes back to
              normal, and I run a quick once-over - paws, gait, and temperature if anything seems off.
              It is how I confirm your dog handled the work well and settled before I hand the leash
              back. Most days the kit stays zipped. The point is that it is right there if it does
              not.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Where it rides */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            Where it rides
          </motion.h2>
          <motion.p variants={fadeUp}>
            The kit travels to every session with the rest of the equipment. As the mobile
            unit&apos;s interior comes together, it gets a dedicated, sealed spot in the trailer -
            stocked and in the same place every time, so I am never hunting for it mid-session.
          </motion.p>
        </motion.div>
      </section>

      {/* First aid is not veterinary care */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite"
          >
            First aid is not veterinary care
          </motion.h2>
          <motion.p variants={fadeUp}>
            A first-aid kit handles the first few minutes. It does not replace a veterinarian. If
            something is beyond a scrape, I stop the session, give first response from the kit, and
            contact you right away so you can decide on next steps. I do not transport dogs, so any
            veterinary visit is arranged by you. Kai&apos;s Run is not affiliated with GPUSFAK - the
            kit was bought retail and chosen because it covers the field basics well.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-8"
          >
            First-aid questions, answered
          </motion.h2>
          <motion.div variants={fadeUp}>
            {/* Schema emitted once from page.tsx (FAQPage #faq) - disable the accordion's copy */}
            <FaqAccordion items={faqItems} emitSchema={false} />
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
            className="font-display text-4xl md:text-6xl tracking-tight mb-6"
          >
            Ready when your dog is
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            If you want a real workout for your dog delivered to your driveway, with the preparation
            to back it up, start with an{' '}
            <Link href="/pricing/" className="text-brand-teal-light underline-offset-2 hover:underline">
              Intro Session
            </Link>{' '}
            or claim a spot in the{' '}
            <Link href="/pricing/" className="text-brand-teal-light underline-offset-2 hover:underline">
              Founding Athlete Program
            </Link>{' '}
            while they last. We serve Destin, Fort Walton Beach, Niceville and the surrounding coast.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book/"
              className="bg-brand-teal text-white px-8 py-3 font-medium tracking-wide hover:shadow-[0_0_20px_rgba(10,92,82,0.5)] transition-all duration-300 rounded-sm"
            >
              Book a session
            </Link>
            <Link
              href="/services/"
              className="border border-brand-teal/40 text-brand-offwhite px-8 py-3 font-medium tracking-wide hover:bg-brand-teal/10 transition-colors rounded-sm"
            >
              See how sessions work
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Kai sign-off */}
      <section className="py-12 px-6 bg-brand-charcoal border-t border-brand-teal/10">
        <p className="max-w-3xl mx-auto text-center font-body text-sm italic text-brand-gray/80 leading-relaxed">
          Kai says: I have never once needed the muzzle. I remain deeply offended it is in there. -
          Kai
        </p>
      </section>
    </>
  );
}
