// Single source of truth for the harness FAQ - rendered by the client component
// and mirrored into FAQPage JSON-LD in page.tsx. Keep the two in sync by importing
// this array in both places.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: 'What does IDC stand for on the Julius-K9 harness?',
    answer:
      'IDC stands for Innova Dog Comfort. It is the current generation of the original Julius-K9 Powerharness, redesigned around chest-strap force distribution and a spine-protecting saddle rather than a single load point at the neck.',
  },
  {
    question: 'Why does Kai\'s Run use a harness instead of a collar for slatmill work?',
    answer:
      'A collar loads the throat. On a self-powered slatmill the dog is driving sustained aerobic output against a safety tether, so any pull needs to land on the chest and sternum, not the trachea. The IDC chest strap spreads that force across the front of the dog, which is why we run it on every session.',
  },
  {
    question: 'What sizes does Kai\'s Run keep on the truck?',
    answer:
      'We carry the common sizes - small, medium, and large - which cover the large majority of conditioning dogs from roughly 15 to 90 pounds. Julius-K9 makes the IDC in nine sizes total (Baby 1 through size 4), so if your dog sits at the edge of the range, tell us when you book and we will confirm fit before the first session.',
  },
  {
    question: 'Can I use my dog\'s own harness instead?',
    answer:
      'Yes. Bring any harness your dog already trusts and we will check the fit like a climbing-harness check before we load work - no loose buckles, no twisted webbing, and load on the chest rather than the throat. If it does not distribute force safely for sustained running, we will put our IDC on instead.',
  },
  {
    question: 'Is the Julius-K9 IDC Powerharness escape-proof?',
    answer:
      'No harness is fully escape-proof, and independent reviewers say the same about the IDC. That is exactly why our dogs also clip to a safety tether on the mill - the harness distributes force and gives us a lockable handle, and the tether is the backup if a dog decides to bail sideways.',
  },
  {
    question: 'Who else uses the Julius-K9 IDC Powerharness?',
    answer:
      'Julius-K9 built its reputation on police, military, and service-dog units before the harness reached pet owners. It is widely used by working-dog handlers, which is part of why we trust it under real conditioning loads.',
  },
];
