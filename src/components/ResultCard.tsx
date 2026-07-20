"use client";

import type { FortuneResult } from "@/lib/fortune";
import { withBasePath } from "@/lib/basePath";
import { breakAtSentences } from "@/lib/breakSentences";
import PrintFrame from "@/components/PrintFrame";
import Icon from "@/components/Icon";
import SimpleResultCard from "@/components/SimpleResultCard";

type TypeInfo = { emoji: string; label: string };

type ResultCardProps = {
  result: FortuneResult;
  typeInfo: TypeInfo;
  imageFailed: boolean;
  onImageError: () => void;
};

function Banner({
  src,
  className = "w-full mx-auto aspect-[5.33/1] object-cover rounded-xl mb-2 shadow",
}: {
  src: string | undefined;
  className?: string;
}) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={withBasePath(src)} alt="" className={className} />
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
      {/* ページ1：簡易版と同じ内容 */}
      <PrintFrame>
        <div
          className="px-6 py-2 max-w-xl mx-auto flex flex-col justify-center"
          style={{ minHeight: "1000px" }}
        >
          <SimpleResultCard
            result={result}
            typeInfo={typeInfo}
            imageFailed={imageFailed}
            onImageError={onImageError}
          />
        </div>
      </PrintFrame>

      {/* ページ2〜：詳しいアドバイス（改ページを挟まず読み物として続ける） */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        <h3
          className="text-base font-bold mb-4 flex items-center gap-1.5"
          style={{ color: "#6d28d9" }}
        >
          <Icon name="advice" className="w-5 h-5" /> あなたへの詳しいアドバイス
        </h3>
        <Banner src={illustrations[4]} />
        <div className="space-y-4">
          <Banner src={illustrations[1]} />
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
          <Banner src={illustrations[2]} />
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
          <Banner
            src={illustrations[5]}
            className="w-1/4 mx-auto aspect-video object-cover rounded-xl shadow"
          />
        </div>
      </div>

      {/* 最終ページ：まとめ＋TOP画像＋QRコード（改ページなしで続けるが、途中では割れないようにする） */}
      <PrintFrame className="print-avoid-break">
        <div
          className="rounded-2xl p-6 sm:p-7 text-center max-w-xl mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        >
          <div className="text-left mb-4">
            <h4 className="text-sm font-bold text-gray-800 mb-1.5">{closing.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {breakAtSentences(closing.body)}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/title-banner.png")}
            alt="守護女神占い"
            className="w-full h-auto rounded-xl shadow-lg mb-4"
          />
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
