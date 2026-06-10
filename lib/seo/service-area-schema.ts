const BASE_URL = 'https://www.kaisrun.xyz';

export function buildServiceAreaSchema(city: {
  name: string;
  slug: string;
}): object {
  const pageUrl = `${BASE_URL}/service-area/${city.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#localbusiness`,
    name: `Kai's Run — ${city.name} FL`,
    parentOrganization: { '@id': `${BASE_URL}/#business` },
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: 'FL',
    },
    url: pageUrl,
  };
}
