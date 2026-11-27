"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "আলোর ব্যবর্তন, একক চিড়ে ব্যবর্তনের শর্ত ও কেন্দ্রীয় উজ্জ্বল অংশের প্রস্থ বুঝবে এবং ব্যতিচারের সাথে পার্থক্য বলতে পারবে।",
  hook: "দরজার ফাঁক দিয়ে শব্দ ঘরের কোণেও পৌঁছায়, আলো তেমন যায় না। কারণ আলোর তরঙ্গদৈর্ঘ্য এত ক্ষুদ্র যে ব্যবর্তন খুব সূক্ষ্ম চিড়েই চোখে পড়ে।",
  formulas: [
    { tex: "a\\sin\\theta=n\\lambda\\quad(n=1,2,3,\\ldots)", meaning: "একক চিড়ে অন্ধকার ঝালরের শর্ত।" },
    { tex: "W=\\dfrac{2\\lambda D}{a}", meaning: "কেন্দ্রীয় উজ্জ্বল অংশের প্রস্থ।" },
    { tex: "\\dfrac{I}{I_0}=\\left(\\dfrac{\\sin\\beta}{\\beta}\\right)^2,\\ \\beta=\\dfrac{\\pi a\\sin\\theta}{\\lambda}", meaning: "তীব্রতা বণ্টন।" },
  ],
  example: {
    problem: "a = 0.1 mm চিড়ে 600 nm আলো। প্রথম অন্ধকারের sinθ কত?",
    steps: [
      { text: "সূত্র।", tex: "\\sin\\theta=\\dfrac{\\lambda}{a}=\\dfrac{6\\times10^{-7}}{10^{-4}}" },
      { text: "উত্তর: 0.006।" },
    ],
  },
  mistakes: [
    "a sinθ = nλ কে উজ্জ্বলের শর্ত ভাবা। এটি অন্ধকারের শর্ত।",
    "চিড় সরু করলে কেন্দ্রীয় অংশ সরু হয় ভাবা। চওড়া হয়।",
    "ব্যবর্তনে সব ঝালরের তীব্রতা সমান ভাবা। কেন্দ্র সবচেয়ে উজ্জ্বল, পাশের ঝালর অনেক ক্ষীণ।",
  ],
  recap: [
    "বাধার কিনারায় আলো বেঁকে ছায়ার অংশে ঢোকে, একে ব্যবর্তন বলে।",
    "একক চিড়ে অন্ধকার: a sinθ = nλ।",
    "কেন্দ্রীয় উজ্জ্বল অংশের প্রস্থ 2λD/a, যা পাশের ঝালরের দ্বিগুণ।",
    "চিড় যত সরু, ব্যবর্তন তত বেশি।",
  ],
  think: {
    scenario: "একই চিড়ে লাল আলোর বদলে নীল আলো পাঠানো হলো।",
    points: ["কেন্দ্রীয় অংশের প্রস্থ কীভাবে বদলায়?", "ছবিতে ব্যবর্তন কম না বেশি দেখা যাবে?"],
    hint: "W ∝ λ।",
    traps: ["নীলের λ কম, তাই W কম।", "ব্যবর্তন কম, ছড়ানো কম।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "a = 0.1 mm চিড়ে 600 nm আলোর প্রথম অন্ধকারের জন্য sinθ কত?",
      hint: "sinθ = λ/a।",
      steps: [{ text: "গণনা।", tex: "\\sin\\theta=\\dfrac{6\\times10^{-7}}{10^{-4}}=0.006" }, { text: "উত্তর: 0.006।" }],
    },
    {
      level: "মাঝারি",
      q: "ওই চিড়ের (a = 0.1 mm, λ = 600 nm) জন্য 2 m দূরের পর্দায় কেন্দ্রীয় উজ্জ্বল অংশের প্রস্থ কত?",
      hint: "W = 2λD/a।",
      steps: [{ text: "গণনা।", tex: "W=\\dfrac{2\\times6\\times10^{-7}\\times2}{10^{-4}}=0.024" }, { text: "উত্তর: 24 mm।" }],
    },
    {
      level: "কঠিন",
      q: "500 nm আলোর প্রথম অন্ধকার 30° কোণে পেতে চিড়ের প্রস্থ কত হতে হবে?",
      hint: "a = λ/sin30°।",
      steps: [{ text: "গণনা।", tex: "a=\\dfrac{500}{0.5}=1000" }, { text: "উত্তর: 1000 nm (1 μm)।" }],
    },
  ],
  concepts: ["ব্যবর্তন আর ব্যতিচারের মধ্যে মূল পার্থক্য কী?", "সূর্যের আলোয় ছায়ার কিনারা তীক্ষ্ণ কেন মনে হয়?"],
  quiz: [
    { q: "একক চিড়ে অন্ধকার ঝালরের শর্ত?", options: ["a sinθ = nλ", "a sinθ = (n + 1/2)λ", "d sinθ = nλ", "a = nλ"], answer: 0, why: "প্রথম অন্ধকার n = 1।" },
    { q: "চিড় সরু করলে কেন্দ্রীয় উজ্জ্বল অংশ?", options: ["চওড়া হয়", "সরু হয়", "একই", "অদৃশ্য হয়"], answer: 0, why: "W ∝ 1/a।" },
    { q: "কেন্দ্রীয় উজ্জ্বল অংশের প্রস্থ?", options: ["2λD/a", "λD/a", "λD/2a", "λa/D"], answer: 0, why: "দুই প্রথম অন্ধকারের মধ্যবর্তী দূরত্ব।" },
    { q: "a = 0.1 mm, 600 nm এ প্রথম অন্ধকারের sinθ?", options: ["0.006", "0.06", "0.0006", "0.6"], answer: 0, why: "λ/a।" },
    { q: "ব্যবর্তন সবচেয়ে বেশি কখন?", options: ["চিড়ের প্রস্থ λ এর কাছাকাছি হলে", "চিড় অনেক বড় হলে", "আলো তীব্র হলে", "পর্দা কাছে হলে"], answer: 0, why: "ছোট a তে ছড়ানো বেশি।" },
  ],
};

const sinc: Array<[number, number]> = Array.from({ length: 121 }, (_, i) => {
  const x = i * 0.025 + 0.0001;
  const b = Math.PI * x;
  return [x, Math.pow(Math.sin(b) / b, 2)] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ব্যবর্তন",
            text: (
              <>
                বাধার কিনারায় আলোর বেঁকে যাওয়াকে <C k="r">ব্যবর্তন</C> বলে। কখন ব্যবর্তন সবচেয়ে স্পষ্ট?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["বাধা বা চিড়ের মাপ λ এর কাছাকাছি হলে", "চিড় খুব বড় হলে", "আলো তীব্র হলে"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="আলোর λ প্রায় 10^-7 m, তাই খুব সরু চিড় লাগে। শব্দের λ বড়, তাই দরজার ফাঁকেও ব্যবর্তন হয়।"
              />
            ),
          },
          {
            title: "অন্ধকার ঝালর",
            text: "একক চিড়ে প্রথম অন্ধকার a sinθ = λ। a = 0.1 mm, λ = 600 nm হলে sinθ কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["0.006", "0.06", "0.6"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="6 × 10^-7 ÷ 10^-4 = 0.006, মানে কোণ খুব ক্ষুদ্র।"
              />
            ),
            figure: () => (
              <Plot
                label="একক চিড়ের তীব্রতা"
                xl="a sinθ / λ"
                yl="I/I0"
                xmax={3}
                ymax={1.1}
                curves={[{ pts: sinc, c: "r" }]}
                marks={g.picks[1] !== undefined ? [{ x: 1, y: 0, label: "n=1", c: "p", dx: -10, dy: -14 }, { x: 2, y: 0, label: "n=2", c: "p", dx: -10, dy: -14 }] : []}
              />
            ),
          },
          {
            title: "কেন্দ্রীয় প্রস্থ",
            text: "W = 2λD/a। D = 2 m, a = 0.1 mm, λ = 600 nm হলে W কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["24 mm", "12 mm", "2.4 mm"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="2 × 6 × 10^-7 × 2 ÷ 10^-4 = 0.024 m = 24 mm। কেন্দ্রীয় অংশ পাশের ঝালরের দ্বিগুণ চওড়া।"
              />
            ),
          },
          {
            title: "চিড় সরু করলে",
            text: "চিড় আরও সরু করলে পর্দায় কেন্দ্রীয় উজ্জ্বল অংশের কী হয়?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["আরও চওড়া হয়", "সরু হয়", "একই থাকে"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="W ∝ 1/a। চিড় সরু হলে আলো আরও ছড়ায়। ইয়ংয়ের ঝালরের বিপরীত, যেখানে d কমলে β বাড়ে।"
              />
            ),
          },
        ],
        summary: [
          { title: "অন্ধকারের শর্ত", text: "একক চিড়ে a sinθ = nλ।", tex: ["a\\sin\\theta=n\\lambda"] },
          { title: "কেন্দ্রীয় প্রস্থ", text: "চিড় সরু হলে চওড়া হয়।", tex: ["W=\\dfrac{2\\lambda D}{a}"] },
        ],
      })}
    />
  );
}
