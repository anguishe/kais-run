/**
 * Single source for FAQ copy (accordion + JSON-LD). Use [[LINK:/path/|label]] for inline links.
 */
export type FaqEntry = { q: string; a: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: 'What is a slatmill — and how is it different from a motorized treadmill?',
    a:
      "A slatmill is a non-motorized treadmill: your dog drives the belt with their own gait. There is no hidden motor setting a minimum speed, no belt that keeps moving when they hesitate, and no human deciding today's 'mph.' That matters for biomechanics — dogs self-select cadence, adjust stride length naturally, and can decelerate the instant something feels off. On a motorized unit, even a well-intentioned operator can ask for speed the dog would not choose on their own. Our sessions use that self-paced work to build cardiovascular fitness and mental satisfaction without fighting the machine. If you want the full breakdown of how we structure sessions, read [[LINK:/services/|what we do on a visit]].",
  },
  {
    q: 'What breeds benefit most from Kai\'s Run?',
    a:
      "High-drive sporting, working, and terrier lines often take to the mill immediately — they are built for repeated effort and clear feedback loops. That said, we work with any dog that needs structured output, from compact athletes in the 20 lb range to large dogs north of 120 lbs when the harness and mill geometry fit safely. Dogs should be at least four months old, and we flag active heartworm or serious cardiac disease before we load work. The question is less 'breed on paper' and more 'energy budget in real life.' If your dog is bored, reactive from frustration, or simply not tired after long walks, [[LINK:/book/|book an intro]] and we will assess gait, confidence, and recovery in the first visit.",
  },
  {
    q: 'Is the slatmill safe for my dog?',
    a:
      "Yes — because the dog sets the effort. Sessions are one-on-one inside a climate-controlled mobile unit, harnessed with Julius K9 gear we keep on the truck in common sizes (or yours if you prefer). We cap intensity to what the dog can hold with good form, watch heat and panting closely, and stop for resets when needed. We require current rabies vaccination and a completed digital waiver before the first session, and we screen for conditions like active heartworm or congestive heart disease where exertion is inappropriate. If you are unsure, the intro is the safest place to ask every question before committing further.",
  },
  {
    q: 'What if my dog is reactive, anxious, or noise-sensitive?',
    a:
      "Private driveway work is the default — no lobby, no pack of unfamiliar dogs, no bouncing tennis balls in a daycare window. Many reactive dogs relax faster when the only job is forward motion in a controlled space they can step away from at will. We do not rush the first hookup; we let the dog investigate the unit, reward small wins, and build trust before asking for sustained running. If your dog needs extra space from neighbors on the street, tell us when you book so we can position the rig to minimize triggers. Ready to try? [[LINK:/book/|Start with the intro session]].",
  },
  {
    q: 'How long is a session — and do I need to stay?',
    a:
      "Plan on 30–45 minutes door-to-door for the appointment block. Inside that window we warm up, complete working time on the slatmill, cool down, and log notes for your run report. Most dogs accumulate 15–30 minutes of actual mill work depending on fitness and weather. You may stay and watch, step inside briefly to see the setup, or use the time to work from home — we text a progress photo and written recap within an hour after we wrap. If you want predictable cadence week to week, compare [[LINK:/pricing/|membership and bundle options]].",
  },
  {
    q: 'What should I do to prepare before we arrive?',
    a:
      "Give your dog a bathroom break right before we park, clear a level area of the driveway or pad where the unit can sit, and keep fresh water available for after. Complete the digital waiver and confirm rabies records ahead of time so we spend the visit on conditioning, not paperwork. If your dog is on medication that affects heart rate or heat tolerance, mention it in the booking notes. Still deciding which visit type fits? [[LINK:/services/|Review services]] side-by-side before you choose a slot.",
  },
  {
    q: 'Do you work in rain, thunderstorms, or extreme Florida heat?',
    a:
      "The mobile unit is climate-controlled, so most light rain is fine — we are under cover while the dog works. We pause or reschedule for lightning, high winds that make the rig unsafe to deploy, or heat indexes where even conditioned dogs should not push hard. If we cancel for weather, you are not charged a no-show; we will offer the next available slot on the route. Service radius and routing questions live on [[LINK:/service-area/|the service area page]].",
  },
  {
    q: 'What is your cancellation and rescheduling policy?',
    a:
      "We ask for 24-hour notice to move or cancel a paid session for a full refund or credit, depending on how you purchased. No-shows forfeit the session fee because that block was held off the route for you. Membership and bundle credits return to your balance when you cancel inside the policy window. Life on the coast gets unpredictable — just text as soon as your plans shift so we can release the slot to another dog who needs the work. Policy details also tie to how you bought sessions; see [[LINK:/pricing/|pricing and packages]].",
  },
  {
    q: 'What area do you serve?',
    a:
      "We run routed visits across Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar, and nearby Okaloosa County addresses. Because we haul a full mobile gym, we batch geography to cut drive time between dogs — that is how we keep pricing honest. If you are on the edge of the zone, tell us your neighborhood when you book and we will confirm within a couple of hours. The full city-by-city breakdown is on [[LINK:/service-area/|Service Area]].",
  },
  {
    q: 'What vaccines and paperwork are required?',
    a:
      "Rabies vaccination must be current before the first session, and you will complete our digital waiver acknowledging the risks and rules of guided exercise. We may ask your veterinarian for clearance if your dog has a complex cardiac or respiratory history. Bordetella and other lifestyle vaccines are recommended for any dog that socializes, but rabies is the hard requirement for Kai's Run specifically. Bring any harness your dog already loves — otherwise we fit Julius K9 sizes on site.",
  },
  {
    q: 'Do you offer discounts for multiple dogs, groups, or referrals?',
    a:
      "Household two-dog pricing is already built into our intro and performance rates — check the two-dog columns on [[LINK:/pricing/|Pricing]]. We do not stack unrelated dogs from different homes into one 'group' session because that breaks the private-athlete model. Referrals earn Run Crew rewards after the referred dog completes a paid visit; details live next to membership pricing. Military, first responder, and teacher discounts are applied at booking when you mention eligible status.",
  },
  {
    q: 'What is included in the Founding Athlete Program?',
    a:
      "Founding Athlete is a limited window offer: five full sessions at a locked rate, priority access as we grow the route, and founding-only perks outlined beside the counter on [[LINK:/pricing/|Pricing]] and the founding banner on the home page. When spots sell out, that price tier does not return — standard walk-up and bundle pricing applies. If you see founding inventory available, claim it through the founding flow linked from the home hero or pricing cards.",
  },
  {
    q: 'How do memberships and bundles differ from walk-up sessions?',
    a:
      "Walk-up performance sessions are pay-as-you-go with the highest per-visit rate but zero commitment. Bundles buy volume up front at a lower effective session price and never expire — ideal if you travel or seasonally spike training. Memberships bake in cadence (Coastal bi-weekly or Emerald weekly) and unlock priority booking windows so your dog does not lose momentum when routes fill. Every tier still includes the same private session quality; you are choosing how you want to budget time and dollars. Compare the math on [[LINK:/pricing/|Pricing]] before you lock a cadence.",
  },
  {
    q: 'How do I book — intro, single session, bundle, or membership?',
    a:
      "Everything runs through Square Appointments on [[LINK:/book/|Book]]. Choose intro if you are new, performance for drop-in conditioning, or apply bundle and membership credits after you purchase them. Pick a time, drop your address, and we confirm routing. If you are not sure which path to pick, start with the intro — it includes assessment, Run Profile card, and the first real data point on how your dog responds to structured work.",
  },
];

/** Primary FAQs for FAQPage JSON-LD (AI Overviews / citation). */
export const FAQ_SCHEMA_ENTRIES: FaqEntry[] = [
  {
    q: 'What is a slatmill and how is it different from a motorized treadmill?',
    a: 'A slatmill is a non-motorized treadmill: your dog drives the belt with their own gait. There is no motor setting a minimum speed. Dogs self-select cadence, adjust stride length naturally, and can decelerate the instant something feels off. Sessions build cardiovascular fitness and mental satisfaction without forcing a speed the dog would not choose on their own.',
  },
  {
    q: "What breeds benefit most from Kai's Run?",
    a: 'High-drive sporting, working, and terrier lines often take to the mill immediately. We work with any dog that needs structured output, from 20 lbs to 120+ lbs. Dogs should be at least four months old. If your dog is bored, reactive from frustration, or not tired after long walks, an intro session is the right starting point.',
  },
  {
    q: 'Is the slatmill safe for my dog?',
    a: 'Yes — because the dog sets the effort. Sessions are one-on-one inside a climate-controlled mobile unit, harnessed with Julius K9 gear. We require current rabies vaccination and a completed digital waiver before the first session, and screen for conditions where exertion is inappropriate such as active heartworm or congestive heart disease.',
  },
  {
    q: 'What if my dog is reactive, anxious, or noise-sensitive?',
    a: 'Private driveway work is the default — no lobby, no pack of unfamiliar dogs. Many reactive dogs relax faster when the only job is forward motion in a controlled space. We do not rush the first hookup; we let the dog investigate the unit, reward small wins, and build trust before asking for sustained running.',
  },
  {
    q: 'How long is a session and do I need to stay?',
    a: 'Plan on 30 to 45 minutes door-to-door. Inside that window we warm up, complete working time on the slatmill, cool down, and log notes for your run report. Most dogs accumulate 15 to 30 minutes of actual mill work. You may stay and watch or use the time to work from home — we send a progress photo and written recap within an hour after wrapping.',
  },
  {
    q: 'What area do you serve?',
    a: 'We run routed visits across Destin, Miramar Beach, Sandestin, Fort Walton Beach, Niceville, Shalimar, and nearby Okaloosa County addresses. We batch geography to keep pricing honest. If you are on the edge of the zone, provide your neighborhood when booking and we will confirm within a couple of hours.',
  },
  {
    q: 'What vaccines and paperwork are required?',
    a: "Rabies vaccination must be current before the first session, and you will complete a digital waiver. We may ask your veterinarian for clearance if your dog has a complex cardiac or respiratory history. Bordetella and other lifestyle vaccines are recommended but rabies is the hard requirement for Kai's Run.",
  },
  {
    q: 'What is your cancellation and rescheduling policy?',
    a: 'We ask for 24-hour notice to move or cancel a paid session for a full refund or credit. No-shows forfeit the session fee because that block was held off the route. Text as soon as your plans shift so we can release the slot to another dog who needs the work.',
  },
];

export function faqAnswerPlainForSchema(text: string): string {
  const withUrls = text.replace(
    /\[\[LINK:([^|]+)\|([^\]]+)\]\]/g,
    (_, path: string, label: string) => `${label} (https://kaisrun.xyz${path})`,
  );
  return withUrls.replace(/\s+/g, ' ').replace(/\n\n/g, ' ').trim();
}
