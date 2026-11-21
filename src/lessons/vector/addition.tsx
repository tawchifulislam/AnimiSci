"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Guide, type GuideStep } from "@/components/lesson/Guide";
import { Arc, Dot, Lab, Seg, Square, Stage, Vec, add, col, mid, pol, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "দুটি ভেক্টর যোগ করলে লব্ধির মান ও দিক কীভাবে বের হয়, সেটা ছবি এঁকে নিজে প্রমাণ করতে পারবে এবং সূত্রটা কেন এমন, তা বুঝবে।",
  hook: "দুই বন্ধু একটা ভারী বাক্সকে আলাদা আলাদা দিকে ঠেলছে। বাক্সটা শেষে কোন দিকে কতটা জোরে যাবে?",
  formulas: [
    { tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}", meaning: "লব্ধির মান। α হলো দুই ভেক্টরের মাঝের কোণ।", step: 9 },
    { tex: "\\theta=\\tan^{-1}\\dfrac{Q\\sin\\alpha}{P+Q\\cos\\alpha}", meaning: "লব্ধি P-এর সাথে কত কোণে আছে।", step: 10 },
    { tex: "\\gamma=\\tan^{-1}\\dfrac{P\\sin\\alpha}{Q+P\\cos\\alpha}", meaning: "লব্ধি Q-এর সাথে কত কোণে আছে। আবার γ = α − θ।" },
    { tex: "\\alpha=0^\\circ:\\ R=P+Q", meaning: "একই দিকে হলে সাধারণ যোগ।", step: 7 },
    { tex: "\\alpha=90^\\circ:\\ R=\\sqrt{P^2+Q^2}", meaning: "লম্ব হলে পিথাগোরাস।", step: 7 },
    { tex: "\\alpha=180^\\circ:\\ R=|P-Q|", meaning: "উল্টো দিকে হলে বিয়োগ।", step: 7 },
  ],
  example: {
    problem: "3 N ও 4 N মানের দুটি বল পরস্পর লম্বভাবে একটি বস্তুর ওপর কাজ করছে। লব্ধি বলের মান ও দিক নির্ণয় করো।",
    steps: [
      { text: "দেওয়া আছে P = 3, Q = 4, α = 90°। আমরা জানি cos 90° = 0 এবং sin 90° = 1।" },
      { text: "লব্ধির মান বের করি।", tex: "R=\\sqrt{3^2+4^2+2\\cdot3\\cdot4\\cdot0}=\\sqrt{25}=5\\ \\text{N}" },
      { text: "দিক বের করি (P-এর সাপেক্ষে)।", tex: "\\theta=\\tan^{-1}\\frac{4\\times1}{3+4\\times0}=\\tan^{-1}\\frac{4}{3}=53.1^\\circ" },
      { text: "উত্তর: লব্ধি 5 N, যা 3 N বলের সাথে 53.1° কোণ করে।" },
    ],
  },
  mistakes: [
    "দুই ভেক্টরের মান শুধু যোগ করে ফেলা। দিক আলাদা হলে R < P + Q হয়।",
    "α ভুল নেওয়া। α হলো দুই ভেক্টরের লেজ একই বিন্দুতে রেখে তাদের মাঝের কোণ।",
    "θ কার সাপেক্ষে সেটা গুলিয়ে ফেলা। θ সূত্রে লব বসে Q sinα, তাই θ হলো P-এর সাথে কোণ।",
    "ক্যালকুলেটর রেডিয়ান মোডে রেখে cos, sin বের করা।",
  ],
  recap: [
    "ত্রিভুজ সূত্র: দ্বিতীয় ভেক্টরের লেজ প্রথমটির মাথায় বসাও। শুরু থেকে শেষ মাথা পর্যন্ত তীরটাই লব্ধি।",
    "সামান্তরিক সূত্র: দুই ভেক্টরকে একই বিন্দু থেকে এঁকে সামান্তরিক পূর্ণ করো। কর্ণই লব্ধি।",
    "মান: R = √(P² + Q² + 2PQ cosα)। দিক: tanθ = Q sinα ÷ (P + Q cosα)।",
    "α = 0° হলে R সবচেয়ে বড় (P + Q)। α = 180° হলে সবচেয়ে ছোট (|P − Q|)।",
  ],
  think: {
    scenario: "তুমি আর তোমার বন্ধু একটা ভারী বাক্স ঠেলছ। তুমি ঠেলছ পূর্ব দিকে 6 N বলে। বন্ধু ঠেলছে 4 N বলে, তোমার দিকের সাথে 60° কোণে।",
    points: [
      "দুজনে ঠিক একই দিকে ঠেললে মোট বল কত হতো? এখন কোণ থাকায় মোট বল তার চেয়ে বেশি হবে না কম, আর কেন?",
      "বন্ধু যদি ঠিক উল্টো দিক থেকে (180° কোণে) ঠেলত, তাহলে বাক্সের কী হতো?",
      "কোন অবস্থায় বাক্স একেবারেই নড়ত না? দুই বলের মান আর মাঝের কোণ কেমন হতে হবে?",
      "লব্ধি বড় বলের দিকে বেশি হেলে থাকবে, না ছোট বলের দিকে? কেন?",
    ],
    hint: "ধাপ 7-এর স্লাইডারে α-কে 0° আর 180° এ নিয়ে যাও। তারপর P = Q ধরে α = 180° দিয়ে লাল তীরের কী হয়, কল্পনা করো।",
    traps: [
      "লব্ধির মান সব সময় P + Q।",
      "α হলো যেকোনো দুই তীরের মাঝের কোণ, তীরের লেজ কোথায় আছে তাতে কিছু আসে না।",
      "θ হলো লব্ধি Q-এর সাথে যে কোণ করে তার মান।",
      "ক্যালকুলেটর রেডিয়ান মোডে থাকলেও cos আর sin-এর মান ঠিকই আসে।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "3 N ও 4 N বল পরস্পর লম্ব। লব্ধির মান এবং P-এর সাথে লব্ধির কোণ বের করো।",
      hint: "α = 90° হলে cos 90° = 0 আর sin 90° = 1।",
      steps: [
        { text: "লব্ধির মান বের করি।", tex: "R=\\sqrt{3^2+4^2+2\\cdot3\\cdot4\\cdot0}=\\sqrt{25}=5\\ \\text{N}" },
        { text: "দিক বের করি (3 N বলের সাপেক্ষে)।", tex: "\\theta=\\tan^{-1}\\frac{4\\times1}{3+4\\times0}=\\tan^{-1}\\frac{4}{3}=53.1^\\circ" },
        { text: "উত্তর: লব্ধি 5 N, যা 3 N বলের সাথে 53.1° কোণ করে।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "দুটি বল 5 N ও 8 N, তাদের মাঝের কোণ 60°। লব্ধির মান ও P-এর সাথে কোণ বের করো।",
      hint: "cos 60° = 0.5 এবং sin 60° = 0.866।",
      steps: [
        { text: "সূত্র লিখি। P = 5, Q = 8, α = 60°।", tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}" },
        { text: "সংখ্যা বসাই।", tex: "R=\\sqrt{25+64+2\\times5\\times8\\times0.5}=\\sqrt{129}=11.4\\ \\text{N}" },
        { text: "দিক বের করি (5 N বলের সাপেক্ষে)।", tex: "\\theta=\\tan^{-1}\\frac{8\\sin60^\\circ}{5+8\\cos60^\\circ}=\\tan^{-1}\\frac{6.93}{9}=37.6^\\circ" },
        { text: "যাচাই: লব্ধি অবশ্যই |P − Q| = 3 আর P + Q = 13-এর মাঝে থাকবে। 3 < 11.4 < 13, তাই উত্তর ঠিক আছে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "দুটি সমান বল F পরস্পর α কোণে আছে। লব্ধি ঠিক F-এর সমান হলে α কত?",
      hint: "লব্ধির সূত্রে P = Q = F বসাও, তারপর R = F ধরো।",
      steps: [
        { text: "সূত্রে P = Q = F বসাই।", tex: "R^2=F^2+F^2+2F^2\\cos\\alpha=2F^2(1+\\cos\\alpha)" },
        { text: "R = F দেওয়া আছে, তাই R² = F²।", tex: "F^2=2F^2(1+\\cos\\alpha)\\Rightarrow1+\\cos\\alpha=\\frac{1}{2}" },
        { text: "cosα বের করি।", tex: "\\cos\\alpha=-\\frac{1}{2}\\Rightarrow\\alpha=120^\\circ" },
        { text: "উত্তর: α = 120°। দুই সমান বলের মাঝের কোণ 120° হলে লব্ধি প্রতিটি বলের সমান হয়।" },
      ],
    },
  ],
  concepts: [
    "কোণ α বাড়ালে লব্ধি কমে কেন? দুই বল তখন পরস্পরকে কতটা সাহায্য করে আর কতটা কাটে, সেটা ভেবে বলো।",
    "লব্ধি কি কখনো দুই বলের ছোটটির চেয়েও ছোট হতে পারে? পারলে কখন, না পারলে কেন?",
    "দুই বলের মান সমান হলে লব্ধি কোন দিকে থাকে? ছবি না এঁকে যুক্তি দিয়ে বলো।",
  ],
  quiz: [
    { q: "দুটি ভেক্টর একই দিকে (α = 0°) হলে লব্ধি কত?", options: ["P − Q", "P + Q", "√(P² + Q²)", "শূন্য"], answer: 1, why: "cos 0° = 1, তাই R = √((P + Q)²) = P + Q। √(P² + Q²) হতো লম্ব হলে।" },
    { q: "3 N ও 4 N বল পরস্পর লম্ব। লব্ধি কত?", options: ["7 N", "1 N", "5 N", "12 N"], answer: 2, why: "α = 90° হলে R = √(3² + 4²) = 5 N। 7 N হলো সরাসরি যোগ করার ভুল।" },
    { q: "P = Q এবং α = 120° হলে লব্ধি R কত?", options: ["2P", "P", "P/2", "শূন্য"], answer: 1, why: "R² = 2P² + 2P² cos 120° = 2P² − P² = P², তাই R = P।" },
    { q: "α কত হলে লব্ধি সবচেয়ে ছোট হয়?", options: ["0°", "90°", "120°", "180°"], answer: 3, why: "180° এ দুই ভেক্টর উল্টো দিকে, একে অপরকে কাটে। R = |P − Q|। 0° এ লব্ধি সবচেয়ে বড়।" },
    { q: "5 N ও 12 N বল পরস্পর লম্বভাবে কাজ করছে। লব্ধি কত?", options: ["17 N", "7 N", "13 N", "60 N"], answer: 2, why: "√(5² + 12²) = √169 = 13 N। 17 N হলো মান সরাসরি যোগ করার ভুল ফল।" },
  ],
};

const P = 6;
const Q = 4;
const S = 20;
const pt = (x: number, y: number): Pt => ({ x, y });
const tone = { p: col.p, q: col.q, r: col.r };

function C({ k, children }: { k: "p" | "q" | "r"; children: ReactNode }) {
  return <b style={{ color: tone[k], fontWeight: 800 }}>{children}</b>;
}

function Crate({ x, y, dx = 0, dy = 0 }: { x: number; y: number; dx?: number; dy?: number }) {
  return (
    <motion.g initial={false} animate={{ x: dx, y: dy }} transition={{ type: "spring", stiffness: 50, damping: 16 }}>
      <rect x={x - 23} y={y - 23} width={46} height={46} rx={8} strokeWidth={2.5} style={{ fill: "#d9a35f", stroke: "#171a2c" }} />
      <path d={`M${x - 23} ${y - 7}H${x + 23}M${x - 23} ${y + 7}H${x + 23}`} strokeWidth={1.5} opacity={0.35} style={{ stroke: "#171a2c" }} />
    </motion.g>
  );
}

function Puller({ x, y, color, face = 1 }: { x: number; y: number; color: string; face?: 1 | -1 }) {
  return (
    <g strokeWidth={3} strokeLinecap="round" style={{ stroke: color, fill: "none" }}>
      <circle cx={x} cy={y - 14} r={6} style={{ fill: color }} />
      <line x1={x} y1={y - 7} x2={x} y2={y + 9} />
      <line x1={x} y1={y + 9} x2={x - 6} y2={y + 21} />
      <line x1={x} y1={y + 9} x2={x + 6} y2={y + 21} />
      <line x1={x} y1={y - 3} x2={x - face * 12} y2={y + 2} />
    </g>
  );
}

function Choices({ options, answer, picked, onPick, explain }: { options: string[]; answer: number; picked: number | undefined; onPick: (i: number) => void; explain: string }) {
  const shown = picked !== undefined;
  return (
    <div className="guide-opts">
      {options.map((o, i) => {
        const cls = shown && i === answer ? " ok" : shown && picked === i ? " bad" : "";
        return (
          <button key={o} type="button" className={`guide-opt${cls}`} disabled={shown} onClick={() => onPick(i)}>
            {o}
          </button>
        );
      })}
      {shown ? (
        <p className="guide-explain" aria-live="polite">
          {picked === answer ? <Check size={18} aria-hidden /> : <X size={18} aria-hidden />}
          <span>
            <b>{picked === answer ? "ঠিক। " : "ঠিক উত্তরটা দেখো। "}</b>
            {explain}
          </span>
        </p>
      ) : null}
    </div>
  );
}

function TriFigure({ level, phase }: { level: 0 | 1 | 2; phase: number }) {
  const O = pt(70, 205);
  const k = 22;
  const pT = pt(O.x + P * k, O.y);
  const F = pt(O.x + (P + Q * 0.5) * k, O.y);
  const T = pt(F.x, O.y - Q * Math.sin(rad(60)) * k);
  const on = phase === 1;
  return (
    <Stage w={440} h={260} label="লব্ধির সূত্র বের করার সমকোণী ত্রিভুজ">
      <Vec a={O} b={pT} c="p" w={4} />
      <Vec a={pT} b={T} c="q" w={4} />
      <Vec a={O} b={T} c="r" w={5} />
      <Arc o={pT} r={26} from={0} to={60} c="f" w={1.5} />
      <Lab p={pol(pT, 30, 44)}>α</Lab>
      <Seg a={pT} b={F} dash c="u" w={2.5} show={on} />
      <Seg a={F} b={T} dash c="u" w={2.5} show={on} />
      <Square at={F} d1={{ x: -1, y: 0 }} d2={{ x: 0, y: -1 }} show={on} />
      <Lab p={add(mid(pT, F), 0, 20)} c="u" show={on}>{level === 2 ? "2" : "Q cosα"}</Lab>
      <Lab p={add(mid(F, T), 10, 0)} c="u" anchor="start" show={on}>{level === 2 ? "3.46" : "Q sinα"}</Lab>
      <Seg a={pt(O.x, 232)} b={pt(F.x, 232)} c="m" w={2} show={level >= 1} />
      <Lab p={pt((O.x + F.x) / 2, 250)} c="m" show={level >= 1}>{level === 2 ? "ভূমি = 8" : "ভূমি = P + Q cosα"}</Lab>
      <Lab p={add(mid(O, T), -10, -12)} c="r" anchor="end">{level === 2 ? "R = 8.72 N" : "R"}</Lab>
      <Arc o={O} r={36} from={0} to={23.4} c="f" w={1.5} show={level === 2} />
      <Lab p={pol(O, 11, 56)} show={level === 2}>θ = 23.4°</Lab>
      <Dot p={O} />
    </Stage>
  );
}

export default function Anim() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [alpha, setAlpha] = useState(60);

  const pick = (i: number) => (v: number) => setPicks((p) => ({ ...p, [i]: v }));
  const aR = rad(alpha);
  const rv = Math.sqrt(P * P + Q * Q + 2 * P * Q * Math.cos(aR));
  const th = (Math.atan2(Q * Math.sin(aR), P + Q * Math.cos(aR)) * 180) / Math.PI;
  const insight =
    alpha <= 3
      ? "α = 0°: দুই টান একই দিকে, তাই R সবচেয়ে বড়। 6 + 4 = 10 N।"
      : alpha >= 177
        ? "α = 180°: দুই টান উল্টো দিকে, তাই R সবচেয়ে ছোট। 6 − 4 = 2 N।"
        : Math.abs(alpha - 90) <= 2
          ? "α = 90°: R = √(6² + 4²) = 7.21 N।"
          : "α বাড়ালে R কমে। 0° এ 10 N, 180° এ 2 N।";

  const O1 = pt(80, 205);
  const k1 = 22;
  const pTip = pt(O1.x + P * k1, O1.y);
  const qOrigin = pt(O1.x + Q * Math.cos(rad(60)) * k1, O1.y - Q * Math.sin(rad(60)) * k1);
  const rTip = pt(pTip.x + Q * Math.cos(rad(60)) * k1, qOrigin.y);

  const O7 = pt(120, 215);
  const pT7 = pt(O7.x + P * S, O7.y);
  const qT7 = pt(pT7.x + Q * Math.cos(aR) * S, O7.y - Q * Math.sin(aR) * S);

  const steps: GuideStep[] = [
    {
      title: "একই দিকে টানলে",
      text: (
        <>
          <C k="p">নীল</C> জন 6 N আর <C k="q">সবুজ</C> জন 4 N বলে বাক্সটাকে পূর্ব দিকে টানছে। মোট টান কত?
        </>
      ),
      locked: picks[0] === undefined,
      prompt: <Choices options={["2 N", "10 N", "24 N"]} answer={1} picked={picks[0]} onPick={pick(0)} explain="একই দিকে টানলে বল সরাসরি যোগ হয়: 6 + 4 = 10 N।" />,
      figure: () => {
        const done = picks[0] !== undefined;
        const bx = 100;
        const by = 140;
        const x0 = bx + 26;
        return (
          <Stage w={440} h={260} label="দুজন বাক্সটাকে একই দিকে টানছে">
            <Crate x={bx} y={by} />
            <Vec a={pt(x0, by - 14)} b={pt(x0 + P * S, by - 14)} c="p" w={4} />
            <Vec a={pt(x0, by + 14)} b={pt(x0 + Q * S, by + 14)} c="q" w={4} />
            <Puller x={x0 + P * S + 22} y={by - 14} color={col.p} />
            <Puller x={x0 + Q * S + 22} y={by + 14} color={col.q} />
            <Lab p={pt(x0 + (P * S) / 2, by - 34)} c="p">P = 6 N</Lab>
            <Lab p={pt(x0 + (Q * S) / 2, by + 44)} c="q">Q = 4 N</Lab>
            <Vec a={pt(x0, by + 80)} b={pt(x0 + (done ? (P + Q) * S : 0), by + 80)} c="r" w={5} show={done} />
            <Lab p={pt(x0 + ((P + Q) * S) / 2, by + 102)} c="r" show={done}>R = 10 N</Lab>
          </Stage>
        );
      },
    },
    {
      title: "উল্টো দিকে টানলে",
      text: (
        <>
          এবার <C k="q">সবুজ</C> জন উল্টো দিকে, পশ্চিমে, 4 N বলে টানছে। বাক্স কোন দিকে কতটা জোরে যাবে?
        </>
      ),
      locked: picks[1] === undefined,
      prompt: <Choices options={["10 N, পূর্বে", "2 N, পূর্বে", "2 N, পশ্চিমে"]} answer={1} picked={picks[1]} onPick={pick(1)} explain="উল্টো দিকের টান একে অপরকে কাটে: 6 − 4 = 2 N। বড় টানের দিকে, অর্থাৎ পূর্বে।" />,
      figure: () => {
        const done = picks[1] !== undefined;
        const bx = 210;
        const by = 130;
        return (
          <Stage w={440} h={260} label="দুজন উল্টো দিকে টানছে">
            <Crate x={bx} y={by} dx={done ? 16 : 0} />
            <Vec a={pt(bx + 26, by - 14)} b={pt(bx + 26 + P * S, by - 14)} c="p" w={4} />
            <Vec a={pt(bx - 26, by + 14)} b={pt(bx - 26 - Q * S, by + 14)} c="q" w={4} />
            <Puller x={bx + 26 + P * S + 22} y={by - 14} color={col.p} />
            <Puller x={bx - 26 - Q * S - 22} y={by + 14} color={col.q} face={-1} />
            <Lab p={pt(bx + 26 + (P * S) / 2, by - 34)} c="p">P = 6 N</Lab>
            <Lab p={pt(bx - 26 - (Q * S) / 2, by + 44)} c="q">Q = 4 N</Lab>
            <Vec a={pt(bx, by + 84)} b={pt(bx + (done ? (P - Q) * S : 0), by + 84)} c="r" w={5} show={done} />
            <Lab p={pt(bx + ((P - Q) * S) / 2, by + 106)} c="r" show={done}>R = 2 N</Lab>
          </Stage>
        );
      },
    },
    {
      title: "কোণ করে টানলে",
      text: (
        <>
          <C k="q">সবুজ</C> জন এখন 60° কোণে ওপরের দিকে টানছে। বাক্স কোন দিকে যাবে?
        </>
      ),
      locked: picks[2] === undefined,
      prompt: <Choices options={["ঠিক পূর্বে", "ঠিক উত্তরে", "মাঝামাঝি, একটু ওপরে হেলে"]} answer={2} picked={picks[2]} onPick={pick(2)} explain="দুই টানের মিলিত ফলকে বলে লব্ধি (R)। বাক্স লব্ধির দিকেই যায়। এখানে সরাসরি যোগ বা বিয়োগ চলে না, কারণ দিক আলাদা।" />,
      figure: () => {
        const done = picks[2] !== undefined;
        const bx = 110;
        const by = 190;
        const c0 = pt(bx, by);
        const qx = Q * Math.cos(rad(60)) * S;
        const qy = Q * Math.sin(rad(60)) * S;
        return (
          <Stage w={440} h={260} label="একজন কোণ করে টানছে">
            <Crate x={bx} y={by} dx={done ? 52 : 0} dy={done ? -22 : 0} />
            <Vec a={c0} b={pt(bx + P * S, by)} c="p" w={4} />
            <Vec a={c0} b={pt(bx + qx, by - qy)} c="q" w={4} />
            <Vec a={c0} b={pt(bx + P * S + qx, by - qy)} c="r" w={5} show={done} />
            <Puller x={bx + P * S + 22} y={by} color={col.p} />
            <Puller x={bx + qx + 12} y={by - qy - 18} color={col.q} />
            <Arc o={c0} r={34} from={0} to={60} c="f" w={1.5} />
            <Lab p={pol(c0, 30, 52)}>α = 60°</Lab>
            <Lab p={pt(bx + (P * S) / 2, by + 24)} c="p">P = 6 N</Lab>
            <Lab p={pt(bx - 6, by - qy / 2)} c="q" anchor="end">Q = 4 N</Lab>
            <Lab p={pt(bx + (P * S + qx) / 2 + 8, by - qy / 2 - 12)} c="r" anchor="start" show={done}>R</Lab>
          </Stage>
        );
      },
    },
    {
      title: "Q-কে P-এর মাথায় বসাও",
      text: (
        <>
          একটা কৌশল: ধরো তুমি আগে <C k="p">P</C> দূরত্ব হাঁটলে, তারপর <C k="q">Q</C> হাঁটলে। তাই <C k="q">Q</C>-কে তুলে <C k="p">P</C>-এর মাথায় বসাও। দৈর্ঘ্য আর দিক একই থাকে।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const moved = phase === 1;
        return (
          <Stage w={440} h={260} label="Q ভেক্টরকে P-এর মাথায় সরানো হচ্ছে">
            <Vec a={O1} b={pTip} c="p" w={4} />
            <Vec a={O1} b={qOrigin} c="q" w={2} dash show={moved} />
            <Vec a={moved ? pTip : O1} b={moved ? rTip : qOrigin} c="q" w={4} />
            <Dot p={O1} />
            <Lab p={add(mid(O1, pTip), 0, 22)} c="p">P</Lab>
            <Lab p={moved ? add(mid(pTip, rTip), 14, 0) : add(mid(O1, qOrigin), -12, -4)} c="q" anchor={moved ? "start" : "end"}>Q</Lab>
          </Stage>
        );
      },
    },
    {
      title: "শুরু থেকে শেষ",
      text: (
        <>
          শুরু থেকে শেষ বিন্দু পর্যন্ত সোজা তীরটাই <C k="r">লব্ধি R</C>। একে বলে ত্রিভুজ সূত্র।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        return (
          <Stage w={440} h={260} label="শুরু থেকে শেষ বিন্দুর তীরই লব্ধি">
            <Vec a={O1} b={pTip} c="p" w={4} />
            <Vec a={pTip} b={rTip} c="q" w={4} />
            <Vec a={O1} b={on ? rTip : O1} c="r" w={5} show={on} />
            <Arc o={pTip} r={26} from={0} to={60} c="f" w={1.5} />
            <Lab p={pol(pTip, 30, 44)}>α</Lab>
            <Dot p={O1} />
            <Lab p={add(mid(O1, pTip), 0, 22)} c="p">P</Lab>
            <Lab p={add(mid(pTip, rTip), 14, 0)} c="q" anchor="start">Q</Lab>
            <Lab p={add(mid(O1, rTip), -12, -10)} c="r" anchor="end" show={on}>R</Lab>
          </Stage>
        );
      },
    },
    {
      title: "সামান্তরিক সূত্র",
      text: (
        <>
          <C k="p">P</C> আর <C k="q">Q</C>-কে একই বিন্দু থেকে এঁকে সামান্তরিক পূর্ণ করো। কর্ণই <C k="r">R</C>। ফল একই।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        return (
          <Stage w={440} h={260} label="সামান্তরিক সূত্র">
            <Seg a={qOrigin} b={rTip} dash c="m" w={1.5} show={on} />
            <Seg a={pTip} b={rTip} dash c="m" w={1.5} show={on} />
            <Vec a={O1} b={pTip} c="p" w={4} />
            <Vec a={O1} b={qOrigin} c="q" w={4} />
            <Vec a={O1} b={on ? rTip : O1} c="r" w={5} show={on} />
            <Dot p={O1} />
            <Lab p={add(mid(O1, pTip), 0, 22)} c="p">P</Lab>
            <Lab p={add(mid(O1, qOrigin), -12, -4)} c="q" anchor="end">Q</Lab>
            <Lab p={add(mid(O1, rTip), 8, 16)} c="r" anchor="start" show={on}>R</Lab>
          </Stage>
        );
      },
    },
    {
      title: "কোণ বদলে দেখো",
      text: (
        <>
          <b>α</b> বদলাও। <C k="q">Q</C>-এর মাথা বৃত্তে ঘোরে, আর <C k="r">R</C> বদলে যায়।
        </>
      ),
      prompt: (
        <div className="guide-play">
          <label className="guide-range-l">
            <span>α</span>
            <input className="guide-range" type="range" min={0} max={180} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
            <b>{alpha}°</b>
          </label>
          <div className="guide-chips">
            {[0, 60, 90, 120, 180].map((v) => (
              <button key={v} type="button" className={`guide-chip${alpha === v ? " on" : ""}`} onClick={() => setAlpha(v)}>
                {v}°
              </button>
            ))}
          </div>
          <div className="guide-read">
            <span>
              R = <C k="r">{rv.toFixed(2)} N</C>
            </span>
            <span>θ = {th.toFixed(1)}°</span>
          </div>
          <p className="guide-note">{insight}</p>
        </div>
      ),
      figure: () => (
        <Stage w={440} h={260} label="কোণ বদলালে লব্ধি বদলায়">
          <circle cx={pT7.x} cy={pT7.y} r={Q * S} fill="none" strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
          <Vec a={O7} b={pT7} c="p" w={4} />
          <Vec a={pT7} b={qT7} c="q" w={4} />
          <Vec a={O7} b={qT7} c="r" w={5} />
          <Arc o={pT7} r={26} from={0} to={alpha} c="f" w={1.5} />
          <Lab p={pol(pT7, alpha / 2, 42)}>α</Lab>
          <Dot p={O7} />
          <Lab p={add(mid(O7, pT7), 0, 22)} c="p">P</Lab>
        </Stage>
      ),
    },
    {
      title: "Q-কে দুই ভাগ করো",
      text: (
        <>
          <C k="q">Q</C>-কে দুটো লম্ব অংশে ভাগ করো: পূর্ব দিকে <b>Q cosα</b>, ওপর দিকে <b>Q sinα</b>। এখন বড় একটা সমকোণী ত্রিভুজ তৈরি হয়েছে।
        </>
      ),
      replay: true,
      figure: (phase) => <TriFigure level={0} phase={phase} />,
    },
    {
      title: "পিথাগোরাস লাগাও",
      text: (
        <>
          ত্রিভুজের ভূমি <b>P + Q cosα</b>, উচ্চতা <b>Q sinα</b>, অতিভুজ <C k="r">R</C>। বর্গ খুলে cos²α + sin²α = 1 বসালে সূত্র পাই।
        </>
      ),
      tex: ["R^2=(P+Q\\cos\\alpha)^2+(Q\\sin\\alpha)^2", "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}"],
      replay: true,
      figure: (phase) => <TriFigure level={1} phase={phase} />,
    },
    {
      title: "সংখ্যা বসিয়ে দেখি",
      text: (
        <>
          P = 6 N, Q = 4 N, α = 60° হলে লব্ধি আর তার দিক:
        </>
      ),
      tex: ["R=\\sqrt{6^2+4^2+2\\times6\\times4\\times\\cos60^\\circ}=\\sqrt{76}=8.72\\ \\text{N}", "\\tan\\theta=\\dfrac{Q\\sin\\alpha}{P+Q\\cos\\alpha}=\\dfrac{3.46}{8}\\Rightarrow\\theta=23.4^\\circ"],
      replay: true,
      figure: (phase) => <TriFigure level={2} phase={phase} />,
    },
  ];

  return <Guide steps={steps} step={step} onStep={setStep} />;
}
