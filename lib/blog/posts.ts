import fs from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readTimeMinutes: number;
};

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
  const author = data.author ?? 'Travis';
  const readTimeMinutes = estimateReadTimeMinutes(content);
  return {
    slug,
    title,
    description,
    date,
    author,
    readTimeMinutes,
    body: content,
  };
}

export function getAllPostMeta(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .map(({ slug, title, description, date, author, readTimeMinutes }) => ({
      slug,
      title,
      description,
      date,
      author,
      readTimeMinutes,
    }));
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPostMeta[] {
  return getAllPostMeta()
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
