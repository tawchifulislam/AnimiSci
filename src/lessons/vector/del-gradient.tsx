"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Stage, SliderCard, spring, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1 } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "স্কেলার ক্ষেত্র কী তা বুঝবে, ∇ চিহ্নটা কী করে তা জানবে এবং গ্র্যাডিয়েন্টের মান ও দিক বের করতে পারবে।",
  hook: "শীতের সকালে ঘরের এক কোণে হিটার জ্বলছে। ঘরের যেকোনো জায়গায় দাঁড়ালে তুমি বলতে পারো কতটা গরম। কিন্তু কোন দিকে হাঁটলে সবচেয়ে তাড়াতাড়ি উষ্ণতা বাড়বে? এর উত্তর দেয় গ্র্যাডিয়েন্ট।",
  look: "P বিন্দু সরালে লাল তীরটা কোন দিকে মুখ করে থাকে, তা দেখো। আর সমতাপ রেখার সাথে তীরের কোণটা কত, সেটাও খেয়াল করো।",
  formulas: [
    { tex: "\\nabla=\\hat\\imath\\dfrac{\\partial}{\\partial x}+\\hat\\jmath\\dfrac{\\partial}{\\partial y}+\\hat k\\dfrac{\\partial}{\\partial z}", meaning: "ডেল অপারেটর। এটা নিজে কোনো রাশি নয়, ডানপাশের রাশির ওপর কাজ করে।", step: 4 },
    { tex: "\\nabla\\varphi=\\dfrac{\\partial\\varphi}{\\partial x}\\hat\\imath+\\dfrac{\\partial\\varphi}{\\partial y}\\hat\\jmath+\\dfrac{\\partial\\varphi}{\\partial z}\\hat k", meaning: "স্কেলার φ-এর গ্র্যাডিয়েন্ট। ফল একটা ভেক্টর।", step: 4 },
    { tex: "|\\nabla\\varphi|=\\sqrt{\\left(\\dfrac{\\partial\\varphi}{\\partial x}\\right)^2+\\left(\\dfrac{\\partial\\varphi}{\\partial y}\\right)^2+\\left(\\dfrac{\\partial\\varphi}{\\partial z}\\right)^2}", meaning: "গ্র্যাডিয়েন্টের মান, অর্থাৎ φ সবচেয়ে দ্রুত যত হারে বাড়ে।", step: 5 },
    { tex: "\\nabla\\varphi\\perp\\varphi=\\text{constant}", meaning: "গ্র্যাডিয়েন্ট সমান মানের রেখা বা তলের লম্ব।", step: 6 },
  ],
  example: {
    problem: "φ = x²yz হলে (1, −1, 2) বিন্দুতে ∇φ এবং তার মান বের করো।",
    steps: [
      { text: "তিনটি আংশিক অবকলন বের করি। যেটির সাপেক্ষে অবকলন, বাকি দুটিকে ধ্রুবক ধরি।", tex: "\\frac{\\partial\\varphi}{\\partial x}=2xyz,\\quad \\frac{\\partial\\varphi}{\\partial y}=x^2z,\\quad \\frac{\\partial\\varphi}{\\partial z}=x^2y" },
      { text: "গ্র্যাডিয়েন্ট সাজাই।", tex: "\\nabla\\varphi=2xyz\\,\\hat\\imath+x^2z\\,\\hat\\jmath+x^2y\\,\\hat k" },
      { text: "এবার বিন্দুর মান বসাই: x = 1, y = −1, z = 2।", tex: "\\nabla\\varphi=2(1)(-1)(2)\\hat\\imath+(1)^2(2)\\hat\\jmath+(1)^2(-1)\\hat k=-4\\hat\\imath+2\\hat\\jmath-\\hat k" },
      { text: "গ্র্যাডিয়েন্টের মান বের করি।", tex: "|\\nabla\\varphi|=\\sqrt{16+4+1}=\\sqrt{21}=4.58" },
      { text: "উত্তর: ∇φ = −4î + 2ĵ − k̂ এবং মান 4.58।" },
    ],
  },
  mistakes: [
    "∇φ-কে একটা সংখ্যা ভাবা। গ্র্যাডিয়েন্ট একটা ভেক্টর।",
    "আংশিক অবকলনে অন্য চলরাশিকেও বদলাতে দেওয়া। x-এর অবকলনে y আর z ধ্রুবক।",
    "বিন্দুর মান আগে বসিয়ে তারপর অবকলন করা। আগে অবকলন, তারপর মান বসানো।",
    "গ্র্যাডিয়েন্টকে সমান মানের রেখা বরাবর ভাবা। এটা রেখার লম্ব।",
  ],
  recap: [
    "স্কেলার ক্ষেত্র মানে প্রতি বিন্দুতে একটা সংখ্যা, যেমন তাপমাত্রা। ভেক্টর ক্ষেত্রে প্রতি বিন্দুতে একটা ভেক্টর।",
    "∇φ = (∂φ/∂x) î + (∂φ/∂y) ĵ + (∂φ/∂z) k̂। ফল ভেক্টর।",
    "গ্র্যাডিয়েন্ট φ সবচেয়ে দ্রুত বাড়ার দিক দেখায়। তার মান সেই বাড়ার হার।",
    "সমান φ-এর রেখার লম্ব বরাবর গ্র্যাডিয়েন্ট। সর্বোচ্চ বা সর্বনিম্ন বিন্দুতে সে শূন্য।",
  ],
  think: {
    scenario: "তুমি একটা পাহাড়ের ঢালে দাঁড়িয়ে আছো। কুয়াশায় কিছু দেখা যাচ্ছে না, কিন্তু পায়ের নিচের মাটির ঢাল তুমি অনুভব করতে পারছ।",
    points: [
      "কোন দিকে হাঁটলে সবচেয়ে দ্রুত ওপরে উঠবে? কোন দিকে হাঁটলে উচ্চতা একটুও বদলাবে না?",
      "ঠিক শৃঙ্গে পৌঁছালে কোন দিকে গেলে সবচেয়ে বেশি উঠবে? কেন?",
      "ঢাল যত খাড়া, গ্র্যাডিয়েন্টের মান বড় না ছোট? সমতল জায়গায় কত?",
      "পাহাড়ের মানচিত্রে সমান উচ্চতার রেখা ঘন থাকলে কী বোঝা যায়?",
    ],
    hint: "গ্র্যাডিয়েন্ট দেখায় কোন দিকে সবচেয়ে দ্রুত ওঠা যায়, আর তার মান ঢালের খাড়া ভাব। সমান উচ্চতার রেখা ধরে হাঁটলে উচ্চতা বদলায় না। সমতলে আর শৃঙ্গে গ্র্যাডিয়েন্ট শূন্য। রেখা ঘন মানে ঢাল খাড়া।",
    traps: [
      "∇φ একটা সংখ্যা।",
      "x-এর সাপেক্ষে অবকলনের সময় y-ও বদলাতে দিতে হয়।",
      "বিন্দুর মান আগে বসিয়ে তারপর অবকলন করতে হয়।",
      "গ্র্যাডিয়েন্ট সমান মানের রেখা বরাবর থাকে।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "φ = x²yz হলে (1, −1, 2) বিন্দুতে ∇φ এবং তার মান বের করো।",
      hint: "আগে অবকলন, তারপর বিন্দুর মান বসাও।",
      steps: [
        { text: "তিনটি আংশিক অবকলন বের করি।", tex: "\\frac{\\partial\\varphi}{\\partial x}=2xyz,\\quad \\frac{\\partial\\varphi}{\\partial y}=x^2z,\\quad \\frac{\\partial\\varphi}{\\partial z}=x^2y" },
        { text: "বিন্দুর মান বসাই: x = 1, y = −1, z = 2।", tex: "\\nabla\\varphi=2(1)(-1)(2)\\hat\\imath+(1)^2(2)\\hat\\jmath+(1)^2(-1)\\hat k=-4\\hat\\imath+2\\hat\\jmath-\\hat k" },
        { text: "মান বের করি।", tex: "|\\nabla\\varphi|=\\sqrt{16+4+1}=\\sqrt{21}=4.58" },
        { text: "উত্তর: ∇φ = −4î + 2ĵ − k̂ এবং মান 4.58।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "φ = 3x²y − y³ হলে (1, 2) বিন্দুতে ∇φ এবং তার মান বের করো।",
      hint: "y-এর সাপেক্ষে অবকলনে x ধ্রুবক।",
      steps: [
        { text: "x-এর সাপেক্ষে অবকলন, y ধ্রুবক।", tex: "\\frac{\\partial\\varphi}{\\partial x}=6xy" },
        { text: "y-এর সাপেক্ষে অবকলন, x ধ্রুবক।", tex: "\\frac{\\partial\\varphi}{\\partial y}=3x^2-3y^2" },
        { text: "(1, 2) বিন্দুর মান বসাই।", tex: "\\nabla\\varphi=6(1)(2)\\hat\\imath+(3-12)\\hat\\jmath=12\\hat\\imath-9\\hat\\jmath" },
        { text: "মান বের করি।", tex: "|\\nabla\\varphi|=\\sqrt{144+81}=\\sqrt{225}=15" },
      ],
    },
    {
      level: "কঠিন",
      q: "একটি ঘরের তাপমাত্রা T = 100 − 2.5[(x − 5)² + (y − 3.5)²] (°C)। (2, 2) বিন্দুতে সবচেয়ে দ্রুত তাপমাত্রা বাড়ার দিক ও হার বের করো।",
      hint: "গ্র্যাডিয়েন্টের দিক সবচেয়ে দ্রুত বাড়ার দিক, মান হার।",
      steps: [
        { text: "x-এর সাপেক্ষে আংশিক অবকলন।", tex: "\\frac{\\partial T}{\\partial x}=-5(x-5)=-5(2-5)=15" },
        { text: "y-এর সাপেক্ষে আংশিক অবকলন।", tex: "\\frac{\\partial T}{\\partial y}=-5(y-3.5)=-5(2-3.5)=7.5" },
        { text: "হার হলো গ্র্যাডিয়েন্টের মান।", tex: "|\\nabla T|=\\sqrt{15^2+7.5^2}=\\sqrt{281.25}=16.77\\ ^\\circ\\text{C per unit}" },
        { text: "দিক x-অক্ষের সাথে কত কোণে।", tex: "\\tan\\theta=\\frac{7.5}{15}=0.5\\Rightarrow\\theta=26.6^\\circ" },
        { text: "উত্তর: x-অক্ষের সাথে 26.6° কোণে, ঘরের কেন্দ্রের (5, 3.5) দিকে, প্রতি একক দূরত্বে 16.77 °C হারে।" },
      ],
    },
  ],
  concepts: [
    "গ্র্যাডিয়েন্ট সমান মানের রেখার লম্ব কেন? রেখা বরাবর গেলে φ বদলায় না, এটা দিয়ে ভেবে বলো।",
    "φ-এর সাথে একটা ধ্রুবক যোগ করলে ∇φ বদলাবে কি? কেন?",
    "দুটি স্কেলার ক্ষেত্রের যোগফলের গ্র্যাডিয়েন্ট কীভাবে পাবে?",
  ],
  quiz: [
    { q: "φ = x² + y² হলে ∇φ কত?", options: ["2x î + 2y ĵ", "x î + y ĵ", "2x + 2y", "x² î + y² ĵ"], answer: 0, why: "∂φ/∂x = 2x এবং ∂φ/∂y = 2y। গ্র্যাডিয়েন্ট ভেক্টর, তাই î ও ĵ থাকে। 2x + 2y লিখলে সেটা স্কেলার হয়ে যায়।" },
    { q: "গ্র্যাডিয়েন্ট কোন দিকে নির্দেশ করে?", options: ["φ সবচেয়ে ধীরে বাড়ে যেদিকে", "φ সবচেয়ে দ্রুত বাড়ে যেদিকে", "φ স্থির থাকে যেদিকে", "সব সময় x-অক্ষ বরাবর"], answer: 1, why: "গ্র্যাডিয়েন্টের দিক φ-এর সবচেয়ে দ্রুত বৃদ্ধির দিক। φ স্থির থাকে তার লম্ব দিকে।" },
    { q: "∇φ কোন ধরনের রাশি?", options: ["স্কেলার", "ভেক্টর", "শুধু সংখ্যা 0", "কোনোটিই নয়"], answer: 1, why: "∇ একটা ভেক্টর অপারেটর, আর ∇φ তিন উপাংশের ভেক্টর।" },
    { q: "φ = 3x + 4y হলে |∇φ| কত?", options: ["7", "5", "12", "1"], answer: 1, why: "∇φ = 3î + 4ĵ, তাই মান √(3² + 4²) = 5। 7 হলো উপাংশ সরাসরি যোগ করার ভুল।" },
    { q: "φ = 5x হলে ∇φ কত?", options: ["5 î", "5x î", "5", "x î"], answer: 0, why: "∂φ/∂x = 5, আর y, z-এর সাপেক্ষে শূন্য। তাই ∇φ = 5 î, যা ভেক্টর।" },
  ],
};

const PU = 40;
const X0 = 20;
const Y0 = 285;
const CW = 25;
const COLS = 16;
const ROWS = 11;
const KG = 2.2;

const phi = (x: number, y: number) => 100 - 2.5 * ((x - 5) ** 2 + (y - 3.5) ** 2);
const sx = (x: number) => X0 + x * PU;
const sy = (y: number) => Y0 - y * PU;
const shade = (t: number) => `hsl(${Math.round(215 - 180 * t)} 80% ${Math.round(86 - 18 * t)}%)`;

const cells: { x: number; y: number; fill: string }[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const ux = ((c + 0.5) * CW) / PU;
    const uy = ((r + 0.5) * CW) / PU;
    const t = Math.min(1, Math.max(0, phi(ux, uy) / 100));
    cells.push({ x: X0 + c * CW, y: Y0 - (r + 1) * CW, fill: shade(t) });
  }
}

const marker = (id: string, color: string) => (
  <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 0L10 5L0 10z" fill={color} />
  </marker>
);

function Ar({ a, b, color, mk, show = true, w = 3.5 }: { a: Pt; b: Pt; color: string; mk: string; show?: boolean; w?: number }) {
  return (
    <motion.line
      initial={false}
      animate={{ x1: a.x, y1: a.y, x2: b.x, y2: b.y, opacity: show ? 1 : 0 }}
      transition={spring}
      strokeWidth={w}
      strokeLinecap="round"
      markerEnd={`url(#${mk})`}
      style={{ stroke: color }}
    />
  );
}

function T({ x, y, children, anchor = "middle", show = true }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; show?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={13} fontWeight={700} opacity={show ? 1 : 0} style={{ fill: "#171a2c", stroke: "#fff", strokeWidth: 3, paintOrder: "stroke" }}>
      {children}
    </text>
  );
}

export default function Anim() {
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(2);

  const gx = -5 * (px - 5);
  const gy = -5 * (py - 3.5);
  const temp = phi(px, py);
  const dist = Math.hypot(px - 5, py - 3.5);
  const mag = Math.hypot(gx, gy);
  const P: Pt = { x: sx(px), y: sy(py) };
  const C: Pt = { x: sx(5), y: sy(3.5) };
  const xEnd: Pt = { x: P.x + gx * KG, y: P.y };
  const yEnd: Pt = { x: P.x, y: P.y - gy * KG };
  const gEnd: Pt = { x: P.x + gx * KG, y: P.y - gy * KG };

  const steps: LessonStep[] = [
    {
      title: "তাপ-মানচিত্র",
      text: "ঘরের প্রতিটি বিন্দুর একটা তাপমাত্রা আছে। রঙ দিয়ে দেখানো হয়েছে: নীল ঠান্ডা, কমলা গরম। প্রতি বিন্দুতে শুধু একটা সংখ্যা, কোনো দিক নেই। একে বলে স্কেলার ক্ষেত্র φ।",
    },
    {
      title: "একটি বিন্দু",
      text: `P বিন্দুতে দাঁড়িয়ে আছো। এখানে তাপমাত্রা ${f1(temp)}°C। প্রশ্ন: কোন দিকে হাঁটলে সবচেয়ে তাড়াতাড়ি গরম হবে? স্লাইডারে P সরিয়ে দেখো।`,
    },
    {
      title: "x আর y দিকের ঢাল",
      text: "শুধু ডানে গেলে প্রতি একক দূরত্বে তাপমাত্রা কত বাড়ে, সেটা ∂φ/∂x। শুধু ওপরে গেলে ∂φ/∂y। নীল তীর ডান দিকের ঢাল, সবুজ তীর ওপর দিকের ঢাল।",
      tex: [
        "\\varphi=100-2.5\\left[(x-5)^2+(y-3.5)^2\\right]",
        `\\frac{\\partial\\varphi}{\\partial x}=-5(x-5)=${f1(gx)}`,
        `\\frac{\\partial\\varphi}{\\partial y}=-5(y-3.5)=${f1(gy)}`,
      ],
    },
    {
      title: "দুই ঢাল জোড়া দাও",
      text: "দুই ঢালকে ভেক্টরের মতো যোগ করলে যে লাল তীর পাই, সেটাই গ্র্যাডিয়েন্ট। ∇ চিহ্নটা তিন দিকের অবকলনকে একসাথে গুছিয়ে রাখে।",
      tex: [
        "\\nabla=\\hat\\imath\\frac{\\partial}{\\partial x}+\\hat\\jmath\\frac{\\partial}{\\partial y}+\\hat k\\frac{\\partial}{\\partial z}",
        `\\nabla\\varphi=${f1(gx)}\\hat\\imath${gy < 0 ? "-" : "+"}${f1(Math.abs(gy))}\\hat\\jmath`,
        `|\\nabla\\varphi|=\\sqrt{(${f1(gx)})^2+(${f1(gy)})^2}=${f1(mag)}`,
      ],
    },
    {
      title: "গ্র্যাডিয়েন্টের মানে",
      text: "লাল তীর দেখায় কোন দিকে গেলে তাপমাত্রা সবচেয়ে দ্রুত বাড়ে। তীরের দৈর্ঘ্য বলে ঢাল কত খাড়া। কেন্দ্র থেকে দূরে ঢাল বেশি, তীরও লম্বা।",
      note: "গ্র্যাডিয়েন্ট সব সময় φ বাড়ার দিকে মুখ করে থাকে, কমার দিকে নয়।",
    },
    {
      title: "সমতাপ রেখা",
      text: "যে বিন্দুগুলোর তাপমাত্রা সমান, তাদের জুড়ে সাদা বৃত্তটা সমতাপ রেখা। গ্র্যাডিয়েন্ট সব সময় এই রেখার লম্ব। রেখা বরাবর হাঁটলে তাপমাত্রা বদলায় না।",
      tex: ["\\nabla\\varphi\\perp\\varphi=\\text{constant}"],
    },
    {
      title: "সর্বোচ্চ বিন্দু",
      text: "সবচেয়ে গরম বিন্দুতে ঢাল নেই, কারণ সেখান থেকে যেদিকেই যাও তাপমাত্রা কমে। তাই সেখানে গ্র্যাডিয়েন্ট শূন্য। স্লাইডারে P কে মাঝখানে (5, 3.5) এ নিয়ে যাও।",
      tex: ["\\nabla\\varphi=\\vec 0"],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="তাপ-মানচিত্র ও গ্র্যাডিয়েন্ট">
      <defs>
        {marker("gd-r", "#b4132f")}
        {marker("gd-b", "#1d4ed8")}
        {marker("gd-g", "#047857")}
      </defs>
      {cells.map((cell, i) => (
        <rect key={i} x={cell.x} y={cell.y} width={CW} height={CW} style={{ fill: cell.fill }} />
      ))}

      {s >= 5 ? <circle cx={C.x} cy={C.y} r={dist * PU} fill="none" strokeWidth={2.5} strokeDasharray="7 5" style={{ stroke: "#fff" }} /> : null}
      <circle cx={C.x} cy={C.y} r={5} strokeWidth={2} style={{ fill: "#171a2c", stroke: "#fff" }} />
      <T x={C.x} y={C.y - 12} show={s >= 6}>সবচেয়ে গরম</T>

      <line x1={xEnd.x} y1={xEnd.y} x2={gEnd.x} y2={gEnd.y} strokeWidth={1.5} strokeDasharray="4 4" opacity={s === 3 ? 0.9 : 0} style={{ stroke: "#171a2c" }} />
      <line x1={yEnd.x} y1={yEnd.y} x2={gEnd.x} y2={gEnd.y} strokeWidth={1.5} strokeDasharray="4 4" opacity={s === 3 ? 0.9 : 0} style={{ stroke: "#171a2c" }} />
      <Ar a={P} b={xEnd} color="#1d4ed8" mk="gd-b" show={s >= 2 && Math.abs(gx) > 0.5} />
      <Ar a={P} b={yEnd} color="#047857" mk="gd-g" show={s >= 2 && Math.abs(gy) > 0.5} />
      <Ar a={P} b={gEnd} color="#b4132f" mk="gd-r" show={s >= 3 && mag > 0.5} w={4.5} />
      <circle cx={P.x} cy={P.y} r={7} strokeWidth={2.5} style={{ fill: "#fff", stroke: "#171a2c" }} />

      <T x={P.x} y={P.y + 24} show={s >= 1}>P: {f1(temp)}°C</T>
      <T x={(P.x + xEnd.x) / 2} y={P.y + 40} show={s >= 2 && Math.abs(gx) > 0.5}>∂φ/∂x</T>
      <T x={P.x - 10} y={(P.y + yEnd.y) / 2} anchor="end" show={s >= 2 && Math.abs(gy) > 0.5}>∂φ/∂y</T>
      <T x={gEnd.x + 8} y={gEnd.y - 8} anchor="start" show={s >= 3 && mag > 0.5}>∇φ</T>
      <T x={26} y={28} anchor="start" show={s >= 4}>ঢাল |∇φ| = {f1(mag)}</T>
    </Stage>
  );

  const extra = (
    <SliderCard>
      <Slider label="P-এর x অবস্থান" value={px} min={0.5} max={9.5} step={0.5} onChange={setPx} />
      <Slider label="P-এর y অবস্থান" value={py} min={0.5} max={6} step={0.5} onChange={setPy} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
