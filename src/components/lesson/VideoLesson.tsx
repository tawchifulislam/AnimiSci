"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { LightbulbIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import type { LessonStep } from "@/components/ui/Lesson";
import { Tex } from "@/components/ui/Tex";
import { useReducedMotionPref } from "@/lib/motion-pref";
import { bn } from "@/lib/vec";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function VideoLesson({
  steps,
  figure,
  below,
  durations,
}: {
  steps: LessonStep[];
  figure: (step: number) => ReactNode;
  below?: ReactNode;
  durations?: number[];
}) {
  const reduce = useReducedMotionPref();
  const durs = steps.map((_, i) => durations?.[i] ?? 7);
  const starts: number[] = [];
  let acc = 0;
  for (const d of durs) {
    starts.push(acc);
    acc += d;
  }
  const total = acc;
  const last = steps.length - 1;

  const [step, setStep] = useState(0);
  const [clock, setClock] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const t = useRef(0);
  const dragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const prog = useMotionValue(0);
  const thumb = useTransform(prog, (v) => `${v * 100}%`);
  const cur = steps[Math.min(step, last)];

  const stepAt = (time: number) => {
    let idx = 0;
    for (let i = 0; i < starts.length; i++) if (time >= starts[i]) idx = i;
    return idx;
  };

  const sync = () => {
    prog.set(total ? t.current / total : 0);
    setStep(stepAt(t.current));
    setClock(Math.floor(t.current));
  };

  const seekTo = (time: number) => {
    t.current = Math.min(total, Math.max(0, time));
    setEnded(t.current >= total);
    sync();
  };

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = (now - prev) / 1000;
      prev = now;
      t.current = Math.min(total, t.current + dt);
      prog.set(total ? t.current / total : 0);
      setStep(stepAt(t.current));
      setClock(Math.floor(t.current));
      if (t.current >= total) {
        setPlaying(false);
        setEnded(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, total, prog]);

  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<{ step: number }>).detail;
      if (!d || typeof d.step !== "number") return;
      const n = Math.min(Math.max(d.step, 0), last);
      if (reduce) {
        document.getElementById(`lstep-${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      setPlaying(false);
      seekTo(starts[n]);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("lesson-goto", h);
    return () => window.removeEventListener("lesson-goto", h);
  });

  const toggle = () => {
    if (ended) {
      t.current = 0;
      setEnded(false);
      sync();
      setPlaying(true);
      return;
    }
    setPlaying((v) => !v);
  };

  const onBelow = () => {
    setPlaying(false);
    if (step < last) seekTo(starts[last]);
  };

  const chapter = (dir: number) => {
    const c = stepAt(t.current);
    const target = dir > 0 ? Math.min(last, c + 1) : t.current - starts[c] > 1.5 ? c : Math.max(0, c - 1);
    seekTo(starts[target]);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === " " && !(e.target instanceof HTMLButtonElement)) || e.key === "k") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      chapter(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      chapter(-1);
    }
  };

  const seekFromEvent = (e: PointerEvent<HTMLDivElement>) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r) return;
    seekTo(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * total);
  };

  if (reduce) {
    return (
      <div className="steps-list" ref={rootRef}>
        <ol>
          {steps.map((s, i) => (
            <li key={s.title} id={`lstep-${i}`} className="step-card">
              <div className="step-card-head">
                <span className="step-no">{bn(i + 1)}</span>
                <h3>{s.title}</h3>
              </div>
              <div className="player-stage">{figure(i)}</div>
              <p>{s.text}</p>
              {s.tex?.map((tx) => (
                <div key={tx} style={{ overflowX: "auto" }}>
                  <Tex display>{tx}</Tex>
                </div>
              ))}
              {s.note ? (
                <div className="player-note">
                  <LightbulbIcon size={20} weight="duotone" />
                  <span>{s.note}</span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        {below}
      </div>
    );
  }

  return (
    <div className="video-wrap" ref={rootRef} tabIndex={-1} onKeyDown={onKey}>
      <div className="video">
        <div className="vstage" onClick={toggle}>
          {figure(step)}
          {!playing ? (
            <button
              type="button"
              className="vplay"
              aria-label={ended ? "আবার দেখো" : "চালাও"}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              <span>
                <PlayIcon size={34} weight="fill" />
              </span>
            </button>
          ) : null}
        </div>

        <div className="vbar">
          <button type="button" className="vbtn" aria-label={playing ? "থামাও" : ended ? "আবার দেখো" : "চালাও"} onClick={toggle}>
            {playing ? <PauseIcon size={18} weight="fill" /> : <PlayIcon size={18} weight="fill" />}
          </button>
          <div
            ref={trackRef}
            className="vt"
            role="slider"
            tabIndex={0}
            aria-label="ভিডিওর সময়রেখা"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={clock}
            aria-valuetext={`ধাপ ${bn(step + 1)}: ${cur.title}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              dragging.current = true;
              seekFromEvent(e);
            }}
            onPointerMove={(e) => {
              if (dragging.current) seekFromEvent(e);
            }}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          >
            <div className="vt-track" />
            <motion.div className="vt-fill" style={{ scaleX: prog }} />
            {starts.slice(1).map((st) => (
              <span key={st} className="vt-tick" style={{ left: `${(st / total) * 100}%` }} />
            ))}
            <motion.span className="vt-thumb" style={{ left: thumb }} />
          </div>
          <span className="vtime">
            {fmt(clock)} / {fmt(total)}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="vcap"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="vcap-head">
              <span className="step-no">{bn(step + 1)}</span>
              <h3>{cur.title}</h3>
            </div>
            <p>{cur.text}</p>
            {cur.tex?.map((tx, i) => (
              <motion.div
                key={tx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.4, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflowX: "auto" }}
              >
                <Tex display>{tx}</Tex>
              </motion.div>
            ))}
            {cur.note ? (
              <div className="player-note">
                <LightbulbIcon size={20} weight="duotone" />
                <span>{cur.note}</span>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      {below ? <div onPointerDownCapture={onBelow}>{below}</div> : null}
    </div>
  );
}
