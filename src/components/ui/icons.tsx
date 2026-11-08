import type { ComponentType } from "react";

export type IconProps = {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
};
export type IconType = ComponentType<IconProps>;

type P = { d: string; f?: boolean; k?: boolean; t?: string };

const ring = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

function make(paths: P[], name: string): IconType {
  const Icon: IconType = ({ size = 24, weight = "regular", className }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "bold" ? 2.6 : weight === "light" || weight === "thin" ? 1.5 : 2.1}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          transform={p.t}
          fill={p.f && (weight === "fill" || weight === "duotone") ? "currentColor" : "none"}
          fillOpacity={weight === "duotone" ? 0.2 : 1}
          stroke={p.k && weight === "fill" ? "var(--surface)" : "currentColor"}
        />
      ))}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
}

export const PlayIcon = make([{ d: "M7.5 5 L19 12 L7.5 19 Z", f: true }], "PlayIcon");
export const PauseIcon = make([{ d: "M6.5 5h3.5v14H6.5z", f: true }, { d: "M14 5h3.5v14H14z", f: true }], "PauseIcon");
export const SkipBackIcon = make([{ d: "M18 5.5 L9 12 L18 18.5 Z", f: true }, { d: "M6 5.5v13" }], "SkipBackIcon");
export const SkipForwardIcon = make([{ d: "M6 5.5 L15 12 L6 18.5 Z", f: true }, { d: "M18 5.5v13" }], "SkipForwardIcon");
export const CheckCircleIcon = make([{ d: ring(12, 12, 9), f: true }, { d: "M8 12.4l2.8 2.8L16.2 9.6", k: true }], "CheckCircleIcon");
export const XCircleIcon = make([{ d: ring(12, 12, 9), f: true }, { d: "M9 9l6 6M15 9l-6 6", k: true }], "XCircleIcon");
export const ClockIcon = make([{ d: ring(12, 12, 9), f: true }, { d: "M12 7.5V12l3 2" }], "ClockIcon");
export const HourglassIcon = make(
  [{ d: "M7 3h10M7 21h10" }, { d: "M8 3v3.5c0 2.5 4 3.5 4 5.5s-4 3-4 5.5V21M16 3v3.5c0 2.5-4 3.5-4 5.5s4 3 4 5.5V21", f: true }],
  "HourglassIcon",
);
export const LightbulbIcon = make(
  [{ d: "M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z", f: true }, { d: "M9.5 18.5h5M10.5 21h3" }],
  "LightbulbIcon",
);
export const ListChecksIcon = make(
  [{ d: "M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" }, { d: "M12 6.5h8M12 12.5h8M12 18.5h8" }],
  "ListChecksIcon",
);
export const ListIcon = make([{ d: "M5 7h14M5 12h14M5 17h14" }], "ListIcon");
export const MenuIcon = make([{ d: "M4 8h16M4 16h11" }], "MenuIcon");
export const XIcon = make([{ d: "M6 6l12 12M18 6L6 18" }], "XIcon");
export const ChevronDownIcon = make([{ d: "M6 9l6 6 6-6" }], "ChevronDownIcon");
export const ArrowRightIcon = make([{ d: "M5 12h14M13 6l6 6-6 6" }], "ArrowRightIcon");
export const LockSimpleIcon = make([{ d: "M6 11h12v9H6z", f: true }, { d: "M8.5 11V8a3.5 3.5 0 0 1 7 0v3" }], "LockSimpleIcon");
export const PencilSimpleIcon = make([{ d: "M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z", f: true }, { d: "M14.5 6.5l3 3" }], "PencilSimpleIcon");
export const SlidersHorizontalIcon = make(
  [{ d: "M4 8h9M17 8h3M4 16h3M11 16h9" }, { d: ring(15, 8, 2), f: true }, { d: ring(9, 16, 2), f: true }],
  "SlidersHorizontalIcon",
);
export const TargetIcon = make([{ d: ring(12, 12, 9), f: true }, { d: ring(12, 12, 4.8) }, { d: ring(12, 12, 0.9), f: true }], "TargetIcon");
export const SigmaIcon = make([{ d: "M18 5H6.5l6 7-6 7H18" }], "SigmaIcon");
export const BookOpenIcon = make(
  [{ d: "M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13C17 4 14 4.5 12 6z", f: true }, { d: "M12 6v13" }],
  "BookOpenIcon",
);
export const AtomIcon = make(
  [
    { d: "M3 12a9 3.6 0 1 0 18 0a9 3.6 0 1 0 -18 0" },
    { d: "M3 12a9 3.6 0 1 0 18 0a9 3.6 0 1 0 -18 0", t: "rotate(60 12 12)" },
    { d: "M3 12a9 3.6 0 1 0 18 0a9 3.6 0 1 0 -18 0", t: "rotate(120 12 12)" },
    { d: ring(12, 12, 1.8), f: true },
  ],
  "AtomIcon",
);
export const FlaskIcon = make(
  [
    { d: "M10 3h4M10.5 3v6.2L5.2 18.4A1.6 1.6 0 0 0 6.6 21h10.8a1.6 1.6 0 0 0 1.4-2.6L13.5 9.2V3", f: true },
    { d: "M8 15h8" },
  ],
  "FlaskIcon",
);
export const DnaIcon = make(
  [{ d: "M8 3c0 6 8 6 8 9s-8 3-8 9" }, { d: "M16 3c0 6-8 6-8 9s8 3 8 9" }, { d: "M9.8 6.4h4.4M9.8 17.6h4.4" }],
  "DnaIcon",
);
export const HouseIcon = make([{ d: "M6 10l6-5.5 6 5.5v10H6z", f: true }, { d: "M3.5 11.5L12 4l8.5 7.5" }], "HouseIcon");
export const SquaresFourIcon = make(
  [{ d: "M4 4h7v7H4z", f: true }, { d: "M13 4h7v7h-7z" }, { d: "M4 13h7v7H4z" }, { d: "M13 13h7v7h-7z", f: true }],
  "SquaresFourIcon",
);
export const TrophyIcon = make(
  [
    { d: "M8 4h8v5a4 4 0 0 1-8 0z", f: true },
    { d: "M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3" },
    { d: "M12 13v4M9 20h6M10 17h4" },
  ],
  "TrophyIcon",
);
