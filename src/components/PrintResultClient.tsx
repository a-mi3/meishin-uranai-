"use client";

import { useState } from "react";
import type { FortuneResult } from "@/lib/fortune";
import ResultCard from "@/components/ResultCard";

type TypeInfo = { emoji: string; label: string };

export default function PrintResultClient({
  result,
  typeInfo,
}: {
  result: FortuneResult;
  typeInfo: TypeInfo;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div style={{ backgroundColor: "#faf8ff" }}>
      <div
        className="w-full py-2 px-4 text-center print:hidden"
        style={{ backgroundColor: "#4c1d95" }}
      >
        <a
          href="https://uranai.see-en.net/hub/"
          target="_top"
          className="text-xs text-white/80 hover:text-white transition"
        >
          ← 占い一覧に戻る
        </a>
      </div>
      <ResultCard
        result={result}
        typeInfo={typeInfo}
        imageFailed={imageFailed}
        onImageError={() => setImageFailed(true)}
      />
    </div>
  );
}
