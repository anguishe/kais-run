/**
 * Generates public/images/og-image.png (1200×630) for Open Graph / Twitter cards.
 * Run: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "public/images/og-image.png");
const logoPath = join(root, "public/images/logos/kr-logo-2.webp");

const W = 1200;
const H = 630;
const bgRgb = { r: 15, g: 17, b: 23 }; // #0F1117

const logo = sharp(logoPath).resize({
  width: 480,
  height: 280,
  fit: "inside",
  withoutEnlargement: true,
});
const logoBuf = await logo.toBuffer();
const { width: lw = 0, height: lh = 0 } = await sharp(logoBuf).metadata();

const textSvg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .t { fill: #F0EDE6; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif; font-size: 42px; font-weight: 700; letter-spacing: 0.12em; }
  </style>
  <text x="${W / 2}" y="${H - 72}" text-anchor="middle" class="t">KAI'S RUN</text>
</svg>`,
);

const left = Math.max(0, Math.round((W - lw) / 2));
const top = Math.max(0, Math.round((H - lh) / 2) - 36);

await sharp({
  create: { width: W, height: H, channels: 3, background: bgRgb },
})
  .composite([
    { input: logoBuf, left, top },
    { input: textSvg, left: 0, top: 0 },
  ])
  .png()
  .toFile(outPath);

console.log("Wrote", outPath);
