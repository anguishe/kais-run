'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import { FinalCTA } from '@/components/sections/FinalCTA';
import type { ServiceCityPage } from '@/lib/service-area/cities';

type CityServiceAreaClientProps = {
  city: ServiceCityPage;
};

export function CityServiceAreaClient({ city }: CityServiceAreaClientProps) {
  return (
    <>
      <section className="bg-brand-black px-6 pb-8 pt-28 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-10 font-body text-sm text-brand-gray">
            <Link href="/" className="text-brand-teal hover:text-brand-offwhite">
              Home
            </Link>
            <span className="mx-2 text-brand-gray/60">/</span>
            <Link href="/service-area/" className="text-brand-teal hover:text-brand-offwhite">
              Service Area
            </Link>
            <span className="mx-2 text-brand-gray/60">/</span>
            <span className="text-brand-offwhite/80">{city.name}</span>
          </nav>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 font-body text-sm uppercase tracking-[0.25em] text-brand-teal"
            >
              {city.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mb-8 font-display text-5xl tracking-tight md:text-7xl"
            >
              {city.h1}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-brand-gray md:text-xl"
            >
              Self-powered slatmill conditioning at your driveway — private sessions, climate-controlled
              mobile unit, one dog at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-black px-6 py-16 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="space-y-6 font-body text-base leading-relaxed text-brand-gray md:text-lg"
          >
            {city.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10 border-t border-brand-teal/15 pt-8 font-body text-sm text-brand-offwhite md:text-base"
          >
            <span className="font-medium text-brand-teal">{city.neighborhoodsLabel}:</span>{' '}
            {city.neighborhoods.join(' · ')}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-8 font-body text-sm text-brand-gray md:text-base">
            Compare{' '}
            <Link href="/services/" className="text-brand-teal underline-offset-2 hover:underline">
              session types and protocol
            </Link>
            , then{' '}
            <Link href="/book/" className="text-brand-teal underline-offset-2 hover:underline">
              book your intro online
            </Link>
            . View all{' '}
            <Link href="/service-area/" className="text-brand-teal underline-offset-2 hover:underline">
              Emerald Coast coverage
            </Link>
            .
          </motion.p>
        </motion.div>
      </section>

      <FinalCTA />
    </>
  );
}
