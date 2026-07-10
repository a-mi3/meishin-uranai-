"use client";

import type { FortuneResult } from "@/lib/fortune";

type TypeInfo = { emoji: string; label: string };

type SimpleResultCardProps = {
  result: FortuneResult;
  typeInfo: TypeInfo;
  imageFailed: boolean;
  onImageError: () => void;
};

const BORDER_COLOR = "#e9d8fd";

export default function SimpleResultCard({
  result,
  typeInfo,
  imageFailed,
  onImageError,
}: SimpleResultCardProps) {
  return (
    <div className="bg-white">
      <div
        className="rounded-2xl px-6 py-6 text-center mb-3"
        style={{ background: "linear-gradient(135deg, #6d28d9dd, #3b1d63dd)" }}
      >
        <p className="text-white/80 text-xs mb-1">あなたを守る神様は…</p>
        {imageFailed ? (
          <p className="text-4xl mb-2">{result.emoji}</p>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result.image}
            alt={result.title}
            onError={onImageError}
            className="w-40 h-60 object-cover object-top rounded-xl mx-auto mb-2 shadow-lg ring-2 ring-white/30"
          />
        )}
        <h2 className="text-xl font-bold text-white mb-1">{result.title}</h2>
        <p className="text-white/60 text-[11px] mb-2">{result.reading}</p>
        <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-medium text-white">
          今のモード:{typeInfo.emoji}
          {typeInfo.label}
        </div>
      </div>

      <div className="border-2 rounded-xl px-5 py-3 mb-3" style={{ borderColor: BORDER_COLOR }}>
        <h3 className="text-xs font-bold text-gray-800 mb-1">🌟 本質</h3>
        <p className="text-[11px] text-gray-600 leading-snug">{result.essence}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="border-2 rounded-xl px-4 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">💪 強み</h3>
          <ul className="space-y-0.5">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-[11px] text-gray-600">
                ・{s}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 rounded-xl px-4 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">⚠️ 注意点</h3>
          <ul className="space-y-0.5">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="text-[11px] text-gray-600">
                ・{w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="border-2 rounded-xl px-4 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">💕 恋愛傾向</h3>
          <p className="text-[11px] text-gray-600 leading-snug">{result.loveStyle}</p>
        </div>
        <div className="border-2 rounded-xl px-4 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">💼 仕事スタイル</h3>
          <p className="text-[11px] text-gray-600 leading-snug">{result.workStyle}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3 text-center">
        <div className="border-2 rounded-xl px-3 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">🤝 相性</h3>
          <p className="text-[11px] text-gray-600">{result.compatibleWith}</p>
        </div>
        <div className="border-2 rounded-xl px-3 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">🍀 アイテム</h3>
          <p className="text-[11px] text-gray-600">{result.luckyItem}</p>
        </div>
        <div className="border-2 rounded-xl px-3 py-3" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-xs font-bold text-gray-800 mb-1">🎨 カラー</h3>
          <p className="text-[11px] text-gray-600">{result.luckyColor}</p>
        </div>
      </div>

      <div
        className="rounded-xl px-5 py-3 border-2"
        style={{ borderColor: "#6d28d9", backgroundColor: "#f5f0ff" }}
      >
        <h3 className="text-xs font-bold mb-1" style={{ color: "#6d28d9" }}>
          ⏳ 今の過ごし方のヒント
        </h3>
        <p className="text-[11px] text-gray-700 leading-snug">{result.luckyAction}</p>
      </div>
    </div>
  );
}
