/**
 * Single source of truth for Kai's Run session prices (LOCKED — see CLAUDE.md).
 *
 * Three schema blocks consume these prices in three different shapes:
 *   - app/layout.tsx  → AnimalService.hasOfferCatalog (OfferCatalog itemListElement)
 *   - app/services    → Service.offers (natural order)
 *   - app/pricing     → Service.offers (Founding Athlete leads)
 *
 * Each exported array below reproduces that page's existing JSON-LD output
 * verbatim, so prices can never drift across the three pages again.
 *
 * ponytail: the two name variants + three derived arrays exist ONLY to preserve
 * each page's current emitted schema. If the schema is ever unified onto one
 * shape, collapse this to a single name + array.
 */

const BASE_URL = 'https://kaisrun.xyz';

const SESSION_OFFERS = [
  { catalogName: 'Intro Session', serviceName: 'Intro Session (1 dog)', price: 35, url: `${BASE_URL}/services/` },
  { catalogName: 'Intro Session - Two Dogs', serviceName: 'Intro Session (2 dogs, same household)', price: 55, url: `${BASE_URL}/services/` },
  { catalogName: 'Founding Athlete Program', serviceName: 'Founding Athlete Program (5 sessions)', price: 200, url: `${BASE_URL}/pricing/` },
  { catalogName: 'Private Conditioning Session', serviceName: 'Private Conditioning Session (1 dog)', price: 70, url: `${BASE_URL}/services/` },
  { catalogName: 'Private Conditioning Session - Two Dogs', serviceName: 'Private Conditioning Session (2 dogs, same household)', price: 135, url: `${BASE_URL}/services/` },
  { catalogName: '3-Session Package', serviceName: '3-Session Package (1 dog)', price: 195, url: `${BASE_URL}/pricing/` },
  { catalogName: '5-Session Package', serviceName: '5-Session Package (1 dog)', price: 300, url: `${BASE_URL}/pricing/` },
  { catalogName: '3-Session Package - Two Dogs', serviceName: '3-Session Package (2 dogs, same household)', price: 380, url: `${BASE_URL}/pricing/` },
  { catalogName: '5-Session Package - Two Dogs', serviceName: '5-Session Package (2 dogs, same household)', price: 580, url: `${BASE_URL}/pricing/` },
];

// OfferCatalog itemListElement — app/layout.tsx hasOfferCatalog (prices as "NN.00").
export const offerCatalogItems = SESSION_OFFERS.map((o) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', name: o.catalogName, url: o.url },
  price: o.price.toFixed(2),
  priceCurrency: 'USD',
}));

// Service.offers — app/services/page.tsx (natural order, prices as "NN").
export const serviceOffers = SESSION_OFFERS.map((o) => ({
  '@type': 'Offer',
  name: o.serviceName,
  price: String(o.price),
  priceCurrency: 'USD',
}));

// Service.offers — app/pricing/page.tsx (Founding Athlete leads, same shape as serviceOffers).
export const pricingOffers = [
  ...serviceOffers.filter((o) => o.name.startsWith('Founding Athlete')),
  ...serviceOffers.filter((o) => !o.name.startsWith('Founding Athlete')),
];
