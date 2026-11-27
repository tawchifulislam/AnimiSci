"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ব্যবর্তন গ্রেটিং এর গঠন ও কার্যনীতি বুঝবে, গ্রেটিং ধ্রুবক ও d sinθ = nλ দিয়ে কোণ ও সর্বোচ্চ ক্রম বের করতে পারবে।",
  hook: "সিডির পৃষ্ঠে রামধনু রঙ দেখা যায়। সিডির সূক্ষ্ম খাঁজ একটি ব্যবর্তন গ্রেটিংয়ের মতো কাজ করে আলোকে রঙে ভাঙে।",
  formulas: [
    { tex: "d=\\dfrac1N", meaning: "N প্রতি একক দৈর্ঘ্যে দাগ সংখ্যা।" },
    { tex: "d\\sin\\theta=n\\lambda", meaning: "n-তম ক্রমের উজ্জ্বল রেখা।" },
    { tex: "n_{\\max}<\\dfrac d\\lambda", meaning: "সর্বোচ্চ সম্ভাব্য ক্রম (sinθ ≤ 1)।" },
  ],
  example: {
    problem: "একটি গ্রেটিংয়ে প্রতি cm এ 5000 দাগ। গ্রেটিং ধ্রুবক d কত?",
    steps: [
      { text: "গণনা।", tex: "d=\\dfrac{10^{-2}}{5000}=2\\times10^{-6}" },
      { text: "উত্তর: 2 μm।" },
    ],
  },
  mistakes: [
    "d এর একক বদলাতে ভুল করা। প্রতি cm কে m এ আনতে ভুলে যাওয়া।",
    "সব ক্রম সম্ভব ভাবা। sinθ ≤ 1 তাই ক্রম সীমিত।",
    "বেশি দাগে উজ্জ্বল রেখা সরু ও স্পষ্ট হয় তা ভুলে যাওয়া।",
  ],
  recap: [
    "গ্রেটিংয়ে বহু সমান্তরাল সরু চিড় থাকে।",
    "উজ্জ্বল রেখা d sinθ = nλ শর্তে পাওয়া যায়।",
    "বড় λ এর জন্য কোণ বেশি, তাই সাদা আলো রঙে ভেঙে যায়।",
    "দাগ বেশি হলে রেখা আরও তীক্ষ্ণ।",
  ],
  think: {
    scenario: "সাদা আলো গ্রেটিংয়ে পাঠালে প্রতিটি ক্রমে রঙিন বর্ণালী পাওয়া যায়, কিন্তু শূন্য ক্রমে সাদা।",
    points: ["শূন্য ক্রম সাদা কেন?", "কোন রঙ কেন্দ্র থেকে সবচেয়ে দূরে?"],
    hint: "n = 0 এ θ = 0, সব রঙের জন্য একই।",
    traps: ["θ = 0 এ সব রঙ মেলে, তাই সাদা।", "লালের λ সবচেয়ে বেশি, তাই লাল সবচেয়ে দূরে।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "প্রতি cm এ 5000 দাগের গ্রেটিংয়ে 600 nm আলোর প্রথম ক্রমের sinθ কত?",
      hint: "d = 2 μm।",
      steps: [{ text: "গণনা।", tex: "\\sin\\theta=\\dfrac{0.6}{2}=0.3" }, { text: "উত্তর: 0.3।" }],
    },
    {
      level: "মাঝারি",
      q: "ওই গ্রেটিংয়ে 500 nm আলোর দ্বিতীয় ক্রমের কোণ কত?",
      hint: "sinθ = 2 × 0.5 ÷ 2।",
      steps: [{ text: "গণনা।", tex: "\\sin\\theta=\\dfrac{2\\times0.5}{2}=0.5" }, { text: "উত্তর: 30°।" }],
    },
    {
      level: "কঠিন",
      q: "প্রতি cm এ 6000 দাগের গ্রেটিংয়ে 600 nm আলোর সর্বোচ্চ কত ক্রম পাওয়া যায়?",
      hint: "d/λ এর চেয়ে ছোট পূর্ণসংখ্যা।",
      steps: [
        { text: "d = 1.67 μm।", tex: "d=\\dfrac{10^{-2}}{6000}=1.67\\ \\mu\\text{m}" },
        { text: "d/λ।", tex: "\\dfrac{1.67}{0.6}=2.78" },
        { text: "উত্তর: সর্বোচ্চ ক্রম 2।" },
      ],
    },
  ],
  concepts: ["গ্রেটিংয়ের রেখা ইয়ংয়ের ঝালরের চেয়ে তীক্ষ্ণ কেন?", "গ্রেটিং দিয়ে λ কীভাবে মাপা হয়?"],
  quiz: [
    { q: "গ্রেটিং ধ্রুবক?", options: ["1/N", "N", "N²", "λN"], answer: 0, why: "দুই দাগের দূরত্ব।" },
    { q: "উজ্জ্বল রেখার শর্ত?", options: ["d sinθ = nλ", "d sinθ = (n + 1/2)λ", "a sinθ = nλ", "d = nλ"], answer: 0, why: "পথ পার্থক্য nλ।" },
    { q: "5000 দাগ/cm এ d?", options: ["2 μm", "0.2 μm", "20 μm", "5 μm"], answer: 0, why: "10^-2 ÷ 5000।" },
    { q: "শূন্য ক্রমে সাদা আলোতে কী দেখা যায়?", options: ["সাদা", "লাল", "বেগুনি", "অন্ধকার"], answer: 0, why: "θ = 0 এ সব রঙ মেলে।" },
    { q: "6000 দাগ/cm, 600 nm এ সর্বোচ্চ ক্রম?", options: ["2", "3", "1", "4"], answer: 0, why: "d/λ = 2.78।" },
  ],
};

const order: Array<[number, number]> = [[0, 0], [1, 17.46], [2, 36.87], [3, 64.16]];

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "গ্রেটিং ধ্রুবক",
            text: (
              <>
                গ্রেটিংয়ে প্রতি cm এ 5000 দাগ। দুই দাগের দূরত্ব <C k="r">d</C> কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["2 μm", "0.2 μm", "20 μm"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="d = 10^-2 m ÷ 5000 = 2 × 10^-6 m = 2 μm।"
              />
            ),
          },
          {
            title: "প্রথম ক্রম",
            text: "d sinθ = nλ। d = 2 μm, λ = 600 nm, n = 1। sinθ কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["0.3", "0.6", "0.03"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="0.6 ÷ 2 = 0.3, θ প্রায় 17.5°।"
              />
            ),
            figure: () => (
              <Plot
                label="কোণ বনাম ক্রম (600 nm, d = 2 μm)"
                xl="ক্রম n"
                yl="θ (ডিগ্রি)"
                xmax={4}
                ymax={80}
                curves={[{ pts: order, c: "r" }]}
                marks={g.picks[1] !== undefined ? [{ x: 1, y: 17.46, label: "17.5°", c: "p", dx: 8, dy: -8 }, { x: 2, y: 36.87, label: "36.9°", c: "p", dx: 8, dy: -8 }, { x: 3, y: 64.16, label: "64.2°", c: "p", dx: -52, dy: -8 }] : []}
              />
            ),
          },
          {
            title: "সর্বোচ্চ ক্রম",
            text: "sinθ কখনও 1 এর বেশি হয় না। d = 2 μm, λ = 600 nm হলে সর্বোচ্চ কত ক্রম পাওয়া যায়? (d/λ = 3.33)",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["3", "4", "2"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="n = 4 হলে sinθ = 1.2 > 1, অসম্ভব। তাই সর্বোচ্চ ক্রম 3।"
              />
            ),
          },
          {
            title: "রঙ আলাদা হয়",
            text: "সাদা আলোতে প্রথম ক্রমে বেগুনি আর লালের মধ্যে কোনটি কেন্দ্র থেকে বেশি বাঁকে?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["লাল", "বেগুনি", "একই কোণে"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="sinθ = nλ/d। লালের λ বেশি, তাই কোণ বেশি। গ্রেটিং এভাবে বর্ণালী তৈরি করে।"
              />
            ),
          },
        ],
        summary: [
          { title: "গ্রেটিং সূত্র", text: "d = 1/N, উজ্জ্বল রেখা d sinθ = nλ।", tex: ["d\\sin\\theta=n\\lambda"] },
          { title: "সীমা", text: "sinθ ≤ 1 বলে ক্রম সীমিত।", tex: ["n_{\\max}<\\dfrac d\\lambda"] },
        ],
      })}
    />
  );
}
