'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import FAQAccordion from '@/components/ui/FAQAccordion';
// Match SpotsCounter value
const SPOTS_REMAINING: number = 20;
const TOTAL_SPOTS: number = 20;
const sold = TOTAL_SPOTS - SPOTS_REMAINING;
const pct = (sold / TOTAL_SPOTS) * 100;

const foundingTier = {
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
};

const standardTiers = [
  {
    id: 'intro',
    label: 'INTRO SESSION',
    title: "Kai's Run Welcome",
    price: '$35 one dog / $55 two dogs',
    duration: '30–45 min session',
    includes: [
      'Fitness assessment',
      'Personalized "Run Profile" card',
      'Progress photo texted to owner',
    ],
    bestFor: 'First-time clients, proof-of-concept session',
  },
  {
    id: 'ondemand',
    label: 'ON-DEMAND PERFORMANCE SESSION',
    title: 'Performance Session',
    price: '$65 one dog / $85 two dogs',
    duration: '30–45 min session',
    includes: [
      'No commitment required',
      'Walk-up rate',
      'Book anytime',
    ],
    bestFor: 'Owners who want flexibility without a package commitment',
  },
  {
    id: 'bundles',
    label: 'SESSION BUNDLES',
    title: 'Session Bundles',
    duration: '30–45 min per session · Sessions never expire · No commitment',
    tiers: [
      {
        id: 'bundle-4',
        name: '4-Session Pack',
        price: '$220 one dog / $300 two dogs',
        perSession: '$55/$75 per session — save $40',
      },
      {
        id: 'bundle-8',
        name: '8-Session Pack',
        price: '$400 one dog / $560 two dogs',
        perSession: '$50/$70 per session — best value',
      },
    ],
    bestFor: 'Consistent conditioning without monthly commitment',
  },
  {
    id: 'memberships',
    label: 'MONTHLY MEMBERSHIPS',
    title: 'Monthly Memberships',
    duration: 'Cancel anytime with 30-day notice',
    tiers: [
      {
        id: 'coastal',
        name: 'Coastal Member',
        subtitle: 'Bi-weekly (2×/month)',
        price: '$120/mo one dog / $170/mo two dogs',
      },
      {
        id: 'emerald',
        name: 'Emerald Member',
        subtitle: 'Weekly (4×/month)',
        price: '$220/mo one dog / $300/mo two dogs',
        highlight: 'Priority booking window + 10% service add-on discount',
      },
    ],
    bestFor: 'Serious athletes who want consistent scheduling',
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
            Founding Athlete spots are limited — then standard rates apply. Intro sessions from $35,
            performance from $65, bundles, and memberships below. Transparent pricing, no surprises.
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

      {/* Founding Athlete */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 max-w-lg mx-auto gap-6"
          >
            <motion.div
              variants={fadeUp}
              className={`bg-brand-charcoal border rounded-xl p-6 flex flex-col ${
                foundingTier.disabled ? 'border-brand-gray/20 opacity-60' : 'border-brand-gold/50'
              }`}
            >
              <p className="text-brand-teal font-body text-xs tracking-[0.2em] uppercase mb-2">
                {foundingTier.label}
              </p>
              <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-4">
                {foundingTier.name}
              </h3>

              <div className="mb-4">
                <span className="font-display text-4xl text-brand-gold">{foundingTier.price}</span>
                <span className="text-brand-gray font-body text-sm ml-2">{foundingTier.unit}</span>
              </div>

              <p className="text-brand-gray font-body text-xs mb-6">
                {foundingTier.perSession}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {foundingTier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-brand-gray font-body text-sm">
                    <span className="text-brand-teal mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {foundingTier.highlight && (
                <p className={`font-body text-xs tracking-wider uppercase mb-4 ${foundingTier.highlightColor || 'text-brand-teal'}`}>
                  {foundingTier.highlight}
                </p>
              )}

              <Button
                href={foundingTier.disabled ? undefined : `/book?tier=${foundingTier.id}`}
                variant="primary"
                className={`text-center w-full ${foundingTier.disabled ? 'pointer-events-none opacity-50' : ''}`}
                bookIntentSource={foundingTier.disabled ? undefined : `pricing-tier-${foundingTier.id}`}
              >
                {foundingTier.disabled ? 'Sold Out' : 'Select'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Standard Pricing */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mb-12 text-center md:text-left"
          >
            <motion.p
              variants={fadeUp}
              className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase mb-4"
            >
              STANDARD RATES
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl font-display tracking-tight"
            >
              All Pricing Tiers
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {standardTiers.map((tier) => (
              <Fragment key={tier.id}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className={`bg-brand-black border border-brand-teal/20 rounded-xl p-8 flex flex-col ${
                    tier.id === 'bundles' || tier.id === 'memberships' ? 'lg:col-span-2' : ''
                  }`}
                >
                  <p className="text-brand-teal font-body text-xs tracking-[0.25em] uppercase mb-3">
                    {tier.label}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-4">
                    {tier.title}
                  </h3>

                  {'price' in tier && tier.price && (
                    <p className="text-brand-gold font-body text-lg font-medium mb-2">
                      {tier.price}
                    </p>
                  )}

                  <p className="text-brand-gray font-body text-sm mb-6">
                    {tier.duration}
                  </p>

                  {'includes' in tier && tier.includes && (
                    <div className="mb-6">
                      <p className="text-brand-offwhite font-body text-sm font-medium mb-3">
                        Includes:
                      </p>
                      <ul className="space-y-2">
                        {tier.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-brand-gray font-body text-sm">
                            <span className="text-brand-teal mt-1">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {'tiers' in tier && tier.tiers && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {tier.tiers.map((subTier) => (
                        <div
                          key={subTier.id}
                          className="bg-brand-charcoal/50 border border-brand-teal/10 rounded-lg p-5 flex flex-col"
                        >
                          <p className="text-brand-offwhite font-body font-medium mb-1">
                            {subTier.name}
                          </p>
                          {'subtitle' in subTier && subTier.subtitle && (
                            <p className="text-brand-gray font-body text-xs mb-2">
                              {subTier.subtitle}
                            </p>
                          )}
                          <p className="text-brand-gold font-body text-sm mb-1">
                            {subTier.price}
                          </p>
                          {'perSession' in subTier && subTier.perSession && (
                            <p className="text-brand-gray font-body text-xs mb-4">
                              {subTier.perSession}
                            </p>
                          )}
                          {'highlight' in subTier && subTier.highlight && (
                            <p className="text-brand-teal font-body text-xs mb-4">
                              {subTier.highlight}
                            </p>
                          )}
                          <Button
                            href={`/book?tier=${subTier.id}`}
                            variant="secondary"
                            className="text-center w-full mt-auto"
                            bookIntentSource={`pricing-tier-${subTier.id}`}
                          >
                            Book
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-brand-gray font-body text-sm mb-6">
                    <span className="text-brand-offwhite font-medium">Best for:</span>{' '}
                    {tier.bestFor}
                  </p>

                  {!('tiers' in tier && tier.tiers) && (
                    <Button
                      href={`/book?tier=${tier.id}`}
                      variant="secondary"
                      className="text-center w-full mt-auto"
                      bookIntentSource={`pricing-tier-${tier.id}`}
                    >
                      Book
                    </Button>
                  )}
                </motion.div>
              </Fragment>
            ))}
          </div>
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
              href="/book/"
              variant="primary"
              className="px-12 py-5 text-base"
              bookIntentSource="pricing-footer-cta"
            >
              Book Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}
