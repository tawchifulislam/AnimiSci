"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "টানা তার বা স্প্রিংয়ে সঞ্চিত শক্তি এবং একক আয়তনে শক্তি (শক্তি ঘনত্ব) বের করতে পারবে।",
  hook: "ধনুক টানলে তির ছোটে, স্প্রিং ছেড়ে দিলে খেলনা লাফিয়ে ওঠে। টানার কাজ কোথায় জমা থাকে?",
  formulas: [
    { tex: "U=\\dfrac12F\\Delta l=\\dfrac12kx^2", meaning: "সঞ্চিত স্থিতিস্থাপক শক্তি।" },
    { tex: "u=\\dfrac12\\times\\text{পীড়ন}\\times\\text{বিকৃতি}", meaning: "একক আয়তনের শক্তি, একক J/m³।" },
  ],
  example: {
    problem: "100 N বল দিয়ে একটি তারকে ধীরে ধীরে 1 mm বাড়ানো হলো। সঞ্চিত শক্তি কত?",
    steps: [
      { text: "বল 0 থেকে 100 N, গড় 50 N।", tex: "U=\\dfrac12\\times100\\times0.001" },
      { text: "উত্তর: 0.05 J।" },
    ],
  },
  mistakes: [
    "U = Fx লেখা। বল ধীরে ধীরে বাড়ে, তাই অর্ধেক।",
    "mm কে m এ না বদলানো।",
    "শক্তি ঘনত্ব আর মোট শক্তি এক ভাবা। ঘনত্বকে আয়তন দিয়ে গুণ করতে হয়।",
  ],
  recap: [
    "U = ½ F Δl = ½ k x²।",
    "গ্রাফে বল-বৃদ্ধি রেখার নিচের ক্ষেত্রফলই U।",
    "শক্তি ঘনত্ব u = ½ × পীড়ন × বিকৃতি।",
    "মোট শক্তি = u × আয়তন।",
  ],
  think: {
    scenario: "একটি ঘড়ির স্প্রিং পুরোপুরি পেঁচিয়ে দিলে ঘড়ি একদিন চলে। স্প্রিংয়ের ভেতরে কিছু শক্তি জমেছিল।",
    points: ["পেঁচ দ্বিগুণ করলে জমা শক্তি কত গুণ?", "শক্তি কীভাবে বেরিয়ে আসে?"],
    hint: "U ∝ x²।",
    traps: ["দ্বিগুণ পেঁচে চার গুণ শক্তি।", "স্প্রিং ফিরে যেতে যেতে ঘড়ির কাঁটা ঘোরায়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "k = 500 N/m স্প্রিংকে 0.04 m টানলে সঞ্চিত শক্তি কত?",
      hint: "U = ½kx²।",
      steps: [{ text: "গণনা।", tex: "U=\\dfrac12\\times500\\times0.0016=0.4" }, { text: "উত্তর: 0.4 J।" }],
    },
    {
      level: "মাঝারি",
      q: "ওপরের স্প্রিং 0.08 m টানলে শক্তি কত?",
      hint: "x দ্বিগুণ হলে U চার গুণ।",
      steps: [{ text: "গণনা।", tex: "U=\\dfrac12\\times500\\times0.0064=1.6" }, { text: "উত্তর: 1.6 J।" }],
    },
    {
      level: "কঠিন",
      q: "পীড়ন 10^8 Pa, বিকৃতি 0.0005। শক্তি ঘনত্ব কত? তারের আয়তন 2 × 10^-6 m³ হলে মোট শক্তি কত?",
      hint: "u = ½ × পীড়ন × বিকৃতি।",
      steps: [
        { text: "শক্তি ঘনত্ব।", tex: "u=\\dfrac12\\times10^8\\times0.0005=2.5\\times10^4" },
        { text: "মোট শক্তি।", tex: "U=25000\\times2\\times10^{-6}=0.05" },
        { text: "উত্তর: u = 2.5 × 10^4 J/m³, U = 0.05 J।" },
      ],
    },
  ],
  concepts: ["ধীরে টানা আর হঠাৎ ঝটকায় টানার শক্তি কেন আলাদা?", "বল-বৃদ্ধি গ্রাফের ঢাল কী?"],
  quiz: [
    { q: "টানা তারে সঞ্চিত শক্তির সূত্র কোনটি?", options: ["½ F Δl", "F Δl", "F/Δl", "2 F Δl"], answer: 0, why: "বল শূন্য থেকে F পর্যন্ত বাড়ে, গড় F/2।" },
    { q: "k = 500 N/m স্প্রিংকে 0.04 m টানলে U কত?", options: ["0.4 J", "20 J", "0.8 J", "0.04 J"], answer: 0, why: "½ × 500 × 0.04² = 0.4 J।" },
    { q: "স্প্রিংয়ের টান দ্বিগুণ করলে সঞ্চিত শক্তি কত গুণ?", options: ["4", "2", "8", "1"], answer: 0, why: "U ∝ x²।" },
    { q: "শক্তি ঘনত্বের একক কী?", options: ["J/m³", "J", "Pa·m", "N/m"], answer: 0, why: "শক্তি ÷ আয়তন।" },
    { q: "বল বনাম দৈর্ঘ্য বৃদ্ধি গ্রাফের নিচের ক্ষেত্রফল কী নির্দেশ করে?", options: ["সঞ্চিত শক্তি", "Y", "k", "বিকৃতি"], answer: 0, why: "বল × সরণের যোগফল মানে কাজ বা শক্তি।" },
  ],
};

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "জমা হওয়া কাজ",
            text: (
              <>
                তার টানার সময় বল 0 থেকে 100 N পর্যন্ত বাড়ে আর তার 1 mm বাড়ে। কাজ হলো গড় বল ধরে। <C k="r">U = ½ F Δl</C>। শক্তি কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["0.05 J", "0.1 J", "5 J"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="½ × 100 × 0.001 = 0.05 J। পুরো 100 N ধরলে 0.1 J হতো, যা ভুল।"
              />
            ),
            figure: () => (
              <Plot
                label="বল বনাম দৈর্ঘ্য বৃদ্ধি"
                xl="Δl (mm)"
                yl="F (N)"
                xmax={1.2}
                ymax={120}
                curves={[{ pts: [[0, 0], [1, 100]], c: "r" }]}
                shade={g.picks[0] !== undefined ? { pts: [[0, 0], [1, 100], [1, 0]], c: "r" } : undefined}
                marks={[{ x: 1, y: 100, label: "100 N", c: "p", dx: -70, dy: -6 }]}
                notes={g.picks[0] !== undefined ? [{ x: 0.5, y: 25, text: "ক্ষেত্রফল = U", c: "r", anchor: "start" }] : []}
              />
            ),
          },
          {
            title: "স্প্রিংয়ের শক্তি",
            text: "স্প্রিংয়ে F = kx, তাই U = ½kx²। k = 500 N/m, x = 0.04 m হলে U কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["0.4 J", "0.8 J", "20 J"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="½ × 500 × 0.0016 = 0.4 J। 0.04 m এর বর্গ 0.0016।"
              />
            ),
          },
          {
            title: "দ্বিগুণ টানলে",
            text: "ওই স্প্রিংকে 0.08 m, মানে দ্বিগুণ টানলে শক্তি কত গুণ হবে?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["4 গুণ, 1.6 J", "2 গুণ, 0.8 J", "8 গুণ, 3.2 J"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="U ∝ x², তাই দ্বিগুণ টানে 4 গুণ শক্তি, 1.6 J।"
              />
            ),
          },
          {
            title: "শক্তি ঘনত্ব",
            text: "পীড়ন 10^8 Pa আর বিকৃতি 0.0005। একক আয়তনের শক্তি u = ½ × পীড়ন × বিকৃতি। কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["2.5 × 10^4 J/m³", "5 × 10^4 J/m³", "2.5 × 10^7 J/m³"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="½ × 10^8 × 0.0005 = 25000 J/m³। 2 × 10^-6 m³ এর তারে মোট শক্তি 0.05 J, ঠিক প্রথম ধাপের মতো।"
              />
            ),
          },
        ],
        summary: [
          { title: "সঞ্চিত শক্তি", text: "বল ধীরে বাড়ে, তাই গড় বল ধরতে হয়।", tex: ["U=\\dfrac12F\\Delta l=\\dfrac12kx^2"] },
          { title: "শক্তি ঘনত্ব", text: "একক আয়তনে জমা শক্তি।", tex: ["u=\\dfrac12\\times\\text{পীড়ন}\\times\\text{বিকৃতি}"] },
        ],
      })}
    />
  );
}
