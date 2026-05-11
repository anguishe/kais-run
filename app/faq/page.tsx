import type { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/lib/site-images';
import { FAQPageClient } from './FAQPageClient';

export const metadata: Metadata = {
  title: "FAQ | Kai's Run — Mobile Dog Gym Destin FL",
  description:
    'Common questions about slatmill sessions, booking, pricing, and what to expect. Mobile dog conditioning in Destin, Fort Walton Beach & Niceville FL.',
  openGraph: {
    title: "FAQ | Kai's Run — Mobile Dog Gym Destin FL",
    description:
      'Common questions about slatmill sessions, booking, pricing, and what to expect. Mobile dog conditioning in Destin, Fort Walton Beach & Niceville FL.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1600,
        height: 900,
        alt: "Athletic dog in motion — Kai's Run mobile dog gym",
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a slatmill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A slatmill is a self-powered treadmill with no motor. Your dog controls the speed entirely — they walk, trot, or run at their own pace. It\'s safer than a motorized treadmill because there\'s no forced speed. The dog sets the intensity, and they can stop whenever they want.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the slatmill safe for my dog?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Because there\'s no motor, your dog is in complete control. We use Julius K9 harnesses (sizes S/M/L provided) for safety and comfort. Every session is supervised, climate-controlled, and private — one dog at a time. We require rabies vaccination and a health screening before the first session.',
      },
    },
    {
      '@type': 'Question',
      name: 'What breeds can use the slatmill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All breeds are welcome, including reactive dogs. High-drive breeds (working dogs, terriers, sporting breeds) tend to love it, but any dog that needs structured exercise can benefit. We work with dogs as small as 20 lbs and as large as 120+ lbs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the age and weight requirements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dogs must be at least 4 months old. There\'s no strict weight limit, but we recommend 20–120 lbs for optimal slatmill fit. Health exclusions include congestive heart disease and active heartworm. If you\'re unsure, book an intro session and we\'ll assess your dog during the fitness evaluation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my dog is reactive to other dogs or people?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reactive dogs are welcome. Every session is private — one dog at a time, no group chaos. We come to your driveway, so your dog stays in a familiar environment. Many of our clients specifically choose us because traditional group daycare or dog parks don\'t work for their dog.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is a session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sessions last 30–45 minutes. This includes warm-up, slatmill time, and cool-down. Most dogs run for 15–30 minutes depending on fitness level and energy. First-timers often start shorter and build endurance over multiple sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I need to prepare before the session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not much. We bring everything: the mobile unit, the slatmill, and Julius K9 harnesses. You just need to complete the digital waiver before the first session and ensure your dog is up to date on rabies vaccination. We\'ll send a confirmation text and an ETA text the morning of your session.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to stay during the session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your choice. Some clients stay and watch, others use the 30–45 minutes to run errands or work from home. We\'ll text you a photo and run report within 1 hour after the session, so you\'ll always know how your dog performed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Book online through our Square Appointments system at kaisrun.com/book. Choose your service type (intro, single session, or use a bundle/membership credit), pick a time, and confirm your address. We route geographically and will confirm availability within 2 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cancellation policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '24-hour notice required for a full refund. No-shows forfeit the session fee. For memberships and bundles, cancelled sessions with 24+ hours notice are credited back to your account. We understand life happens — just let us know as soon as possible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you take memberships?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer two membership tiers: Coastal Member (bi-weekly, 2 sessions/month) and Emerald Member (weekly, 4 sessions/month). Both include priority booking and can be cancelled anytime with 30-day notice. No long-term contracts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer military or first responder discounts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Military and veterans (including Eglin AFB and Hurlburt Field personnel) receive 15% off. First responders (police, fire, EMS) and teachers receive 10% off. Mention your status at booking to receive your discount.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageClient />
    </>
  );
}
