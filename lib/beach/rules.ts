/**
 * Emerald Coast dog beach rules. One typed array drives the checker widget, the
 * crawlable rules matrix, the schema, and the embed. Spec:
 * docs/specs/DOG-BEACH-CHECKER-SPEC.md section 2 (verified 2026-09-28 against the
 * primary ordinance text).
 *
 * RULES FOR EDITING THIS FILE
 * - Never publish a fee or a fine amount. Copy says "a civil fine" and links the source.
 * - Every change: update the row, bump verifiedOn, add a CHANGE_LOG line, IndexNow the URL.
 * - No em dashes (spaced hyphens only). No exclamation points.
 * - Hours are America/Chicago wall clock. 'sunrise' / 'sunset' are computed per spot.
 *
 * Kept free of path aliases and runtime imports so scripts/check-tools.mjs can
 * import it with Node's type stripping.
 */

export type Area =
  | 'Destin'
  | 'Okaloosa Island'
  | 'Fort Walton Beach'
  | '30A / South Walton'
  | 'Navarre'
  | 'Pensacola Beach'
  | 'Perdido Key'
  | 'Panama City Beach';

export type County = 'Okaloosa' | 'Walton' | 'Santa Rosa' | 'Escambia' | 'Bay';

export type SpotKind =
  | 'gulf-beach'
  | 'dog-beach'
  | 'dog-park'
  | 'state-park'
  | 'national-seashore'
  | 'boardwalk'
  | 'sandbar';

/** 'HH:MM' (24h local) or a solar event computed for the spot's coordinates. */
export type ClockPoint = string;

export type HoursRule = {
  from: ClockPoint;
  to: ClockPoint;
  /** Inclusive month range, 1-12. Wraps when the first month is larger (Nov-Apr = [11, 4]). */
  months?: [number, number];
};

export type Spot = {
  id: string;
  name: string;
  /** Short label for chips and dropdowns. */
  short: string;
  area: Area;
  county: County;
  jurisdiction: string;
  kind: SpotKind;
  lat: number;
  lon: number;
  rule: {
    sand: 'yes' | 'no' | 'permit' | 'unknown';
    trails?: boolean;
    hours?: HoursRule[];
    residentOnly?: boolean;
    leashFt?: number;
    /** Plain-language hours for the matrix. */
    hoursText: string;
    /** Who may bring a dog, for the matrix. */
    whoText: string;
    /** Leash rule, for the matrix. */
    leashText: string;
    notes: string;
  };
  /** quote is verbatim source text only; leave it out rather than paraphrase. */
  source: { label: string; section?: string; url: string; version: string; quote?: string };
  verifiedOn: string;
  confidence: 'H' | 'M' | 'L';
  /** Spot ids, nearest legal option first. */
  alternatives: string[];
  /** Static, approximate, always shown as "about N min". */
  driveMinutesFromDestin?: number;
  /** Nearest ZIP the heat tool knows, for the "Full hour-by-hour" link. */
  heatZip?: string;
};

const OKALOOSA_SOURCE = {
  label: 'Okaloosa County Code',
  section: 'Sec. 5-25(a)(6)',
  url: 'https://library.municode.com/fl/okaloosa_county/codes/code_of_ordinances',
  version: 'Ord. 22-07 (4-5-2022); Municode version 2025-12-02',
  quote:
    'No dog or cat shall be permitted upon the public beaches of the county, unless specifically authorized by a sign clearly posted by the county.',
};

const STATE_PARK_SOURCE = (parkUrl: string) => ({
  label: 'Florida State Parks rule',
  section: 'Rule 62D-2.014(13), F.A.C.',
  url: parkUrl,
  version: 'Florida State Parks pet policy and park page, checked 2026-09-28',
});

const ESCAMBIA_SOURCE = {
  label: 'Escambia County Code',
  section: 'Sec. 10-24',
  url: 'https://myescambia.com/pensacola-beach/beach-dog-parks',
  version: 'Recodified by Ord. 2026-22 (5-21-2026); Municode version 2026-08-18',
};

const VERIFIED = '2026-09-28';

export const SPOTS: Spot[] = [
  // --- Destin / Okaloosa -------------------------------------------------------
  {
    id: 'destin-city',
    name: 'Destin city public beaches (incl. Norriego Point and city Gulf accesses)',
    short: 'Destin city beaches',
    area: 'Destin',
    county: 'Okaloosa',
    jurisdiction: 'City of Destin',
    kind: 'gulf-beach',
    lat: 30.392,
    lon: -86.514,
    rule: {
      sand: 'no',
      hoursText: 'Never',
      whoText: 'No one',
      leashText: '-',
      notes:
        'The city bans any animal on its public beaches, on top of the county ban. A leash does not make the sand legal.',
    },
    source: {
      label: 'City of Destin Code',
      section: 'Sec. 4-7(a)(6)',
      url: 'https://www.cityofdestin.com/FAQ.aspx?QID=75',
      version: 'Ord. 20-28-CC (10-19-2020); Municode version 2026-07-22',
      quote:
        'No animal shall be permitted upon the public beaches of the city unless specifically authorized by a sign clearly posted by the city.',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['weidenhamer', 'henderson-sp', 'pcola-east', 'pcb-pier'],
    heatZip: '32541',
  },
  {
    id: 'henderson-sp',
    name: 'Henderson Beach State Park (Destin)',
    short: 'Henderson Beach State Park',
    area: 'Destin',
    county: 'Okaloosa',
    jurisdiction: 'Florida State Parks',
    kind: 'state-park',
    lat: 30.3842,
    lon: -86.4455,
    rule: {
      sand: 'no',
      trails: true,
      leashFt: 6,
      hoursText: 'Park hours (trails and parking only)',
      whoText: 'Everyone, off the beach',
      leashText: '6 ft max, held',
      notes: 'No dogs on the beach. Leashed dogs are fine in the parking areas, on the nature trail, and on day-use sidewalks.',
    },
    source: STATE_PARK_SOURCE('https://www.floridastateparks.org/PetPolicy'),
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['weidenhamer', 'pcola-east', 'pcb-pier'],
    driveMinutesFromDestin: 5,
    heatZip: '32541',
  },
  {
    id: 'destin-harbor-boardwalk',
    name: 'Destin Harbor Boardwalk',
    short: 'Destin Harbor Boardwalk',
    area: 'Destin',
    county: 'Okaloosa',
    jurisdiction: 'City of Destin',
    kind: 'boardwalk',
    lat: 30.394,
    lon: -86.499,
    rule: {
      sand: 'unknown',
      hoursText: 'Not specified',
      whoText: 'Not specified',
      leashText: 'City leash rules apply',
      notes: 'Not a beach. We found no official rule specific to the boardwalk. Posted signs and business rules govern.',
    },
    source: {
      label: 'City of Destin FAQ',
      url: 'https://www.cityofdestin.com/FAQ.aspx?QID=75',
      version: 'No boardwalk-specific rule found, checked 2026-09-28',
    },
    verifiedOn: VERIFIED,
    confidence: 'L',
    alternatives: ['weidenhamer', 'pcola-east'],
    driveMinutesFromDestin: 5,
    heatZip: '32541',
  },
  {
    id: 'crab-island',
    name: 'Crab Island (sandbar, boat access)',
    short: 'Crab Island',
    area: 'Destin',
    county: 'Okaloosa',
    jurisdiction: 'No official rule found',
    kind: 'sandbar',
    lat: 30.396,
    lon: -86.513,
    rule: {
      sand: 'unknown',
      hoursText: 'Not specified',
      whoText: 'Not specified',
      leashText: 'Not specified',
      notes: 'A submerged sandbar reached by boat. We found no official rule and make no claim. Bring a dog life jacket if you go.',
    },
    source: {
      label: 'No official source',
      url: 'https://www.cityofdestin.com/FAQ.aspx?QID=75',
      version: 'No rule found, checked 2026-09-28',
    },
    verifiedOn: VERIFIED,
    confidence: 'L',
    alternatives: ['weidenhamer', 'pcola-east'],
    heatZip: '32541',
  },
  {
    id: 'weidenhamer',
    name: 'Nancy Weidenhamer Dog Park, 4100 Indian Bayou Trail, Destin',
    short: 'Weidenhamer Dog Park (Destin)',
    area: 'Destin',
    county: 'Okaloosa',
    jurisdiction: 'City of Destin',
    kind: 'dog-park',
    lat: 30.405,
    lon: -86.423,
    rule: {
      sand: 'yes',
      hours: [{ from: 'sunrise', to: 'sunset' }],
      hoursText: 'Sunrise to sunset',
      whoText: 'Everyone',
      leashText: 'Leashed until inside, off leash inside',
      notes: 'Fenced off-leash dog park. Not a beach, but the closest legal off-leash run in Destin.',
    },
    source: {
      label: 'City of Destin FAQ',
      url: 'https://www.cityofdestin.com/FAQ.aspx?QID=75',
      version: 'City FAQ QID=75, checked 2026-09-28',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['liza-jackson', 'pcola-east'],
    driveMinutesFromDestin: 10,
    heatZip: '32541',
  },
  {
    id: 'okaloosa-island',
    name: 'Okaloosa Island Gulf beaches (incl. The Boardwalk and Beasley Park)',
    short: 'Okaloosa Island beaches',
    area: 'Okaloosa Island',
    county: 'Okaloosa',
    jurisdiction: 'Okaloosa County',
    kind: 'gulf-beach',
    lat: 30.3937,
    lon: -86.5978,
    rule: {
      sand: 'no',
      hoursText: 'Never',
      whoText: 'No one',
      leashText: '-',
      notes:
        'County ban on dogs and cats on all public beaches, residents and visitors alike. A violation is a civil infraction with a fine.',
    },
    source: OKALOOSA_SOURCE,
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['liza-jackson', 'weidenhamer', 'pcola-east'],
    driveMinutesFromDestin: 15,
    heatZip: '32547',
  },
  {
    id: 'guis-okaloosa',
    name: 'Gulf Islands National Seashore - Okaloosa Area',
    short: 'National Seashore - Okaloosa Area',
    area: 'Okaloosa Island',
    county: 'Okaloosa',
    jurisdiction: 'National Park Service',
    kind: 'national-seashore',
    lat: 30.4045,
    lon: -86.6043,
    rule: {
      sand: 'no',
      trails: true,
      leashFt: 6,
      hoursText: 'Park hours (paths and roads only)',
      whoText: 'Everyone, off the beach',
      leashText: '6 ft max',
      notes: 'No dogs on any park beach, Gulf or bay side, or in water under five feet deep. Leashed on trails, paths, and roads is fine.',
    },
    source: {
      label: 'National Park Service, Gulf Islands pets page',
      url: 'https://home.nps.gov/guis/planyourvisit/pets.htm',
      version: 'Page updated 2025-08-05',
      quote: 'On all park beaches gulf and bay side, and in water less than five feet in Florida.',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['liza-jackson', 'pcola-east'],
    driveMinutesFromDestin: 15,
    heatZip: '32547',
  },
  // --- Fort Walton Beach -------------------------------------------------------
  {
    id: 'fwb-gulf',
    name: 'Fort Walton Beach area public Gulf beaches (county)',
    short: 'Fort Walton Beach Gulf beaches',
    area: 'Fort Walton Beach',
    county: 'Okaloosa',
    jurisdiction: 'Okaloosa County',
    kind: 'gulf-beach',
    lat: 30.393,
    lon: -86.625,
    rule: {
      sand: 'no',
      hoursText: 'Never',
      whoText: 'No one',
      leashText: '-',
      notes: 'Same county ban as Okaloosa Island. No posted exception exists that we could find.',
    },
    source: OKALOOSA_SOURCE,
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['liza-jackson', 'weidenhamer', 'pcola-east'],
    driveMinutesFromDestin: 20,
    heatZip: '32547',
  },
  {
    id: 'liza-jackson',
    name: 'Liza Jackson Park fenced dog park, 338 Miracle Strip Pkwy SW, Fort Walton Beach',
    short: 'Liza Jackson Dog Park (FWB)',
    area: 'Fort Walton Beach',
    county: 'Okaloosa',
    jurisdiction: 'City of Fort Walton Beach',
    kind: 'dog-park',
    lat: 30.4045,
    lon: -86.626,
    rule: {
      sand: 'yes',
      hours: [{ from: 'sunrise', to: '21:00' }],
      hoursText: 'Sunrise to 9 PM',
      whoText: 'Everyone',
      leashText: 'Off leash inside the fence',
      notes:
        'Fenced off-leash dog park, not a beach. The park is under renovation from mid-September 2026 for about six months; the city says the dog parks stay open. Bay or water access for dogs is not confirmed.',
    },
    source: {
      label: 'City of Fort Walton Beach FAQ',
      url: 'https://www.fwb.org/Faq.aspx?TID=52',
      version: 'City FAQ TID=52; FWB News Flash 2026-08-03',
      quote: 'Dogs are allowed unleashed in the fenced dog park located at Liza Jackson Park.',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['weidenhamer', 'pcola-east'],
    driveMinutesFromDestin: 20,
    heatZip: '32547',
  },
  // --- 30A / South Walton ------------------------------------------------------
  {
    id: 'walton-public',
    name: 'Walton County public beaches (30A, Miramar Beach, Santa Rosa Beach, Inlet Beach)',
    short: 'Walton County beaches (30A, Miramar)',
    area: '30A / South Walton',
    county: 'Walton',
    jurisdiction: 'Walton County',
    kind: 'gulf-beach',
    lat: 30.37,
    lon: -86.25,
    rule: {
      sand: 'permit',
      residentOnly: true,
      hours: [{ from: '15:30', to: '08:30' }],
      hoursText: '3:30 PM to 8:30 AM the next day, year-round',
      whoText: 'County property owners or permanent residents with a current dog beach permit',
      leashText: 'Leashed, under direct control',
      notes:
        'Permit holders only. The permit expires at midnight July 31 each year, needs a rabies certificate, is non-transferable, and the tag must be on the collar or on the handler. Pick up after the dog. Visitors cannot get a permit.',
    },
    source: {
      label: 'Walton County Code',
      section: 'Sec. 22-31 (as amended by Ord. 2025-22)',
      url: 'https://www.mywaltonfl.gov/1329',
      version: 'Ord. 2025-22 adopted 11-24-2025; Municode version 2026-08-13',
      quote:
        'The permit will allow leashed dogs on the beach between the hours of 3:30 p.m. and 8:30 a.m. of the following day.',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcb-pier', 'pcola-east', 'weidenhamer'],
    driveMinutesFromDestin: 20,
    heatZip: '32459',
  },
  {
    id: 'grayton-sp',
    name: 'Grayton Beach State Park',
    short: 'Grayton Beach State Park',
    area: '30A / South Walton',
    county: 'Walton',
    jurisdiction: 'Florida State Parks',
    kind: 'state-park',
    lat: 30.328,
    lon: -86.158,
    rule: {
      sand: 'no',
      trails: true,
      leashFt: 6,
      hoursText: 'Park hours (trails only)',
      whoText: 'Everyone, off the beach',
      leashText: '6 ft max, held',
      notes: 'No dogs on the beach. Leashed on the park trails is fine.',
    },
    source: STATE_PARK_SOURCE('https://www.floridastateparks.org/parks-and-trails/grayton-beach-state-park'),
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcb-pier', 'weidenhamer'],
    driveMinutesFromDestin: 35,
    heatZip: '32459',
  },
  {
    id: 'topsail-sp',
    name: 'Topsail Hill Preserve State Park',
    short: 'Topsail Hill Preserve State Park',
    area: '30A / South Walton',
    county: 'Walton',
    jurisdiction: 'Florida State Parks',
    kind: 'state-park',
    lat: 30.37,
    lon: -86.28,
    rule: {
      sand: 'no',
      trails: true,
      leashFt: 6,
      hoursText: 'Park hours (trails only)',
      whoText: 'Everyone, off the beach',
      leashText: '6 ft max, held',
      notes: 'No dogs on the beach, tram, boardwalks, dunes, or lakes. About 15 miles of trails allow leashed dogs.',
    },
    source: STATE_PARK_SOURCE('https://www.floridastateparks.org/parks-and-trails/topsail-hill-preserve-state-park'),
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcb-pier', 'weidenhamer'],
    driveMinutesFromDestin: 20,
    heatZip: '32459',
  },
  {
    id: 'deer-lake-sp',
    name: 'Deer Lake State Park',
    short: 'Deer Lake State Park',
    area: '30A / South Walton',
    county: 'Walton',
    jurisdiction: 'Florida State Parks',
    kind: 'state-park',
    lat: 30.312,
    lon: -86.1,
    rule: {
      sand: 'no',
      trails: true,
      leashFt: 6,
      hoursText: 'Park hours (off the beach and boardwalk)',
      whoText: 'Everyone, off the beach',
      leashText: '6 ft max, held',
      notes: 'No dogs on the beach or the boardwalk. Leashed in the rest of the park is fine.',
    },
    source: STATE_PARK_SOURCE('https://www.floridastateparks.org/parks-and-trails/deer-lake-state-park'),
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcb-pier', 'weidenhamer'],
    driveMinutesFromDestin: 40,
    heatZip: '32459',
  },
  // --- Navarre -----------------------------------------------------------------
  {
    id: 'navarre-beach',
    name: 'Navarre Beach (Gulf) and Navarre Beach Marine Park',
    short: 'Navarre Beach',
    area: 'Navarre',
    county: 'Santa Rosa',
    jurisdiction: 'Santa Rosa County',
    kind: 'gulf-beach',
    lat: 30.379,
    lon: -86.865,
    rule: {
      sand: 'no',
      hoursText: 'Never',
      whoText: 'No one',
      leashText: '-',
      notes: 'County code bans animals on beaches except dog friendly parks. There is no official dog beach in Navarre.',
    },
    source: {
      label: 'Santa Rosa County Code',
      section: 'Sec. 4-37(b)',
      url: 'https://www.santarosa.fl.gov/318/Navarre-Beach-Pavilions',
      version: 'Ord. 2023-04 (4-27-2023); Municode version 2026-08-06',
      quote: 'such as school grounds, beaches and playgrounds except dog friendly parks',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['central-bark', 'pcola-east', 'liza-jackson'],
    driveMinutesFromDestin: 40,
    heatZip: '32566',
  },
  {
    id: 'guis-opal',
    name: 'Gulf Islands National Seashore - Opal Beach',
    short: 'National Seashore - Opal Beach',
    area: 'Navarre',
    county: 'Escambia',
    jurisdiction: 'National Park Service',
    kind: 'national-seashore',
    lat: 30.353,
    lon: -87.0,
    rule: {
      sand: 'no',
      trails: true,
      leashFt: 6,
      hoursText: 'Park hours (paths and roads only)',
      whoText: 'Everyone, off the beach',
      leashText: '6 ft max',
      notes: 'No dogs on any park beach, Gulf or bay side, or in water under five feet deep.',
    },
    source: {
      label: 'National Park Service, Gulf Islands pets page',
      url: 'https://home.nps.gov/guis/planyourvisit/pets.htm',
      version: 'Page updated 2025-08-05',
      quote: 'On all park beaches gulf and bay side, and in water less than five feet in Florida.',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcola-east', 'pcola-west', 'central-bark'],
    driveMinutesFromDestin: 50,
  },
  {
    id: 'central-bark',
    name: 'Navarre Central Bark dog park, 8840 High School Blvd',
    short: 'Navarre Central Bark',
    area: 'Navarre',
    county: 'Santa Rosa',
    jurisdiction: 'Santa Rosa County',
    kind: 'dog-park',
    lat: 30.427,
    lon: -86.883,
    rule: {
      sand: 'yes',
      hours: [{ from: 'sunrise', to: 'sunset' }],
      hoursText: 'Dawn to dusk',
      whoText: 'Everyone',
      leashText: 'Per posted park rules',
      notes: 'County dog park, not a beach. The county page does not state whether it is fenced.',
    },
    source: {
      label: 'Santa Rosa County facility page',
      url: 'https://www.santarosa.fl.gov/Facilities/Facility/Details/Navarre-Central-Bark-Large-Dog-Park-45',
      version: 'Facility page, checked 2026-09-28',
    },
    verifiedOn: VERIFIED,
    confidence: 'M',
    alternatives: ['pcola-east', 'liza-jackson'],
    driveMinutesFromDestin: 40,
    heatZip: '32566',
  },
  // --- Pensacola Beach ---------------------------------------------------------
  {
    id: 'pcola-east',
    name: 'Pensacola Beach "Park East" dog beach, next to Parking Lot E (lot 28.5 / 28B)',
    short: 'Pensacola Beach dog beach (Park East)',
    area: 'Pensacola Beach',
    county: 'Escambia',
    jurisdiction: 'Escambia County / Santa Rosa Island Authority',
    kind: 'dog-beach',
    lat: 30.3437,
    lon: -87.095,
    rule: {
      sand: 'yes',
      leashFt: 8,
      hours: [
        { from: '07:00', to: 'sunset', months: [5, 10] },
        { from: 'sunrise', to: 'sunset', months: [11, 4] },
      ],
      hoursText: 'May 1 to Oct 31: 7 AM to sunset. Nov 1 to Apr 30: sunrise to sunset.',
      whoText: 'Everyone',
      leashText: '8 ft max, held; license tags on',
      notes: 'Designated dog beach, 250 feet either side of the walkover. The rest of Pensacola Beach is closed to dogs.',
    },
    source: ESCAMBIA_SOURCE,
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcola-west', 'perdido-dog-park'],
    driveMinutesFromDestin: 55,
  },
  {
    id: 'pcola-west',
    name: 'Pensacola Beach "Park West" dog beach, next to Parking Lot B (lot 21.5 / 21E)',
    short: 'Pensacola Beach dog beach (Park West)',
    area: 'Pensacola Beach',
    county: 'Escambia',
    jurisdiction: 'Escambia County / Santa Rosa Island Authority',
    kind: 'dog-beach',
    lat: 30.328,
    lon: -87.168,
    rule: {
      sand: 'yes',
      leashFt: 8,
      hours: [
        { from: '07:00', to: 'sunset', months: [5, 10] },
        { from: 'sunrise', to: 'sunset', months: [11, 4] },
      ],
      hoursText: 'May 1 to Oct 31: 7 AM to sunset. Nov 1 to Apr 30: sunrise to sunset.',
      whoText: 'Everyone',
      leashText: '8 ft max, held; license tags on',
      notes: 'Designated dog beach, about 100 yards west of the walkover. The rest of Pensacola Beach is closed to dogs.',
    },
    source: ESCAMBIA_SOURCE,
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcola-east', 'perdido-dog-park'],
    driveMinutesFromDestin: 60,
  },
  {
    id: 'pcola-other',
    name: 'All other Pensacola Beach sand (incl. Casino Beach)',
    short: 'Pensacola Beach (outside the dog beaches)',
    area: 'Pensacola Beach',
    county: 'Escambia',
    jurisdiction: 'Escambia County',
    kind: 'gulf-beach',
    lat: 30.333,
    lon: -87.142,
    rule: {
      sand: 'no',
      hoursText: 'Never',
      whoText: 'No one',
      leashText: '-',
      notes: 'Dogs are banned everywhere on Pensacola Beach except the two designated dog beaches.',
    },
    source: { ...ESCAMBIA_SOURCE, section: 'Sec. 10-24(c)(1)' },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcola-west', 'pcola-east'],
    driveMinutesFromDestin: 55,
  },
  // --- Perdido Key -------------------------------------------------------------
  {
    id: 'perdido-dog-park',
    name: 'Perdido Key Dog Park, 14484 River Road',
    short: 'Perdido Key Dog Park',
    area: 'Perdido Key',
    county: 'Escambia',
    jurisdiction: 'Escambia County',
    kind: 'dog-park',
    lat: 30.3,
    lon: -87.455,
    rule: {
      sand: 'yes',
      hours: [{ from: 'sunrise', to: 'sunset' }],
      hoursText: 'Sunrise to sunset',
      whoText: 'Everyone',
      leashText: 'Off leash inside',
      notes: 'County off-leash dog park, added in the 2026 recodification. Not a beach.',
    },
    source: {
      label: 'Escambia County Code',
      section: 'Sec. 10-25',
      url: 'https://myescambia.com/pensacola-beach/beach-dog-parks',
      version: 'New under Ord. 2026-22 (5-21-2026)',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcola-west', 'pcola-east'],
    driveMinutesFromDestin: 80,
  },
  // --- Panama City Beach -------------------------------------------------------
  {
    id: 'pcb-pier',
    name: 'Panama City Beach, west side of the City Pier',
    short: 'PCB dog beach (west of City Pier)',
    area: 'Panama City Beach',
    county: 'Bay',
    jurisdiction: 'City of Panama City Beach',
    kind: 'dog-beach',
    lat: 30.176,
    lon: -85.806,
    rule: {
      sand: 'yes',
      hoursText: 'Not published by the city - check posted signs',
      whoText: 'Everyone',
      leashText: 'Leashed',
      notes: 'The city designates the beach on the west side of the City Pier as dog friendly. The exact boundaries and hours are not published, so follow the posted signs.',
    },
    source: {
      label: 'City of Panama City Beach Code',
      section: 'Sec. 7-9',
      url: 'https://www.pcbfl.gov/179/Dogs',
      version: 'Ord. 1616 (3-9-2023); Municode version 2026-04-21',
      quote: 'The beach on the west side of the City Pier is dog friendly. Dogs must be leashed.',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcola-east', 'weidenhamer'],
    driveMinutesFromDestin: 60,
  },
  {
    id: 'pcb-other',
    name: 'All other Panama City Beach Gulf sand',
    short: 'Panama City Beach (outside the pier dog beach)',
    area: 'Panama City Beach',
    county: 'Bay',
    jurisdiction: 'City of Panama City Beach',
    kind: 'gulf-beach',
    lat: 30.199,
    lon: -85.86,
    rule: {
      sand: 'no',
      hoursText: 'Never',
      whoText: 'No one',
      leashText: '-',
      notes: 'Dogs are banned on city beaches except the designated stretch west of the City Pier.',
    },
    source: {
      label: 'City of Panama City Beach Code',
      section: 'Sec. 7-9',
      url: 'https://www.pcbfl.gov/179/Dogs',
      version: 'Ord. 1616 (3-9-2023); Municode version 2026-04-21',
    },
    verifiedOn: VERIFIED,
    confidence: 'H',
    alternatives: ['pcb-pier'],
    driveMinutesFromDestin: 55,
  },
];

export const AREAS: Area[] = [
  'Destin',
  'Okaloosa Island',
  'Fort Walton Beach',
  '30A / South Walton',
  'Navarre',
  'Pensacola Beach',
  'Perdido Key',
  'Panama City Beach',
];

/** Area slugs for ?area= presets and service-area page links. */
export const AREA_SLUG: Record<Area, string> = {
  Destin: 'destin',
  'Okaloosa Island': 'okaloosa-island',
  'Fort Walton Beach': 'fort-walton-beach',
  '30A / South Walton': '30a',
  Navarre: 'navarre',
  'Pensacola Beach': 'pensacola-beach',
  'Perdido Key': 'perdido-key',
  'Panama City Beach': 'panama-city-beach',
};

/** Kai's Run service-area page for the matrix headers, where one exists. */
export const AREA_SERVICE_PAGE: Partial<Record<Area, string>> = {
  Destin: '/service-area/destin/',
  'Fort Walton Beach': '/service-area/fort-walton-beach/',
  '30A / South Walton': '/service-area/santa-rosa-beach/',
  Navarre: '/service-area/navarre/',
};

export const DEFAULT_SPOT_ID = 'destin-city';

export const CHANGE_LOG: { date: string; text: string }[] = [
  {
    date: '2026-09-28',
    text: 'Checker published. Every rule re-read against the current county and city code.',
  },
  {
    date: '2026-05-21',
    text: 'Escambia County Ord. 2026-22 renumbered the Pensacola Beach dog beach section (now Sec. 10-24) and added the Perdido Key Dog Park (Sec. 10-25).',
  },
  {
    date: '2025-11-24',
    text: 'Walton County Ord. 2025-22 set dog beach permit hours at 3:30 PM to 8:30 AM, year-round.',
  },
];

export function spotById(id: string | null | undefined): Spot | undefined {
  if (!id) return undefined;
  return SPOTS.find((s) => s.id === id);
}

/** Newest verifiedOn across all rows - feeds dateModified in schema. */
export function newestVerifiedOn(): string {
  return SPOTS.map((s) => s.verifiedOn).sort().at(-1) ?? VERIFIED;
}
