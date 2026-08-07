"use client";

import type { AstrologyResult } from "@/lib/astrology";
import { ASTROLOGY_PURCHASE_URL, ASTROLOGY_PURCHASE_PRICE_LABEL } from "@/lib/config";
import { isInLineClient } from "@/lib/liffClient";

const ACCENT = "#3730a3";
const GOLD = "#c9a227";

export default function AstrologyFreeResultPreview({ result }: { result: AstrologyResult }) {
  const { sun, moon, sunText } = result;

  // 守護女神占いの購入導線と同じ理由(LINE内ブラウザのCookie問題)で
  // 同じ回避ロジックを踏襲している。詳細は FreeResultPreview.tsx を参照。
  const handlePurchaseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    isInLineClient().then((inLine) => {
      if (inLine) {
        import("@line/liff").then(({ default: liff }) => {
          liff.openWindow({ url: ASTROLOGY_PURCHASE_URL, external: true });
        });
      } else {
        window.top!.location.href = ASTROLOGY_PURCHASE_URL;
      }
    });
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
        <div
          className="px-7 py-8 text-center"
          style={{
            background: "linear-gradient(135deg, #1e3a8add, #3730a3dd)",
          }}
        >
          <p className="text-white/80 text-sm mb-1">あなたの太陽星座は…</p>
          <p className="text-5xl mb-2">{sun.emoji}</p>
          <h2 className="text-2xl font-bold text-white mb-1">{sun.name}</h2>
          <p className="text-white/60 text-xs mb-3">{sun.dateRange}生まれ</p>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", border: `1px solid ${GOLD}55` }}
          >
            月星座は{moon.emoji}
            {moon.name}
          </div>
        </div>
        <div className="px-7 py-5">
          <h3 className="text-sm font-bold text-gray-800 mb-2">🌟 {sunText.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{sunText.body}</p>
        </div>
      </div>

      <div
        className="rounded-2xl shadow-lg p-7 border-2 text-center"
        style={{ borderColor: ACCENT, backgroundColor: "#f0f0fb" }}
      >
        <p className="text-3xl mb-2">🔭</p>
        <h3 className="text-base font-bold mb-2" style={{ color: ACCENT }}>
          本格占星術鑑定書を見る
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          太陽星座だけでなく、感情の動き方をあらわす「月星座」、第一印象をあらわす「上昇星座」まで含めた、あなただけの本格鑑定書が続きます。
        </p>
        <a
          href={ASTROLOGY_PURCHASE_URL}
          target="_top"
          onClick={handlePurchaseClick}
          className="inline-block w-full py-3.5 rounded-full text-white font-bold hover:opacity-90 transition shadow-lg"
          style={{ backgroundColor: ACCENT }}
        >
          本格鑑定書を見る（{ASTROLOGY_PURCHASE_PRICE_LABEL}）
        </a>
      </div>
    </div>
  );
}
