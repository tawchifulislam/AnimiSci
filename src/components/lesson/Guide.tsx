"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Tex } from "@/components/ui/Tex";

export type GuideStep = {
  tag?: string;
  title: string;
  text: ReactNode;
  tex?: string[];
  figure?: (phase: number) => ReactNode;
  prompt?: ReactNode;
  locked?: boolean;
  replay?: boolean;
};

export function Guide({
  steps,
  step,
  onStep,
  onFinish,
  finishLabel = "অধ্যায়ে ফিরে যাও",
}: {
  steps: GuideStep[];
  step: number;
  onStep: (n: number) => void;
  onFinish?: () => void;
  finishLabel?: string;
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
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  const next = () => {
    if (step >= last) {
      onFinish?.();
      return;
    }
    onStep(step + 1);
  };

  return (
    <section className="guide" id="guide-top" aria-label="ধাপে ধাপে পাঠ">
      <div className="guide-head">
        <span className="guide-tag">{cur.tag ?? ""}</span>
        <span className="guide-count">
          {step + 1} / {steps.length}
        </span>
      </div>
      <div className="guide-bar" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={step + 1}>
        <i style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>

      {cur.figure ? (
        <div className="guide-stage">
          {cur.figure(phase)}
          {cur.replay ? (
            <button type="button" className="guide-replay" aria-label="আবার দেখাও" onClick={() => setTick((v) => v + 1)}>
              <RotateCcw size={16} aria-hidden />
            </button>
          ) : null}
        </div>
      ) : null}

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
