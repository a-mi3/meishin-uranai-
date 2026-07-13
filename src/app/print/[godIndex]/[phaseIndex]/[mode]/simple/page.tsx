import { resolvePrintResult, allPrintParams } from "@/lib/resolvePrintResult";
import PrintSimpleResultClient from "@/components/PrintSimpleResultClient";

export function generateStaticParams() {
  return allPrintParams();
}

export const dynamicParams = false;

export default async function PrintSimpleResultPage({
  params,
}: {
  params: Promise<{ godIndex: string; phaseIndex: string; mode: string }>;
}) {
  const { godIndex, phaseIndex, mode } = await params;
  const data = resolvePrintResult(godIndex, phaseIndex, mode);

  if (!data.isValid) {
    return <p className="p-10 text-center text-red-600">無効なパラメータです</p>;
  }

  return (
    <PrintSimpleResultClient result={data.result} typeInfo={data.typeInfo} />
  );
}
