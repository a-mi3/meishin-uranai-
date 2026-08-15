// 診断結果をWordPress側（uranai-result-loggerプラグイン）に記録する。
// 同一オリジン(uranai.see-en.net)へのfetchなのでCORS設定は不要。
// 失敗してもアプリの動作には一切影響させない(fire-and-forget)。

const LOG_ENDPOINT = "https://uranai.see-en.net/wp-json/uranai-log/v1/log";
const SESSION_KEY = "uranai_session_id";

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export function logResult(
  app: "meishin" | "astrology" | "renai" | "seimei",
  stage: "free" | "unlocked",
  summary: string,
  resultData: unknown
) {
  try {
    const sessionId = getSessionId();
    if (!sessionId) return;
    fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app, session_id: sessionId, stage, summary, result_data: resultData }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ログ送信の失敗でアプリ本体を壊さない
  }
}

// 購入リンクにセッションIDを付与するためのヘルパー。
// URLに?または&で正しく連結する。
export function withSessionId(url: string): string {
  const sessionId = getSessionId();
  if (!sessionId) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}session_id=${encodeURIComponent(sessionId)}`;
}
