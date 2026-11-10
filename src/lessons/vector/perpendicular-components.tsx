"use client";

import { useState } from "react";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Arc, Dot, Lab, Seg, SliderCard, Square, Stage, Vec, add, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "একটি ভেক্টরকে পরস্পর লম্ব দুই দিকে ভাগ করতে পারবে, cosθ ও sinθ কোন উপাংশের সাথে বসে তা বুঝবে এবং উপাংশ থেকে ভেক্টর ফিরে পেতে পারবে।",
  hook: "একটা কাঠি ঢালু করে ধরো। ওপর থেকে আলো ফেললে মেঝেতে একটা ছায়া পড়ে, পাশ থেকে ফেললে দেয়ালে আরেকটা। মেঝের ছায়া বলে কাঠিটা কতটা সামনে গেছে, দেয়ালের ছায়া বলে কতটা ওপরে উঠেছে। ভেক্টরকে লম্ব উপাংশে ভাগ করা মানে এই দুই ছায়া মাপা।",
  formulas: [
    { tex: "R_x=R\\cos\\theta", meaning: "অনুভূমিক (x) উপাংশ। θ হলো ভেক্টর ও x-অক্ষের মাঝের কোণ।" },
    { tex: "R_y=R\\sin\\theta", meaning: "উল্লম্ব (y) উপাংশ।" },
    { tex: "R=\\sqrt{R_x^2+R_y^2}", meaning: "উপাংশ থেকে ভেক্টরের মান ফিরে পাওয়া।" },
    { tex: "\\tan\\theta=\\dfrac{R_y}{R_x}", meaning: "উপাংশ থেকে ভেক্টরের দিক।" },
    { tex: "\\theta=0^\\circ:\\ R_x=R,\\ R_y=0\\qquad\\theta=90^\\circ:\\ R_x=0,\\ R_y=R", meaning: "দুই সীমান্ত কোণে ফল।" },
  ],
  example: {
    problem: "10 N মানের একটি বল অনুভূমিকের সাথে 30° কোণে কাজ করছে। এর অনুভূমিক ও উল্লম্ব উপাংশ বের করো। তারপর উপাংশ 6 N ও 8 N হলে বলের মান ও দিক কত?",
    steps: [
      { text: "অনুভূমিক উপাংশের জন্য cos বসে।", tex: "F_x=10\\cos30^\\circ=10\\times0.866=8.66\\ \\text{N}" },
      { text: "উল্লম্ব উপাংশের জন্য sin বসে।", tex: "F_y=10\\sin30^\\circ=10\\times0.5=5\\ \\text{N}" },
      { text: "যাচাই: উপাংশ দুটি থেকে মান ফিরে পাই।", tex: "F=\\sqrt{8.66^2+5^2}=\\sqrt{75+25}=10\\ \\text{N}" },
      { text: "এবার উল্টো পথ। উপাংশ 6 N ও 8 N হলে বল কত এবং দিক কোন দিকে?", tex: "F=\\sqrt{6^2+8^2}=10\\ \\text{N},\\quad \\theta=\\tan^{-1}\\frac{8}{6}=53.1^\\circ" },
      { text: "উত্তর: প্রথম বলের উপাংশ 8.66 N ও 5 N। দ্বিতীয় বলের মান 10 N, যা অনুভূমিকের সাথে 53.1° কোণে।" },
    ],
  },
  mistakes: [
    "cos আর sin উল্টে বসানো। কোণ x-অক্ষের সাথে মাপলে x-উপাংশে cos বসে, y-উপাংশে sin।",
    "কোণ y-অক্ষ থেকে মাপা থাকলে সূত্র সরাসরি বসানো। তখন x-উপাংশে sin আর y-উপাংশে cos বসে।",
    "উপাংশ দুটি সরাসরি যোগ করে মান বের করা। মান পাওয়া যায় পিথাগোরাস দিয়ে, 8.66 + 5 দিয়ে নয়।",
    "ক্যালকুলেটর রেডিয়ান মোডে রেখে cos, sin বের করা।",
  ],
  recap: [
    "লম্ব উপাংশ মানে ভেক্টরের দুটি ছায়া, একটা x-অক্ষে আর একটা y-অক্ষে।",
    "কোণ x-অক্ষ থেকে মাপা হলে Rx = R cosθ এবং Ry = R sinθ।",
    "উপাংশ জানলে ভেক্টর ফিরে পাওয়া যায়: মান পিথাগোরাস দিয়ে, দিক tanθ = Ry/Rx দিয়ে।",
    "θ = 0° হলে পুরোটাই x-উপাংশ। θ = 90° হলে পুরোটাই y-উপাংশ।",
  ],
  quiz: [
    { q: "20 N বল x-অক্ষের সাথে 60° কোণে আছে। এর x-উপাংশ কত?", options: ["10 N", "17.3 N", "20 N", "34.6 N"], answer: 0, why: "20 cos 60° = 20 × 0.5 = 10 N। 17.3 N হলো y-উপাংশ, ভুল করে sin বসালে পাওয়া যায়।" },
    { q: "কোন কোণে ভেক্টরের y-উপাংশ শূন্য হয়? (কোণ x-অক্ষ থেকে মাপা)", options: ["90°", "45°", "0°", "60°"], answer: 2, why: "sin 0° = 0, তাই ভেক্টর পুরোটা x-অক্ষ বরাবর শুয়ে থাকে।" },
    { q: "উপাংশ 3 ও 4 হলে ভেক্টরের মান কত?", options: ["7", "5", "1", "12"], answer: 1, why: "মান পাওয়া যায় পিথাগোরাস দিয়ে: √(3² + 4²) = 5। 7 হলো সরাসরি যোগ করার ভুল।" },
    { q: "কোণ y-অক্ষ থেকে মাপা থাকলে x-উপাংশ কত?", options: ["R cosθ", "R sinθ", "R tanθ", "R"], answer: 1, why: "y-অক্ষের পাশের কোণে cos যায় y-উপাংশে, আর বিপরীত x-উপাংশে বসে sin।" },
  ],
};

export default function Anim() {
  const [r, setR] = useState(7);
  const [th, setTh] = useState(40);

  const S = 24;
  const m = mk(70, 255, S);
  const o = m(0, 0);
  const rx = r * Math.cos(rad(th));
  const ry = r * Math.sin(rad(th));
  const tip = m(rx, ry);
  const fx = m(rx, 0);
  const wy = m(0, ry);

  const steps: LessonStep[] = [
    {
      title: "ছায়ার খেলা",
      text: "ছবির লাল তীরটা একটা ভেক্টর R। সে x-অক্ষের সাথে θ কোণ করে আছে। বাঁ দিকে দেয়াল, নিচে মেঝে। ওপর আর পাশ থেকে আলো ফেললে এর দুটো ছায়া পড়বে।",
      note: "ভেক্টরকে লম্ব দুই দিকে ভাগ করা মানে এই দুই ছায়ার দৈর্ঘ্য মাপা।",
    },
    {
      title: "মেঝের ছায়া",
      text: "ওপর থেকে আলো ফেললে মেঝেতে R-এর ছায়া পড়ে। এই ছায়াই x-দিকের উপাংশ Rx। R যত শুয়ে থাকে, এই ছায়া তত লম্বা।",
    },
    {
      title: "দেয়ালের ছায়া",
      text: "পাশ থেকে আলো ফেললে দেয়ালে আরেকটা ছায়া পড়ে। এটা y-দিকের উপাংশ Ry। R যত খাড়া হয়, এই ছায়া তত লম্বা।",
    },
    {
      title: "সমকোণী ত্রিভুজ",
      text: "R, Rx আর Ry মিলে একটা সমকোণী ত্রিভুজ হয়েছে। R অতিভুজ, Rx ভূমি, Ry লম্ব। কোণ θ আছে ভূমির পাশে।",
      note: "ভূমি হলো x-দিকের ছায়া, লম্ব হলো y-দিকের ছায়া।",
    },
    {
      title: "ভূমি Rx বের করি",
      text: "cosθ হলো ভূমি ÷ অতিভুজ। তাই ভূমি হলো অতিভুজ × cosθ।",
      tex: ["\\cos\\theta=\\frac{R_x}{R}", "R_x=R\\cos\\theta", `R_x=${r}\\times\\cos${th}^\\circ=${f1(rx)}`],
    },
    {
      title: "লম্ব Ry বের করি",
      text: "sinθ হলো লম্ব ÷ অতিভুজ। তাই লম্ব হলো অতিভুজ × sinθ।",
      tex: ["\\sin\\theta=\\frac{R_y}{R}", "R_y=R\\sin\\theta", `R_y=${r}\\times\\sin${th}^\\circ=${f1(ry)}`],
    },
    {
      title: "উল্টো পথ",
      text: "উপাংশ জানলে ভেক্টর ফিরে পাওয়া যায়। মান পাই পিথাগোরাস দিয়ে, কোণ পাই tan দিয়ে।",
      tex: ["R=\\sqrt{R_x^2+R_y^2}", "\\tan\\theta=\\frac{R_y}{R_x}", `R=\\sqrt{${f1(rx)}^2+${f1(ry)}^2}=${r}`],
    },
    {
      title: "সীমান্ত কোণ",
      text: "θ = 0° হলে ভেক্টর পুরোটাই মেঝের ওপর, তাই Ry = 0। θ = 90° হলে পুরোটাই দেয়ালের গায়ে, তাই Rx = 0। স্লাইডার টেনে দেখো।",
      tex: ["\\theta=0^\\circ:\\ R_x=R,\\ R_y=0", "\\theta=90^\\circ:\\ R_x=0,\\ R_y=R"],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="ভেক্টরের লম্ব উপাংশ">
      <line x1={o.x} y1={o.y} x2={o.x + 10 * S} y2={o.y} strokeWidth={3} strokeLinecap="round" style={{ stroke: "var(--muted)" }} />
      <line x1={o.x} y1={o.y} x2={o.x} y2={o.y - 9 * S} strokeWidth={3} strokeLinecap="round" style={{ stroke: "var(--muted)" }} />
      <Lab p={{ x: o.x + 10 * S, y: o.y + 20 }} anchor="end" c="m">মেঝে</Lab>
      <Lab p={{ x: o.x + 8, y: o.y - 9 * S - 6 }} anchor="start" c="m">দেয়াল</Lab>

      <Seg a={o} b={fx} show={s >= 1} c="p" w={7} />
      <Seg a={tip} b={fx} show={s >= 1} dash c="m" w={1.5} />
      <Seg a={o} b={wy} show={s >= 2} c="q" w={7} />
      <Seg a={tip} b={wy} show={s >= 2} dash c="m" w={1.5} />
      <Seg a={fx} b={tip} show={s >= 3} c="q" w={3} />
      <Square at={fx} d1={{ x: -1, y: 0 }} d2={{ x: 0, y: -1 }} show={s >= 3} />
      <Arc o={o} r={34} from={0} to={th} c="f" w={1.5} show={s >= 3} />
      <Vec a={o} b={tip} c="r" w={4} />
      <Dot p={o} />

      <Lab p={add(mid(o, fx), 0, 22)} show={s >= 1} c="p">{s >= 4 ? `Rx = ${f1(rx)}` : "Rx"}</Lab>
      <Lab p={add(mid(o, wy), -10, 5)} show={s >= 2} c="q" anchor="end">{s >= 5 ? `Ry = ${f1(ry)}` : "Ry"}</Lab>
      <Lab p={add(tip, 10, -8)} c="r" anchor="start">R = {r}</Lab>
      <Lab p={pol(o, th / 2, 54)} show={s >= 3}>θ</Lab>
    </Stage>
  );

  const extra = (
    <SliderCard>
      <Slider label="ভেক্টরের মান R" value={r} min={1} max={9} onChange={setR} />
      <Slider label="কোণ θ (x-অক্ষ থেকে)" value={th} min={0} max={90} suffix="°" onChange={setTh} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
