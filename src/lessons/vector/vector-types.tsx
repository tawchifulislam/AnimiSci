"use client";

import { useState } from "react";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Dot, Lab, Seg, SliderCard, Stage, Vec, add, mid, mk, type Col, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1 } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "সমান, বিপরীত, শূন্য, একক, অবস্থান ও সমান্তরাল ভেক্টর চিনবে এবং প্রতিটির নিয়ম বলতে পারবে।",
  hook: "দুই ভাই ঠিক একই গতিতে একই দিকে হাঁটছে, একজন সামনে আরেকজন পেছনে। তাদের বেগ কি আলাদা? না। বেগ একই, কারণ মান ও দিক একই। ভেক্টরের পরিচয় জায়গায় নয়, মান আর দিকে। এই কথাটা বুঝলে ভেক্টরের প্রকারভেদ জলের মতো সহজ।",
  formulas: [
    { tex: "-\\vec A", meaning: "A-এর বিপরীত ভেক্টর: মান সমান, দিক ঠিক উল্টো।" },
    { tex: "\\vec A+(-\\vec A)=\\vec 0", meaning: "বিপরীত দুটি যোগ করলে শূন্য ভেক্টর পাওয়া যায়, সাধারণ সংখ্যা 0 নয়।" },
    { tex: "\\hat A=\\dfrac{\\vec A}{|\\vec A|}", meaning: "A-এর দিকে একক ভেক্টর, মান ঠিক 1।" },
    { tex: "\\vec r=x\\hat\\imath+y\\hat\\jmath", meaning: "(x, y) বিন্দুর অবস্থান ভেক্টর, শুরু মূলবিন্দুতে।" },
    { tex: "\\vec B=k\\vec A", meaning: "সমান্তরাল ভেক্টর। k ধনাত্মক হলে একই দিক, ঋণাত্মক হলে উল্টো দিক।" },
  ],
  example: {
    problem: "A⃗ = 3î + 4ĵ। (ক) A⃗-এর বিপরীত ভেক্টর কী? (খ) A⃗-এর দিকে একক ভেক্টর বের করো। (গ) A⃗-এর সমান্তরাল এবং মান 10 এমন একটি ভেক্টর বের করো।",
    steps: [
      { text: "(ক) বিপরীত ভেক্টরে প্রতিটি উপাংশের চিহ্ন উল্টে যায়।", tex: "-\\vec A=-3\\hat\\imath-4\\hat\\jmath" },
      { text: "(খ) আগে মান বের করি, তারপর ভাগ করি।", tex: "A=\\sqrt{3^2+4^2}=5,\\quad \\hat A=\\frac{3\\hat\\imath+4\\hat\\jmath}{5}=0.6\\hat\\imath+0.8\\hat\\jmath" },
      { text: "(গ) একক ভেক্টরকে 10 দিয়ে গুণ করলে মান 10 হয়, দিক একই থাকে।", tex: "10\\hat A=6\\hat\\imath+8\\hat\\jmath" },
      { text: "যাচাই: √(6² + 8²) = 10। উল্টো দিকেরটাও (−6î − 8ĵ) সমান্তরাল ও মান 10, তাই সেটাও সঠিক উত্তর।" },
    ],
  },
  mistakes: [
    "শূন্য ভেক্টরকে সাধারণ সংখ্যা 0 ভাবা। শূন্য ভেক্টর একটা ভেক্টর, তার মান শূন্য।",
    "'মান সমান হলেই ভেক্টর সমান' ভাবা। দিকও সমান হতে হবে।",
    "একক ভেক্টর মানে 'ছোট ভেক্টর' ভাবা। একক ভেক্টরের মান ঠিক 1, ছোট বা বড় নয়।",
    "অবস্থান ভেক্টরের শুরু যেকোনো জায়গায় ধরা। অবস্থান ভেক্টর সব সময় মূলবিন্দু থেকে শুরু।",
  ],
  recap: [
    "সমান ভেক্টর: মান ও দিক দুটোই এক। জায়গা বদলালে ভেক্টর বদলায় না।",
    "বিপরীত ভেক্টর: মান এক, দিক উল্টো। শূন্য ভেক্টর: মান শূন্য, দিক নেই।",
    "একক ভেক্টর: মান 1, কাজ শুধু দিক দেখানো। অবস্থান ভেক্টর: মূলবিন্দু থেকে বিন্দু পর্যন্ত।",
    "সমান্তরাল ভেক্টর: একটি আরেকটির কোনো সংখ্যা গুণিতক।",
  ],
  quiz: [
    { q: "A⃗ ও −A⃗ যোগ করলে কী পাওয়া যায়?", options: ["2A⃗", "শূন্য ভেক্টর", "সংখ্যা 0 (স্কেলার)", "একক ভেক্টর"], answer: 1, why: "ফল একটা ভেক্টর, যার মান শূন্য। এর নাম শূন্য ভেক্টর। এটা সাধারণ সংখ্যা 0 নয়।" },
    { q: "একক ভেক্টরের মান কত?", options: ["0", "1", "A", "অসীম"], answer: 1, why: "একক ভেক্টরের সংজ্ঞাই হলো মান ঠিক 1।" },
    { q: "(2, 3) বিন্দুর অবস্থান ভেক্টর কোনটি?", options: ["2î + 3ĵ", "3î + 2ĵ", "5î", "2î − 3ĵ"], answer: 0, why: "x = 2 হলে î-এর সহগ 2, y = 3 হলে ĵ-এর সহগ 3।" },
    { q: "দুই ভেক্টরের মান সমান কিন্তু দিক আলাদা। তারা কি সমান ভেক্টর?", options: ["হ্যাঁ", "না, দিকও সমান হতে হবে", "শুধু বিপরীত হলে হ্যাঁ", "বলা যায় না"], answer: 1, why: "সমান ভেক্টরের জন্য মান ও দিক দুটোই এক হতে হয়।" },
  ],
};

type Arrow = { a: Pt; b: Pt; c: Col; show: boolean; label?: string; dash?: boolean };
const P = (x: number, y: number): Pt => ({ x, y });
const NONE: Arrow = { a: P(0, 0), b: P(0, 0), c: "f", show: false };

function scene(s: number, px: number, py: number): Arrow[] {
  const m = mk(60, 235, 24);
  if (s === 0)
    return [
      { a: P(70, 90), b: P(170, 50), c: "p", show: true, label: "A" },
      { a: P(70, 170), b: P(170, 130), c: "q", show: true, label: "B" },
      { a: P(260, 170), b: P(330, 110), c: "u", show: true, label: "C" },
    ];
  if (s === 1)
    return [
      { a: P(70, 90), b: P(170, 50), c: "p", show: true, label: "A = B" },
      { a: P(70, 90), b: P(170, 50), c: "q", show: true },
      { a: P(260, 170), b: P(330, 110), c: "u", show: false },
    ];
  if (s === 2)
    return [
      { a: P(220, 130), b: P(320, 90), c: "p", show: true, label: "A" },
      { a: P(220, 130), b: P(120, 170), c: "r", show: true, label: "−A" },
      NONE,
    ];
  if (s === 3)
    return [
      { a: P(120, 130), b: P(220, 90), c: "p", show: true, label: "A" },
      { a: P(220, 98), b: P(120, 138), c: "r", show: true, label: "−A" },
      NONE,
    ];
  if (s === 4)
    return [
      { a: P(60, 200), b: P(160, 160), c: "p", show: true, label: "A" },
      { a: P(60, 200), b: P(97.1, 185.1), c: "v", show: true, label: "Â" },
      NONE,
    ];
  if (s === 5)
    return [
      { a: m(0, 0), b: m(px, py), c: "r", show: true, label: "r" },
      { a: m(0, 0), b: m(px, 0), c: "p", show: true, dash: true },
      { a: m(px, 0), b: m(px, py), c: "q", show: true, dash: true },
    ];
  return [
    { a: P(40, 230), b: P(140, 190), c: "p", show: true, label: "A" },
    { a: P(40, 170), b: P(240, 90), c: "v", show: true, label: "2A" },
    { a: P(400, 60), b: P(250, 120), c: "r", show: true, label: "−1.5A" },
  ];
}

export default function Anim() {
  const [px, setPx] = useState(4);
  const [py, setPy] = useState(3);

  const steps: LessonStep[] = [
    {
      title: "এই তীরগুলো দেখো",
      text: "ভেক্টর অনেক রকমের হয়। নাম জানা থাকলে প্রশ্ন পড়েই বোঝা যায় কী করতে হবে। ছবিতে তিনটা তীর আছে। A আর B দেখতে কেমন? C কি এদের মতো?",
    },
    {
      title: "সমান ভেক্টর",
      text: "যে দুই ভেক্টরের মান ও দিক দুটোই এক, তারা সমান ভেক্টর, জায়গা যেখানেই থাকুক। B-কে নিজের সমান্তরালে সরিয়ে A-এর ওপর বসালে হুবহু মিলে যায়। ভেক্টর জায়গা বদলালে বদলায় না।",
      tex: ["\\vec A=\\vec B"],
      note: "পরের পাঠে এই কারণেই Q-কে সরিয়ে P-এর মাথায় বসানো যাবে।",
    },
    {
      title: "বিপরীত ভেক্টর",
      text: "মান সমান কিন্তু দিক ঠিক উল্টো হলে তাদের একে অপরের বিপরীত ভেক্টর বলে। A-এর বিপরীত ভেক্টরকে −A লিখি।",
      tex: ["-\\vec A", "|-\\vec A|=|\\vec A|"],
    },
    {
      title: "শূন্য ভেক্টর",
      text: "A আর −A জোড়া দিলে তীর যেখান থেকে শুরু হয়েছিল সেখানেই ফিরে আসে। ফল একটা বিন্দু, যার মান শূন্য এবং কোনো নির্দিষ্ট দিক নেই। এটাই শূন্য ভেক্টর।",
      tex: ["\\vec A+(-\\vec A)=\\vec 0"],
      note: "শূন্য ভেক্টর একটা ভেক্টর, সাধারণ সংখ্যা 0 নয়। তাই এর মাথায় তীর চিহ্ন বসে।",
    },
    {
      title: "একক ভেক্টর",
      text: "যে ভেক্টরের মান ঠিক 1, সে একক ভেক্টর। তার কাজ শুধু দিক দেখানো। যেকোনো ভেক্টরকে তার নিজের মান দিয়ে ভাগ করলে তার দিকের একক ভেক্টর পাওয়া যায়।",
      tex: ["\\hat A=\\frac{\\vec A}{|\\vec A|}"],
      note: "মাথার টুপি চিহ্ন (^) মানে একক ভেক্টর।",
    },
    {
      title: "অবস্থান ভেক্টর",
      text: `মূলবিন্দু থেকে কোনো বিন্দু পর্যন্ত টানা তীরই ওই বিন্দুর অবস্থান ভেক্টর। বিন্দুটি (${px}, ${py}) হলে অবস্থান ভেক্টর ${px} একক ডানে আর ${py} একক ওপরে। স্লাইডারে বিন্দু সরিয়ে দেখো।`,
      tex: [`\\vec r=${px}\\hat\\imath+${py}\\hat\\jmath`, `|\\vec r|=\\sqrt{${px}^2+${py}^2}=${f1(Math.hypot(px, py))}`],
    },
    {
      title: "সমান্তরাল ভেক্টর",
      text: "দুই ভেক্টরের দিক এক বা ঠিক উল্টো হলে তারা সমান্তরাল, মান যেমনই হোক। একটাকে কোনো সংখ্যা দিয়ে গুণ করলেই অন্যটা পাওয়া যায়।",
      tex: ["\\vec B=k\\vec A"],
      note: "k ধনাত্মক হলে একই দিক, ঋণাত্মক হলে উল্টো দিক।",
    },
  ];

  const figure = (s: number) => {
    const arrows = scene(s, px, py);
    const m = mk(60, 235, 24);
    const o = m(0, 0);
    return (
      <Stage w={440} h={290} label="ভেক্টরের বিভিন্ন প্রকার">
        {s === 5 ? (
          <>
            <line x1={o.x} y1={o.y} x2={o.x + 10 * 24} y2={o.y} strokeWidth={1.5} style={{ stroke: "var(--muted)" }} />
            <line x1={o.x} y1={o.y} x2={o.x} y2={o.y - 8 * 24} strokeWidth={1.5} style={{ stroke: "var(--muted)" }} />
            <Lab p={{ x: o.x + 10 * 24, y: o.y + 16 }} anchor="end" c="m">x</Lab>
            <Lab p={{ x: o.x + 8, y: o.y - 8 * 24 }} anchor="start" c="m">y</Lab>
            <Dot p={m(px, py)} c="r" r={5} />
            <Lab p={add(m(px, py), 10, -8)} anchor="start" c="r">({px}, {py})</Lab>
          </>
        ) : null}
        {s === 4 ? (
          <>
            <circle cx={60} cy={200} r={40} fill="none" strokeWidth={1.2} strokeDasharray="4 4" style={{ stroke: "var(--muted)" }} />
            <Seg a={P(260, 250)} b={P(300, 250)} c="f" w={4} />
            <Lab p={P(280, 270)}>1 একক</Lab>
          </>
        ) : null}
        {arrows.map((r, i) => (
          <Vec key={`v${i}`} a={r.a} b={r.b} c={r.c} show={r.show} dash={r.dash} />
        ))}
        {arrows.map((r, i) => (
          <Lab key={`l${i}`} p={add(mid(r.a, r.b), 0, -12)} show={r.show && !!r.label} c={r.c}>
            {r.label ?? ""}
          </Lab>
        ))}
        <Dot p={P(120, 130)} c="r" r={9} show={s === 3} />
        <Lab p={P(120, 112)} show={s === 3} c="r">শূন্য ভেক্টর</Lab>
        <Lab p={P(220, 40)} show={s === 1}>A = B (মান ও দিক এক)</Lab>
        <Lab p={P(220, 40)} show={s === 2}>মান এক, দিক উল্টো</Lab>
      </Stage>
    );
  };

  const extra = (
    <SliderCard>
      <Slider label="অবস্থান ভেক্টরের বিন্দু: x (ধাপ ৬)" value={px} min={1} max={9} onChange={setPx} />
      <Slider label="অবস্থান ভেক্টরের বিন্দু: y (ধাপ ৬)" value={py} min={1} max={7} onChange={setPy} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
