"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ইয়ংয়ের দ্বি-চিড় পরীক্ষা বুঝবে, ফ্রিঞ্জ প্রস্থ β = λD/d বের করবে এবং উজ্জ্বল ও অন্ধকার ঝালরের অবস্থান নির্ণয় করতে পারবে।",
  hook: "1801 সালে টমাস ইয়ং দুটি সরু চিড় দিয়ে আলো পাঠিয়ে পর্দায় উজ্জ্বল-অন্ধকার দাগ দেখালেন। এটি আলোর তরঙ্গধর্মের প্রথম সরাসরি প্রমাণ।",
  formulas: [
    { tex: "\\beta=\\dfrac{\\lambda D}{d}", meaning: "ঝালর প্রস্থ।" },
    { tex: "y_n=n\\beta\\ \\text{(উজ্জ্বল)},\\quad y_n=\\left(n+\\tfrac12\\right)\\beta\\ \\text{(অন্ধকার)}", meaning: "কেন্দ্র থেকে দূরত্ব।" },
    { tex: "\\Delta=\\dfrac{yd}{D}", meaning: "পর্দার y বিন্দুতে পথ পার্থক্য।" },
  ],
  example: {
    problem: "λ = 600 nm, D = 1 m, d = 1 mm। ঝালর প্রস্থ কত?",
    steps: [
      { text: "সূত্র।", tex: "\\beta=\\dfrac{600\\times10^{-9}\\times1}{10^{-3}}=6\\times10^{-4}" },
      { text: "উত্তর: 0.6 mm।" },
    ],
  },
  mistakes: [
    "d বাড়ালে ঝালর চওড়া হয় ভাবা। সরু হয়।",
    "D কে চিড় থেকে উৎসের দূরত্ব ভাবা। চিড় থেকে পর্দার দূরত্ব।",
    "মাধ্যম বদলালে β একই ভাবা। পানিতে λ কমে, β কমে।",
  ],
  recap: [
    "β = λD/d।",
    "কেন্দ্রীয় ঝালর উজ্জ্বল (Δ = 0)।",
    "n-তম উজ্জ্বল ঝালর কেন্দ্র থেকে nβ দূরে।",
    "পুরো ব্যবস্থা পানিতে ডোবালে β = β0/n।",
  ],
  think: {
    scenario: "ইয়ংয়ের পরীক্ষায় লাল আলোর বদলে নীল আলো ব্যবহার করা হলো।",
    points: ["ঝালর প্রস্থ কীভাবে বদলায়?", "কেন?"],
    hint: "β ∝ λ।",
    traps: ["নীলের λ কম, তাই β কম, ঝালর ঘন।", "d ও D একই আছে।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "λ = 600 nm, D = 1 m, d = 1 mm। 3য় উজ্জ্বল ঝালরের কেন্দ্র থেকে দূরত্ব কত?",
      hint: "y3 = 3β, β = 0.6 mm।",
      steps: [{ text: "গণনা।", tex: "y_3=3\\times0.6=1.8" }, { text: "উত্তর: 1.8 mm।" }],
    },
    {
      level: "মাঝারি",
      q: "λ = 500 nm, D = 2 m, d = 0.5 mm। β কত?",
      hint: "β = λD/d।",
      steps: [{ text: "গণনা।", tex: "\\beta=\\dfrac{5\\times10^{-7}\\times2}{5\\times10^{-4}}=2\\times10^{-3}" }, { text: "উত্তর: 2 mm।" }],
    },
    {
      level: "কঠিন",
      q: "প্রথম ব্যবস্থায় (β = 0.6 mm) পুরো যন্ত্র পানিতে (n = 1.33) ডোবালে নতুন β কত?",
      hint: "β' = β/n।",
      steps: [{ text: "গণনা।", tex: "\\beta'=\\dfrac{0.6}{1.33}=0.45" }, { text: "উত্তর: 0.45 mm।" }],
    },
  ],
  concepts: ["চিড় দুটির মধ্যবর্তী দূরত্ব বাড়ালে কী হয়?", "সাদা আলোতে ইয়ংয়ের পরীক্ষা করলে কেন্দ্রে সাদা আর পাশে রঙিন ঝালর কেন?"],
  quiz: [
    { q: "ঝালর প্রস্থ?", options: ["λD/d", "λd/D", "Dd/λ", "λ/Dd"], answer: 0, why: "β = λD/d।" },
    { q: "d বাড়ালে β?", options: ["কমে", "বাড়ে", "একই", "শূন্য"], answer: 0, why: "β ∝ 1/d।" },
    { q: "কেন্দ্রীয় ঝালর?", options: ["উজ্জ্বল", "অন্ধকার", "রঙিন", "অনুপস্থিত"], answer: 0, why: "Δ = 0।" },
    { q: "λ = 500 nm, D = 2 m, d = 0.5 mm এ β?", options: ["2 mm", "0.5 mm", "5 mm", "0.2 mm"], answer: 0, why: "λD/d।" },
    { q: "যন্ত্র পানিতে ডোবালে β?", options: ["কমে", "বাড়ে", "একই", "শূন্য"], answer: 0, why: "λ কমে।" },
  ],
};

const bright: Array<[number, number]> = Array.from({ length: 91 }, (_, i) => {
  const y = i * 0.04;
  return [y, Math.pow(Math.cos((Math.PI * y) / 0.6), 2)] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ঝালর প্রস্থ",
            text: (
              <>
                দুই চিড়ের দূরত্ব d, পর্দা D দূরে। ঝালর প্রস্থ <C k="r">β = λD/d</C>। λ = 600 nm, D = 1 m, d = 1 mm হলে β কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["0.6 mm", "6 mm", "0.06 mm"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="600 × 10^-9 × 1 ÷ 10^-3 = 6 × 10^-4 m = 0.6 mm।"
              />
            ),
            figure: () => (
              <Plot
                label="পর্দায় তীব্রতা (কেন্দ্র থেকে)"
                xl="y (mm)"
                yl="I/I0"
                xmax={3.6}
                ymax={1.2}
                curves={[{ pts: bright, c: "r" }]}
                marks={g.picks[0] !== undefined ? [{ x: 0.6, y: 1, label: "β", c: "p", dx: 6, dy: -8 }, { x: 1.8, y: 1, label: "3β", c: "p", dx: 6, dy: -8 }] : []}
              />
            ),
          },
          {
            title: "ঝালরের অবস্থান",
            text: "কেন্দ্র থেকে 3য় উজ্জ্বল ঝালর কত দূরে? (β = 0.6 mm)",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["1.8 mm", "0.9 mm", "2.4 mm"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="y3 = 3β = 1.8 mm। অন্ধকার ঝালর (n + 1/2)β দূরে, যেমন প্রথমটি 0.3 mm এ।"
              />
            ),
          },
          {
            title: "চিড় কাছে আনলে",
            text: "d অর্ধেক করলে ঝালর প্রস্থ কী হবে?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["দ্বিগুণ", "অর্ধেক", "একই"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="β ∝ 1/d। চিড় কাছে এলে ঝালর চওড়া হয়, তাই দেখা সহজ হয়।"
              />
            ),
          },
          {
            title: "পানিতে ডোবালে",
            text: "পুরো যন্ত্র পানিতে (n = 1.33) ডোবালে λ কমে β = 0.6/1.33 হয়। নতুন β কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["0.45 mm", "0.8 mm", "0.6 mm"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="0.6 ÷ 1.33 = 0.45 mm। ঝালর ঘন হয়ে যায়।"
              />
            ),
          },
        ],
        summary: [
          { title: "ঝালর প্রস্থ", text: "λ আর D বাড়লে বাড়ে, d বাড়লে কমে।", tex: ["\\beta=\\dfrac{\\lambda D}{d}"] },
          { title: "অবস্থান", text: "উজ্জ্বল nβ, অন্ধকার (n + 1/2)β।", tex: ["y_n=n\\beta"] },
        ],
      })}
    />
  );
}
