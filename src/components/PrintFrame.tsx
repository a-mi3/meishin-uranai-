import type { ReactNode } from "react";
import { withBasePath } from "@/lib/basePath";

export default function PrintFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative m-0.5 ${className}`.trim()}
      style={{
        backgroundImage: `url(${withBasePath("/print-frame.png")})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}
