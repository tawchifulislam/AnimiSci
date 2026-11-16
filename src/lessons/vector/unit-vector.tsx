"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Dot, Lab, Seg, SliderCard, Square, Stage, Vec, add, mid, mk } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1 } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "î, ĵ, k̂ দিয়ে যেকোনো ভেক্টর লিখতে পারবে, তার মান বের করতে পারবে, কোনো ভেক্টরের দিকে একক ভেক্টর বানাতে এবং উপাংশ ধরে যোগ-বিয়োগ করতে পারবে।",
  hook: "মানচিত্রে কোনো জায়গা বোঝাতে আমরা বলি 'পূর্বে 3 কিমি, উত্তরে 4 কিমি'। দুই দিকের দুটো সংখ্যা জানলেই পুরো ভেক্টর জানা হয়ে যায়। î, ĵ, k̂ হলো সেই দিকগুলোর নাম, আর সংখ্যাগুলো হলো কতটা।",
  look: "î আর ĵ-কে কতগুণ লম্বা করে জোড়া দিলে A ভেক্টরটা তৈরি হয়, তা খেয়াল করো। আর Â-এর তীরটা কেন সব সময় একক বৃত্তের ওপর থাকে, সেটাও দেখো।",
  formulas: [
    { tex: "\\vec A=A_x\\hat\\imath+A_y\\hat\\jmath+A_z\\hat k", meaning: "ভেক্টরের উপাংশ রূপ। x, y, z দিকে কত কত অংশ।", step: 4 },
    { tex: "A=\\sqrt{A_x^2+A_y^2+A_z^2}", meaning: "ভেক্টরের মান। দুই মাত্রায় z-এর পদ থাকে না।", step: 5 },
    { tex: "\\hat A=\\dfrac{\\vec A}{A}", meaning: "A-এর দিকে একক ভেক্টর।", step: 6 },
    { tex: "\\vec A\\pm\\vec B=(A_x\\pm B_x)\\hat\\imath+(A_y\\pm B_y)\\hat\\jmath+(A_z\\pm B_z)\\hat k", meaning: "যোগ-বিয়োগ হয় একই দিকের উপাংশ ধরে ধরে।", step: 7 },
  ],
  example: {
    problem: "A⃗ = 2î − 3ĵ + 6k̂ এবং B⃗ = î + 2ĵ − 2k̂। A⃗-এর মান, A⃗-এর দিকে একক ভেক্টর এবং A⃗ + B⃗, A⃗ − B⃗ বের করো।",
    steps: [
      { text: "মান বের করি।", tex: "A=\\sqrt{2^2+(-3)^2+6^2}=\\sqrt{49}=7" },
      { text: "মান দিয়ে ভাগ করলে একক ভেক্টর পাই।", tex: "\\hat A=\\frac{2\\hat\\imath-3\\hat\\jmath+6\\hat k}{7}" },
      { text: "যোগ: একই দিকের সংখ্যা যোগ করি।", tex: "\\vec A+\\vec B=(2+1)\\hat\\imath+(-3+2)\\hat\\jmath+(6-2)\\hat k=3\\hat\\imath-\\hat\\jmath+4\\hat k" },
      { text: "বিয়োগ: একই দিকের সংখ্যা বিয়োগ করি।", tex: "\\vec A-\\vec B=(2-1)\\hat\\imath+(-3-2)\\hat\\jmath+(6+2)\\hat k=\\hat\\imath-5\\hat\\jmath+8\\hat k" },
    ],
  },
  mistakes: [
    "একক ভেক্টর বানাতে মান দিয়ে ভাগ না করে যোগ করে ফেলা।",
    "মান বের করতে ঋণাত্মক সংখ্যা আলাদা করে বর্গ না করা। (−3)² = 9, −9 নয়।",
    "î, ĵ, k̂ কে সাধারণ সংখ্যা ভেবে মিশিয়ে যোগ করা। î-এর সাথে ĵ-এর সংখ্যা যোগ হয় না।",
    "দুই মাত্রার প্রশ্নে z-এর পদ জোর করে বসানো।",
  ],
  recap: [
    "î, ĵ, k̂ হলো x, y, z অক্ষ বরাবর একক ভেক্টর। প্রত্যেকের মান 1।",
    "ভেক্টর = (x অংশ) î + (y অংশ) ĵ + (z অংশ) k̂।",
    "মান: সব অংশের বর্গের যোগফলের বর্গমূল।",
    "A-এর দিকে একক ভেক্টর = A ÷ A-এর মান। যোগ-বিয়োগ করতে হয় একই দিকের অংশ ধরে।",
  ],
  think: {
    scenario: "একটা শহরের রাস্তাগুলো পূর্ব-পশ্চিম আর উত্তর-দক্ষিণে সোজা সাজানো। একটা দোকান পূর্বে 3 ব্লক আর উত্তরে 4 ব্লক দূরে। এক পথচারী বলল, 'দোকানটা ওই দিকে সোজা 5 ব্লক।'",
    points: [
      "দুজনের কথা কি একই জায়গা বোঝায়? 3 আর 4 থেকে 5 কীভাবে এল?",
      "শুধু 'ওই দিকটা' বোঝাতে কেমন ভেক্টর লাগবে? তার মান কত হওয়া উচিত?",
      "দুটো দোকানের অবস্থান ভেক্টর যোগ করতে চাইলে কীভাবে করবে: দিক ধরে ধরে, নাকি শুধু মান ধরে?",
      "ভবনে ওপরতলায়ও উঠতে হলে আর কোন একক ভেক্টর লাগবে? মানের সূত্রে কী বাড়বে?",
    ],
    hint: "একক ভেক্টর শুধু দিক দেখায়, তার মান 1। একই দিকের উপাংশ আলাদা আলাদা যোগ হয়, ভিন্ন দিকের সংখ্যা মেশানো যায় না। ত্রিমাত্রায় z-এর বর্গও যোগ হয়।",
    traps: [
      "একক ভেক্টর বানাতে ভেক্টরকে মান দিয়ে ভাগ না করে যোগ করা যায়।",
      "(−3)² এর মান −9।",
      "î-এর সংখ্যার সাথে ĵ-এর সংখ্যা মিশিয়ে যোগ করা যায়।",
      "দুই মাত্রার প্রশ্নেও z-এর পদ বসাতে হয়।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = 2î − 3ĵ + 6k̂ এবং B⃗ = î + 2ĵ − 2k̂। A⃗-এর মান, A⃗-এর দিকে একক ভেক্টর এবং A⃗ + B⃗, A⃗ − B⃗ বের করো।",
      hint: "মান = তিন উপাংশের বর্গের যোগফলের বর্গমূল।",
      steps: [
        { text: "মান বের করি।", tex: "A=\\sqrt{2^2+(-3)^2+6^2}=\\sqrt{49}=7" },
        { text: "মান দিয়ে ভাগ করলে একক ভেক্টর পাই।", tex: "\\hat A=\\frac{2\\hat\\imath-3\\hat\\jmath+6\\hat k}{7}" },
        { text: "যোগ: একই দিকের সংখ্যা যোগ করি।", tex: "\\vec A+\\vec B=3\\hat\\imath-\\hat\\jmath+4\\hat k" },
        { text: "বিয়োগ: একই দিকের সংখ্যা বিয়োগ করি।", tex: "\\vec A-\\vec B=\\hat\\imath-5\\hat\\jmath+8\\hat k" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A⃗ = 3î + 4ĵ এবং B⃗ = −î + 2ĵ হলে 2A⃗ − B⃗ এবং তার মান বের করো।",
      hint: "আগে 2A⃗ বের করো, তারপর B⃗ বিয়োগ করো।",
      steps: [
        { text: "2A⃗ বের করি।", tex: "2\\vec A=6\\hat\\imath+8\\hat\\jmath" },
        { text: "এবার B⃗ বিয়োগ করি। একই দিকের সংখ্যা ধরে।", tex: "2\\vec A-\\vec B=(6+1)\\hat\\imath+(8-2)\\hat\\jmath=7\\hat\\imath+6\\hat\\jmath" },
        { text: "মান বের করি।", tex: "|2\\vec A-\\vec B|=\\sqrt{7^2+6^2}=\\sqrt{85}=9.22" },
      ],
    },
    {
      level: "কঠিন",
      q: "x-এর কোন মানের জন্য A⃗ = xî + 3ĵ + 4k̂ ভেক্টরের মান 13?",
      hint: "মান 13 মানে মানের বর্গ 169।",
      steps: [
        { text: "মানের বর্গ লিখি।", tex: "x^2+3^2+4^2=13^2" },
        { text: "সাজিয়ে x² বের করি।", tex: "x^2+25=169\\Rightarrow x^2=144" },
        { text: "বর্গমূল নিই। ধনাত্মক ও ঋণাত্মক দুটোই সম্ভব।", tex: "x=\\pm12" },
        { text: "উত্তর: x = 12 অথবা x = −12।" },
      ],
    },
  ],
  concepts: [
    "î, ĵ, k̂ কেন পরস্পর লম্ব রাখা হয়? লম্ব না হলে উপাংশ বের করতে কী অসুবিধা হতো?",
    "একক ভেক্টরের কি মিটারের মতো কোনো ভৌত একক থাকে? কেন বা কেন নয়?",
    "দুটি ভেক্টর একই দিকে থাকলে তাদের একক ভেক্টরের মধ্যে কী সম্পর্ক? উল্টো দিকে থাকলে?",
  ],
  quiz: [
    { q: "একক ভেক্টরের মান কত?", options: ["0", "1", "10", "যেকোনো সংখ্যা"], answer: 1, why: "একক ভেক্টরের মান সংজ্ঞা অনুযায়ী ঠিক 1।" },
    { q: "6î + 8ĵ-এর মান কত?", options: ["14", "10", "48", "2"], answer: 1, why: "√(6² + 8²) = √100 = 10। 14 হলো সরাসরি যোগ করার ভুল।" },
    { q: "3î + 4ĵ-এর দিকে একক ভেক্টর কোনটি?", options: ["3î + 4ĵ", "(3î + 4ĵ)/5", "(3î + 4ĵ)/7", "(3î + 4ĵ)/25"], answer: 1, why: "মান 5, তাই 5 দিয়ে ভাগ করতে হয়।" },
    { q: "A⃗ = 2î + 3ĵ এবং B⃗ = î − ĵ হলে A⃗ + B⃗ কত?", options: ["3î + 2ĵ", "3î + 4ĵ", "î + 4ĵ", "2î + 3ĵ"], answer: 0, why: "î-এর সংখ্যা 2 + 1 = 3, ĵ-এর সংখ্যা 3 − 1 = 2।" },
    { q: "A⃗ = 3î − 4ĵ হলে Â-এর ĵ উপাংশ কত?", options: ["−4", "−0.8", "0.8", "−4/3"], answer: 1, why: "Â = (3î − 4ĵ) ÷ 5, তাই ĵ-এর সহগ −4/5 = −0.8। −4 হলো A⃗-এর নিজের উপাংশ।" },
  ],
};

export default function Anim() {
  const [ax, setAx] = useState(4);
  const [ay, setAy] = useState(3);
  const [bx, setBx] = useState(2);
  const [by, setBy] = useState(2);

  const S = 22;
  const m = mk(60, 255, S);
  const o = m(0, 0);
  const mag = Math.hypot(ax, ay);
  const uE = { x: o.x + (ax / mag) * S, y: o.y - (ay / mag) * S };
  const aE = m(ax, ay);
  const sumE = m(ax + bx, ay + by);

  const steps: LessonStep[] = [
    {
      title: "একক ভেক্টর î ও ĵ",
      text: "যে ভেক্টরের মান ঠিক 1, সে একক ভেক্টর। এর কাজ শুধু দিক দেখানো। x-অক্ষের দিকে একক ভেক্টরের নাম î (আই-হ্যাট), y-অক্ষের দিকে ĵ (জে-হ্যাট)। ত্রিমাত্রায় z-অক্ষের জন্য k̂ আছে।",
      note: "î মানে 'ডান দিকে ঠিক 1 ধাপ', ĵ মানে 'ওপর দিকে ঠিক 1 ধাপ'।",
    },
    {
      title: `î-কে ${ax} গুণ লম্বা করো`,
      text: `সংখ্যা দিয়ে গুণ করলে ভেক্টরের মান বাড়ে, দিক একই থাকে। î-কে ${ax} গুণ লম্বা করলে x-দিকে ${ax} একক পাই।`,
      tex: [`${ax}\\hat\\imath`],
    },
    {
      title: `ĵ-কে ${ay} গুণ লম্বা করো`,
      text: `এবার ĵ-কে ${ay} গুণ লম্বা করে ঠিক ওই মাথায় বসাই। y-দিকে ${ay} একক ওপরে উঠলাম।`,
      tex: [`${ay}\\hat\\jmath`],
    },
    {
      title: "জোড়া দিয়ে ভেক্টর A",
      text: "শুরু থেকে শেষ মাথা পর্যন্ত তীরটাই আমাদের ভেক্টর A। একে দুই দিকের অংশের যোগফল হিসেবে লেখা যায়। একেই বলে উপাংশ রূপ।",
      tex: [`\\vec A=${ax}\\hat\\imath+${ay}\\hat\\jmath`, "\\vec A=A_x\\hat\\imath+A_y\\hat\\jmath+A_z\\hat k"],
    },
    {
      title: "A-এর মান",
      text: "দুই অংশ সমকোণে আছে, তাই সমকোণী ত্রিভুজে পিথাগোরাস খাটে। ত্রিমাত্রায় z-অংশের বর্গও যোগ হয়।",
      tex: [`A=\\sqrt{${ax}^2+${ay}^2}=${f1(mag)}`, "A=\\sqrt{A_x^2+A_y^2+A_z^2}"],
    },
    {
      title: "A-এর দিকে একক ভেক্টর",
      text: "যেকোনো ভেক্টরকে তার নিজের মান দিয়ে ভাগ করলে মান ঠিক 1 হয়ে যায়, দিক একই থাকে। ফলে A-এর দিকের একক ভেক্টর Â পাই। ছবির বেগুনি ছোট তীরটা সেই একক ভেক্টর। তার মাথা সব সময় একক বৃত্তের ওপর।",
      tex: [`\\hat A=\\frac{\\vec A}{A}=\\frac{${ax}\\hat\\imath+${ay}\\hat\\jmath}{${f1(mag)}}`],
    },
    {
      title: "উপাংশ ধরে যোগ",
      text: `আরেকটা ভেক্টর B = ${bx}î + ${by}ĵ নিলাম। A আর B যোগ করতে একই দিকের অংশ যোগ করি। ছবিতে B-কে A-এর মাথায় বসানো হয়েছে। বিয়োগেও একইভাবে অংশ ধরে বিয়োগ হয়।`,
      tex: [`\\vec A+\\vec B=(${ax}+${bx})\\hat\\imath+(${ay}+${by})\\hat\\jmath=${ax + bx}\\hat\\imath+${ay + by}\\hat\\jmath`],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="একক ভেক্টর ও উপাংশ">
      <line x1={o.x} y1={o.y} x2={o.x + 11 * S} y2={o.y} strokeWidth={1.2} style={{ stroke: "var(--muted)" }} />
      <line x1={o.x} y1={o.y} x2={o.x} y2={o.y - 10 * S} strokeWidth={1.2} style={{ stroke: "var(--muted)" }} />
      <motion.circle
        initial={false}
        cx={o.x}
        cy={o.y}
        r={S}
        fill="none"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        animate={{ opacity: s === 5 ? 1 : 0 }}
        style={{ stroke: "var(--muted)" }}
      />

      <Vec a={o} b={m(s >= 1 ? ax : 1, 0)} c="p" w={4} />
      <Vec a={o} b={m(0, 1)} c="q" w={4} />
      <Vec a={m(ax, 0)} b={m(ax, s >= 2 ? ay : 0)} c="q" w={4} show={s >= 2} />
      <Seg a={o} b={aE} show={s >= 3 && s <= 5} c="r" w={4} head />
      <Square at={m(ax, 0)} d1={{ x: -1, y: 0 }} d2={{ x: 0, y: -1 }} show={s === 4} />
      <Vec a={o} b={uE} c="v" w={4.5} show={s === 5} />

      <Vec a={aE} b={sumE} c="u" w={3.5} show={s === 6} />
      <Vec a={o} b={m(bx, by)} c="u" dash show={s === 6} w={2} />
      <Seg a={o} b={sumE} show={s === 6} c="r" w={4} head />
      <Dot p={o} />

      <Lab p={add(m(s >= 1 ? ax / 2 : 0.5, 0), 0, 18)} c="p">{s >= 1 ? `${ax} î` : "î"}</Lab>
      <Lab p={add(m(0, 0.5), -10, 4)} c="q" anchor="end">{s >= 2 ? "ĵ" : "ĵ"}</Lab>
      <Lab p={add(m(ax, ay / 2), 12, 0)} show={s >= 2 && s <= 5} c="q" anchor="start">{`${ay} ĵ`}</Lab>
      <Lab p={add(mid(o, aE), -12, -10)} show={s >= 3 && s <= 5} c="r" anchor="end">{s >= 4 ? `A = ${f1(mag)}` : "A"}</Lab>
      <Lab p={add(uE, 8, -8)} show={s === 5} c="v" anchor="start">Â</Lab>
      <Lab p={add(mid(o, sumE), -12, -10)} show={s === 6} c="r" anchor="end">A + B</Lab>
      <Lab p={add(mid(aE, sumE), 12, 0)} show={s === 6} c="u" anchor="start">B</Lab>
    </Stage>
  );

  const extra = (
    <SliderCard>
      <Slider label="A-এর x অংশ" value={ax} min={1} max={6} onChange={setAx} />
      <Slider label="A-এর y অংশ" value={ay} min={1} max={6} onChange={setAy} />
      <Slider label="B-এর x অংশ" value={bx} min={1} max={4} onChange={setBx} />
      <Slider label="B-এর y অংশ" value={by} min={1} max={4} onChange={setBy} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
