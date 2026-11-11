"use client";

import { useState } from "react";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Arc, Dot, Lab, Seg, SliderCard, Stage, Vec, add, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "ভেক্টর বিয়োগকে 'উল্টো করে যোগ' হিসেবে বুঝবে, ছবিতে A − B আঁকতে পারবে এবং তার মানের সূত্র জানবে।",
  hook: "তুমি পূর্ব দিকে 5 মিটার গেলে, তারপর ঠিক উল্টো দিকে 2 মিটার ফিরে এলে। শেষে তুমি পূর্বে 3 মিটার দূরে। ফিরে আসাটা আসলে 'বিয়োগ'। ভেক্টরে বিয়োগ করা মানে যে ভেক্টর বিয়োগ করছি তাকে উল্টে দিয়ে যোগ করা।",
  formulas: [
    { tex: "\\vec A-\\vec B=\\vec A+(-\\vec B)", meaning: "বিয়োগ মানে বিপরীত ভেক্টর যোগ।" },
    { tex: "|\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}", meaning: "θ হলো A ও B-এর মাঝের কোণ। যোগের সূত্রে শুধু cosθ-এর আগের চিহ্ন বদলায়।" },
    { tex: "\\vec A-\\vec B=(A_x-B_x)\\hat\\imath+(A_y-B_y)\\hat\\jmath", meaning: "উপাংশ দিয়ে বিয়োগ: একই দিকের উপাংশ আলাদা করে বিয়োগ।" },
    { tex: "\\vec B-\\vec A=-(\\vec A-\\vec B)", meaning: "ক্রম উল্টালে ফলের দিক উল্টে যায়, মান একই।" },
    { tex: "\\vec A+\\vec B=\\vec B+\\vec A", meaning: "যোগে ক্রম বদলালে ফল বদলায় না। বিয়োগে বদলায়।" },
  ],
  example: {
    problem: "A⃗ = 3î + 5ĵ এবং B⃗ = î + 2ĵ হলে A⃗ − B⃗ এবং তার মান বের করো।",
    steps: [
      { text: "একই দিকের উপাংশ আলাদা করে বিয়োগ করি।", tex: "\\vec A-\\vec B=(3-1)\\hat\\imath+(5-2)\\hat\\jmath=2\\hat\\imath+3\\hat\\jmath" },
      { text: "মান বের করি।", tex: "|\\vec A-\\vec B|=\\sqrt{2^2+3^2}=\\sqrt{13}=3.61" },
      { text: "লক্ষ করো: |A| − |B| (√34 − √5 = 3.59) আর |A − B| (3.61) এক নয়। মানের বিয়োগ আর ভেক্টরের বিয়োগ আলাদা জিনিস।" },
    ],
  },
  mistakes: [
    "A − B আর B − A কে এক ভাবা। এদের মান এক, কিন্তু দিক উল্টো।",
    "মান বিয়োগ করে ফেলা। |A − B| সাধারণত |A| − |B|-এর সমান নয়।",
    "বিয়োগের সূত্রে cosθ-এর আগে যোগ চিহ্ন বসানো। বিয়োগে সেটা বিয়োগ হবে।",
    "ছবিতে B-কে উল্টানো ভুলে যাওয়া। আগে −B আঁকো, তারপর যোগ করো।",
  ],
  recap: [
    "A − B = A + (−B)। প্রথমে B উল্টাও, তারপর যোগ করো।",
    "A ও B একই বিন্দু থেকে আঁকলে A − B হলো B-এর মাথা থেকে A-এর মাথার তীর।",
    "সামান্তরিকের এক কর্ণ A + B, অন্য কর্ণ A − B।",
    "যোগের ক্রম বদলালে ফল একই, বিয়োগের ক্রম বদলালে ফল উল্টে যায়।",
  ],
  quiz: [
    { q: "A⃗ − B⃗ কোনটির সমান?", options: ["A⃗ + B⃗", "A⃗ + (−B⃗)", "B⃗ − A⃗", "−A⃗ − B⃗"], answer: 1, why: "বিয়োগ মানে বিপরীত ভেক্টর যোগ।" },
    { q: "A⃗ = 4î এবং B⃗ = 4î হলে A⃗ − B⃗ কত?", options: ["8î", "শূন্য ভেক্টর", "16", "4î"], answer: 1, why: "(4 − 4)î = 0î, যা শূন্য ভেক্টর।" },
    { q: "A = 3, B = 4 এবং θ = 90° হলে |A⃗ − B⃗| কত?", options: ["1", "5", "7", "√7"], answer: 1, why: "√(9 + 16 − 2·3·4·0) = 5। cos 90° = 0।" },
    { q: "B⃗ − A⃗ এবং A⃗ − B⃗-এর সম্পর্ক কী?", options: ["সমান", "মান সমান, দিক উল্টো", "মান আলাদা", "দুটোই শূন্য"], answer: 1, why: "B − A = −(A − B), তাই মান এক কিন্তু দিক ঠিক উল্টো।" },
  ],
};

export default function Anim() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(4);
  const [th, setTh] = useState(60);

  const S = 19;
  const m = mk(150, 150, S);
  const o = m(0, 0);
  const bx = b * Math.cos(rad(th));
  const by = b * Math.sin(rad(th));
  const aE = m(a, 0);
  const bE = m(bx, by);
  const nE = m(-bx, -by);
  const dE = m(a - bx, -by);
  const sE = m(a + bx, by);
  const dmag = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(th)));

  const steps: LessonStep[] = [
    {
      title: "বিয়োগ কেন আলাদা?",
      text: "দুটো ভেক্টর A আর B একই বিন্দু থেকে আঁকা আছে। আমরা A − B বের করতে চাই। সংখ্যার মতো সরাসরি বিয়োগ করা যায় না, কারণ দিক আছে। তাই একটা কৌশল লাগবে।",
    },
    {
      title: "B-কে উল্টে দাও",
      text: "বিয়োগ মানে বিপরীত ভেক্টর যোগ। তাই আগে B-এর বিপরীত ভেক্টর −B আঁকি: মান একই, দিক ঠিক উল্টো। ছবির ডোরাকাটা সবুজ তীরটাই −B।",
      tex: ["\\vec A-\\vec B=\\vec A+(-\\vec B)"],
    },
    {
      title: "এবার যোগ করো",
      text: "−B-কে সরিয়ে A-এর মাথায় বসাও (ত্রিভুজ সূত্র)। শুরুর বিন্দু থেকে শেষ মাথা পর্যন্ত লাল তীরটাই A − B।",
    },
    {
      title: "সোজা উপায়",
      text: "আরেকটা সহজ উপায় আছে। A আর B একই বিন্দু থেকে আঁকা থাকলে B-এর মাথা থেকে A-এর মাথা পর্যন্ত একটা তীর টানো। এটা লাল তীরটার সমান ও সমান্তরাল। অর্থাৎ A − B মানে 'B থেকে A-তে যাওয়ার তীর'।",
      note: "মনে রাখার ট্রিক: 'যার থেকে বিয়োগ, তার মাথায় তীরের মুখ'। এখানে A-এর মাথায়।",
    },
    {
      title: "বিয়োগের মান",
      text: `যোগের সূত্রে A আর −B-এর মাঝের কোণ ধরলে cos(180° − θ) = −cosθ হয়। তাই মানের সূত্রে শুধু চিহ্ন বদলে যায়। ছবিতে দেখো, সামান্তরিকের এক কর্ণ A + B, আরেক কর্ণ A − B। বর্তমান মান: ${f1(dmag)}।`,
      tex: ["|\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}"],
    },
    {
      title: "ক্রম উল্টালে",
      text: "এবার B − A আঁকো। বেগুনি তীরটা A-এর মাথা থেকে B-এর মাথায় যায়। এটা A − B-এর ঠিক উল্টো। মান এক, দিক উল্টো।",
      tex: ["\\vec B-\\vec A=-(\\vec A-\\vec B)"],
    },
    {
      title: "নিজে করো",
      text: "A, B আর θ বদলাও। θ = 0° হলে মান হয় A আর B-এর মানের পার্থক্য। θ = 180° হলে মান হয় A + B। স্লাইডার টেনে দেখো কেন।",
      tex: [`|\\vec A-\\vec B|=${f1(dmag)}`],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={290} label="ভেক্টর বিয়োগের চিত্র">
      <Seg a={aE} b={sE} show={s === 4} dash c="m" w={1.5} />
      <Seg a={bE} b={sE} show={s === 4} dash c="m" w={1.5} />
      <Vec a={o} b={sE} show={s === 4} dash c="m" w={2} />
      <Arc o={o} r={28} from={0} to={th} c="f" w={1.5} />

      <Vec a={o} b={aE} c="p" />
      <Vec a={o} b={bE} c="q" />
      <Vec a={o} b={nE} c="q" dash show={s >= 1} />
      <Vec a={s >= 2 ? aE : o} b={s >= 2 ? dE : nE} c="q" show={s >= 2} />
      <Seg a={o} b={dE} show={s >= 2} c="r" w={4} head />
      <Vec a={bE} b={aE} c="r" dash show={s >= 3 && s !== 5} w={2} />
      <Vec a={aE} b={bE} c="v" show={s === 5} w={4} />
      <Dot p={o} />

      <Lab p={add(mid(o, aE), 0, 16)} c="p">A</Lab>
      <Lab p={add(mid(o, bE), -10, -4)} c="q" anchor="end">B</Lab>
      <Lab p={add(mid(o, nE), -10, 12)} show={s >= 1} c="q" anchor="end">−B</Lab>
      <Lab p={add(mid(o, dE), -10, 14)} show={s >= 2 && s !== 5} c="r" anchor="end">A − B</Lab>
      <Lab p={add(mid(aE, bE), 12, -6)} show={s === 5} c="v" anchor="start">B − A</Lab>
      <Lab p={add(mid(o, sE), 0, -14)} show={s === 4} c="m">A + B</Lab>
      <Lab p={pol(o, th / 2, 46)}>θ</Lab>
      <Lab p={{ x: 20, y: 24 }} show={s >= 4} anchor="start">|A − B| = {f1(dmag)}</Lab>
    </Stage>
  );

  const extra = (
    <SliderCard>
      <Slider label="A-এর মান" value={a} min={1} max={7} onChange={setA} />
      <Slider label="B-এর মান" value={b} min={1} max={6} onChange={setB} />
      <Slider label="মাঝের কোণ θ" value={th} min={0} max={180} suffix="°" onChange={setTh} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
