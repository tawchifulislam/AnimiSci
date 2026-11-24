"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Guide, type GuideStep } from "@/components/lesson/Guide";
import { C, Choices, tailSteps, useFinishMark } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Stage, Vec, add, col, mid, pol, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  guided: true,
  goal: "ভেক্টর বিয়োগকে 'উল্টো করে যোগ' হিসেবে বুঝবে, ছবিতে A − B আঁকতে পারবে এবং তার মানের সূত্র জানবে।",
  hook: "তুমি পূর্ব দিকে 5 মিটার গেলে, তারপর ঠিক উল্টো দিকে 2 মিটার ফিরে এলে। শেষে তুমি পূর্বে 3 মিটার দূরে। ফিরে আসাটা আসলে বিয়োগ।",
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
    "B − A হলো A − B-এর ঠিক উল্টো তীর। মান এক, দিক উল্টো।",
    "বেগের পরিবর্তন = শেষ বেগ − শুরুর বেগ। দিক উল্টে গেলে মান বদলালেও না বদলালেও পরিবর্তন শূন্য হয় না।",
  ],
  think: {
    scenario: "একটা বল 5 m/s বেগে দেয়ালের দিকে যাচ্ছিল। দেয়ালে লেগে সেটা একই মানের বেগে ঠিক উল্টো দিকে ফিরে এল।",
    points: [
      "বলের বেগের মান বদলায়নি, তবু বেগের পরিবর্তন কি শূন্য? বেগ ভেক্টর বলেই কি এমন হলো?",
      "বেগের পরিবর্তন বের করতে কোন বেগ থেকে কোনটা বিয়োগ করবে? ক্রম উল্টালে ফলে কী বদলাবে?",
      "বল যদি দেয়ালে না লেগে একই বেগে সোজা চলতে থাকত, তাহলে বেগের পরিবর্তন কত হতো?",
      "একই কাজ ছবিতে করতে হলে শুরুর বেগ আর শেষ বেগের মাথা দুটোর মধ্যে কোন তীর আঁকবে?",
    ],
    hint: "বেগের পরিবর্তন = শেষ বেগ − শুরুর বেগ। উল্টো দিকের বেগে ঋণ চিহ্ন বসে। ছবিতে A − B হলো B-এর মাথা থেকে A-এর মাথায় যাওয়ার তীর।",
    traps: [
      "A − B আর B − A একই ভেক্টর।",
      "|A − B| সব সময় |A| − |B|-এর সমান।",
      "বিয়োগের সূত্রে cosθ-এর আগে যোগ চিহ্ন বসে।",
      "ছবিতে B-কে উল্টানোর দরকার নেই, সরাসরি A-এর মাথায় বসানো যায়।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = 3î + 5ĵ এবং B⃗ = î + 2ĵ হলে A⃗ − B⃗ এবং তার মান বের করো।",
      hint: "একই দিকের উপাংশ আলাদা করে বিয়োগ করো।",
      steps: [
        { text: "একই দিকের উপাংশ আলাদা করে বিয়োগ করি।", tex: "\\vec A-\\vec B=(3-1)\\hat\\imath+(5-2)\\hat\\jmath=2\\hat\\imath+3\\hat\\jmath" },
        { text: "মান বের করি।", tex: "|\\vec A-\\vec B|=\\sqrt{2^2+3^2}=\\sqrt{13}=3.61" },
        { text: "লক্ষ করো: |A| − |B| = √34 − √5 = 3.59, আর |A − B| = 3.61। দুটো এক নয়।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A = 5 ও B = 5, তাদের মাঝের কোণ 60°। |A⃗ − B⃗| কত?",
      hint: "বিয়োগের মানের সূত্রে cosθ-এর আগে বিয়োগ চিহ্ন বসে।",
      steps: [
        { text: "সূত্র লিখি।", tex: "|\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}" },
        { text: "সংখ্যা বসাই। cos 60° = 0.5।", tex: "|\\vec A-\\vec B|=\\sqrt{25+25-2\\times5\\times5\\times0.5}=\\sqrt{25}=5" },
        { text: "উত্তর: 5। A, B আর A − B তিনটির মানই 5, তাই এটা একটা সমবাহু ত্রিভুজ।" },
      ],
    },
    {
      level: "কঠিন",
      q: "একটি বল 10 m/s বেগে দেয়ালের দিকে এসে একই মানের বেগে ঠিক উল্টো দিকে ফিরে গেল। বেগের পরিবর্তনের মান কত?",
      hint: "দেয়ালের দিক ধনাত্মক ধরলে ফেরার বেগ ঋণাত্মক।",
      steps: [
        { text: "দেয়ালের দিক ধনাত্মক ধরি। শুরুর বেগ +10, শেষ বেগ −10।", tex: "v_i=+10,\\quad v_f=-10\\ \\text{m/s}" },
        { text: "পরিবর্তন হলো শেষ বেগ থেকে শুরুর বেগ বিয়োগ।", tex: "\\Delta v=v_f-v_i=-10-10=-20\\ \\text{m/s}" },
        { text: "মান বের করি।", tex: "|\\Delta v|=20\\ \\text{m/s}" },
        { text: "উত্তর: 20 m/s, দেয়াল থেকে দূরের দিকে। বেগের মান বদলায়নি, কিন্তু দিক উল্টে যাওয়ায় পরিবর্তন শূন্য নয়।" },
      ],
    },
  ],
  concepts: [
    "দুটি ভেক্টরের মান সমান হলেও A⃗ − B⃗ শূন্য নাও হতে পারে। একটা উদাহরণ ভাবো।",
    "বিয়োগ আসলে যোগ। তাহলে বিয়োগের ক্রম বদলালে ফল বদলায়, কিন্তু যোগের ক্রম বদলালে বদলায় না, কেন?",
    "A⃗ − B⃗ কখন শূন্য ভেক্টর হয়?",
  ],
  quiz: [
    { q: "A⃗ − B⃗ কোনটির সমান?", options: ["A⃗ + B⃗", "A⃗ + (−B⃗)", "B⃗ − A⃗", "−A⃗ − B⃗"], answer: 1, why: "বিয়োগ মানে বিপরীত ভেক্টর যোগ।" },
    { q: "A⃗ = 4î এবং B⃗ = 4î হলে A⃗ − B⃗ কত?", options: ["8î", "শূন্য ভেক্টর", "16", "4î"], answer: 1, why: "(4 − 4)î = 0î, যা শূন্য ভেক্টর।" },
    { q: "A = 3, B = 4 এবং θ = 90° হলে |A⃗ − B⃗| কত?", options: ["1", "5", "7", "√7"], answer: 1, why: "√(9 + 16 − 2·3·4·0) = 5। cos 90° = 0।" },
    { q: "B⃗ − A⃗ এবং A⃗ − B⃗-এর সম্পর্ক কী?", options: ["সমান", "মান সমান, দিক উল্টো", "মান আলাদা", "দুটোই শূন্য"], answer: 1, why: "B − A = −(A − B), তাই মান এক কিন্তু দিক ঠিক উল্টো।" },
    { q: "A = 5, B = 5 এবং θ = 60° হলে |A⃗ − B⃗| কত?", options: ["0", "5", "10", "7.07"], answer: 1, why: "√(25 + 25 − 2·5·5·0.5) = √25 = 5। 7.07 পাওয়া যেত θ = 90° হলে।" },
  ],
};

const pt = (x: number, y: number): Pt => ({ x, y });
const K = 24;
const bx = 4 * Math.cos(rad(60)) * K;
const by = 4 * Math.sin(rad(60)) * K;

export default function Anim() {
  const router = useRouter();
  const path = usePathname();
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [reveal, setRevealState] = useState<Record<number, number>>({});
  const [theta, setTheta] = useState(60);

  const setPick = (i: number, v: number) => setPicks((p) => ({ ...p, [i]: v }));
  const setReveal = (i: number, n: number) => setRevealState((p) => ({ ...p, [i]: n }));
  const pick = (i: number) => (v: number) => setPick(i, v);

  const th = rad(theta);
  const dmag = Math.sqrt(25 + 9 - 30 * Math.cos(th));
  const insight =
    theta <= 3
      ? "θ = 0°: দুটো একই দিকে, তাই |A − B| = 5 − 3 = 2।"
      : theta >= 177
        ? "θ = 180°: দুটো উল্টো দিকে, তাই |A − B| = 5 + 3 = 8।"
        : Math.abs(theta - 90) <= 2
          ? "θ = 90°: |A − B| = √(5² + 3²) = 5.83।"
          : "θ বাড়ালে |A − B| বাড়ে। 0° এ 2, 180° এ 8।";

  const raw: GuideStep[] = [
    {
      title: "ফিরে আসা মানেই বিয়োগ",
      text: (
        <>
          তুমি <C k="p">5 m পূর্বে</C> গেলে, তারপর <C k="q">2 m পশ্চিমে ফিরে</C> এলে। শুরু থেকে এখন কত দূরে?
        </>
      ),
      locked: picks[0] === undefined,
      prompt: <Choices options={["7 m", "3 m", "10 m"]} answer={1} picked={picks[0]} onPick={pick(0)} explain="ফিরে আসা মানে উল্টো দিকে যাওয়া: 5 − 2 = 3 m পূর্বে। ভেক্টরের বিয়োগকেও আমরা উল্টো করে যোগ হিসেবে ভাবব।" />,
      figure: () => {
        const done = picks[0] !== undefined;
        return (
          <Stage w={440} h={260} label="5 m পূর্বে গিয়ে 2 m ফিরে এলে">
            <Vec a={pt(60, 120)} b={pt(310, 120)} c="p" w={4} />
            <Vec a={pt(310, 154)} b={pt(210, 154)} c="q" w={4} />
            <Vec a={pt(60, 200)} b={done ? pt(210, 200) : pt(60, 200)} c="r" w={5} show={done} />
            <Dot p={pt(60, 120)} c="f" r={5} />
            <Lab p={pt(185, 100)} c="p">5 m</Lab>
            <Lab p={pt(260, 182)} c="q">2 m ফিরে</Lab>
            <Lab p={pt(135, 226)} c="r" show={done}>3 m</Lab>
          </Stage>
        );
      },
    },
    {
      title: "B-কে উল্টে দাও",
      text: (
        <>
          A − B বের করতে প্রথমে B-কে উল্টে <C k="q">−B</C> বানাও। মান একই, দিক ঠিক উল্টো।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const O = pt(150, 130);
        return (
          <Stage w={440} h={260} label="B-কে উল্টে −B বানানো হচ্ছে">
            <Vec a={O} b={pt(O.x + 6 * K, O.y)} c="p" w={4} />
            <Vec a={O} b={pt(O.x + bx, O.y - by)} c="q" w={4} />
            <Vec a={O} b={on ? pt(O.x - bx, O.y + by) : O} c="q" w={4} dash show={on} />
            <Dot p={O} c="f" r={5} />
            <Lab p={pt(O.x + 6 * K - 6, O.y + 22)} c="p">A</Lab>
            <Lab p={pt(O.x + bx + 10, O.y - by - 4)} c="q" anchor="start">B</Lab>
            <Lab p={pt(O.x - bx - 10, O.y + by + 6)} c="q" anchor="end" show={on}>−B</Lab>
          </Stage>
        );
      },
    },
    {
      title: "উল্টো তীর যোগ করো",
      text: (
        <>
          <C k="q">−B</C>-কে সরিয়ে <C k="p">A</C>-এর মাথায় বসাও। শুরু থেকে শেষ পর্যন্ত তীরটাই <C k="r">A − B</C>।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const O = pt(110, 100);
        const aTip = pt(O.x + 6 * K, O.y);
        const rTip = pt(aTip.x - bx, aTip.y + by);
        return (
          <Stage w={440} h={260} label="A-এর মাথায় −B বসিয়ে A − B">
            <Vec a={O} b={aTip} c="p" w={4} />
            <Vec a={O} b={pt(O.x - bx, O.y + by)} c="q" w={2} dash show={on} />
            <Vec a={on ? aTip : O} b={on ? rTip : pt(O.x - bx, O.y + by)} c="q" w={4} />
            <Vec a={O} b={on ? rTip : O} c="r" w={5} show={on} />
            <Dot p={O} c="f" r={5} />
            <Lab p={pt(O.x + 3 * K, O.y - 14)} c="p">A</Lab>
            <Lab p={on ? pt(aTip.x - bx / 2 + 14, aTip.y + by / 2) : pt(O.x - bx / 2 - 10, O.y + by / 2)} c="q" anchor={on ? "start" : "end"}>−B</Lab>
            <Lab p={add(mid(O, rTip), -12, 8)} c="r" anchor="end" show={on}>A − B</Lab>
          </Stage>
        );
      },
    },
    {
      title: "সোজা কৌশল",
      text: (
        <>
          <C k="p">A</C> আর <C k="q">B</C> একই বিন্দু থেকে আঁকা। A − B-এর তীর কোথায় গিয়ে থামবে?
        </>
      ),
      locked: picks[3] === undefined,
      prompt: <Choices options={["A-এর মাথায়", "B-এর মাথায়", "শুরুর বিন্দুতে"]} answer={0} picked={picks[3]} onPick={pick(3)} explain="A − B হলো B-এর মাথা থেকে A-এর মাথায় যাওয়ার তীর। মনে রাখার ট্রিক: যার থেকে বিয়োগ, তার মাথায় তীরের মুখ।" />,
      figure: () => {
        const done = picks[3] !== undefined;
        const O = pt(100, 150);
        const aTip = pt(O.x + 6 * K, O.y);
        const bTip = pt(O.x + bx, O.y - by);
        return (
          <Stage w={440} h={260} label="A আর B-এর মাথা জুড়ে A − B">
            <Vec a={O} b={aTip} c="p" w={4} />
            <Vec a={O} b={bTip} c="q" w={4} />
            <Vec a={bTip} b={done ? aTip : bTip} c="r" w={5} show={done} />
            <Dot p={O} c="f" r={5} />
            <Lab p={pt(O.x + 3 * K, O.y + 22)} c="p">A</Lab>
            <Lab p={pt(bTip.x - 8, bTip.y - 4)} c="q" anchor="end">B</Lab>
            <Lab p={pt((aTip.x + bTip.x) / 2 + 16, (aTip.y + bTip.y) / 2)} c="r" anchor="start" show={done}>A − B</Lab>
          </Stage>
        );
      },
    },
    {
      title: "ক্রম উল্টালে",
      text: (
        <>
          B − A করলে তীরটা কেমন হবে? ঠিক উল্টো। মান একই, দিক উল্টো। যোগে ক্রম বদলালে ফল একই, বিয়োগে নয়।
        </>
      ),
      tex: ["\\vec B-\\vec A=-(\\vec A-\\vec B)"],
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const O = pt(100, 150);
        const aTip = pt(O.x + 6 * K, O.y);
        const bTip = pt(O.x + bx, O.y - by);
        return (
          <Stage w={440} h={260} label="A − B আর B − A পরস্পর উল্টো">
            <Vec a={O} b={aTip} c="p" w={3} />
            <Vec a={O} b={bTip} c="q" w={3} />
            <Vec a={bTip} b={aTip} c="r" w={5} />
            <Vec a={on ? pt(aTip.x + 14, aTip.y) : pt(bTip.x + 14, bTip.y)} b={on ? pt(bTip.x + 14, bTip.y) : pt(bTip.x + 14, bTip.y)} c="v" w={5} show={on} />
            <Dot p={O} c="f" r={5} />
            <Lab p={pt((aTip.x + bTip.x) / 2 - 12, (aTip.y + bTip.y) / 2)} c="r" anchor="end">A − B</Lab>
            <Lab p={pt((aTip.x + bTip.x) / 2 + 34, (aTip.y + bTip.y) / 2)} c="v" anchor="start" show={on}>B − A</Lab>
          </Stage>
        );
      },
    },
    {
      title: "দেয়ালে লাগা বল",
      text: "একটা বল 10 m/s বেগে দেয়ালে লেগে একই মানের বেগে ফিরে এল। বলের গতির মান বদলায়নি। তাহলে বেগের পরিবর্তন কত?",
      locked: picks[5] === undefined,
      prompt: <Choices options={["0", "10 m/s", "20 m/s"]} answer={2} picked={picks[5]} onPick={pick(5)} explain="বেগ ভেক্টর, তাই দিক উল্টে যাওয়াও পরিবর্তন। শেষ বেগ − শুরুর বেগ = (−10) − (+10) = −20 m/s। মান 20 m/s।" />,
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const done = picks[5] !== undefined;
        return (
          <Stage w={440} h={260} label="দেয়ালে লেগে ফিরে আসা বলের বেগের পরিবর্তন">
            <line x1={345} y1={70} x2={345} y2={170} strokeWidth={8} strokeLinecap="round" style={{ stroke: col.m }} />
            <Vec a={pt(200, 125)} b={pt(320, 125)} c="p" w={4} />
            <Vec a={pt(200, 125)} b={on ? pt(80, 125) : pt(200, 125)} c="q" w={4} show={on} />
            <Dot p={pt(200, 125)} c="f" r={8} />
            <Lab p={pt(260, 104)} c="p">শুরুর বেগ 10</Lab>
            <Lab p={pt(140, 104)} c="q" show={on}>শেষ বেগ 10</Lab>
            <Seg a={pt(320, 125)} b={pt(320, 195)} dash c="m" w={1.5} show={done} />
            <Seg a={pt(80, 125)} b={pt(80, 195)} dash c="m" w={1.5} show={done} />
            <Vec a={pt(320, 195)} b={done ? pt(80, 195) : pt(320, 195)} c="r" w={5} show={done} />
            <Lab p={pt(200, 224)} c="r" show={done}>পরিবর্তন = 20 m/s, পশ্চিমে</Lab>
          </Stage>
        );
      },
    },
    {
      title: "|A − B| কত?",
      text: (
        <>
          A = 5, B = 3। <b>θ</b> বদলাও আর দেখো <C k="r">A − B</C>-এর দৈর্ঘ্য কীভাবে বদলায়।
        </>
      ),
      prompt: (
        <div className="guide-play">
          <label className="guide-range-l">
            <span>θ</span>
            <input className="guide-range" type="range" min={0} max={180} value={theta} onChange={(e) => setTheta(Number(e.target.value))} />
            <b>{theta}°</b>
          </label>
          <div className="guide-chips">
            {[0, 60, 90, 120, 180].map((v) => (
              <button key={v} type="button" className={`guide-chip${theta === v ? " on" : ""}`} onClick={() => setTheta(v)}>
                {v}°
              </button>
            ))}
          </div>
          <div className="guide-read">
            <span>
              |A − B| = <C k="r">{f1(dmag)}</C>
            </span>
          </div>
          <p className="guide-note">{insight}</p>
        </div>
      ),
      figure: () => {
        const S3 = 30;
        const O = pt(130, 205);
        const aTip = pt(O.x + 5 * S3, O.y);
        const bTip = pt(O.x + 3 * S3 * Math.cos(th), O.y - 3 * S3 * Math.sin(th));
        return (
          <Stage w={440} h={260} label="কোণ বদলালে A − B-এর দৈর্ঘ্য বদলায়">
            <Vec a={O} b={aTip} c="p" w={4} />
            <Vec a={O} b={bTip} c="q" w={4} />
            <Vec a={bTip} b={aTip} c="r" w={5} />
            <Arc o={O} r={30} from={0} to={theta} c="f" w={1.5} />
            <Lab p={pol(O, theta / 2, 48)}>θ</Lab>
            <Dot p={O} c="f" r={5} />
            <Lab p={pt(O.x + 2.5 * S3, O.y + 22)} c="p">A = 5</Lab>
            <Lab p={add(bTip, -8, -8)} c="q" anchor="end">B = 3</Lab>
          </Stage>
        );
      },
    },
  ];

  const concept: GuideStep[] = raw.map((s) => ({ ...s, tag: "দেখো" }));

  const tail = tailSteps({
    meta,
    base: concept.length,
    picks,
    setPick,
    reveal,
    setReveal,
    summary: [
      {
        title: "বিয়োগ মানে উল্টে যোগ",
        text: "B-কে উল্টে −B বানিয়ে A-এর সাথে যোগ করো। ক্রম উল্টালে ফলের দিক উল্টে যায়।",
        tex: ["\\vec A-\\vec B=\\vec A+(-\\vec B)", "\\vec B-\\vec A=-(\\vec A-\\vec B)"],
      },
      {
        title: "মান আর উপাংশ",
        text: "যোগের সূত্রে শুধু cosθ-এর আগের চিহ্ন বদলে যায়। উপাংশে একই দিকের সংখ্যা আলাদা করে বিয়োগ হয়।",
        tex: ["|\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}", "\\vec A-\\vec B=(A_x-B_x)\\hat\\imath+(A_y-B_y)\\hat\\jmath"],
      },
    ],
  });

  const all = [...concept, ...tail];
  useFinishMark(step === all.length - 1);

  const chapterHref = `/${path.split("/").filter(Boolean).slice(0, 3).join("/")}`;

  return <Guide steps={all} step={step} onStep={setStep} onFinish={() => router.push(chapterHref)} />;
}
