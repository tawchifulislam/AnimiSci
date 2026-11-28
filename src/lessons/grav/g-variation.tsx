"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "অভিকর্ষজ ত্বরণ g এর সংজ্ঞা, g = GM/R², এবং উচ্চতা, গভীরতা, অক্ষাংশ ও পৃথিবীর ঘূর্ণনের সাথে g এর পরিবর্তন বুঝবে ও হিসাব করতে পারবে।",
  hook: "পাহাড়ের চূড়ায় তোমার ওজন কিছুটা কম, খনির গভীরেও কম, আর বিষুবরেখায় মেরুর চেয়ে কম। g সব জায়গায় একই নয়।",
  formulas: [
    { tex: "g=\\dfrac{GM}{R^2}", meaning: "ভূপৃষ্ঠে g। M পৃথিবীর ভর, R ব্যাসার্ধ।" },
    { tex: "g_h=g\\left(\\dfrac{R}{R+h}\\right)^2", meaning: "h উচ্চতায় g।" },
    { tex: "g_d=g\\left(1-\\dfrac dR\\right)", meaning: "d গভীরতায় g।" },
    { tex: "g_\\lambda=g-R\\omega^2\\cos^2\\lambda", meaning: "অক্ষাংশ λ তে g।" },
  ],
  example: {
    problem: "M = 6 × 10^24 kg, R = 6.4 × 10^6 m। g কত?",
    steps: [
      { text: "সূত্র।", tex: "g=\\dfrac{6.67\\times10^{-11}\\times6\\times10^{24}}{(6.4\\times10^6)^2}" },
      { text: "উত্তর: 9.77 m/s²।" },
    ],
  },
  mistakes: [
    "গভীরে গেলে g বাড়ে ভাবা। কমে, কেন্দ্রে শূন্য।",
    "মেরুতে g কম ভাবা। মেরুতে সর্বোচ্চ, বিষুবরেখায় সর্বনিম্ন।",
    "g_h সূত্রে R এর বদলে h ব্যবহার। দূরত্ব R + h।",
  ],
  recap: [
    "g = GM/R², বস্তুর ভরের ওপর নির্ভর করে না।",
    "উচ্চতা বাড়লে g কমে (ব্যস্তবর্গ নিয়মে)।",
    "গভীরতা বাড়লে g রৈখিকভাবে কমে, কেন্দ্রে শূন্য।",
    "ঘূর্ণনের কারণে বিষুবরেখায় g কম, মেরুতে বেশি।",
  ],
  think: {
    scenario: "একটি ভারী ও একটি হালকা বস্তু একই উচ্চতা থেকে ফেলা হলো। শূন্যস্থানে দুটি একসাথে মাটিতে পড়ে।",
    points: ["কেন ভারী বস্তু আগে পড়ে না?", "g কীসের ওপর নির্ভর করে?"],
    hint: "g = GM/R²।",
    traps: ["ভারী বস্তুর ওপর বল বেশি, কিন্তু জড়তাও বেশি, ত্বরণ সমান।", "g নির্ভর করে পৃথিবীর M ও R এর ওপর, বস্তুর m এর ওপর নয়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "M = 6 × 10^24 kg, R = 6.4 × 10^6 m হলে g কত?",
      hint: "GM/R²।",
      steps: [{ text: "গণনা।", tex: "g=\\dfrac{4.002\\times10^{14}}{4.096\\times10^{13}}=9.77" }, { text: "উত্তর: 9.77 m/s²।" }],
    },
    {
      level: "মাঝারি",
      q: "ভূপৃষ্ঠ থেকে পৃথিবীর ব্যাসার্ধের সমান উচ্চতায় g কত? (ভূপৃষ্ঠে g = 9.77)",
      hint: "দূরত্ব 2R।",
      steps: [{ text: "গণনা।", tex: "g_h=\\dfrac{9.77}{4}=2.44" }, { text: "উত্তর: 2.44 m/s²।" }],
    },
    {
      level: "কঠিন",
      q: "ভূপৃষ্ঠে g = 9.8 m/s²। পৃথিবীর ব্যাসার্ধের এক-চতুর্থাংশ গভীরে g কত?",
      hint: "g_d = g(1 − d/R)।",
      steps: [{ text: "গণনা।", tex: "g_d=9.8\\times(1-0.25)=7.35" }, { text: "উত্তর: 7.35 m/s²।" }],
    },
  ],
  concepts: ["পৃথিবীর কেন্দ্রে g শূন্য কেন?", "ঘূর্ণনের কারণে বিষুবরেখায় g কম কেন?"],
  quiz: [
    { q: "g = ?", options: ["GM/R²", "GM/R", "GMR²", "G/MR²"], answer: 0, why: "মহাকর্ষ বল ÷ ভর।" },
    { q: "উচ্চতা বাড়লে g?", options: ["কমে", "বাড়ে", "একই", "শূন্য"], answer: 0, why: "দূরত্ব বাড়ে।" },
    { q: "পৃথিবীর কেন্দ্রে g?", options: ["শূন্য", "সর্বোচ্চ", "9.8", "অসীম"], answer: 0, why: "সব দিকের আকর্ষণ কাটাকাটি।" },
    { q: "g সর্বোচ্চ কোথায়?", options: ["মেরুতে", "বিষুবরেখায়", "কেন্দ্রে", "পাহাড়চূড়ায়"], answer: 0, why: "ঘূর্ণনের প্রভাব নেই।" },
    { q: "h = R উচ্চতায় g (ভূপৃষ্ঠে g)?", options: ["g/4", "g/2", "g/9", "2g"], answer: 0, why: "দূরত্ব 2R।" },
  ],
};

const prof: Array<[number, number]> = Array.from({ length: 41 }, (_, i) => {
  const x = i * 0.1;
  return [x, x <= 1 ? 9.77 * x : 9.77 / (x * x)] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ভূপৃষ্ঠে g",
            text: (
              <>
                মহাকর্ষ বলকে বস্তুর ভর দিয়ে ভাগ করলে পাই <C k="r">g = GM/R²</C>। M = 6 × 10^24, R = 6.4 × 10^6 হলে g কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["9.77 m/s²", "98 m/s²", "0.98 m/s²"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="G M = 4.002 × 10^14, R² = 4.096 × 10^13, ভাগফল 9.77। বস্তুর ভর এখানে নেই, তাই সব বস্তু একই ত্বরণে পড়ে।"
              />
            ),
          },
          {
            title: "ওপরে গেলে",
            text: "ভূপৃষ্ঠ থেকে R উচ্চতায় (কেন্দ্র থেকে 2R দূরে) g কত? ভূপৃষ্ঠে g = 9.77।",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["2.44 m/s²", "4.89 m/s²", "19.5 m/s²"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="g_h = g (R/(R + h))² = 9.77 ÷ 4 = 2.44 m/s²।"
              />
            ),
            figure: () => (
              <Plot
                label="g বনাম কেন্দ্র থেকে দূরত্ব"
                xl="r/R"
                yl="g (m/s²)"
                xmax={4}
                ymax={11}
                curves={[{ pts: prof, c: "r" }]}
                marks={g.picks[1] !== undefined ? [{ x: 1, y: 9.77, label: "9.77", c: "p", dx: 8, dy: -6 }, { x: 2, y: 2.44, label: "2.44", c: "p", dx: 8, dy: -8 }, { x: 0.5, y: 4.885, label: "ভেতরে রৈখিক", c: "q", dx: 6, dy: 10 }] : []}
              />
            ),
          },
          {
            title: "ভেতরে গেলে",
            text: "g_d = g (1 − d/R)। g = 9.8, d = R/4 হলে g_d কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["7.35 m/s²", "9.8 m/s²", "2.45 m/s²"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="9.8 × 0.75 = 7.35। ভেতরে g রৈখিকভাবে কমে কেন্দ্রে শূন্য হয়, গ্রাফের বাঁ অংশ সরলরেখা।"
              />
            ),
          },
          {
            title: "ঘূর্ণনের প্রভাব",
            text: "পৃথিবী ঘুরছে, তাই বিষুবরেখায় g হ্রাস পায় Rω² cos²λ। কোথায় g সবচেয়ে কম?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["বিষুবরেখায়", "মেরুতে", "45° অক্ষাংশে"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="বিষুবরেখায় λ = 0, cos²λ = 1, হ্রাস সর্বোচ্চ (প্রায় 0.034 m/s²)। মেরুতে λ = 90°, হ্রাস শূন্য, তাই g সর্বোচ্চ।"
              />
            ),
          },
        ],
        summary: [
          { title: "ভূপৃষ্ঠে g", text: "g = GM/R², বস্তুর ভরের ওপর নির্ভর করে না।", tex: ["g=\\dfrac{GM}{R^2}"] },
          { title: "পরিবর্তন", text: "উচ্চতায় ব্যস্তবর্গ নিয়মে কমে, গভীরতায় রৈখিকভাবে কমে।", tex: ["g_h=g\\left(\\dfrac{R}{R+h}\\right)^2", "g_d=g\\left(1-\\dfrac dR\\right)"] },
        ],
      })}
    />
  );
}
