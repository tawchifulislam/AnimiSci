"use client";

import { useState } from "react";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Chips } from "@/components/anim/controls";
import { Arc, Dot, Lab, Seg, SliderCard, Square, Stage, Vec, add, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "ডট গুণন যে একটা ছায়া আর দৈর্ঘ্যের গুণফল এবং ফল যে স্কেলার, তা বুঝবে। cosθ-এর সূত্র ও উপাংশের সূত্র দুটোই ব্যবহার করে ডট গুণন ও দুই ভেক্টরের মাঝের কোণ বের করতে পারবে।",
  hook: "একজন দড়ি দিয়ে একটা ঠেলাগাড়ি টানছে, দড়িটা একটু ওপর দিকে বাঁকা। দড়ির পুরো টানের কতটুকু গাড়িকে সামনে এগিয়ে নিচ্ছে? যতটুকু সামনে এগোচ্ছে, সেটাই টানের সামনের দিকের ছায়া। এই ছায়াকে সরণ দিয়ে গুণ করলে কাজ পাওয়া যায়। এই গুণটাই ডট গুণন।",
  formulas: [
    { tex: "\\vec A\\cdot\\vec B=AB\\cos\\theta", meaning: "θ হলো দুই ভেক্টরের মাঝের কোণ। ফল একটা সংখ্যা, ভেক্টর নয়।" },
    { tex: "\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z", meaning: "উপাংশ দিয়ে: একই দিকের উপাংশ গুণ করে যোগ।" },
    { tex: "\\cos\\theta=\\dfrac{\\vec A\\cdot\\vec B}{AB}", meaning: "দুই ভেক্টরের মাঝের কোণ বের করার সূত্র।" },
    { tex: "\\vec A\\cdot\\vec B=\\vec B\\cdot\\vec A,\\quad \\vec A\\cdot\\vec A=A^2", meaning: "ক্রম বদলালে ফল বদলায় না। নিজের সাথে ডট গুণন মানের বর্গ।" },
    { tex: "\\hat\\imath\\cdot\\hat\\imath=\\hat\\jmath\\cdot\\hat\\jmath=\\hat k\\cdot\\hat k=1,\\quad \\hat\\imath\\cdot\\hat\\jmath=\\hat\\jmath\\cdot\\hat k=\\hat k\\cdot\\hat\\imath=0", meaning: "একক ভেক্টরের নিয়ম। একই দিকে 1, লম্ব দিকে 0।" },
    { tex: "\\theta=0^\\circ,\\ 90^\\circ,\\ 180^\\circ:\\quad AB,\\ 0,\\ -AB", meaning: "তিন বিশেষ কোণে ডট গুণনের মান।" },
  ],
  example: {
    problem: "(ক) A⃗ = 3î + 4ĵ এবং B⃗ = 4î + 3ĵ হলে A⃗·B⃗ এবং তাদের মাঝের কোণ বের করো। (খ) C⃗ = 2î + 3ĵ ও D⃗ = 3î − 2ĵ কি পরস্পর লম্ব?",
    steps: [
      { text: "(ক) একই দিকের উপাংশ গুণ করে যোগ করি।", tex: "\\vec A\\cdot\\vec B=3\\times4+4\\times3=24" },
      { text: "দুজনের মানই 5।", tex: "A=\\sqrt{3^2+4^2}=5,\\quad B=\\sqrt{4^2+3^2}=5" },
      { text: "এবার কোণ বের করি।", tex: "\\cos\\theta=\\frac{24}{5\\times5}=0.96\\Rightarrow\\theta=16.3^\\circ" },
      { text: "(খ) লম্ব হলে ডট গুণন শূন্য হয়। তাই C⃗·D⃗ বের করি।", tex: "\\vec C\\cdot\\vec D=2\\times3+3\\times(-2)=6-6=0" },
      { text: "উত্তর: (ক) ডট গুণন 24, কোণ 16.3°। (খ) হ্যাঁ, ভেক্টর দুটি পরস্পর লম্ব।" },
    ],
  },
  mistakes: [
    "ডট গুণনের ফলকে ভেক্টর ভাবা। ফল একটা সাধারণ সংখ্যা।",
    "AB cosθ-তে θ ভুল নেওয়া। দুই ভেক্টরের লেজ একই বিন্দুতে রেখে মাঝের কোণ নিতে হয়।",
    "উপাংশে গুণ করার সময় î-এর সংখ্যার সাথে ĵ-এর সংখ্যা গুণ করা। শুধু একই দিকের সংখ্যা গুণ হয়।",
    "ডট গুণন শূন্য হলে একটা ভেক্টর শূন্য ভাবা। দুটোই অশূন্য থাকলে ফল শূন্য মানে তারা লম্ব।",
  ],
  recap: [
    "ডট গুণন = A × (B-এর ছায়া A-এর ওপর) = AB cosθ। ফল স্কেলার।",
    "θ = 0° হলে AB, 90° হলে 0, 180° হলে −AB। লম্ব মানে ডট গুণন শূন্য।",
    "উপাংশে: AxBx + AyBy + AzBz। একক ভেক্টরের নিজের সাথে 1, অন্যটির সাথে 0।",
    "কোণ বের করতে cosθ = (A·B) ÷ (AB)। কাজ W = F·s এর একটি উদাহরণ।",
  ],
  quiz: [
    { q: "θ = 90° হলে A⃗·B⃗ কত?", options: ["AB", "0", "−AB", "A + B"], answer: 1, why: "cos 90° = 0, তাই লম্ব ভেক্টরের ডট গুণন শূন্য।" },
    { q: "A⃗ = 2î + 3ĵ এবং B⃗ = î + 4ĵ হলে A⃗·B⃗ কত?", options: ["14", "11", "10", "12"], answer: 0, why: "2 × 1 + 3 × 4 = 2 + 12 = 14। 11 হলো গুণের বদলে যোগ করার ভুল।" },
    { q: "ডট গুণনের ফল কোন ধরনের রাশি?", options: ["ভেক্টর", "স্কেলার", "একক ভেক্টর", "শূন্য ভেক্টর"], answer: 1, why: "AB cosθ একটা সাধারণ সংখ্যা। এতে কোনো দিক নেই।" },
    { q: "A⃗ = 3î + 4ĵ হলে A⃗·A⃗ কত?", options: ["7", "5", "25", "12"], answer: 2, why: "A⃗·A⃗ = A² = 5² = 25। অথবা 3 × 3 + 4 × 4 = 25।" },
  ],
};

export default function Anim() {
  const [a, setA] = useState(6);
  const [b, setB] = useState(5);
  const [th, setTh] = useState(50);

  const S = 22;
  const m = mk(200, 190, S);
  const o = m(0, 0);
  const c = Math.cos(rad(th));
  const sn = Math.sin(rad(th));
  const aE = m(a, 0);
  const bE = m(b * c, b * sn);
  const foot = m(b * c, 0);
  const sh = b * c;
  const dp = a * b * c;
  const dir = foot.x > o.x ? -1 : 1;

  const steps: LessonStep[] = [
    {
      title: "ছায়ার গল্প",
      text: "ছবিতে নীল A আর সবুজ B একই বিন্দু থেকে আঁকা, মাঝের কোণ θ। A-এর রেখার ওপর দিক থেকে আলো ফেললে B-এর একটা ছায়া সেই রেখায় পড়ে।",
    },
    {
      title: "ছায়া আঁকো",
      text: "B-এর মাথা থেকে A-এর রেখায় লম্ব নামাই। শুরু থেকে লম্বের পা পর্যন্ত হলুদ অংশটাই ছায়া। ছায়ার দৈর্ঘ্য B cosθ।",
      tex: ["s=B\\cos\\theta", `s=${b}\\cos${th}^\\circ=${f1(sh)}`],
    },
    {
      title: "ছায়া × A",
      text: "A-এর দৈর্ঘ্যকে B-এর ছায়া দিয়ে গুণ করলে ডট গুণন পাই।",
      tex: ["\\vec A\\cdot\\vec B=A\\times(B\\cos\\theta)", "\\vec A\\cdot\\vec B=AB\\cos\\theta", `\\vec A\\cdot\\vec B=${a}\\times${f1(sh)}=${f1(dp)}`],
    },
    {
      title: "তিন বিশেষ কোণ",
      text: "θ = 0° হলে ছায়া পুরো B, তাই AB। θ = 90° হলে ছায়া শূন্য, তাই 0। θ = 180° হলে ছায়া উল্টো দিকে, তাই −AB। নিচের বোতামে চাপো।",
      tex: ["\\theta=0^\\circ:\\ AB", "\\theta=90^\\circ:\\ 0", "\\theta=180^\\circ:\\ -AB"],
    },
    {
      title: "ফল স্কেলার",
      text: "ফলটা একটা সংখ্যা, কোনো দিক নেই। ক্রম বদলালেও একই: A-কে B-এর ছায়া দিয়ে গুণ করো বা B-কে A-এর ছায়া দিয়ে, ফল সমান।",
      tex: ["\\vec A\\cdot\\vec B=\\vec B\\cdot\\vec A"],
    },
    {
      title: "উপাংশ দিয়ে",
      text: "ছবি না থাকলে উপাংশ দিয়ে করো। একই দিকের সংখ্যা গুণ করো, তারপর যোগ করো। কারণ î·î = 1 এবং î·ĵ = 0।",
      tex: ["\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z", "\\hat\\imath\\cdot\\hat\\imath=1,\\quad\\hat\\imath\\cdot\\hat\\jmath=0"],
    },
    {
      title: "কোণ বের করা",
      text: "ডট গুণন আর দুই মান জানলে মাঝের কোণ বের হয়। ফল শূন্য হলে কোণ 90°।",
      tex: ["\\cos\\theta=\\frac{\\vec A\\cdot\\vec B}{AB}", `\\cos\\theta=\\frac{${f1(dp)}}{${a}\\times${b}}=${f1(c)}`],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="ডট গুণন ও ছায়ার দৈর্ঘ্য">
      <line x1={20} y1={o.y} x2={420} y2={o.y} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: "var(--line-2)" }} />
      <g opacity={0.5}>
        <Seg a={o} b={foot} show={s >= 1} c="u" w={11} />
      </g>
      <Seg a={bE} b={foot} show={s >= 1} dash c="m" w={1.5} />
      <Square at={foot} d1={{ x: dir, y: 0 }} d2={{ x: 0, y: -1 }} show={s >= 1 && Math.abs(sh) > 0.3} />
      <Arc o={o} r={32} from={0} to={th} c="f" w={1.5} />
      <Vec a={o} b={aE} c="p" w={4} />
      <Vec a={o} b={bE} c="q" w={4} />
      <Dot p={o} />

      <Lab p={add(aE, 10, 20)} c="p" anchor="start">A = {a}</Lab>
      <Lab p={add(bE, 8, -8)} c="q" anchor="start">B = {b}</Lab>
      <Lab p={pol(o, th / 2, 52)}>θ</Lab>
      <Lab p={add(mid(o, foot), 0, 28)} show={s >= 1} c="u">B cosθ = {f1(sh)}</Lab>
      <Lab p={{ x: 20, y: 28 }} anchor="start" show={s >= 2} c="r">A·B = {f1(dp)}</Lab>
    </Stage>
  );

  const extra = (
    <div className="grid gap-3">
      <SliderCard>
        <Slider label="A-এর মান" value={a} min={2} max={7} onChange={setA} />
        <Slider label="B-এর মান" value={b} min={1} max={7} onChange={setB} />
        <Slider label="মাঝের কোণ θ" value={th} min={0} max={180} suffix="°" onChange={setTh} />
      </SliderCard>
      <Chips label="দ্রুত কোণ" value={th} options={[0, 30, 60, 90, 120, 180].map((k) => ({ key: k, name: `${k}°` }))} onChange={setTh} />
    </div>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
