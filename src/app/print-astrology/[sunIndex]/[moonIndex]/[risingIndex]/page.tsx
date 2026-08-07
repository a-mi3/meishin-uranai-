import { resolvePrintAstrologyResult, allPrintAstrologyParams } from "@/lib/resolvePrintAstrologyResult";
import PrintAstrologyResultClient from "@/components/PrintAstrologyResultClient";

export function generateStaticParams() {
  return allPrintAstrologyParams();
}

export const dynamicParams = false;

export default async function PrintAstrologyResultPage({
  params,
}: {
  params: Promise<{ sunIndex: string; moonIndex: string; risingIndex: string }>;
}) {
  const { sunIndex, moonIndex, risingIndex } = await params;
  const data = resolvePrintAstrologyResult(sunIndex, moonIndex, risingIndex);

  if (!data.isValid) {
    return <p className="p-10 text-center text-red-600">無効なパラメータです</p>;
  }

  return <PrintAstrologyResultClient result={data.result} />;
}
