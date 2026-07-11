// Single source of truth for the slatmill FAQ - rendered by the client component
// and mirrored into FAQPage JSON-LD in page.tsx. Keep the two in sync by importing
// this array in both places.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'What is the Ronzeil Large Slatmill?',
    answer:
      'A self-powered treadmill built for dogs. There is no motor - the belt only moves when the dog drives it, which means the dog controls the speed, the effort, and the stop. It is the mill we bring to every Kai\'s Run session on the Emerald Coast.',
  },
  {
    question: 'What makes a slatmill different from a motorized dog treadmill?',
    answer:
      'A motorized treadmill sets the pace and the dog complies. A slatmill flips that relationship. The dog owns the pace, the gait stays natural because nothing drags the feet backward, and the session ends when the dog decides it ends. For conditioning work, that difference is everything.',
  },
  {
    question: 'Is a slatmill safe for dogs?',
    answer:
      'Used correctly, with supervision, yes. The Ronzeil\'s plexiglass guard rails keep the dog centered without blocking sightlines, the dog is never forced to run, and every Kai\'s Run session is one-on-one with hands on the dog the entire time. We never leave a dog unattended on the mill.',
  },
  {
    question: 'Did you really build it yourself?',
    answer:
      'Solo, from the Ronzeil kit, in about an hour in my own garage. I put the legs on wrong three times before the frame held. The full build video and write-up are on the blog, mistakes included.',
  },
  {
    question: 'Can I buy a Ronzeil slatmill for my own home?',
    answer:
      'You can. We are a Ronzeil affiliate - our link is on this page and the code KAI26 takes 18% off your entire order. We earn a commission at no extra cost to you, and we only recommend gear we run ourselves.',
  },
  {
    question: 'Do I need my own slatmill to work with Kai\'s Run?',
    answer:
      'No. The entire point of the business is that the mill comes to you. We bring the Ronzeil to your driveway for private one-on-one conditioning - book an Intro Session and your dog meets it on his own terms.',
  },
];
