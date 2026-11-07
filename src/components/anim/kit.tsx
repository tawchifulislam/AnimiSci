"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { arcPath } from "@/lib/vec";

export type Pt = { x: number; y: number };

export const col = {
  p: "var(--c-p)",
  q: "var(--c-q)",
  r: "var(--c-r)",
  u: "var(--c-u)",
  t: "var(--c-t)",
  v: "var(--c-v)",
  f: "var(--foreground)",
  m: "var(--muted)",
  l: "var(--line)",
} as const;
export type Col = keyof typeof col;

export const mk = (ox: number, oy: number, s: number) => (x: number, y: number): Pt => ({
  x: ox + x * s,
  y: oy - y * s,
});

export const pol = (o: Pt, ang: number, r: number): Pt => ({
  x: o.x + r * Math.cos((ang * Math.PI) / 180),
  y: o.y - r * Math.sin((ang * Math.PI) / 180),
});

export const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
export const add = (a: Pt, dx: number, dy: number): Pt => ({ x: a.x + dx, y: a.y + dy });
export const spring = { type: "spring" as const, stiffness: 170, damping: 24 };

export function Stage({ w, h, label, children }: { w: number; h: number; label?: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label={label ?? "অ্যানিমেশন"}>
      <defs>
        {(Object.keys(col) as Col[]).map((k) => (
          <marker key={k} id={`ah-${k}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" style={{ fill: col[k] }} />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  );
}

export function Seg({
  a,
  b,
  show = true,
  c,
  w = 3,
  dash = false,
  head = false,
  delay = 0,
}: {
  a: Pt;
  b: Pt;
  show?: boolean;
  c: Col;
  w?: number;
  dash?: boolean;
  head?: boolean;
  delay?: number;
}) {
  return (
    <motion.line
      initial={false}
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      animate={dash ? { opacity: show ? 1 : 0 } : { pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.7, delay: show ? delay : 0, opacity: { duration: 0.2, delay: show ? delay : 0 } }}
      strokeWidth={w}
      strokeDasharray={dash ? "5 5" : undefined}
      strokeLinecap="round"
      markerEnd={head ? `url(#ah-${c})` : undefined}
      style={{ stroke: col[c] }}
    />
  );
}

export function Vec({
  a,
  b,
  show = true,
  c,
  w = 3,
  head = true,
  dash = false,
}: {
  a: Pt;
  b: Pt;
  show?: boolean;
  c: Col;
  w?: number;
  head?: boolean;
  dash?: boolean;
}) {
  return (
    <motion.line
      initial={false}
      animate={{ x1: a.x, y1: a.y, x2: b.x, y2: b.y, opacity: show ? 1 : 0 }}
      transition={spring}
      strokeWidth={w}
      strokeDasharray={dash ? "5 5" : undefined}
      strokeLinecap="round"
      markerEnd={head ? `url(#ah-${c})` : undefined}
      style={{ stroke: col[c] }}
    />
  );
}

export function Arc({
  o,
  r,
  from,
  to,
  c,
  show = true,
  w = 2,
}: {
  o: Pt;
  r: number;
  from: number;
  to: number;
  c: Col;
  show?: boolean;
  w?: number;
}) {
  return (
    <motion.path
      initial={false}
      animate={{ d: arcPath(o.x, o.y, r, from, to), opacity: show ? 1 : 0 }}
      transition={spring}
      fill="none"
      strokeWidth={w}
      style={{ stroke: col[c] }}
    />
  );
}

export function Lab({
  p,
  show = true,
  c = "f",
  anchor = "middle",
  size = 13,
  children,
}: {
  p: Pt;
  show?: boolean;
  c?: Col;
  anchor?: "start" | "middle" | "end";
  size?: number;
  children: ReactNode;
}) {
  return (
    <motion.text
      initial={false}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      x={p.x}
      y={p.y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={600}
      style={{ fill: col[c] }}
    >
      {children}
    </motion.text>
  );
}

export function Dot({ p, c = "f", r = 4, show = true }: { p: Pt; c?: Col; r?: number; show?: boolean }) {
  return (
    <motion.circle
      initial={false}
      animate={{ cx: p.x, cy: p.y, opacity: show ? 1 : 0 }}
      transition={spring}
      r={r}
      style={{ fill: col[c] }}
    />
  );
}

export function Square({ at, d1, d2, size = 9, show = true }: { at: Pt; d1: Pt; d2: Pt; size?: number; show?: boolean }) {
  const a = { x: at.x + d1.x * size, y: at.y + d1.y * size };
  const b = { x: a.x + d2.x * size, y: a.y + d2.y * size };
  const c = { x: at.x + d2.x * size, y: at.y + d2.y * size };
  return (
    <motion.path
      initial={false}
      animate={{ d: `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`, opacity: show ? 1 : 0 }}
      transition={spring}
      fill="none"
      strokeWidth={1.5}
      style={{ stroke: col.f }}
    />
  );
}

export function SliderCard({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 rounded-xl p-4 sm:grid-cols-2" style={{ border: "1px solid var(--line)" }}>
      {children}
    </div>
  );
}
