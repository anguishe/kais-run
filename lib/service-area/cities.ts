export type ServiceCitySlug = 'destin' | 'fort-walton-beach' | 'niceville';

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
  paragraphs: string[];
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
];

export function getServiceCityBySlug(slug: string): ServiceCityPage | undefined {
  return SERVICE_CITY_PAGES.find((city) => city.slug === slug);
}

export function getServiceCityPath(slug: ServiceCitySlug): string {
  return `/service-area/${slug}/`;
}
