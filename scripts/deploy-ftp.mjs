// out/ の静的書き出しをXserverへFTPアップロードする。
// .env.xserver-ftp (gitignored) の認証情報を使用。
// 使い方: npm run build してから node scripts/deploy-ftp.mjs
// (basic-ftp is not a saved dependency — reinstall with
//  `npm install --no-save basic-ftp` if node_modules gets pruned)
import { Client } from "basic-ftp";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const envPath = path.join(rootDir, ".env.xserver-ftp");
const outDir = path.join(rootDir, "out");

if (!existsSync(envPath)) {
  console.error("ERROR: .env.xserver-ftp not found");
  process.exit(1);
}
if (!existsSync(outDir)) {
  console.error("ERROR: out/ not found. Run `npm run build` first.");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line.includes("="))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
    })
);

const client = new Client();
try {
  await client.access({
    host: env.FTP_HOST,
    user: env.FTP_USER,
    password: env.FTP_PASSWORD,
    secure: false,
  });
  await client.ensureDir(env.FTP_REMOTE_DIR);
  await client.clearWorkingDir();
  await client.uploadFromDir(outDir);
  console.log(`OK: deployed out/ to ${env.FTP_REMOTE_DIR}`);
} catch (err) {
  console.error("ERROR:", err);
  process.exit(1);
} finally {
  client.close();
}
