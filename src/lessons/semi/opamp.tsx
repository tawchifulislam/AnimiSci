"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "আদর্শ অপারেশনাল অ্যামপ্লিফায়ারের ধর্ম, ইনভার্টিং ও নন-ইনভার্টিং বিবর্ধক এবং সম্পৃক্তি বুঝবে ও গেইন হিসাব করতে পারবে।",
  hook: "গানের মাইক্রোফোন মিলিভোল্টের সংকেত দেয়, স্পিকার চালাতে দরকার কয়েক ভোল্ট। অপ-অ্যাম্প ছোট সংকেতকে নিখুঁতভাবে বড় করে।",
  formulas: [
    { tex: "A_v=-\\dfrac{R_f}{R_{in}}", meaning: "ইনভার্টিং বিবর্ধকের গেইন।" },
    { tex: "A_v=1+\\dfrac{R_f}{R_1}", meaning: "নন-ইনভার্টিং বিবর্ধকের গেইন।" },
    { tex: "V_{out}=A_vV_{in},\\quad |V_{out}|\\le V_{sat}", meaning: "আউটপুট সম্পৃক্তি ভোল্টেজের বেশি হতে পারে না।" },
  ],
  example: {
    problem: "ইনভার্টিং বিবর্ধকে R_f = 100 kΩ, R_in = 10 kΩ, V_in = 0.5 V। V_out কত?",
    steps: [
      { text: "গেইন।", tex: "A_v=-\\dfrac{100}{10}=-10" },
      { text: "আউটপুট।", tex: "V_{out}=-10\\times0.5=-5" },
      { text: "উত্তর: −5 V।" },
    ],
  },
  mistakes: [
    "ইনভার্টিংয়ে আউটপুট একই চিহ্নের ভাবা। উল্টো চিহ্ন।",
    "গেইন যত বড়ই হোক আউটপুট অসীম হতে পারে ভাবা। সম্পৃক্তিতে আটকে যায়।",
    "ইনপুটে প্রবাহ বহু ভাবা। আদর্শে প্রবাহ শূন্য।",
  ],
  recap: [
    "আদর্শ অপ-অ্যাম্প: খোলা-লুপ গেইন অসীম, ইনপুট রোধ অসীম, আউটপুট রোধ শূন্য।",
    "ঋণাত্মক ফিডব্যাকে দুই ইনপুটের বিভব সমান (ভার্চুয়াল শর্ট)।",
    "ইনভার্টিং গেইন −Rf/Rin, নন-ইনভার্টিং গেইন 1 + Rf/R1।",
    "আউটপুট ±Vsat এর মধ্যে সীমিত।",
  ],
  think: {
    scenario: "একই অপ-অ্যাম্পে গেইন −20 রেখে 1 V ইনপুট দেওয়া হলো, সরবরাহ ±12 V।",
    points: ["20 V আউটপুট পাওয়া যাবে কি?", "আউটপুট কত হবে?"],
    hint: "সম্পৃক্তি।",
    traps: ["সরবরাহ ভোল্টেজের বেশি পাওয়া যায় না।", "আউটপুট −12 V এ আটকে যায়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "ইনভার্টিং বিবর্ধকে R_f = 100 kΩ, R_in = 10 kΩ। গেইন কত?",
      hint: "−Rf/Rin।",
      steps: [{ text: "গণনা।", tex: "A_v=-\\dfrac{100}{10}=-10" }, { text: "উত্তর: −10।" }],
    },
    {
      level: "মাঝারি",
      q: "নন-ইনভার্টিং বিবর্ধকে R_f = 90 kΩ, R_1 = 10 kΩ। গেইন কত?",
      hint: "1 + Rf/R1।",
      steps: [{ text: "গণনা।", tex: "A_v=1+\\dfrac{90}{10}=10" }, { text: "উত্তর: গেইন 10।" }],
    },
    {
      level: "কঠিন",
      q: "ইনভার্টিং বিবর্ধকের গেইন −20, সরবরাহ ±12 V। V_in = 1 V হলে V_out কত?",
      hint: "−20 V চাইবে, কিন্তু সীমা আছে।",
      steps: [
        { text: "অনুমিত আউটপুট −20 V, যা সীমার বাইরে।" },
        { text: "আউটপুট সম্পৃক্ত হয়ে সরবরাহের কাছাকাছি আটকে যায়।" },
        { text: "উত্তর: −12 V।" },
      ],
    },
  ],
  concepts: ["ভার্চুয়াল গ্রাউন্ড কী?", "অপ-অ্যাম্প কম্প্যারেটর হিসেবে কীভাবে কাজ করে?"],
  quiz: [
    { q: "আদর্শ অপ-অ্যাম্পের ইনপুট রোধ?", options: ["অসীম", "শূন্য", "1 kΩ", "ঋণাত্মক"], answer: 0, why: "ইনপুট প্রবাহ শূন্য।" },
    { q: "আদর্শ অপ-অ্যাম্পের আউটপুট রোধ?", options: ["শূন্য", "অসীম", "1 kΩ", "1 MΩ"], answer: 0, why: "যেকোনো লোড চালাতে পারে।" },
    { q: "ইনভার্টিং গেইন?", options: ["−Rf/Rin", "1 + Rf/Rin", "Rf/Rin", "Rin/Rf"], answer: 0, why: "উল্টো চিহ্ন।" },
    { q: "নন-ইনভার্টিং Rf = 90 kΩ, R1 = 10 kΩ এ গেইন?", options: ["10", "9", "−9", "−10"], answer: 0, why: "1 + 9।" },
    { q: "Rf = 100 kΩ, Rin = 10 kΩ, Vin = 0.5 V এ Vout?", options: ["−5 V", "5 V", "−0.5 V", "−50 V"], answer: 0, why: "−10 × 0.5।" },
  ],
};

const tf: Array<[number, number]> = Array.from({ length: 25 }, (_, i) => {
  const v = i * 0.1;
  return [v, Math.max(-10 * v, -12)] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "আদর্শ অপ-অ্যাম্প",
            text: (
              <>
                আদর্শ অপ-অ্যাম্পের ইনপুট রোধ <C k="r">অসীম</C>, আউটপুট রোধ <C k="p">শূন্য</C>। তাহলে ইনপুটে কত প্রবাহ ঢোকে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["শূন্য", "অসীম", "1 A"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="অসীম রোধে প্রবাহ শূন্য। তাই ফিডব্যাক রোধের মধ্য দিয়ে যে প্রবাহ আসে তা সম্পূর্ণ Rin দিয়ে যাওয়া প্রবাহের সমান।"
              />
            ),
          },
          {
            title: "ইনভার্টিং বিবর্ধক",
            text: "ইনভার্টিংয়ে গেইন −Rf/Rin। Rf = 100 kΩ, Rin = 10 kΩ, Vin = 0.5 V হলে Vout কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["−5 V", "5 V", "−50 V"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="গেইন −10, আউটপুট −10 × 0.5 = −5 V। ইনপুটের চেয়ে দশ গুণ বড় ও উল্টো চিহ্নের।"
              />
            ),
            figure: () => (
              <Plot
                label="Vout বনাম Vin (গেইন −10, সীমা ±12 V)"
                xl="Vin (V)"
                yl="Vout (V)"
                xmax={2.4}
                ymax={1}
                ymin={-14}
                curves={[{ pts: tf, c: "r" }]}
                marks={g.picks[1] !== undefined ? [{ x: 0.5, y: -5, label: "−5", c: "p", dx: 8, dy: -8 }, { x: 1.2, y: -12, label: "সম্পৃক্তি", c: "q", dx: 8, dy: 12 }] : []}
              />
            ),
          },
          {
            title: "নন-ইনভার্টিং",
            text: "নন-ইনভার্টিং গেইন 1 + Rf/R1। Rf = 90 kΩ, R1 = 10 kΩ হলে গেইন কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["10", "9", "−9"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="1 + 90 ÷ 10 = 10। আউটপুট ইনপুটের একই চিহ্নের।"
              />
            ),
          },
          {
            title: "সম্পৃক্তি",
            text: "গেইন −20, ±12 V সরবরাহ। Vin = 1 V হলে সূত্র দেয় −20 V। আসলে আউটপুট কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["−12 V", "−20 V", "0 V"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="আউটপুট সরবরাহ ভোল্টেজের বেশি হতে পারে না। রেখাটি গ্রাফে −12 V এ সমতল হয়ে যায়, একে সম্পৃক্তি বলে।"
              />
            ),
          },
        ],
        summary: [
          { title: "দুই ধরন", text: "ইনভার্টিং উল্টো চিহ্ন দেয়, নন-ইনভার্টিং একই চিহ্ন।", tex: ["A_v=-\\dfrac{R_f}{R_{in}}", "A_v=1+\\dfrac{R_f}{R_1}"] },
          { title: "সীমা", text: "আউটপুট সরবরাহ ভোল্টেজে সীমিত।", tex: ["|V_{out}|\\le V_{sat}"] },
        ],
      })}
    />
  );
}
