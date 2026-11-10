"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Arc, Lab, Seg, SliderCard, Stage, Vec, col, pol, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { deg, f1 } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "আপেক্ষিক বেগ বের করার নিয়ম শিখবে, বৃষ্টিতে ছাতা কোন দিকে কত কোণে হেলাতে হয় তা হিসাব করতে পারবে এবং চলন্ত গাড়ির কোন কাচ ভিজবে তা বলতে পারবে।",
  hook: "ট্রেনে বসে পাশের লাইনের ধীরে চলা আরেকটা ট্রেনের দিকে তাকালে মনে হয় সেটা পেছনে সরে যাচ্ছে। আবার খাড়া বৃষ্টিতে দৌড়ালে বৃষ্টি যেন সামনে থেকে তেড়ে আসে। দুটোর কারণ এক: আমরা সব বেগ মাপি নিজের চোখ থেকে, নিজের বেগটা বিয়োগ করে।",
  formulas: [
    { tex: "\\vec v_{AB}=\\vec v_A-\\vec v_B", meaning: "B-এর সাপেক্ষে A-এর বেগ। যার সাপেক্ষে মাপছি, তার বেগ বিয়োগ হয়।" },
    { tex: "v_{AB}=v_A+v_B", meaning: "দুজন উল্টো দিকে চললে আপেক্ষিক বেগের মান যোগ হয়ে যায়।" },
    { tex: "\\vec v_{rm}=\\vec v_r-\\vec v_m", meaning: "মানুষের সাপেক্ষে বৃষ্টির বেগ।" },
    { tex: "v_{rm}=\\sqrt{v_r^2+v_m^2}", meaning: "বৃষ্টি খাড়া হলে মানুষের সাপেক্ষে বৃষ্টির বেগের মান।" },
    { tex: "\\tan\\theta=\\dfrac{v_m}{v_r}", meaning: "ছাতা খাড়া থেকে কত কোণে সামনে হেলাতে হবে।" },
  ],
  example: {
    problem: "একজন মানুষ 3 m/s বেগে সোজা হাঁটছে। বৃষ্টি 4 m/s বেগে খাড়া নিচে পড়ছে। মানুষের সাপেক্ষে বৃষ্টির বেগ কত? ছাতা খাড়া থেকে কত কোণে কোন দিকে হেলাতে হবে?",
    steps: [
      { text: "মানুষের চোখে বৃষ্টির বেগ বের করতে মানুষের বেগ বিয়োগ করি।", tex: "\\vec v_{rm}=\\vec v_r-\\vec v_m" },
      { text: "বৃষ্টির বেগ নিচে, মানুষের বেগ পাশে। দুটো পরস্পর লম্ব, তাই পিথাগোরাস।", tex: "v_{rm}=\\sqrt{4^2+3^2}=5\\ \\text{m/s}" },
      { text: "খাড়া থেকে কোণ বের করতে tan বসাই।", tex: "\\tan\\theta=\\frac{v_m}{v_r}=\\frac{3}{4}\\Rightarrow\\theta=36.9^\\circ" },
      { text: "উত্তর: আপেক্ষিক বেগ 5 m/s। ছাতা হাঁটার দিকে খাড়া থেকে 36.9° হেলাতে হবে।" },
    ],
  },
  mistakes: [
    "হাঁটলে বৃষ্টি পেছন থেকে আসছে ভাবা। মানুষ সামনে এগোয় বলে বৃষ্টি সামনে থেকে আসছে মনে হয়।",
    "বিয়োগের বদলে যোগ করা। আপেক্ষিক বেগে যার সাপেক্ষে মাপছি, তার বেগ বিয়োগ হয়।",
    "tanθ = v_r / v_m লেখা। খাড়া থেকে মাপা কোণে লবে বসে মানুষের বেগ।",
    "লম্ব দুই বেগের মান সরাসরি যোগ করা। 4 + 3 = 7 নয়, মান 5।",
  ],
  recap: [
    "আপেক্ষিক বেগ = যার বেগ মাপছি তার বেগ − যার চোখে দেখছি তার বেগ।",
    "একই দিকে চললে বেগের মান বিয়োগ হয়, উল্টো দিকে চললে যোগ হয়।",
    "খাড়া বৃষ্টিতে ছাতা হাঁটার দিকে θ কোণে হেলে, যেখানে tanθ = v_m / v_r।",
    "বাস সামনে চললে সামনের কাচ ভেজে। বৃষ্টির সাথে বাতাস থাকলে নির্ভর করে বাসের বেগ বাতাসের চেয়ে বেশি না কম।",
  ],
  quiz: [
    { q: "দুটি ট্রেন একই দিকে 60 km/h ও 40 km/h বেগে চলছে। দ্রুতটি থেকে ধীরটির আপেক্ষিক বেগের মান কত?", options: ["100 km/h", "20 km/h", "40 km/h", "60 km/h"], answer: 1, why: "একই দিকে চললে বিয়োগ হয়: 60 − 40 = 20 km/h। 100 km/h হতো উল্টো দিকে চললে।" },
    { q: "খাড়া বৃষ্টিতে স্থির মানুষের ছাতা কীভাবে ধরতে হবে?", options: ["সামনে হেলিয়ে", "পেছনে হেলিয়ে", "খাড়া", "যেকোনো দিকে"], answer: 2, why: "মানুষ স্থির থাকলে বৃষ্টি তার চোখেও খাড়া। তাই ছাতাও খাড়া।" },
    { q: "বৃষ্টি 4 m/s বেগে খাড়া পড়ছে, মানুষ 3 m/s বেগে হাঁটছে। মানুষের সাপেক্ষে বৃষ্টির বেগ কত?", options: ["1 m/s", "5 m/s", "7 m/s", "12 m/s"], answer: 1, why: "দুই বেগ লম্ব, তাই √(4² + 3²) = 5 m/s। 7 হলো সরাসরি যোগ করার ভুল।" },
    { q: "ওপরের প্রশ্নে ছাতা খাড়া থেকে কত কোণে হেলাতে হবে?", options: ["36.9°", "53.1°", "45°", "30°"], answer: 0, why: "tanθ = v_m / v_r = 3/4, তাই θ = 36.9°। 53.1° হলো tanθ = v_r / v_m নিলে পাওয়া ভুল কোণ।" },
    { q: "খাড়া বৃষ্টিতে একটি বাস সামনে চলছে। কোন কাচ ভিজবে?", options: ["পেছনের কাচ", "সামনের কাচ", "দুটোই সমান", "কোনোটিই নয়"], answer: 1, why: "বাসের চোখে বৃষ্টি সামনে থেকে তির্যকভাবে আসে। তাই ছাদের সাথে সামনের কাচ ভেজে, পেছনের কাচ শুকনো থাকে।" },
  ],
};

const KP = 12;
const P = (x: number, y: number): Pt => ({ x, y });

function Man({ at }: { at: Pt }) {
  return (
    <g style={{ stroke: col.f }} strokeWidth={3} strokeLinecap="round" fill="none">
      <circle cx={at.x} cy={at.y - 42} r={7} style={{ fill: col.f }} />
      <line x1={at.x} y1={at.y - 35} x2={at.x} y2={at.y - 12} />
      <line x1={at.x} y1={at.y - 12} x2={at.x - 8} y2={at.y} />
      <line x1={at.x} y1={at.y - 12} x2={at.x + 8} y2={at.y} />
      <line x1={at.x} y1={at.y - 28} x2={at.x - 9} y2={at.y - 18} />
      <line x1={at.x} y1={at.y - 28} x2={at.x + 9} y2={at.y - 18} />
    </g>
  );
}

export default function Anim() {
  const [vm, setVm] = useState(3);
  const [vr, setVr] = useState(4);
  const [w, setW] = useState(0);

  const vrmMan = Math.hypot(vr, vm);
  const thetaMan = deg(Math.atan2(vm, vr));
  const vrmBus = Math.hypot(w - vm, vr);

  const steps: LessonStep[] = [
    {
      title: "পাশের ট্রেন",
      text: "তুমি 60 km/h বেগের ট্রেন A-তে বসে আছো। পাশের লাইনে একই দিকে 40 km/h বেগে চলছে ট্রেন B। A-এর জানালা দিয়ে B-কে কেমন চলতে দেখাবে?",
      note: "দ্রুত ট্রেন থেকে ধীর ট্রেনকে মনে হবে পেছনে সরে যাচ্ছে।",
    },
    {
      title: "বিয়োগের নিয়ম",
      text: "A-এর চোখে B-এর বেগ বের করতে B-এর বেগ থেকে A-এর বেগ বিয়োগ করি। যার চোখে দেখছি, তার বেগটাই বিয়োগ হয়। ফল ঋণাত্মক, মানে B পেছনে সরছে।",
      tex: ["\\vec v_{BA}=\\vec v_B-\\vec v_A", "v_{BA}=40-60=-20\\ \\text{km/h}"],
      note: "উল্টো দিকে চললে বিয়োগের ফলে মান যোগ হয়ে যায়। যেমন 60 আর 40 হলে 100 km/h।",
    },
    {
      title: "স্থির মানুষ",
      text: "এবার বৃষ্টি। বাঁ ছবিতে মাটি থেকে দেখো, বৃষ্টি খাড়া নিচে পড়ছে। মানুষ দাঁড়িয়ে আছে, তাই ডান ছবিতে তার চোখেও বৃষ্টি খাড়া। ছাতা খাড়া ধরলেই চলে।",
    },
    {
      title: "হাঁটলে কী হয়",
      text: "মানুষ ডান দিকে v_m বেগে হাঁটছে। তার চোখে বৃষ্টির বেগ হলো বৃষ্টির বেগ থেকে মানুষের বেগ বিয়োগ। তাই বৃষ্টি সামনে থেকে তির্যকভাবে আসছে মনে হয়।",
      tex: ["\\vec v_{rm}=\\vec v_r-\\vec v_m"],
    },
    {
      title: "কোণ আর মান",
      text: "v_r নিচে আর v_m পাশে, দুটো লম্ব। তাই মানের জন্য পিথাগোরাস, কোণের জন্য tan।",
      tex: [`v_{rm}=\\sqrt{v_r^2+v_m^2}=\\sqrt{${vr}^2+${vm}^2}=${f1(vrmMan)}`, `\\tan\\theta=\\frac{v_m}{v_r}=\\frac{${vm}}{${vr}}\\Rightarrow\\theta=${f1(thetaMan)}^\\circ`],
    },
    {
      title: "ছাতা কোন দিকে",
      text: "ছাতা ধরতে হয় বৃষ্টি যেদিক থেকে আসছে সেদিকে মুখ করে। তাই ছাতা হাঁটার দিকে খাড়া থেকে θ কোণে হেলাতে হবে।",
      note: "দ্রুত হাঁটলে θ বাড়ে, ছাতা আরও বেশি হেলাতে হয়।",
    },
    {
      title: "গাড়ির কাচ",
      text: "একটা বাস সামনে এগোচ্ছে, বৃষ্টি খাড়া। বাসের চোখে বৃষ্টি সামনে থেকে তির্যকভাবে আসছে। তাই ছাদের সাথে সামনের কাচ ভিজবে। পেছনের কাচ শুকনো থাকবে।",
    },
    {
      title: "বাতাস থাকলে",
      text: "বাতাস বাসের দিকেই বইলে বৃষ্টির অনুভূমিক বেগ w। তখন বাসের সাপেক্ষে অনুভূমিক বেগ w − v_c। v_c > w হলে সামনের কাচ ভেজে। v_c < w হলে বৃষ্টি পেছন থেকে ধরে ফেলে, পেছনের কাচ ভেজে।",
      tex: ["v_x=w-v_c"],
    },
    {
      title: "নিজে করো",
      text: "বাসের বেগ, বৃষ্টির বেগ আর বাতাস বদলাও। দেখো কখন কোন কাচ ভেজে এবং বাসের চোখে বৃষ্টির বেগ কত হয়।",
      tex: [`v_{rel}=\\sqrt{(w-v_c)^2+v_r^2}=${f1(vrmBus)}\\ \\text{m/s}`],
    },
  ];

  const trains = (s: number) => (
    <Stage w={440} h={290} label="দুটি ট্রেনের আপেক্ষিক বেগ">
      {s === 0 ? (
        <>
          <line x1={20} y1={110} x2={420} y2={110} strokeWidth={2} strokeDasharray="6 6" style={{ stroke: col.l }} />
          <line x1={20} y1={190} x2={420} y2={190} strokeWidth={2} strokeDasharray="6 6" style={{ stroke: col.l }} />
          <motion.g animate={{ x: [0, 150] }} transition={{ duration: 3.5, ease: "linear", repeat: Infinity, repeatDelay: 0.6 }}>
            <rect x={30} y={78} width={100} height={32} rx={8} style={{ fill: col.p }} />
            <text x={80} y={99} textAnchor="middle" fontSize={13} fontWeight={700} style={{ fill: "#fff" }}>A  60 km/h</text>
          </motion.g>
          <motion.g animate={{ x: [0, 100] }} transition={{ duration: 3.5, ease: "linear", repeat: Infinity, repeatDelay: 0.6 }}>
            <rect x={150} y={158} width={100} height={32} rx={8} style={{ fill: col.q }} />
            <text x={200} y={179} textAnchor="middle" fontSize={13} fontWeight={700} style={{ fill: "#fff" }}>B  40 km/h</text>
          </motion.g>
          <Lab p={P(220, 40)} c="m">দুটি ট্রেন একই দিকে চলছে</Lab>
        </>
      ) : (
        <>
          <line x1={200} y1={95} x2={200} y2={235} strokeWidth={1.5} strokeDasharray="4 4" style={{ stroke: col.l }} />
          <Vec a={P(200, 120)} b={P(296, 120)} c="q" w={4} />
          <Lab p={P(248, 108)} c="q">v_B = 40</Lab>
          <Seg a={P(296, 120)} b={P(296, 160)} dash c="m" w={1.5} />
          <Vec a={P(296, 160)} b={P(152, 160)} c="p" w={4} dash />
          <Lab p={P(224, 182)} c="p">−v_A = −60</Lab>
          <Vec a={P(200, 215)} b={P(152, 215)} c="r" w={4.5} />
          <Lab p={P(176, 238)} c="r">v_BA = −20</Lab>
          <Lab p={P(220, 40)} c="m">সব বেগ km/h এ</Lab>
        </>
      )}
    </Stage>
  );

  const panels = (s: number) => {
    const vmE = s === 2 ? 0 : vm;
    const relx = -vmE * KP;
    const rely = vr * KP;
    const len = Math.hypot(relx, rely);
    const dir = P(-relx / len, -rely / len);
    const L = P(110, 222);
    const R = P(330, 222);
    const headR = P(R.x, R.y - 56);
    const hand = P(R.x, R.y - 30);
    const cen = P(hand.x + dir.x * 64, hand.y + dir.y * 64);
    const perp = P(-dir.y * 34, dir.x * 34);
    const phi = deg(Math.atan2(vr, vmE));
    const theta = deg(Math.atan2(vmE, vr));
    const vrm = Math.hypot(vr, vmE);
    return (
      <Stage w={440} h={290} label="মাটি থেকে ও মানুষের চোখে বৃষ্টির বেগ">
        <line x1={220} y1={20} x2={220} y2={262} strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.l }} />
        <line x1={30} y1={L.y} x2={200} y2={L.y} strokeWidth={3} strokeLinecap="round" style={{ stroke: col.m }} />
        <line x1={240} y1={R.y} x2={420} y2={R.y} strokeWidth={3} strokeLinecap="round" style={{ stroke: col.m }} />
        <Lab p={P(110, 24)} c="m">মাটি থেকে দেখলে</Lab>
        <Lab p={P(330, 24)} c="m">মানুষের চোখে</Lab>
        <Man at={L} />
        <Man at={R} />

        {[-36, 0, 36].map((dx) => (
          <Seg key={`l${dx}`} a={P(L.x + dx, L.y - 56 - vr * KP)} b={P(L.x + dx, L.y - 56)} c="t" head w={2.5} />
        ))}
        <Lab p={P(L.x + 46, L.y - 56 - (vr * KP) / 2)} c="t" anchor="start">v_r</Lab>
        <Vec a={P(L.x, L.y + 26)} b={P(L.x + vmE * KP, L.y + 26)} c="p" w={3.5} show={s >= 3 && vmE > 0} />
        <Lab p={P(L.x + (vmE * KP) / 2, L.y + 46)} c="p" show={s >= 3 && vmE > 0}>v_m</Lab>

        {[-36, 0, 36].map((dx) => {
          const e = P(R.x + dx, R.y - 56);
          return <Vec key={`r${dx}`} a={P(e.x - relx, e.y - rely)} b={e} c="r" w={2.5} />;
        })}
        <Lab p={P(R.x - relx / 2 + 14, R.y - 56 - rely / 2)} c="r" anchor="start" show={s >= 3}>v_rm</Lab>

        <Seg a={headR} b={P(headR.x, headR.y - 70)} dash c="m" w={1.5} show={s >= 4} />
        <Arc o={headR} r={38} from={Math.min(phi, 90)} to={Math.max(phi, 90)} c="f" w={1.5} show={s >= 4} />
        <Lab p={pol(headR, (phi + 90) / 2, 54)} show={s >= 4}>θ</Lab>

        <Seg a={hand} b={cen} c="f" w={3} show={s >= 5} />
        <Seg a={P(cen.x - perp.x, cen.y - perp.y)} b={P(cen.x + perp.x, cen.y + perp.y)} c="v" w={7} show={s >= 5} />

        <Lab p={P(220, 276)} show={s >= 4} c="r">v_rm = {f1(vrm)} m/s,  θ = {f1(theta)}°</Lab>
      </Stage>
    );
  };

  const bus = (s: number) => {
    const wE = s >= 7 ? w : 0;
    const relx = (wE - vm) * KP;
    const rely = vr * KP;
    const front = relx < -0.5;
    const rear = relx > 0.5;
    const ends = [P(170, 146), P(220, 146), P(270, 146), P(294, 184), P(294, 162), P(146, 184), P(146, 162)];
    return (
      <Stage w={440} h={290} label="চলন্ত বাসের কোন কাচ ভেজে">
        <line x1={20} y1={219} x2={420} y2={219} strokeWidth={3} strokeLinecap="round" style={{ stroke: col.m }} />
        {ends.map((e, i) => (
          <Vec key={i} a={P(e.x - relx, e.y - rely)} b={e} c="t" w={2.5} />
        ))}
        <rect x={150} y={150} width={140} height={56} rx={8} strokeWidth={3} style={{ fill: "var(--surface)", stroke: "var(--edge)" }} />
        {[168, 208, 248].map((x) => (
          <rect key={x} x={x} y={162} width={28} height={22} rx={4} style={{ fill: "var(--surface-2)" }} />
        ))}
        <line x1={152} y1={150} x2={288} y2={150} strokeWidth={6} strokeLinecap="round" style={{ stroke: col.t }} />
        <line x1={290} y1={158} x2={290} y2={198} strokeWidth={7} strokeLinecap="round" style={{ stroke: front ? col.p : col.m }} />
        <line x1={150} y1={158} x2={150} y2={198} strokeWidth={7} strokeLinecap="round" style={{ stroke: rear ? col.p : col.m }} />
        <circle cx={185} cy={208} r={11} style={{ fill: col.f }} />
        <circle cx={255} cy={208} r={11} style={{ fill: col.f }} />

        <Lab p={P(220, 24)} c="m">বাসের চোখে বৃষ্টি</Lab>
        <Vec a={P(190, 236)} b={P(190 + vm * KP, 236)} c="v" w={3.5} show={vm > 0} />
        <Lab p={P(180, 240)} c="v" anchor="end">বাসের বেগ</Lab>
        <Lab p={P(290, 262)} c={front ? "p" : "m"}>সামনের কাচ</Lab>
        <Lab p={P(150, 262)} c={rear ? "p" : "m"}>পেছনের কাচ</Lab>
        <Lab p={P(220, 282)} c="r">{front ? "সামনের কাচ ভিজছে" : rear ? "পেছনের কাচ ভিজছে" : "শুধু ছাদ ভিজছে"}</Lab>
      </Stage>
    );
  };

  const figure = (s: number) => {
    if (s <= 1) return trains(s);
    if (s <= 5) return panels(s);
    return bus(s);
  };

  const extra = (
    <SliderCard>
      <Slider label="মানুষ বা বাসের বেগ (m/s)" value={vm} min={0} max={7} onChange={setVm} />
      <Slider label="বৃষ্টির বেগ v_r (m/s)" value={vr} min={1} max={8} onChange={setVr} />
      <Slider label="বাতাসের বেগ w (m/s, সামনের দিকে ধনাত্মক)" value={w} min={-3} max={3} onChange={setW} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
