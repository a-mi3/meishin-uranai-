"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  GODS,
  PHASES,
  TYPE_INFO,
  buildFortuneResultFromIndices,
  type PersonalityType,
} from "@/lib/fortune";
import ResultCard from "@/components/ResultCard";

const PERSONALITY_TYPES: PersonalityType[] = [
  "challenger",
  "seeker",
  "harmonizer",
  "guardian",
];

export default function PrintResultPage() {
  const params = useParams<{ godIndex: string; phaseIndex: string; mode: string }>();
  const [imageFailed, setImageFailed] = useState(false);

  const godIndex = Number(params.godIndex);
  const phaseIndex = Number(params.phaseIndex);
  const mode = params.mode as PersonalityType;

  const isValid =
    Number.isInteger(godIndex) &&
    godIndex >= 0 &&
    godIndex < GODS.length &&
    Number.isInteger(phaseIndex) &&
    phaseIndex >= 0 &&
    phaseIndex < PHASES.length &&
    PERSONALITY_TYPES.includes(mode);

  if (!isValid) {
    return <p className="p-10 text-center text-red-600">無効なパラメータです</p>;
  }

  const result = buildFortuneResultFromIndices(godIndex, phaseIndex, mode);
  const typeInfo = TYPE_INFO[mode];

  return (
    <div className="bg-white px-6 py-8 max-w-xl mx-auto">
      <ResultCard
        result={result}
        typeInfo={typeInfo}
        imageFailed={imageFailed}
        onImageError={() => setImageFailed(true)}
      />
    </div>
  );
}
