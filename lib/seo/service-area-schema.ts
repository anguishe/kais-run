export function buildServiceAreaSchema(city: {
  name: string;
  slug: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Mobile Dog Gym in ${city.name}, FL`,
    url: `https://kaisrun.xyz/service-area/${city.slug}/`,
    provider: {
      '@type': 'AnimalService',
      '@id': 'https://kaisrun.xyz/#business',
      name: "Kai's Run",
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: 'FL',
    },
    offers: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Intro Session',
      },
      price: '35.00',
      priceCurrency: 'USD',
    },
  };
}
