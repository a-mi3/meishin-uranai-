"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  GODS,
  PHASES,
  TYPE_INFO,
  buildFortuneResultFromIndices,
  type FortuneResult,
  type PersonalityType,
} from "@/lib/fortune";

const PERSONALITY_TYPES: PersonalityType[] = [
  "challenger",
  "seeker",
  "harmonizer",
  "guardian",
];

type TypeInfo = { emoji: string; label: string };

type PrintResultState =
  | { isValid: false; imageFailed: boolean; setImageFailed: (v: boolean) => void }
  | {
      isValid: true;
      result: FortuneResult;
      typeInfo: TypeInfo;
      imageFailed: boolean;
      setImageFailed: (v: boolean) => void;
    };

export function usePrintResult(): PrintResultState {
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
    return { isValid: false, imageFailed, setImageFailed };
  }

  const result = buildFortuneResultFromIndices(godIndex, phaseIndex, mode);
  const typeInfo = TYPE_INFO[mode];

  return { isValid: true, result, typeInfo, imageFailed, setImageFailed };
}
