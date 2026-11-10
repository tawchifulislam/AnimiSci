"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Chips } from "@/components/anim/controls";
import { Arc, Dot, Lab, Seg, SliderCard, Square, Stage, Vec, add, col, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "ক্রস গুণনের মান ও দিক দুটোই বের করতে পারবে, সামান্তরিকের ক্ষেত্রফলের সাথে সম্পর্কটা বুঝবে এবং ডান হাতের নিয়ম ও ডিটারমিন্যান্ট ব্যবহার করতে পারবে।",
  hook: "দরজা খুলতে কব্জার কাছে ঠেললে কষ্ট হয়, কিনারায় ঠেললে সহজে খোলে। আবার দরজার সমান্তরালে ঠেললে একেবারেই খোলে না। দূরত্ব, বল আর তাদের মাঝের কোণ, এই তিনটে মিলে ঘোরানোর ক্ষমতা ঠিক করে। এই হিসাবটাই ক্রস গুণন।",
  formulas: [
    { tex: "\\vec A\\times\\vec B=AB\\sin\\theta\\,\\hat n", meaning: "মান AB sinθ। দিক n̂ ঠিক হয় ডান হাতের নিয়মে।" },
    { tex: "|\\vec A\\times\\vec B|=AB\\sin\\theta", meaning: "মান A ও B বাহুর সামান্তরিকের ক্ষেত্রফলের সমান।" },
    { tex: "\\vec A\\times\\vec B=-\\vec B\\times\\vec A", meaning: "ক্রম উল্টালে দিক উল্টে যায়, মান একই থাকে।" },
    { tex: "\\hat\\imath\\times\\hat\\jmath=\\hat k,\\ \\hat\\jmath\\times\\hat k=\\hat\\imath,\\ \\hat k\\times\\hat\\imath=\\hat\\jmath", meaning: "একক ভেক্টরের চক্র। উল্টো ক্রমে চিহ্ন বদলে যায়।" },
    { tex: "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\A_x&A_y&A_z\\\\B_x&B_y&B_z\\end{vmatrix}", meaning: "ডিটারমিন্যান্ট দিয়ে উপাংশে বের করার নিয়ম।" },
    { tex: "\\vec A\\parallel\\vec B\\ \\Leftrightarrow\\ \\vec A\\times\\vec B=\\vec 0", meaning: "সমান্তরাল হলে ক্রস গুণন শূন্য ভেক্টর। তাই A⃗ × A⃗ = 0⃗।" },
  ],
  example: {
    problem: "A⃗ = î + 2ĵ + 3k̂ এবং B⃗ = 4î + 5ĵ + 6k̂ হলে A⃗ × B⃗ এবং সামান্তরিকের ক্ষেত্রফল বের করো।",
    steps: [
      { text: "ডিটারমিন্যান্ট সাজাই।", tex: "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\1&2&3\\\\4&5&6\\end{vmatrix}" },
      { text: "î-এর সহগ: î-এর কলাম বাদ দিয়ে বাকি চারটি সংখ্যার কর্ণ-গুণ।", tex: "\\hat\\imath(2\\times6-3\\times5)=\\hat\\imath(12-15)=-3\\hat\\imath" },
      { text: "ĵ-এর সহগে মাঝের পদ বলে বিয়োগ চিহ্ন বসে।", tex: "-\\hat\\jmath(1\\times6-3\\times4)=-\\hat\\jmath(6-12)=6\\hat\\jmath" },
      { text: "k̂-এর সহগ।", tex: "\\hat k(1\\times5-2\\times4)=\\hat k(5-8)=-3\\hat k" },
      { text: "ফল ও মান বের করি। মানই সামান্তরিকের ক্ষেত্রফল।", tex: "\\vec A\\times\\vec B=-3\\hat\\imath+6\\hat\\jmath-3\\hat k,\\quad |\\vec A\\times\\vec B|=\\sqrt{9+36+9}=\\sqrt{54}=7.35" },
      { text: "যাচাই: ফলটা A আর B দুজনেরই লম্ব, তাই ডট গুণন শূন্য হওয়া উচিত।", tex: "\\vec A\\cdot(\\vec A\\times\\vec B)=-3+12-9=0" },
    ],
  },
  mistakes: [
    "A × B আর B × A এক ভাবা। মান এক, কিন্তু দিক উল্টো।",
    "ডিটারমিন্যান্টে ĵ-এর চিহ্ন ভুলে যাওয়া। মাঝের পদে বিয়োগ বসে।",
    "sinθ-এর জায়গায় cosθ বসানো। ডট গুণনে cos, ক্রস গুণনে sin।",
    "ক্রস গুণনের ফলকে সংখ্যা ভাবা। ফল একটা ভেক্টর।",
  ],
  recap: [
    "ক্রস গুণনের মান AB sinθ, যা সামান্তরিকের ক্ষেত্রফল। ফল একটা ভেক্টর।",
    "দিক সামান্তরিকের তলের লম্ব, ডান হাতের নিয়মে। A থেকে B-তে ঘোরালে বুড়ো আঙুল দিক দেখায়।",
    "A × B = −(B × A)। সমান্তরাল ভেক্টরের ক্রস গুণন শূন্য ভেক্টর।",
    "উপাংশে বের করতে ডিটারমিন্যান্ট। î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ।",
  ],
  quiz: [
    { q: "A⃗ ও B⃗ সমান্তরাল হলে |A⃗ × B⃗| কত?", options: ["AB", "0", "A + B", "A/B"], answer: 1, why: "সমান্তরালে θ = 0° বা 180°, sinθ = 0। তাই মান শূন্য।" },
    { q: "î × ĵ = ?", options: ["k̂", "−k̂", "শূন্য ভেক্টর", "1"], answer: 0, why: "চক্র অনুযায়ী î × ĵ = k̂। উল্টো ক্রম ĵ × î হলে −k̂ হতো।" },
    { q: "দুই ভেক্টরের মাঝের কোণ কত হলে |A⃗ × B⃗| সবচেয়ে বড় হয়?", options: ["0°", "45°", "90°", "180°"], answer: 2, why: "sinθ-এর সর্বোচ্চ মান 1, যা θ = 90° এ পাওয়া যায়।" },
    { q: "A = 2, B = 3 এবং θ = 30° হলে A ও B বাহুর সামান্তরিকের ক্ষেত্রফল কত?", options: ["6", "3", "5.2", "1.5"], answer: 1, why: "ক্ষেত্রফল = AB sinθ = 2 × 3 × 0.5 = 3। 5.2 হলো sin-এর বদলে cos বসানোর ভুল ফল।" },
  ],
};

export default function Anim() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(4);
  const [th, setTh] = useState(55);

  const S = 22;
  const m = mk(190, 215, S);
  const o = m(0, 0);
  const c = Math.cos(rad(th));
  const sn = Math.sin(rad(th));
  const aE = m(a, 0);
  const bE = m(b * c, b * sn);
  const abE = m(a + b * c, b * sn);
  const foot = m(b * c, 0);
  const h = b * sn;
  const area = a * b * sn;
  const c0 = mid(o, abE);
  const side = c >= 0 ? 1 : -1;

  const steps: LessonStep[] = [
    {
      title: "দুই ভেক্টর",
      text: "ছবিতে নীল A আর সবুজ B একই বিন্দু থেকে আঁকা, মাঝের কোণ θ। দরজার গল্পে A হলো কব্জা থেকে দূরত্ব, B হলো ঠেলার বল।",
    },
    {
      title: "সামান্তরিক",
      text: "A আর B-কে দুই বাহু ধরে সামান্তরিক পূর্ণ করি। লাল রঙের অংশটাই সামান্তরিক।",
    },
    {
      title: "উচ্চতা",
      text: "B-এর মাথা থেকে A-এর রেখায় লম্ব টানি। এই উচ্চতা h = B sinθ।",
      tex: ["h=B\\sin\\theta", `h=${b}\\sin${th}^\\circ=${f1(h)}`],
    },
    {
      title: "ক্ষেত্রফল",
      text: "সামান্তরিকের ক্ষেত্রফল হলো ভূমি × উচ্চতা, অর্থাৎ A × B sinθ। এটাই ক্রস গুণনের মান।",
      tex: ["\\text{Area}=A\\cdot B\\sin\\theta", "|\\vec A\\times\\vec B|=AB\\sin\\theta", `|\\vec A\\times\\vec B|=${a}\\times${f1(h)}=${f1(area)}`],
    },
    {
      title: "দিক: ডান হাতের নিয়ম",
      text: "ফলের দিক সামান্তরিকের তলের লম্ব। ডান হাতের চার আঙুল A থেকে B-র দিকে ঘোরালে বুড়ো আঙুল যেদিকে থাকে, সেটাই দিক। ছবিতে A থেকে B উল্টো ঘড়ির দিকে ঘুরেছে, তাই দিক কাগজ থেকে বেরিয়ে আসছে। এই চিহ্নটা ⊙।",
    },
    {
      title: "ক্রম উল্টালে",
      text: "B × A করলে B থেকে A-তে ঘুরতে হয়, ঘড়ির কাঁটার দিকে। তাই দিক কাগজের ভেতরে ঢুকছে। এই চিহ্ন ⊗। মান একই, দিক উল্টো।",
      tex: ["\\vec A\\times\\vec B=-\\vec B\\times\\vec A"],
    },
    {
      title: "বিশেষ কোণ",
      text: "θ = 0° বা 180° হলে sinθ = 0, তাই সামান্তরিক চ্যাপ্টা হয়ে যায় আর ক্রস গুণন শূন্য। θ = 90° হলে সামান্তরিকের ক্ষেত্রফল সবচেয়ে বড়। নিচের বোতামে চাপো।",
      tex: ["\\theta=0^\\circ,180^\\circ:\\ 0", "\\theta=90^\\circ:\\ AB"],
    },
    {
      title: "উপাংশ দিয়ে",
      text: "ছবি না থাকলে ডিটারমিন্যান্ট। আগে একক ভেক্টরের চক্র মনে রাখো: î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ।",
      tex: ["\\hat\\imath\\times\\hat\\jmath=\\hat k,\\ \\hat\\jmath\\times\\hat k=\\hat\\imath,\\ \\hat k\\times\\hat\\imath=\\hat\\jmath", "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\A_x&A_y&A_z\\\\B_x&B_y&B_z\\end{vmatrix}"],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="ক্রস গুণন ও সামান্তরিকের ক্ষেত্রফল">
      <motion.polygon
        initial={false}
        points={`${o.x},${o.y} ${aE.x},${aE.y} ${abE.x},${abE.y} ${bE.x},${bE.y}`}
        animate={{ opacity: s >= 1 ? 0.18 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ fill: "var(--c-r)" }}
      />
      <Seg a={aE} b={abE} show={s >= 1} dash c="m" w={1.5} />
      <Seg a={bE} b={abE} show={s >= 1} dash c="m" w={1.5} />
      <Seg a={bE} b={foot} show={s >= 2} dash c="u" w={2.5} />
      <Square at={foot} d1={{ x: -side, y: 0 }} d2={{ x: 0, y: -1 }} show={s >= 2 && Math.abs(b * c) > 0.3} />
      <Arc o={o} r={32} from={0} to={th} c="f" w={1.5} />
      <Vec a={o} b={aE} c="p" w={4} />
      <Vec a={o} b={bE} c="q" w={4} />
      <Dot p={o} />

      {s === 4 ? (
        <g>
          <circle cx={c0.x} cy={c0.y} r={13} fill="none" strokeWidth={2.5} style={{ stroke: col.r }} />
          <circle cx={c0.x} cy={c0.y} r={3.5} style={{ fill: col.r }} />
        </g>
      ) : null}
      {s === 5 ? (
        <g>
          <circle cx={c0.x} cy={c0.y} r={13} fill="none" strokeWidth={2.5} style={{ stroke: col.r }} />
          <line x1={c0.x - 7} y1={c0.y - 7} x2={c0.x + 7} y2={c0.y + 7} strokeWidth={2.5} strokeLinecap="round" style={{ stroke: col.r }} />
          <line x1={c0.x - 7} y1={c0.y + 7} x2={c0.x + 7} y2={c0.y - 7} strokeWidth={2.5} strokeLinecap="round" style={{ stroke: col.r }} />
        </g>
      ) : null}
      <Lab p={add(c0, 0, 34)} show={s === 4 || s === 5} c="r">{s === 5 ? "B × A" : "A × B"}</Lab>

      <Lab p={add(aE, 10, 20)} c="p" anchor="start">A = {a}</Lab>
      <Lab p={add(bE, 8, -8)} c="q" anchor="start">B = {b}</Lab>
      <Lab p={pol(o, th / 2, 52)}>θ</Lab>
      <Lab p={add(mid(bE, foot), 10 * side, 4)} show={s >= 2} c="u" anchor={side > 0 ? "start" : "end"}>h = {f1(h)}</Lab>
      <Lab p={{ x: 20, y: 28 }} anchor="start" show={s >= 3} c="r">|A × B| = {f1(area)}</Lab>
    </Stage>
  );

  const extra = (
    <div className="grid gap-3">
      <SliderCard>
        <Slider label="A-এর মান" value={a} min={2} max={5} onChange={setA} />
        <Slider label="B-এর মান" value={b} min={1} max={5} onChange={setB} />
        <Slider label="মাঝের কোণ θ" value={th} min={0} max={180} suffix="°" onChange={setTh} />
      </SliderCard>
      <Chips label="দ্রুত কোণ" value={th} options={[0, 30, 90, 150, 180].map((k) => ({ key: k, name: `${k}°` }))} onChange={setTh} />
    </div>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
