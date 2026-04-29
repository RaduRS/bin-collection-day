import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const pub = join(root, "public");

const main = await readFile(join(pub, "icon.svg"));
const maskable = await readFile(join(pub, "icon-maskable.svg"));

const renders = [
  { svg: main, size: 32, out: "favicon-32.png" },
  { svg: main, size: 180, out: "apple-icon.png" },
  { svg: main, size: 192, out: "icon-192.png" },
  { svg: main, size: 512, out: "icon-512.png" },
  { svg: maskable, size: 192, out: "icon-maskable-192.png" },
  { svg: maskable, size: 512, out: "icon-maskable-512.png" },
];

for (const { svg, size, out } of renders) {
  const buf = await sharp(svg).resize(size, size).png().toBuffer();
  await writeFile(join(pub, out), buf);
  console.log(`✓ ${out} (${size}×${size})`);
}
