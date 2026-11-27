"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "রিডবার্গ সূত্র দিয়ে হাইড্রোজেনের লাইম্যান, বামার ও প্যাশেন শ্রেণির তরঙ্গদৈর্ঘ্য বের করতে এবং কোন শ্রেণি কোন অঞ্চলে পড়ে তা বলতে পারবে।",
  hook: "হাইড্রোজেনের আলো প্রিজমে ভাঙলে রেখা পাওয়া যায়। রেখাগুলোর অবস্থান একটি সরল সূত্রে মিলে যায়।",
  formulas: [
    { tex: "\\dfrac1\\lambda=R\\left(\\dfrac1{n_1^2}-\\dfrac1{n_2^2}\\right)", meaning: "রিডবার্গ সূত্র। R = 1.097 × 10^7 m^-1।" },
    { tex: "n_1=1,2,3\\ \\Rightarrow\\ \\text{লাইম্যান, বামার, প্যাশেন}", meaning: "অতিবেগুনি, দৃশ্যমান, অবলোহিত।" },
  ],
  example: {
    problem: "বামার শ্রেণির প্রথম রেখার (n = 3 থেকে 2) তরঙ্গদৈর্ঘ্য কত?",
    steps: [
      { text: "রিডবার্গ সূত্র।", tex: "\\dfrac1\\lambda=1.097\\times10^7\\left(\\dfrac14-\\dfrac19\\right)=1.52\\times10^6" },
      { text: "উত্তর: λ প্রায় 656 nm।" },
    ],
  },
  mistakes: [
    "n1 আর n2 উল্টে বসানো। n2 > n1।",
    "m এ পাওয়া λ কে nm এ না বদলানো।",
    "বামার শ্রেণিকে অতিবেগুনি ভাবা। এটা দৃশ্যমান আলো।",
  ],
  recap: [
    "লাইম্যান n1 = 1, অতিবেগুনি।",
    "বামার n1 = 2, দৃশ্যমান।",
    "প্যাশেন n1 = 3, অবলোহিত।",
    "শ্রেণি সীমায় n2 = ∞।",
  ],
  think: {
    scenario: "বামার শ্রেণির রেখাগুলো যত ডানে যায়, তত কাছাকাছি আসে এবং একটি সীমায় জমা হয়।",
    points: ["সীমার তরঙ্গদৈর্ঘ্য কত?", "কেন রেখাগুলো ঘন হয়ে আসে?"],
    hint: "n2 বড় হলে 1/n2² প্রায় শূন্য।",
    traps: ["n2 = ∞ নিলে সীমা পাওয়া যায়।", "উঁচু স্তরগুলো কাছাকাছি, তাই পার্থক্যও কাছাকাছি।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "লাইম্যান শ্রেণির প্রথম রেখার (n = 2 থেকে 1) তরঙ্গদৈর্ঘ্য কত?",
      hint: "1 − 1/4 = 0.75।",
      steps: [{ text: "গণনা।", tex: "\\dfrac1\\lambda=1.097\\times10^7\\times0.75=8.23\\times10^6\\Rightarrow\\lambda=121.5\\ \\text{nm}" }, { text: "উত্তর: প্রায় 122 nm।" }],
    },
    {
      level: "মাঝারি",
      q: "বামার শ্রেণির দ্বিতীয় রেখার (n = 4 থেকে 2) তরঙ্গদৈর্ঘ্য কত?",
      hint: "1/4 − 1/16 = 0.1875।",
      steps: [{ text: "গণনা।", tex: "\\dfrac1\\lambda=1.097\\times10^7\\times0.1875=2.06\\times10^6\\Rightarrow\\lambda=486\\ \\text{nm}" }, { text: "উত্তর: প্রায় 486 nm।" }],
    },
    {
      level: "কঠিন",
      q: "প্যাশেন শ্রেণির প্রথম রেখার (n = 4 থেকে 3) তরঙ্গদৈর্ঘ্য কত? কোন অঞ্চলে পড়ে?",
      hint: "1/9 − 1/16।",
      steps: [
        { text: "গণনা।", tex: "\\dfrac1\\lambda=1.097\\times10^7\\times0.0486=5.33\\times10^5" },
        { text: "λ প্রায় 1875 nm।" },
        { text: "উত্তর: 1875 nm, অবলোহিত অঞ্চল।" },
      ],
    },
  ],
  concepts: ["সীমা রেখা কী?", "কেন লাইম্যান শ্রেণি দৃশ্যমান নয়?"],
  quiz: [
    { q: "বামার শ্রেণি কোন অঞ্চলে?", options: ["দৃশ্যমান", "অতিবেগুনি", "অবলোহিত", "এক্স-রে"], answer: 0, why: "n1 = 2 শ্রেণি।" },
    { q: "লাইম্যান শ্রেণি কোন অঞ্চলে?", options: ["অতিবেগুনি", "দৃশ্যমান", "অবলোহিত", "মাইক্রোওয়েভ"], answer: 0, why: "n1 = 1 এ শক্তি পার্থক্য বড়, λ ছোট।" },
    { q: "রিডবার্গ ধ্রুবকের মান?", options: ["1.097 × 10^7 m^-1", "1.097 × 10^5 m^-1", "13.6 eV", "6.63 × 10^-34"], answer: 0, why: "রিডবার্গ ধ্রুবক।" },
    { q: "বামার শ্রেণির প্রথম রেখার λ প্রায়?", options: ["656 nm", "486 nm", "122 nm", "1875 nm"], answer: 0, why: "n = 3 থেকে 2।" },
    { q: "প্যাশেন শ্রেণি কোন n1 এর?", options: ["3", "1", "2", "4"], answer: 0, why: "প্যাশেন n1 = 3।" },
  ],
};

const balmer: Array<[number, number]> = [3, 4, 5, 6, 7, 8, 9, 10].map((n) => [n, 1e9 / (1.097e7 * (1 / 4 - 1 / (n * n)))] as [number, number]);

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "কোন শ্রেণি দেখা যায়",
            text: (
              <>
                হাইড্রোজেনের রেখাগুলো তিনটি প্রধান শ্রেণিতে ভাগ: লাইম্যান (n1 = 1), বামার (n1 = 2), প্যাশেন (n1 = 3)। কোনটি খালি চোখে দেখা যায়?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["বামার", "লাইম্যান", "প্যাশেন"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="বামার শ্রেণি দৃশ্যমান। লাইম্যান অতিবেগুনি, প্যাশেন অবলোহিত, দুটোই অদৃশ্য।"
              />
            ),
          },
          {
            title: "লাল রেখা",
            text: (
              <>
                <C k="r">1/λ = R(1/n1² − 1/n2²)</C>। বামার n1 = 2, n2 = 3, R = 1.097 × 10^7 m^-1। 1/4 − 1/9 = 0.1389। λ কত?
              </>
            ),
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["656 nm", "486 nm", "122 nm"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="1/λ = 1.097 × 10^7 × 0.1389 = 1.52 × 10^6 m^-1, λ = 656 nm। বামার শ্রেণির লাল রেখা।"
              />
            ),
            figure: () => (
              <Plot
                label="বামার শ্রেণির তরঙ্গদৈর্ঘ্য"
                xl="n2"
                yl="λ (nm)"
                xmax={11}
                ymax={700}
                ymin={340}
                xmin={2}
                curves={[{ pts: balmer, c: "r" }]}
                marks={g.picks[1] !== undefined ? [{ x: 3, y: 656.3, label: "656", c: "p", dx: 8, dy: 4 }, { x: 4, y: 486.2, label: "486", c: "p", dx: 8, dy: -4 }] : []}
              />
            ),
          },
          {
            title: "লাইম্যানের প্রথম রেখা",
            text: "লাইম্যান n1 = 1, n2 = 2। 1 − 1/4 = 0.75। λ কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["122 nm", "656 nm", "365 nm"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="1/λ = 1.097 × 10^7 × 0.75 = 8.23 × 10^6, λ = 122 nm, অতিবেগুনি অঞ্চল।"
              />
            ),
          },
          {
            title: "সীমা রেখা",
            text: "বামার শ্রেণির সীমায় n2 = ∞। তখন 1/λ = R/4। এই সীমা রেখার তরঙ্গদৈর্ঘ্য কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["365 nm", "656 nm", "91 nm"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="λ = 4 ÷ 1.097 × 10^7 = 365 nm। বামার শ্রেণির সবচেয়ে ছোট তরঙ্গদৈর্ঘ্য।"
              />
            ),
          },
        ],
        summary: [
          { title: "রিডবার্গ সূত্র", text: "n2 > n1। শ্রেণি ঠিক করে n1।", tex: ["\\dfrac1\\lambda=R\\left(\\dfrac1{n_1^2}-\\dfrac1{n_2^2}\\right)"] },
          { title: "তিন শ্রেণি", text: "লাইম্যান অতিবেগুনি, বামার দৃশ্যমান, প্যাশেন অবলোহিত।", tex: ["n_1=1,\\ 2,\\ 3"] },
        ],
      })}
    />
  );
}
