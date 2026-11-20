"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { Tex } from "@/components/ui/Tex";
import { Arc, Lab, Seg, Stage, Vec, add, col, mid, mk } from "@/components/anim/kit";
import { useReducedMotionPref } from "@/lib/motion-pref";
import { useInView } from "@/lib/use-in-view";

const HOLD = 3600;

const steps = [
  { name: "Two forces", bn: "দুটি বল দুই দিকে কাজ করছে", tint: "#9ccbff", alpha: 60 },
  { name: "Close the shape", bn: "সামান্তরিক আঁকলে কর্ণই লব্ধি", tint: "#ffe27a", alpha: 60 },
  { name: "Change the angle", bn: "কোণ বদলালে লব্ধিও বদলায়", tint: "#8be6bb", alpha: 125 },
  { name: "The formula", bn: "এই ছবি থেকেই লব্ধির সূত্র", tint: "#e9ccff", alpha: 60 },
];

function PeekFigure({ s }: { s: number }) {
  const S = 24;
  const m = mk(90, 188, S);
  const o = m(0, 0);
  const alpha = steps[s].alpha;
  const a = (alpha * Math.PI) / 180;
  const P = 6;
  const Q = 4;
  const pE = m(P, 0);
  const qE = m(Q * Math.cos(a), Q * Math.sin(a));
  const rE = m(P + Q * Math.cos(a), Q * Math.sin(a));
  const showR = s >= 1;
  const kx = 262 + ((alpha - 30) / 120) * 150;

  return (
    <Stage w={440} h={230} label="Preview: adding two vectors">
      <Seg a={qE} b={rE} show={showR} dash c="m" w={1.5} />
      <Seg a={pE} b={rE} show={showR} dash c="m" w={1.5} />
      <Arc o={o} r={30} from={0} to={alpha} c="f" w={1.5} />
      <Vec a={o} b={pE} c="p" w={4} />
      <Vec a={o} b={qE} c="q" w={4} />
      <Vec a={o} b={rE} c="r" w={4.5} show={showR} />
      <Lab p={add(mid(o, pE), 0, 18)} c="p">P</Lab>
      <Lab p={add(mid(o, qE), -12, -2)} c="q" anchor="end">Q</Lab>
      <Lab p={add(mid(o, rE), 8, -12)} c="r" show={showR}>R</Lab>
      <motion.g initial={false} animate={{ opacity: s === 2 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <line x1={262} y1={214} x2={412} y2={214} strokeWidth={5} strokeLinecap="round" style={{ stroke: col.m }} />
        <motion.circle initial={false} cy={214} r={8} animate={{ cx: kx }} transition={{ type: "spring", stiffness: 120, damping: 20 }} style={{ fill: col.r }} />
        <Lab p={{ x: 337, y: 196 }} c="r">α = {alpha}°</Lab>
      </motion.g>
    </Stage>
  );
}

export function LessonPeek() {
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.2);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const run = playing && visible && !reduce;

  useEffect(() => {
    if (!run) return;
    const id = setTimeout(() => setStep((v) => (v + 1) % steps.length), HOLD);
    return () => clearTimeout(id);
  }, [run, step]);

  const pick = (i: number) => {
    setPlaying(false);
    setStep(i);
  };

  return (
    <div className="sx-peek" ref={ref}>
      <ol className="sx-peek-list">
        {steps.map((s, i) => (
          <li key={s.name}>
            <button type="button" className={`sx-peek-step${i === step ? " on" : ""}`} style={{ "--tint": s.tint } as CSSProperties} aria-current={i === step} onClick={() => pick(i)}>
              <span className="sx-peek-no">{i + 1}</span>
              <span className="sx-peek-t">
                <b>{s.name}</b>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="sx-peek-frame">
        <div className="sx-peek-stage">
          <PeekFigure s={step} />
        </div>
        <div className="sx-peek-bar">
          <button type="button" className="vbtn" aria-label={playing ? "Pause preview" : "Play preview"} onClick={() => setPlaying((v) => !v)}>
            {playing ? <PauseIcon size={18} weight="fill" /> : <PlayIcon size={18} weight="fill" />}
          </button>
          <div className="sx-peek-segs">
            {steps.map((s, i) => (
              <button key={s.name} type="button" className={`sx-seg${i < step ? " past" : ""}`} aria-label={s.name} onClick={() => pick(i)}>
                {i === step ? <span key={`${step}-${run}`} className={`sx-seg-fill${run ? "" : " paused"}`} /> : null}
              </button>
            ))}
          </div>
          <span className="vtime">
            {step + 1} / {steps.length}
          </span>
        </div>
        <div className="sx-peek-cap">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <p className="sx-peek-bn">{steps[step].bn}</p>
              {step === 3 ? <Tex display>{"R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}"}</Tex> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
