"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { Dot, Lab, Stage, Vec, add, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
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

const CEN = pt(220, 110);
const px = (x: number) => 20 + 40 * x;
const py = (y: number) => 250 - 40 * y;

function Hill({ x, y, mode, done }: { x: number; y: number; mode: "peek" | "slopes" | "sum" | "contour"; done: boolean }) {
  const P = pt(px(x), py(y));
  const gx = -5 * (x - 5);
  const gy = -5 * (y - 3.5);
  const dx = CEN.x - P.x;
  const dy = CEN.y - P.y;
  const dist = Math.hypot(dx, dy) || 1;
  const toPeak = pt(P.x + (dx / dist) * 64, P.y + (dy / dist) * 64);
  const g = pt(P.x + gx * 2.5, P.y - gy * 2.5);
  return (
    <Stage w={440} h={260} label="পাহাড়ের সমান উচ্চতার রেখা আর ঢালের তীর">
      {[32, 64, 96].map((r) => (
        <circle key={r} cx={CEN.x} cy={CEN.y} r={r} fill="none" strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
      ))}
      {mode === "contour" ? <circle cx={CEN.x} cy={CEN.y} r={dist} fill="none" strokeWidth={2.5} strokeDasharray="7 5" style={{ stroke: col.u }} /> : null}
      <Dot p={CEN} c="r" r={5} />
      <Lab p={add(CEN, 0, -14)} c="r">শৃঙ্গ</Lab>
      {mode === "peek" ? <Vec a={P} b={done ? toPeak : P} c="r" w={5} show={done} /> : null}
      {mode === "slopes" ? (
        <>
          <Vec a={P} b={pt(P.x + gx * 2.5, P.y)} c="p" w={4} />
          <Vec a={P} b={pt(P.x, P.y - gy * 2.5)} c="q" w={4} />
        </>
      ) : null}
      {mode === "sum" ? (
        <>
          <Vec a={P} b={pt(P.x + gx * 2.5, P.y)} c="p" w={3} />
          <Vec a={P} b={pt(P.x, P.y - gy * 2.5)} c="q" w={3} />
          <Vec a={P} b={g} c="r" w={5} />
        </>
      ) : null}
      {mode === "contour" ? <Vec a={P} b={done ? toPeak : P} c="r" w={5} show={done} /> : null}
      <Dot p={P} c="f" r={7} />
      <Lab p={add(P, 0, 26)}>তুমি</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const gx = -5 * (x - 5);
  const gy = -5 * (y - 3.5);
  const mag = Math.hypot(gx, gy);
  const note = mag < 0.5 ? "শৃঙ্গে পৌঁছেছ: কোনো দিকে ঢাল নেই, ∇φ = 0।" : "শৃঙ্গ থেকে যত দূরে, ঢাল তত খাড়া, তীর তত লম্বা।";

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "কুয়াশার পাহাড়",
            text: "তুমি কুয়াশায় ঢাকা এক পাহাড়ের ঢালে দাঁড়িয়ে। দৃশ্য দেখা যায় না, শুধু পায়ের নিচের ঢাল অনুভব করো। কোন দিকে হাঁটলে সবচেয়ে দ্রুত ওপরে উঠবে?",
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["শৃঙ্গের দিকে সোজা", "সমান উচ্চতার রেখা ধরে", "শৃঙ্গের উল্টো দিকে"]} answer={0} picked={g.picks[0]} onPick={g.pick(0)} explain="শৃঙ্গের দিকে সোজা হাঁটলে সবচেয়ে দ্রুত ওঠা যায়। এই দিকটাই গ্র্যাডিয়েন্ট দেখায়।" />,
            figure: () => <Hill x={2} y={2} mode="peek" done={g.picks[0] !== undefined} />,
          },
          {
            title: "x আর y দিকের ঢাল",
            text: (
              <>
                শুধু পূর্ব দিকে এক ধাপ গেলে কতটা ওঠো, সেটা <C k="p">∂φ/∂x</C>। শুধু উত্তর দিকে গেলে <C k="q">∂φ/∂y</C>। তীরের দৈর্ঘ্য ঢাল বোঝায়।
              </>
            ),
            replay: true,
            figure: () => <Hill x={2} y={2} mode="slopes" done />,
          },
          {
            title: "দুই ঢাল জোড়া দাও",
            text: (
              <>
                দুই ঢালকে ভেক্টরের মতো যোগ করলে যে <C k="r">লাল তীর</C> পাই, সেটাই গ্র্যাডিয়েন্ট ∇φ। এখানে ∂φ/∂x = 15 আর ∂φ/∂y = 7.5।
              </>
            ),
            tex: ["\\nabla\\varphi=\\dfrac{\\partial\\varphi}{\\partial x}\\hat\\imath+\\dfrac{\\partial\\varphi}{\\partial y}\\hat\\jmath", "\\nabla\\varphi=15\\hat\\imath+7.5\\hat\\jmath"],
            replay: true,
            figure: () => <Hill x={2} y={2} mode="sum" done />,
          },
          {
            title: "সমান উচ্চতার রেখা",
            text: "নীল ডোরাকাটা রেখাটা তোমার বিন্দু দিয়ে যাওয়া সমান উচ্চতার রেখা। এই রেখা ধরে হাঁটলে উচ্চতা কেমন বদলাবে?",
            locked: g.picks[3] === undefined,
            prompt: <Choices options={["বাড়বে", "কমবে", "বদলাবে না"]} answer={2} picked={g.picks[3]} onPick={g.pick(3)} explain="সমান উচ্চতার রেখার সংজ্ঞাই তাই। রেখা বরাবর φ বদলায় না, তাই গ্র্যাডিয়েন্ট সব সময় রেখার লম্বে থাকে।" />,
            figure: () => <Hill x={2} y={2} mode="contour" done={g.picks[3] !== undefined} />,
          },
          {
            title: "নিজে ঘুরে দেখো",
            text: (
              <>
                <b>x</b> আর <b>y</b> বদলিয়ে নিজেকে পাহাড়ের অন্য জায়গায় নাও। শৃঙ্গ (5, 3.5)-এ গ্র্যাডিয়েন্ট কত?
              </>
            ),
            prompt: (
              <div className="guide-play">
                <Play label="x" value={x} min={0.5} max={9.5} step={0.5} onChange={setX} />
                <Play
                  label="y"
                  value={y}
                  min={0.5}
                  max={6}
                  step={0.5}
                  onChange={setY}
                  read={
                    <>
                      <span>
                        ∇φ = <C k="r">{gx.toFixed(1)}î {gy < 0 ? "−" : "+"} {Math.abs(gy).toFixed(1)}ĵ</C>
                      </span>
                      <span>|∇φ| = {mag.toFixed(1)}</span>
                    </>
                  }
                  note={note}
                />
              </div>
            ),
            figure: () => <Hill x={x} y={y} mode="sum" done />,
          },
        ],
        summary: [
          {
            title: "গ্র্যাডিয়েন্ট",
            text: "স্কেলার ক্ষেত্রের প্রতিটি বিন্দুতে একটা ভেক্টর, যা সবচেয়ে দ্রুত বাড়ার দিক দেখায়। তার মান সেই বাড়ার হার।",
            tex: ["\\nabla\\varphi=\\dfrac{\\partial\\varphi}{\\partial x}\\hat\\imath+\\dfrac{\\partial\\varphi}{\\partial y}\\hat\\jmath+\\dfrac{\\partial\\varphi}{\\partial z}\\hat k", "|\\nabla\\varphi|=\\sqrt{\\left(\\dfrac{\\partial\\varphi}{\\partial x}\\right)^2+\\left(\\dfrac{\\partial\\varphi}{\\partial y}\\right)^2+\\left(\\dfrac{\\partial\\varphi}{\\partial z}\\right)^2}"],
          },
          {
            title: "লম্ব আর শূন্য",
            text: "গ্র্যাডিয়েন্ট সমান φ-এর রেখার লম্ব। শৃঙ্গ বা সর্বনিম্ন বিন্দুতে সে শূন্য।",
            tex: ["\\nabla\\varphi\\perp\\varphi=\\text{constant}"],
          },
        ],
      })}
    />
  );
}
