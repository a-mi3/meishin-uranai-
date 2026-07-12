import type { CSSProperties, ReactNode } from "react";

function CornerOrnament({ style }: { style: CSSProperties }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className="absolute"
      style={style}
    >
      <path
        d="M11 0 L12.9 8.1 L22 11 L12.9 13.9 L11 22 L9.1 13.9 L0 11 L9.1 8.1 Z"
        fill="#6d28d9"
      />
      <circle cx="11" cy="11" r="2" fill="#f5f0ff" />
    </svg>
  );
}

export default function PrintFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative m-3"
      style={{
        border: "2px solid #6d28d9",
        outline: "1.5px solid #6d28d9",
        outlineOffset: "6px",
        borderRadius: "4px",
      }}
    >
      <CornerOrnament style={{ top: -11, left: -11 }} />
      <CornerOrnament style={{ top: -11, right: -11 }} />
      <CornerOrnament style={{ bottom: -11, left: -11 }} />
      <CornerOrnament style={{ bottom: -11, right: -11 }} />
      <div className="p-4">{children}</div>
    </div>
  );
}
