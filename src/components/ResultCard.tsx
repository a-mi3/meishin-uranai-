"use client";

import type { FortuneResult } from "@/lib/fortune";
import { withBasePath } from "@/lib/basePath";
import { breakAtSentences } from "@/lib/breakSentences";
import PrintFrame from "@/components/PrintFrame";

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
      {/* 表紙ページ：タイトルバナー */}
      <PrintFrame>
        <div className="flex items-center justify-center" style={{ minHeight: "700px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/title-banner.png")}
            alt="守護女神占い"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </PrintFrame>

      <PrintFrame className="print-page-break">
        <div className="rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
          <div
            className="rounded-t-2xl px-7 py-8 text-center"
            style={{
              background: `linear-gradient(135deg, #6d28d9, #3b1d63)`,
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
                className="w-96 h-[576px] object-cover object-top rounded-xl mx-auto mb-3 shadow-lg ring-2 ring-white/30"
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
            <p className="text-gray-600 text-sm leading-relaxed">
              {breakAtSentences(result.essence)}
            </p>
          </div>
        </div>
      </PrintFrame>

      {/* ページ2：プロフィール(強み・注意点・恋愛・仕事・相性・アイテム・カラー・ヒント) */}
      <PrintFrame className="print-page-break">
        <div className="rounded-2xl p-7" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
          <Banner src={illustrations[0]} />
          <h3 className="text-base font-bold mb-4" style={{ color: "#6d28d9" }}>
            📋 プロフィール
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                💕 恋愛傾向
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {breakAtSentences(result.loveStyle)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                💼 仕事スタイル
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {breakAtSentences(result.workStyle)}
              </p>
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
            <p className="text-sm text-gray-700 leading-relaxed">
              {breakAtSentences(result.luckyAction)}
            </p>
          </div>
        </div>
      </PrintFrame>

      {/* ページ4：アドバイス1(今のあなたについて・モード) */}
      <PrintFrame className="print-page-break">
        <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
          <Banner src={illustrations[1]} />
          <h3 className="text-base font-bold mb-4" style={{ color: "#6d28d9" }}>
            💬 あなたへの詳しいアドバイス
          </h3>
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1.5">{today.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {breakAtSentences(today.body)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1.5">{tone.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {breakAtSentences(tone.body)}
              </p>
            </div>
          </div>
        </div>
      </PrintFrame>

      {/* ページ5〜：アドバイス2+3(今という時期〜最後に、区切らず自然に流す) */}
      <PrintFrame className="print-page-break">
        <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
          <Banner src={illustrations[2]} />
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1.5">{period.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {breakAtSentences(period.body)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1.5">{relationship.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {breakAtSentences(relationship.body)}
              </p>
            </div>
            <Banner src={illustrations[3]} />
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-1.5">{actionPlan.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {breakAtSentences(actionPlan.body)}
              </p>
            </div>
          </div>
        </div>
      </PrintFrame>

      {/* 最終ページ：まとめ＋QRコードで再来訪を促す */}
      <PrintFrame className="print-page-break">
        <div
          className="rounded-2xl p-6 sm:p-7 text-center"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        >
          {imageFailed ? (
            <p className="text-4xl mb-3">{result.emoji}</p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBasePath(result.image)}
              alt={result.title}
              className="w-40 h-60 object-cover object-top rounded-xl mx-auto mb-4 shadow-lg ring-2 ring-white/30"
            />
          )}
          <div className="text-left mb-4">
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{closing.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {breakAtSentences(closing.body)}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-white inline-flex flex-col items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath("/qr-hp.png")}
              alt="守護女神占い サイトQRコード"
              className="w-24 h-24"
            />
            <p className="text-xs text-gray-600">またあなたを守る神様に会いに来てください</p>
            <p className="text-[10px] text-gray-400">uranai.see-en.net</p>
          </div>
        </div>
      </PrintFrame>
    </div>
  );
}
