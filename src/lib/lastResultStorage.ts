const STORAGE_KEY = "uranai_last_result";

export type LastResult =
  | { kind: "meishin"; godIndex: number; phaseIndex: number; mode: string }
  | {
      kind: "astrology";
      sunIndex: number;
      moonIndex: number;
      risingIndex: number | null;
    };

export function saveLastResult(result: LastResult) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // localStorage unavailable (private browsing, storage full, etc.) —
    // the purchase flow simply won't be able to auto-redirect after checkout.
  }
}

export function getLastResult(): LastResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LastResult>;
    // 旧形式(kindフィールドが無い守護女神占いの結果)との互換性を保つ
    if (!parsed.kind && "godIndex" in parsed) {
      return { ...parsed, kind: "meishin" } as LastResult;
    }
    return parsed as LastResult;
  } catch {
    return null;
  }
}
