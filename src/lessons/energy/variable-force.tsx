"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "চলমান বলের কাজ বল-সরণ গ্রাফের নিচের ক্ষেত্রফল থেকে এবং স্প্রিংয়ের কাজ ½kx² থেকে বের করতে পারবে।",
  hook: "স্প্রিং টানতে যত টানো তত জোর লাগে। বল বদলাতে থাকলে কাজ কীভাবে মাপব? গ্রাফ এঁকে ক্ষেত্রফল নিয়ে।",
  formulas: [
    { tex: "W=\\text{F-x গ্রাফের ক্ষেত্রফল}", meaning: "বল বদলালেও খাটে।" },
    { tex: "W=\\dfrac12kx^2", meaning: "স্প্রিং স্বাভাবিক অবস্থা থেকে x টানতে কাজ।" },
    { tex: "W=\\dfrac12k(x_2^2-x_1^2)", meaning: "x1 থেকে x2 পর্যন্ত টানতে কাজ।" },
  ],
  example: {
    problem: "k = 200 N/m স্প্রিংকে 0.2 m টানতে কত কাজ লাগে?",
    steps: [
      { text: "সূত্র।", tex: "W=\\dfrac12\\times200\\times(0.2)^2" },
      { text: "উত্তর: 4 J।" },
    ],
  },
  mistakes: [
    "স্প্রিংয়ের কাজ kx² লেখা। অর্ধেক লাগে, কারণ বল গড়ে kx/2।",
    "x কে cm এ বসানো। মিটারে বসাতে হয়।",
    "দুই অবস্থানের মধ্যে কাজ বের করতে ½k(x2 − x1)² লেখা। বর্গ আলাদা আলাদা।",
  ],
  recap: [
    "ধ্রুব বলে ক্ষেত্রফল আয়তক্ষেত্র।",
    "সরলভাবে বাড়া বলে ক্ষেত্রফল ত্রিভুজ।",
    "স্প্রিং: W = ½kx²।",
    "x1 থেকে x2: ½k(x2² − x1²)।",
  ],
  think: {
    scenario: "প্রথম 0.2 m টানতে 4 J লাগে। পরের 0.2 m টানতে কি আবার 4 J লাগবে?",
    points: ["বল কি ধ্রুব?", "পরের অংশে বল বেশি না কম?"],
    hint: "স্প্রিংয়ের বল x এর সাথে বাড়ে।",
    traps: ["পরের অংশে বল বেশি, তাই কাজও বেশি। 0.4 m পর্যন্ত মোট 16 J, তাই দ্বিতীয় অংশে 12 J।", "x দ্বিগুণ হলে কাজ চার গুণ।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "10 N ধ্রুব বল 5 m সরণে কত কাজ করে? গ্রাফ থেকে বলো।",
      hint: "আয়তক্ষেত্রের ক্ষেত্রফল।",
      steps: [{ text: "ক্ষেত্রফল।", tex: "10\\times5=50" }, { text: "উত্তর: 50 J।" }],
    },
    {
      level: "মাঝারি",
      q: "k = 500 N/m স্প্রিং 0.1 m টানতে কাজ কত?",
      hint: "½kx²।",
      steps: [{ text: "গণনা।", tex: "W=\\dfrac12\\times500\\times0.01=2.5" }, { text: "উত্তর: 2.5 J।" }],
    },
    {
      level: "কঠিন",
      q: "k = 200 N/m স্প্রিং 0.2 m থেকে 0.4 m টানতে কাজ কত?",
      hint: "½k(x2² − x1²)।",
      steps: [{ text: "গণনা।", tex: "W=100\\times(0.16-0.04)=12" }, { text: "উত্তর: 12 J।" }],
    },
  ],
  concepts: ["ছোট ছোট সরণে কাজ যোগ করলে ক্ষেত্রফল কেন আসে?", "বল-সরণ গ্রাফের ঢাল কী?"],
  quiz: [
    { q: "F-x গ্রাফের নিচের ক্ষেত্রফল কী?", options: ["কাজ", "ক্ষমতা", "বেগ", "ত্বরণ"], answer: 0, why: "বল × সরণের যোগফল।" },
    { q: "স্প্রিংয়ে কাজের সূত্র?", options: ["½kx²", "kx²", "kx", "½kx"], answer: 0, why: "গড় বল kx/2।" },
    { q: "k = 200 N/m, x = 0.2 m হলে কাজ?", options: ["4 J", "8 J", "40 J", "0.4 J"], answer: 0, why: "½ × 200 × 0.04।" },
    { q: "x দ্বিগুণ করলে স্প্রিংয়ের কাজ?", options: ["4 গুণ", "2 গুণ", "অর্ধেক", "একই"], answer: 0, why: "W ∝ x²।" },
    { q: "10 N ধ্রুব বল 5 m সরালে কাজ?", options: ["50 J", "2 J", "15 J", "25 J"], answer: 0, why: "10 × 5।" },
  ],
};

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ধ্রুব বলের ক্ষেত্রফল",
            text: (
              <>
                ধ্রুব 10 N বল 5 m সরণে কাজ করে। F-x গ্রাফে এটা একটি আয়তক্ষেত্র, ক্ষেত্রফল = <C k="r">কাজ</C>। কাজ কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["50 J", "15 J", "2 J"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="10 × 5 = 50 J। রঙিন আয়তক্ষেত্রের ক্ষেত্রফলই কাজ।"
              />
            ),
            figure: () => (
              <Plot
                label="ধ্রুব বল"
                xl="x (m)"
                yl="F (N)"
                xmax={6}
                ymax={12}
                curves={[{ pts: [[0, 10], [5, 10]], c: "r" }]}
                shade={g.picks[0] !== undefined ? { pts: [[0, 0], [0, 10], [5, 10], [5, 0]], c: "r" } : undefined}
              />
            ),
          },
          {
            title: "বাড়তে থাকা বল",
            text: "বল শূন্য থেকে সমভাবে বেড়ে 5 m এ 10 N হলো। ক্ষেত্রফল ত্রিভুজ। কাজ কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["25 J", "50 J", "10 J"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="½ × 5 × 10 = 25 J। গড় বল 5 N।"
              />
            ),
            figure: () => (
              <Plot
                label="বাড়তে থাকা বল"
                xl="x (m)"
                yl="F (N)"
                xmax={6}
                ymax={12}
                curves={[{ pts: [[0, 0], [5, 10]], c: "p" }]}
                shade={g.picks[1] !== undefined ? { pts: [[0, 0], [5, 10], [5, 0]], c: "p" } : undefined}
              />
            ),
          },
          {
            title: "স্প্রিং টানা",
            text: "স্প্রিংয়ে F = kx, গ্রাফ ত্রিভুজ। k = 200 N/m, x = 0.2 m হলে W = ½kx² কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["4 J", "8 J", "40 J"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="½ × 200 × 0.04 = 4 J। শেষ বল 40 N, গড় 20 N, 20 × 0.2 = 4 J।"
              />
            ),
          },
          {
            title: "আরও টানলে",
            text: "ওই স্প্রিংকে 0.2 m থেকে আরও 0.4 m পর্যন্ত টানা হলো। W = ½k(x2² − x1²) কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["12 J", "4 J", "16 J"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="100 × (0.16 − 0.04) = 12 J। প্রথম 0.2 m এ 4 J, পরের 0.2 m এ 12 J, কারণ বল বেশি।"
              />
            ),
          },
        ],
        summary: [
          { title: "গ্রাফ থেকে কাজ", text: "বল বদলালে F-x গ্রাফের ক্ষেত্রফল।", tex: ["W=\\text{ক্ষেত্রফল}"] },
          { title: "স্প্রিং", text: "x দ্বিগুণ হলে কাজ চার গুণ।", tex: ["W=\\dfrac12kx^2"] },
        ],
      })}
    />
  );
}
