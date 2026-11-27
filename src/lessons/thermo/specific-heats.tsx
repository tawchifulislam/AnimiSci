"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "সমআয়তনে ও সমচাপে মোলার আপেক্ষিক তাপ Cv ও Cp বুঝবে, Cp − Cv = R প্রমাণ বুঝবে, আর γ = Cp/Cv বের করতে পারবে।",
  hook: "একই গ্যাস একই পরিমাণ গরম করতে ঢাকনা বন্ধ থাকলে কম তাপ লাগে, ঢাকনা খোলা থাকলে বেশি। কেন?",
  formulas: [
    { tex: "C_p-C_v=R", meaning: "মোলার আপেক্ষিক তাপের পার্থক্য সার্বজনীন গ্যাস ধ্রুবকের সমান।" },
    { tex: "\\gamma=\\dfrac{C_p}{C_v}", meaning: "একপরমাণুক গ্যাসে 5/3, দ্বিপরমাণুক গ্যাসে 7/5।" },
    { tex: "C_v=\\dfrac f2R", meaning: "f স্বাধীনতার মাত্রা।" },
  ],
  example: {
    problem: "2 মোল একপরমাণুক গ্যাসের তাপমাত্রা 10 K বাড়াতে সমআয়তনে কত তাপ লাগবে? (R = 8.314)",
    steps: [
      { text: "Cv = 3/2 R।", tex: "Q=nC_v\\Delta T=2\\times\\dfrac32\\times8.314\\times10" },
      { text: "উত্তর: Q = 249 J।" },
    ],
  },
  mistakes: [
    "Cp কে Cv এর চেয়ে ছোট ভাবা। সমচাপে গ্যাস কাজও করে, তাই Cp বড়।",
    "γ এর মান 1 এর কম ভাবা। Cp > Cv তাই γ সবসময় 1 এর বেশি।",
    "মোলার তাপের একক J/(mol·K) না লিখে J/K লেখা।",
  ],
  recap: [
    "সমআয়তনে Q = nCvΔT, সমচাপে Q = nCpΔT।",
    "Cp − Cv = R।",
    "γ = Cp/Cv। একপরমাণুক 5/3, দ্বিপরমাণুক 7/5।",
    "সমচাপে বাড়তি তাপ কাজে খরচ হয়।",
  ],
  think: {
    scenario: "একটি পিস্টনহীন শক্ত বাক্স আর একটি পিস্টনওয়ালা সিলিন্ডারে সমান গ্যাস। দুটোর তাপমাত্রা সমান 10 K বাড়াতে হবে।",
    points: ["কোনটায় বেশি তাপ লাগবে?", "বাড়তি তাপ কোথায় গেল?"],
    hint: "পিস্টন সরলে কাজ হয়।",
    traps: ["শক্ত বাক্সে কাজ হয় না, সব তাপ অভ্যন্তরীণ শক্তিতে যায়।", "পিস্টনে বাড়তি তাপ কাজ হয়ে বেরিয়ে যায়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "1 মোল একপরমাণুক গ্যাসের Cv কত? (R = 8.314)",
      hint: "Cv = 3R/2।",
      steps: [{ text: "গণনা।", tex: "C_v=\\dfrac32\\times8.314=12.5" }, { text: "উত্তর: 12.5 J/(mol·K)।" }],
    },
    {
      level: "মাঝারি",
      q: "একপরমাণুক গ্যাসের γ কত?",
      hint: "Cp = 5R/2।",
      steps: [{ text: "অনুপাত।", tex: "\\gamma=\\dfrac{5R/2}{3R/2}=\\dfrac53" }, { text: "উত্তর: γ = 1.67।" }],
    },
    {
      level: "কঠিন",
      q: "2 মোল একপরমাণুক গ্যাসের তাপমাত্রা 10 K বাড়াতে সমচাপে কত তাপ লাগবে? সমআয়তনের চেয়ে কত বেশি?",
      hint: "Cp = 5R/2।",
      steps: [
        { text: "সমচাপে।", tex: "Q_p=2\\times\\dfrac52\\times8.314\\times10=416" },
        { text: "সমআয়তনে 249 J। পার্থক্য nRΔT।", tex: "416-249=166" },
        { text: "উত্তর: সমচাপে 416 J, বাড়তি 166 J। এই 166 J কাজ।" },
      ],
    },
  ],
  concepts: ["দ্বিপরমাণুক গ্যাসের Cv আর Cp কত?", "সমচাপ প্রক্রিয়ায় বাড়তি তাপ কোথায় যায়?"],
  quiz: [
    { q: "Cp − Cv কীসের সমান?", options: ["R", "γ", "2R", "শূন্য"], answer: 0, why: "মায়ারের সম্পর্ক। প্রতি মোলে সমচাপে বাড়তি R পরিমাণ কাজ হয়।" },
    { q: "একপরমাণুক গ্যাসে γ কত?", options: ["1.67", "1.4", "1.33", "1"], answer: 0, why: "Cp/Cv = (5/2)/(3/2) = 5/3।" },
    { q: "কোনটি সবসময় বড়?", options: ["Cp", "Cv", "সমান"], answer: 0, why: "সমচাপে গ্যাস কাজও করে, তাই বেশি তাপ লাগে।" },
    { q: "দ্বিপরমাণুক গ্যাসের γ কত (সাধারণ তাপমাত্রায়)?", options: ["1.4", "1.67", "1.2", "2"], answer: 0, why: "Cv = 5R/2, Cp = 7R/2, γ = 7/5।" },
    { q: "2 মোল একপরমাণুক গ্যাস, ΔT = 10 K, সমআয়তনে Q কত? (R = 8.314)", options: ["249 J", "416 J", "166 J", "83 J"], answer: 0, why: "2 × 1.5 × 8.314 × 10 = 249 J।" },
  ],
};

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "সমআয়তনে গরম",
            text: (
              <>
                শক্ত বাক্সে আয়তন বদলায় না, W = 0। সব তাপ ভেতরের শক্তি বাড়ায়। 2 মোল একপরমাণুক গ্যাসের তাপমাত্রা 10 K বাড়াতে Q = <C k="r">nCvΔT</C>, Cv = 3R/2। R = 8.314 হলে Q কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["249 J", "416 J", "83 J"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="2 × 1.5 × 8.314 × 10 = 249 J। এখানে Cv = 12.5 J/(mol·K)।"
              />
            ),
          },
          {
            title: "সমচাপে গরম",
            text: "এবার পিস্টনওয়ালা সিলিন্ডার। গ্যাস গরম হয়ে প্রসারিত হয়, কাজ করে। Cp = 5R/2 নিয়ে একই 10 K বাড়াতে কত তাপ লাগবে?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["416 J", "249 J", "166 J"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="2 × 2.5 × 8.314 × 10 = 416 J। সমআয়তনের চেয়ে বেশি লাগে।"
              />
            ),
          },
          {
            title: "বাড়তি তাপ কোথায় গেল",
            text: "দুই পথেই গ্যাস A থেকে একই তাপমাত্রায় (B আর C একই সমোষ্ণ রেখায়) পৌঁছায়। সমআয়তনে কাজ নেই, সমচাপে আছে। বাড়তি তাপ কত, আর সেটা কী?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["166 J, যা গ্যাসের করা কাজ", "166 J, যা আরও অভ্যন্তরীণ শক্তি", "0 J"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="ΔU দুই পথেই সমান, কারণ T একই। বাড়তি তাপ 416 − 249 = 166 J কাজ হয়ে গেছে। এই কারণেই Cp − Cv = R।"
              />
            ),
            figure: () => (
              <Plot
                label="একই তাপমাত্রায় পৌঁছানোর দুই পথ"
                xl="V (L)"
                yl="P"
                xmax={6}
                ymax={6}
                curves={[
                  { pts: Array.from({ length: 30 }, (_, i) => [1.5 + i * 0.1, 6 / (1.5 + i * 0.1)] as [number, number]), c: "m", dash: true },
                  { pts: [[2, 2], [2, 3]], c: "p" },
                  { pts: [[2, 2], [3, 2]], c: "r" },
                ]}
                marks={[{ x: 2, y: 2, label: "A", c: "q" }, { x: 2, y: 3, label: "B", c: "p" }, { x: 3, y: 2, label: "C", c: "r" }]}
                shade={g.picks[2] !== undefined ? { pts: [[2, 0], [2, 2], [3, 2], [3, 0]], c: "r" } : undefined}
                notes={[{ x: 3.6, y: 3.6, text: "সমোষ্ণ রেখা", c: "m", anchor: "start" }]}
              />
            ),
          },
          {
            title: "γ কত",
            text: "γ = Cp ÷ Cv। একপরমাণুক গ্যাসে Cp = 5R/2, Cv = 3R/2। γ কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["1.67", "1.4", "0.6"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="5/3 = 1.67। দ্বিপরমাণুক গ্যাসে 7/5 = 1.4। γ সবসময় 1 এর বেশি।"
              />
            ),
          },
        ],
        summary: [
          { title: "Cv আর Cp", text: "সমআয়তনে তাপ শুধু ভেতরের শক্তি বাড়ায়। সমচাপে কাজও করে, তাই বেশি তাপ লাগে।", tex: ["C_p-C_v=R"] },
          { title: "γ", text: "একপরমাণুকে 1.67, দ্বিপরমাণুকে 1.4।", tex: ["\\gamma=\\dfrac{C_p}{C_v}"] },
        ],
      })}
    />
  );
}
