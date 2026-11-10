"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LightbulbIcon, ListIcon, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "@/components/ui/icons";
import { useReducedMotionPref, useWide } from "@/lib/motion-pref";
import { useInView } from "@/lib/use-in-view";
import { Tex } from "./Tex";
import { bn } from "@/lib/vec";

export type LessonStep = { title: string; text: string; tex?: string[]; note?: string };

type View = "player" | "list";

const HOLD = 8500;

export function Lesson({
  steps,
  figure,
  extra,
  onStep,
}: {
  steps: LessonStep[];
  figure: (step: number) => ReactNode;
  extra?: ReactNode;
  onStep?: (step: number) => void;
}) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [pref, setPref] = useState<View | null>(null);
  const reduce = useReducedMotionPref();
  const wide = useWide();
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef, 0.15);

  const view: View = pref ?? (reduce ? "list" : "player");
  const last = steps.length - 1;
  const cur = steps[Math.min(step, last)];
  const auto = wide && !reduce && !stopped;
  const active = playing || auto;
  const running = view === "player" && visible && active;

  const go = (i: number) => {
    const n = Math.min(Math.max(i, 0), last);
    setStep(n);
    onStep?.(n);
  };

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => {
        if (step >= last) {
          if (wide && !stopped) {
            setStep(0);
            onStep?.(0);
          } else {
            setPlaying(false);
          }
          return;
        }
        setStep(step + 1);
        onStep?.(step + 1);
      },
      step >= last ? HOLD + 1500 : HOLD,
    );
    return () => clearTimeout(id);
  }, [running, step, last, wide, stopped, onStep]);

  const halt = () => {
    setStopped(true);
    setPlaying(false);
  };

  const pick = (i: number) => {
    halt();
    go(i);
  };

  const toggle = () => {
    if (active) {
      halt();
      return;
    }
    if (step >= last) go(0);
    setStopped(false);
    setPlaying(true);
  };

  const choose = (v: View) => {
    halt();
    setPref(v);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pick(step + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pick(step - 1);
    } else if (e.key === " " && !(e.target instanceof HTMLButtonElement)) {
      e.preventDefault();
      toggle();
    }
  };

  if (view === "list") {
    return (
      <div className="player-wrap" ref={rootRef}>
        {reduce ? null : (
          <button type="button" className="link-btn" onClick={() => choose("player")}>
            <PlayIcon size={16} weight="fill" /> ধাপে ধাপে চালাও
          </button>
        )}
        <div className="steps-list">
          {extra}
          <ol>
            {steps.map((s, i) => (
              <li key={s.title} className="step-card">
                <div className="step-card-head">
                  <span className="step-no">{bn(i + 1)}</span>
                  <h3>{s.title}</h3>
                </div>
                <div className="player-stage">{figure(i)}</div>
                <p>{s.text}</p>
                {s.tex?.map((t) => (
                  <div key={t} style={{ overflowX: "auto" }}>
                    <Tex display>{t}</Tex>
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
        </div>
      </div>
    );
  }

  return (
    <div className="player-wrap" ref={rootRef}>
      <div className="player" role="group" aria-label="ধাপে ধাপে অ্যানিমেশন" tabIndex={0} onKeyDown={onKey}>
        <div className="player-main">
          <div className="player-stage">{figure(step)}</div>

          <div className="player-bar">
            <button type="button" className="ctl-text" aria-label="আগের ধাপ" disabled={step === 0} onClick={() => pick(step - 1)}>
              <SkipBackIcon size={16} weight="fill" />
              <span>আগে</span>
            </button>
            <button type="button" className="ctl-text main" onClick={toggle}>
              {active ? <PauseIcon size={18} weight="fill" /> : <PlayIcon size={18} weight="fill" />}
              <span>{active ? "থামাও" : step >= last ? "আবার চালাও" : "নিজে নিজে চালাও"}</span>
            </button>
            <button type="button" className="ctl-text" aria-label="পরের ধাপ" disabled={step === last} onClick={() => pick(step + 1)}>
              <span>পরে</span>
              <SkipForwardIcon size={16} weight="fill" />
            </button>
            <div className="segs-row">
              <div className="segs">
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={`ধাপ ${bn(i + 1)}`}
                    aria-current={i === step}
                    onClick={() => pick(i)}
                    className={`seg${i === step ? " on" : i < step ? " past" : ""}`}
                  />
                ))}
              </div>
              <span className="step-count">
                {bn(step + 1)}/{bn(steps.length)}
              </span>
            </div>
          </div>

          <p className="player-help">
            {active
              ? "ধাপগুলো নিজে নিজে বদলাচ্ছে। নিজের গতিতে এগোতে 'থামাও' চাপো।"
              : "'নিজে নিজে চালাও' চাপলে ধাপগুলো একটার পর একটা চলবে। চাইলে 'আগে' ও 'পরে' দিয়ে হাতে এগোও।"}
          </p>

          {extra ? <div onPointerDownCapture={halt}>{extra}</div> : null}

          <button type="button" className="link-btn" onClick={() => choose("list")}>
            <ListIcon size={16} weight="bold" /> সব ধাপ একসাথে পড়ো
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="player-panel"
          >
            <div className="player-step">
              <span>
                ধাপ {bn(step + 1)} / {bn(steps.length)}
              </span>
              <span className="player-hint">← → চেপেও এগোনো যায়</span>
            </div>
            <h3>{cur.title}</h3>
            <p>{cur.text}</p>
            {cur.tex?.map((t, i) => (
              <motion.div
                key={t}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.4, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflowX: "auto" }}
              >
                <Tex display>{t}</Tex>
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
    </div>
  );
}
