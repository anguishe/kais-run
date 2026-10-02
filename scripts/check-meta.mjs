// Build-time meta gate. Runs first in `npm run postbuild` (before the IndexNow ping), so
// a bad title fails `npm run build` locally AND the Vercel deploy. Dependency-free.
//
// Checks every prerendered page in .next/server/app/**/*.html:
//   - <title> present, <= 65 chars incl. any " | Kai's Run" suffix (warns > 60)
//   - meta description present, <= 160 chars
//   - titles unique across indexable pages
// Plus every post in content/blog/*.mdx, including future-dated posts. Those publish
// later through ISR (revalidate = 3600) without a build, so this is the only chance to
// catch them. The title is resolved the same way lib/blog/post-metadata.ts does it.
//
// The same limits are enforced against a live/preview URL by
// ~/Projects/docs/tools/site-gate/site-gate.mjs; this is the in-repo backstop.
// See CLAUDE.md "Change control and quality gate".
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const TITLE_MAX = 65;
const TITLE_WARN = 60;
const DESC_MAX = 160;
const root = process.cwd();
const appDir = join(root, '.next', 'server', 'app');
const postsDir = join(root, 'content', 'blog');
const errors = [];
const warns = [];

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
const pick = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : null;
};
const checkTitle = (where, title) => {
  if (title.length > TITLE_MAX) errors.push(`${where}: title ${title.length} chars (>${TITLE_MAX}): "${title}"`);
  else if (title.length > TITLE_WARN) warns.push(`${where}: title ${title.length} chars (>${TITLE_WARN}): "${title}"`);
};
const checkDesc = (where, desc) => {
  if (desc.length > DESC_MAX) errors.push(`${where}: description ${desc.length} chars (>${DESC_MAX}): "${desc}"`);
};

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.html') ? [join(dir, d.name)] : [],
  );
}

if (!existsSync(appDir)) {
  console.error(`[check-meta] ${appDir} not found - run after \`next build\`.`);
  process.exit(1);
}

// Framework error shells have no route metadata of their own.
const SKIP = new Set(['/_not-found', '/_global-error', '/404', '/500']);
const titles = new Map();
let pages = 0;

for (const file of walk(appDir)) {
  const route = '/' + relative(appDir, file).split(sep).join('/').replace(/\.html$/, '').replace(/^index$/, '');
  if (SKIP.has(route)) continue;
  pages++;
  const html = readFileSync(file, 'utf8');
  const title = pick(html, /<title[^>]*>([^<]*)<\/title>/i);
  const desc = pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const robots = pick(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i) ?? '';
  if (!title) errors.push(`${route}: missing <title>`);
  else {
    checkTitle(route, title);
    // noindex pages (e.g. /thank-you/, tool embed cards) never compete in a SERP.
    if (!/noindex/i.test(robots)) titles.set(title, [...(titles.get(title) ?? []), route]);
  }
  if (!desc) errors.push(`${route}: missing meta description`);
  else checkDesc(route, desc);
}
for (const [title, routes] of titles) {
  if (routes.length > 1) errors.push(`duplicate title on ${routes.join(', ')}: "${title}"`);
}

// Source check for every post, scheduled ones included. Mirrors parseSimpleFrontmatter
// in lib/blog/posts.ts and buildPageTitle in lib/blog/post-metadata.ts.
const SUFFIX = " | Kai's Run";
const pageTitle = (t) => (t.length + SUFFIX.length <= 60 ? `${t}${SUFFIX}` : t);
let posts = 0;
for (const f of existsSync(postsDir) ? readdirSync(postsDir).filter((n) => n.endsWith('.mdx')) : []) {
  const fm = readFileSync(join(postsDir, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const data = {};
  for (const line of fm[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    data[line.slice(0, i).trim()] = v;
  }
  if (/^(true|1|yes)$/i.test(data.draft ?? '')) continue;
  posts++;
  const where = `content/blog/${f}`;
  const title = pageTitle(data.metaTitle?.trim() || data.title || f.replace(/\.mdx$/, ''));
  if (title.length > TITLE_MAX) {
    errors.push(`${where}: title ${title.length} chars (>${TITLE_MAX}) - add a shorter metaTitle: "${title}"`);
  }
  if (!data.description) errors.push(`${where}: missing description`);
  else checkDesc(where, data.description);
}

for (const w of warns) console.log(`[check-meta] WARN  ${w}`);
if (pages === 0) errors.push('no prerendered HTML pages found under .next/server/app - refusing to pass an empty scan');
if (errors.length) {
  for (const e of errors) console.error(`[check-meta] ERROR ${e}`);
  console.error(
    `[check-meta] FAIL: ${errors.length} error(s) across ${pages} pages + ${posts} posts. ` +
      `Limits: title <= ${TITLE_MAX} incl. suffix, description <= ${DESC_MAX}, titles unique.`,
  );
  process.exit(1);
}
console.log(`[check-meta] PASS: ${pages} pages + ${posts} posts, ${warns.length} warning(s).`);
