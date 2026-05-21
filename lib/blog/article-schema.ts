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
    datePublished: date,
    dateModified: dateModified ?? date,
    author: {
      '@type': 'Person',
      name: 'Travis',
    },
    publisher: {
      '@type': 'Organization',
      name: "Kai's Run",
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logos/kr-logo-1.jpg`,
      },
    },
    image: `${BASE_URL}/images/og-image.png`,
    url: pageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}
