"use client";

import { useState } from "react";
import type { FortuneResult } from "@/lib/fortune";
import SimpleResultCard from "@/components/SimpleResultCard";
import PrintFrame from "@/components/PrintFrame";
import { withBasePath } from "@/lib/basePath";

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
        <div
          className="px-6 py-2 max-w-xl mx-auto flex flex-col justify-center"
          style={{ minHeight: "1000px" }}
        >
          <SimpleResultCard
            result={result}
            typeInfo={typeInfo}
            imageFailed={imageFailed}
            onImageError={() => setImageFailed(true)}
          />
        </div>
      </PrintFrame>

      {/* 裏面：両面印刷用の裏表紙 */}
      <div className="print-page-break">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath("/back-cover.png")} alt="" className="w-full h-auto block" />
      </div>
    </div>
  );
}
