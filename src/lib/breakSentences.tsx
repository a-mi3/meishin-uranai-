import { Fragment } from "react";

export function breakAtSentences(text: string) {
  const parts = text.split("。");
  const hasTrailingPeriod = text.endsWith("。");
  const sentences = parts
    .slice(0, hasTrailingPeriod ? -1 : undefined)
    .filter(Boolean)
    .map((s) => s + "。");
  if (!hasTrailingPeriod && parts[parts.length - 1]) {
    sentences.push(parts[parts.length - 1]);
  }

  return sentences.map((sentence, i) => (
    <Fragment key={i}>
      {sentence}
      {i < sentences.length - 1 && <br />}
    </Fragment>
  ));
}
