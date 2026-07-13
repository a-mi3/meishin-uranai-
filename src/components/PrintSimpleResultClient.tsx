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
    <div className="print-bg-pattern px-5 py-5">
      <PrintFrame>
        <div className="bg-white px-6 py-2 max-w-xl mx-auto">
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
