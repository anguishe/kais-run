'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
const locations = [
  {
    city: 'Destin',
    state: 'FL',
    description:
      'Born and raised in Destin, we know the community. From Holiday Isle to Crystal Beach, ' +
      'Henderson Beach to the Destin Commons area — we bring the mobile gym directly to your driveway. ' +
      'High-drive dogs in Destin deserve more than a walk on the beach. They deserve structured conditioning, ' +
      'and we make it as easy as ordering a service.',
  },
  {
    city: 'Miramar Beach',
    state: 'FL',
    description:
      'Serving Miramar Beach from Scenic 98 to the Grand Boulevard corridor. Whether you\'re in the ' +
      'Maravilla neighborhood, near Silver Sands Premium Outlets, or along the beach road — your dog gets ' +
      'the same premium mobile service. No driving to a facility. No group chaos. Just structured slatmill ' +
      'conditioning delivered to your door.',
  },
  {
    city: 'Sandestin',
    state: 'FL',
    description:
      'We serve the entire Sandestin Golf and Beach Resort community — Baytowne, Dunes, Links, and Burnt Pine. ' +
      'Whether your dog is used to golf cart rides or paddle board adventures, we bring athletic conditioning ' +
      'that matches the lifestyle. Climate-controlled mobile unit, private one-on-one sessions, and the same ' +
      'premium experience you expect from Sandestin service providers.',
  },
  {
    city: 'Fort Walton Beach',
    state: 'FL',
    description:
      'Serving Fort Walton Beach and the surrounding communities near Eglin AFB and Hurlburt Field. ' +
      'We know military families move fast and need reliable, flexible services. From the Cinco Bayou area ' +
      'to Okaloosa Island, we route sessions geographically and offer 15% military discounts for active duty, ' +
      'reserves, and veterans. Your dog\'s conditioning shouldn\'t wait on PCS orders.',
  },
  {
    city: 'Niceville',
    state: 'FL',
    description:
      'From Bluewater Bay to Rocky Bayou, we bring mobile canine conditioning to Niceville and the surrounding ' +
      'Choctawhatchee Bay area. Niceville families value community and quality — that\'s why we offer private, ' +
      'one-dog-at-a-time sessions with Julius K9 professional harnesses and post-session photo reports. ' +
      'Book online and we\'ll confirm your Niceville address for same-day or next-day availability.',
  },
  {
    city: 'Shalimar',
    state: 'FL',
    description:
      'Serving Shalimar and the greater Eglin AFB area with mobile slatmill sessions designed for high-drive dogs. ' +
      'Whether you\'re near Shalimar Point or closer to Eglin Parkway, we route geographically to maximize availability. ' +
      'Military families receive 15% off all services — mention your status at booking. We come to you, your dog runs, ' +
      'and you get back to your day.',
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
            Mobile canine conditioning across the Emerald Coast. No facility. No commute. Just book online
            and we&apos;ll arrive at your driveway.
          </motion.p>
        </motion.div>
      </section>

      {/* Location Cards */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <div className="max-w-6xl mx-auto space-y-8">
          {locations.map((location) => (
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
                <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
                  {location.city}, {location.state}
                </h2>
                <p className="text-brand-gray font-body text-base md:text-lg leading-relaxed">
                  {location.description}
                </p>
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
