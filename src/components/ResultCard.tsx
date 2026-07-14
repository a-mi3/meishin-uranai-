"use client";

import type { FortuneResult } from "@/lib/fortune";
import { withBasePath } from "@/lib/basePath";

type TypeInfo = { emoji: string; label: string };

type ResultCardProps = {
  result: FortuneResult;
  typeInfo: TypeInfo;
  imageFailed: boolean;
  onImageError: () => void;
};

function Banner({ src }: { src: string | undefined }) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(src)}
      alt=""
      className="w-full aspect-video object-cover rounded-xl mb-4 shadow"
    />
  );
}

export default function ResultCard({
  result,
  typeInfo,
  imageFailed,
  onImageError,
}: ResultCardProps) {
  const illustrations = result.illustrations ?? [];
  const [today, tone] = result.adviceSections;
  const [period, relationship] = result.adviceSections.slice(2, 4);
  const [actionPlan, closing] = result.adviceSections.slice(4, 6);

  return (
    <div className="print-page">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
        <div
          className="px-7 py-8 text-center"
          style={{
            background: `linear-gradient(135deg, #6d28d9dd, #3b1d63dd)`,
          }}
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

      {/* ページ2：プロフィールA(強み・注意点) */}
      <div className="print-page-break bg-white rounded-2xl shadow-lg p-7">
        <Banner src={illustrations[0]} />
        <h3 className="text-base font-bold mb-4" style={{ color: "#6d28d9" }}>
          📋 プロフィール
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              💪 強み
            </h4>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span style={{ color: "#6d28d9" }}>・</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              ⚠️ 注意点
            </h4>
            <ul className="space-y-1.5">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span style={{ color: "#6d28d9" }}>・</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ページ3：プロフィールB(恋愛・仕事・相性・アイテム・カラー・ヒント) */}
      <div className="print-page-break bg-white rounded-2xl shadow-lg p-7">
        <Banner src={illustrations[1]} />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              💕 恋愛傾向
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{result.loveStyle}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              💼 仕事スタイル
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{result.workStyle}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              🤝 相性
            </h4>
            <p className="text-sm text-gray-600">{result.compatibleWith}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              🍀 アイテム
            </h4>
            <p className="text-sm text-gray-600">{result.luckyItem}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              🎨 カラー
            </h4>
            <p className="text-sm text-gray-600">{result.luckyColor}</p>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "#f5f0ff" }}>
          <h4 className="text-sm font-bold mb-1.5 flex items-center gap-2" style={{ color: "#6d28d9" }}>
            ⏳ 今の過ごし方のヒント
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed">{result.luckyAction}</p>
        </div>
      </div>

      {/* ページ4：アドバイス1(今のあなたについて・モード) */}
      <div
        className="print-page-break rounded-2xl shadow-lg p-6 sm:p-7 border-2"
        style={{ borderColor: "#6d28d9", backgroundColor: "#f5f0ff" }}
      >
        <Banner src={illustrations[2]} />
        <h3 className="text-base font-bold mb-4" style={{ color: "#6d28d9" }}>
          💬 あなたへの詳しいアドバイス
        </h3>
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{today.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{today.body}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{tone.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{tone.body}</p>
          </div>
        </div>
      </div>

      {/* ページ5〜：アドバイス2+3(今という時期〜最後に、区切らず自然に流す) */}
      <div
        className="print-page-break rounded-2xl shadow-lg p-6 sm:p-7 border-2"
        style={{ borderColor: "#6d28d9", backgroundColor: "#f5f0ff" }}
      >
        <Banner src={illustrations[3]} />
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{period.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{period.body}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{relationship.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{relationship.body}</p>
          </div>
          <Banner src={illustrations[4]} />
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{actionPlan.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{actionPlan.body}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{closing.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{closing.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
