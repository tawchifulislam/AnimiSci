"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Tex } from "@/components/ui/Tex";

export type GuideStep = {
  title: string;
  text: ReactNode;
  tex?: string[];
  figure: (phase: number) => ReactNode;
  prompt?: ReactNode;
  locked?: boolean;
  replay?: boolean;
};

export function Guide({
  steps,
  step,
  onStep,
  finishLabel = "সূত্রগুলো দেখো",
  finishTarget = "sec-2",
}: {
  steps: GuideStep[];
  step: number;
  onStep: (n: number) => void;
  finishLabel?: string;
  finishTarget?: string;
}) {
  const [phase, setPhase] = useState(0);
  const [tick, setTick] = useState(0);
  const last = steps.length - 1;
  const cur = steps[Math.min(step, last)];

  useEffect(() => {
    setPhase(0);
    const id = setTimeout(() => setPhase(1), 450);
    return () => clearTimeout(id);
  }, [step, tick]);

  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<{ step: number }>).detail;
      if (d && typeof d.step === "number") onStep(Math.min(Math.max(d.step, 0), last));
      document.getElementById("guide-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("lesson-goto", h);
    return () => window.removeEventListener("lesson-goto", h);
  });

  const next = () => {
    if (step >= last) {
      document.getElementById(finishTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    onStep(step + 1);
  };

  return (
    <section className="guide" id="guide-top" aria-label="ধাপে ধাপে পাঠ">
      <div className="guide-head">
        <div className="guide-dots">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`guide-dot${i === step ? " on" : i < step ? " past" : ""}`}
              aria-label={`ধাপ ${i + 1}: ${s.title}`}
              disabled={i > step}
              onClick={() => onStep(i)}
            />
          ))}
        </div>
        <span className="guide-count">
          {step + 1} / {steps.length}
        </span>
      </div>

      <div className="guide-stage">
        {cur.figure(phase)}
        {cur.replay ? (
          <button type="button" className="guide-replay" aria-label="আবার দেখাও" onClick={() => setTick((v) => v + 1)}>
            <RotateCcw size={16} aria-hidden />
          </button>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} className="guide-body" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <h3>{cur.title}</h3>
          <p>{cur.text}</p>
          {cur.tex?.map((t) => (
            <div key={t} className="guide-tex">
              <Tex display>{t}</Tex>
            </div>
          ))}
          {cur.prompt}
        </motion.div>
      </AnimatePresence>

      <div className="guide-nav">
        <button type="button" className="btn btn-ghost" disabled={step === 0} onClick={() => onStep(step - 1)} aria-label="আগের ধাপ">
          <ArrowLeft size={18} aria-hidden />
        </button>
        <button type="button" className="btn btn-primary guide-next" disabled={Boolean(cur.locked)} onClick={next}>
          {cur.locked ? "আগে একটা উত্তর বেছে নাও" : step >= last ? finishLabel : "পরের ধাপ"}
          {!cur.locked ? <ArrowRight size={18} aria-hidden /> : null}
        </button>
      </div>
    </section>
  );
}
