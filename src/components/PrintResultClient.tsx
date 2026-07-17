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
      <div className="max-w-xl mx-auto">
        <ResultCard
          result={result}
          typeInfo={typeInfo}
          imageFailed={imageFailed}
          onImageError={() => setImageFailed(true)}
        />
      </div>
    </div>
  );
}
