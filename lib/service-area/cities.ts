export type ServiceCitySlug = 'destin' | 'fort-walton-beach' | 'niceville' | 'miramar-beach' | 'sandestin';

type ContentSection = {
  h2: string;
  paragraph: string;
};

export type ServiceCityPage = {
  slug: ServiceCitySlug;
  name: string;
  state: 'FL';
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  neighborhoodsLabel: string;
  neighborhoods: string[];
  paragraphs?: string[];
  introText?: string;
  sections?: ContentSection[];
  crossLinks?: Array<{ slug: ServiceCitySlug; name: string }>;
  hubTeaser: string;
};

export const SERVICE_CITY_PAGES: ServiceCityPage[] = [
  {
    slug: 'destin',
    name: 'Destin',
    state: 'FL',
    title: "Mobile Dog Gym Destin FL | Dog Treadmill Service — Kai's Run",
    description:
      "Mobile dog gym Destin FL — self-powered slatmill conditioning at your vacation rental or home. Dog treadmill service for snowbirds & high-drive dogs on the Emerald Coast.",
    h1: 'Mobile Dog Gym in Destin, FL',
    eyebrow: 'Destin · Emerald Coast',
    neighborhoodsLabel: 'Neighborhoods we serve in Destin',
    neighborhoods: ['Holiday Isle', 'Crystal Beach', 'Henderson Beach area', 'Destin Commons'],
    hubTeaser:
      'Born here. Built for snowbird season, Sandestin rentals, and year-round high-drive dogs who need more than a beach walk.',
    paragraphs: [
      "Destin dogs live in two worlds: the postcard beach day and the rental kitchen where a malinois is still pacing at 10pm. Owners arrive for a week at Sandestin or settle in for snowbird season from October through April — and the dog's energy budget does not care about your vacation schedule. Kai's Run is the only mobile slatmill service on the Emerald Coast, and it was built in Destin by someone who grew up on this sand.",
      "Travis started Kai's Run after his Rhodesian Ridgeback mix Kai could not be tired out by walks alone. The answer was structured, self-paced running on a professional slatmill — delivered to the driveway, one dog at a time, in a climate-controlled mobile unit. No facility drop-off. No group chaos. That model fits Destin especially well: vacation-rental driveways, gated communities off Scenic 98, and owners who want a real session between beach hours without hunting for a gym that accepts dogs.",
      "Summer heat and humidity make outdoor runs risky for dogs who do not know when to quit. The mobile unit keeps sessions controlled while still loading real cardiovascular work. High-drive breeds common in Destin — ridgebacks, shepherds, dock-diving retrievers, cattle dogs — need sustained aerobic output, not another sniff loop on the harbor walk. A 30–45 minute slatmill session loads the system the way natural running does, with the dog controlling every step.",
      "Holiday Isle and Crystal Beach rentals see the same story every peak week: the humans are sun-tired, the dog is not. Henderson Beach walks are enrichment, not conditioning. Destin Commons and the mid-town corridors fill with families who chose this coast for quality of life — and quality of life includes a dog who can settle at dinner. You get a progress photo and written recap within an hour after each visit. Your dog comes home measurably tired.",
      "Intro sessions start at $35 for one dog. The Founding Athlete program — $200 for five sessions, limited to 20 dogs — is a one-time rate that will not return once those spots are gone. Whether you are here for the season or call Destin home year-round, book online and we confirm your address on the day's route. Questions before you commit? Call or text 850-218-5855 — Travis responds personally.",
    ],
    crossLinks: [
      { slug: 'miramar-beach', name: 'Miramar Beach' },
      { slug: 'sandestin', name: 'Sandestin' },
    ],
  },
  {
    slug: 'fort-walton-beach',
    name: 'Fort Walton Beach',
    state: 'FL',
    title: "Mobile Dog Gym Fort Walton Beach FL | Slatmill Dog Service — Kai's Run",
    description:
      "Mobile dog gym Fort Walton Beach FL — slatmill conditioning at your driveway near Eglin AFB & Hurlburt Field. Dog treadmill sessions for military families & working breeds.",
    h1: 'Mobile Dog Gym in Fort Walton Beach, FL',
    eyebrow: 'Fort Walton Beach · Okaloosa Island',
    neighborhoodsLabel: 'Neighborhoods we serve in Fort Walton Beach',
    neighborhoods: ['Okaloosa Island', 'Cinco Bayou', 'Mary Esther', 'Ocean City'],
    hubTeaser:
      'Routed visits for Eglin & Hurlburt households — structured sessions that fit PCS calendars and shift work.',
    paragraphs: [
      "Fort Walton Beach runs on tight schedules. Active-duty families at Eglin Air Force Base and Hurlburt Field, dual-income households on Okaloosa Island, and working breeds that need a job before the household can breathe — the pattern is the same: plenty of good intentions, not enough structured output. Kai's Run brings a self-powered slatmill to your driveway so conditioning happens on your block, not across town at a facility that groups dogs together.",
      "Military households often know the breed profile before the furniture arrives: Belgian malinois, German shepherds, Dutch shepherds, high-drive mixes that treat a neighborhood walk as a warmup. Those dogs were bred for hours of focused work. A slatmill session gives them sustained aerobic load in 30–45 private minutes — warm-up, working sets, cool-down — with no motor forcing pace and no other dogs in the space. One dog. One handler. One clear beginning and end.",
      "Shift work and TDY timelines do not align with facility hours. A mobile dog gym that parks in your driveway removes the commute variable entirely. Cinco Bayou and Mary Esther addresses batch with Okaloosa Island routes so confirmation usually arrives within a couple of hours of booking. Ocean City and the north-side corridors follow the same geographic routing — we tell you honestly if an address fits the day's map before you pay.",
      "We route geographically across Fort Walton Beach and the surrounding communities so booking stays predictable even when deployment timelines shift. Active-duty military, veterans, reserves, and Guard receive 15% off. First responders and teachers receive 10% — mention your status when you book. Rabies vaccination and a digital waiver are required before the first session; Julius K9 harnesses are on the truck in common sizes.",
      "Start with an intro session at $35 for one dog ($55 for two dogs from the same household). If you are ready to commit before standard pricing is announced, the Founding Athlete program offers five sessions for $200 — a one-time introductory rate, limited to 20 dogs total. See how sessions are structured on our services page, then pick a time online. Your dog's conditioning should not wait on PCS orders or a free Saturday that never comes.",
    ],
  },
  {
    slug: 'niceville',
    name: 'Niceville',
    state: 'FL',
    title: "Mobile Dog Gym Niceville FL | Driveway Dog Treadmill — Kai's Run",
    description:
      "Mobile dog gym Niceville FL — private slatmill sessions in your driveway. Dog treadmill conditioning for Bluewater Bay families & work-from-home owners.",
    h1: 'Mobile Dog Gym in Niceville, FL',
    eyebrow: 'Niceville · Choctawhatchee Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Niceville',
    neighborhoods: ['Bluewater Bay', 'Rocky Bayou', 'Bayou Chico', 'College Boulevard corridor'],
    hubTeaser:
      'Quiet suburban driveways — private sessions while you work from home or run errands.',
    paragraphs: [
      "Niceville is where Emerald Coast life slows down just enough to hear your dog pacing again. Bluewater Bay subdivisions, tree-lined streets off John Sims Parkway, and backyards that should be enough — until a border collie or shepherd proves otherwise. Kai's Run is built for that gap: structured canine conditioning delivered to your driveway, without loading the crate into the car or sitting in traffic toward Destin.",
      "The service model fits suburban Niceville especially well. Many owners work from home and can step outside for five minutes to watch the intro hookup, then return to a call while the session runs. Others prefer to errand-run and come back to a progress photo in their inbox. Either way, the slatmill comes to you — leveled on flat driveway or pad, climate-controlled, one dog at a time. No daycare lobby. No reactivity triggers from unfamiliar packs.",
      "Rocky Bayou and the College Boulevard corridor see the same pattern: families chose Niceville for schools, space, and a quieter pace — then discover the dog still needs a real outlet. Bayou-side walks along Choctawhatchee Bay are beautiful enrichment, but they rarely hold a steady heart rate for working breeds. A dog treadmill session in your driveway concentrates that load into a bounded appointment with a clear warm-up and cool-down.",
      "A slatmill is self-powered: the dog drives the belt with their own gait, slows when they need recovery, and stops when they choose. That self-regulation matters for anxious or noise-sensitive dogs who shut down in group environments. Sessions run 30–45 minutes door-to-door. Most dogs accumulate 15–30 minutes of actual mill work depending on fitness and weather. You receive a photo and plain-language recap within an hour.",
      "Intro sessions are $35 for one dog. Two dogs from the same household are $55 — never group sessions, always private to your address. The Founding Athlete program offers five sessions for $200 while spots remain (20 dogs total, one-time offer). Niceville families who want predictable cadence can compare bundles and memberships on pricing after the first visit. Book online and we confirm your neighborhood on the route — or call 850-218-5855 with address questions before you schedule.",
    ],
  },
  {
    slug: 'miramar-beach',
    name: 'Miramar Beach',
    state: 'FL',
    title: "Mobile Dog Gym in Miramar Beach, FL | Kai's Run",
    description:
      "Kai's Run brings slatmill conditioning to Miramar Beach driveways — Grand Boulevard, Silver Sands, Maravilla. Private sessions for high-drive dogs on 30A. Book online.",
    h1: 'Mobile Dog Gym in Miramar Beach, FL',
    eyebrow: 'Miramar Beach · 30A Corridor',
    neighborhoodsLabel: 'Neighborhoods we serve in Miramar Beach',
    neighborhoods: ['Grand Boulevard', 'Silver Sands', 'Maravilla'],
    hubTeaser:
      'Between Destin and 30A — private slatmill conditioning for vacation rental owners and second-home residents on the beach road.',
    introText:
      "Miramar Beach sits between Destin and 30A — dense with vacation rentals, second homes, and HOA communities where 6 a.m. walks mean navigating parking lots and beach traffic before the day even starts. If your dog is wired and the beach access points are already crowded, a structured conditioning session at your door is a different kind of solution.",
    sections: [
      {
        h2: 'The neighborhood',
        paragraph:
          "The Grand Boulevard corridor brings traffic through all summer. The Silver Sands and Maravilla communities are full of owners who work from home, run short-term rentals, or spend months at a stretch on the coast — dogs included. Vacation rental schedules don't always line up with daylight hours suitable for a real workout. The slatmill does.",
      },
      {
        h2: 'What a session looks like in Miramar Beach',
        paragraph:
          "We pull up to your driveway — or your vacation rental's parking area, if accessible — and set up in the shade or in the climate-controlled unit. Your dog runs one-on-one. Nobody else's dog, no facility to drive to, no check-in. The session runs 30–45 minutes, and your dog goes back inside calm.",
      },
    ],
  },
  {
    slug: 'sandestin',
    name: 'Sandestin',
    state: 'FL',
    title: "Mobile Dog Gym in Sandestin, FL | Kai's Run",
    description:
      "Kai's Run serves Sandestin resort community — Baytowne, the Dunes, Burnt Pine, and the Links. Private slatmill conditioning at your door. No drop-off required.",
    h1: 'Mobile Dog Gym in Sandestin, FL',
    eyebrow: 'Sandestin · Emerald Coast Resort',
    neighborhoodsLabel: 'Communities we serve in Sandestin',
    neighborhoods: ['Baytowne', 'Dunes', 'Links', 'Burnt Pine'],
    hubTeaser:
      'Gated resort community — private slatmill sessions routed around HOA access rules. Natural fit for the Founding Athlete Program.',
    introText:
      "Sandestin is a gated resort community with HOA rules, tight street parking, and long distances between the Baytowne, Dunes, Links, and Burnt Pine villages. It's a place where people bring their dogs for extended stays — and where the normal \"drive to the dog park\" routine requires a car trip through a toll gate just to leave. The mobile model was made for this.",
    sections: [
      {
        h2: 'Who we serve here',
        paragraph:
          "Sandestin owners tend to have high-drive dogs and inconsistent schedules — they're here for a month, then gone, then back for the season. The Founding Athlete Program is a natural fit for this pattern: five sessions with priority booking, at a rate that lets you plan ahead without committing to a weekly standing appointment.",
      },
      {
        h2: 'How it works in Sandestin',
        paragraph:
          "We schedule around your availability and your HOA's access rules. If your unit allows vehicles at the door, that's where we set up. If not, we work from a nearby permitted area. Session length and structure are the same anywhere — one dog, 30–45 minutes, no other animals, no distractions.",
      },
    ],
  },
];

export function getServiceCityBySlug(slug: string): ServiceCityPage | undefined {
  return SERVICE_CITY_PAGES.find((city) => city.slug === slug);
}

export function getServiceCityPath(slug: ServiceCitySlug): string {
  return `/service-area/${slug}/`;
}
