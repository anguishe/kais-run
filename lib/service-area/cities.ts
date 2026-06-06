export type ServiceCitySlug =
  | 'destin'
  | 'fort-walton-beach'
  | 'niceville'
  | 'miramar-beach'
  | 'sandestin'
  | 'shalimar'
  | 'mary-esther'
  | 'navarre'
  | 'santa-rosa-beach'
  | 'bluewater-bay'
  | 'valparaiso';

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
      "Mobile dog gym Destin FL — slatmill conditioning at your driveway or vacation rental. Dog treadmill for snowbirds & high-drive dogs on the Emerald Coast.",
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
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'niceville', name: 'Niceville' },
      { slug: 'miramar-beach', name: 'Miramar Beach' },
      { slug: 'sandestin', name: 'Sandestin' },
    ],
  },
  {
    slug: 'fort-walton-beach',
    name: 'Fort Walton Beach',
    state: 'FL',
    title: "Mobile Dog Gym Fort Walton Beach FL | Kai's Run",
    description:
      "Mobile dog gym Fort Walton Beach FL — private slatmill conditioning near Eglin AFB. Dog treadmill sessions for military families & working breeds.",
    h1: 'Mobile Dog Gym in Fort Walton Beach, FL',
    eyebrow: 'Fort Walton Beach · Okaloosa Island',
    neighborhoodsLabel: 'Neighborhoods we serve in Fort Walton Beach',
    neighborhoods: ['Okaloosa Island', 'Cinco Bayou', 'Mary Esther', 'Ocean City'],
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'niceville', name: 'Niceville' },
    ],
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
    title: "Mobile Dog Gym Niceville FL | Kai's Run",
    description:
      "Mobile dog gym Niceville FL — private slatmill sessions in your driveway. Dog treadmill conditioning for Bluewater Bay families & work-from-home owners.",
    h1: 'Mobile Dog Gym in Niceville, FL',
    eyebrow: 'Niceville · Choctawhatchee Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Niceville',
    neighborhoods: ['Bluewater Bay', 'Rocky Bayou', 'Bayou Chico', 'College Boulevard corridor'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'destin', name: 'Destin' },
    ],
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
      "Slatmill conditioning at Miramar Beach driveways — Grand Boulevard, Silver Sands, Maravilla. Private sessions for high-drive dogs on 30A. Book online.",
    h1: 'Mobile Dog Gym in Miramar Beach, FL',
    eyebrow: 'Miramar Beach · 30A Corridor',
    neighborhoodsLabel: 'Neighborhoods we serve in Miramar Beach',
    neighborhoods: ['Grand Boulevard', 'Silver Sands', 'Maravilla'],
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'sandestin', name: 'Sandestin' },
    ],
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
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'miramar-beach', name: 'Miramar Beach' },
    ],
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
  {
    slug: 'shalimar',
    name: 'Shalimar',
    state: 'FL',
    title: "Mobile Dog Gym Shalimar FL | Kai's Run",
    description:
      "Kai's Run brings a self-powered slatmill to your driveway in Shalimar, FL. Private canine conditioning sessions for high-drive dogs. Book an intro session — $35.",
    h1: 'Mobile Dog Conditioning in Shalimar, FL',
    eyebrow: 'Shalimar · Choctawhatchee Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Shalimar',
    neighborhoods: ['Shalimar Point', 'Eglin Parkway corridor', 'Choctawhatchee Bay shore', 'Fort Walton Beach border'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'niceville', name: 'Niceville' },
    ],
    hubTeaser:
      'Small-town bayfront driveways — military-adjacent households with high-drive shepherds, malinois, and hunting breeds.',
    paragraphs: [
      "Shalimar is a small town on the south shore of Choctawhatchee Bay — roughly seven hundred residents, directly adjacent to Fort Walton Beach and Eglin Air Force Base. The streets are quiet, the yards are generous, and the dog profile skews high-drive: German shepherds, Belgian malinois, labs built for field work, hunting breeds that treat a bayfront stroll as a warmup. Kai's Run brings a self-powered slatmill to your driveway so conditioning happens at home — no drop-off, no group sessions, one dog at a time.",
      "Shalimar's military-adjacent community knows what structure does for performance. The same principle applies to your dog. Active-duty, veteran, and Guard households here understand that a working animal needs a job — not just access to grass. A slatmill session loads sustained aerobic output in 30–45 private minutes: warm-up, working sets, cool-down, with the dog controlling every step on a belt with no motor. Fort Walton Beach is under five minutes away, and we batch Shalimar addresses with FWB and Niceville routes.",
      "Disciplined, structure-oriented households are the norm here — and that maps cleanly to how we run sessions. Travis sets up on level driveway or pad, handles the hookup, and keeps the climate-controlled mobile unit ready for Florida heat. Rabies vaccination and a digital waiver are required before the first visit. Julius K9 harnesses are on the truck in common sizes. You receive a progress photo and plain-language recap within an hour after each session.",
      "Bayfront walks along Choctawhatchee Bay are enrichment — scent, sightlines, decompressing after a long day. They are not conditioning for a malinois that still has gears left at 9 p.m. Structured slatmill work closes the gap between what your dog was bred to do and what suburban life allows. Sessions run 30–45 minutes door-to-door; most dogs accumulate 15–30 minutes of actual mill work depending on fitness and weather.",
      "Intro sessions start at $35 for one dog ($55 for two dogs from the same household). The Founding Athlete program — $200 for five sessions, limited to 20 dogs — is a one-time rate while spots remain. Book online and we confirm your Shalimar address on the day's route, or call 850-218-5855 with questions before you schedule.",
    ],
  },
  {
    slug: 'mary-esther',
    name: 'Mary Esther',
    state: 'FL',
    title: "Mobile Dog Gym Mary Esther FL | Kai's Run",
    description:
      "Kai's Run delivers private slatmill conditioning to Mary Esther, FL. Structured exercise for high-drive dogs — no drop-off, no group sessions. $35 intro.",
    h1: 'Mobile Dog Conditioning in Mary Esther, FL',
    eyebrow: 'Mary Esther · Choctaw Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Mary Esther',
    neighborhoods: ['Mary Esther Boulevard', 'Choctaw Bay waterfront', 'US-98 corridor', 'Fort Walton Beach border'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'destin', name: 'Destin' },
    ],
    hubTeaser:
      'Bayfront residential streets — dog-heavy neighborhoods where calm streets do not always mean calm dogs.',
    paragraphs: [
      "Mary Esther is tucked between Fort Walton Beach and Navarre along the bay. Residential, calm — but the dogs here don't always match the neighborhood's pace. A city of roughly four thousand sits immediately west of Fort Walton Beach on US-98, with waterfront homes along Choctawhatchee Bay and a mix of retirees and military families who share the same problem: high-drive dogs in quiet subdivisions.",
      "Dog-heavy neighborhood density means you see shepherds, retrievers, and working mixes on every block — dogs bred for output, living in yards that look sufficient until they are not. Kai's Run delivers private slatmill conditioning to your driveway: self-powered, climate-controlled, one dog at a time. No facility commute. No group chaos. Destin is a ten-minute drive east; we route Mary Esther visits with Fort Walton Beach and Okaloosa Island batches.",
      "Bay access is a gift for enrichment walks — ducks, boats, salt air. It rarely holds a steady heart rate for a dog that needs real aerobic load. A slatmill session concentrates that work into a bounded 30–45 minute appointment with clear warm-up and cool-down. The dog drives the belt at their own pace; nothing forces speed. That self-regulation matters for noise-sensitive or reactive dogs who shut down in group environments.",
      "Military families and retirees alike benefit from a service that comes to the address instead of adding another errand. Travis handles setup, monitors the session, and sends a progress photo within an hour. Rabies vaccination and a digital waiver are required before the first visit. Active-duty military, veterans, reserves, and Guard receive 15% off; first responders and teachers receive 10%.",
      "Start with an intro session at $35 for one dog ($55 for two dogs from the same household). The Founding Athlete program offers five sessions for $200 while the 20-dog cap remains — a one-time rate, not a lifetime lock. Book online and we confirm your Mary Esther address on the route, or call 850-218-5855 before you commit.",
    ],
  },
  {
    slug: 'navarre',
    name: 'Navarre',
    state: 'FL',
    title: "Mobile Dog Gym Navarre FL | Kai's Run",
    description:
      "Kai's Run brings mobile canine conditioning to Navarre, FL. Private slatmill sessions for high-drive dogs delivered to your driveway. Book an intro — $35.",
    h1: 'Mobile Dog Conditioning in Navarre, FL',
    eyebrow: 'Navarre · Quiet Side of the Emerald Coast',
    neighborhoodsLabel: 'Neighborhoods we serve in Navarre',
    neighborhoods: ['Navarre Beach', 'Gulf Boulevard', 'Holley by the Sea', 'Hurlburt Field corridor'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'destin', name: 'Destin' },
    ],
    hubTeaser:
      'Fast-growing Santa Rosa County — military families and beach access without the Destin tourist crush.',
    paragraphs: [
      "Navarre calls itself the quiet side of the Emerald Coast. But quiet neighborhoods don't mean quiet dogs. An unincorporated community of roughly thirty-seven thousand in Santa Rosa County, Navarre is fast-growing, residential, and full of military and veteran families — with Hurlburt Field nearby and beach access that draws less tourist traffic than Destin twenty minutes to the east.",
      "Large yards, new subdivisions, and dogs that outpace their owners' schedules — that is the Navarre pattern Kai's Run was built for. We bring a self-powered slatmill to your driveway for private, one-on-one conditioning. No drop-off. No group sessions. One dog at a time in a climate-controlled mobile unit. High-drive breeds common here — shepherds, malinois, sporting retrievers, cattle dogs — need sustained aerobic output, not another loop on Gulf Boulevard.",
      "Beach walks at Navarre Beach are enrichment and decompression. They rarely deliver the structured load a working dog needs before the household can settle. Slatmill sessions run 30–45 minutes door-to-door with warm-up, working sets, and cool-down. The dog controls pace on a belt with no motor. You get a progress photo and written recap within an hour. We route Navarre addresses geographically with Fort Walton Beach and Mary Esther visits.",
      "Military and veteran households receive 15% off; first responders and teachers receive 10% — mention your status when you book. Rabies vaccination and a digital waiver are required before the first session. Julius K9 harnesses are on the truck in common sizes. Summer heat makes outdoor runs risky for dogs who do not self-limit — the mobile unit keeps work controlled while still loading real cardiovascular output.",
      "Intro sessions are $35 for one dog ($55 for two dogs from the same household). The Founding Athlete program — $200 for five sessions, limited to 20 dogs — is available while spots remain. Book online and we confirm your Navarre address fits the day's route, or call 850-218-5855 with neighborhood questions.",
    ],
  },
  {
    slug: 'santa-rosa-beach',
    name: 'Santa Rosa Beach',
    state: 'FL',
    title: "Mobile Dog Gym Santa Rosa Beach FL | Kai's Run",
    description:
      "Kai's Run serves Santa Rosa Beach, FL with private mobile slatmill sessions for high-drive dogs. No drop-off. No group sessions. Delivered to your driveway.",
    h1: 'Mobile Dog Conditioning in Santa Rosa Beach, FL',
    eyebrow: 'Santa Rosa Beach · Scenic Hwy 30A',
    neighborhoodsLabel: 'Neighborhoods we serve in Santa Rosa Beach',
    neighborhoods: ['Scenic Hwy 30A', 'Blue Mountain Beach area', 'Dune Allen', 'Beach cottage corridor'],
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'miramar-beach', name: 'Miramar Beach' },
    ],
    hubTeaser:
      '30A beach houses and second homes — structured conditioning without driving to a facility.',
    paragraphs: [
      "Santa Rosa Beach stretches along 30A — beach houses, second homes, vacation rentals. A lot of dogs spending time here with owners who want a real workout option without driving somewhere. An unincorporated Walton County community along Scenic Highway 30A, Santa Rosa Beach mixes upscale vacation properties with full-time residents — dog-friendly, yard-heavy, and fifteen minutes from Destin.",
      "Snowbird and seasonal population swings mean dogs arrive for a month, then leave, then return — energy budgets that do not care about your rental calendar. Kai's Run brings a self-powered slatmill to your driveway or accessible parking area for private conditioning: one dog, climate-controlled unit, no facility drop-off. Beach cottages often have large active dogs — ridgebacks, retrievers, shepherds — that need more than a sand walk between rental check-in and dinner.",
      "30A traffic and parking make facility commutes a project. The mobile model removes that variable entirely. Travis sets up on level ground, runs a structured 30–45 minute session with warm-up and cool-down, and sends a progress photo within an hour. The dog drives the belt at their own pace. No motor forces speed. No other dogs in the space.",
      "Vacation rental schedules rarely align with dog park hours or daylight suitable for hard exercise. A slatmill session at your door fits between beach time and checkout stress. The Founding Athlete program — five sessions for $200, limited to 20 dogs — suits seasonal owners who want predictable cadence without a weekly standing appointment.",
      "Intro sessions start at $35 for one dog ($55 for two dogs from the same household). Book online and we confirm your Santa Rosa Beach address on the route — HOA access and parking rules included in that conversation. Questions first? Call 850-218-5855.",
    ],
  },
  {
    slug: 'bluewater-bay',
    name: 'Bluewater Bay',
    state: 'FL',
    title: "Mobile Dog Gym Bluewater Bay FL | Kai's Run",
    description:
      "Kai's Run brings mobile dog conditioning to Bluewater Bay, FL. Private slatmill sessions for high-drive dogs — delivered to your driveway near Niceville.",
    h1: 'Mobile Dog Conditioning in Bluewater Bay, FL',
    eyebrow: 'Bluewater Bay · Niceville North',
    neighborhoodsLabel: 'Neighborhoods we serve in Bluewater Bay',
    neighborhoods: ['Golf course community', 'Rocky Bayou access', 'Niceville border', 'John Sims Parkway corridor'],
    crossLinks: [
      { slug: 'niceville', name: 'Niceville' },
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
    ],
    hubTeaser:
      'Planned community north of Niceville — big yards, dual-income households, high-drive dogs.',
    paragraphs: [
      "Bluewater Bay is a few minutes north of Niceville — established residential, big yards, high-drive dogs. A planned community and census-designated place in Okaloosa County, Bluewater Bay sits directly north of Niceville with upper-income single-family homes, a golf course community, and dual-income professional households whose dogs often outpace their schedules.",
      "Large yards look sufficient until a border collie, shepherd, or field lab proves otherwise. Kai's Run delivers private slatmill conditioning to your driveway — self-powered, climate-controlled, one dog at a time. No crate load. No traffic toward Destin. No daycare lobby or group reactivity triggers. We batch Bluewater Bay addresses with Niceville and Fort Walton Beach routes; confirmation usually arrives within a couple of hours of booking.",
      "Work-from-home owners can step outside for the intro hookup and return to a call while the session runs. Others errand-run and come back to a progress photo in their inbox. Sessions run 30–45 minutes door-to-door with warm-up, working sets, and cool-down. The dog controls pace on a belt with no motor — critical for dogs that shut down in unfamiliar group environments.",
      "Rocky Bayou and bay-side walks are enrichment, not conditioning. Structured slatmill work loads sustained aerobic output in a bounded appointment. Rabies vaccination and a digital waiver are required before the first visit. Julius K9 harnesses are on the truck in common sizes. Active-duty military, veterans, reserves, and Guard receive 15% off; first responders and teachers receive 10%.",
      "Intro sessions are $35 for one dog ($55 for two dogs from the same household). The Founding Athlete program offers five sessions for $200 while the 20-dog cap remains. Book online and we confirm your Bluewater Bay address fits the day's map, or call 850-218-5855 with questions.",
    ],
  },
  {
    slug: 'valparaiso',
    name: 'Valparaiso',
    state: 'FL',
    title: "Mobile Dog Gym Valparaiso FL | Kai's Run",
    description:
      "Kai's Run serves Valparaiso, FL with private mobile canine conditioning. Slatmill sessions for working dogs and high-drive breeds — $35 intro session.",
    h1: 'Mobile Dog Conditioning in Valparaiso, FL',
    eyebrow: 'Valparaiso · Eglin AFB Edge',
    neighborhoodsLabel: 'Neighborhoods we serve in Valparaiso',
    neighborhoods: ['Eglin AFB adjacency', 'John Sims Parkway', "Tom's Bayou", 'Fort Walton Beach corridor'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'niceville', name: 'Niceville' },
    ],
    hubTeaser:
      'Eglin-adjacent city — working-dog culture, malinois and shepherds, quick access from FWB and Niceville.',
    paragraphs: [
      "Valparaiso sits at the edge of Eglin Air Force Base — a community that understands what structured work does for a working animal. A city of roughly six thousand directly adjacent to Eglin, Valparaiso carries heavy military working-dog culture: Belgian malinois, German shepherds, retrievers built for field work — breeds that treat a neighborhood walk as a warmup, not a workout.",
      "Kai's Run brings a self-powered slatmill to your driveway for private canine conditioning — one dog, climate-controlled mobile unit, no drop-off, no group sessions. Quick access from Fort Walton Beach and Niceville means we route Valparaiso addresses with Eglin-adjacent batches. Shift work, TDY timelines, and PCS calendars do not align with facility hours; a mobile gym that parks at your address removes the commute variable entirely.",
      "Military households often arrive knowing the breed profile before the furniture does. Those dogs were bred for hours of focused output. A slatmill session delivers sustained aerobic load in 30–45 private minutes with warm-up, working sets, and cool-down — the dog controlling every step on a belt with no motor. Active-duty military, veterans, reserves, and Guard receive 15% off. First responders and teachers receive 10%.",
      "Structured work closes the gap between what your dog was bred to do and what suburban life allows. Travis handles setup, monitors the session, and sends a progress photo and plain-language recap within an hour. Rabies vaccination and a digital waiver are required before the first visit. Julius K9 harnesses are on the truck in common sizes.",
      "Start with an intro session at $35 for one dog ($55 for two dogs from the same household). The Founding Athlete program — $200 for five sessions, limited to 20 dogs — is a one-time rate while spots remain. Book online and we confirm your Valparaiso address on the route, or call 850-218-5855 — Travis responds personally.",
    ],
  },
];

export function getServiceCityBySlug(slug: string): ServiceCityPage | undefined {
  return SERVICE_CITY_PAGES.find((city) => city.slug === slug);
}

export function getServiceCityPath(slug: ServiceCitySlug): string {
  return `/service-area/${slug}/`;
}
