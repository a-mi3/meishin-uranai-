"use client";

import type { AstrologyResult } from "@/lib/astrology";
import { ASTROLOGY_PURCHASE_URL, ASTROLOGY_PURCHASE_PRICE_LABEL } from "@/lib/config";
import { isInLineClient } from "@/lib/liffClient";
import { withBasePath } from "@/lib/basePath";
import { withSessionId } from "@/lib/resultLogger";

const ACCENT = "#3730a3";
const GOLD = "#c9a227";

type AstrologyFreeResultPreviewProps = {
  result: AstrologyResult;
  imageFailed: boolean;
  onImageError: () => void;
};

export default function AstrologyFreeResultPreview({
  result,
  imageFailed,
  onImageError,
}: AstrologyFreeResultPreviewProps) {
  const { sun, moon, sunText } = result;

  // 守護女神占いの購入導線と同じ理由(LINE内ブラウザのCookie問題)で
  // 同じ回避ロジックを踏襲している。詳細は FreeResultPreview.tsx を参照。
  const purchaseUrl = withSessionId(ASTROLOGY_PURCHASE_URL);

  const handlePurchaseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    isInLineClient().then((inLine) => {
      if (inLine) {
        import("@line/liff").then(({ default: liff }) => {
          liff.openWindow({ url: purchaseUrl, external: true });
        });
      } else {
        window.top!.location.href = purchaseUrl;
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
          {imageFailed ? (
            <p className="text-5xl mb-2">{sun.emoji}</p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBasePath(sun.image)}
              alt={sun.name}
              onError={onImageError}
              className="w-56 h-[336px] object-cover object-top rounded-xl mx-auto mb-3 shadow-lg ring-2 ring-white/30"
            />
          )}
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
          太陽星座だけでなく、感情の動き方をあらわす「月星座」、第一印象をあらわす「上昇星座」まで算出。恋愛・仕事での表れ方や人間関係のクセ、3天体が互いにどう影響し合っているかを読み解く「シナジー診断」まで含めた、あなただけの本格鑑定書が続きます。
        </p>
        <a
          href={purchaseUrl}
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
