// Batch-exports every god x phase x mode combination from /print/[godIndex]/[phaseIndex]/[mode]
// as an A4 PDF, for producing physical print goods.
//
// Prerequisite: the app must already be running (e.g. `npm run dev` or `npm run build && npm start`).
// Usage: PRINT_BASE_URL=http://localhost:3000 node scripts/generate-print-pdfs.mjs

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = process.env.PRINT_BASE_URL || "http://localhost:3000";
const GOD_COUNT = 12;
const PHASE_COUNT = 5;
const MODES = ["challenger", "seeker", "harmonizer", "guardian"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "print-exports");

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const manifest = [];
  const total = GOD_COUNT * PHASE_COUNT * MODES.length;
  let count = 0;

  for (let godIndex = 0; godIndex < GOD_COUNT; godIndex++) {
    for (let phaseIndex = 0; phaseIndex < PHASE_COUNT; phaseIndex++) {
      for (const mode of MODES) {
        const url = `${BASE_URL}/print/${godIndex}/${phaseIndex}/${mode}`;
        await page.goto(url, { waitUntil: "networkidle" });

        const title = await page.locator("h2").first().textContent();
        const reading = await page.locator("p.text-white\\/60").first().textContent();

        const fileName = `god${String(godIndex).padStart(2, "0")}_phase${phaseIndex}_${mode}.pdf`;
        await page.pdf({
          path: path.join(OUT_DIR, fileName),
          format: "A4",
          printBackground: true,
          margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
        });

        manifest.push({ fileName, godIndex, phaseIndex, mode, title, reading });
        count++;
        console.log(`[${count}/${total}] ${fileName} — ${title}`);
      }
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );

  console.log(`\nDone. Generated ${count} PDFs in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
