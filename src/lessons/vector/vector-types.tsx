"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Guide, type GuideStep } from "@/components/lesson/Guide";
import { C, Choices, tailSteps, useFinishMark } from "@/components/lesson/guide-kit";
import { Dot, Lab, Seg, Stage, Vec, add, col, mid, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "সমান, বিপরীত, শূন্য, একক, অবস্থান ও সমান্তরাল ভেক্টর চিনবে এবং প্রতিটির নিয়ম বলতে পারবে।",
  hook: "দুই ভাই ঠিক একই গতিতে একই দিকে হাঁটছে, একজন সামনে আরেকজন পেছনে। তাদের বেগ কি আলাদা? না। ভেক্টরের পরিচয় জায়গায় নয়, মান আর দিকে।",
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
    "বিপরীত ভেক্টর: মান এক, দিক উল্টো। দুটো যোগ করলে শূন্য ভেক্টর।",
    "একক ভেক্টর: মান 1, কাজ শুধু দিক দেখানো। অবস্থান ভেক্টর: মূলবিন্দু থেকে বিন্দু পর্যন্ত।",
    "সমান্তরাল ভেক্টর: একটি আরেকটির কোনো সংখ্যা গুণিতক।",
  ],
  think: {
    scenario: "একটা মাঠে তিনজন একই গতিতে একই দিকে হাঁটছে, কিন্তু আলাদা আলাদা জায়গায়। চতুর্থজন তাদের ঠিক উল্টো দিকে একই গতিতে হাঁটছে। পঞ্চমজন দাঁড়িয়ে আছে।",
    points: [
      "প্রথম তিনজনের বেগ কি সমান ভেক্টর? জায়গা আলাদা হলে কি কিছু বদলায়?",
      "চতুর্থজনের বেগ প্রথমজনের কীসের মতো? দুটো বেগ যোগ করলে কী পাবে?",
      "পঞ্চমজনের বেগকে কোন ভেক্টর বলা যায়? সেটা কি সাধারণ সংখ্যা 0?",
      "প্রথমজনের গতির দিক বোঝাতে একটা একক ভেক্টর কীভাবে বানাবে, আর তার মান কত হবে?",
    ],
    hint: "ভেক্টরের পরিচয় মান আর দিকে, জায়গায় নয়। উল্টো দিকের দুই বেগের যোগফল শূন্য ভেক্টর। একক ভেক্টর বানাতে ভেক্টরকে নিজের মান দিয়ে ভাগ করো।",
    traps: [
      "শূন্য ভেক্টর আর সংখ্যা 0 একই জিনিস।",
      "দুই ভেক্টরের মান সমান হলেই তারা সমান ভেক্টর।",
      "একক ভেক্টর মানে ছোট ভেক্টর।",
      "অবস্থান ভেক্টর যেকোনো বিন্দু থেকে শুরু হতে পারে।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = 3î + 4ĵ। (ক) A⃗-এর বিপরীত ভেক্টর কী? (খ) A⃗-এর দিকে একক ভেক্টর বের করো। (গ) A⃗-এর সমান্তরাল এবং মান 10 এমন একটি ভেক্টর বের করো।",
      hint: "একক ভেক্টর = ভেক্টর ÷ তার মান।",
      steps: [
        { text: "(ক) বিপরীত ভেক্টরে প্রতিটি উপাংশের চিহ্ন উল্টে যায়।", tex: "-\\vec A=-3\\hat\\imath-4\\hat\\jmath" },
        { text: "(খ) আগে মান বের করি, তারপর ভাগ করি।", tex: "A=\\sqrt{3^2+4^2}=5,\\quad \\hat A=\\frac{3\\hat\\imath+4\\hat\\jmath}{5}=0.6\\hat\\imath+0.8\\hat\\jmath" },
        { text: "(গ) একক ভেক্টরকে 10 দিয়ে গুণ করলে মান 10 হয়, দিক একই থাকে।", tex: "10\\hat A=6\\hat\\imath+8\\hat\\jmath" },
        { text: "যাচাই: √(6² + 8²) = 10। উল্টো দিকেরটাও (−6î − 8ĵ) সমান্তরাল ও মান 10, তাই সেটাও সঠিক উত্তর।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A⃗ = 2î − 2ĵ + k̂ হলে A⃗-এর মান এবং A⃗-এর দিকে একক ভেক্টর বের করো।",
      hint: "ত্রিমাত্রায় মান বের করতে তিন উপাংশের বর্গ যোগ করো।",
      steps: [
        { text: "মান বের করি।", tex: "A=\\sqrt{2^2+(-2)^2+1^2}=\\sqrt{9}=3" },
        { text: "মান দিয়ে ভাগ করে একক ভেক্টর পাই।", tex: "\\hat A=\\frac{2\\hat\\imath-2\\hat\\jmath+\\hat k}{3}" },
        { text: "যাচাই: একক ভেক্টরের মান 1 হওয়া উচিত।", tex: "\\sqrt{\\frac{4}{9}+\\frac{4}{9}+\\frac{1}{9}}=\\sqrt{1}=1" },
      ],
    },
    {
      level: "কঠিন",
      q: "B⃗ = 6î + 8ĵ ভেক্টরের সমান্তরাল ও বিপরীতমুখী এবং মান 5 এমন ভেক্টর বের করো।",
      hint: "আগে B⃗-এর দিকে একক ভেক্টর বানাও, তারপর দিক উল্টে মান বসাও।",
      steps: [
        { text: "B⃗-এর মান বের করি।", tex: "B=\\sqrt{6^2+8^2}=10" },
        { text: "B⃗-এর দিকে একক ভেক্টর।", tex: "\\hat B=0.6\\hat\\imath+0.8\\hat\\jmath" },
        { text: "বিপরীতমুখী করতে চিহ্ন উল্টাই, তারপর মান 5 দিয়ে গুণ করি।", tex: "-5\\hat B=-3\\hat\\imath-4\\hat\\jmath" },
        { text: "যাচাই: √(3² + 4²) = 5। উত্তর: −3î − 4ĵ।" },
      ],
    },
  ],
  concepts: [
    "B⃗ = kA⃗ সম্পর্কে k ঋণাত্মক হলে B⃗ কেমন হয়? আর k = 0 হলে কী পাও?",
    "শূন্য ভেক্টরের কোনো নির্দিষ্ট দিক নেই। তবু একে ভেক্টর বলা সুবিধাজনক কেন? A + (−A) ভেবে দেখো।",
    "অবস্থান ভেক্টর কেন মূলবিন্দু থেকে ধরতে হয়? মূলবিন্দু বদলালে কী বদলে যাবে?",
  ],
  quiz: [
    { q: "A⃗ ও −A⃗ যোগ করলে কী পাওয়া যায়?", options: ["2A⃗", "শূন্য ভেক্টর", "সংখ্যা 0 (স্কেলার)", "একক ভেক্টর"], answer: 1, why: "ফল একটা ভেক্টর, যার মান শূন্য। এর নাম শূন্য ভেক্টর। এটা সাধারণ সংখ্যা 0 নয়।" },
    { q: "একক ভেক্টরের মান কত?", options: ["0", "1", "A", "অসীম"], answer: 1, why: "একক ভেক্টরের সংজ্ঞাই হলো মান ঠিক 1।" },
    { q: "(2, 3) বিন্দুর অবস্থান ভেক্টর কোনটি?", options: ["2î + 3ĵ", "3î + 2ĵ", "5î", "2î − 3ĵ"], answer: 0, why: "x = 2 হলে î-এর সহগ 2, y = 3 হলে ĵ-এর সহগ 3।" },
    { q: "দুই ভেক্টরের মান সমান কিন্তু দিক আলাদা। তারা কি সমান ভেক্টর?", options: ["হ্যাঁ", "না, দিকও সমান হতে হবে", "শুধু বিপরীত হলে হ্যাঁ", "বলা যায় না"], answer: 1, why: "সমান ভেক্টরের জন্য মান ও দিক দুটোই এক হতে হয়।" },
    { q: "A⃗ = 2î + 2ĵ + k̂ হলে A⃗-এর মান কত?", options: ["3", "5", "2.5", "√5"], answer: 0, why: "√(2² + 2² + 1²) = √9 = 3। তিন উপাংশের বর্গই যোগ হয়।" },
  ],
};

const pt = (x: number, y: number): Pt => ({ x, y });

export default function Anim() {
  const router = useRouter();
  const path = usePathname();
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [reveal, setRevealState] = useState<Record<number, number>>({});
  const [k, setK] = useState(2);

  const setPick = (i: number, v: number) => setPicks((p) => ({ ...p, [i]: v }));
  const setReveal = (i: number, n: number) => setRevealState((p) => ({ ...p, [i]: n }));
  const pick = (i: number) => (v: number) => setPick(i, v);

  const insight =
    k === 1
      ? "k = 1: B আর A সমান ভেক্টর।"
      : k === -1
        ? "k = −1: B হলো A-এর বিপরীত ভেক্টর।"
        : k === 0
          ? "k = 0: B হলো শূন্য ভেক্টর।"
          : k > 1
            ? "k > 1: B একই দিকে, কিন্তু A-এর চেয়ে লম্বা।"
            : k > 0
              ? "0 < k < 1: B একই দিকে, কিন্তু A-এর চেয়ে ছোট।"
              : "k < 0: B উল্টো দিকে।";

  const raw: GuideStep[] = [
    {
      title: "কোন দুটি সমান?",
      text: (
        <>
          তিনজন হাঁটছে, তীরগুলো তাদের গতি। কোন দুটি তীর <b>সমান ভেক্টর</b>?
        </>
      ),
      locked: picks[0] === undefined,
      prompt: <Choices options={["A আর B", "A আর C", "B আর C"]} answer={0} picked={picks[0]} onPick={pick(0)} explain="A আর B-এর মান আর দিক দুটোই এক, জায়গা আলাদা হলেও। জায়গা বদলালে ভেক্টর বদলায় না।" />,
      figure: () => {
        const done = picks[0] !== undefined;
        const a0 = pt(50, 100);
        const a1 = pt(190, 60);
        const b0 = pt(50, 200);
        const b1 = pt(190, 160);
        const c0 = pt(250, 215);
        const c1 = pt(370, 135);
        return (
          <Stage w={440} h={260} label="তিনটি তীর, কোন দুটি সমান?">
            <Vec a={a0} b={a1} c="p" w={4} />
            <Vec a={b0} b={b1} c="q" w={4} />
            <Vec a={c0} b={c1} c="u" w={4} />
            <Seg a={a0} b={b0} dash c="m" w={1.5} show={done} />
            <Seg a={a1} b={b1} dash c="m" w={1.5} show={done} />
            <Lab p={add(mid(a0, a1), 0, -14)} c="p">A</Lab>
            <Lab p={add(mid(b0, b1), 0, 22)} c="q">B</Lab>
            <Lab p={add(mid(c0, c1), 12, 14)} c="u" anchor="start">C</Lab>
            <Lab p={pt(120, 134)} c="m" show={done}>A = B</Lab>
          </Stage>
        );
      },
    },
    {
      title: "বিপরীত ভেক্টর",
      text: (
        <>
          B-এর মান একই রাখো, কিন্তু দিক ঠিক উল্টো করো। নতুন ভেক্টরটা হলো B-এর <b>বিপরীত ভেক্টর</b>, লেখা হয় <C k="q">−B</C>।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const O = pt(220, 130);
        return (
          <Stage w={440} h={260} label="B আর তার বিপরীত ভেক্টর −B">
            <Vec a={O} b={pt(O.x + 86, O.y - 50)} c="q" w={4} />
            <Vec a={O} b={on ? pt(O.x - 86, O.y + 50) : O} c="q" w={4} dash show={on} />
            <Dot p={O} c="f" r={5} />
            <Lab p={pt(O.x + 96, O.y - 62)} c="q" anchor="start">B</Lab>
            <Lab p={pt(O.x - 96, O.y + 70)} c="q" anchor="end" show={on}>−B</Lab>
          </Stage>
        );
      },
    },
    {
      title: "ঘুরে এলে",
      text: "তুমি B দূরত্ব হেঁটে ঠিক উল্টো দিকে একই দূরত্ব ফিরে এলে। শুরু থেকে তোমার সরণ কত?",
      locked: picks[2] === undefined,
      prompt: <Choices options={["B-এর দ্বিগুণ", "শূন্য", "B-এর অর্ধেক"]} answer={1} picked={picks[2]} onPick={pick(2)} explain="ফিরে এসেছ শুরুর বিন্দুতেই, তাই সরণ শূন্য। একে বলে শূন্য ভেক্টর। এর মান 0, কিন্তু এটা সাধারণ সংখ্যা 0 নয়, একটা ভেক্টর।" />,
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const done = picks[2] !== undefined;
        const O = pt(110, 130);
        return (
          <Stage w={440} h={260} label="B হেঁটে −B ফিরে এলে সরণ শূন্য">
            <Vec a={pt(O.x, O.y - 14)} b={pt(O.x + 200, O.y - 14)} c="q" w={4} />
            <Vec a={pt(O.x + 200, O.y + 14)} b={on ? pt(O.x, O.y + 14) : pt(O.x + 200, O.y + 14)} c="q" w={4} dash />
            {done ? <circle cx={O.x} cy={O.y} r={22} fill="none" strokeWidth={3} style={{ stroke: col.r }} /> : null}
            <Dot p={O} c="f" r={6} />
            <Lab p={pt(O.x - 12, O.y + 36)} anchor="end">শুরু</Lab>
            <Lab p={pt(O.x + 100, O.y - 34)} c="q">B</Lab>
            <Lab p={pt(O.x + 100, O.y + 42)} c="q" show={on}>−B</Lab>
            <Lab p={pt(O.x + 60, O.y + 100)} c="r" show={done}>সরণ = শূন্য ভেক্টর</Lab>
          </Stage>
        );
      },
    },
    {
      title: "একক ভেক্টর",
      text: (
        <>
          A-কে তার নিজের মান দিয়ে ভাগ করো। মান হবে ঠিক 1, দিক একই। এটাই A-এর দিকের <b>একক ভেক্টর Â</b>। তার মাথা সব সময় একক বৃত্তের ওপর পড়ে।
        </>
      ),
      tex: ["\\hat A=\\dfrac{\\vec A}{|\\vec A|}"],
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const O = pt(110, 200);
        const aTip = pt(O.x + 190.5, O.y - 110);
        const uTip = pt(O.x + 38.1, O.y - 22);
        return (
          <Stage w={440} h={260} label="ভেক্টর A আর তার একক ভেক্টর">
            <circle cx={O.x} cy={O.y} r={44} fill="none" strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
            <Vec a={O} b={aTip} c="p" w={4} />
            <Vec a={O} b={on ? uTip : O} c="v" w={5} show={on} />
            <Dot p={O} c="f" r={5} />
            <Lab p={add(mid(O, aTip), 12, -14)} c="p" anchor="start">A, মান = 5</Lab>
            <Lab p={add(uTip, 14, 18)} c="v" anchor="start" show={on}>Â, মান = 1</Lab>
          </Stage>
        );
      },
    },
    {
      title: "অবস্থান ভেক্টর",
      text: (
        <>
          ঘর থেকে স্কুলের দিকে একটা তীর টানো। মূলবিন্দু থেকে (3, 2) বিন্দু পর্যন্ত তীরটাই <b>অবস্থান ভেক্টর r</b>। এর শুরু সব সময় মূলবিন্দুতে। î মানে x-দিকে 1 একক, ĵ মানে y-দিকে 1 একক।
        </>
      ),
      tex: ["\\vec r=3\\hat\\imath+2\\hat\\jmath"],
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const O = pt(80, 210);
        const P = pt(230, 110);
        return (
          <Stage w={440} h={260} label="মূলবিন্দু থেকে (3, 2) বিন্দুর অবস্থান ভেক্টর">
            <Vec a={pt(60, 210)} b={pt(410, 210)} c="m" w={1.5} />
            <Vec a={pt(80, 230)} b={pt(80, 30)} c="m" w={1.5} />
            <Lab p={pt(412, 228)} c="m" anchor="end">x</Lab>
            <Lab p={pt(94, 36)} c="m" anchor="start">y</Lab>
            <Seg a={P} b={pt(P.x, 210)} dash c="m" w={1.5} show={on} />
            <Seg a={P} b={pt(80, P.y)} dash c="m" w={1.5} show={on} />
            <Vec a={O} b={on ? P : O} c="r" w={5} show={on} />
            <Dot p={O} c="f" r={5} />
            <Lab p={pt(O.x - 10, O.y + 20)} anchor="end">মূলবিন্দু</Lab>
            <Lab p={add(P, 12, -8)} c="r" anchor="start" show={on}>(3, 2)</Lab>
            <Lab p={add(mid(O, P), -10, -10)} c="r" anchor="end" show={on}>r</Lab>
          </Stage>
        );
      },
    },
    {
      title: "সমান্তরাল ভেক্টর",
      text: (
        <>
          <b>k</b> বদলাও। B = kA, মানে B সব সময় A-এর সাথে এক সরলরেখা বরাবর। k = 1 হলে সমান, k = −1 হলে বিপরীত, k = 0 হলে শূন্য ভেক্টর।
        </>
      ),
      prompt: (
        <div className="guide-play">
          <label className="guide-range-l">
            <span>k</span>
            <input className="guide-range" type="range" min={-2} max={3} step={0.5} value={k} onChange={(e) => setK(Number(e.target.value))} />
            <b>{k}</b>
          </label>
          <div className="guide-chips">
            {[-1, 0, 1, 2].map((v) => (
              <button key={v} type="button" className={`guide-chip${k === v ? " on" : ""}`} onClick={() => setK(v)}>
                {v}
              </button>
            ))}
          </div>
          <p className="guide-note">{insight}</p>
        </div>
      ),
      figure: () => {
        const a0 = pt(150, 120);
        const a1 = pt(210, 90);
        const b0 = pt(150, 170);
        const b1 = pt(150 + k * 60, 170 - k * 30);
        return (
          <Stage w={440} h={260} label="B = kA, A-এর সমান্তরাল ভেক্টর">
            <Vec a={a0} b={a1} c="p" w={4} />
            <Vec a={b0} b={b1} c="q" w={4} />
            <Dot p={b0} c="f" r={4} />
            <Lab p={add(mid(a0, a1), 6, -14)} c="p" anchor="start">A</Lab>
            <Lab p={pt(150, 200)} c="q">B = {k}A</Lab>
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
        title: "বিপরীত আর শূন্য ভেক্টর",
        text: "উল্টো দিকের ভেক্টর −A। দুটো যোগ করলে শূন্য ভেক্টর, যা একটা ভেক্টর, সাধারণ সংখ্যা 0 নয়।",
        tex: ["-\\vec A", "\\vec A+(-\\vec A)=\\vec 0"],
      },
      {
        title: "একক আর সমান্তরাল ভেক্টর",
        text: "একক ভেক্টরের মান 1। সমান্তরাল ভেক্টর একে অপরের গুণিতক।",
        tex: ["\\hat A=\\dfrac{\\vec A}{|\\vec A|}", "\\vec B=k\\vec A"],
      },
    ],
  });

  const all = [...concept, ...tail];
  useFinishMark(step === all.length - 1);

  const chapterHref = `/${path.split("/").filter(Boolean).slice(0, 3).join("/")}`;

  return <Guide steps={all} step={step} onStep={setStep} onFinish={() => router.push(chapterHref)} />;
}
