'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/variants';
import FAQAccordion from '@/components/ui/FAQAccordion';
import LeadMagnetForm from '@/components/ui/LeadMagnetForm';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

const faqItems = [
  {
    question: 'What is a slatmill?',
    answer:
      'A slatmill is a self-powered treadmill with no motor. Your dog controls the speed entirely — they walk, trot, or run at their own pace. It\'s safer than a motorized treadmill because there\'s no forced speed. The dog sets the intensity, and they can stop whenever they want.',
  },
  {
    question: 'Is the slatmill safe for my dog?',
    answer:
      'Yes. Because there\'s no motor, your dog is in complete control. We use Julius K9 harnesses (sizes S/M/L provided) for safety and comfort. Every session is supervised, climate-controlled, and private — one dog at a time. We require rabies vaccination and a health screening before the first session.',
  },
  {
    question: 'What breeds can use the slatmill?',
    answer:
      'All breeds are welcome, including reactive dogs. High-drive breeds (working dogs, terriers, sporting breeds) tend to love it, but any dog that needs structured exercise can benefit. We work with dogs as small as 20 lbs and as large as 120+ lbs.',
  },
  {
    question: 'What are the age and weight requirements?',
    answer:
      'Dogs must be at least 4 months old. There\'s no strict weight limit, but we recommend 20–120 lbs for optimal slatmill fit. Health exclusions include congestive heart disease and active heartworm. If you\'re unsure, book an intro session and we\'ll assess your dog during the fitness evaluation.',
  },
  {
    question: 'What if my dog is reactive to other dogs or people?',
    answer:
      'Reactive dogs are welcome. Every session is private — one dog at a time, no group chaos. We come to your driveway, so your dog stays in a familiar environment. Many of our clients specifically choose us because traditional group daycare or dog parks don\'t work for their dog.',
  },
  {
    question: 'How long is a session?',
    answer:
      'Sessions last 30–45 minutes. This includes warm-up, slatmill time, and cool-down. Most dogs run for 15–30 minutes depending on fitness level and energy. First-timers often start shorter and build endurance over multiple sessions.',
  },
  {
    question: 'What do I need to prepare before the session?',
    answer:
      'Not much. We bring everything: the mobile unit, the slatmill, and Julius K9 harnesses. You just need to complete the digital waiver before the first session and ensure your dog is up to date on rabies vaccination. We\'ll send a confirmation text and an ETA text the morning of your session.',
  },
  {
    question: 'Do I need to stay during the session?',
    answer:
      'Your choice. Some clients stay and watch, others use the 30–45 minutes to run errands or work from home. We\'ll text you a photo and run report within 1 hour after the session, so you\'ll always know how your dog performed.',
  },
  {
    question: 'How do I book a session?',
    answer:
      'Book online through our Square Appointments system at kaisrun.com/book. Choose your service type (intro, single session, or use a bundle/membership credit), pick a time, and confirm your address. We route geographically and will confirm availability within 2 hours.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      '24-hour notice required for a full refund. No-shows forfeit the session fee. For memberships and bundles, cancelled sessions with 24+ hours notice are credited back to your account. We understand life happens — just let us know as soon as possible.',
  },
  {
    question: 'Do you take memberships?',
    answer:
      'Yes. We offer two membership tiers: Coastal Member (bi-weekly, 2 sessions/month) and Emerald Member (weekly, 4 sessions/month). Both include priority booking and can be cancelled anytime with 30-day notice. No long-term contracts.',
  },
  {
    question: 'Do you offer military or first responder discounts?',
    answer:
      'Yes. Military and veterans (including Eglin AFB and Hurlburt Field personnel) receive 15% off. First responders (police, fire, EMS) and teachers receive 10% off. Mention your status at booking to receive your discount.',
  },
];

export function FAQPageClient() {
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
            FREQUENTLY ASKED
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl tracking-tight mb-8"
          >
            COMMON QUESTIONS
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-brand-gray font-body text-lg md:text-xl leading-relaxed"
          >
            Everything you need to know about mobile slatmill sessions.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <FAQAccordion items={faqItems} />
          </motion.div>
        </motion.div>
      </section>

      <ContactFormSection />

      {/* Lead Magnet */}
      <section className="py-24 md:py-32 px-6 bg-brand-black">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-display tracking-tight mb-6">
              FREE GUIDE: Tire Out Your High-Drive Dog.
            </h2>
            <p className="text-base md:text-lg font-body text-brand-gray max-w-2xl mx-auto">
              Get the Emerald Coast Dog Energy Guide — structured exercise for working breeds. Free. No spam.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <LeadMagnetForm />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
