export type StickerKind = "atom" | "flask" | "dna" | "sigma";

export function StickerIcon({ kind }: { kind: StickerKind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "atom") {
    return (
      <svg {...common}>
        <ellipse cx={12} cy={12} rx={10} ry={4.2} />
        <ellipse cx={12} cy={12} rx={10} ry={4.2} transform="rotate(60 12 12)" />
        <ellipse cx={12} cy={12} rx={10} ry={4.2} transform="rotate(120 12 12)" />
        <circle cx={12} cy={12} r={1.7} fill="currentColor" />
      </svg>
    );
  }

  if (kind === "flask") {
    return (
      <svg {...common}>
        <path d="M9 3h6" />
        <path d="M10 3v6l-5 9.2a2 2 0 0 0 1.8 2.8h10.4a2 2 0 0 0 1.8-2.8L14 9V3" />
        <path d="M7.4 15h9.2" />
      </svg>
    );
  }

  if (kind === "dna") {
    return (
      <svg {...common}>
        <path d="M8 3c0 5 8 5 8 9s-8 4-8 9" />
        <path d="M16 3c0 5-8 5-8 9s8 4 8 9" />
        <path d="M9.4 6.6h5.2" />
        <path d="M9.4 17.4h5.2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M18 5H6l6.4 7L6 19h12" />
    </svg>
  );
}
