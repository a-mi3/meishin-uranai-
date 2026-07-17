"use client";

import { useState } from "react";
import type { FortuneResult } from "@/lib/fortune";
import SimpleResultCard from "@/components/SimpleResultCard";
import PrintFrame from "@/components/PrintFrame";

type TypeInfo = { emoji: string; label: string };

export default function PrintSimpleResultClient({
  result,
  typeInfo,
}: {
  result: FortuneResult;
  typeInfo: TypeInfo;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div style={{ backgroundColor: "#faf8ff" }}>
      <PrintFrame>
        <div className="px-6 py-2 max-w-xl mx-auto" style={{ minHeight: "1000px" }}>
          <SimpleResultCard
            result={result}
            typeInfo={typeInfo}
            imageFailed={imageFailed}
            onImageError={() => setImageFailed(true)}
          />
        </div>
      </PrintFrame>
    </div>
  );
}
