'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import {
  SERVICE_CITY_PAGES,
  getServiceCityPath,
} from '@/lib/service-area/cities';

const secondaryLocations = [
  {
    city: 'Miramar Beach',
    state: 'FL',
    href: '/service-area/miramar-beach/',
    description:
      'Serving Miramar Beach from Scenic 98 to the Grand Boulevard corridor — Maravilla, Silver Sands, and the beach road. Same private mobile protocol as our primary cities.',
  },
  {
    city: 'Sandestin',
    state: 'FL',
    href: '/service-area/sandestin/',
    description:
      'Baytowne, Dunes, Links, and Burnt Pine — we route to Sandestin resort communities for owners who want structured conditioning without leaving the property search for a facility.',
  },
  {
    city: 'Shalimar',
    state: 'FL',
    href: null,
    description:
      'Shalimar Point, Eglin Parkway access, and the greater north-side corridor. Routed alongside Fort Walton Beach and Niceville visits.',
  },
];

export function ServiceAreaPageClient() {
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
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-6"
          >
            SERVICE AREA
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            WE COME TO YOU.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Kai&apos;s Run covers the Emerald Coast from Destin to Niceville — mobile slatmill
            conditioning at your driveway. No facility. No commute. Pick your city below for
            local details, neighborhoods, and booking.
          </motion.p>
        </motion.div>
      </section>

      {/* Primary city landing pages */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            Primary Cities
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl tracking-tight text-center mb-12"
          >
            Mobile Dog Gym by City
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_CITY_PAGES.map((city) => (
              <motion.div
                key={city.slug}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <motion.div
                  variants={fadeUp}
                  className="flex h-full flex-col bg-brand-black border border-brand-teal/20 rounded-xl p-8"
                >
                  <h3 className="font-display text-3xl tracking-tight mb-3">
                    {city.name}, {city.state}
                  </h3>
                  <p className="text-brand-gray font-body text-sm leading-relaxed mb-6 flex-1">
                    {city.hubTeaser}
                  </p>
                  <p className="text-brand-gray/80 font-body text-xs mb-6">
                    {city.neighborhoods.join(' · ')}
                  </p>
                  <Link
                    href={getServiceCityPath(city.slug)}
                    className="inline-flex items-center font-body text-sm font-medium text-brand-teal hover:text-brand-offwhite transition-colors"
                  >
                    Mobile dog gym in {city.name} →
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary coverage */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <p className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-4">
              Also Serving
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Emerald Coast &amp; Okaloosa County
            </h2>
          </div>

          {secondaryLocations.map((location) => (
            <motion.div
              key={location.city}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div
                variants={fadeUp}
                className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8 md:p-10"
              >
                <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
                  {location.city}, {location.state}
                </h3>
                <p className="text-brand-gray font-body text-base md:text-lg leading-relaxed mb-4">
                  {location.description}
                </p>
                {location.href && (
                  <Link
                    href={location.href}
                    className="inline-flex items-center font-body text-sm font-medium text-brand-teal hover:text-brand-offwhite transition-colors"
                  >
                    Mobile dog gym in {location.city} →
                  </Link>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Routing Note */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="bg-brand-black border border-brand-teal/30 rounded-xl p-8 md:p-10 text-center"
          >
            <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-4">
              HOW WE SCHEDULE
            </p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-6">
              Route-Based Scheduling
            </h2>
            <p className="text-brand-gray font-body text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              We route geographically to maximize efficiency and availability. Book online and we&apos;ll
              confirm your area is available for your chosen time slot. Most addresses are confirmed
              within 2 hours of booking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/book/" variant="primary" className="px-10 py-4" bookIntentSource="service-area-cta">
                Book Your Session
              </Button>
              <a
                href="tel:8502185855"
                className="text-brand-teal font-body hover:text-brand-teal/80 transition-colors"
              >
                Call or text: 850-218-5855
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Not Sure CTA */}
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
            className="text-4xl md:text-5xl font-display tracking-tight mb-6"
          >
            Not Sure If We Cover Your Address?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg mb-8"
          >
            We&apos;re expanding coverage regularly. If your city isn&apos;t listed, reach out — we may already
            serve your area or can add you to our expansion waitlist.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="tel:8502185855"
              className="inline-block bg-brand-teal text-white px-10 py-4 font-medium text-base tracking-wide transition-colors hover:bg-brand-teal/90"
            >
              Call or Text: 850-218-5855
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
