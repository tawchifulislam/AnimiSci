"use client";

import { useEffect, useRef, useState } from "react";
import { Lab, col } from "@/components/anim/kit";

type Mol = { x: number; y: number; vx: number; vy: number };

export function GasBox({
  n,
  speed,
  width,
  x0 = 40,
  y0 = 36,
  height = 170,
  showRate = true,
}: {
  n: number;
  speed: number;
  width: number;
  x0?: number;
  y0?: number;
  height?: number;
  showRate?: boolean;
}) {
  const mols = useRef<Mol[]>([]);
  const hits = useRef<number[]>([]);
  const lastHit = useRef(0);
  const live = useRef({ n, speed, width });
  const [, setTick] = useState(0);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    live.current = { n, speed, width };
  }, [n, speed, width]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let lastRate = last;
    const r = 5;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const cur = live.current;
      const arr = mols.current;

      while (arr.length < cur.n) {
        const a = Math.random() * Math.PI * 2;
        arr.push({
          x: x0 + 10 + Math.random() * Math.max(10, cur.width - 20),
          y: y0 + 10 + Math.random() * (height - 20),
          vx: Math.cos(a),
          vy: Math.sin(a),
        });
      }
      if (arr.length > cur.n) arr.length = cur.n;

      const v = cur.speed * 40;
      const right = x0 + cur.width - r;
      for (const m of arr) {
        m.x += m.vx * v * dt;
        m.y += m.vy * v * dt;
        if (m.x > right) {
          m.x = right;
          m.vx = -Math.abs(m.vx);
          hits.current.push(now);
          lastHit.current = now;
        }
        if (m.x < x0 + r) {
          m.x = x0 + r;
          m.vx = Math.abs(m.vx);
        }
        if (m.y < y0 + r) {
          m.y = y0 + r;
          m.vy = Math.abs(m.vy);
        }
        if (m.y > y0 + height - r) {
          m.y = y0 + height - r;
          m.vy = -Math.abs(m.vy);
        }
      }

      if (now - lastRate > 400) {
        lastRate = now;
        hits.current = hits.current.filter((t) => now - t < 2000);
        setRate(Math.round(hits.current.length / 2));
      }

      setTick((t) => t + 1);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [x0, y0, height]);

  const flash = performance.now() - lastHit.current < 120;
  const wallX = x0 + width;

  return (
    <g>
      <path d={`M${wallX} ${y0}H${x0}V${y0 + height}H${wallX}`} fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: col.f }} />
      <rect x={wallX} y={y0 - 2} width={10} height={height + 4} rx={3} strokeWidth={2.5} style={{ fill: flash ? col.r : col.q, stroke: col.f }} />
      <line x1={wallX + 10} y1={y0 + height / 2} x2={wallX + 44} y2={y0 + height / 2} strokeWidth={6} strokeLinecap="round" style={{ stroke: col.f }} />
      {mols.current.slice(0, n).map((m, i) => (
        <circle key={i} cx={m.x} cy={m.y} r={5} style={{ fill: col.p }} />
      ))}
      {showRate ? (
        <Lab p={{ x: x0, y: y0 + height + 30 }} anchor="start" c="m">
          {`পিস্টনে ধাক্কা: প্রতি সেকেন্ডে প্রায় ${rate} বার`}
        </Lab>
      ) : null}
    </g>
  );
}
