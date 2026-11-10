"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Vec, col, type Col } from "./kit";

export type FieldKey = "source" | "sink" | "uniform" | "rotation" | "shear";

export type FieldDef = {
  name: string;
  label: string;
  fx: (x: number, y: number) => number;
  fy: (x: number, y: number) => number;
  div: number;
  curl: number;
};

export const fields: Record<FieldKey, FieldDef> = {
  source: { name: "উৎস", label: "A = x î + y ĵ", fx: (x) => x, fy: (_x, y) => y, div: 2, curl: 0 },
  sink: { name: "গ্রাহক", label: "A = −x î − y ĵ", fx: (x) => -x, fy: (_x, y) => -y, div: -2, curl: 0 },
  uniform: { name: "সমান স্রোত", label: "A = 2 î", fx: () => 2, fy: () => 0, div: 0, curl: 0 },
  rotation: { name: "ঘূর্ণি", label: "A = −y î + x ĵ", fx: (_x, y) => -y, fy: (x) => x, div: 0, curl: 2 },
  shear: { name: "শিয়ার", label: "A = y î", fx: (_x, y) => y, fy: () => 0, div: 0, curl: -1 },
};

const CX = 220;
const CY = 145;
const GX = 56;
const GY = 52;
const K = 11;

export function Quiver({ field, c = "p" }: { field: FieldKey; c?: Col }) {
  const f = fields[field];
  const items: ReactNode[] = [];
  for (let i = -3; i <= 3; i++) {
    for (let j = -2; j <= 2; j++) {
      const px = CX + i * GX;
      const py = CY - j * GY;
      const dx = f.fx(i, j) * K;
      const dy = -f.fy(i, j) * K;
      items.push(
        <circle key={`d${i}:${j}`} cx={px} cy={py} r={2} style={{ fill: col.m }} />,
        <Vec key={`v${i}:${j}`} a={{ x: px - dx / 2, y: py - dy / 2 }} b={{ x: px + dx / 2, y: py + dy / 2 }} c={c} w={2.5} show={Math.hypot(dx, dy) > 3} />,
      );
    }
  }
  return <>{items}</>;
}

const lin = (a: number, b: number) => [a, a + (b - a) * 0.15, a + (b - a) * 0.8, b];

export function Particles({ field }: { field: FieldKey }) {
  const items: ReactNode[] = [];

  if (field === "source" || field === "sink") {
    for (let i = 0; i < 8; i++) {
      const a = ((i * 45 + 22.5) * Math.PI) / 180;
      const r0 = field === "source" ? 10 : 130;
      const r1 = field === "source" ? 130 : 10;
      items.push(
        <motion.circle
          key={`${field}${i}`}
          r={4}
          style={{ fill: col.u }}
          animate={{
            cx: lin(CX + r0 * Math.cos(a), CX + r1 * Math.cos(a)),
            cy: lin(CY - r0 * Math.sin(a), CY - r1 * Math.sin(a)),
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "linear", delay: i * 0.42, times: [0, 0.15, 0.8, 1] }}
        />,
      );
    }
  }

  if (field === "uniform") {
    for (let j = -2; j <= 2; j++) {
      items.push(
        <motion.circle
          key={`u${j}`}
          r={4}
          cy={CY - j * GY * 0.9}
          style={{ fill: col.u }}
          animate={{ cx: [30, 410] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: (j + 2) * 0.7 }}
        />,
      );
    }
  }

  if (field === "rotation") {
    const radii = [55, 105];
    radii.forEach((rad, ri) => {
      for (let k = 0; k < 3; k++) {
        const phase = k * 120 + ri * 40;
        const xs: number[] = [];
        const ys: number[] = [];
        for (let n = 0; n <= 16; n++) {
          const a = ((phase + (n / 16) * 360) * Math.PI) / 180;
          xs.push(CX + rad * Math.cos(a));
          ys.push(CY - rad * Math.sin(a));
        }
        items.push(
          <motion.circle
            key={`r${ri}${k}`}
            r={4}
            style={{ fill: col.u }}
            animate={{ cx: xs, cy: ys }}
            transition={{ duration: ri === 0 ? 5 : 8, repeat: Infinity, ease: "linear" }}
          />,
        );
      }
    });
  }

  if (field === "shear") {
    [-2, -1, 1, 2].forEach((j) => {
      const a = j > 0 ? 110 : 330;
      const b = j > 0 ? 330 : 110;
      items.push(
        <motion.circle
          key={`s${j}`}
          r={4}
          cy={CY - j * GY}
          style={{ fill: col.u }}
          animate={{ cx: [a, b] }}
          transition={{ duration: 7 / Math.abs(j), repeat: Infinity, ease: "linear" }}
        />,
      );
    });
  }

  return <>{items}</>;
}
