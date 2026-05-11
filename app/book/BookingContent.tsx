'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const timeline = [
  {
    number: '1',
    title: 'Confirmation Text',
    description: 'Receive booking confirmation same day',
  },
  {
    number: '2',
    title: 'ETA Text',
    description: 'Get arrival time the morning of your session',
  },
  {
    number: '3',
    title: 'Photo Report',
    description: 'Run metrics and photos sent within 1 hour',
  },
];

export default function BookingContent() {
  return (
    <div className="bg-brand-black pb-20 px-6">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto pt-12"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-brand-gray font-body text-base mb-4">Prefer to book by phone?</p>
          <a
            href="tel:850-218-5855"
            className="text-brand-teal font-display text-3xl hover:text-brand-teal/80 transition-colors"
          >
            Call or text: 850-218-5855
          </a>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="text-4xl font-display tracking-tight text-center mb-10 text-brand-offwhite">
            WHAT TO EXPECT AFTER BOOKING
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-brand-teal bg-brand-charcoal">
                    <span className="text-3xl font-display text-brand-teal">{step.number}</span>
                  </span>
                </div>
                <h3 className="text-xl font-display tracking-tight text-brand-offwhite mb-2">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-brand-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
