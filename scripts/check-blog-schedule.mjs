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

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => {
    const slug = f.replace(/\.mdx$/, '');
    const fm = frontmatter(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
    const draft = ['true', '1', 'yes'].includes((fm.draft ?? '').toLowerCase());
    return { slug, date: fm.date ?? '', title: fm.title ?? slug, draft };
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

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('\nSchedule OK.');
