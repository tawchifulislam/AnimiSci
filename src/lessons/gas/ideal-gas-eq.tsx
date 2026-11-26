"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, type Built } from "@/components/lesson/guide-kit";
import { GasBox } from "@/components/anim/gas";
import { Stage } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "বয়েল, চার্লস আর চাপের সূত্রকে এক করে PV = nRT পাবে এবং SI একক মেনে অঙ্ক করতে পারবে।",
  hook: "তিনটা আলাদা সূত্র মনে রাখার চেয়ে একটা সূত্র মনে রাখা সহজ। আর সেই এক সূত্রে চারটা রাশিই আছে।",
  formulas: [
    { tex: "PV=nRT", meaning: "আদর্শ গ্যাস সমীকরণ। P পাস্কালে, V ঘনমিটারে, T কেলভিনে।" },
    { tex: "R=8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}", meaning: "সার্বজনীন গ্যাস ধ্রুবক।" },
    { tex: "\\dfrac{P_1V_1}{T_1}=\\dfrac{P_2V_2}{T_2}", meaning: "n ধ্রুব থাকলে আগের আর পরের অবস্থা মেলানোর সূত্র।" },
  ],
  example: {
    problem: "2 mol গ্যাস 300 K তাপমাত্রায় 0.05 m³ আয়তনে আছে। চাপ কত?",
    steps: [
      { text: "সূত্র থেকে P।", tex: "P=\\dfrac{nRT}{V}=\\dfrac{2\\times8.314\\times300}{0.05}" },
      { text: "উত্তর: 99768 Pa, প্রায় 1 atm।" },
    ],
  },
  mistakes: [
    "L আর cm³ বসিয়ে ফেলা। PV = nRT তে SI এককে V বসে, 1 L = 0.001 m³।",
    "সেলসিয়াস বসানো। T সব সময় কেলভিন।",
    "R এর মান ভুল এককের সাথে ব্যবহার করা। 8.314 নিলে P Pa আর V m³।",
  ],
  recap: [
    "PV = nRT তিনটা সূত্র আর অণুর সংখ্যাকে এক করেছে।",
    "R = 8.314 J/(mol·K)। P Pa, V m³, T K।",
    "STP তে 1 mol গ্যাসের আয়তন প্রায় 22.4 L।",
    "আগের-পরের অবস্থা মেলাতে P1V1/T1 = P2V2/T2।",
  ],
  think: {
    scenario: "একটা বদ্ধ ঘরে হিটার চালু করা হলো। ঘরের বাতাসের অণুর সংখ্যা আর ঘরের আয়তন প্রায় একই।",
    points: [
      "PV = nRT অনুযায়ী T বাড়লে ঘরের বাতাসের চাপ কেন বাড়ে?",
      "বাস্তবে ঘরের চাপ তবু প্রায় বদলায় না। জানালা আর দরজার ফাঁক দিয়ে কী ঘটছে?",
    ],
    hint: "n কি সত্যিই ধ্রুব থাকছে? ফাঁক দিয়ে বাতাস বেরিয়ে গেলে n-এর কী হবে?",
    traps: ["গরমে সব অণু বড় হয়ে যায়।", "PV = nRT তে T সেলসিয়াসে বসে।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "2 mol গ্যাস 300 K তাপমাত্রায় 0.05 m³ আয়তনে আছে। চাপ কত? (R = 8.314)",
      hint: "P = nRT ÷ V।",
      steps: [
        { text: "সংখ্যা বসাই।", tex: "P=\\dfrac{2\\times8.314\\times300}{0.05}" },
        { text: "উত্তর: 99768 Pa।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "1 atm (101325 Pa) চাপে ও 27°C তাপমাত্রায় 5 L গ্যাসে কত মোল আছে?",
      hint: "আগে 5 L কে m³ আর 27°C কে K এ নাও।",
      steps: [
        { text: "একক ঠিক করি।", tex: "V=5\\ \\text{L}=0.005\\ \\text{m}^3,\\quad T=300\\ \\text{K}" },
        { text: "n বের করি।", tex: "n=\\dfrac{PV}{RT}=\\dfrac{101325\\times0.005}{8.314\\times300}" },
        { text: "উত্তর: প্রায় 0.203 mol।" },
      ],
    },
    {
      level: "কঠিন",
      q: "0.5 mol গ্যাসের তাপমাত্রা 400 K, চাপ 2 × 10^5 Pa। আয়তন লিটারে কত?",
      hint: "আগে m³ এ V বের করো, তারপর 1000 দিয়ে গুণ করো।",
      steps: [
        { text: "V বের করি।", tex: "V=\\dfrac{nRT}{P}=\\dfrac{0.5\\times8.314\\times400}{200000}=0.008314\\ \\text{m}^3" },
        { text: "লিটারে রূপান্তর।", tex: "0.008314\\times1000=8.314\\ \\text{L}" },
        { text: "উত্তর: 8.314 L।" },
      ],
    },
  ],
  concepts: [
    "PV = nRT কে বয়েলের সূত্রে নামিয়ে আনতে কোন কোন রাশি ধ্রুব ধরতে হয়?",
    "একই P আর T তে দুটি ভিন্ন গ্যাসের সমান আয়তনে অণুর সংখ্যা কেমন হয়?",
  ],
  quiz: [
    { q: "PV = nRT তে T কোন এককে বসে?", options: ["°C", "K", "°F", "যেকোনোটা"], answer: 1, why: "গ্যাসের সমীকরণে সব সময় কেলভিন।" },
    { q: "R এর মান কত?", options: ["8.314 J/(mol·K)", "0.0821 J/(mol·K)", "1.38 J/(mol·K)", "22.4 J/(mol·K)"], answer: 0, why: "SI এককে R = 8.314 J/(mol·K)।" },
    { q: "STP (273 K, 1 atm) তে 1 mol গ্যাসের আয়তন কত?", options: ["1 L", "22.4 L", "24.9 L", "100 L"], answer: 1, why: "V = nRT ÷ P = 8.314 × 273 ÷ 101325 = 0.0224 m³ = 22.4 L।" },
    { q: "P আর T দ্বিগুণ করলে (n ধ্রুব) আয়তন কী হয়?", options: ["দ্বিগুণ", "অর্ধেক", "একই", "চার গুণ"], answer: 2, why: "V = nRT ÷ P। T আর P দুটোই দ্বিগুণ হলে V একই থাকে।" },
    { q: "2 L কত m³?", options: ["2 m³", "0.2 m³", "0.002 m³", "2000 m³"], answer: 2, why: "1 L = 0.001 m³, তাই 2 L = 0.002 m³।" },
  ],
};

export default function Anim() {
  const [temp, setTemp] = useState(300);
  const pres = (8.314 * temp) / 25;
  const sp = 3 * Math.sqrt(temp / 300);

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "P আর T দুটোই দ্বিগুণ",
            text: "বয়েল বলে চাপ বাড়লে আয়তন কমে। চার্লস বলে তাপমাত্রা বাড়লে আয়তন বাড়ে। দুটো একসাথে দ্বিগুণ করলে আয়তন কী হবে?",
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["বাড়বে", "কমবে", "একই থাকবে"]}
                answer={2}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="চাপ দ্বিগুণ হয়ে আয়তন অর্ধেক করতে চায়, তাপমাত্রা দ্বিগুণ হয়ে আয়তন দ্বিগুণ করতে চায়। দুটো কাটাকাটি, তাই V একই।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="চাপ আর তাপমাত্রা দুটোই দ্বিগুণ হলে আয়তন একই">
                <GasBox n={22} speed={3} width={240} />
              </Stage>
            ),
          },
          {
            title: "তিন সূত্র এক হলো",
            text: (
              <>
                বয়েল, চার্লস আর চাপের সূত্র মিলিয়ে পাই <C k="r">PV ÷ T ধ্রুব</C>। অণুর সংখ্যা n বাড়লে ধ্রুবকটা n গুণ বাড়ে। প্রতি মোলের ধ্রুবকটাই R।
              </>
            ),
            tex: ["\\dfrac{PV}{T}=nR", "PV=nRT"],
          },
          {
            title: "তাপমাত্রা বদলে দেখো",
            text: (
              <>
                1 mol গ্যাস 25 L পাত্রে বন্ধ। <b>T</b> বদলালে <C k="r">P</C> কেমন বদলায়?
              </>
            ),
            prompt: (
              <Play
                label="T"
                value={temp}
                min={200}
                max={600}
                step={50}
                suffix=" K"
                onChange={setTemp}
                chips={[200, 300, 600]}
                read={
                  <span>
                    P = <C k="r">{pres.toFixed(0)} kPa</C>
                  </span>
                }
                note="আয়তন আর n ধ্রুব, তাই P সরাসরি T এর সমানুপাতিক।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="আয়তন ধ্রুব রেখে তাপমাত্রা বাড়ালে চাপ বাড়ে">
                <GasBox n={24} speed={sp} width={250} />
              </Stage>
            ),
          },
          {
            title: "STP তে এক মোল",
            text: "273 K আর 1 atm (101325 Pa) তে 1 mol যেকোনো আদর্শ গ্যাসের আয়তন কত?",
            tex: ["V=\\dfrac{nRT}{P}=\\dfrac{1\\times8.314\\times273}{101325}"],
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["22.4 L", "24.9 L", "1 L"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="V = 0.0224 m³ = 22.4 L। এই মানটা সব আদর্শ গ্যাসের জন্য একই।"
              />
            ),
          },
          {
            title: "একক মেলাও",
            text: "PV = nRT তে R = 8.314 নিলে V বসাতে হবে ঘনমিটারে। 2 L কত ঘনমিটার?",
            locked: g.picks[4] === undefined,
            prompt: (
              <Choices
                options={["0.002 m³", "0.2 m³", "2000 m³"]}
                answer={0}
                picked={g.picks[4]}
                onPick={g.pick(4)}
                explain="1 L = 0.001 m³, তাই 2 L = 0.002 m³। P Pa আর T K রাখলেই সূত্র ঠিক চলে।"
              />
            ),
          },
        ],
        summary: [
          {
            title: "আদর্শ গ্যাস সমীকরণ",
            text: "চারটি চলরাশি এক সূত্রে। P পাস্কাল, V ঘনমিটার, T কেলভিন।",
            tex: ["PV=nRT", "R=8.314\\ \\text{J mol}^{-1}\\text{K}^{-1}"],
          },
          {
            title: "আগের আর পরের অবস্থা",
            text: "n ধ্রুব থাকলে দুই অবস্থা সরাসরি মেলানো যায়।",
            tex: ["\\dfrac{P_1V_1}{T_1}=\\dfrac{P_2V_2}{T_2}"],
          },
        ],
      })}
    />
  );
}
