"use client";

import { useEffect, useRef, useState } from "react";
import { animate, backOut, easeInOut, motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { Stage, col } from "@/components/anim/kit";
import { useReducedMotionPref } from "@/lib/motion-pref";
import { useInView } from "@/lib/use-in-view";
import { arcPath, bn, rad } from "@/lib/vec";

const O = { x: 70, y: 200 };
const PL = 130;
const QL = 104;

const beats = [
  { name: "দেখো", note: "দুটি ঠেলা আঁকা হয়, মিলিত ফল লাল তীরে।" },
  { name: "নাড়াও", note: "কোণ বদলাও, লাল তীর সাথে সাথে বদলায়।" },
  { name: "সূত্র", note: "ছবি থেকেই সূত্র বেরিয়ে আসে।" },
  { name: "যাচাই", note: "কুইজে মিলিয়ে নাও, বুঝে গেছ।" },
];

function useMix(inputs: MotionValue<number>[], fn: (v: number[]) => number): MotionValue<number> {
  return useTransform(inputs, fn);
}

function AlphaNum({ alpha }: { alpha: MotionValue<number> }) {
  const [v, setV] = useState(Math.round(alpha.get()));
  useMotionValueEvent(alpha, "change", (a) => setV(Math.round(a)));
  return (
    <text x={290} y={246} textAnchor="end" fontSize={13} fontWeight={700} style={{ fill: col.f }}>
      α = {bn(v)}°
    </text>
  );
}

export function LessonReel() {
  const t = useMotionValue(0.6);
  const [beat, setBeat] = useState(2);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, 0.3);
  const reduce = useReducedMotionPref();

  useMotionValueEvent(t, "change", (v) => setBeat(Math.min(3, Math.floor(v * 4))));

  useEffect(() => {
    if (!seen || reduce) return;
    t.set(0);
    const c = animate(t, 1, { duration: 14, ease: "linear", repeat: Infinity });
    return () => {
      c.stop();
      t.set(0.6);
    };
  }, [seen, reduce, t]);

  const alpha = useTransform(t, [0, 0.24, 0.34, 0.44, 0.52, 1], [55, 55, 125, 40, 70, 70], { ease: easeInOut });
  const fade = useTransform(t, [0.95, 1], [1, 0]);

  const pp = useTransform(t, [0.02, 0.07], [0, 1]);
  const qp = useTransform(t, [0.07, 0.12], [0, 1]);
  const rp = useTransform(t, [0.12, 0.19], [0, 1]);
  const gp = useTransform(t, [0.17, 0.23], [0, 1]);
  const pO = useTransform(t, [0.02, 0.035], [0, 1]);
  const qO = useTransform(t, [0.07, 0.085], [0, 1]);
  const rO = useTransform(t, [0.12, 0.135], [0, 1]);

  const cosA = useTransform(alpha, (a) => Math.cos(rad(a)));
  const sinA = useTransform(alpha, (a) => Math.sin(rad(a)));
  const pX = useTransform(pp, (p) => O.x + PL * p);
  const qX = useMix([cosA, qp], ([c, p]) => O.x + QL * c * p);
  const qY = useMix([sinA, qp], ([s, p]) => O.y - QL * s * p);
  const rX = useMix([cosA, rp], ([c, p]) => O.x + (PL + QL * c) * p);
  const rY = useMix([sinA, rp], ([s, p]) => O.y - QL * s * p);
  const qfX = useTransform(cosA, (c) => O.x + QL * c);
  const qfY = useTransform(sinA, (s) => O.y - QL * s);
  const rfX = useTransform(cosA, (c) => O.x + PL + QL * c);
  const arcD = useTransform(alpha, (a) => arcPath(O.x, O.y, 30, 0, a));
  const qLx = useTransform(cosA, (c) => 0.5 * QL * c - 12);
  const qLy = useTransform(sinA, (s) => -0.5 * QL * s - 6);
  const rLx = useTransform(cosA, (c) => (PL + QL * c) / 2 + 10);
  const rLy = useTransform(sinA, (s) => -0.5 * QL * s + 18);
  const aLx = useTransform(alpha, (a) => 50 * Math.cos(rad(a / 2)));
  const aLy = useTransform(alpha, (a) => -50 * Math.sin(rad(a / 2)) + 4);

  const knobX = useTransform(alpha, (a) => 50 + (240 * (a - 30)) / 100);
  const fillW = useTransform(knobX, (x) => x - 50);
  const sliderO = useTransform(t, [0.2, 0.25, 0.5, 0.56], [0, 1, 1, 0]);

  const fO = useTransform(t, [0.5, 0.56, 0.72, 0.77], [0, 1, 1, 0]);
  const fY = useTransform(t, [0.5, 0.56], [12, 0]);
  const qzO = useTransform(t, [0.76, 0.8, 0.95, 0.99], [0, 1, 1, 0]);
  const okO = useTransform(t, [0.85, 0.88], [0, 1]);
  const ckP = useTransform(t, [0.87, 0.92], [0, 1]);
  const badgeS = useTransform(t, [0.9, 0.95], [0, 1], { ease: backOut });
  const badgeO = useTransform(t, [0.9, 0.92], [0, 1]);
  const text = { fontSize: 13, fontWeight: 600 } as const;
  const card = { rx: 14, strokeWidth: 2.5, style: { fill: "var(--surface)", stroke: "var(--edge)" } } as const;

  return (
    <div className="reel" ref={ref}>
      <div className="reel-bar">
        {beats.map((b, i) => (
          <span key={b.name} className={`reel-chip${!reduce && i === beat ? " on" : ""}`}>
            <em>{bn(i + 1)}</em>
            {b.name}
          </span>
        ))}
      </div>
      {reduce ? null : (
        <div className="reel-line" aria-hidden>
          <motion.span style={{ scaleX: t }} />
        </div>
      )}
      <div className="reel-stage">
        <Stage w={480} h={290} label="ছবি দেখা থেকে সূত্র ও কুইজ পর্যন্ত একটি পাঠের সংক্ষিপ্ত রূপ">
          <motion.g style={{ opacity: fade }}>
            <line x1={30} y1={O.y} x2={300} y2={O.y} strokeWidth={1.5} style={{ stroke: col.l }} />

            <motion.line x1={O.x + PL} y1={O.y} x2={rfX} y2={qfY} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m, opacity: gp }} />
            <motion.line x1={qfX} y1={qfY} x2={rfX} y2={qfY} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m, opacity: gp }} />
            <motion.path d={arcD} fill="none" strokeWidth={1.5} style={{ stroke: col.f, opacity: qO }} />

            <motion.line x1={O.x} y1={O.y} x2={pX} y2={O.y} strokeWidth={3.5} strokeLinecap="round" markerEnd="url(#ah-p)" style={{ stroke: col.p, opacity: pO }} />
            <motion.line x1={O.x} y1={O.y} x2={qX} y2={qY} strokeWidth={3.5} strokeLinecap="round" markerEnd="url(#ah-q)" style={{ stroke: col.q, opacity: qO }} />
            <motion.line x1={O.x} y1={O.y} x2={rX} y2={rY} strokeWidth={4.5} strokeLinecap="round" markerEnd="url(#ah-r)" style={{ stroke: col.r, opacity: rO }} />
            <circle cx={O.x} cy={O.y} r={4.5} style={{ fill: col.f }} />

            <motion.text x={O.x + PL / 2} y={O.y + 20} textAnchor="middle" {...text} style={{ fill: col.p, opacity: pO }}>
              P
            </motion.text>
            <motion.text x={O.x} y={O.y} textAnchor="end" {...text} style={{ fill: col.q, opacity: qO, x: qLx, y: qLy }}>
              Q
            </motion.text>
            <motion.text x={O.x} y={O.y} textAnchor="start" {...text} style={{ fill: col.r, opacity: rO, x: rLx, y: rLy }}>
              R
            </motion.text>
            <motion.text x={O.x} y={O.y} textAnchor="middle" {...text} style={{ fill: col.f, opacity: qO, x: aLx, y: aLy }}>
              α
            </motion.text>

            <motion.g style={{ opacity: sliderO }}>
              <rect x={50} y={256} width={240} height={8} rx={4} style={{ fill: col.l }} />
              <motion.rect x={50} y={256} height={8} rx={4} width={fillW} style={{ fill: col.r }} />
              <motion.circle cy={260} r={11} cx={knobX} strokeWidth={2.5} style={{ fill: "var(--brand)", stroke: "var(--edge)" }} />
              <text x={50} y={246} fontSize={13} fontWeight={700} style={{ fill: col.m }}>
                কোণ α নাড়াও
              </text>
              <AlphaNum alpha={alpha} />
            </motion.g>

            <motion.g style={{ opacity: fO, y: fY }}>
              <rect x={318} y={30} width={150} height={176} {...card} />
              <text x={393} y={56} textAnchor="middle" fontSize={12} fontWeight={700} style={{ fill: col.m }}>
                সূত্র
              </text>
              <text x={393} y={88} textAnchor="middle" fontSize={16} fontWeight={700} style={{ fill: col.f }}>
                R² = P² + Q²
              </text>
              <text x={393} y={110} textAnchor="middle" fontSize={16} fontWeight={700} style={{ fill: col.f }}>
                + 2PQ cosα
              </text>
              <line x1={338} y1={126} x2={448} y2={126} strokeWidth={1.5} style={{ stroke: col.l }} />
              <text x={393} y={148} textAnchor="middle" fontSize={12} style={{ fill: col.m }}>
                P = ৫, Q = ৪, α = ৭০°
              </text>
              <text x={393} y={186} textAnchor="middle" fontSize={24} fontWeight={800} style={{ fill: col.r }}>
                R = ৭.৪
              </text>
            </motion.g>

            <motion.g style={{ opacity: qzO }}>
              <rect x={318} y={30} width={150} height={176} {...card} />
              <text x={393} y={54} textAnchor="middle" fontSize={12} fontWeight={700} style={{ fill: col.m }}>
                যাচাই
              </text>
              <text x={393} y={76} textAnchor="middle" fontSize={13} fontWeight={600} style={{ fill: col.f }}>
                α = ০° হলে R = ?
              </text>
              <rect x={332} y={88} width={122} height={24} rx={8} strokeWidth={1.5} style={{ fill: "var(--surface-2)", stroke: col.l }} />
              <text x={393} y={105} textAnchor="middle" fontSize={13} style={{ fill: col.f }}>
                P − Q
              </text>
              <rect x={332} y={116} width={122} height={24} rx={8} strokeWidth={1.5} style={{ fill: "var(--surface-2)", stroke: col.l }} />
              <motion.rect x={332} y={116} width={122} height={24} rx={8} strokeWidth={2} style={{ fill: "color-mix(in srgb, var(--good) 22%, transparent)", stroke: "var(--good)", opacity: okO }} />
              <text x={385} y={133} textAnchor="middle" fontSize={13} fontWeight={700} style={{ fill: col.f }}>
                P + Q
              </text>
              <motion.path d="M436 128 l4.5 4.5 8-9.5" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--good)", pathLength: ckP }} />
              <rect x={332} y={144} width={122} height={24} rx={8} strokeWidth={1.5} style={{ fill: "var(--surface-2)", stroke: col.l }} />
              <text x={393} y={161} textAnchor="middle" fontSize={13} style={{ fill: col.f }}>
                √(P² + Q²)
              </text>
              <motion.g style={{ opacity: badgeO, scale: badgeS, transformBox: "fill-box", transformOrigin: "center" }}>
                <rect x={341} y={176} width={104} height={26} rx={13} strokeWidth={2.5} style={{ fill: "var(--spark)", stroke: "var(--edge)" }} />
                <text x={393} y={194} textAnchor="middle" fontSize={13} fontWeight={800} style={{ fill: "#171a2c" }}>
                  বুঝে গেছ!
                </text>
              </motion.g>
            </motion.g>
          </motion.g>
        </Stage>
      </div>
      <div className="reel-cap">
        {reduce ? (
          <ul>
            {beats.map((b, i) => (
              <li key={b.name}>
                <b>{bn(i + 1)}. {b.name}:</b> {b.note}
              </li>
            ))}
          </ul>
        ) : (
          <p key={beat}>
            <b>{beats[beat].name}.</b> {beats[beat].note}
          </p>
        )}
      </div>
    </div>
  );
}
