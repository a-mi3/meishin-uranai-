"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PREFECTURES,
  DEFAULT_PREFECTURE_INDEX,
  computeBirthChart,
  buildAstrologyResult,
} from "@/lib/astrology";
import AstrologyFreeResultPreview from "@/components/AstrologyFreeResultPreview";
import { saveLastResult } from "@/lib/lastResultStorage";
import { initLiff, shareViaLine } from "@/lib/liffClient";
import { withBasePath } from "@/lib/basePath";
import { logResult } from "@/lib/resultLogger";

type Stage = "intro" | "result";

const ACCENT = "#3730a3";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => i);
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => i);

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export default function AstrologyPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [birthHour, setBirthHour] = useState("");
  const [birthMinute, setBirthMinute] = useState("");
  const [prefectureIndex, setPrefectureIndex] = useState(String(DEFAULT_PREFECTURE_INDEX));
  const [formError, setFormError] = useState("");
  const [shared, setShared] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const dayOptions = useMemo(() => {
    const year = Number(birthYear) || CURRENT_YEAR;
    const month = Number(birthMonth) || 1;
    return Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  useEffect(() => {
    if (birthDay && Number(birthDay) > dayOptions.length) {
      setBirthDay("");
    }
  }, [dayOptions, birthDay]);

  useEffect(() => {
    initLiff();
  }, []);

  const [result, setResult] = useState<ReturnType<typeof buildAstrologyResult> | null>(null);

  const startFortune = () => {
    if (!birthYear || !birthMonth || !birthDay) {
      setFormError("生年月日を選んでください");
      return;
    }
    if (!timeUnknown && !birthHour) {
      setFormError("出生時刻を選ぶか、「時刻不明」を選択してください");
      return;
    }
    setFormError("");

    const chart = computeBirthChart({
      year: Number(birthYear),
      month: Number(birthMonth),
      day: Number(birthDay),
      hour: timeUnknown ? null : Number(birthHour),
      minute: timeUnknown ? null : Number(birthMinute || 0),
      prefectureIndex: Number(prefectureIndex),
    });

    const built = buildAstrologyResult(chart.sunIndex, chart.moonIndex, chart.risingIndex);
    setResult(built);
    setImageFailed(false);
    saveLastResult({
      kind: "astrology",
      sunIndex: chart.sunIndex,
      moonIndex: chart.moonIndex,
      risingIndex: chart.risingIndex,
    });
    logResult(
      "astrology",
      "free",
      `太陽:${built.sun.name} 月:${built.moon.name} 上昇:${built.rising?.name ?? "不明"}`,
      { sunIndex: chart.sunIndex, moonIndex: chart.moonIndex, risingIndex: chart.risingIndex }
    );
    setStage("result");
  };

  const reset = () => {
    setStage("intro");
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
    setTimeUnknown(false);
    setBirthHour("");
    setBirthMinute("");
    setResult(null);
    setShared(false);
    setImageFailed(false);
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `【本格占星術鑑定書】\n太陽星座は${result.sun.emoji}${result.sun.name}、月星座は${result.moon.emoji}${result.moon.name}でした!\n\n${result.sunText.body}`;
    if (await shareViaLine(text)) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: "本格占星術鑑定書", text });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex-1"
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 45%, #3730a3 100%)",
      }}
    >
      <div className="w-full py-2 px-4 text-center" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
        <a
          href="https://uranai.see-en.net/hub/"
          target="_top"
          className="text-xs text-white/80 hover:text-white transition"
        >
          ← 占い一覧に戻る
        </a>
      </div>
      <div className="max-w-xl mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <p className="text-indigo-200 text-xs tracking-widest mb-2">
            太陽 × 月 × 上昇星座
          </p>
          <h1 className="sr-only">本格占星術鑑定書</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath("/title-banner-astrology.png")}
            alt="本格占星術鑑定書"
            className="w-full h-auto rounded-2xl shadow-lg mb-3"
          />
          <p className="text-indigo-200 text-sm">
            生年月日・出生時刻・出生地から、太陽星座(性格の核)・月星座(感情の動き方)・上昇星座(第一印象)まで読み解く本格派の占星術鑑定
          </p>
        </header>

        {stage === "intro" && (
          <div className="bg-white rounded-2xl shadow-lg p-7">
            <h2 className="text-lg font-bold text-gray-800 mb-1">生年月日を教えてください</h2>
            <p className="text-xs text-gray-400 mb-4">まずは太陽星座と月星座を導きます</p>
            <div className="grid grid-cols-3 gap-2 mb-5">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:outline-none text-gray-700 text-sm"
                style={{ borderColor: birthYear ? ACCENT : undefined }}
              >
                <option value="">年</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}年
                  </option>
                ))}
              </select>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:outline-none text-gray-700 text-sm"
              >
                <option value="">月</option>
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}月
                  </option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:outline-none text-gray-700 text-sm"
              >
                <option value="">日</option>
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}日
                  </option>
                ))}
              </select>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-1">出生時刻を教えてください</h2>
            <p className="text-xs text-gray-400 mb-4">
              上昇星座(アセンダント)の算出に使用します。不明な場合は「時刻不明」を選んでください
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <select
                value={birthHour}
                onChange={(e) => setBirthHour(e.target.value)}
                disabled={timeUnknown}
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:outline-none text-gray-700 text-sm disabled:bg-gray-100 disabled:text-gray-300"
              >
                <option value="">時</option>
                {HOUR_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {h}時
                  </option>
                ))}
              </select>
              <select
                value={birthMinute}
                onChange={(e) => setBirthMinute(e.target.value)}
                disabled={timeUnknown}
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:outline-none text-gray-700 text-sm disabled:bg-gray-100 disabled:text-gray-300"
              >
                <option value="">分</option>
                {MINUTE_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}分
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 mb-5 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={timeUnknown}
                onChange={(e) => {
                  setTimeUnknown(e.target.checked);
                  if (e.target.checked) {
                    setBirthHour("");
                    setBirthMinute("");
                  }
                }}
              />
              出生時刻が分からない(正午生まれとして太陽星座・月星座のみ算出します)
            </label>

            <h2 className="text-lg font-bold text-gray-800 mb-1">出生地を教えてください</h2>
            <p className="text-xs text-gray-400 mb-4">上昇星座の算出に使用します</p>
            <select
              value={prefectureIndex}
              onChange={(e) => setPrefectureIndex(e.target.value)}
              disabled={timeUnknown}
              className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:outline-none text-gray-700 text-sm mb-2 disabled:bg-gray-100 disabled:text-gray-300"
            >
              {PREFECTURES.map((p, i) => (
                <option key={p.name} value={i}>
                  {p.name}
                </option>
              ))}
            </select>

            {formError && <p className="text-red-500 text-xs mb-2">{formError}</p>}

            <button
              onClick={startFortune}
              className="w-full mt-4 py-3.5 rounded-full text-white font-bold hover:opacity-90 transition shadow-lg"
              style={{ backgroundColor: ACCENT }}
            >
              鑑定する
            </button>
          </div>
        )}

        {stage === "result" && result && (
          <div>
            <AstrologyFreeResultPreview
              result={result}
              imageFailed={imageFailed}
              onImageError={() => setImageFailed(true)}
            />

            <div className="mt-8 space-y-3 text-center">
              <button
                onClick={shareResult}
                className="w-full py-3 rounded-full border-2 font-medium text-sm hover:bg-[#f0f0fb] transition"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                {shared ? "✅ コピーしました!" : "📤 診断結果を共有する"}
              </button>
              <button
                onClick={reset}
                className="w-full py-3 rounded-full border-2 font-medium text-sm hover:bg-gray-50 transition border-gray-300 text-gray-500"
              >
                もう一度占う
              </button>
              <a
                href="https://uranai.see-en.net/hub/"
                target="_top"
                className="block w-full py-3 rounded-full border-2 font-medium text-sm hover:bg-gray-50 transition border-gray-300 text-gray-500"
              >
                🔮 ほかの占いを見る
              </a>
            </div>
          </div>
        )}

        <footer className="text-center mt-12 text-xs text-indigo-200/70">
          <p>本格占星術鑑定書 — エンタメを目的とした簡易占いです。結果は参考程度にお楽しみください</p>
        </footer>
      </div>
    </div>
  );
}
