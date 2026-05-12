'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

const services = [
  {
    id: 'intro',
    label: 'INTRO SESSION',
    title: "Kai's Run Welcome",
    price: '$35 one dog / $55 two dogs',
    duration: '30–45 min',
    includes: [
      'Fitness assessment',
      'Personalized "Run Profile" card',
      'Progress photo texted',
    ],
    bestFor: 'First-time clients, skeptical owners, proof-of-concept session',
  },
  {
    id: 'ondemand',
    label: 'ON-DEMAND',
    title: 'Performance Session',
    price: '$65 one dog / $85 two dogs',
    duration: '30–45 min',
    includes: [
      'No commitment required',
      'Walk-up rate',
      'Book anytime',
    ],
    bestFor: 'Owners who want flexibility without a package commitment',
  },
  {
    id: 'bundles',
    label: 'NEVER EXPIRE',
    title: 'Session Bundles',
    price: null,
    duration: '30–45 min per session',
    tiers: [
      {
        name: '4-Pack',
        price: '$220 one dog / $300 two dogs',
        perSession: '$55/$75 per session — save $40',
      },
      {
        name: '8-Pack',
        price: '$400 one dog / $560 two dogs',
        perSession: '$50/$70 per session — best value',
      },
    ],
    bestFor: 'Consistent conditioning without monthly commitment',
  },
  {
    id: 'memberships',
    label: 'PRIORITY BOOKING',
    title: 'Monthly Memberships',
    price: null,
    duration: 'Cancel anytime with 30-day notice',
    tiers: [
      {
        name: 'Coastal Member',
        subtitle: 'Bi-weekly (2×/mo)',
        price: '$120/mo one dog / $170/mo two dogs',
      },
      {
        name: 'Emerald Member',
        subtitle: 'Weekly (4×/mo)',
        price: '$220/mo one dog / $300/mo two dogs',
        highlight: 'Priority booking window',
      },
    ],
    bestFor: 'Serious athletes who want consistent scheduling',
  },
];

const steps = [
  {
    number: '01',
    title: 'Book Online',
    description: 'Choose your session type and pick a time that works for you.',
  },
  {
    number: '02',
    title: 'We Come to You',
    description: 'Our mobile gym arrives at your driveway — no travel, no stress.',
  },
  {
    number: '03',
    title: 'Your Dog Runs',
    description: '30–45 minutes of structured conditioning. Photo + report texted after.',
  },
];

const protocols = [
  { icon: '🦮', text: 'Julius K9 harnesses provided (S/M/L) — or bring your own' },
  { icon: '💉', text: 'Rabies vaccination required' },
  { icon: '🐕', text: 'Dogs 4 months and older' },
  { icon: '📝', text: 'Digital waiver completed before first session' },
  { icon: '📸', text: 'Photo + run report texted within 1 hour after session' },
];

export function ServicesPageClient() {
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
            SERVICES
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            WHAT WE DO
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Performance conditioning for high-drive dogs. Not dog walking. Not daycare.
            Structured athletic sessions — at your door.
          </motion.p>
        </motion.div>
      </section>

      {/* Service Details */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <div className="max-w-5xl mx-auto space-y-12">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8 md:p-10"
            >
              <motion.p
                variants={fadeUp}
                className="text-brand-teal font-body text-xs tracking-[0.25em] uppercase mb-3"
              >
                {service.label}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl tracking-tight mb-4"
              >
                {service.title}
              </motion.h2>

              {service.price && (
                <motion.p
                  variants={fadeUp}
                  className="text-brand-gold font-body text-lg font-medium mb-2"
                >
                  {service.price}
                </motion.p>
              )}

              <motion.p
                variants={fadeUp}
                className="text-brand-gray font-body text-sm mb-6"
              >
                {service.duration}
              </motion.p>

              {service.includes && (
                <motion.div variants={fadeUp} className="mb-6">
                  <p className="text-brand-offwhite font-body text-sm font-medium mb-3">
                    Includes:
                  </p>
                  <ul className="space-y-2">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-brand-gray font-body text-sm">
                        <span className="text-brand-teal mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {service.tiers && (
                <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {service.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="bg-brand-black/50 border border-brand-teal/10 rounded-lg p-5"
                    >
                      <p className="text-brand-offwhite font-body font-medium mb-1">
                        {tier.name}
                      </p>
                      {'subtitle' in tier && tier.subtitle && (
                        <p className="text-brand-gray font-body text-xs mb-2">
                          {tier.subtitle}
                        </p>
                      )}
                      <p className="text-brand-gold font-body text-sm mb-1">
                        {tier.price}
                      </p>
                      {'perSession' in tier && tier.perSession && (
                        <p className="text-brand-gray font-body text-xs">
                          {tier.perSession}
                        </p>
                      )}
                      {'highlight' in tier && tier.highlight && (
                        <p className="text-brand-teal font-body text-xs mt-2">
                          {tier.highlight}
                        </p>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              <motion.p variants={fadeUp} className="text-brand-gray font-body text-sm">
                <span className="text-brand-offwhite font-medium">Best for:</span>{' '}
                {service.bestFor}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
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
            HOW IT WORKS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-16"
          >
            Three Steps. Zero Hassle.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.number} variants={fadeUp} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-brand-teal rounded-full flex items-center justify-center">
                  <span className="font-display text-3xl text-brand-gold">{step.number}</span>
                </div>
                <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray font-body text-sm leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 text-brand-teal/40">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Session Protocol */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            SESSION PROTOCOL
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            What to Know
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8"
          >
            <ul className="space-y-5">
              {protocols.map((protocol, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">{protocol.icon}</span>
                  <span className="text-brand-gray font-body leading-relaxed">
                    {protocol.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Tired Dog Guarantee */}
      <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeUp}
            className="bg-brand-black border-2 border-brand-gold rounded-xl p-10 md:p-14"
          >
            <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-4">
              OUR PROMISE
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-6">
              The Tired Dog Guarantee
            </h2>
            <p className="text-brand-gray font-body text-lg leading-relaxed max-w-2xl mx-auto">
              Every dog will be noticeably tired or we work with them on the next session at no charge.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
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
            className="text-5xl md:text-6xl font-display tracking-tight mb-6"
          >
            Ready to Run?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg mb-10"
          >
            Book your intro session and see the difference structured conditioning makes.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/book" variant="primary" className="px-10 py-4">
              Book a Session
            </Button>
            <Button href="/pricing" variant="secondary" className="px-10 py-4">
              View Pricing
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
