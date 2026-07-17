"use client";

import type { FortuneResult } from "@/lib/fortune";
import { withBasePath } from "@/lib/basePath";
import Icon from "@/components/Icon";

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
    <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
      <div
        className="rounded-2xl px-6 py-3 text-center mb-1.5"
        style={{ background: "linear-gradient(135deg, #6d28d9, #3b1d63)" }}
      >
        <p className="text-white/80 text-sm mb-2">あなたを守る神様は…</p>
        {imageFailed ? (
          <p className="text-5xl mb-2">{result.emoji}</p>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(result.image)}
            alt={result.title}
            onError={onImageError}
            className="w-full aspect-[2.2/1] object-cover object-top rounded-xl mb-2 shadow-lg ring-2 ring-white/30"
          />
        )}
        <h2 className="text-2xl font-bold text-white mb-1">{result.title}</h2>
        <p className="text-white/60 text-sm mb-2">{result.reading}</p>
        <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-sm font-medium text-white">
          今のモード:{typeInfo.emoji}
          {typeInfo.label}
        </div>
      </div>

      <div className="border-2 rounded-xl px-5 py-2 mb-1.5" style={{ borderColor: BORDER_COLOR }}>
        <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-1">
          <Icon name="essence" /> 本質
        </h3>
        <p className="text-xs text-gray-600 leading-snug">{result.essence}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-1.5">
        <div className="border-2 rounded-xl px-3 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-1">
            <Icon name="strength" /> 強み
          </h3>
          <ul className="space-y-0.5">
            {result.strengths.map((s, i) => (
              <li key={i} className="text-xs text-gray-600">
                ・{s}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 rounded-xl px-3 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-1">
            <Icon name="caution" /> 注意点
          </h3>
          <ul className="space-y-0.5">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="text-xs text-gray-600">
                ・{w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-1.5">
        <div className="border-2 rounded-xl px-3 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-1">
            <Icon name="romance" /> 恋愛傾向
          </h3>
          <p className="text-xs text-gray-600 leading-snug">{result.loveStyle}</p>
        </div>
        <div className="border-2 rounded-xl px-3 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-1">
            <Icon name="workstyle" /> 仕事スタイル
          </h3>
          <p className="text-xs text-gray-600 leading-snug">{result.workStyle}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-1.5 text-center">
        <div className="border-2 rounded-xl px-2.5 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center justify-center gap-1">
            <Icon name="compatibility" /> 相性
          </h3>
          <p className="text-xs text-gray-600">{result.compatibleWith}</p>
        </div>
        <div className="border-2 rounded-xl px-2.5 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center justify-center gap-1">
            <Icon name="lucky_item" /> アイテム
          </h3>
          <p className="text-xs text-gray-600">{result.luckyItem}</p>
        </div>
        <div className="border-2 rounded-xl px-2.5 py-2" style={{ borderColor: BORDER_COLOR }}>
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center justify-center gap-1">
            <Icon name="lucky_color" /> カラー
          </h3>
          <p className="text-xs text-gray-600">{result.luckyColor}</p>
        </div>
      </div>

      <div
        className="rounded-xl px-4 py-2.5 border-2"
        style={{ borderColor: "#6d28d9", backgroundColor: "#f5f0ff" }}
      >
        <h3
          className="text-sm font-bold mb-1 flex items-center gap-1"
          style={{ color: "#6d28d9" }}
        >
          <Icon name="hint" /> 今の過ごし方のヒント
        </h3>
        <p className="text-xs text-gray-700 leading-snug">{result.luckyAction}</p>
      </div>
    </div>
  );
}
