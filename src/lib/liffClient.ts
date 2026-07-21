import { LIFF_ID } from "@/lib/config";

let initPromise: Promise<boolean> | null = null;

// Initializes LIFF if a real LIFF ID has been configured. Safe to call from
// both inside the LINE app and a regular browser (e.g. the WordPress embed) —
// it silently no-ops on failure so the rest of the app is unaffected.
export function initLiff(): Promise<boolean> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    if (!LIFF_ID || LIFF_ID === "REPLACE_WITH_LIFF_ID") return false;
    try {
      const liff = (await import("@line/liff")).default;
      await liff.init({ liffId: LIFF_ID });
      return true;
    } catch {
      return false;
    }
  })();

  return initPromise;
}

export async function isInLineClient(): Promise<boolean> {
  const ready = await initLiff();
  if (!ready) return false;
  const liff = (await import("@line/liff")).default;
  return liff.isInClient();
}

export async function shareViaLine(text: string): Promise<boolean> {
  const ready = await initLiff();
  if (!ready) return false;
  try {
    const liff = (await import("@line/liff")).default;
    if (!liff.isApiAvailable("shareTargetPicker")) return false;
    const result = await liff.shareTargetPicker([{ type: "text", text }]);
    return result !== undefined;
  } catch {
    return false;
  }
}
