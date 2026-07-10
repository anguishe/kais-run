// Single source of truth for the first-aid kit FAQ - rendered by the client
// component and mirrored into FAQPage JSON-LD in page.tsx. Keep the two in sync
// by importing this array in both places.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'Do you bring a first-aid kit to every session?',
    answer:
      'Yes. A stocked canine first-aid kit rides with the equipment to every session, and it is part of the standard cool-down at the end of each run.',
  },
  {
    question: 'What is in your dog first-aid kit?',
    answer:
      'Wound-care supplies, a digital thermometer, a soft muzzle for safe handling, tick and splinter tools, trauma shears, tweezers, a collapsible water bowl, and more - all in a water-resistant case.',
  },
  {
    question: 'Why would a dog conditioning service need a first-aid kit?',
    answer:
      'Because a slatmill session is real physical work. It is safer than overheating on a walk, but preparation is still the baseline. A split pad or a scrape is rare, and I would rather have the kit and not need it.',
  },
  {
    question: 'Is the muzzle a warning sign about how you handle dogs?',
    answer:
      'No. A muzzle is standard first-aid gear. Even the calmest dog can react on instinct when it is hurting, and a muzzle lets me help safely without making an injury worse.',
  },
  {
    question: 'What happens if my dog gets hurt during a session?',
    answer:
      'I stop the session, give first response from the kit, and contact you right away so you can decide on next steps. I do not transport dogs, so any veterinary care is arranged by you.',
  },
  {
    question: 'Are you a veterinarian?',
    answer:
      'No. The kit is for first response, not treatment, and it is not a substitute for veterinary care.',
  },
];
