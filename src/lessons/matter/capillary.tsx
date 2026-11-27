"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "স্পর্শ কোণ বুঝবে, কৈশিক নলে তরল ওঠা বা নামার কারণ জানবে, আর h = 2T cosθ/(ρgr) প্রয়োগ করতে পারবে।",
  hook: "ব্লটিং কাগজ কালি টেনে নেয়, গাছের শিকড় থেকে পানি পাতায় ওঠে। দুটোই কৈশিকতার কাজ।",
  formulas: [
    { tex: "h=\\dfrac{2T\\cos\\theta}{\\rho g r}", meaning: "কৈশিক নলে তরলের উচ্চতা। θ স্পর্শ কোণ।" },
    { tex: "h\\propto\\dfrac1r", meaning: "নল যত সরু, তরল তত উঁচুতে ওঠে।" },
  ],
  example: {
    problem: "0.5 mm ব্যাসার্ধের কৈশিক নলে পানি কতটা ওঠে? (T = 0.072 N/m, θ = 0, ρ = 1000 kg/m³, g = 9.8)",
    steps: [
      { text: "সূত্র।", tex: "h=\\dfrac{2\\times0.072}{1000\\times9.8\\times5\\times10^{-4}}=0.0294" },
      { text: "উত্তর: প্রায় 2.9 cm।" },
    ],
  },
  mistakes: [
    "পারদের জন্য θ = 0 ধরা। পারদে θ প্রায় 140°, cosθ ঋণাত্মক।",
    "ব্যাসকে ব্যাসার্ধ ধরা।",
    "mm কে m এ না বদলানো।",
  ],
  recap: [
    "θ < 90°: তরল ভেজায়, নলে ওপরে ওঠে।",
    "θ > 90°: তরল ভেজায় না, নলে নিচে নামে।",
    "h ∝ 1/r।",
    "h = 2T cosθ/(ρgr)।",
  ],
  think: {
    scenario: "একই কাচের কৈশিক নলে পানি ওপরে ওঠে আর পারদ নিচে নামে।",
    points: ["স্পর্শ কোণের কোন মানের জন্য এমন হয়?", "দুই তরলের মেনিস্কাস দেখতে কেমন?"],
    hint: "ভেজানো তরলে মেনিস্কাস অবতল।",
    traps: ["পানির θ প্রায় শূন্য, মেনিস্কাস অবতল।", "পারদের θ 90° এর বেশি, মেনিস্কাস উত্তল।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "r = 0.5 mm নলে পানি কত cm ওঠে? (T = 0.072, g = 9.8)",
      hint: "θ = 0, cosθ = 1।",
      steps: [{ text: "গণনা।", tex: "h=\\dfrac{2\\times0.072}{1000\\times9.8\\times5\\times10^{-4}}=0.0294\\ \\text{m}" }, { text: "উত্তর: 2.9 cm।" }],
    },
    {
      level: "মাঝারি",
      q: "নলের ব্যাসার্ধ অর্ধেক (0.25 mm) করলে পানি কত ওঠে?",
      hint: "h ∝ 1/r।",
      steps: [{ text: "ব্যাসার্ধ অর্ধেক, h দ্বিগুণ।" }, { text: "উত্তর: 5.9 cm।" }],
    },
    {
      level: "কঠিন",
      q: "r = 0.5 mm নলে পারদ কতটা নামে? (T = 0.465 N/m, θ = 140°, cos140° = −0.766, ρ = 13600, g = 9.8)",
      hint: "ঋণাত্মক h মানে নামা।",
      steps: [
        { text: "গণনা।", tex: "h=\\dfrac{2\\times0.465\\times(-0.766)}{13600\\times9.8\\times5\\times10^{-4}}=-0.0107" },
        { text: "উত্তর: প্রায় 1.1 cm নামে।" },
      ],
    },
  ],
  concepts: ["কৈশিক নলে তরল ওপরে ওঠে কোন বলের জন্য?", "তরল ওঠার সময় শক্তি কোথা থেকে আসে?"],
  quiz: [
    { q: "কৈশিক নলে তরল কখন নিচে নামে?", options: ["θ > 90°", "θ < 90°", "θ = 0", "কখনো না"], answer: 0, why: "ভেজায় না এমন তরলে cosθ ঋণাত্মক।" },
    { q: "নল যত সরু, তরল?", options: ["তত বেশি ওঠে", "তত কম ওঠে", "একই ওঠে"], answer: 0, why: "h ∝ 1/r।" },
    { q: "0.5 mm নলে পানি প্রায় কত ওঠে?", options: ["2.9 cm", "29 cm", "0.29 cm", "5.9 cm"], answer: 0, why: "h = 2T/(ρgr) = 0.0294 m।" },
    { q: "পানির স্পর্শ কোণ কাচের সাথে প্রায়?", options: ["শূন্য", "90°", "140°", "180°"], answer: 0, why: "পানি কাচ ভালোভাবে ভেজায়।" },
    { q: "পারদের স্পর্শ কোণ কাচের সাথে প্রায়?", options: ["140°", "0", "30°", "90°"], answer: 0, why: "পারদ কাচ ভেজায় না।" },
  ],
};

const waterH: Array<[number, number]> = Array.from({ length: 20 }, (_, i) => [0.2 + i * 0.1, 1.469 / (0.2 + i * 0.1)] as [number, number]);

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "স্পর্শ কোণ",
            text: (
              <>
                তরল আর কাচের স্পর্শ বিন্দুতে তরলের তল যে কোণ করে সেটাই <C k="r">স্পর্শ কোণ θ</C>। পানির θ প্রায় শূন্য, পারদের প্রায় 140°। কোন তরল কৈশিক নলে নিচে নামবে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["পারদ", "পানি", "দুটোই"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="θ > 90° হলে তরল ভেজায় না, মেনিস্কাস উত্তল হয় আর নলে তরল নিচে নামে।"
              />
            ),
          },
          {
            title: "পানি কতটা ওঠে",
            text: "h = 2T cosθ/(ρgr)। r = 0.5 mm নলে পানির জন্য T = 0.072 N/m, θ = 0 নিয়ে h কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["2.9 cm", "29 cm", "0.29 cm"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="2 × 0.072 ÷ (1000 × 9.8 × 0.0005) = 0.0294 m, মানে 2.9 cm।"
              />
            ),
          },
          {
            title: "সরু নল",
            text: "নলের ব্যাসার্ধ অর্ধেক হলে পানি কত ওঠে?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["5.9 cm", "1.5 cm", "2.9 cm"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="h ∝ 1/r, তাই দ্বিগুণ, প্রায় 5.9 cm। নল সরু হলে আরও উঁচুতে ওঠে।"
              />
            ),
            figure: () => (
              <Plot
                label="পানির উচ্চতা বনাম ব্যাসার্ধ"
                xl="r (mm)"
                yl="h (cm)"
                xmax={2.2}
                ymax={8}
                curves={[{ pts: waterH, c: "p" }]}
                marks={g.picks[2] !== undefined ? [{ x: 0.5, y: 2.94, label: "2.9", c: "r", dy: -12 }, { x: 0.25, y: 5.88, label: "5.9", c: "r", dx: 10 }] : []}
              />
            ),
          },
          {
            title: "পারদের নামা",
            text: "r = 0.5 mm নলে পারদের জন্য T = 0.465, θ = 140°, ρ = 13600। cos140° ঋণাত্মক। পারদ কতটা নামে?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["1.1 cm", "11 cm", "2.9 cm"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="h = 2 × 0.465 × (−0.766) ÷ (13600 × 9.8 × 0.0005) = −0.0107 m। ঋণাত্মক মানে নামা, প্রায় 1.1 cm।"
              />
            ),
          },
        ],
        summary: [
          { title: "ওঠা বা নামা", text: "θ < 90° হলে ওঠে, θ > 90° হলে নামে।", tex: ["h=\\dfrac{2T\\cos\\theta}{\\rho g r}"] },
          { title: "সরু নল", text: "ব্যাসার্ধ কমলে উচ্চতা বাড়ে।", tex: ["h\\propto\\dfrac1r"] },
        ],
      })}
    />
  );
}
