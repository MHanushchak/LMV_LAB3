// Optimize previously downloaded, license-checked Commons files without retouching.
// Usage: node scripts/prepare-product-images.mjs /path/to/downloaded-sources
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const input = process.argv[2];
if (!input) throw new Error('Provide a directory containing <product-id>.source files. See docs/product-photo-sources.json.');
const sources = JSON.parse(await readFile('docs/product-photo-sources.json', 'utf8'));
await mkdir('public/images/products', { recursive: true });
for (const [id, photo] of Object.entries(sources)) {
  if (!/^[a-z0-9-]+$/.test(id) || photo.src !== `/images/products/${id}.webp`) throw new Error(`Invalid output path: ${id}`);
  if (!(photo.license === 'Public domain' || /^(CC0|CC BY(?:-SA)? \d\.\d)$/.test(photo.license))) throw new Error(`Unsupported image license: ${id}`);
  try {
    const bytes = await readFile(path.join(input, `${id}.source`));
    const info = await sharp(bytes).rotate().resize({ width: 256, height: 256, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public${photo.src}`);
    console.log(`${id}: ${info.width}×${info.height}, ${info.size} bytes`);
  } catch (error) { if (error.code === 'ENOENT' && process.env.ALLOW_PARTIAL_IMAGES === '1') continue; throw error; }
}
