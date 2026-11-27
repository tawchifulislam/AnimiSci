"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "আলোক তড়িৎ ক্রিয়ার K_max বনাম f গ্রাফ পড়বে এবং গ্রাফের ঢাল থেকে h, X-অক্ষের ছেদ থেকে সূচন কম্পাঙ্ক ও Y-অক্ষের ছেদ থেকে কার্যাপেক্ষক বের করতে পারবে।",
  hook: "মিলিক্যান বহু ধাতুর ওপর পরীক্ষা করে একটি সরল রেখা পেলেন। সেই রেখার ঢালই প্ল্যাঙ্কের ধ্রুবক h।",
  formulas: [
    { tex: "K_{\\max}=hf-W", meaning: "y = mx + c আকারের সরলরেখা।" },
    { tex: "\\text{ঢাল}=h,\\quad f\\text{-অক্ষে ছেদ}=f_0,\\quad K\\text{-অক্ষে ছেদ}=-W", meaning: "গ্রাফ থেকে তথ্য।" },
    { tex: "h=\\dfrac{e\\,\\Delta V_0}{\\Delta f}", meaning: "নিরোধ বিভবের গ্রাফ থেকে।" },
  ],
  example: {
    problem: "K বনাম f গ্রাফ 5 × 10^14 Hz এ f-অক্ষ কাটে এবং 10 × 10^14 Hz এ K = 2.07 eV। h কত (eV s এককে)?",
    steps: [
      { text: "ঢাল।", tex: "h=\\dfrac{2.07}{(10-5)\\times10^{14}}=4.14\\times10^{-15}" },
      { text: "উত্তর: 4.14 × 10^-15 eV s।" },
    ],
  },
  mistakes: [
    "ঢাল ধাতুর ওপর নির্ভর করে ভাবা। সব ধাতুর ঢাল h, রেখাগুলো সমান্তরাল।",
    "ছেদ ধাতুর ওপর নির্ভর করে না ভাবা। ছেদ ধাতুভেদে ভিন্ন।",
    "Y-অক্ষের ছেদকে ধনাত্মক ধরা। এটি −W।",
  ],
  recap: [
    "K_max বনাম f একটি সরলরেখা।",
    "ঢাল সবসময় h, ধাতু যাই হোক।",
    "f-অক্ষ কাটার বিন্দু সূচন কম্পাঙ্ক f0।",
    "Y-অক্ষে বর্ধিত রেখার ছেদ −W।",
  ],
  think: {
    scenario: "দুটি ধাতুর K বনাম f গ্রাফ আঁকা হলো। রেখা দুটি সমান্তরাল, কিন্তু একটি অন্যটির ডানে।",
    points: ["সমান্তরাল কেন?", "ডানের ধাতুর কার্যাপেক্ষক বেশি না কম?"],
    hint: "ঢাল = h, f0 = W/h।",
    traps: ["ঢাল দুটিরই h, তাই সমান্তরাল।", "ডানে মানে f0 বেশি, তাই W বেশি।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "কার্যাপেক্ষক 2.3 eV ধাতুর সূচন কম্পাঙ্ক কত? (h = 4.14 × 10^-15 eV s)",
      hint: "f0 = W/h।",
      steps: [{ text: "গণনা।", tex: "f_0=\\dfrac{2.3}{4.14\\times10^{-15}}=5.56\\times10^{14}" }, { text: "উত্তর: 5.56 × 10^14 Hz।" }],
    },
    {
      level: "মাঝারি",
      q: "নিরোধ বিভব বনাম কম্পাঙ্ক গ্রাফে Δf = 4 × 10^14 Hz এর জন্য ΔV0 = 1.66 V। h কত? (e = 1.6 × 10^-19 C)",
      hint: "h = eΔV0/Δf।",
      steps: [{ text: "গণনা।", tex: "h=\\dfrac{1.6\\times10^{-19}\\times1.66}{4\\times10^{14}}=6.64\\times10^{-34}" }, { text: "উত্তর: 6.64 × 10^-34 J s।" }],
    },
    {
      level: "কঠিন",
      q: "W = 2.3 eV ধাতুতে 10^15 Hz কম্পাঙ্কের আলো পড়ল। K_max কত? (h = 4.14 × 10^-15 eV s)",
      hint: "hf = 4.14 eV।",
      steps: [{ text: "গণনা।", tex: "K=4.14-2.3=1.84" }, { text: "উত্তর: 1.84 eV।" }],
    },
  ],
  concepts: ["দুই ধাতুর রেখা সমান্তরাল কেন?", "নিরোধ বিভব বনাম কম্পাঙ্ক গ্রাফের ঢাল কত?"],
  quiz: [
    { q: "K_max বনাম f গ্রাফের ঢাল?", options: ["h", "W", "e", "f0"], answer: 0, why: "K = hf − W।" },
    { q: "f-অক্ষে ছেদ?", options: ["সূচন কম্পাঙ্ক f0", "W", "h", "−W"], answer: 0, why: "K = 0 হলে f = f0।" },
    { q: "Y-অক্ষে বর্ধিত রেখার ছেদ?", options: ["−W", "W", "h", "0"], answer: 0, why: "f = 0 এ K = −W।" },
    { q: "ধাতু বদলালে রেখা?", options: ["সমান্তরাল সরে যায়", "ঢাল বদলায়", "একই থাকে", "বাঁকা হয়"], answer: 0, why: "ঢাল h একই, W ভিন্ন।" },
    { q: "W = 2.3 eV এর f0 প্রায়? (h = 4.14 × 10^-15 eV s)", options: ["5.56 × 10^14 Hz", "5.56 × 10^15 Hz", "9.5 × 10^-15 Hz", "2.3 × 10^14 Hz"], answer: 0, why: "2.3 ÷ 4.14 × 10^-15।" },
  ],
};

const line: Array<[number, number]> = [[0, -2.3], [12, 0.414 * 12 - 2.3]];

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "গ্রাফের আকার",
            text: (
              <>
                আইনস্টাইনের সমীকরণ <C k="r">K = hf − W</C> একটি সরলরেখা। রেখাটির ঢাল কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["h", "W", "hf"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="y = mx + c এর সাথে মেলালে ঢাল m = h, Y-অক্ষের ছেদ c = −W।"
              />
            ),
            figure: () => (
              <Plot
                label="K_max বনাম f"
                xl="f (10^14 Hz)"
                yl="K (eV)"
                xmax={12}
                ymax={3}
                ymin={-2.5}
                curves={[{ pts: line, c: "r" }]}
                marks={[{ x: 5.56, y: 0, label: "f0", c: "p", dx: 6, dy: -10 }, { x: 0, y: -2.3, label: "−W", c: "p", dx: 8, dy: -8 }]}
              />
            ),
          },
          {
            title: "সূচন কম্পাঙ্ক",
            text: "রেখাটি f-অক্ষ কাটে যেখানে K = 0। W = 2.3 eV, h = 4.14 × 10^-15 eV s হলে f0 কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["5.56 × 10^14 Hz", "9.5 × 10^-15 Hz", "5.56 × 10^15 Hz"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="f0 = W/h = 2.3 ÷ 4.14 × 10^-15 = 5.56 × 10^14 Hz। এর নিচে কম্পাঙ্কে কোনো নিঃসরণ নেই।"
              />
            ),
          },
          {
            title: "ধাতু বদলালে",
            text: "অন্য ধাতুর কার্যাপেক্ষক বেশি। তার রেখা প্রথমটির তুলনায় কেমন?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["সমান্তরাল, ডানে সরানো", "বেশি খাড়া", "বাঁদিকে সরানো"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="ঢাল h সব ধাতুর একই। W বেশি হলে f0 বেশি, রেখা ডানে সরে যায়।"
              />
            ),
          },
          {
            title: "প্রয়োগ",
            text: "W = 2.3 eV ধাতুতে 10^15 Hz আলো পড়লে ফোটন শক্তি hf = 4.14 eV। K_max কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["1.84 eV", "6.44 eV", "4.14 eV"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="4.14 − 2.3 = 1.84 eV, মানে নিরোধ বিভব 1.84 V।"
              />
            ),
          },
        ],
        summary: [
          { title: "গ্রাফ থেকে", text: "ঢাল h, X-ছেদ f0, Y-ছেদ −W।", tex: ["K_{\\max}=hf-W"] },
          { title: "সব ধাতু", text: "রেখাগুলো সমান্তরাল।", tex: ["h=\\dfrac{e\\,\\Delta V_0}{\\Delta f}"] },
        ],
      })}
    />
  );
}
