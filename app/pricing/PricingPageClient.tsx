'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

// Match SpotsCounter value
const SPOTS_REMAINING: number = 20;
const TOTAL_SPOTS: number = 20;
const sold = TOTAL_SPOTS - SPOTS_REMAINING;
const pct = (sold / TOTAL_SPOTS) * 100;

/** Pricing page currently surfaces only the Founding Athlete offer. */
const tiers = [
  {
    id: 'founding',
    label: 'LIMITED',
    name: 'Founding Athlete',
    price: '$200',
    unit: '5 sessions',
    perSession: '$40/session',
    features: [
      '5 full sessions',
      'Lowest rate ever offered',
      'Never available again',
    ],
    highlight: SPOTS_REMAINING === 0 ? 'SOLD OUT' : `${SPOTS_REMAINING} of ${TOTAL_SPOTS} remaining`,
    highlightColor: SPOTS_REMAINING === 0 ? 'text-brand-gray' : 'text-brand-gold',
    disabled: SPOTS_REMAINING === 0,
  },
];

const discounts = [
  {
    title: 'Military & Veterans',
    discount: '15% off',
    description: 'Active duty, reserves, and veterans (Eglin AFB, Hurlburt Field)',
  },
  {
    title: 'First Responders',
    discount: '10% off',
    description: 'Police, Fire, EMS',
  },
  {
    title: 'Teachers',
    discount: '10% off',
    description: 'All K-12 and higher education educators',
  },
];

const faqItems = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, Apple Pay, and Google Pay through Square. Payment is collected at time of booking or at the session for walk-ups.',
  },
  {
    question: 'Do session bundles expire?',
    answer: 'No, bundles never expire. Use them at your own pace — whether that\'s weekly or once a month.',
  },
  {
    question: 'Can I cancel my membership?',
    answer: 'Yes, memberships can be cancelled anytime with 30 days notice. No contracts, no cancellation fees.',
  },
  {
    question: 'What if my dog doesn\'t take to the slatmill?',
    answer: 'Every dog gets the Tired Dog Guarantee. If your dog isn\'t noticeably tired after a session, we\'ll work with them on the next session at no charge.',
  },
  {
    question: 'Do you offer discounts for multiple dogs?',
    answer: 'Yes, all our pricing includes options for two dogs from the same household at a reduced rate. Additional dogs beyond two can be discussed on a case-by-case basis.',
  },
];

export function PricingPageClient() {
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
            PRICING
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            Simple. Transparent.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            The Founding Athlete program is the offer we are running right now — transparent pricing, no surprises.
          </motion.p>
        </motion.div>
      </section>

      {/* Founding Athlete Banner */}
      {SPOTS_REMAINING > 0 && (
        <section className="bg-brand-charcoal py-8 px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p
              variants={fadeUp}
              className="font-display text-xl md:text-2xl tracking-wider text-brand-offwhite mb-4"
            >
              FOUNDING ATHLETE PROGRAM —{' '}
              <span className="text-brand-gold">{SPOTS_REMAINING} / {TOTAL_SPOTS}</span>{' '}
              SPOTS REMAINING
            </motion.p>

            <motion.div variants={fadeUp} className="w-full h-2 bg-brand-black rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-brand-teal rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              />
            </motion.div>

            <motion.p variants={fadeUp} className="text-brand-gray text-sm font-body">
              $200 for 5 sessions · This offer will never exist again
            </motion.p>
          </motion.div>
        </section>
      )}

      {/* Pricing Grid */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 max-w-lg mx-auto gap-6"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                variants={fadeUp}
                className={`bg-brand-charcoal border rounded-xl p-6 flex flex-col ${
                  tier.disabled ? 'border-brand-gray/20 opacity-60' : 'border-brand-gold/50'
                }`}
              >
                <p className="text-brand-teal font-body text-xs tracking-[0.2em] uppercase mb-2">
                  {tier.label}
                </p>
                <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-4">
                  {tier.name}
                </h3>

                <div className="mb-4">
                  <span className="font-display text-4xl text-brand-gold">{tier.price}</span>
                  <span className="text-brand-gray font-body text-sm ml-2">{tier.unit}</span>
                </div>

                <p className="text-brand-gray font-body text-xs mb-6">
                  {tier.perSession}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-brand-gray font-body text-sm">
                      <span className="text-brand-teal mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {tier.highlight && (
                  <p className={`font-body text-xs tracking-wider uppercase mb-4 ${tier.highlightColor || 'text-brand-teal'}`}>
                    {tier.highlight}
                  </p>
                )}

                <Button
                  href={tier.disabled ? undefined : `/book?tier=${tier.id}`}
                  variant={tier.id === 'founding' ? 'primary' : 'secondary'}
                  className={`text-center w-full ${tier.disabled ? 'pointer-events-none opacity-50' : ''}`}
                  bookIntentSource={tier.disabled ? undefined : `pricing-tier-${tier.id}`}
                >
                  {tier.disabled ? 'Sold Out' : 'Select'}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Discounts */}
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
            COMMUNITY DISCOUNTS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-4"
          >
            We Thank You
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-center mb-12"
          >
            Mention your status at booking to receive your discount.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {discounts.map((discount) => (
              <motion.div
                key={discount.title}
                variants={fadeUp}
                className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-6 text-center"
              >
                <p className="font-display text-3xl text-brand-gold mb-2">
                  {discount.discount}
                </p>
                <h3 className="font-display text-xl tracking-wider text-brand-offwhite mb-3">
                  {discount.title}
                </h3>
                <p className="text-brand-gray font-body text-sm">
                  {discount.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Referral Program */}
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
            className="bg-brand-black border border-brand-gold/30 rounded-xl p-8 md:p-10"
          >
            <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase text-center mb-3">
              REFERRAL PROGRAM
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-center mb-8">
              The Run Crew
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <p className="font-display text-5xl text-brand-gold mb-3">1</p>
                <p className="text-brand-offwhite font-body font-medium mb-2">Referral</p>
                <p className="text-brand-gray font-body text-sm">= 1 free add-on session</p>
              </div>
              <div className="p-4">
                <p className="font-display text-5xl text-brand-gold mb-3">3</p>
                <p className="text-brand-offwhite font-body font-medium mb-2">Referrals</p>
                <p className="text-brand-gray font-body text-sm">= 1 free single session</p>
              </div>
              <div className="p-4">
                <p className="font-display text-5xl text-brand-gold mb-3">5</p>
                <p className="text-brand-offwhite font-body font-medium mb-2">Referrals</p>
                <p className="text-brand-gray font-body text-sm">= 1 free month bi-weekly</p>
              </div>
            </div>

            <p className="text-brand-gray font-body text-sm text-center mt-8">
              Referral completes first paid session to count. Mention who referred you at booking.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Common Questions
          </motion.h2>

          <motion.div variants={fadeUp}>
            <FAQAccordion items={faqItems} />
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
            Ready to Get Started?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg mb-10"
          >
            Book your first session and experience the difference.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button
              href="/book"
              variant="primary"
              className="px-12 py-5 text-base"
              bookIntentSource="pricing-footer-cta"
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <ContactFormSection
        endpoint="https://formspree.io/f/mojrrvdd"
        tag="founding-20"
      />
    </>
  );
}
