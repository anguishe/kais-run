'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger, scaleIn } from '@/lib/variants';
import KaiGallery, { type KaiImage } from '@/components/ui/KaiGallery';

const galleryImages: KaiImage[] = [
  {
    src: '/images/kai/kai-running-toward-camera.webp',
    alt: 'Kai, a Rhodesian Ridgeback mix, running at full stride across the grass',
  },
  {
    src: '/images/kai/kai-looking-up.webp',
    alt: 'Kai mid-turn with his tongue out, looking up at the camera',
  },
  {
    src: '/images/kai/kai-trail-profile.webp',
    alt: 'Kai moving along a coastal hedge line in profile',
  },
  {
    src: '/images/kai/kai-coastal-trail.webp',
    alt: 'Kai working a shaded Emerald Coast trail',
  },
  {
    src: '/images/kai/kai-mid-stride.webp',
    alt: 'Kai mid-stride with a front paw lifted and ears back',
  },
  {
    src: '/images/kai/kai-golden-light.webp',
    alt: 'Kai walking into late-day light along the treeline',
  },
];

export function KaiGallerySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-black px-6 py-24 md:py-32">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeUp}
          className="mb-4 text-center font-body text-sm uppercase tracking-[0.25em] text-brand-teal"
        >
          Meet Kai
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mx-auto mb-6 max-w-3xl text-center font-display text-5xl tracking-tight md:text-6xl"
        >
          All engine, no off switch
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-14 max-w-2xl text-center font-body leading-relaxed text-brand-gray"
        >
          Kai is the Rhodesian Ridgeback mix this whole thing is named after — high drive, no quit,
          the exact dog structured conditioning was built for. No studio, no staging. Just the
          original athlete on the Emerald Coast.
        </motion.p>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            variants={scaleIn}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-brand-teal/15 bg-brand-charcoal"
          >
            {reduceMotion ? (
              <img
                src="/images/kai/kai-loop-poster.webp"
                alt="Kai running toward the camera at full stride"
                width={720}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/kai/kai-loop-poster.webp"
                aria-label="Looping clip of Kai running toward the camera"
              >
                <source src="/videos/kai-loop.webm" type="video/webm" />
                <source src="/videos/kai-loop.mp4" type="video/mp4" />
              </video>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center md:text-left">
            <p className="font-body leading-relaxed text-brand-gray">
              Every clip here is Kai — not a stock dog, not a staged demo. He went from chewing
              through the house to sleeping hard after a run. That is the whole idea: give a
              high-drive dog a real job, and the rest of the day gets easier.
            </p>
            <p className="mt-5 font-body leading-relaxed text-brand-gray">
              The same structured conditioning is what we bring to your driveway.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/book/?offer=founding#founding-checkout"
                className="rounded bg-brand-teal px-6 py-3 font-display text-lg tracking-wider text-brand-offwhite hover:opacity-90"
              >
                Claim a Founding Spot
              </Link>
              <Link
                href="/about/"
                className="font-body text-brand-teal underline-offset-2 hover:underline"
              >
                Read Kai&apos;s full story →
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-14">
          <KaiGallery images={galleryImages} />
        </motion.div>
      </motion.div>
    </section>
  );
}
