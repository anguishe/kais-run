'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

const benefits = [
  {
    title: 'Cardiovascular Conditioning',
    description:
      "Builds heart and lung capacity — the engine under every high-drive dog's stamina.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h4l2-6 4 12 2-6h8" />
      </svg>
    ),
  },
  {
    title: 'Low-Impact Joint Conditioning',
    description:
      'Slatmill sessions load muscle, not joints — conditioning without the wear of pavement or repeated jumping.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="2.2" />
        <circle cx="7" cy="10.5" r="1.4" />
        <circle cx="17" cy="10.5" r="1.4" />
        <circle cx="9" cy="6" r="1.4" />
        <circle cx="15" cy="6" r="1.4" />
        <path d="M4 20c1.5-2.5 4-4 8-4s6.5 1.5 8 4" />
      </svg>
    ),
  },
  {
    title: 'Weight Management',
    description:
      'Consistent sessions burn real calories — a measurable tool against weight creep, not just exercise for exercise’s sake.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3" />
        <path d="M6 6h12" />
        <path d="M6 6 3 14a3 3 0 0 0 6 0z" />
        <path d="M18 6l3 8a3 3 0 0 1-6 0z" />
        <path d="M9 21h6" />
        <path d="M12 6v15" />
      </svg>
    ),
  },
  {
    title: 'Confidence & Impulse Control',
    description:
      'Structured movement teaches a dog to work through arousal instead of react to it — control that carries into daily life.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Behavioral Regulation',
    description:
      'A dog with drain has less left over for barking, destruction, or reactivity — the slatmill gives that drive somewhere to go.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M22 10v4" />
        <rect x="5" y="10" width="7" height="4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Performance',
    description:
      'For sport and working dogs, targeted conditioning closes the gap between talent and output.',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2h6" />
        <path d="M12 2v2" />
        <circle cx="12" cy="14" r="8" />
        <path d="M12 14l3-3" />
        <path d="m18 6 1.5-1.5" />
      </svg>
    ),
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-brand-black">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={fadeUp}
          className="text-5xl md:text-7xl font-display tracking-tight text-center mb-16 text-brand-offwhite"
        >
          What Structured Conditioning Actually Does
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              variants={fadeUp}
              className="bg-brand-charcoal border border-brand-teal/20 rounded-xl p-8"
            >
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${
                  i % 2 === 0
                    ? 'bg-brand-teal/10 text-brand-teal'
                    : 'bg-brand-gold/10 text-brand-gold'
                }`}
              >
                {benefit.icon}
              </div>
              <h3 className="font-display text-2xl tracking-wider text-brand-offwhite mb-4">
                {benefit.title}
              </h3>
              <p className="text-brand-gray text-sm font-body leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
