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
  closingHook: string;
};

export const SERVICE_CITY_PAGES: ServiceCityPage[] = [
  {
    slug: 'destin',
    name: 'Destin',
    state: 'FL',
    title: "Mobile Dog Gym Destin FL | Dog Treadmill Service - Kai's Run",
    description:
      "Mobile dog gym Destin FL - slatmill conditioning at your driveway or vacation rental. Dog treadmill for snowbirds & high-drive dogs on the Emerald Coast.",
    h1: 'Mobile Dog Gym in Destin, FL',
    eyebrow: 'Destin · Emerald Coast',
    neighborhoodsLabel: 'Neighborhoods we serve in Destin',
    neighborhoods: ['Holiday Isle', 'Crystal Beach', 'Henderson Beach area', 'Destin Commons'],
    hubTeaser:
      'Born here. Built for snowbird season, Sandestin rentals, and year-round high-drive dogs who need more than a beach walk.',
    paragraphs: [
      "Destin dogs live in two worlds: the postcard beach day and the rental kitchen where a malinois is still pacing at 10pm. Owners arrive for a week at Sandestin or settle in for snowbird season from October through April - and the dog's energy budget does not care about your vacation schedule. Kai's Run is the only mobile slatmill service on the Emerald Coast, and it was built in Destin by someone who grew up on this sand.",
      "Travis started Kai's Run after his Rhodesian Ridgeback mix Kai could not be tired out by walks alone. The answer was structured, self-paced running on a professional slatmill - delivered to the driveway, one dog at a time, in a climate-controlled mobile unit. No facility drop-off. No group chaos. That model fits Destin especially well: vacation-rental driveways, gated communities off Scenic 98, and owners who want a real session between beach hours without hunting for a gym that accepts dogs.",
      "Summer heat and humidity make outdoor runs risky for dogs who do not know when to quit. The mobile unit keeps sessions controlled while still loading real cardiovascular work. High-drive breeds common in Destin - ridgebacks, shepherds, dock-diving retrievers, cattle dogs - need sustained aerobic output, not another sniff loop on the harbor walk. A 30–45 minute slatmill session loads the system the way natural running does, with the dog controlling every step.",
      "Holiday Isle and Crystal Beach rentals see the same story every peak week: the humans are sun-tired, the dog is not. Henderson Beach walks are enrichment, not conditioning. Destin Commons and the mid-town corridors fill with families who chose this coast for quality of life - and quality of life includes a dog who can settle at dinner. You get a progress photo and written recap within an hour after each visit. Your dog comes home measurably tired.",
    ],
    closingHook:
      "Destin is home base for Kai's Run - the anchor of the route and the schedule.",
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
      "Mobile dog gym Fort Walton Beach FL - private slatmill conditioning near Eglin AFB. Dog treadmill sessions for military families & working breeds.",
    h1: 'Mobile Dog Gym in Fort Walton Beach, FL',
    eyebrow: 'Fort Walton Beach · Okaloosa Island',
    neighborhoodsLabel: 'Neighborhoods we serve in Fort Walton Beach',
    neighborhoods: ['Okaloosa Island', 'Cinco Bayou', 'Mary Esther', 'Ocean City'],
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'niceville', name: 'Niceville' },
    ],
    hubTeaser:
      'Routed visits for Eglin & Hurlburt households - structured sessions that fit PCS calendars and shift work.',
    paragraphs: [
      "Fort Walton Beach runs on tight schedules. Active-duty families at Eglin Air Force Base and Hurlburt Field, dual-income households on Okaloosa Island, and working breeds that need a job before the household can breathe - the pattern is the same: plenty of good intentions, not enough structured output. Kai's Run brings a self-powered slatmill to your driveway so conditioning happens on your block, not across town at a facility that groups dogs together.",
      "Military households often know the breed profile before the furniture arrives: Belgian malinois, German shepherds, Dutch shepherds, high-drive mixes that treat a neighborhood walk as a warmup. Those dogs were bred for hours of focused work. A slatmill session gives them sustained aerobic load in 30–45 private minutes - warm-up, working sets, cool-down - with no motor forcing pace and no other dogs in the space. One dog. One handler. One clear beginning and end.",
      "Shift work and TDY timelines do not align with facility hours. A mobile dog gym that parks in your driveway removes the commute variable entirely. Cinco Bayou and Mary Esther addresses batch with Okaloosa Island routes so confirmation usually arrives within a couple of hours of booking. Ocean City and the north-side corridors follow the same geographic routing - we tell you honestly if an address fits the day's map before you pay.",
      "We route geographically across Fort Walton Beach and the surrounding communities so booking stays predictable even when deployment timelines shift. Active-duty military, veterans, reserves, Guard, and first responders receive the Military & First Responder Discount - 10% off all paid sessions and packages, excluding the Intro Session - mention your status when you book. Rabies vaccination and a digital waiver are required before the first session; Julius K9 harnesses are on the truck in common sizes.",
    ],
    closingHook:
      "Fort Walton Beach anchors the western half of the route, and its morning slots go first.",
  },
  {
    slug: 'niceville',
    name: 'Niceville',
    state: 'FL',
    title: "Mobile Dog Gym Niceville FL | Kai's Run",
    description:
      "Mobile dog gym Niceville FL - private slatmill sessions in your driveway. Dog treadmill conditioning for Bluewater Bay families & work-from-home owners.",
    h1: 'Mobile Dog Gym in Niceville, FL',
    eyebrow: 'Niceville · Choctawhatchee Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Niceville',
    neighborhoods: ['Bluewater Bay', 'Rocky Bayou', 'Bayou Chico', 'College Boulevard corridor'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'destin', name: 'Destin' },
    ],
    hubTeaser:
      'Quiet suburban driveways - private sessions while you work from home or run errands.',
    paragraphs: [
      "Niceville is where Emerald Coast life slows down just enough to hear your dog pacing again. Bluewater Bay subdivisions, tree-lined streets off John Sims Parkway, and backyards that should be enough - until a border collie or shepherd proves otherwise. Kai's Run is built for that gap: structured canine conditioning delivered to your driveway, without loading the crate into the car or sitting in traffic toward Destin.",
      "The service model fits suburban Niceville especially well. Many owners work from home and can step outside for five minutes to watch the intro hookup, then return to a call while the session runs. Others prefer to errand-run and come back to a progress photo in their inbox. Either way, the slatmill comes to you - leveled on flat driveway or pad, cooled against the heat, one dog at a time. No daycare lobby. No reactivity triggers from unfamiliar packs.",
      "Rocky Bayou and the College Boulevard corridor see the same pattern: families chose Niceville for schools, space, and a quieter pace - then discover the dog still needs a real outlet. Bayou-side walks along Choctawhatchee Bay are beautiful enrichment, but they rarely hold a steady heart rate for working breeds. A dog treadmill session in your driveway concentrates that load into a bounded appointment with a clear warm-up and cool-down.",
      "A slatmill is self-powered: the dog drives the belt with their own gait, slows when they need recovery, and stops when they choose. That self-regulation matters for anxious or noise-sensitive dogs who shut down in group environments. Sessions run 30–45 minutes door-to-door. Most dogs accumulate 15–30 minutes of actual mill work depending on fitness and weather. You receive a photo and plain-language recap within an hour.",
    ],
    closingHook:
      "Niceville dogs work in their own driveways, not in a facility across the bay.",
  },
  {
    slug: 'miramar-beach',
    name: 'Miramar Beach',
    state: 'FL',
    title: "Mobile Dog Gym in Miramar Beach, FL | Kai's Run",
    description:
      "Slatmill conditioning at Miramar Beach driveways - Grand Boulevard, Silver Sands, Maravilla. Private sessions for high-drive dogs on 30A. Book online.",
    h1: 'Mobile Dog Gym in Miramar Beach, FL',
    eyebrow: 'Miramar Beach · 30A Corridor',
    neighborhoodsLabel: 'Neighborhoods we serve in Miramar Beach',
    neighborhoods: ['Grand Boulevard', 'Silver Sands', 'Maravilla'],
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'sandestin', name: 'Sandestin' },
    ],
    hubTeaser:
      'Between Destin and 30A - private slatmill conditioning for vacation rental owners and second-home residents on the beach road.',
    paragraphs: [
      "Miramar Beach is the wedge between Destin's harbor and the 30A beach towns - a dense strip of vacation rentals, second homes, and gated HOA communities where the dog population spikes every season. Owners here run short-term rentals, work from home, or settle in for months at a stretch, and the dog comes with them. The friction shows up early: a 6 a.m. walk means fighting for beach-access parking before the heat arrives, and a high-drive dog treats that walk as a warmup. Kai's Run brings a self-powered slatmill to your driveway so the workout happens where you already are.",
      "The Grand Boulevard corridor stays busy with shoppers and traffic straight through summer. Silver Sands and Maravilla fill with owners who chose the coast for the lifestyle and brought working dogs along for it - retrievers, shepherds, doodles with more engine than the backyard can burn off. Rental turnover means a fresh set of dogs every week, all of them under-exercised by a vacation schedule that never lines up with cool daylight hours. A slatmill session does not care what time checkout is.",
      "A walk on the Gulf side is enrichment - salt air, new smells, decompression. It rarely holds a steady heart rate long enough to count as conditioning for a dog bred to work. A 30–45 minute slatmill session concentrates real aerobic load into a bounded appointment: warm-up, working sets, cool-down, with the dog driving the belt at its own pace. No motor forces speed. The dog slows to recover and stops when it is done. That self-regulation matters for reactive or noise-sensitive dogs who fall apart in a group daycare setting.",
      "We pull up to your driveway, or to your rental's accessible parking area, and set up in shade or inside the temperature-controlled mobile unit - no facility to drive to, no check-in line, no other dog in the space. Travis handles the hookup, monitors the whole session, and sends a progress photo with a plain-language recap within an hour. Rabies vaccination and a signed digital waiver are required before the first visit. Julius K9 harnesses ride on the truck in common sizes. Your dog goes back inside calm instead of pacing the tile at 10 p.m.",
    ],
    closingHook:
      "Miramar Beach mornings beat the Highway 98 traffic and the pavement heat in one move.",
  },
  {
    slug: 'sandestin',
    name: 'Sandestin',
    state: 'FL',
    title: "Mobile Dog Gym in Sandestin, FL | Kai's Run",
    description:
      "Kai's Run serves Sandestin resort community - Baytowne, the Dunes, Burnt Pine, and the Links. Private slatmill conditioning at your door. No drop-off required.",
    h1: 'Mobile Dog Gym in Sandestin, FL',
    eyebrow: 'Sandestin · Emerald Coast Resort',
    neighborhoodsLabel: 'Communities we serve in Sandestin',
    neighborhoods: ['Baytowne', 'Dunes', 'Links', 'Burnt Pine'],
    crossLinks: [
      { slug: 'destin', name: 'Destin' },
      { slug: 'miramar-beach', name: 'Miramar Beach' },
    ],
    hubTeaser:
      'Gated resort community - private slatmill sessions routed around HOA access rules. Natural fit for the Founding Athlete Program.',
    paragraphs: [
      "Sandestin is a gated resort behind a toll gate - 2,400 acres split across the Baytowne, Dunes, Links, and Burnt Pine villages, with HOA rules, tight street parking, and real distance between neighborhoods. The everyday friction is logistics: leaving to take the dog somewhere means loading the car and clearing the gate before you have even started. People bring dogs here for extended stays, a month or a season at a time, and the resort is built for golf carts and beach chairs, not for burning down a high-drive dog's energy. The mobile model was made for exactly this.",
      "Baytowne condos, the Dunes towers, the Links fairway homes, and the Burnt Pine estates draw a specific owner: here for a stretch, then gone, then back for the next season. Their dogs skew high-drive and their calendars skew unpredictable. A standing weekly appointment does not fit a life measured in month-long stays - which is why the Founding Athlete run, five sessions with priority booking, tends to fit resort owners better than any recurring plan. You buy the block and use it when you are in town.",
      "A walk to the Baytowne marina is a nice loop, but it is enrichment, not conditioning - sightlines, other dogs, salt air, and a heart rate that never settles into real work. A slatmill session loads sustained aerobic output in 30–45 minutes with a clear warm-up and cool-down, and the dog controls every step on a self-powered belt with no motor. For a shepherd or malinois with gears left at 9 p.m., that bounded private session is the difference between a dog that settles at dinner and one that patrols the condo.",
      "We schedule around your availability and your village's access rules. If your unit allows a vehicle at the door, that is where we set up; if not, we work from a nearby permitted area and keep the session inside the air-conditioned mobile unit against Florida heat. One dog, no other animals, no distractions - the structure is identical wherever the truck parks. Travis handles setup, monitors the run, and sends a progress photo and plain-language recap within an hour. Rabies vaccination and a signed waiver are required before the first visit.",
    ],
    closingHook:
      "Inside Sandestin's gates, the self-powered rig runs near-silent - no generator, no noise complaints.",
  },
  {
    slug: 'shalimar',
    name: 'Shalimar',
    state: 'FL',
    title: "Mobile Dog Gym Shalimar FL | Kai's Run",
    description:
      "Mobile dog conditioning in Shalimar, FL. Private slatmill sessions at your driveway - structured work for high-energy dogs near Eglin AFB.",
    h1: 'Mobile Dog Conditioning in Shalimar, FL',
    eyebrow: 'Shalimar · Choctawhatchee Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Shalimar',
    neighborhoods: ['Shalimar Point', 'Eglin Parkway corridor', 'Choctawhatchee Bay shore', 'Fort Walton Beach border'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'niceville', name: 'Niceville' },
    ],
    hubTeaser:
      'Small-town bayfront driveways - military-adjacent households with high-drive shepherds, malinois, and hunting breeds.',
    paragraphs: [
      "Shalimar is a small town on the south shore of Choctawhatchee Bay - roughly seven hundred residents, directly adjacent to Fort Walton Beach and Eglin Air Force Base. The streets are quiet, the yards are generous, and the dog profile skews high-drive: German shepherds, Belgian malinois, labs built for field work, hunting breeds that treat a bayfront stroll as a warmup. Kai's Run brings a self-powered slatmill to your driveway so conditioning happens at home - no drop-off, no group sessions, one dog at a time.",
      "Shalimar's military-adjacent community knows what structure does for performance. The same principle applies to your dog. Active-duty, veteran, and Guard households here understand that a working animal needs a job - not just access to grass. A slatmill session loads sustained aerobic output in 30–45 private minutes: warm-up, working sets, cool-down, with the dog controlling every step on a belt with no motor. Fort Walton Beach is under five minutes away, and we batch Shalimar addresses with FWB and Niceville routes.",
      "Disciplined, structure-oriented households are the norm here - and that maps cleanly to how we run sessions. Travis sets up on level driveway or pad, handles the hookup, and keeps the air-conditioned mobile unit ready for Florida heat. Rabies vaccination and a digital waiver are required before the first visit. Julius K9 harnesses are on the truck in common sizes. You receive a progress photo and plain-language recap within an hour after each session.",
      "Bayfront walks along Choctawhatchee Bay are enrichment - scent, sightlines, decompressing after a long day. They are not conditioning for a malinois that still has gears left at 9 p.m. Structured slatmill work closes the gap between what your dog was bred to do and what suburban life allows. Sessions run 30–45 minutes door-to-door; most dogs accumulate 15–30 minutes of actual mill work depending on fitness and weather.",
    ],
    closingHook:
      "Shalimar sits in the heart of the service area, which keeps its scheduling flexible.",
  },
  {
    slug: 'mary-esther',
    name: 'Mary Esther',
    state: 'FL',
    title: "Mobile Dog Gym Mary Esther FL | Kai's Run",
    description:
      "Kai's Run delivers private slatmill conditioning to Mary Esther, FL. Structured exercise for high-drive dogs - no drop-off, no group sessions. Book online.",
    h1: 'Mobile Dog Conditioning in Mary Esther, FL',
    eyebrow: 'Mary Esther · Choctaw Bay',
    neighborhoodsLabel: 'Neighborhoods we serve in Mary Esther',
    neighborhoods: ['Mary Esther Boulevard', 'Choctaw Bay waterfront', 'US-98 corridor', 'Fort Walton Beach border'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'destin', name: 'Destin' },
    ],
    hubTeaser:
      'Bayfront residential streets - dog-heavy neighborhoods where calm streets do not always mean calm dogs.',
    paragraphs: [
      "Mary Esther is tucked between Fort Walton Beach and Navarre along the bay. Residential, calm - but the dogs here don't always match the neighborhood's pace. A city of roughly four thousand sits immediately west of Fort Walton Beach on US-98, with waterfront homes along Choctawhatchee Bay and a mix of retirees and military families who share the same problem: high-drive dogs in quiet subdivisions.",
      "Dog-heavy neighborhood density means you see shepherds, retrievers, and working mixes on every block - dogs bred for output, living in yards that look sufficient until they are not. Kai's Run delivers private slatmill conditioning to your driveway: self-powered, temperature-controlled, one dog at a time. No facility commute. No group chaos. Destin is a ten-minute drive east; we route Mary Esther visits with Fort Walton Beach and Okaloosa Island batches.",
      "Bay access is a gift for enrichment walks - ducks, boats, salt air. It rarely holds a steady heart rate for a dog that needs real aerobic load. A slatmill session concentrates that work into a bounded 30–45 minute appointment with clear warm-up and cool-down. The dog drives the belt at their own pace; nothing forces speed. That self-regulation matters for noise-sensitive or reactive dogs who shut down in group environments.",
      "Military families and retirees alike benefit from a service that comes to the address instead of adding another errand. Travis handles setup, monitors the session, and sends a progress photo within an hour. Rabies vaccination and a digital waiver are required before the first visit. Active-duty military, veterans, reserves, Guard, and first responders receive the Military & First Responder Discount - 10% off all paid sessions and packages, excluding the Intro Session.",
    ],
    closingHook:
      "Mary Esther and Hurlburt-adjacent families can book around shift and rotation schedules.",
  },
  {
    slug: 'navarre',
    name: 'Navarre',
    state: 'FL',
    title: "Mobile Dog Gym Navarre FL | Kai's Run",
    description:
      "Kai's Run brings mobile canine conditioning to Navarre, FL. Private slatmill sessions for high-drive dogs delivered to your driveway. Book an intro online.",
    h1: 'Mobile Dog Conditioning in Navarre, FL',
    eyebrow: 'Navarre · Quiet Side of the Emerald Coast',
    neighborhoodsLabel: 'Neighborhoods we serve in Navarre',
    neighborhoods: ['Navarre Beach', 'Gulf Boulevard', 'Holley by the Sea', 'Hurlburt Field corridor'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'destin', name: 'Destin' },
    ],
    hubTeaser:
      'Fast-growing Santa Rosa County - military families and beach access without the Destin tourist crush.',
    paragraphs: [
      "Navarre calls itself the quiet side of the Emerald Coast. But quiet neighborhoods don't mean quiet dogs. An unincorporated community of roughly thirty-seven thousand in Santa Rosa County, Navarre is fast-growing, residential, and full of military and veteran families - with Hurlburt Field nearby and beach access that draws less tourist traffic than Destin twenty minutes to the east.",
      "Large yards, new subdivisions, and dogs that outpace their owners' schedules - that is the Navarre pattern Kai's Run was built for. We bring a self-powered slatmill to your driveway for private, one-on-one conditioning. No drop-off. No group sessions. One dog at a time in a climate-controlled mobile unit. High-drive breeds common here - shepherds, malinois, sporting retrievers, cattle dogs - need sustained aerobic output, not another loop on Gulf Boulevard.",
      "Beach walks at Navarre Beach are enrichment and decompression. They rarely deliver the structured load a working dog needs before the household can settle. Slatmill sessions run 30–45 minutes door-to-door with warm-up, working sets, and cool-down. The dog controls pace on a belt with no motor. You get a progress photo and written recap within an hour. We route Navarre addresses geographically with Fort Walton Beach and Mary Esther visits.",
      "Military, veteran, and first responder households receive the Military & First Responder Discount - 10% off all paid sessions and packages, excluding the Intro Session - mention your status when you book. Rabies vaccination and a digital waiver are required before the first session. Julius K9 harnesses are on the truck in common sizes. Summer heat makes outdoor runs risky for dogs who do not self-limit - the mobile unit keeps work controlled while still loading real cardiovascular output.",
    ],
    closingHook:
      "Navarre marks the western edge of the service area - early booking holds the best windows.",
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
      '30A beach houses and second homes - structured conditioning without driving to a facility.',
    paragraphs: [
      "Santa Rosa Beach stretches along 30A - beach houses, second homes, vacation rentals. A lot of dogs spending time here with owners who want a real workout option without driving somewhere. An unincorporated Walton County community along Scenic Highway 30A, Santa Rosa Beach mixes upscale vacation properties with full-time residents - dog-friendly, yard-heavy, and fifteen minutes from Destin.",
      "Snowbird and seasonal population swings mean dogs arrive for a month, then leave, then return - energy budgets that do not care about your rental calendar. Kai's Run brings a self-powered slatmill to your driveway or accessible parking area for private conditioning: one dog, air-conditioned unit, no facility drop-off. Beach cottages often have large active dogs - ridgebacks, retrievers, shepherds - that need more than a sand walk between rental check-in and dinner.",
      "30A traffic and parking make facility commutes a project. The mobile model removes that variable entirely. Travis sets up on level ground, runs a structured 30–45 minute session with warm-up and cool-down, and sends a progress photo within an hour. The dog drives the belt at their own pace. No motor forces speed. No other dogs in the space.",
      "Vacation rental schedules rarely align with dog park hours or daylight suitable for hard exercise. A slatmill session at your door fits between beach time and checkout stress.",
      "Santa Rosa Beach dog owners work around rules most of the county never thinks about. Walton County requires a paid annual permit before a dog touches the sand, and even then the hours run 4 p.m. to 8 a.m. through spring and summer - the exact window when the heat peaks and the walk gets cancelled anyway. That leaves the leashed loops of the Eastern Lake Trail in Point Washington State Forest, where soft sand slows a big dog to a trudge, or a fenced dog park shared with every visiting dog on 30A in high season. A slatmill session in your own driveway ignores all of it. No permit, no trailhead drive, no tourist-season crowding - measured work at your house, on your schedule.",
    ],
    closingHook:
      "Santa Rosa Beach sessions are best booked early in the day, before the 30A heat closes the window.",
  },
  {
    slug: 'bluewater-bay',
    name: 'Bluewater Bay',
    state: 'FL',
    title: "Mobile Dog Gym Bluewater Bay FL | Kai's Run",
    description:
      "Kai's Run brings mobile dog conditioning to Bluewater Bay, FL. Private slatmill sessions for high-drive dogs - delivered to your driveway near Niceville.",
    h1: 'Mobile Dog Conditioning in Bluewater Bay, FL',
    eyebrow: 'Bluewater Bay · Niceville North',
    neighborhoodsLabel: 'Neighborhoods we serve in Bluewater Bay',
    neighborhoods: ['Golf course community', 'Rocky Bayou access', 'Niceville border', 'John Sims Parkway corridor'],
    crossLinks: [
      { slug: 'niceville', name: 'Niceville' },
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
    ],
    hubTeaser:
      'Planned community north of Niceville - big yards, dual-income households, high-drive dogs.',
    paragraphs: [
      "Bluewater Bay is a few minutes north of Niceville - established residential, big yards, high-drive dogs. A planned community and census-designated place in Okaloosa County, Bluewater Bay sits directly north of Niceville with upper-income single-family homes, a golf course community, and dual-income professional households whose dogs often outpace their schedules.",
      "Large yards look sufficient until a border collie, shepherd, or field lab proves otherwise. Kai's Run delivers private slatmill conditioning to your driveway - self-powered, temperature-controlled, one dog at a time. No crate load. No traffic toward Destin. No daycare lobby or group reactivity triggers. We batch Bluewater Bay addresses with Niceville and Fort Walton Beach routes; confirmation usually arrives within a couple of hours of booking.",
      "Work-from-home owners can step outside for the intro hookup and return to a call while the session runs. Others errand-run and come back to a progress photo in their inbox. Sessions run 30–45 minutes door-to-door with warm-up, working sets, and cool-down. The dog controls pace on a belt with no motor - critical for dogs that shut down in unfamiliar group environments.",
      "Rocky Bayou and bay-side walks are enrichment, not conditioning. Structured slatmill work loads sustained aerobic output in a bounded appointment. Rabies vaccination and a digital waiver are required before the first visit. Julius K9 harnesses are on the truck in common sizes. Active-duty military, veterans, reserves, Guard, and first responders receive the Military & First Responder Discount - 10% off all paid sessions and packages, excluding the Intro Session.",
      "Bluewater Bay is its own ecosystem - a master-planned stretch of Choctawhatchee Bay shoreline with golf-cart streets, a marina, and walking paths that look ideal for dog exercise until July, when the asphalt between the shade trees holds heat past dinner. Many of the dogs here belong to Eglin, Duke Field, and 7th Group families on rotation schedules, which means the person home during the day is often managing a high-drive dog solo. The community paths are pleasant, but a leash loop past the fairway lots is arousal, not conditioning. We bring the work to your driveway before the day heats up - no bridge toll, no drive to the dog park, no waiting for a cart path to clear.",
    ],
    closingHook:
      "Bluewater Bay sessions slot cleanly between school drop-off and the midday heat.",
  },
  {
    slug: 'valparaiso',
    name: 'Valparaiso',
    state: 'FL',
    title: "Mobile Dog Gym Valparaiso FL | Kai's Run",
    description:
      "Kai's Run serves Valparaiso, FL with private mobile canine conditioning. Slatmill sessions for working dogs and high-drive breeds - book online.",
    h1: 'Mobile Dog Conditioning in Valparaiso, FL',
    eyebrow: 'Valparaiso · Eglin AFB Edge',
    neighborhoodsLabel: 'Neighborhoods we serve in Valparaiso',
    neighborhoods: ['Eglin AFB adjacency', 'John Sims Parkway', "Tom's Bayou", 'Fort Walton Beach corridor'],
    crossLinks: [
      { slug: 'fort-walton-beach', name: 'Fort Walton Beach' },
      { slug: 'niceville', name: 'Niceville' },
    ],
    hubTeaser:
      'Eglin-adjacent city - working-dog culture, malinois and shepherds, quick access from FWB and Niceville.',
    paragraphs: [
      "Valparaiso sits at the edge of Eglin Air Force Base - a community that understands what structured work does for a working animal. A city of roughly six thousand directly adjacent to Eglin, Valparaiso carries heavy military working-dog culture: Belgian malinois, German shepherds, retrievers built for field work - breeds that treat a neighborhood walk as a warmup, not a workout.",
      "Kai's Run brings a self-powered slatmill to your driveway for private canine conditioning - one dog, climate-controlled mobile unit, no drop-off, no group sessions. Quick access from Fort Walton Beach and Niceville means we route Valparaiso addresses with Eglin-adjacent batches. Shift work, TDY timelines, and PCS calendars do not align with facility hours; a mobile gym that parks at your address removes the commute variable entirely.",
      "Military households often arrive knowing the breed profile before the furniture does. Those dogs were bred for hours of focused output. A slatmill session delivers sustained aerobic load in 30–45 private minutes with warm-up, working sets, and cool-down - the dog controlling every step on a belt with no motor. Active-duty military, veterans, reserves, Guard, and first responders receive the Military & First Responder Discount - 10% off all paid sessions and packages, excluding the Intro Session.",
      "Structured work closes the gap between what your dog was bred to do and what suburban life allows. Travis handles setup, monitors the session, and sends a progress photo and plain-language recap within an hour. Rabies vaccination and a digital waiver are required before the first visit. Julius K9 harnesses are on the truck in common sizes.",
      "Valparaiso is the quiet side of Boggy Bayou - older lots under tall pines, renovated ranch homes, and a city park system where dogs are welcome at exactly one property. T.J. Brooks Park on Lincoln Avenue has the fenced run and the walking loop around the pond, and it earns its nickname of Echo Park, but one shared quarter-mile circle is maintenance, not conditioning, for a working-breed dog. Add the Eglin East Gate traffic and the summer bayou humidity, and plenty of Val-P dogs are running a deficit by August. A slatmill session in your own driveway changes that math - and if your dog spends the Fourth of July pacing while the Lincoln Park fireworks go up over the bayou, [structured work that morning is the best preparation for the evening](/blog/calm-dog-during-fireworks/).",
    ],
    closingHook:
      "Valparaiso is minutes off the Niceville loop, which keeps its calendar open.",
  },
];

export function getServiceCityBySlug(slug: string): ServiceCityPage | undefined {
  return SERVICE_CITY_PAGES.find((city) => city.slug === slug);
}

export function getServiceCityPath(slug: ServiceCitySlug): string {
  return `/service-area/${slug}/`;
}
