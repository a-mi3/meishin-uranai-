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

type PrintResultData =
  | { isValid: false }
  | { isValid: true; result: FortuneResult; typeInfo: TypeInfo };

export function resolvePrintResult(
  godIndexStr: string,
  phaseIndexStr: string,
  modeStr: string
): PrintResultData {
  const godIndex = Number(godIndexStr);
  const phaseIndex = Number(phaseIndexStr);
  const mode = modeStr as PersonalityType;

  const isValid =
    Number.isInteger(godIndex) &&
    godIndex >= 0 &&
    godIndex < GODS.length &&
    Number.isInteger(phaseIndex) &&
    phaseIndex >= 0 &&
    phaseIndex < PHASES.length &&
    PERSONALITY_TYPES.includes(mode);

  if (!isValid) return { isValid: false };

  const result = buildFortuneResultFromIndices(godIndex, phaseIndex, mode);
  const typeInfo = TYPE_INFO[mode];
  return { isValid: true, result, typeInfo };
}

export function allPrintParams(): {
  godIndex: string;
  phaseIndex: string;
  mode: string;
}[] {
  const params: { godIndex: string; phaseIndex: string; mode: string }[] = [];
  for (let g = 0; g < GODS.length; g++) {
    for (let p = 0; p < PHASES.length; p++) {
      for (const mode of PERSONALITY_TYPES) {
        params.push({ godIndex: String(g), phaseIndex: String(p), mode });
      }
    }
  }
  return params;
}
