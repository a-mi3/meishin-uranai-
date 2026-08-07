import { ZODIAC_SIGNS, buildAstrologyResult, type AstrologyResult } from "@/lib/astrology";

type PrintAstrologyData =
  | { isValid: false }
  | { isValid: true; result: AstrologyResult };

export function resolvePrintAstrologyResult(
  sunIndexStr: string,
  moonIndexStr: string,
  risingIndexStr: string
): PrintAstrologyData {
  const sunIndex = Number(sunIndexStr);
  const moonIndex = Number(moonIndexStr);
  const risingIndex = risingIndexStr === "unknown" ? null : Number(risingIndexStr);

  const isValid =
    Number.isInteger(sunIndex) &&
    sunIndex >= 0 &&
    sunIndex < ZODIAC_SIGNS.length &&
    Number.isInteger(moonIndex) &&
    moonIndex >= 0 &&
    moonIndex < ZODIAC_SIGNS.length &&
    (risingIndex === null ||
      (Number.isInteger(risingIndex) && risingIndex >= 0 && risingIndex < ZODIAC_SIGNS.length));

  if (!isValid) return { isValid: false };

  const result = buildAstrologyResult(sunIndex, moonIndex, risingIndex);
  return { isValid: true, result };
}

export function allPrintAstrologyParams(): {
  sunIndex: string;
  moonIndex: string;
  risingIndex: string;
}[] {
  const params: { sunIndex: string; moonIndex: string; risingIndex: string }[] = [];
  for (let s = 0; s < ZODIAC_SIGNS.length; s++) {
    for (let m = 0; m < ZODIAC_SIGNS.length; m++) {
      for (let r = 0; r < ZODIAC_SIGNS.length; r++) {
        params.push({ sunIndex: String(s), moonIndex: String(m), risingIndex: String(r) });
      }
      params.push({ sunIndex: String(s), moonIndex: String(m), risingIndex: "unknown" });
    }
  }
  return params;
}
