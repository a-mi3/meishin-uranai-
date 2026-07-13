import { resolvePrintResult, allPrintParams } from "@/lib/resolvePrintResult";
import PrintResultClient from "@/components/PrintResultClient";

export function generateStaticParams() {
  return allPrintParams();
}

export const dynamicParams = false;

export default async function PrintResultPage({
  params,
}: {
  params: Promise<{ godIndex: string; phaseIndex: string; mode: string }>;
}) {
  const { godIndex, phaseIndex, mode } = await params;
  const data = resolvePrintResult(godIndex, phaseIndex, mode);

  if (!data.isValid) {
    return <p className="p-10 text-center text-red-600">無効なパラメータです</p>;
  }

  return <PrintResultClient result={data.result} typeInfo={data.typeInfo} />;
}
