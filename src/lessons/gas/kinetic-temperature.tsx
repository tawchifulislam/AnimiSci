"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { Lab, Seg, Stage, Vec, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "তাপমাত্রা আসলে অণুর গড় গতিশক্তির মাপ, এটা বুঝবে এবং c_rms = √(3RT/M) দিয়ে অঙ্ক করতে পারবে।",
  hook: "তাপমাত্রা মানে কী? থার্মোমিটারে যা মাপি, তার ভেতরে আসলে অণুরা কীভাবে ছুটছে?",
  formulas: [
    { tex: "\\tfrac12m\\overline{c^2}=\\tfrac32kT", meaning: "প্রতি অণুর গড় গতিশক্তি শুধু তাপমাত্রার ওপর নির্ভর করে। k = 1.38 × 10^-23 J/K।" },
    { tex: "c_{rms}=\\sqrt{\\dfrac{3RT}{M}}", meaning: "M মোলার ভর, kg/mol এককে।" },
    { tex: "c_{rms}\\propto\\sqrt{T}", meaning: "T চার গুণ হলে c_rms দ্বিগুণ।" },
  ],
  example: {
    problem: "300 K তাপমাত্রায় একটি অণুর গড় গতিশক্তি কত? (k = 1.38 × 10^-23 J/K)",
    steps: [
      { text: "সূত্রে বসাই।", tex: "E=\\dfrac32kT=1.5\\times1.38\\times10^{-23}\\times300" },
      { text: "উত্তর: প্রায় 6.21 × 10^-21 J।" },
    ],
  },
  mistakes: [
    "গতিশক্তি অণুর ভরের ওপর নির্ভর করে ভাবা। গড় গতিশক্তি শুধু T এর ওপর নির্ভর করে।",
    "c_rms সূত্রে M গ্রামে বসানো। M kg/mol এ বসাতে হয়।",
    "সেলসিয়াস T বসানো।",
  ],
  recap: [
    "তাপমাত্রা অণুর গড় গতিশক্তির মাপ।",
    "একই T তে হালকা অণু বেশি দ্রুত ছোটে।",
    "T বাড়লে বেগ বণ্টনের শিখর ডানে সরে আর চ্যাপ্টা হয়।",
    "c_rms = √(3RT/M)।",
  ],
  think: {
    scenario: "একটা ঘরে হাইড্রোজেন আর অক্সিজেন দুটোই একই তাপমাত্রায় আছে। হাইড্রোজেন অনেক হালকা।",
    points: [
      "দুই গ্যাসের অণুর গড় গতিশক্তি কি সমান, নাকি আলাদা?",
      "তাহলে কোন গ্যাসের অণু বেশি দ্রুত ছোটে আর কেন?",
    ],
    hint: "গড় গতিশক্তি ½mc² সমান। m ছোট হলে c কেমন হতে হবে?",
    traps: ["একই তাপমাত্রায় হালকা অণুর গতিশক্তি কম।", "একই T তে সব গ্যাসের অণুর বেগ সমান।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "300 K তাপমাত্রায় একটি অণুর গড় গতিশক্তি কত? (k = 1.38 × 10^-23 J/K)",
      hint: "E = (3/2)kT।",
      steps: [
        { text: "সংখ্যা বসাই।", tex: "E=1.5\\times1.38\\times10^{-23}\\times300" },
        { text: "উত্তর: প্রায় 6.21 × 10^-21 J।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "300 K এ অক্সিজেনের (M = 0.032 kg/mol) c_rms কত? (R = 8.314)",
      hint: "c_rms = √(3RT ÷ M)।",
      steps: [
        { text: "বসাই।", tex: "c_{rms}=\\sqrt{\\dfrac{3\\times8.314\\times300}{0.032}}=\\sqrt{233831}" },
        { text: "উত্তর: প্রায় 484 m/s।" },
      ],
    },
    {
      level: "কঠিন",
      q: "300 K এ নাইট্রোজেনের c_rms প্রায় 517 m/s। তাপমাত্রা 1200 K করলে c_rms কত হবে?",
      hint: "T কত গুণ হলো, c কত গুণ হবে তা √ থেকে বের করো।",
      steps: [
        { text: "T কত গুণ?", tex: "\\dfrac{1200}{300}=4" },
        { text: "c ∝ √T, তাই c দ্বিগুণ।", tex: "c=2\\times517" },
        { text: "উত্তর: প্রায় 1034 m/s।" },
      ],
    },
  ],
  concepts: [
    "পরম শূন্যে গড় গতিশক্তি সূত্র অনুযায়ী কত? তার মানে কী দাঁড়ায়?",
    "বেগ বণ্টনে কিছু অণু গড়ের চেয়ে অনেক দ্রুত থাকে। এরা কি বাষ্পীভবনে ভূমিকা রাখে?",
  ],
  quiz: [
    { q: "তাপমাত্রা অণুর কোন রাশির মাপ?", options: ["ভর", "গড় গতিশক্তি", "আয়তন", "সংখ্যা"], answer: 1, why: "½mc̄² = (3/2)kT, অর্থাৎ T গড় গতিশক্তির সমানুপাতিক।" },
    { q: "একই তাপমাত্রায় H2 আর O2 এর মধ্যে কার c_rms বেশি?", options: ["H2", "O2", "সমান"], answer: 0, why: "গড় গতিশক্তি সমান, কিন্তু H2 হালকা। তাই তার বেগ বেশি। c ∝ 1 ÷ √M।" },
    { q: "T চার গুণ করলে c_rms কত গুণ হয়?", options: ["2", "4", "16", "একই"], answer: 0, why: "c_rms ∝ √T, তাই √4 = 2 গুণ।" },
    { q: "300 K এ নাইট্রোজেনের c_rms প্রায় কত?", options: ["517 m/s", "27 m/s", "5170 m/s"], answer: 0, why: "√(3 × 8.314 × 300 ÷ 0.028) ≈ 517 m/s।" },
    { q: "T বাড়ালে বেগ বণ্টনের শিখর কোন দিকে সরে?", options: ["বাঁয়ে", "ডানে", "নড়ে না"], answer: 1, why: "বেশি তাপমাত্রা মানে বেশি বেগ, তাই শিখর ডানে সরে আর বক্ররেখা চ্যাপ্টা হয়।" },
  ],
};

const RGAS = 8.314;
const MOL = 0.028;

const dens = (v: number, T: number) => 4 * Math.PI * Math.pow(MOL / (2 * Math.PI * RGAS * T), 1.5) * v * v * Math.exp((-MOL * v * v) / (2 * RGAS * T));
const FMAX = dens(Math.sqrt((2 * RGAS * 100) / MOL), 100);

function SpeedDist({ T }: { T: number }) {
  const O = pt(50, 220);
  const kx = 0.26;
  const d = Array.from({ length: 76 }, (_, i) => {
    const v = i * 20;
    return `${i === 0 ? "M" : "L"}${(O.x + v * kx).toFixed(1)} ${(O.y - (dens(v, T) / FMAX) * 160).toFixed(1)}`;
  }).join("");
  const crms = Math.sqrt((3 * RGAS * T) / MOL);
  return (
    <Stage w={440} h={260} label="অণুর বেগ বণ্টন">
      <Vec a={O} b={pt(430, O.y)} c="m" w={2} />
      <Vec a={O} b={pt(O.x, 36)} c="m" w={2} />
      <Lab p={pt(420, 242)} c="m" anchor="end">বেগ (m/s)</Lab>
      <Lab p={pt(62, 40)} c="m" anchor="start">অণুর ভগ্নাংশ</Lab>
      <path d={d} fill="none" strokeWidth={4} strokeLinecap="round" style={{ stroke: col.p }} />
      <Seg a={pt(O.x + crms * kx, O.y)} b={pt(O.x + crms * kx, 70)} dash c="r" w={2} />
      <Lab p={pt(O.x + crms * kx, 60)} c="r">{`c_rms = ${crms.toFixed(0)}`}</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [temp, setTemp] = useState(300);
  const crms = Math.sqrt((3 * RGAS * temp) / MOL);
  const ke = 1.5 * 1.38 * temp;

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "গরম মানে কী?",
            text: "গ্যাসকে গরম করলে তার অণুদের গড় গতিশক্তির কী হয়?",
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["বাড়ে", "কমে", "একই থাকে"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="তাপমাত্রা আসলে অণুদের গড় গতিশক্তির মাপ। গরম মানে অণুরা গড়ে বেশি দ্রুত।"
              />
            ),
            figure: () => <SpeedDist T={g.picks[0] !== undefined ? 600 : 300} />,
          },
          {
            title: "সবাই এক বেগে নয়",
            text: (
              <>
                গ্যাসের অণুরা সবাই একই বেগে ছোটে না। কেউ ধীর, কেউ খুব দ্রুত। <b>T</b> বদলিয়ে দেখো কেমন বদলায়, আর <C k="r">c_rms</C> কোথায় থাকে।
              </>
            ),
            prompt: (
              <Play
                label="T"
                value={temp}
                min={100}
                max={900}
                step={100}
                suffix=" K"
                onChange={setTemp}
                chips={[100, 300, 600, 900]}
                read={
                  <>
                    <span>
                      c_rms = <C k="r">{crms.toFixed(0)} m/s</C>
                    </span>
                    <span>গড় গতিশক্তি = {(ke / 100).toFixed(2)} × 10^-21 J</span>
                  </>
                }
                note="T বাড়লে বক্ররেখা ডানে সরে যায় আর চ্যাপ্টা হয়। (নাইট্রোজেন, M = 0.028 kg/mol)"
              />
            ),
            figure: () => <SpeedDist T={temp} />,
          },
          {
            title: "দুই সূত্র মেলাই",
            text: (
              <>
                গতিতত্ত্ব বলে PV = ⅓Nmc²। আদর্শ গ্যাস বলে PV = NkT। দুটো সমান করলে সরাসরি <C k="r">গড় গতিশক্তি আর T এর সম্পর্ক</C> পাই।
              </>
            ),
            tex: ["\\tfrac13Nm\\overline{c^2}=NkT", "\\tfrac12m\\overline{c^2}=\\tfrac32kT"],
          },
          {
            title: "হালকা না ভারী?",
            text: "একই তাপমাত্রায় হাইড্রোজেন (M = 0.002) আর অক্সিজেন (M = 0.032) আছে। কার অণু বেশি দ্রুত ছোটে?",
            tex: ["c_{rms}=\\sqrt{\\dfrac{3RT}{M}}"],
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["হাইড্রোজেন", "অক্সিজেন", "সমান"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="গড় গতিশক্তি সমান, কিন্তু হাইড্রোজেন হালকা। তাই তার বেগ বেশি। M এর অনুপাত 16, তাই c এর অনুপাত √16 = 4।"
              />
            ),
          },
          {
            title: "সংখ্যা বসাই",
            text: "300 K এ নাইট্রোজেনের (M = 0.028 kg/mol) c_rms কত? গতি ঘণ্টায় প্রায় 1860 km, বন্দুকের গুলির কাছাকাছি।",
            tex: ["c_{rms}=\\sqrt{\\dfrac{3\\times8.314\\times300}{0.028}}"],
            locked: g.picks[4] === undefined,
            prompt: (
              <Choices
                options={["517 m/s", "27 m/s", "5170 m/s"]}
                answer={0}
                picked={g.picks[4]}
                onPick={g.pick(4)}
                explain="√267236 ≈ 517 m/s। ঘরের বাতাসের অণু এত দ্রুত ছোটে, তবু ঘন ঘন ধাক্কা খায় বলে বেশি দূর যেতে পারে না।"
              />
            ),
          },
        ],
        summary: [
          {
            title: "তাপমাত্রা আর গতিশক্তি",
            text: "প্রতি অণুর গড় গতিশক্তি শুধু তাপমাত্রার ওপর নির্ভর করে, গ্যাসের ধরনের ওপর নয়।",
            tex: ["\\tfrac12m\\overline{c^2}=\\tfrac32kT"],
          },
          {
            title: "c_rms",
            text: "T বাড়লে c_rms বাড়ে, M বাড়লে কমে।",
            tex: ["c_{rms}=\\sqrt{\\dfrac{3RT}{M}}"],
          },
        ],
      })}
    />
  );
}
