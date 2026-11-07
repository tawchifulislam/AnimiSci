"use client";

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LightbulbIcon, PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "@/components/ui/icons";
import { Tex } from "./Tex";
import { bn } from "@/lib/vec";

export type LessonStep = { title: string; text: string; tex?: string[]; note?: string };

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
  const [auto, setAuto] = useState(false);
  const reduce = useReducedMotion();
  const last = steps.length - 1;
  const cur = steps[Math.min(step, last)];

  const move = (i: number) => {
    const n = Math.min(Math.max(i, 0), last);
    setStep(n);
    onStep?.(n);
  };

  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => {
      if (step >= last) {
        setAuto(false);
        return;
      }
      setStep(step + 1);
      onStep?.(step + 1);
    }, 6500);
    return () => clearTimeout(id);
  }, [auto, step, last, onStep]);

  const pick = (i: number) => {
    setAuto(false);
    move(i);
  };

  const toggleAuto = () => {
    if (!auto && step >= last) move(0);
    setAuto((v) => !v);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pick(step + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pick(step - 1);
    }
  };

  return (
    <div className="player" role="group" aria-label="ধাপে ধাপে অ্যানিমেশন" tabIndex={-1} onKeyDown={onKey}>
      <div className="player-main">
        <div className="player-stage">{figure(step)}</div>

        <div className="player-controls">
          <div className="ctl-row">
            <button type="button" className="ctl" aria-label="আগের ধাপ" disabled={step === 0} onClick={() => pick(step - 1)}>
              <SkipBackIcon size={20} weight="fill" />
            </button>
            <button type="button" className="ctl main" aria-label={auto ? "থামাও" : "নিজে নিজে চালাও"} onClick={toggleAuto}>
              {auto ? <PauseIcon size={20} weight="fill" /> : <PlayIcon size={20} weight="fill" />}
            </button>
            <button type="button" className="ctl" aria-label="পরের ধাপ" disabled={step === last} onClick={() => pick(step + 1)}>
              <SkipForwardIcon size={20} weight="fill" />
            </button>
          </div>
          <div className="dots">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`ধাপ ${bn(i + 1)}`}
                aria-current={i === step}
                onClick={() => pick(i)}
                className={`dot${i === step ? " on" : i < step ? " past" : ""}`}
              />
            ))}
          </div>
        </div>

        {extra}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="player-panel"
        >
          <div className="player-step">
            <span>
              ধাপ {bn(step + 1)} / {bn(steps.length)}
            </span>
            <span>← → চেপেও এগোনো যায়</span>
          </div>
          <h3>{cur.title}</h3>
          <p>{cur.text}</p>
          {cur.tex?.map((t, i) => (
            <motion.div
              key={t}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.45, duration: 0.35 }}
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
  );
}
