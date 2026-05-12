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
  {
    id: 'intro',
    label: 'FIRST TIME',
    name: "Kai's Run Welcome",
    price: '$35',
    price2: '$55',
    unit: 'one dog',
    unit2: 'two dogs',
    perSession: '30–45 min',
    features: [
      'Fitness assessment',
      'Run Profile card',
      'Progress photo texted',
    ],
    highlight: null,
  },
  {
    id: 'single',
    label: 'ON-DEMAND',
    name: 'Performance Session',
    price: '$65',
    price2: '$85',
    unit: 'one dog',
    unit2: 'two dogs',
    perSession: '30–45 min',
    features: [
      'No commitment',
      'Book anytime',
      'Walk-up rate',
    ],
    highlight: null,
  },
  {
    id: '4pack',
    label: 'BUNDLE',
    name: '4-Pack',
    price: '$220',
    price2: '$300',
    unit: 'one dog',
    unit2: 'two dogs',
    perSession: '$55/$75 per session',
    features: [
      'Save $40 vs single sessions',
      'Sessions never expire',
      'Use anytime',
    ],
    highlight: null,
  },
  {
    id: '8pack',
    label: 'BEST VALUE',
    name: '8-Pack',
    price: '$400',
    price2: '$560',
    unit: 'one dog',
    unit2: 'two dogs',
    perSession: '$50/$70 per session',
    features: [
      'Save $120 vs single sessions',
      'Sessions never expire',
      'Maximum savings',
    ],
    highlight: 'Most Popular',
    highlightColor: 'text-brand-teal',
  },
  {
    id: 'coastal',
    label: 'MEMBERSHIP',
    name: 'Coastal Member',
    price: '$120',
    price2: '$170',
    unit: '/mo one dog',
    unit2: '/mo two dogs',
    perSession: 'Bi-weekly (2×/mo)',
    features: [
      'Consistent scheduling',
      'Cancel anytime (30-day notice)',
      'No session expiration',
    ],
    highlight: null,
  },
  {
    id: 'emerald',
    label: 'PREMIUM',
    name: 'Emerald Member',
    price: '$220',
    price2: '$300',
    unit: '/mo one dog',
    unit2: '/mo two dogs',
    perSession: 'Weekly (4×/mo)',
    features: [
      'Priority booking window',
      'Cancel anytime (30-day notice)',
      'Maximum conditioning results',
    ],
    highlight: 'Priority Booking',
    highlightColor: 'text-brand-gold',
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
            Choose the option that fits your dog's needs. No hidden fees, no surprises.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                variants={fadeUp}
                className={`bg-brand-charcoal border rounded-xl p-6 flex flex-col ${
                  tier.disabled
                    ? 'border-brand-gray/20 opacity-60'
                    : tier.id === 'founding'
                    ? 'border-brand-gold/50'
                    : tier.id === '8pack'
                    ? 'border-brand-teal/50'
                    : 'border-brand-teal/20'
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

                {'price2' in tier && tier.price2 && (
                  <div className="mb-4 -mt-2">
                    <span className="font-display text-2xl text-brand-gold/70">{tier.price2}</span>
                    <span className="text-brand-gray font-body text-sm ml-2">{tier.unit2}</span>
                  </div>
                )}

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
                  variant={tier.id === 'founding' || tier.id === '8pack' ? 'primary' : 'secondary'}
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

      {/* Snowbird Package */}
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
            className="bg-brand-black border border-brand-teal/30 rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1 text-center md:text-left">
              <p className="text-brand-teal font-body text-xs tracking-[0.25em] uppercase mb-3">
                SEASONAL SPECIAL
              </p>
              <h2 className="font-display text-4xl tracking-tight mb-4">
                Snowbird Package
              </h2>
              <p className="text-brand-gray font-body leading-relaxed mb-4">
                Visiting the Emerald Coast for the season? Get 5 sessions for $275 — valid October through April. 
                Book before you arrive and we'll have your dog running within 24 hours of your arrival.
              </p>
              <p className="text-brand-gold font-body text-lg font-medium">
                $275 for 5 sessions · Oct–Apr only
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                href="/book?tier=snowbird"
                variant="primary"
                className="px-8 py-4"
                bookIntentSource="pricing-snowbird"
              >
                Book Snowbird Package
              </Button>
            </div>
          </motion.div>
        </motion.div>
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
