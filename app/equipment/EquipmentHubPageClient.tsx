'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';

type EquipmentCard = {
  href: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  line: string;
};

const cards: EquipmentCard[] = [
  {
    href: '/equipment/julius-k9-idc-powerharness/',
    src: '/images/equipment/kai-julius-k9-harness-full.webp',
    width: 1200,
    height: 1216,
    alt: 'Kai in the Julius-K9 IDC Powerharness',
    title: 'The Julius-K9 IDC Powerharness',
    line: 'The harness every dog runs in - chest-strap force distribution and a spine-protecting saddle.',
  },
  {
    href: '/equipment/first-aid-kit/',
    src: '/images/equipment/first-aid-kit-hero.webp',
    width: 1600,
    height: 1000,
    alt: 'The canine first-aid kit that rides to every Kai\'s Run session',
    title: 'The Canine First-Aid Kit',
    line: 'A stocked first-aid kit rides to every session, and anchors the five-minute cool-down.',
  },
  {
    href: '/how-we-record/',
    src: '/images/how-we-record-hero.webp',
    width: 2400,
    height: 1260,
    alt: 'The two-camera rig that records every Kai\'s Run session',
    title: 'The Two-Camera Recording Rig',
    line: 'Every session is filmed start to finish, for your dog\'s safety and so you can see the work.',
  },
  {
    href: '/equipment/ronzeil-slatmill/',
    src: '/images/equipment/ronzeil-slatmill/kai-with-ronzeil-slatmill-hero.webp',
    width: 1013,
    height: 1800,
    alt: 'Kai the Rhodesian Ridgeback mix with the Ronzeil Large Slatmill',
    title: 'Ronzeil Large Slatmill',
    line: 'The self-powered mill we bring to every session - assembled solo, tested by Bailey.',
  },
];

export function EquipmentHubPageClient() {
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
            className="text-brand-teal-light font-body text-sm tracking-[0.25em] uppercase mb-6"
          >
            The Gear
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            THE EQUIPMENT WE RUN
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-offwhite font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Every piece of gear I bring to a session earns its place. Nothing here is for show - it
            is chosen for safety, sized to the dog, and built to hold up to real work, session after
            session. Here is what rides in the mobile unit.
          </motion.p>
        </motion.div>
      </section>

      {/* Cards */}
      <section className="pb-24 md:pb-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div key={card.href} variants={fadeUp}>
              <Link
                href={card.href}
                className="group block h-full rounded-xl border border-brand-teal/20 overflow-hidden bg-brand-charcoal hover:border-brand-teal/50 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={card.src}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight text-brand-offwhite mb-3">
                    {card.title}
                  </h2>
                  <p className="text-brand-gray font-body text-base leading-relaxed">{card.line}</p>
                  <span className="mt-4 inline-block text-brand-teal-light font-body text-sm tracking-wide">
                    See the gear
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
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
          <motion.div variants={fadeUp}>
            <Link
              href="/book/"
              className="inline-block bg-brand-teal text-white px-8 py-3 font-display text-2xl tracking-wider hover:bg-brand-teal/90 transition-colors rounded-sm"
            >
              Book a session
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
