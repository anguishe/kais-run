/**
 * Generates 450px-wide thumbnail variants of the Kai gallery photos into
 * public/images/kai/thumbs/. The gallery grid renders thumbnails at
 * ~175-370px, so serving the full 900x1600 originals (~190-320 KB each)
 * wasted ~1.3 MB of scroll payload; the lightbox still uses the originals.
 * Run: node scripts/generate-gallery-thumbs.mjs  (or npm run generate:gallery-thumbs)
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcDir = join(root, "public/images/kai");
const outDir = join(srcDir, "thumbs");

const THUMB_WIDTH = 450; // 2x the mobile 2-col render width — crisp on retina

const names = [
  "kai-running-toward-camera",
  "kai-looking-up",
  "kai-trail-profile",
  "kai-coastal-trail",
  "kai-mid-stride",
  "kai-golden-light",
];

await mkdir(outDir, { recursive: true });

for (const name of names) {
  const out = join(outDir, `${name}-450.webp`);
  const info = await sharp(join(srcDir, `${name}.webp`))
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(out);
  console.log(`[gallery-thumbs] ${name}-450.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}
