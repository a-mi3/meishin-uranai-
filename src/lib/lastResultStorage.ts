const STORAGE_KEY = "uranai_last_result";

export type LastResult = {
  godIndex: number;
  phaseIndex: number;
  mode: string;
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
    return JSON.parse(raw) as LastResult;
  } catch {
    return null;
  }
}
