"use client";

import { useEffect, useState } from "react";
import { getLastResult } from "@/lib/lastResultStorage";
import { withBasePath } from "@/lib/basePath";

export default function UnlockPage() {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const last = getLastResult();
    if (!last) {
      setNotFound(true);
      return;
    }
    const { godIndex, phaseIndex, mode } = last;
    window.location.replace(
      withBasePath(`/print/${godIndex}/${phaseIndex}/${mode}/`)
    );
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(160deg, #1e1033 0%, #3b1d63 45%, #4c1d95 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
        {notFound ? (
          <>
            <p className="text-gray-700 text-sm leading-relaxed mb-5">
              診断結果が見つかりませんでした。お手数ですが、もう一度占ってからお試しください。
            </p>
            <a
              href={withBasePath("/")}
              className="inline-block w-full py-3 rounded-full text-white font-bold hover:opacity-90 transition"
              style={{ backgroundColor: "#6d28d9" }}
            >
              占いに戻る
            </a>
          </>
        ) : (
          <p className="text-gray-700 text-sm">
            ご購入ありがとうございます。詳しい鑑定結果へ移動しています…
          </p>
        )}
      </div>
    </div>
  );
}
