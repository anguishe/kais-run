// IndexNow batch submit — runs on production builds only (npm postbuild).
// Fetches the live sitemap, parses every <loc>, and POSTs the full URL list to
// IndexNow (one endpoint covers Bing + Yandex + Seznam + Naver). Non-fatal on
// any error: search pings never fail a build. Ported from beach-house-moving (via watervue-event-rentals).

const isProductionBuild =
  process.env.VERCEL_ENV === "production" ||
  (process.env.CI === "true" && process.env.NODE_ENV === "production");

if (!isProductionBuild) {
  console.log("[IndexNow] skipped — not a production build");
  process.exit(0);
}

// Public by protocol design; also served at /<key>.txt.
const KEY = "e1b62ed0a8da3b99e4cd20cf81019f2a";
const HOST = "kaisrun.xyz";

try {
  const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
  if (!sitemapRes.ok) throw new Error(`Sitemap fetch failed: ${sitemapRes.status}`);
  const xml = await sitemapRes.text();
  const urlList = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    console.warn("[IndexNow] no URLs in sitemap — nothing submitted");
  } else {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    });
    console.log(`[IndexNow] ${res.status} — ${urlList.length} URLs submitted`);
  }
} catch (err) {
  console.warn("[IndexNow] submission failed (non-fatal):", err.message);
}
