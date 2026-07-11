'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { RonzeilAffiliateCta } from '@/components/ui/RonzeilAffiliateCta';
import { faqItems } from './faq-items';

export function RonzeilSlatmillPageClient() {
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
            Ronzeil Large Slatmill
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            One machine rides to every dog we condition - the Ronzeil Large Slatmill. Self-powered,
            assembled solo from the kit, and the reason a Kai&apos;s Run session runs the same in your
            driveway as it would in a gym.
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
          className="max-w-3xl mx-auto"
        >
          <img
            src="/images/equipment/ronzeil-slatmill/kai-with-ronzeil-slatmill-hero.webp"
            alt="Kai the Rhodesian Ridgeback mix inspecting the Ronzeil Large Slatmill during final assembly"
            width={1013}
            height={1800}
            className="w-full rounded-xl border border-brand-teal/15"
          />
          <figcaption className="mt-3 text-center font-body text-xs tracking-wide text-brand-gray/80">
            Kai sizing up the Ronzeil during final assembly - the mill the business is built around.
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
              <dt className="text-brand-offwhite font-medium">Type</dt>
              <dd>Self-powered slatmill</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Size</dt>
              <dd>Large</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Belt</dt>
              <dd>Independent slats</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Safety</dt>
              <dd>Plexiglass guard rails</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Tracking</dt>
              <dd>Built-in pedometer</dd>
            </div>
            <div>
              <dt className="text-brand-offwhite font-medium">Origin</dt>
              <dd>Assembled solo in about an hour</dd>
            </div>
          </dl>
        </motion.div>
      </section>

      {/* What is it - answer first */}
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
            What is the Ronzeil Large Slatmill
          </motion.h2>
          <motion.p variants={fadeUp}>
            The Ronzeil Large Slatmill is a self-powered treadmill built for dogs. No motor, no cord,
            no preset speed. The belt is a run of independent slats that roll only when the dog drives
            them, which makes the dog the engine and the throttle at the same time.
          </motion.p>
        </motion.div>
      </section>

      {/* Why we run it */}
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
            Why we run it
          </motion.h2>
          <motion.p variants={fadeUp}>
            A motorized treadmill sets the pace and the dog complies. A slatmill flips that. The dog
            owns the speed, the effort, and the stop. Gait stays natural because nothing drags the
            feet backward. For a high-drive dog, that is the difference between working and enduring.
          </motion.p>
          <motion.p variants={fadeUp}>
            It is also why this machine can travel - self-powered means it runs the same in your
            driveway as it does in a gym. Kai&apos;s Run is{' '}
            <Link href="/services/" className="text-brand-teal-light underline-offset-2 hover:underline">
              private, one-on-one mobile conditioning
            </Link>
            , and the mill is what makes that promise physically possible.
          </motion.p>
        </motion.div>
      </section>

      {/* Built solo from the kit */}
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
            Built solo from the kit
          </motion.h2>
          <motion.p variants={fadeUp}>
            This mill arrived as a Ronzeil kit, every part boxed and accounted for. I built it solo
            in about an hour, put the legs on wrong three times, and documented every minute of it.
            The{' '}
            <Link
              href="/blog/ronzeil-slatmill-build/"
              className="text-brand-teal-light underline-offset-2 hover:underline"
            >
              full story and the build video
            </Link>{' '}
            live on the blog.
          </motion.p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-8"
          >
            How it is built
          </motion.h2>
          <motion.ul
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-brand-gray font-body leading-relaxed"
          >
            <li>
              <span className="text-brand-offwhite font-medium">Plexiglass guard rails.</span>{' '}
              They keep the dog centered without closing off sightlines. The dog sees me the whole
              session, I see the full stride, and nobody drifts toward an edge.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Built-in pedometer.</span>{' '}
              Every session ends with a number. Distance becomes a log, the log becomes a
              progression, and conditioning stops being a feeling and starts being a record.
            </li>
            <li>
              <span className="text-brand-offwhite font-medium">Slat belt.</span>{' '}
              Independent slats roll with the paw strike instead of grabbing it. Quieter underfoot
              and kinder on joints than a continuous carpet belt.
            </li>
          </motion.ul>
        </motion.div>
      </section>

      {/* Who it is for */}
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
            Who it is for
          </motion.h2>
          <motion.p variants={fadeUp}>
            High-drive dogs that need structured output. Working breeds between jobs. Athletes in the
            off-season. Companion dogs whose walks stopped being enough. If the dog has an engine, the
            mill gives it a road.
          </motion.p>
        </motion.div>
      </section>

      {/* Affiliate */}
      <section className="py-20 md:py-28 px-6 bg-brand-charcoal">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <RonzeilAffiliateCta />
        </motion.div>
      </section>

      {/* How sessions use it */}
      <section className="py-20 md:py-28 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <motion.div
            variants={fadeUp}
            className="space-y-5 text-brand-gray font-body text-base md:text-lg leading-relaxed"
          >
            <h2 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite">
              How sessions use it
            </h2>
            <p>
              Every Kai&apos;s Run session runs on this exact machine. It rides to your driveway, your
              dog meets it on his own terms, and we build from a walk to a working trot at whatever
              pace the dog sets.
            </p>
          </motion.div>
          <motion.figure variants={fadeUp}>
            <img
              src="/images/equipment/ronzeil-slatmill/kai-with-ronzeil-slatmill-3.webp"
              alt="Ronzeil Large Slatmill slat belt and safety arch in the Kai's Run garage"
              width={1013}
              height={1800}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-brand-teal/15"
            />
          </motion.figure>
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
            Slatmill questions, answered
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
            The mill comes to you
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Rather have the mill come to you - that is the entire business. Book an Intro Session and
            your dog meets the Ronzeil on his own terms.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book/"
              className="bg-brand-teal text-white px-8 py-3 font-medium tracking-wide hover:shadow-[0_0_20px_rgba(10,92,82,0.5)] transition-all duration-300 rounded-sm"
            >
              Book an Intro Session
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Sources */}
      <section className="py-16 px-6 bg-brand-charcoal border-t border-brand-teal/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-xl tracking-wider text-brand-offwhite mb-4">Sources</h2>
          <ul className="space-y-2 text-brand-gray font-body text-sm leading-relaxed">
            <li>
              Ronzeil - slatmill product information:{' '}
              <a
                href="https://www.ronzeil.com/"
                target="_blank"
                rel="nofollow noopener"
                className="text-brand-teal-light underline-offset-2 hover:underline break-words"
              >
                ronzeil.com
              </a>
            </li>
          </ul>
          <p className="mt-6 text-brand-gray/70 font-body text-xs leading-relaxed">
            Kai&apos;s Run is a Ronzeil affiliate. Purchases through our link earn us a commission at
            no extra cost to you.
          </p>
        </div>
      </section>
    </>
  );
}
