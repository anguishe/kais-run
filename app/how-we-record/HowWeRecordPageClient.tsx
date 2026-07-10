'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

type Section = { id: string; heading: string; body: ReactNode };

const sections: Section[] = [
  {
    id: 'safety',
    heading: 'Safety is the reason, not a feature',
    body: (
      <>
        When you hand your dog to someone for conditioning work, you should be able to see exactly what
        happened - not a summary, and not my word for it. So the cameras roll on every session, every
        time. If a dog ever moves wrong or has an off day, the record exists and we both have it -
        footage you could take to your vet if you ever needed to. It also keeps me honest and makes me
        better: I review my own sessions and catch things on the screen I can miss live. The same
        safety-first standard rides in the truck as gear - including a{' '}
        <Link href="/equipment/first-aid-kit/" className="text-brand-teal-light underline-offset-2 hover:underline">
          stocked canine first-aid kit
        </Link>{' '}
        for every session.
      </>
    ),
  },
  {
    id: 'angles',
    heading: 'Why two angles',
    body: "One camera lies to you. Point a single lens at a dog on the mill and you get a clean shot of the legs and the belt - and you miss the head, the ears, the tail, the tongue, the parts that actually tell you how the dog is doing. Two cameras, one on the gait and one on the whole animal, mean nobody is guessing.",
  },
  {
    id: 'rig',
    heading: 'The rig',
    body: "Right now I run two AKASO Brave 4 action cameras on every session, and a third is on the way. After that, the plan is a 360 camera and a wearable for the handler's-eye view. I use action cameras on purpose - they sit in waterproof housings, hold a wide enough frame to keep the whole dog and the whole mill in shot, mount to almost anything, and are affordable enough to run in multiples without driving up the cost of a session. This is the first piece of a recording setup that will keep growing.",
  },
  {
    id: 'work',
    heading: 'You can see the work',
    body: 'Fitness is hard to notice day to day - you live with your dog, so you miss the change. Line up week one against week five and you can watch it: the gait smooths out, the dog holds a working pace longer, it steps onto the mill like it owns the thing. The recording turns "he seems fitter" into something you can see. That is the point of doing this as structured, repeatable work instead of a random walk.',
  },
  {
    id: 'footage',
    heading: 'Your footage, your call',
    body: (
      <>
        It is your dog and your driveway. Consent to record - video and the cameras&apos; built-in
        audio - is spelled out in the{' '}
        <Link href="/book/" className="text-brand-teal-light underline-offset-2 hover:underline">
          session waiver
        </Link>{' '}
        before we start, because Florida is an all-party consent state for private conversations.
        Publishing anything with your dog in it publicly is a separate, opt-in yes. The default is
        that your footage stays private to you, and you can request clips or the fuller footage of
        your dog&apos;s sessions any time.
      </>
    ),
  },
  {
    id: 'open',
    heading: 'Building in the open',
    body: "I am also documenting the journey of building Kai's Run. Some sessions become content that shows people what this work really looks like - always with your permission, never by default.",
  },
];

const gallery = [
  { src: '/images/brave-4-rig-mounted.webp', alt: 'AKASO Brave 4 action camera mounted on the slatmill rig', width: 2200, height: 1358 },
  { src: '/images/brave-4-retail-kit.webp', alt: 'AKASO Brave 4 action camera retail kit', width: 2200, height: 1731 },
  { src: '/images/brave-4-full-kit.webp', alt: 'Full AKASO Brave 4 kit with mounts and housings', width: 2200, height: 1573 },
  { src: '/images/brave-4-kit-angle.webp', alt: 'AKASO Brave 4 camera and accessories at an angle', width: 2200, height: 1470 },
];

export function HowWeRecordPageClient() {
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
            Transparency
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            How We Record Every Session
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-offwhite font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Every Kai&apos;s Run session is filmed start to finish on two cameras, for one reason
            above all others - your dog&apos;s safety. The footage also lets you see the work and
            track real progress over the weeks.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto mt-16"
        >
          <img
            src="/images/how-we-record-hero.webp"
            alt="Two action cameras recording a dog conditioning session"
            width={2400}
            height={1260}
            fetchPriority="high"
            className="w-full h-auto rounded-xl border border-brand-teal/20"
          />
        </motion.div>
      </section>

      {/* Sections */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <div className="max-w-3xl mx-auto space-y-16">
          {sections.map((section) => (
            <div key={section.id}>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-4xl md:text-5xl tracking-tight mb-6 text-brand-offwhite"
                >
                  {section.heading}
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-brand-gray font-body text-base md:text-lg leading-relaxed"
                >
                  {section.body}
                </motion.p>
              </motion.div>

              {section.id === 'safety' && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mt-12"
                >
                  <img
                    src="/images/how-we-record-reveal-card.jpg"
                    alt="A recorded Kai's Run session shown on screen"
                    width={1080}
                    height={1350}
                    className="w-full max-w-md mx-auto h-auto rounded-xl border border-brand-teal/20"
                  />
                </motion.div>
              )}

              {section.id === 'rig' && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {gallery.map((img) => (
                    <motion.div
                      key={img.src}
                      variants={fadeUp}
                      className="overflow-hidden rounded-xl border border-brand-teal/20 aspect-[4/3]"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed"
          >
            <Link href="/book/" className="text-brand-teal-light underline-offset-2 hover:underline">
              Book an intro session
            </Link>
            , or ask about the Founding Athlete Program to make conditioning a regular part of your
            dog&apos;s routine. Serving Destin, Fort Walton Beach, Niceville, and the Emerald Coast.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-base"
          >
            See{' '}
            <Link href="/pricing/" className="text-brand-teal-light underline-offset-2 hover:underline">
              pricing
            </Link>{' '}
            or read the personal take on{' '}
            <Link
              href="/blog/why-we-record-every-session/"
              className="text-brand-teal-light underline-offset-2 hover:underline"
            >
              why we record every session
            </Link>
            .
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
