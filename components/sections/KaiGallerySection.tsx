'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger, scaleIn } from '@/lib/variants';
import KaiGallery, { type KaiImage } from '@/components/ui/KaiGallery';

const galleryImages: KaiImage[] = [
  {
    src: '/images/kai/kai-running-toward-camera.webp',
    thumb: '/images/kai/thumbs/kai-running-toward-camera-450.webp',
    alt: 'Kai, a Rhodesian Ridgeback mix, running at full stride across the grass',
  },
  {
    src: '/images/kai/kai-looking-up.webp',
    thumb: '/images/kai/thumbs/kai-looking-up-450.webp',
    alt: 'Kai mid-turn with his tongue out, looking up at the camera',
  },
  {
    src: '/images/kai/kai-trail-profile.webp',
    thumb: '/images/kai/thumbs/kai-trail-profile-450.webp',
    alt: 'Kai moving along a coastal hedge line in profile',
  },
  {
    src: '/images/kai/kai-coastal-trail.webp',
    thumb: '/images/kai/thumbs/kai-coastal-trail-450.webp',
    alt: 'Kai working a shaded Emerald Coast trail',
  },
  {
    src: '/images/kai/kai-mid-stride.webp',
    thumb: '/images/kai/thumbs/kai-mid-stride-450.webp',
    alt: 'Kai mid-stride with a front paw lifted and ears back',
  },
  {
    src: '/images/kai/kai-golden-light.webp',
    thumb: '/images/kai/thumbs/kai-golden-light-450.webp',
    alt: 'Kai walking into late-day light along the treeline',
  },
];

export function KaiGallerySection() {
  const reduceMotion = useReducedMotion();
  // Poster-first: the ~1.4 MB loop video is NOT fetched on page load (an
  // autoplaying <video> downloads on mount even below the fold). It mounts
  // only after the visitor taps play. Reduced-motion visitors keep the
  // static poster, same as before.
  const [playing, setPlaying] = useState(false);

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
          className="mb-4 text-center font-body text-sm uppercase tracking-[0.25em] text-brand-teal-light"
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
          Kai is the Rhodesian Ridgeback mix this whole thing is named after - high drive, no quit,
          the exact dog structured conditioning was built for. No studio, no staging. Just the
          original athlete on the Emerald Coast.
        </motion.p>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            variants={scaleIn}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-brand-teal/15 bg-brand-charcoal"
          >
            {playing && !reduceMotion ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/kai/kai-loop-poster.webp"
                aria-label="Looping clip of Kai running toward the camera"
              >
                <source src="/videos/kai-loop.webm" type="video/webm" />
                <source src="/videos/kai-loop.mp4" type="video/mp4" />
              </video>
            ) : (
              <>
                <img
                  src="/images/kai/kai-loop-poster.webp"
                  alt="Kai running toward the camera at full stride"
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {!reduceMotion && (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Play the clip of Kai running"
                    className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-black/60 text-brand-offwhite backdrop-blur-sm transition duration-300 group-hover:bg-brand-teal group-hover:scale-105">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-1 h-7 w-7"
                      >
                        <path d="M8 5.14v13.72c0 .9.98 1.45 1.74.98l10.3-6.86a1.15 1.15 0 0 0 0-1.96L9.74 4.16A1.15 1.15 0 0 0 8 5.14Z" />
                      </svg>
                    </span>
                    <span className="sr-only">Play clip</span>
                  </button>
                )}
              </>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="text-center md:text-left">
            <p className="font-body leading-relaxed text-brand-gray">
              Every clip here is Kai - not a stock dog, not a staged demo. He went from chewing
              through the house to sleeping hard after a run. That is the whole idea: give a
              high-drive dog a real job, and the rest of the day gets easier.
            </p>
            <p className="mt-5 font-body leading-relaxed text-brand-gray">
              The same structured conditioning is what Kai&apos;s Run will bring to your driveway. We are not taking dogs yet.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Link
                href="/book/"
                className="rounded bg-brand-teal px-6 py-3 font-display text-lg tracking-wider text-brand-offwhite hover:opacity-90"
              >
                Join the Launch List
              </Link>
              <Link
                href="/about/"
                className="font-body text-brand-teal-light underline-offset-2 hover:underline"
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
