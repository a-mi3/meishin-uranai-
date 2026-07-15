"use client";

import { useState } from "react";
import type { FortuneResult } from "@/lib/fortune";
import ResultCard from "@/components/ResultCard";
import { withBasePath } from "@/lib/basePath";

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
    <div
      className="px-8 py-10"
      style={{
        backgroundColor: "#faf8ff",
        backgroundImage: `url(${withBasePath("/print-bg.png")})`,
        backgroundSize: "260px 260px",
        backgroundRepeat: "repeat",
      }}
    >
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
