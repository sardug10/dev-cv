/**
 * Lossy-resize + re-encode article assets under public/assets/.
 * Run: yarn compress:assets
 *
 * - hero.jpg / hero.jpeg: max width 1680px, mozjpeg ~82 (LCP / OG image)
 * - other .jpg/.jpeg: max width 1600px, quality ~80
 * - .png: max width 1600px, png level 9 (paths in MDX stay .png)
 */
import { readdir, stat, readFile, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "assets");

/** @param {string} dir */
async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** @param {string} file */
function isHero(file) {
  return /^hero\.(jpe?g)$/i.test(path.basename(file));
}

/** @param {string} file */
function ext(file) {
  return path.extname(file).toLowerCase();
}

/**
 * @param {string} inputPath
 * @param {Buffer} buf
 */
async function processFile(inputPath, buf) {
  const lower = ext(inputPath);
  const meta = await sharp(buf).metadata();
  const before = buf.length;

  let pipeline = sharp(buf);
  const hero = isHero(inputPath);

  if (lower === ".jpg" || lower === ".jpeg") {
    const maxW = hero ? 1680 : 1600;
    pipeline = pipeline.resize({
      width: maxW,
      withoutEnlargement: true,
    });
    const q = hero ? 82 : 80;
    const out = await pipeline
      .jpeg({ quality: q, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();
    if (out.length >= before) return null;
    // Skip micro re-encodes so repeat runs stay no-ops after first pass.
    if (out.length >= Math.floor(before * 0.98)) return null;
    return { out, before, after: out.length, kind: hero ? "hero-jpeg" : "jpeg" };
  }

  if (lower === ".png") {
    const w = meta.width ?? 0;
    if (w > 1600) {
      pipeline = pipeline.resize({
        width: 1600,
        withoutEnlargement: true,
      });
    }
    const out = await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toBuffer();
    if (out.length >= Math.floor(before * 0.98)) return null;
    return { out, before, after: out.length, kind: "png" };
  }

  return null;
}

async function main() {
  let saved = 0;
  let touched = 0;

  for await (const file of walk(ROOT)) {
    const lower = ext(file);
    if (![".jpg", ".jpeg", ".png"].includes(lower)) continue;

    const st = await stat(file);
    if (st.size < 2048) continue;

    const inputBuf = await readFile(file);
    const result = await processFile(file, inputBuf);
    if (!result) continue;

    await writeFile(file, result.out);
    touched += 1;
    saved += result.before - result.after;
    const rel = path.relative(process.cwd(), file);
    const pct = (((result.before - result.after) / result.before) * 100).toFixed(1);
    console.log(
      `${rel}  ${result.kind}  ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB (−${pct}%)`,
    );
  }

  if (!touched) {
    console.log("No files improved (already small or compressions not smaller).");
    return;
  }
  console.log(`\nUpdated ${touched} file(s), total saved ~${(saved / 1024).toFixed(0)} KB.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
