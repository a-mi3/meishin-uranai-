"use client";

import { usePrintResult } from "@/lib/usePrintResult";
import ResultCard from "@/components/ResultCard";
import PrintFrame from "@/components/PrintFrame";

export default function PrintResultPage() {
  const state = usePrintResult();

  if (!state.isValid) {
    return <p className="p-10 text-center text-red-600">無効なパラメータです</p>;
  }

  return (
    <div className="print-bg-pattern px-8 py-10">
      <PrintFrame>
        <div className="bg-white px-6 py-2 max-w-xl mx-auto">
          <ResultCard
            result={state.result}
            typeInfo={state.typeInfo}
            imageFailed={state.imageFailed}
            onImageError={() => state.setImageFailed(true)}
          />
        </div>
      </PrintFrame>
    </div>
  );
}
