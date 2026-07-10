"use client";

import { useEffect, useMemo, useState } from "react";
import {
  QUESTIONS,
  TYPE_INFO,
  buildFortuneResult,
  tallyPersonalityType,
  type PersonalityType,
} from "@/lib/fortune";

type Stage = "intro" | "quiz" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [dateError, setDateError] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PersonalityType[]>([]);
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

  const birthDate = useMemo(() => {
    if (!birthYear || !birthMonth || !birthDay) return "";
    return `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;
  }, [birthYear, birthMonth, birthDay]);

  const startQuiz = () => {
    if (!birthDate) {
      setDateError("生年月日を選んでください");
      return;
    }
    setDateError("");
    setStage("quiz");
  };

  const handleSelect = (type: PersonalityType) => {
    const updated = [...answers, type];
    setAnswers(updated);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStage("result");
    }
  };

  const goBack = () => {
    if (step === 0) {
      setStage("intro");
      return;
    }
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  };

  const reset = () => {
    setStage("intro");
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
    setStep(0);
    setAnswers([]);
    setShared(false);
  };

  const personalityType = useMemo(
    () => (answers.length === QUESTIONS.length ? tallyPersonalityType(answers) : null),
    [answers]
  );
  const result = useMemo(
    () => (birthDate && personalityType ? buildFortuneResult(birthDate, personalityType) : null),
    [birthDate, personalityType]
  );
  const typeInfo = personalityType ? TYPE_INFO[personalityType] : null;

  useEffect(() => {
    setImageFailed(false);
  }, [result?.image]);

  const shareResult = async () => {
    if (!result || !typeInfo) return;
    const text = `【守護女神占い】\n私は「${result.emoji}${result.title}」タイプでした!\n(気分のモード:${typeInfo.emoji}${typeInfo.label})\n\n${result.essence}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "守護女神占い", text });
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
        background:
          "linear-gradient(160deg, #1e1033 0%, #3b1d63 45%, #4c1d95 100%)",
      }}
    >
      <div className="max-w-xl mx-auto px-4 py-10">
        <header className="text-center mb-8">
          <p className="text-purple-200 text-xs tracking-widest mb-2">
            60の守護神 × 心理テスト
          </p>
          <h1 className="text-3xl font-bold text-white mb-2">守護女神占い</h1>
          <p className="text-purple-200 text-sm">
            生年月日から導く「60の守護神」と、心理テストでわかる「今のあなたのモード」を掛け合わせた新ジャンルの占い
          </p>
        </header>

        {stage === "intro" && (
          <div className="bg-white rounded-2xl shadow-lg p-7">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              あなたの生年月日を教えてください
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              生まれた日から、あなたに宿る「守護神」を導きます
            </p>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6d28d9] focus:outline-none text-gray-700 text-sm"
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
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6d28d9] focus:outline-none text-gray-700 text-sm"
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
                className="w-full px-2 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6d28d9] focus:outline-none text-gray-700 text-sm"
              >
                <option value="">日</option>
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}日
                  </option>
                ))}
              </select>
            </div>
            {dateError && (
              <p className="text-red-500 text-xs mb-2">{dateError}</p>
            )}
            <button
              onClick={startQuiz}
              className="w-full mt-4 py-3.5 rounded-full text-white font-bold hover:opacity-90 transition shadow-lg"
              style={{ backgroundColor: "#6d28d9" }}
            >
              占いをはじめる
            </button>
          </div>
        )}

        {stage === "quiz" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-7">
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>
                    質問 {step + 1} / {QUESTIONS.length}
                  </span>
                  <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((step + 1) / QUESTIONS.length) * 100}%`,
                      backgroundColor: "#6d28d9",
                    }}
                  />
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-800 mb-5">
                {QUESTIONS[step].label}
              </h2>

              <div className="grid gap-2.5">
                {QUESTIONS[step].options.map((option) => (
                  <button
                    key={option.text}
                    onClick={() => handleSelect(option.type)}
                    className="w-full text-left px-5 py-3.5 rounded-xl border-2 border-gray-100 hover:border-[#6d28d9] hover:bg-[#f5f0ff] hover:shadow-md transition-all text-gray-700 text-sm font-medium"
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              <button
                onClick={goBack}
                className="mt-5 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                ← 前の質問に戻る
              </button>
            </div>
          </div>
        )}

        {stage === "result" && result && typeInfo && (
          <div>
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
                    src={result.image}
                    alt={result.title}
                    onError={() => setImageFailed(true)}
                    className="w-56 h-[336px] object-cover object-top rounded-xl mx-auto mb-3 shadow-lg ring-2 ring-white/30"
                  />
                )}
                <h2 className="text-2xl font-bold text-white mb-1">
                  {result.title}
                </h2>
                <p className="text-white/60 text-xs mb-3">{result.reading}</p>
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm font-medium text-white">
                  今のモード:{typeInfo.emoji}
                  {typeInfo.label}
                </div>
              </div>
              <div className="px-7 py-5">
                <h3 className="text-sm font-bold text-gray-800 mb-2">🌟 本質</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {result.essence}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  💪 強み
                </h3>
                <ul className="space-y-1.5">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span style={{ color: "#6d28d9" }}>・</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  ⚠️ 注意点
                </h3>
                <ul className="space-y-1.5">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span style={{ color: "#6d28d9" }}>・</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                  💕 恋愛傾向
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{result.loveStyle}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                  💼 仕事スタイル
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{result.workStyle}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                  🤝 相性の良い神様
                </h3>
                <p className="text-sm text-gray-600">{result.compatibleWith}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    🍀 アイテム
                  </h3>
                  <p className="text-sm text-gray-600">{result.luckyItem}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    🎨 カラー
                  </h3>
                  <p className="text-sm text-gray-600">{result.luckyColor}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                  ⏳ 今の過ごし方のヒント
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{result.luckyAction}</p>
              </div>

              <div
                className="rounded-2xl shadow-lg p-6 sm:p-7 border-2"
                style={{ borderColor: "#6d28d9", backgroundColor: "#f5f0ff" }}
              >
                <h3
                  className="text-base font-bold mb-4"
                  style={{ color: "#6d28d9" }}
                >
                  💬 あなたへの詳しいアドバイス
                </h3>
                <div className="space-y-5">
                  {result.adviceSections.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-sm font-bold text-gray-800 mb-1.5">
                        {section.title}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-center">
              <button
                onClick={shareResult}
                className="w-full py-3 rounded-full border-2 font-medium text-sm hover:bg-[#f5f0ff] transition"
                style={{ borderColor: "#6d28d9", color: "#6d28d9" }}
              >
                {shared ? "✅ コピーしました!" : "📤 診断結果を共有する"}
              </button>
              <button
                onClick={reset}
                className="w-full py-3 rounded-full border-2 font-medium text-sm hover:bg-gray-50 transition border-gray-300 text-gray-500"
              >
                もう一度占う
              </button>
            </div>
          </div>
        )}

        <footer className="text-center mt-12 text-xs text-purple-200/70">
          <p>守護女神占い — エンタメを目的とした簡易占いです。結果は参考程度にお楽しみください</p>
        </footer>
      </div>
    </div>
  );
}
