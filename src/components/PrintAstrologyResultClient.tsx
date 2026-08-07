"use client";

import type { AstrologyResult } from "@/lib/astrology";
import AstrologyResultCard from "@/components/AstrologyResultCard";

export default function PrintAstrologyResultClient({ result }: { result: AstrologyResult }) {
  return (
    <div style={{ backgroundColor: "#f5f6fb" }}>
      <AstrologyResultCard result={result} />
    </div>
  );
}
