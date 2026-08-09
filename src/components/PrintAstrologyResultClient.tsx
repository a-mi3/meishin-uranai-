"use client";

import type { AstrologyResult } from "@/lib/astrology";
import AstrologyResultCard from "@/components/AstrologyResultCard";

export default function PrintAstrologyResultClient({ result }: { result: AstrologyResult }) {
  return (
    <div style={{ backgroundColor: "#f5f6fb" }}>
      <div
        className="w-full py-2 px-4 text-center print:hidden"
        style={{ backgroundColor: "#3730a3" }}
      >
        <a
          href="https://uranai.see-en.net/hub/"
          target="_top"
          className="text-xs text-white/80 hover:text-white transition"
        >
          ← 占い一覧に戻る
        </a>
      </div>
      <AstrologyResultCard result={result} />
    </div>
  );
}
