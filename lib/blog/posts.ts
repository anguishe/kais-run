import fs from 'node:fs';
import path from 'node:path';
import { categoryOf } from './categories';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  dateModified?: string; // ISO date string - falls back to date if not set
  author?: string;
  /** Comma-separated meta keywords for this post. */
  keywords?: string;
  /** OG / schema image — absolute URL or site-relative path (e.g. /images/...). */
  image?: string;
  /** Override for the OG/Twitter title when it differs from the page title. */
  ogTitle?: string;
  /** Override for the OG/Twitter description when it differs from the page description. */
  ogDescription?: string;
  /** When true, post is omitted from blog index, static export, and related posts. */
  draft?: boolean;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readTimeMinutes: number;
};

function isDraft(data: Record<string, string>): boolean {
  const val = data.draft?.trim().toLowerCase();
  return val === 'true' || val === '1' || val === 'yes';
}

export type BlogPost = BlogPostMeta & {
  body: string;
};

function parseSimpleFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) {
    return { data: {}, content: raw };
  }
  const data: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, content: m[2].trim() };
}

function estimateReadTimeMinutes(text: string): number {
  const plain = text.replace(/<[^>]*>/g, ' ');
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = parseSimpleFrontmatter(raw);
  const title = data.title ?? slug;
  const description = data.description ?? '';
  const date = data.date ?? '';
  const dateModified = data.dateModified ?? undefined;
  const author = data.author ?? 'Travis';
  const keywords = data.keywords ?? undefined;
  const image = data.image ?? undefined;
  const ogTitle = data.ogTitle ?? undefined;
  const ogDescription = data.ogDescription ?? undefined;
  const draft = isDraft(data);
  const readTimeMinutes = estimateReadTimeMinutes(content);
  return {
    slug,
    title,
    description,
    date,
    dateModified,
    author,
    keywords,
    image,
    ogTitle,
    ogDescription,
    draft,
    readTimeMinutes,
    body: content,
  };
}

export function getPublishedSlugs(): string[] {
  return getPostSlugs().filter((slug) => {
    const post = getPostBySlug(slug);
    return post !== null && !post.draft;
  });
}

export function getAllPostMeta(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null && !p.draft)
    .map(({ slug, title, description, date, dateModified, author, readTimeMinutes }) => ({
      slug,
      title,
      description,
      date,
      dateModified,
      author,
      readTimeMinutes,
    }));
}

/** Published posts, newest first. */
export function getSortedPostMeta(): BlogPostMeta[] {
  return getAllPostMeta().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPostMeta[] {
  const currentCategory = categoryOf(currentSlug);
  return getAllPostMeta()
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Shared-category peers first, then newest-first within each group.
      const aShared = currentCategory !== null && categoryOf(a.slug) === currentCategory;
      const bShared = currentCategory !== null && categoryOf(b.slug) === currentCategory;
      if (aShared !== bShared) return aShared ? -1 : 1;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, limit);
}
