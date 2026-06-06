'use client';

import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { FOUNDING_SPOTS_REMAINING, FOUNDING_SPOTS_TOTAL } from '@/lib/constants';

type FoundingSpots = {
  total: number;
  remaining: number;
};

const standardTiers = [
  {
    id: 'intro',
    label: 'INTRO SESSION',
    title: 'Intro Session',
    price: '$35 one dog / $55 two dogs, same household',
    tagline: 'Your first session. Includes fitness assessment.',
    duration: '30–45 min session',
    includes: [
      'Fitness assessment',
      'Personalized "Run Profile" card',
      'Progress photo texted to owner',
    ],
    bestFor: 'First-time clients, proof-of-concept session',
  },
  {
    id: 'standard',
    label: 'STANDARD SESSION',
    title: 'Standard Session',
    comingSoon: true,
    duration: '30–45 min session',
    includes: [
      'Structured conditioning session',
      'Walk-up booking when available',
      'Same private session protocol',
    ],
    bestFor: 'Returning clients after the Founding Athlete program closes',
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
    question: 'When will standard session pricing be announced?',
    answer: 'Standard walk-up pricing will be announced after the Founding Athlete program closes. Intro sessions and Founding Athlete spots are available now.',
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
  const [spots, setSpots] = useState<FoundingSpots>({
    total: FOUNDING_SPOTS_TOTAL,
    remaining: FOUNDING_SPOTS_REMAINING,
  });

  useEffect(() => {
    fetch('/data/config.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load spots config');
        return res.json();
      })
      .then((data: { foundingSpots?: { total?: number; remaining?: number } }) => {
        const fs = data.foundingSpots;
        setSpots({
          total: fs?.total ?? FOUNDING_SPOTS_TOTAL,
          remaining: fs?.remaining ?? FOUNDING_SPOTS_REMAINING,
        });
      })
      .catch(() => {
        setSpots({ total: FOUNDING_SPOTS_TOTAL, remaining: FOUNDING_SPOTS_REMAINING });
      });
  }, []);

  const { total: TOTAL_SPOTS, remaining: SPOTS_REMAINING } = spots;
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
      'Limited to 20 dogs',
      'Never offered again',
    ],
    highlight: SPOTS_REMAINING === 0 ? 'SOLD OUT' : `${SPOTS_REMAINING} of ${TOTAL_SPOTS} remaining`,
    highlightColor: SPOTS_REMAINING === 0 ? 'text-brand-gray' : 'text-brand-gold',
    disabled: SPOTS_REMAINING === 0,
  };

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
            Intro sessions from $35. Founding Athlete: $200 for 5 sessions — limited to 20 dogs.
            Standard walk-up pricing coming soon.
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
              SESSION OPTIONS
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl font-display tracking-tight"
            >
              Current Pricing
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
                  className={`bg-brand-black border rounded-xl p-8 flex flex-col ${
                    tier.comingSoon
                      ? 'border-brand-gray/30 opacity-90'
                      : 'border-brand-teal/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-brand-teal font-body text-xs tracking-[0.25em] uppercase">
                      {tier.label}
                    </p>
                    {tier.comingSoon && (
                      <span className="inline-flex items-center rounded-full border border-brand-gray/40 bg-brand-charcoal px-3 py-1 text-brand-gray font-body text-xs tracking-wider uppercase">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl tracking-tight text-brand-offwhite mb-4">
                    {tier.title}
                  </h3>

                  {'tagline' in tier && tier.tagline && (
                    <p className="text-brand-gray font-body text-sm mb-4">
                      {tier.tagline}
                    </p>
                  )}

                  {'price' in tier && tier.price && (
                    <p className="text-brand-gold font-body text-lg font-medium mb-2">
                      {tier.price}
                    </p>
                  )}

                  {tier.comingSoon && (
                    <p className="text-brand-gray font-body text-lg font-medium mb-2 italic">
                      Pricing coming soon
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

                  <p className="text-brand-gray font-body text-sm mb-6">
                    <span className="text-brand-offwhite font-medium">Best for:</span>{' '}
                    {tier.bestFor}
                  </p>

                  {!tier.comingSoon && (
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
            <FaqAccordion items={faqItems} emitSchema={false} />
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
