"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Arc, Dot, Lab, Seg, SliderCard, Stage, Vec, add, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "একটি ভেক্টরকে যেকোনো দুই দিকে ভাগ করার সূত্র বানাতে পারবে এবং সাইন সূত্র দিয়ে উপাংশ দুটির মান বের করতে পারবে।",
  hook: "খালের মাঝ বরাবর একটা নৌকা টেনে নিতে দুই পাড় থেকে দুজন দড়ি টানছে। নৌকা সোজা যাবে, কিন্তু দড়ি দুটো সোজা নয়, দুই পাশে বাঁকা। প্রতিটি দড়িতে কত টান লাগবে? দড়ি পরস্পর লম্ব নয়, তাই cos আর sin সরাসরি চলে না। এখানে কাজে লাগে সাইন সূত্র।",
  formulas: [
    { tex: "\\dfrac{P}{\\sin\\beta}=\\dfrac{Q}{\\sin\\alpha}=\\dfrac{R}{\\sin(\\alpha+\\beta)}", meaning: "R-কে P ও Q-তে ভাগের মূল সূত্র। α হলো R ও P-এর মাঝের কোণ, β হলো R ও Q-এর মাঝের কোণ।" },
    { tex: "P=\\dfrac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}", meaning: "P-এর মান। P-এর বিপরীত কোণ β।" },
    { tex: "Q=\\dfrac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}", meaning: "Q-এর মান। Q-এর বিপরীত কোণ α।" },
    { tex: "\\alpha+\\beta=90^\\circ:\\ P=R\\cos\\alpha,\\ Q=R\\sin\\alpha", meaning: "দুই দিক লম্ব হলে আগের পাঠের সূত্রেই ফিরে আসে।" },
  ],
  example: {
    problem: "একটি নৌকাকে খালের মাঝ বরাবর 100 N বলে টানা হচ্ছে। এক পাড়ের দড়ি খালের সাথে 30° এবং অন্য পাড়ের দড়ি 60° কোণে আছে। দুই দড়িতে টান কত?",
    steps: [
      { text: "দেওয়া আছে R = 100 N, α = 30°, β = 60°। কোণ দুটির যোগফল 90°, তাই sin(α + β) = 1।" },
      { text: "P-এর বিপরীত কোণ β। তাই P বের করি।", tex: "P=\\frac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}=\\frac{100\\times0.866}{1}=86.6\\ \\text{N}" },
      { text: "Q-এর বিপরীত কোণ α। তাই Q বের করি।", tex: "Q=\\frac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}=\\frac{100\\times0.5}{1}=50\\ \\text{N}" },
      { text: "যাচাই: খালের লম্ব দিকের অংশ দুটি সমান হওয়া উচিত, তাহলে কাটাকাটি হয়ে নৌকা সোজা যাবে।", tex: "P\\sin30^\\circ=86.6\\times0.5=43.3,\\quad Q\\sin60^\\circ=50\\times0.866=43.3" },
      { text: "উত্তর: একটি দড়িতে 86.6 N এবং অন্যটিতে 50 N।" },
    ],
  },
  mistakes: [
    "সাইন সূত্রে বিপরীত কোণ ভুল বসানো। P-এর বিপরীতে বসে β, α নয়।",
    "α ও β-কে দুই ভেক্টরের মাঝের কোণ ভাবা। এরা প্রত্যেকে R-এর সাথে তৈরি কোণ।",
    "হরে sin α + sin β লেখা। হরে বসে sin(α + β)।",
    "দিক লম্ব না হলেও cos আর sin সরাসরি বসানো।",
  ],
  recap: [
    "R-কে দুই দিকে ভাগ করতে R-এর মাথা থেকে দুই দিকের সমান্তরাল রেখা টেনে সামান্তরিক আঁকো।",
    "সামান্তরিকের অর্ধেকটা একটা ত্রিভুজ, যার বাহু P, Q আর R।",
    "ত্রিভুজে বাহু ÷ বিপরীত কোণের sin সবার জন্য এক। এটাই সাইন সূত্র।",
    "α + β = 90° হলে সূত্র সরল হয়ে P = R cosα এবং Q = R sinα হয়।",
  ],
  quiz: [
    { q: "R = 10, α = 30°, β = 30° হলে P কত?", options: ["5 N", "5.77 N", "8.66 N", "10 N"], answer: 1, why: "P = 10 sin30° ÷ sin60° = 5 ÷ 0.866 = 5.77 N। 5 N হলো হর ভুলে 1 ধরলে পাওয়া ফল।" },
    { q: "α + β = 90° হলে P কত?", options: ["R sinα", "R cosα", "R tanα", "R"], answer: 1, why: "sin β = sin(90° − α) = cos α এবং sin(α + β) = 1। তাই P = R cosα।" },
    { q: "সাইন সূত্রে P-এর বিপরীত কোণ কোনটি?", options: ["α", "β", "α + β", "α − β"], answer: 1, why: "P-এর বিপরীত কোণ β। Q-এর বিপরীতে α।" },
    { q: "R = 100 N, α = β = 45° হলে P কত?", options: ["50 N", "70.7 N", "100 N", "141 N"], answer: 1, why: "sin(α + β) = sin 90° = 1, তাই P = 100 sin45° = 70.7 N।" },
  ],
};

export default function Anim() {
  const [r, setR] = useState(4);
  const [al, setAl] = useState(30);
  const [be, setBe] = useState(45);

  const S = 22;
  const m = mk(70, 145, S);
  const o = m(0, 0);
  const sum = al + be;
  const p = (r * Math.sin(rad(be))) / Math.sin(rad(sum));
  const q = (r * Math.sin(rad(al))) / Math.sin(rad(sum));
  const rE = m(r, 0);
  const pE = m(p * Math.cos(rad(al)), p * Math.sin(rad(al)));
  const qE = m(q * Math.cos(rad(be)), -q * Math.sin(rad(be)));
  const l1 = m(7 * Math.cos(rad(al)), 7 * Math.sin(rad(al)));
  const l2 = m(7 * Math.cos(rad(be)), -7 * Math.sin(rad(be)));

  const steps: LessonStep[] = [
    {
      title: "দুই দড়ির টান",
      text: "খালের মাঝ বরাবর নৌকা টানতে হবে। মোট টান লাল তীর R। কিন্তু দুজন দুই পাড় থেকে টানছে। প্রশ্ন: প্রতিজন কত জোরে টানবে?",
    },
    {
      title: "দড়ির দিক আঁকো",
      text: "এক দড়ি R-এর সাথে α কোণে ওপরে, অন্য দড়ি β কোণে নিচে। দুই দড়ির দিক ছবিতে ডোরাকাটা রেখা।",
    },
    {
      title: "সামান্তরিক পূর্ণ করো",
      text: "R-এর মাথা থেকে দুই দড়ির সমান্তরাল রেখা টানি। রেখা দুটো দুই দিককে যেখানে কাটে, সেখানেই P আর Q-এর মাথা।",
    },
    {
      title: "P ও Q পেলাম",
      text: "শুরু থেকে ওই দুই বিন্দু পর্যন্ত তীর টানলে দড়ি দুটোর টান P আর Q পাই। এদের যোগফলই R।",
      tex: ["\\vec P+\\vec Q=\\vec R"],
    },
    {
      title: "ত্রিভুজটা দেখো",
      text: "শুরুর বিন্দু, P-এর মাথা আর R-এর মাথা মিলে একটা ত্রিভুজ হয়েছে। শুরুতে কোণ α, R-এর মাথায় কোণ β, আর তৃতীয় কোণ 180° − (α + β)।",
      note: "P-এর বিপরীত কোণ β। Q-এর বিপরীত কোণ α। R-এর বিপরীত কোণ 180° − (α + β)।",
    },
    {
      title: "সাইন সূত্র",
      text: "ত্রিভুজে প্রতিটি বাহু ÷ তার বিপরীত কোণের sin একই। আবার sin(180° − x) = sin x, তাই R-এর হরে sin(α + β) বসে।",
      tex: ["\\frac{P}{\\sin\\beta}=\\frac{Q}{\\sin\\alpha}=\\frac{R}{\\sin(\\alpha+\\beta)}"],
    },
    {
      title: "P আর Q আলাদা করো",
      text: "সমান চিহ্ন ভেঙে P আর Q আলাদা লিখি। তারপর সংখ্যা বসাই।",
      tex: [
        "P=\\frac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}",
        `P=\\frac{${r}\\sin${be}^\\circ}{\\sin${sum}^\\circ}=${f1(p)}`,
        "Q=\\frac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}",
        `Q=\\frac{${r}\\sin${al}^\\circ}{\\sin${sum}^\\circ}=${f1(q)}`,
      ],
    },
    {
      title: "দিক লম্ব হলে",
      text: "α + β = 90° হলে sin(α + β) = 1 আর sin β = cos α। তখন P = R cosα, Q = R sinα। আগের পাঠের সূত্রে ফিরে এলাম। স্লাইডারে α + β = 90° করে দেখো।",
      tex: ["\\alpha+\\beta=90^\\circ:\\ P=R\\cos\\alpha,\\ Q=R\\sin\\alpha"],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="একটি ভেক্টরকে দুই দিকে ভাগ করা">
      <motion.polygon
        initial={false}
        points={`${o.x},${o.y} ${pE.x},${pE.y} ${rE.x},${rE.y}`}
        animate={{ opacity: s >= 4 ? 0.14 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ fill: "var(--c-p)" }}
      />
      <Seg a={o} b={l1} show={s >= 1} dash c="p" w={1.5} />
      <Seg a={o} b={l2} show={s >= 1} dash c="q" w={1.5} />
      <Seg a={rE} b={pE} show={s >= 2} dash c="m" w={1.5} />
      <Seg a={rE} b={qE} show={s >= 2} dash c="m" w={1.5} />
      <Arc o={o} r={40} from={0} to={al} c="p" w={2} show={s >= 1} />
      <Arc o={o} r={40} from={-be} to={0} c="q" w={2} show={s >= 1} />
      <Arc o={rE} r={34} from={180 - be} to={180} c="q" w={2} show={s >= 4} />
      <Vec a={o} b={rE} c="r" w={4} />
      <Vec a={o} b={pE} c="p" w={3.5} show={s >= 3} />
      <Vec a={o} b={qE} c="q" w={3.5} show={s >= 3} />
      <Dot p={o} />

      <Lab p={add(mid(o, rE), 0, 20)} c="r">R = {r}</Lab>
      <Lab p={pol(o, al / 2, 58)} show={s >= 1} c="p">α</Lab>
      <Lab p={pol(o, -be / 2, 58)} show={s >= 1} c="q">β</Lab>
      <Lab p={pol(rE, 180 - be / 2, 52)} show={s >= 4} c="q">β</Lab>
      <Lab p={add(pE, 8, -6)} show={s >= 3} c="p" anchor="start">P = {f1(p)}</Lab>
      <Lab p={add(qE, 8, 14)} show={s >= 3} c="q" anchor="start">Q = {f1(q)}</Lab>
      <Lab p={add(pE, 8, 12)} show={s === 4} anchor="start">180° − (α + β)</Lab>
    </Stage>
  );

  const extra = (
    <SliderCard>
      <Slider label="মোট টান R" value={r} min={2} max={6} onChange={setR} />
      <Slider label="কোণ α" value={al} min={10} max={60} suffix="°" onChange={setAl} />
      <Slider label="কোণ β" value={be} min={10} max={60} suffix="°" onChange={setBe} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
