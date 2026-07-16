// Batch-exports every god x phase x mode combination as A4 PDFs, for producing physical print goods.
// Generates two variants per combination:
//   - simple/  : single-page condensed card (product itself)
//   - detail/  : full multi-page result (insert / detailed reading)
//
// Prerequisite: the app must already be running — either `npm run dev`, or
// `npm run build` followed by serving the static `out/` folder (e.g. `npx serve out`).
// Usage: PRINT_BASE_URL=http://localhost:3000/app node scripts/generate-print-pdfs.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// next.config.ts sets basePath "/app", so routes are only served under /app.
const BASE_URL = process.env.PRINT_BASE_URL || "http://localhost:3000/app";
const GOD_COUNT = 12;
const PHASE_COUNT = 5;
const MODES = ["challenger", "seeker", "harmonizer", "guardian"];
const VARIANTS = [
  { key: "simple", pathSuffix: "/simple" },
  { key: "detail", pathSuffix: "" },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.join(__dirname, "..", "print-exports");

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const manifest = [];
  const total = GOD_COUNT * PHASE_COUNT * MODES.length * VARIANTS.length;
  let count = 0;

  for (const variant of VARIANTS) {
    const outDir = path.join(OUT_ROOT, variant.key);
    fs.mkdirSync(outDir, { recursive: true });

    for (let godIndex = 0; godIndex < GOD_COUNT; godIndex++) {
      for (let phaseIndex = 0; phaseIndex < PHASE_COUNT; phaseIndex++) {
        for (const mode of MODES) {
          const url = `${BASE_URL}/print/${godIndex}/${phaseIndex}/${mode}${variant.pathSuffix}`;
          await page.goto(url, { waitUntil: "networkidle" });

          const title = await page.locator("h2").first().textContent();
          const reading = await page.locator("p.text-white\\/60").first().textContent();

          const fileName = `god${String(godIndex).padStart(2, "0")}_phase${phaseIndex}_${mode}.pdf`;
          await page.pdf({
            path: path.join(outDir, fileName),
            format: "A4",
            printBackground: true,
            margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
          });

          manifest.push({
            variant: variant.key,
            fileName: path.join(variant.key, fileName),
            godIndex,
            phaseIndex,
            mode,
            title,
            reading,
          });
          count++;
          console.log(`[${count}/${total}] ${variant.key}/${fileName} — ${title}`);
        }
      }
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUT_ROOT, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );

  console.log(`\nDone. Generated ${count} PDFs in ${OUT_ROOT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
