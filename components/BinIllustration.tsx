import { type BinColor } from "@/lib/bin-schedule";

interface BinIllustrationProps {
  color: BinColor;
  className?: string;
}

export function BinIllustration({ color, className }: BinIllustrationProps) {
  const lid = color === "Green" ? "var(--green)" : "var(--ink)";
  const lidShadow = color === "Green" ? "var(--green-deep)" : "#000";
  const body = "#1a1a17";

  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-label={`${color} lid wheelie bin`}
      role="img"
    >
      {/* Body */}
      <path
        d="M14 46 L106 46 L98 152 Q97 156 93 156 L27 156 Q23 156 22 152 Z"
        fill={body}
      />
      {/* Body ribs */}
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="1.5">
        <line x1="22" y1="74" x2="98" y2="74" />
        <line x1="23" y1="100" x2="97" y2="100" />
        <line x1="24" y1="126" x2="96" y2="126" />
      </g>
      {/* Lid shadow */}
      <rect x="10" y="36" width="100" height="14" rx="3" fill={lidShadow} />
      {/* Lid */}
      <rect x="10" y="30" width="100" height="14" rx="3" fill={lid} />
      {/* Lid handle */}
      <rect
        x="50"
        y="22"
        width="20"
        height="10"
        rx="2"
        fill={lid}
        stroke={lidShadow}
        strokeWidth="1"
      />
      {/* Wheels */}
      <circle cx="32" cy="156" r="6" fill="#0a0a08" />
      <circle cx="88" cy="156" r="6" fill="#0a0a08" />
    </svg>
  );
}
