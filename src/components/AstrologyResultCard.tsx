"use client";

import { useState } from "react";
import type { AstrologyResult } from "@/lib/astrology";
import { withBasePath } from "@/lib/basePath";

const ACCENT = "#3730a3";
const GOLD = "#c9a227";

function SignImage({
  src,
  alt,
  emoji,
  className,
}: {
  src: string;
  alt: string;
  emoji: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-black/10 text-3xl`}>
        {emoji}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(src)}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function SignBadge({
  layer,
  label,
  emoji,
  name,
  image,
}: {
  layer: string;
  label: string;
  emoji: string;
  name: string;
  image: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden text-center flex-1"
      style={{ backgroundColor: "rgba(255,255,255,0.08)", border: `1px solid ${GOLD}55` }}
    >
      <SignImage
        src={image}
        alt={name}
        emoji={emoji}
        className="w-full aspect-square object-cover object-top"
      />
      <div className="px-2 py-2">
        <p className="text-[11px] mb-0.5" style={{ color: GOLD }}>
          {layer}
        </p>
        <p className="text-[10px] text-white/50 mb-0.5">{label}</p>
        <p className="text-sm font-bold text-white">{name}</p>
      </div>
    </div>
  );
}

function SignSection({
  layer,
  eyebrow,
  emoji,
  name,
  image,
  title,
  body,
  title2,
  body2,
}: {
  layer: string;
  eyebrow: string;
  emoji: string;
  name: string;
  image: string;
  title: string;
  body: string;
  title2: string;
  body2: string;
}) {
  return (
    <div>
      <SignImage
        src={image}
        alt={name}
        emoji={emoji}
        className="w-40 aspect-[2/3] object-cover object-top rounded-xl mx-auto mb-3 shadow"
      />
      <div className="text-center mb-3">
        <p className="text-xs font-bold" style={{ color: ACCENT }}>
          {layer}
        </p>
        <p className="text-[11px] text-gray-400">{eyebrow}</p>
        <p className="text-base font-bold text-gray-800">{name}</p>
      </div>
      <h4 className="text-sm font-bold mb-1.5" style={{ color: ACCENT }}>
        {title}
      </h4>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">{body}</p>
      <h4 className="text-sm font-bold mb-1.5" style={{ color: ACCENT }}>
        {title2}
      </h4>
      <p className="text-sm text-gray-700 leading-relaxed">{body2}</p>
    </div>
  );
}

export default function AstrologyResultCard({ result }: { result: AstrologyResult }) {
  const { sun, moon, rising, sunText, moonText, risingText, synergy } = result;

  return (
    <div className="print-page">
      {/* ページ1: 表紙・表の顔/素顔/裏の顔サマリー */}
      <div
        className="print-avoid-break rounded-2xl p-7 text-center max-w-xl mx-auto"
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #3730a3 100%)",
        }}
      >
        <p className="text-[11px] tracking-widest mb-2" style={{ color: GOLD }}>
          表の顔 × 素顔 × 裏の顔
        </p>
        <h2 className="text-xl font-bold text-white mb-6">本格占星術鑑定書</h2>
        <div className="flex gap-2">
          {rising ? (
            <SignBadge layer="表の顔" label="上昇星座" emoji={rising.emoji} name={rising.name} image={rising.image} />
          ) : (
            <div
              className="rounded-xl px-4 py-3 text-center flex-1"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: `1px solid ${GOLD}55` }}
            >
              <p className="text-[11px] mb-1" style={{ color: GOLD }}>
                表の顔
              </p>
              <p className="text-[10px] text-white/50 mb-1">上昇星座</p>
              <p className="text-2xl mb-0.5">🕐</p>
              <p className="text-[11px] text-white/70">出生時刻が未入力のため算出なし</p>
            </div>
          )}
          <SignBadge layer="素顔" label="太陽星座" emoji={sun.emoji} name={sun.name} image={sun.image} />
          <SignBadge layer="裏の顔" label="月星座" emoji={moon.emoji} name={moon.name} image={moon.image} />
        </div>
        <p className="text-white/60 text-xs mt-6 leading-relaxed">
          上昇星座は初対面で見せる「表の顔」、太陽星座は本来の自分らしさをあらわす「素顔」、
          月星座は心の奥にしまってある「裏の顔」。3つの層を重ねて読むことで、あなたという一人の人間をより立体的に描き出します。
        </p>
      </div>

      {/* ページ2: 表の顔（上昇星座）、または不明時の案内 */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        {rising && risingText ? (
          <SignSection
            layer="① 表の顔"
            eyebrow="第一印象・初対面で見せる顔"
            emoji={rising.emoji}
            name={`上昇星座：${rising.name}`}
            image={rising.image}
            title={risingText.title}
            body={risingText.body}
            title2={risingText.title2}
            body2={risingText.body2}
          />
        ) : (
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: ACCENT }}>
              ① 表の顔について
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              「表の顔」をあらわす上昇星座(アセンダント)は出生時刻によって細かく変わるため、今回は算出していません。
              母子手帳や出生証明書などで出生時刻がわかりましたら、あらためて鑑定することでさらに詳しい「表の顔」まで読み解くことができます。
            </p>
          </div>
        )}
      </div>

      {/* ページ3: 素顔（太陽星座） */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        <SignSection
          layer="② 素顔"
          eyebrow="性格の核・生きる原動力"
          emoji={sun.emoji}
          name={`太陽星座：${sun.name}`}
          image={sun.image}
          title={sunText.title}
          body={sunText.body}
          title2={sunText.title2}
          body2={sunText.body2}
        />
      </div>

      {/* ページ4: 裏の顔（月星座） */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        <SignSection
          layer="③ 裏の顔"
          eyebrow="感情の動き方・誰にも見せない本音"
          emoji={moon.emoji}
          name={`月星座：${moon.name}`}
          image={moon.image}
          title={moonText.title}
          body={moonText.body}
          title2={moonText.title2}
          body2={moonText.body2}
        />
      </div>

      {/* ページ5: 表と裏のギャップ診断 + シナジー */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        <p className="text-[11px] text-gray-400 mb-1">3層シナジー診断</p>
        <h4 className="text-base font-bold text-gray-800 mb-4">
          表の顔・素顔・裏の顔はどう影響し合っているか
        </h4>

        {synergy.gap && (
          <div
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: "#f0f0fb", border: `1px solid ${ACCENT}33` }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <h5 className="text-sm font-bold" style={{ color: ACCENT }}>
                表の顔 × 裏の顔のギャップ
              </h5>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: ACCENT }}
              >
                ギャップ度：{synergy.gap.levelLabel}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{synergy.gap.text}</p>
          </div>
        )}

        <div className="mb-4">
          <h5 className="text-sm font-bold mb-1.5" style={{ color: ACCENT }}>
            素顔 × 裏の顔：意識している自分と本音
          </h5>
          <p className="text-sm text-gray-700 leading-relaxed">{synergy.sunMoon}</p>
        </div>
        {synergy.sunRising && (
          <div>
            <h5 className="text-sm font-bold mb-1.5" style={{ color: ACCENT }}>
              表の顔 × 素顔：見た目の印象と本来の自分らしさ
            </h5>
            <p className="text-sm text-gray-700 leading-relaxed">{synergy.sunRising}</p>
          </div>
        )}
      </div>

      {/* ページ6: まとめ */}
      <div className="print-page-break print-avoid-break max-w-xl mx-auto px-6 py-8">
        <div
          className="rounded-2xl p-6 sm:p-7 text-center"
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #3730a3 100%)",
          }}
        >
          <p className="text-white text-sm leading-relaxed mb-2">
            表の顔・素顔・裏の顔——3つの層が織りなすあなただけの物語を、これからの毎日にそっと重ねてみてください。
          </p>
          <p className="text-white/50 text-[10px]">uranai.see-en.net</p>
        </div>
      </div>
    </div>
  );
}
