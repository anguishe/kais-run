/**
 * Generates favicon PNGs + multi-resolution favicon.ico from public/images/logos/favicon.png.
 * Run: npm run generate:favicons
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public/images/logos/favicon.png");

const base = sharp(src).ensureAlpha();

const buf16 = await base.clone().resize(16, 16, { fit: "cover" }).png().toBuffer();
const buf32 = await base.clone().resize(32, 32, { fit: "cover" }).png().toBuffer();

writeFileSync(join(root, "public/favicon-16x16.png"), buf16);
writeFileSync(join(root, "public/favicon-32x32.png"), buf32);

const ico = await pngToIco([buf16, buf32]);
writeFileSync(join(root, "public/favicon.ico"), ico);
writeFileSync(join(root, "app/favicon.ico"), ico);

await base.clone().resize(180, 180, { fit: "cover" }).png().toFile(join(root, "public/apple-touch-icon.png"));
await base.clone().resize(192, 192, { fit: "cover" }).png().toFile(join(root, "public/icon-192x192.png"));
await base.clone().resize(512, 512, { fit: "cover" }).png().toFile(join(root, "public/icon-512x512.png"));

console.log("Wrote public/favicon*.png, public/favicon.ico, app/favicon.ico, apple-touch-icon, PWA icons");
