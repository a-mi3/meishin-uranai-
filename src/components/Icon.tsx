import { withBasePath } from "@/lib/basePath";

export default function Icon({
  name,
  className = "w-4 h-4",
}: {
  name: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(`/icons/${name}.svg`)}
      alt=""
      className={`inline-block align-[-0.15em] ${className}`}
    />
  );
}
