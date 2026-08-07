"use client";

import type { AstrologyResult } from "@/lib/astrology";

const ACCENT = "#3730a3";
const GOLD = "#c9a227";

function SignBadge({
  label,
  emoji,
  name,
}: {
  label: string;
  emoji: string;
  name: string;
}) {
  return (
    <div
      className="rounded-xl px-4 py-3 text-center flex-1"
      style={{ backgroundColor: "rgba(255,255,255,0.08)", border: `1px solid ${GOLD}55` }}
    >
      <p className="text-[11px] mb-1" style={{ color: GOLD }}>
        {label}
      </p>
      <p className="text-2xl mb-0.5">{emoji}</p>
      <p className="text-sm font-bold text-white">{name}</p>
    </div>
  );
}

function SignSection({
  eyebrow,
  emoji,
  name,
  title,
  body,
}: {
  eyebrow: string;
  emoji: string;
  name: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{emoji}</span>
        <div>
          <p className="text-[11px] text-gray-400">{eyebrow}</p>
          <p className="text-base font-bold text-gray-800">{name}</p>
        </div>
      </div>
      <h4 className="text-sm font-bold mb-1.5" style={{ color: ACCENT }}>
        {title}
      </h4>
      <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
}

export default function AstrologyResultCard({ result }: { result: AstrologyResult }) {
  const { sun, moon, rising, sunText, moonText, risingText } = result;

  return (
    <div className="print-page">
      {/* ページ1: 表紙・3天体サマリー */}
      <div
        className="print-avoid-break rounded-2xl p-7 text-center max-w-xl mx-auto"
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #3730a3 100%)",
        }}
      >
        <p className="text-[11px] tracking-widest mb-2" style={{ color: GOLD }}>
          太陽 × 月 × 上昇星座
        </p>
        <h2 className="text-xl font-bold text-white mb-6">本格占星術鑑定書</h2>
        <div className="flex gap-2">
          <SignBadge label="太陽星座" emoji={sun.emoji} name={sun.name} />
          <SignBadge label="月星座" emoji={moon.emoji} name={moon.name} />
          {rising ? (
            <SignBadge label="上昇星座" emoji={rising.emoji} name={rising.name} />
          ) : (
            <div
              className="rounded-xl px-4 py-3 text-center flex-1"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: `1px solid ${GOLD}55` }}
            >
              <p className="text-[11px] mb-1" style={{ color: GOLD }}>
                上昇星座
              </p>
              <p className="text-2xl mb-0.5">🕐</p>
              <p className="text-[11px] text-white/70">出生時刻が未入力のため算出なし</p>
            </div>
          )}
        </div>
        <p className="text-white/60 text-xs mt-6 leading-relaxed">
          太陽星座は「性格の核」、月星座は「感情の動き方」、上昇星座は「第一印象」をあらわします。
          3つを重ねて読むことで、あなたという一人の人間をより立体的に描き出します。
        </p>
      </div>

      {/* ページ2: 太陽星座 */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        <SignSection
          eyebrow="性格の核・生きる原動力"
          emoji={sun.emoji}
          name={`太陽星座：${sun.name}`}
          title={sunText.title}
          body={sunText.body}
        />
      </div>

      {/* ページ3: 月星座 */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        <SignSection
          eyebrow="感情の動き方・心が安らぐ場所"
          emoji={moon.emoji}
          name={`月星座：${moon.name}`}
          title={moonText.title}
          body={moonText.body}
        />
      </div>

      {/* ページ4: 上昇星座、または不明時の案内 */}
      <div className="print-page-break max-w-xl mx-auto px-6 py-8">
        {rising && risingText ? (
          <SignSection
            eyebrow="第一印象・外に見える顔"
            emoji={rising.emoji}
            name={`上昇星座：${rising.name}`}
            title={risingText.title}
            body={risingText.body}
          />
        ) : (
          <div>
            <h4 className="text-sm font-bold mb-1.5" style={{ color: ACCENT }}>
              上昇星座について
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              上昇星座(アセンダント)は出生時刻によって細かく変わるため、今回は算出していません。
              母子手帳や出生証明書などで出生時刻がわかりましたら、あらためて鑑定することでさらに詳しい「第一印象・外に見える顔」まで読み解くことができます。
            </p>
          </div>
        )}
      </div>

      {/* ページ5: まとめ */}
      <div className="print-page-break print-avoid-break max-w-xl mx-auto px-6 py-8">
        <div
          className="rounded-2xl p-6 sm:p-7 text-center"
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #3730a3 100%)",
          }}
        >
          <p className="text-white text-sm leading-relaxed mb-2">
            太陽・月・上昇——3つの星座が織りなすあなただけの物語を、これからの毎日にそっと重ねてみてください。
          </p>
          <p className="text-white/50 text-[10px]">uranai.see-en.net</p>
        </div>
      </div>
    </div>
  );
}
