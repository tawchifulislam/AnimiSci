"use client";

import { Lab, Stage, Vec, col, type Col } from "@/components/anim/kit";

export type Curve = { pts: Array<[number, number]>; c: Col; dash?: boolean; w?: number };
export type Mark = { x: number; y: number; c?: Col; label?: string; dx?: number; dy?: number };
export type Note = { x: number; y: number; text: string; c?: Col; anchor?: "start" | "end" };

export function Plot({
  xl,
  yl,
  xmax,
  ymax,
  xmin = 0,
  ymin = 0,
  curves,
  marks = [],
  notes = [],
  shade,
  label,
}: {
  xl: string;
  yl: string;
  xmax: number;
  ymax: number;
  xmin?: number;
  ymin?: number;
  curves: Curve[];
  marks?: Mark[];
  notes?: Note[];
  shade?: { pts: Array<[number, number]>; c: Col };
  label: string;
}) {
  const ox = 60;
  const oy = 220;
  const W = 360;
  const H = 170;
  const X = (x: number) => ox + ((x - xmin) / (xmax - xmin)) * W;
  const Y = (y: number) => oy - ((y - ymin) / (ymax - ymin)) * H;
  const path = (pts: Array<[number, number]>) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${X(x).toFixed(1)} ${Y(y).toFixed(1)}`).join("");

  return (
    <Stage w={440} h={260} label={label}>
      {shade ? <polygon points={shade.pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ")} style={{ fill: col[shade.c], opacity: 0.28 }} /> : null}
      <Vec a={{ x: ox, y: oy }} b={{ x: ox + W + 14, y: oy }} c="m" w={2} />
      <Vec a={{ x: ox, y: oy }} b={{ x: ox, y: oy - H - 14 }} c="m" w={2} />
      <Lab p={{ x: ox + W + 10, y: oy + 22 }} c="m" anchor="end">{xl}</Lab>
      <Lab p={{ x: ox + 10, y: oy - H - 8 }} c="m" anchor="start">{yl}</Lab>
      {curves.map((c, i) => (
        <path key={i} d={path(c.pts)} fill="none" strokeWidth={c.w ?? 4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={c.dash ? "7 6" : undefined} style={{ stroke: col[c.c] }} />
      ))}
      {marks.map((m, i) => (
        <g key={i}>
          <circle cx={X(m.x)} cy={Y(m.y)} r={6} style={{ fill: col[m.c ?? "r"] }} />
          {m.label ? (
            <Lab p={{ x: X(m.x) + (m.dx ?? 10), y: Y(m.y) + (m.dy ?? -10) }} c={m.c ?? "r"} anchor="start">
              {m.label}
            </Lab>
          ) : null}
        </g>
      ))}
      {notes.map((n, i) => (
        <Lab key={i} p={{ x: X(n.x), y: Y(n.y) }} c={n.c ?? "m"} anchor={n.anchor}>
          {n.text}
        </Lab>
      ))}
    </Stage>
  );
}
