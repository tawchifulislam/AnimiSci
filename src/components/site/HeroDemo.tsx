"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { Slider } from "@/components/ui/Slider";
import { Stage, col, mk, pol } from "@/components/anim/kit";
import { useReducedMotionPref, useWide } from "@/lib/motion-pref";
import { useInView } from "@/lib/use-in-view";
import { arcPath, f1, rad, resultant } from "@/lib/vec";

export function HeroDemo() {
  const [alpha, setAlpha] = useState(70);
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
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      setAlpha(Math.round(90 + 85 * Math.sin((t - t0) / 1300 - 0.24)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const toggle = () => {
    if (active) {
      setStopped(true);
      setPlaying(false);
    } else {
      setStopped(false);
      setPlaying(true);
    }
  };

  const drag = (v: number) => {
    setStopped(true);
    setPlaying(false);
    setAlpha(v);
  };

  const p = 5;
  const q = 4;
  const { r } = resultant(p, q, alpha);
  const m = mk(110, 190, 24);
  const o = m(0, 0);
  const pE = m(p, 0);
  const qE = m(q * Math.cos(rad(alpha)), q * Math.sin(rad(alpha)));
  const rE = m(p + q * Math.cos(rad(alpha)), q * Math.sin(rad(alpha)));
  const al = pol(o, alpha / 2, 44);
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
            <line x1={pE.x} y1={pE.y} x2={rE.x} y2={rE.y} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
            <line x1={qE.x} y1={qE.y} x2={rE.x} y2={rE.y} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
            <path d={arcPath(o.x, o.y, 26, 0, alpha)} fill="none" strokeWidth={1.5} style={{ stroke: col.f }} />
            <line x1={o.x} y1={o.y} x2={pE.x} y2={pE.y} strokeWidth={3} strokeLinecap="round" markerEnd="url(#ah-p)" style={{ stroke: col.p }} />
            <line x1={o.x} y1={o.y} x2={qE.x} y2={qE.y} strokeWidth={3} strokeLinecap="round" markerEnd="url(#ah-q)" style={{ stroke: col.q }} />
            <line x1={o.x} y1={o.y} x2={rE.x} y2={rE.y} strokeWidth={4} strokeLinecap="round" markerEnd="url(#ah-r)" style={{ stroke: col.r }} />
            <circle cx={o.x} cy={o.y} r={4} style={{ fill: col.f }} />
            <text x={(o.x + pE.x) / 2} y={o.y + 18} textAnchor="middle" {...text} style={{ fill: col.p }}>
              P
            </text>
            <text x={(o.x + qE.x) / 2 - 10} y={(o.y + qE.y) / 2 - 4} textAnchor="end" {...text} style={{ fill: col.q }}>
              Q
            </text>
            <text x={(o.x + rE.x) / 2 + 6} y={(o.y + rE.y) / 2 + 18} textAnchor="start" {...text} style={{ fill: col.r }}>
              R
            </text>
            <text x={al.x} y={al.y} textAnchor="middle" {...text} style={{ fill: col.f }}>
              α
            </text>
          </Stage>
        </div>
        <Slider label="দুই ঠেলার মাঝের কোণ α" value={alpha} min={0} max={180} suffix="°" onChange={drag} />
        <p className="demo-out">
          <span>লব্ধি R</span>
          <b>{f1(r)}</b>
        </p>
      </div>
    </div>
  );
}
