const BASE_URL = 'https://kaisrun.xyz';

export type ArticleSchemaInput = {
  title: string;
  description: string;
  date: string;
  slug: string;
  dateModified?: string;
};

export function buildArticleSchema({
  title,
  description,
  date,
  slug,
  dateModified,
}: ArticleSchemaInput) {
  const pageUrl = `${BASE_URL}/blog/${slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: pageUrl,
    datePublished: date,
    dateModified: dateModified ?? date,
    author: {
      '@type': 'Person',
      name: 'Travis',
      description:
        "Founder of Kai's Run. Born and raised in Destin FL. Discovered slatmill conditioning for his Rhodesian Ridgeback mix Kai.",
      worksFor: {
        '@type': 'Organization',
        name: "Kai's Run",
        url: BASE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: "Kai's Run",
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logos/kr-logo-2.jpg`,
      },
    },
    image: `${BASE_URL}/images/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Canine conditioning',
      description: 'Structured exercise for high-drive dogs using slatmill treadmills',
    },
  };
}
