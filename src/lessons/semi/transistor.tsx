"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ট্রানজিস্টরের গঠন, এমিটার-বেস-কালেক্টর, তড়িৎ প্রবাহের সম্পর্ক, α ও β এবং সাধারণ এমিটার বিবর্ধক বুঝবে ও হিসাব করতে পারবে।",
  hook: "ছোট একটি বেস প্রবাহ দিয়ে বড় কালেক্টর প্রবাহ নিয়ন্ত্রণ করা যায়, যেন সামান্য চাপে পানির বড় ট্যাপ খুলে যায়। এই ধারণা থেকেই বিবর্ধক।",
  formulas: [
    { tex: "I_E=I_B+I_C", meaning: "এমিটার প্রবাহ।" },
    { tex: "\\alpha=\\dfrac{I_C}{I_E},\\quad \\beta=\\dfrac{I_C}{I_B},\\quad \\beta=\\dfrac{\\alpha}{1-\\alpha}", meaning: "প্রবাহ লব্ধি।" },
    { tex: "V_{CE}=V_{CC}-I_CR_C", meaning: "সাধারণ এমিটার বর্তনী।" },
  ],
  example: {
    problem: "β = 100 এবং বেস প্রবাহ 40 μA হলে I_C ও I_E কত?",
    steps: [
      { text: "কালেক্টর প্রবাহ।", tex: "I_C=100\\times40\\ \\mu\\text{A}=4\\ \\text{mA}" },
      { text: "এমিটার প্রবাহ।", tex: "I_E=4+0.04=4.04" },
      { text: "উত্তর: I_C = 4 mA, I_E = 4.04 mA।" },
    ],
  },
  mistakes: [
    "বেস প্রবাহকে কালেক্টরের সমান ভাবা। বেস প্রবাহ অতি ক্ষুদ্র।",
    "α > 1 ভাবা। α সবসময় 1 এর সামান্য কম।",
    "এমিটার-বেস সংযোগ বিপরীত ঝোঁকে ধরা। সম্মুখ ঝোঁকে।",
  ],
  recap: [
    "npn ট্রানজিস্টরে এমিটার-বেস সম্মুখ ঝোঁকে, বেস-কালেক্টর বিপরীত ঝোঁকে।",
    "I_E = I_B + I_C।",
    "α = I_C/I_E (1 এর কম), β = I_C/I_B (বড়, 50 থেকে 300)।",
    "বেস প্রবাহের সামান্য পরিবর্তনে কালেক্টর প্রবাহ বহুগুণ বদলায়, এটিই বিবর্ধন।",
  ],
  think: {
    scenario: "ট্রানজিস্টরের বেস অতি পাতলা ও হালকা ডোপড রাখা হয়।",
    points: ["কেন বেস পাতলা?", "এমিটার থেকে আসা বাহকের কত অংশ কালেক্টরে পৌঁছায়?"],
    hint: "বেসে কম পুনর্মিলন।",
    traps: ["বেস পাতলা বলে বেশির ভাগ বাহক কালেক্টরে পৌঁছে যায়।", "তাই α প্রায় 1, বেস প্রবাহ ছোট।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "β = 100, বেস প্রবাহ 40 μA। কালেক্টর প্রবাহ কত?",
      hint: "I_C = β I_B।",
      steps: [{ text: "গণনা।", tex: "I_C=100\\times0.04=4" }, { text: "উত্তর: 4 mA।" }],
    },
    {
      level: "মাঝারি",
      q: "α = 0.98 হলে β কত?",
      hint: "β = α/(1 − α)।",
      steps: [{ text: "গণনা।", tex: "\\beta=\\dfrac{0.98}{0.02}=49" }, { text: "উত্তর: β = 49।" }],
    },
    {
      level: "কঠিন",
      q: "V_CC = 12 V, R_C = 2 kΩ, I_C = 4 mA। V_CE কত?",
      hint: "V_CE = V_CC − I_C R_C।",
      steps: [{ text: "গণনা।", tex: "V_{CE}=12-4\\times2=4" }, { text: "উত্তর: 4 V।" }],
    },
  ],
  concepts: ["কেন বেস পাতলা ও হালকা ডোপড রাখা হয়?", "ট্রানজিস্টর সুইচ হিসেবে কীভাবে কাজ করে?"],
  quiz: [
    { q: "ট্রানজিস্টরের তিনটি অংশ?", options: ["এমিটার, বেস, কালেক্টর", "অ্যানোড, ক্যাথোড, গেট", "সোর্স, ড্রেন, গেট", "p, n, i"], answer: 0, why: "প্রধান তিন অংশ।" },
    { q: "I_E এর সম্পর্ক?", options: ["I_B + I_C", "I_B − I_C", "I_C − I_B", "I_B × I_C"], answer: 0, why: "প্রবাহ সংরক্ষণ।" },
    { q: "β = 100, I_B = 40 μA হলে I_C?", options: ["4 mA", "0.4 mA", "40 mA", "4 μA"], answer: 0, why: "β I_B।" },
    { q: "α = 0.98 হলে β?", options: ["49", "98", "0.02", "50"], answer: 0, why: "0.98 ÷ 0.02।" },
    { q: "V_CC = 12 V, I_C = 4 mA, R_C = 2 kΩ এ V_CE?", options: ["4 V", "8 V", "12 V", "0 V"], answer: 0, why: "12 − 8।" },
  ],
};

const mk = (ib: number): Array<[number, number]> =>
  Array.from({ length: 49 }, (_, i) => {
    const v = i * 0.25;
    return [v, 100 * ib * (1 - Math.exp(-v / 0.4))] as [number, number];
  });

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "প্রবাহের হিসাব",
            text: (
              <>
                এমিটার প্রবাহ <C k="r">I_E = I_B + I_C</C>। বেস প্রবাহ খুব ছোট, তাই I_C প্রায় I_E। β = I_C/I_B। β = 100 আর I_B = 40 μA হলে I_C কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["4 mA", "0.4 mA", "40 mA"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="100 × 40 μA = 4000 μA = 4 mA। ছোট বেস প্রবাহ বড় কালেক্টর প্রবাহ নিয়ন্ত্রণ করছে।"
              />
            ),
          },
          {
            title: "α আর β",
            text: "α = I_C/I_E আর β = α/(1 − α)। α = 0.98 হলে β কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["49", "98", "0.02"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="0.98 ÷ 0.02 = 49। α সামান্য বাড়লে β অনেক বাড়ে।"
              />
            ),
          },
          {
            title: "আউটপুট বৈশিষ্ট্য",
            text: "V_CC = 12 V, R_C = 2 kΩ, I_B = 40 μA (I_C = 4 mA)। কালেক্টর-এমিটার ভোল্টেজ V_CE = 12 − I_C R_C কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["4 V", "8 V", "12 V"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="12 − 4 × 2 = 4 V। এটিই কার্যবিন্দু (Q-বিন্দু), গ্রাফে লোড রেখা ও বৈশিষ্ট্য রেখা যেখানে কাটে।"
              />
            ),
            figure: () => (
              <Plot
                label="I_C বনাম V_CE (I_B = 20, 40, 60 μA)"
                xl="V_CE (V)"
                yl="I_C (mA)"
                xmax={12}
                ymax={7}
                curves={[
                  { pts: mk(0.02), c: "p" },
                  { pts: mk(0.04), c: "r", w: 2 },
                  { pts: mk(0.06), c: "p" },
                  { pts: [[0, 6], [12, 0]], c: "q", dash: true },
                ]}
                marks={g.picks[2] !== undefined ? [{ x: 4, y: 4, label: "Q", c: "r", dx: 8, dy: -8 }] : []}
              />
            ),
          },
          {
            title: "বিবর্ধন",
            text: "বেস প্রবাহ 40 μA থেকে 60 μA হলে I_C 4 mA থেকে 6 mA হয়। 20 μA এর পরিবর্তন কত বড় পরিবর্তন ঘটাল?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["2 mA, মানে 100 গুণ", "20 μA", "1 mA"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="ΔI_C = 2 mA = 2000 μA, ΔI_B = 20 μA, অনুপাত 100 = β। এভাবে ছোট সংকেত বিবর্ধিত হয়।"
              />
            ),
          },
        ],
        summary: [
          { title: "প্রবাহ সম্পর্ক", text: "I_E = I_B + I_C। α প্রায় 1, β বড়।", tex: ["I_E=I_B+I_C", "\\beta=\\dfrac{\\alpha}{1-\\alpha}"] },
          { title: "সাধারণ এমিটার", text: "কার্যবিন্দু লোড রেখা থেকে।", tex: ["V_{CE}=V_{CC}-I_CR_C"] },
        ],
      })}
    />
  );
}
