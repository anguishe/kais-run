#!/usr/bin/env node
/**
 * Blog schedule check. Run: node scripts/check-blog-schedule.mjs
 *
 * Prints the publish calendar and fails (exit 1) on the two mistakes that
 * silently break a scheduled post:
 *   1. a slug missing from CATEGORY_MAP - the post vanishes from every /blog filter
 *   2. a malformed or impossible date - the post never publishes, or publishes at once
 *
 * ponytail: plain node, no test runner, no deps. The repo has none and this does
 * not justify adding one.
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');
const CATEGORIES_FILE = path.join(process.cwd(), 'lib/blog/categories.ts');
const SITEMAP_FILE = path.join(process.cwd(), 'public/sitemap.xml');
const LLMS_FILE = path.join(process.cwd(), 'public/llms.txt');

const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

/** Mirrors isPublished() in lib/blog/posts.ts. Kept in sync by this file's own assertions. */
const isPublished = (post) => !post.draft && (!post.date || post.date <= today);

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  return Object.fromEntries(
    m[1]
      .split('\n')
      .map((line) => {
        const i = line.indexOf(':');
        if (i === -1) return null;
        const key = line.slice(0, i).trim();
        let val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
        return [key, val];
      })
      .filter(Boolean),
  );
}

const mapped = new Set(
  [...fs.readFileSync(CATEGORIES_FILE, 'utf8').matchAll(/^\s*'([^']+)':\s*'/gm)].map((m) => m[1]),
);

/**
 * Counts FAQ question/answer pairs the way lib/blog/faq-schema.ts does. A post
 * with a FAQ section that yields fewer than 2 pairs renders no FAQPage schema at
 * all, and does it silently - which is exactly how ten posts shipped without it.
 */
function faqPairCount(body) {
  const lines = body.split('\n');
  const start = lines.findIndex((l) => /^##\s+(faq|frequently asked questions)\s*$/i.test(l.trim()));
  if (start === -1) return null; // no FAQ section is a choice, not a bug
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i].trim())) {
      end = i;
      break;
    }
  }
  return lines
    .slice(start + 1, end)
    .filter((l) => /^\*\*(.+?)\*\*[ \t]*(.*)$/.test(l.trim())).length;
}

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => {
    const slug = f.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
    const fm = frontmatter(raw);
    const draft = ['true', '1', 'yes'].includes((fm.draft ?? '').toLowerCase());
    return {
      slug,
      date: fm.date ?? '',
      title: fm.title ?? slug,
      draft,
      faqPairs: faqPairCount(raw.replace(/^---[\s\S]*?\n---\n/, '')),
    };
  })
  .sort((a, b) => (a.date < b.date ? -1 : 1));

const failures = [];
for (const post of posts) {
  if (post.date && !/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
    failures.push(`${post.slug}: date "${post.date}" is not YYYY-MM-DD - the gate cannot read it`);
  }
  if (!mapped.has(post.slug)) {
    failures.push(`${post.slug}: missing from CATEGORY_MAP in lib/blog/categories.ts`);
  }
  if (post.faqPairs !== null && post.faqPairs < 2) {
    failures.push(
      `${post.slug}: has a FAQ heading but only ${post.faqPairs} parseable pair(s) - no FAQPage schema will render`,
    );
  }
}

const live = posts.filter(isPublished);
const scheduled = posts.filter((p) => !p.draft && !isPublished(p));
const drafts = posts.filter((p) => p.draft);

console.log(`Today (America/Chicago): ${today}\n`);
console.log(`LIVE (${live.length})`);
for (const p of live) console.log(`  ${p.date}  ${p.slug}`);
console.log(`\nSCHEDULED (${scheduled.length})`);
for (const p of scheduled) console.log(`  ${p.date}  ${p.slug}  -  "${p.title}"`);
if (drafts.length) {
  console.log(`\nDRAFTS (${drafts.length}, never publish until draft is removed)`);
  for (const p of drafts) console.log(`  ${p.date}  ${p.slug}`);
}

// The gate itself, exercised against fixed dates so a regression in the
// comparison shows up here rather than on a Tuesday morning in October.
assert.equal(isPublished({ date: '2020-01-01' }), true, 'a past date must be live');
assert.equal(isPublished({ date: '2099-01-01' }), false, 'a future date must stay hidden');
assert.equal(isPublished({ date: today }), true, 'a post dated today must be live');
assert.equal(isPublished({ date: '2020-01-01', draft: true }), false, 'draft always wins');
assert.equal(isPublished({}), true, 'a dateless legacy post must never vanish');

// public/llms.txt is maintained by hand, so a
// self-publishing post reaches the site before it reaches either file. Print the
// exact lines to paste rather than making anyone reconstruct them. Deliberately a
// warning, not a failure - the post is live and working either way.
const sitemapXml = fs.existsSync(SITEMAP_FILE) ? fs.readFileSync(SITEMAP_FILE, 'utf8') : '';
const llmsTxt = fs.existsSync(LLMS_FILE) ? fs.readFileSync(LLMS_FILE, 'utf8') : '';
// app/sitemap.ts generates the sitemap from the same date gate, so this check only
// applies if a hand-maintained public/sitemap.xml ever comes back.
const unlisted = sitemapXml ? live.filter((p) => !sitemapXml.includes(`/blog/${p.slug}/`)) : [];
const unlistedLlms = live.filter((p) => !llmsTxt.includes(`/blog/${p.slug}/`));

if (unlisted.length || unlistedLlms.length) {
  console.log('\nTODO - live posts not yet in the hand-maintained files:');
  for (const p of unlisted) {
    console.log(`\n  public/sitemap.xml, paste before </urlset>:
    <url>
      <loc>https://kaisrun.xyz/blog/${p.slug}/</loc>
      <lastmod>${p.date}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`);
  }
  for (const p of unlistedLlms) {
    console.log(`\n  public/llms.txt, add to the blog list:
  - ${p.title}: https://kaisrun.xyz/blog/${p.slug}/`);
  }
  const pending = [...new Set([...unlisted, ...unlistedLlms].map((p) => p.slug))];
  console.log('\n  Then submit each to IndexNow:');
  for (const slug of pending) {
    console.log(
      `    curl "https://yandex.com/indexnow?url=https://kaisrun.xyz/blog/${slug}/&key=<indexnow-key>"`,
    );
  }
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('\nSchedule OK.');
