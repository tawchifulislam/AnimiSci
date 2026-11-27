"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "অর্ধতরঙ্গ ও পূর্ণতরঙ্গ একমুখীকরণ, ব্রিজ বর্তনী, ফিল্টার ও জেনার ডায়োডের কাজ বুঝবে এবং DC মান হিসাব করতে পারবে।",
  hook: "ফোনের চার্জারে দেয়ালের AC বিদ্যুৎ DC হয়ে ব্যাটারিতে যায়। এই রূপান্তরের কাজটি করে ডায়োড।",
  formulas: [
    { tex: "V_{dc}=\\dfrac{V_m}{\\pi}\\ \\text{(অর্ধতরঙ্গ)},\\quad V_{dc}=\\dfrac{2V_m}{\\pi}\\ \\text{(পূর্ণতরঙ্গ)}", meaning: "গড় DC মান। V_m শীর্ষ মান।" },
    { tex: "V_m=\\sqrt2\\,V_{rms}", meaning: "rms থেকে শীর্ষ মান।" },
    { tex: "\\eta=40.6\\%\\ \\text{(অর্ধ)},\\quad 81.2\\%\\ \\text{(পূর্ণ)}", meaning: "একমুখীকরণ দক্ষতা।" },
  ],
  example: {
    problem: "শীর্ষ মান 10 V এর AC কে অর্ধতরঙ্গ একমুখীকরণ করলে গড় DC মান কত?",
    steps: [
      { text: "সূত্র।", tex: "V_{dc}=\\dfrac{10}{\\pi}=3.18" },
      { text: "উত্তর: 3.18 V।" },
    ],
  },
  mistakes: [
    "পূর্ণতরঙ্গে গড় মান অর্ধতরঙ্গের সমান ভাবা। দ্বিগুণ।",
    "rms মান আর শীর্ষ মান গুলিয়ে ফেলা। Vm = √2 Vrms।",
    "একমুখীকরণ করলেই মসৃণ DC পাওয়া যায় ভাবা। ফিল্টার লাগে।",
  ],
  recap: [
    "অর্ধতরঙ্গ: একটি ডায়োড, একটি অর্ধচক্র কাজে লাগে, Vdc = Vm/π।",
    "পূর্ণতরঙ্গ: দুটি বা চারটি (ব্রিজ) ডায়োড, Vdc = 2Vm/π।",
    "ক্যাপাসিটর ফিল্টার ঢেউ মসৃণ করে (রিপল কমায়)।",
    "জেনার ডায়োড বিপরীত ভাঙনে ভোল্টেজ ধ্রুব রাখে।",
  ],
  think: {
    scenario: "একটি অর্ধতরঙ্গ রেকটিফায়ারের আউটপুটে বড় ক্যাপাসিটর জুড়ে দিলে ঢেউ অনেক মসৃণ হয়।",
    points: ["ক্যাপাসিটর কখন চার্জ হয়?", "ডায়োড বন্ধ থাকলে কে বর্তনী চালায়?"],
    hint: "ক্যাপাসিটর শীর্ষে চার্জ হয়, ফাঁকে ডিসচার্জ হয়।",
    traps: ["শীর্ষ পর্যন্ত চার্জ হয়ে ডায়োড বন্ধ হলে ডিসচার্জ হয়ে লোড চালায়।", "ধারকত্ব বেশি হলে রিপল কম।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "শীর্ষ মান 10 V এর AC অর্ধতরঙ্গ একমুখীকরণ করলে গড় DC মান কত?",
      hint: "Vm/π।",
      steps: [{ text: "গণনা।", tex: "\\dfrac{10}{3.1416}=3.18" }, { text: "উত্তর: 3.18 V।" }],
    },
    {
      level: "মাঝারি",
      q: "একই AC পূর্ণতরঙ্গ একমুখীকরণ করলে গড় DC মান কত?",
      hint: "2Vm/π।",
      steps: [{ text: "গণনা।", tex: "\\dfrac{2\\times10}{3.1416}=6.37" }, { text: "উত্তর: 6.37 V।" }],
    },
    {
      level: "কঠিন",
      q: "ট্রান্সফর্মারের গৌণ কুণ্ডলীতে rms ভোল্টেজ 12 V। পূর্ণতরঙ্গ একমুখীকরণে গড় DC কত? (ডায়োডের বিভব পতন উপেক্ষা)",
      hint: "প্রথমে Vm = 12√2 = 16.97।",
      steps: [
        { text: "শীর্ষ মান 16.97 V।", tex: "V_m=12\\times1.414=16.97" },
        { text: "গড় DC।", tex: "V_{dc}=\\dfrac{2\\times16.97}{3.1416}=10.80" },
        { text: "উত্তর: 10.80 V।" },
      ],
    },
  ],
  concepts: ["ব্রিজ রেকটিফায়ারে কেন চারটি ডায়োড লাগে?", "জেনার ডায়োড ভোল্টেজ স্থিতিকারক হয় কীভাবে?"],
  quiz: [
    { q: "অর্ধতরঙ্গে Vdc?", options: ["Vm/π", "2Vm/π", "Vm/2", "Vm√2"], answer: 0, why: "এক অর্ধচক্রের গড়।" },
    { q: "পূর্ণতরঙ্গে Vdc?", options: ["2Vm/π", "Vm/π", "Vm/2", "Vm"], answer: 0, why: "দুই অর্ধচক্রই কাজে লাগে।" },
    { q: "Vm = 10 V এ অর্ধতরঙ্গ Vdc?", options: ["3.18 V", "6.37 V", "10 V", "7.07 V"], answer: 0, why: "10 ÷ π।" },
    { q: "ফিল্টার কেন ব্যবহার হয়?", options: ["রিপল কমাতে", "ভোল্টেজ বাড়াতে", "কারেন্ট বাড়াতে", "তাপ কমাতে"], answer: 0, why: "ঢেউ মসৃণ করে।" },
    { q: "জেনার ডায়োড কোন ঝোঁকে ভোল্টেজ স্থির রাখে?", options: ["বিপরীত ভাঙন", "সম্মুখ", "অবক্ষয়", "ঝোঁকবিহীন"], answer: 0, why: "ভাঙন অঞ্চলে ভোল্টেজ প্রায় ধ্রুব।" },
  ],
};

const half: Array<[number, number]> = Array.from({ length: 81 }, (_, i) => {
  const x = i * 0.05;
  return [x, Math.max(Math.sin(Math.PI * x), 0)] as [number, number];
});
const full: Array<[number, number]> = Array.from({ length: 81 }, (_, i) => {
  const x = i * 0.05;
  return [x, Math.abs(Math.sin(Math.PI * x))] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "অর্ধতরঙ্গ",
            text: (
              <>
                একটি ডায়োড AC এর শুধু ধনাত্মক অর্ধচক্র পার করে। এর গড় DC মান <C k="r">Vm/π</C>। Vm = 10 V হলে Vdc কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["3.18 V", "6.37 V", "5 V"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="10 ÷ 3.1416 = 3.18 V। শুধু অর্ধেক চক্র কাজে লাগে, তাই গড় কম।"
              />
            ),
            figure: () => (
              <Plot
                label="একমুখীকৃত তরঙ্গ (এক চক্র = 2 একক)"
                xl="ωt / π"
                yl="V / Vm"
                xmax={4}
                ymax={1.2}
                curves={[{ pts: full, c: "p" }, { pts: half, c: "r", w: 2 }]}
                notes={[{ x: 0.1, y: 1.12, text: "অর্ধতরঙ্গ (লাল), পূর্ণতরঙ্গ (নীল)", c: "r", anchor: "start" }]}
              />
            ),
          },
          {
            title: "পূর্ণতরঙ্গ",
            text: "পূর্ণতরঙ্গ রেকটিফায়ার দুই অর্ধচক্রই কাজে লাগায়। Vdc = 2Vm/π। Vm = 10 V এ কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["6.37 V", "3.18 V", "10 V"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="2 × 10 ÷ 3.1416 = 6.37 V, অর্ধতরঙ্গের দ্বিগুণ। দক্ষতা 81.2%, অর্ধতরঙ্গের 40.6%।"
              />
            ),
          },
          {
            title: "ট্রান্সফর্মারের rms",
            text: "ট্রান্সফর্মারের গৌণে rms 12 V। শীর্ষ মান Vm = 12 × 1.414 কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["16.97 V", "12 V", "8.49 V"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="Vm = √2 Vrms = 16.97 V। পূর্ণতরঙ্গে Vdc = 2 × 16.97 ÷ π = 10.80 V।"
              />
            ),
          },
          {
            title: "জেনার ডায়োড",
            text: "6.2 V জেনার, 10 V উৎস ও 380 Ω রোধ। রোধের মধ্য দিয়ে প্রবাহ (10 − 6.2) ÷ 380 কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["10 mA", "26 mA", "3.8 mA"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="3.8 ÷ 380 = 10 mA। জেনার বিপরীত ভাঙনে 6.2 V ধ্রুব রাখে, উৎস বদলালে বাড়তি ভোল্টেজ রোধে পড়ে।"
              />
            ),
          },
        ],
        summary: [
          { title: "DC মান", text: "পূর্ণতরঙ্গে অর্ধতরঙ্গের দ্বিগুণ।", tex: ["V_{dc}=\\dfrac{V_m}{\\pi}", "V_{dc}=\\dfrac{2V_m}{\\pi}"] },
          { title: "ফিল্টার ও জেনার", text: "ক্যাপাসিটর ঢেউ মসৃণ করে, জেনার ভোল্টেজ ধ্রুব রাখে।", tex: ["V_m=\\sqrt2\\,V_{rms}"] },
        ],
      })}
    />
  );
}
