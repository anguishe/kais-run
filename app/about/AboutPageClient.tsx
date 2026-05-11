'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import Button from '@/components/ui/Button';

const comparison = [
  { attribute: 'Comes to you', kaisRun: 'YES', walker: 'YES', daycare: 'No' },
  { attribute: 'Climate controlled', kaisRun: 'YES', walker: 'No', daycare: 'Varies' },
  { attribute: 'One dog at a time', kaisRun: 'YES', walker: 'Often groups', daycare: 'Groups' },
  { attribute: 'Performance framing', kaisRun: 'YES', walker: 'No', daycare: 'No' },
  { attribute: 'Slatmill / no motor', kaisRun: 'YES', walker: 'No', daycare: 'No' },
  { attribute: 'Membership model', kaisRun: 'YES', walker: 'Rarely', daycare: 'Yes' },
];

const trustSignals = [
  { icon: '🛡️', text: 'Licensed & Insured' },
  { icon: '🦮', text: 'Julius K9 harnesses provided S/M/L' },
  { icon: '💉', text: 'Vaccinations required' },
  { icon: '📝', text: 'Digital waiver before first session' },
  { icon: '❄️', text: 'Climate-controlled mobile unit' },
  { icon: '🐕', text: '1-dog-at-a-time private sessions' },
  { icon: '📱', text: 'Confirmation + ETA texts' },
  { icon: '📸', text: 'Photo report after every session' },
];

export function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="py-section px-6 bg-brand-black">
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
            OUR STORY
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            BUILT FOR KAI.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed"
          >
            Brought to every high-drive dog on the Emerald Coast.
          </motion.p>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="py-section px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="bg-brand-black border border-brand-teal/20 rounded-xl p-8 md:p-12"
          >
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-8 text-center">
              How It Started
            </h2>
            <div className="space-y-6 text-brand-gray font-body text-base md:text-lg leading-relaxed">
              <p>
                Travis grew up in Destin. His Rhodesian Ridgeback mix Kai had uncontrollable energy
                — destructive behavior, anxiety, impossible to tire out with normal walks.
              </p>
              <p>
                Travis discovered the slatmill: a self-powered treadmill where the dog sets their own pace.
                No motor. Nothing forced.
              </p>
              <p>
                Kai ran, then slept. Everything changed.
              </p>
              <p className="text-brand-offwhite font-medium">
                Travis built Kai's Run to bring that same solution to every high-drive dog on the Emerald Coast.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Kai the Dog */}
      <section className="py-section px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            THE ORIGINAL ATHLETE
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Meet Kai
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <div className="w-full aspect-square bg-brand-charcoal border border-brand-teal/10 rounded-xl flex items-center justify-center">
                <span className="text-brand-gray text-sm">{'<!-- KAI PHOTO HERE -->'}</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <div>
                <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-2">
                  BREED
                </p>
                <p className="text-brand-offwhite font-body text-lg">
                  Rhodesian Ridgeback Mix
                </p>
              </div>
              <div>
                <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-2">
                  ROLE
                </p>
                <p className="text-brand-offwhite font-body text-lg">
                  Mascot · Origin Dog · Content Star
                </p>
              </div>
              <div>
                <p className="text-brand-gold font-body text-xs tracking-[0.25em] uppercase mb-2">
                  STORY
                </p>
                <p className="text-brand-gray font-body leading-relaxed">
                  Kai is the dog that started it all. High-drive, high-energy, and impossible
                  to wear out with traditional exercise. The slatmill gave him the outlet he
                  needed. Now he's the proof of concept behind every session we run.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why We're Different */}
      <section className="py-section px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-6xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            COMPARISON
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Why We're Different
          </motion.h2>

          <motion.div variants={fadeUp} className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-teal/30">
                  <th className="text-left py-4 px-4 text-brand-offwhite font-body font-medium text-sm md:text-base">
                    Attribute
                  </th>
                  <th className="text-center py-4 px-4 text-brand-gold font-display text-lg md:text-xl">
                    Kai's Run
                  </th>
                  <th className="text-center py-4 px-4 text-brand-gray font-body text-sm md:text-base">
                    Dog Walker
                  </th>
                  <th className="text-center py-4 px-4 text-brand-gray font-body text-sm md:text-base">
                    Doggy Daycare
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-brand-teal/10">
                    <td className="py-4 px-4 text-brand-offwhite font-body text-sm md:text-base">
                      {row.attribute}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-brand-teal font-body font-medium text-sm md:text-base">
                        {row.kaisRun}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-brand-gray font-body text-sm">
                      {row.walker}
                    </td>
                    <td className="py-4 px-4 text-center text-brand-gray font-body text-sm">
                      {row.daycare}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Signals */}
      <section className="py-section px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-5xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-teal font-body text-sm tracking-[0.25em] uppercase text-center mb-4"
          >
            WHAT TO EXPECT
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight text-center mb-12"
          >
            Professional Standards
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {trustSignals.map((signal, i) => (
              <div
                key={i}
                className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-6 flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0">{signal.icon}</span>
                <span className="text-brand-gray font-body leading-relaxed">
                  {signal.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-section px-6 bg-brand-charcoal">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-6xl font-display tracking-tight mb-6"
          >
            Book Your First Session
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg mb-10"
          >
            Experience the difference structured conditioning makes.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/book?type=intro" variant="primary" className="px-10 py-4">
              Book Intro — $35
            </Button>
            <Button href="/pricing" variant="secondary" className="px-10 py-4">
              View All Pricing
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
