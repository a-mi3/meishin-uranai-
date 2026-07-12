"use client";

import { usePrintResult } from "@/lib/usePrintResult";
import SimpleResultCard from "@/components/SimpleResultCard";
import PrintFrame from "@/components/PrintFrame";

export default function PrintSimpleResultPage() {
  const state = usePrintResult();

  if (!state.isValid) {
    return <p className="p-10 text-center text-red-600">無効なパラメータです</p>;
  }

  return (
    <div className="print-bg-pattern px-5 py-5">
      <PrintFrame>
        <div className="bg-white px-6 py-2 max-w-xl mx-auto">
          <SimpleResultCard
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
