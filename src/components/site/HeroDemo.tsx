"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { Slider } from "@/components/ui/Slider";
import { Stage, col } from "@/components/anim/kit";
import { useReducedMotionPref, useWide } from "@/lib/motion-pref";
import { useInView } from "@/lib/use-in-view";
import { arcPath, f1, rad, resultant } from "@/lib/vec";

const O = { x: 110, y: 190 };
const PL = 120;
const QL = 96;

function AlphaSlider({ alpha, onUser }: { alpha: MotionValue<number>; onUser: (v: number) => void }) {
  const [v, setV] = useState(Math.round(alpha.get()));
  useMotionValueEvent(alpha, "change", (a) => setV(Math.round(a)));
  return <Slider label="দুই ঠেলার মাঝের কোণ α" value={v} min={0} max={180} suffix="°" onChange={onUser} />;
}

function Readout({ alpha }: { alpha: MotionValue<number> }) {
  const [v, setV] = useState(Math.round(alpha.get()));
  useMotionValueEvent(alpha, "change", (a) => setV(Math.round(a)));
  return <b>{f1(resultant(5, 4, v).r)}</b>;
}

export function HeroDemo() {
  const alpha = useMotionValue(70);
  const [playing, setPlaying] = useState(false);
  const [stopped, setStopped] = useState(false);
  const reduce = useReducedMotionPref();
  const wide = useWide();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.3);
  const active = playing || (wide && !stopped);
  const running = visible && !reduce && active;

  useEffect(() => {
    if (!running) return;
    const c = animate(alpha, [alpha.get(), 160, 20, 70], { duration: 20, ease: "easeInOut", repeat: Infinity });
    return () => c.stop();
  }, [running, alpha]);

  const toggle = () => {
    if (active) {
      setStopped(true);
      setPlaying(false);
    } else {
      setStopped(false);
      setPlaying(true);
    }
  };

  const onUser = (v: number) => {
    setStopped(true);
    setPlaying(false);
    alpha.set(v);
  };

  const cosA = useTransform(alpha, (a) => Math.cos(rad(a)));
  const sinA = useTransform(alpha, (a) => Math.sin(rad(a)));
  const qX = useTransform(cosA, (c) => O.x + QL * c);
  const qY = useTransform(sinA, (s) => O.y - QL * s);
  const rX = useTransform(cosA, (c) => O.x + PL + QL * c);
  const arcD = useTransform(alpha, (a) => arcPath(O.x, O.y, 26, 0, a));
  const qLx = useTransform(cosA, (c) => O.x + 0.5 * QL * c - 10);
  const qLy = useTransform(sinA, (s) => O.y - 0.5 * QL * s - 4);
  const rLx = useTransform(cosA, (c) => O.x + (PL + QL * c) / 2 + 6);
  const rLy = useTransform(sinA, (s) => O.y - 0.5 * QL * s + 18);
  const aLx = useTransform(alpha, (a) => O.x + 44 * Math.cos(rad(a / 2)));
  const aLy = useTransform(alpha, (a) => O.y - 44 * Math.sin(rad(a / 2)));
  const text = { fontSize: 13, fontWeight: 600 } as const;

  return (
    <div className="demo" ref={ref}>
      <div className="demo-bar">
        <b>ভেক্টরের যোগ</b>
        {reduce ? null : (
          <button type="button" className="tiny-btn" aria-label={active ? "থামাও" : "চালাও"} onClick={toggle}>
            {active ? <PauseIcon size={14} weight="fill" /> : <PlayIcon size={14} weight="fill" />}
          </button>
        )}
      </div>
      <div className="demo-body">
        <div className="demo-stage">
          <Stage w={360} h={230} label="দুটি ভেক্টর যোগ করলে লব্ধি কেমন হয়">
            <motion.line x1={O.x + PL} y1={O.y} x2={rX} y2={qY} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
            <motion.line x1={qX} y1={qY} x2={rX} y2={qY} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
            <motion.path d={arcD} fill="none" strokeWidth={1.5} style={{ stroke: col.f }} />
            <line x1={O.x} y1={O.y} x2={O.x + PL} y2={O.y} strokeWidth={3} strokeLinecap="round" markerEnd="url(#ah-p)" style={{ stroke: col.p }} />
            <motion.line x1={O.x} y1={O.y} x2={qX} y2={qY} strokeWidth={3} strokeLinecap="round" markerEnd="url(#ah-q)" style={{ stroke: col.q }} />
            <motion.line x1={O.x} y1={O.y} x2={rX} y2={qY} strokeWidth={4} strokeLinecap="round" markerEnd="url(#ah-r)" style={{ stroke: col.r }} />
            <circle cx={O.x} cy={O.y} r={4} style={{ fill: col.f }} />
            <text x={O.x + PL / 2} y={O.y + 18} textAnchor="middle" {...text} style={{ fill: col.p }}>
              P
            </text>
            <motion.text x={0} y={0} textAnchor="end" {...text} style={{ fill: col.q, x: qLx, y: qLy }}>
              Q
            </motion.text>
            <motion.text x={0} y={0} textAnchor="start" {...text} style={{ fill: col.r, x: rLx, y: rLy }}>
              R
            </motion.text>
            <motion.text x={0} y={0} textAnchor="middle" {...text} style={{ fill: col.f, x: aLx, y: aLy }}>
              α
            </motion.text>
          </Stage>
        </div>
        <AlphaSlider alpha={alpha} onUser={onUser} />
        <p className="demo-out">
          <span>লব্ধি R</span>
          <Readout alpha={alpha} />
        </p>
      </div>
    </div>
  );
}
