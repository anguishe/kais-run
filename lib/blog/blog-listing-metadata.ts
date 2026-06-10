import type { Metadata } from 'next';
import { BLOG_LISTING_KEYWORDS } from '@/lib/seo/defaults';
import { OG_IMAGE_URL } from '@/lib/site-images';

export const BLOG_LISTING_TITLE = "Blog | Kai's Run — Mobile Dog Gym";

export const BLOG_LISTING_DESCRIPTION =
  "Dog conditioning, exercise, and slatmill guides from Kai's Run — mobile dog gym serving Destin, Fort Walton Beach, Niceville, and Miramar Beach FL.";

export const BLOG_LISTING_URL = 'https://www.kaisrun.xyz/blog/';
const OG_IMAGE = `https://www.kaisrun.xyz${OG_IMAGE_URL}`;

export function buildBlogListingMetadata(): Metadata {
  return {
    title: BLOG_LISTING_TITLE,
    description: BLOG_LISTING_DESCRIPTION,
    keywords: BLOG_LISTING_KEYWORDS,
    alternates: { canonical: BLOG_LISTING_URL },
    openGraph: {
      title: BLOG_LISTING_TITLE,
      description: BLOG_LISTING_DESCRIPTION,
      type: 'website',
      url: BLOG_LISTING_URL,
      locale: 'en_US',
      siteName: "Kai's Run",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Kai's Run — Mobile Dog Gym Destin FL",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: BLOG_LISTING_TITLE,
      description: BLOG_LISTING_DESCRIPTION,
      images: [OG_IMAGE],
    },
  };
}
