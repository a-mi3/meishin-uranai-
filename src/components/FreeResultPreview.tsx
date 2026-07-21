"use client";

import type { FortuneResult } from "@/lib/fortune";
import { PURCHASE_URL, PURCHASE_PRICE_LABEL } from "@/lib/config";
import { withBasePath } from "@/lib/basePath";

type TypeInfo = { emoji: string; label: string };

type FreeResultPreviewProps = {
  result: FortuneResult;
  typeInfo: TypeInfo;
  imageFailed: boolean;
  onImageError: () => void;
};

export default function FreeResultPreview({
  result,
  typeInfo,
  imageFailed,
  onImageError,
}: FreeResultPreviewProps) {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
        <div
          className="px-7 py-8 text-center"
          style={{ background: `linear-gradient(135deg, #6d28d9dd, #3b1d63dd)` }}
        >
          <p className="text-white/80 text-sm mb-1">あなたを守る神様は…</p>
          {imageFailed ? (
            <p className="text-4xl mb-2">{result.emoji}</p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBasePath(result.image)}
              alt={result.title}
              onError={onImageError}
              className="w-56 h-[336px] object-cover object-top rounded-xl mx-auto mb-3 shadow-lg ring-2 ring-white/30"
            />
          )}
          <h2 className="text-2xl font-bold text-white mb-1">{result.title}</h2>
          <p className="text-white/60 text-xs mb-3">{result.reading}</p>
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm font-medium text-white">
            今のモード:{typeInfo.emoji}
            {typeInfo.label}
          </div>
        </div>
        <div className="px-7 py-5">
          <h3 className="text-sm font-bold text-gray-800 mb-2">🌟 本質</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{result.essence}</p>
        </div>
      </div>

      <div
        className="rounded-2xl shadow-lg p-7 border-2 text-center"
        style={{ borderColor: "#6d28d9", backgroundColor: "#f5f0ff" }}
      >
        <p className="text-3xl mb-2">🔒</p>
        <h3 className="text-base font-bold mb-2" style={{ color: "#6d28d9" }}>
          詳しい鑑定結果はここから
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          強み・注意点・恋愛傾向・仕事スタイル・相性・ラッキーアイテム、そしてあなただけの詳しいアドバイスが続きます。
        </p>
        <a
          href={PURCHASE_URL}
          target="_top"
          className="inline-block w-full py-3.5 rounded-full text-white font-bold hover:opacity-90 transition shadow-lg"
          style={{ backgroundColor: "#6d28d9" }}
        >
          詳しい鑑定結果を見る（{PURCHASE_PRICE_LABEL}）
        </a>
      </div>
    </div>
  );
}
