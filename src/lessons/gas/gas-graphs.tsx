"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "গ্যাসের সূত্রগুলোর গ্রাফ চিনতে ও আঁকতে পারবে, আর গ্রাফ দেখে ঢাল, বিন্দু ও রেখার অবস্থান থেকে তথ্য বের করতে পারবে।",
  hook: "পরীক্ষায় গ্রাফ আঁকতে বলা হয়, আবার গ্রাফ দিয়ে প্রশ্নও আসে। সূত্র মুখস্থ থাকলেও গ্রাফ চিনতে না পারলে নম্বর কাটা যায়।",
  formulas: [
    { tex: "PV=\\text{ধ্রুব}\\ \\Rightarrow\\ P\\text{-}V:\\ \\text{পরাবৃত্ত},\\quad P\\text{-}\\dfrac1V:\\ \\text{সরলরেখা}", meaning: "সমোষ্ণ রেখা। P বনাম 1/V গ্রাফের ঢাল হলো PV।" },
    { tex: "V\\propto T,\\quad P\\propto T", meaning: "কেলভিনে আঁকলে রেখা মূলবিন্দু দিয়ে যায়।" },
  ],
  example: {
    problem: "P-V গ্রাফে (2 L, 6 atm) বিন্দুটি আছে। ধ্রুব তাপমাত্রায় V = 4 L এ চাপ কত?",
    steps: [
      { text: "PV ধ্রুব, তাই ধ্রুবক 12 atm·L।", tex: "PV=2\\times6=12" },
      { text: "উত্তর: P = 12 ÷ 4 = 3 atm।" },
    ],
  },
  mistakes: [
    "P-V গ্রাফকে সরলরেখা আঁকা। এটা বাঁকা রেখা (পরাবৃত্ত)।",
    "V-T গ্রাফ সেলসিয়াসে আঁকলে রেখা মূলবিন্দু দিয়ে ধরা। কেলভিনে আঁকলেই যায়।",
    "দুই সমোষ্ণ রেখার কোনটা বেশি তাপমাত্রার তা উল্টে বলা। ওপরের রেখা বেশি তাপমাত্রার।",
  ],
  recap: [
    "P-V: বাঁকা রেখা। P বনাম 1/V: সরলরেখা, ঢাল = PV।",
    "V-T আর P-T (কেলভিনে): মূলবিন্দুগামী সরলরেখা।",
    "ওপরের সমোষ্ণ রেখা বেশি তাপমাত্রার।",
    "PV বনাম P: আদর্শ গ্যাসে অনুভূমিক রেখা।",
  ],
  think: {
    scenario: "একজন ছাত্র পরীক্ষণে V-T গ্রাফ সেলসিয়াসে এঁকেছে। রেখা সোজা, কিন্তু অনুভূমিক অক্ষকে −273°C এ কেটেছে।",
    points: [
      "রেখা অনুভূমিক অক্ষ কাটার এই বিন্দুর অর্থ কী?",
      "অক্ষ কেলভিনে নিলে রেখাটা কোথা দিয়ে যেত?",
    ],
    hint: "আয়তন শূন্য মানে কোন তাপমাত্রা?",
    traps: ["V-T গ্রাফ সেলসিয়াসে আঁকলে মূলবিন্দু দিয়ে যায়।", "আয়তন শূন্য হয়ে গেলে গ্যাস আর থাকে না।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "একটি P-V গ্রাফে ধ্রুব তাপমাত্রায় (3 L, 4 atm) বিন্দু আছে। V = 6 L এ চাপ কত?",
      hint: "আগে PV এর মান বের করো।",
      steps: [
        { text: "PV এর ধ্রুবক।", tex: "PV=3\\times4=12" },
        { text: "উত্তর: P = 12 ÷ 6 = 2 atm।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "P বনাম 1/V গ্রাফের রেখা (0.25 L⁻¹, 3 atm) বিন্দু দিয়ে যায়। V = 2 L এ P কত?",
      hint: "রেখার ঢাল PV কে বোঝায়।",
      steps: [
        { text: "ঢাল বের করি।", tex: "\\text{ঢাল}=\\dfrac{3}{0.25}=12" },
        { text: "ঢাল মানে PV = 12 atm·L।" },
        { text: "V = 2 L এ 1/V = 0.5, তাই P = 12 × 0.5। উত্তর: 6 atm।" },
      ],
    },
    {
      level: "কঠিন",
      q: "V-T (কেলভিন) গ্রাফের রেখা (300 K, 6 L) বিন্দু দিয়ে যায়। T = 200 K এ V কত? আর কত K এ V শূন্য?",
      hint: "রেখা মূলবিন্দু দিয়ে যায়, তাই V ÷ T ধ্রুব।",
      steps: [
        { text: "ধ্রুবক।", tex: "\\dfrac VT=\\dfrac{6}{300}=0.02" },
        { text: "200 K এ।", tex: "V=0.02\\times200=4\\ \\text{L}" },
        { text: "উত্তর: V = 4 L। আর V শূন্য হয় 0 K এ।" },
      ],
    },
  ],
  concepts: [
    "দুই ভিন্ন আয়তনের জন্য P-T রেখা আঁকলে কোনটা বেশি খাড়া হবে আর কেন?",
    "বাস্তব গ্যাসের P-V রেখা ঠান্ডা করতে করতে একসময় সমান্তরাল হয়ে যায়। তখন কী ঘটে?",
  ],
  quiz: [
    { q: "ধ্রুব তাপমাত্রায় P-V গ্রাফ কেমন?", options: ["পরাবৃত্ত (বাঁকা)", "সরলরেখা", "বৃত্ত", "অনুভূমিক রেখা"], answer: 0, why: "PV ধ্রুব মানে P = k ÷ V, যার গ্রাফ বাঁকা।" },
    { q: "P বনাম 1/V গ্রাফ কেমন?", options: ["মূলবিন্দুগামী সরলরেখা", "বাঁকা রেখা", "অনুভূমিক রেখা", "উল্লম্ব রেখা"], answer: 0, why: "P = k × (1/V)। এটা সরলরেখা, ঢাল k = PV।" },
    { q: "V-T (কেলভিন) রেখা পেছনে বাড়ালে আয়তন কোথায় শূন্য হয়?", options: ["0 K", "273 K", "−100 K", "100 K"], answer: 0, why: "মূলবিন্দু দিয়ে যায়, তাই 0 K এ V = 0।" },
    { q: "একই গ্যাসের দুটি সমোষ্ণ রেখার ওপরেরটি কোন তাপমাত্রার?", options: ["বেশি তাপমাত্রার", "কম তাপমাত্রার", "সমান"], answer: 0, why: "PV = nRT। T বেশি হলে একই V এ P বেশি, তাই রেখা ওপরে।" },
    { q: "আদর্শ গ্যাসের PV বনাম P গ্রাফ (ধ্রুব T) কেমন?", options: ["P অক্ষের সমান্তরাল রেখা", "মূলবিন্দুগামী সরলরেখা", "বাঁকা রেখা"], answer: 0, why: "PV ধ্রুব, তাই P যাই হোক PV একই থাকে।" },
  ],
};

const iso = (k: number): Array<[number, number]> => Array.from({ length: 36 }, (_, i) => [1.5 + i * 0.25, k / (1.5 + i * 0.25)] as [number, number]);

const R = 8.314;
const M = 0.028;
const dens = (v: number, T: number) => 4 * Math.PI * Math.pow(M / (2 * Math.PI * R * T), 1.5) * v * v * Math.exp((-M * v * v) / (2 * R * T));
const FM = dens(Math.sqrt((2 * R * 300) / M), 300);
const dist = (T: number): Array<[number, number]> => Array.from({ length: 51 }, (_, i) => [i * 40, dens(i * 40, T) / FM] as [number, number]);

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "P-V: বাঁকা রেখা",
            text: (
              <>
                ধ্রুব তাপমাত্রায় <C k="r">P-V</C> রেখা বাঁকা। V = 2 L এ P = 6 atm। V = 4 L এ P কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["3 atm", "12 atm", "8 atm"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="PV = 12। P = 12 ÷ 4 = 3 atm। V দ্বিগুণ হলে P অর্ধেক।"
              />
            ),
            figure: () => (
              <Plot
                label="P-V গ্রাফ"
                xl="V (L)"
                yl="P (atm)"
                xmax={10}
                ymax={8}
                curves={[{ pts: iso(12), c: "p" }]}
                marks={[{ x: 2, y: 6, label: "(2, 6)" }, ...(g.picks[0] !== undefined ? [{ x: 4, y: 3, label: "(4, 3)" }] : [])]}
              />
            ),
          },
          {
            title: "P বনাম 1/V: সরলরেখা",
            text: "বাঁকা রেখা থেকে ঠিকঠাক মান পড়া কঠিন। তাই P-কে 1/V এর বিপরীতে আঁকি। তখন রেখা সোজা হয়। এই রেখার ঢাল কী বোঝায়?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["PV এর মান (ধ্রুবক)", "শুধু আয়তন", "শুধু চাপ"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="P = (PV) × (1/V)। তাই ঢাল হলো PV = nRT। তাপমাত্রা বেশি হলে রেখা বেশি খাড়া।"
              />
            ),
            figure: () => (
              <Plot
                label="P বনাম 1/V গ্রাফ"
                xl="1/V (L⁻¹)"
                yl="P (atm)"
                xmax={0.7}
                ymax={8}
                curves={[{ pts: [[0, 0], [0.67, 8]], c: "r" }]}
                notes={[{ x: 0.35, y: 2.5, text: "ঢাল = PV", c: "r", anchor: "start" }]}
              />
            ),
          },
          {
            title: "V-T: কেলভিনে সরলরেখা",
            text: "ধ্রুব চাপে V-T রেখা সোজা। কেলভিন অক্ষে আঁকলে সে মূলবিন্দু দিয়ে যায়। রেখাটা কোথায় আয়তন শূন্য দেখায়?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["0 K", "273 K", "0°C"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="মূলবিন্দু মানে T = 0 K আর V = 0। সেলসিয়াসে আঁকলে একই রেখা −273°C এ অক্ষ কাটে।"
              />
            ),
            figure: () => (
              <Plot
                label="V-T গ্রাফ"
                xl="T (K)"
                yl="V (L)"
                xmax={600}
                ymax={12}
                curves={[{ pts: [[0, 0], [600, 12]], c: "p" }]}
                marks={g.picks[2] !== undefined ? [{ x: 0, y: 0, label: "0 K", dx: 10, dy: -14 }] : []}
              />
            ),
          },
          {
            title: "P-T: কোন রেখা বড় আয়তনের?",
            text: "দুটি পাত্রে একই পরিমাণ গ্যাস। একটার আয়তন 2 L, অন্যটার 6 L। P-T রেখা দুটোই মূলবিন্দু দিয়ে যায়। কোনটা বড় আয়তনের?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["বেশি খাড়া রেখা", "কম খাড়া রেখা"]}
                answer={1}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="P = (nR ÷ V) × T। V বড় হলে ঢাল ছোট, তাই রেখা কম খাড়া।"
              />
            ),
            figure: () => (
              <Plot
                label="P-T গ্রাফ, দুই আয়তন"
                xl="T (K)"
                yl="P (atm)"
                xmax={600}
                ymax={9}
                curves={[
                  { pts: [[0, 0], [600, 8]], c: "r" },
                  { pts: [[0, 0], [600, 2.7]], c: "p" },
                ]}
                notes={g.picks[3] !== undefined ? [{ x: 430, y: 6.5, text: "V = 2 L", c: "r", anchor: "start" }, { x: 430, y: 3.4, text: "V = 6 L", c: "p", anchor: "start" }] : []}
              />
            ),
          },
          {
            title: "দুই সমোষ্ণ রেখা",
            text: "একই গ্যাসের দুটি তাপমাত্রার P-V রেখা আঁকা আছে। ওপরের রেখাটা কোন তাপমাত্রার?",
            locked: g.picks[4] === undefined,
            prompt: (
              <Choices
                options={["বেশি তাপমাত্রার", "কম তাপমাত্রার", "সমান"]}
                answer={0}
                picked={g.picks[4]}
                onPick={g.pick(4)}
                explain="একই V এ বেশি T মানে বেশি P। তাই বেশি তাপমাত্রার সমোষ্ণ রেখা ওপরে থাকে।"
              />
            ),
            figure: () => (
              <Plot
                label="দুটি সমোষ্ণ রেখা"
                xl="V (L)"
                yl="P (atm)"
                xmax={10}
                ymax={12}
                curves={[
                  { pts: iso(12), c: "p" },
                  { pts: iso(18), c: "r" },
                ]}
                notes={g.picks[4] !== undefined ? [{ x: 6.2, y: 3.4, text: "T1, কম", c: "p", anchor: "start" }, { x: 5.2, y: 5.6, text: "T2, বেশি", c: "r", anchor: "start" }] : []}
              />
            ),
          },
          {
            title: "PV বনাম P",
            text: "আদর্শ গ্যাসের জন্য ধ্রুব তাপমাত্রায় PV বনাম P গ্রাফ কেমন? লাল রেখা বাস্তব গ্যাস, ঠান্ডা অবস্থায়।",
            locked: g.picks[5] === undefined,
            prompt: (
              <Choices
                options={["P অক্ষের সমান্তরাল রেখা", "মূলবিন্দুগামী সরলরেখা", "বাঁকা রেখা"]}
                answer={0}
                picked={g.picks[5]}
                onPick={g.pick(5)}
                explain="আদর্শ গ্যাসে PV ধ্রুব, তাই P যাই হোক PV একই। বাস্তব গ্যাস এই রেখা থেকে সরে, আকর্ষণের জন্য আগে নামে, পরে ওঠে।"
              />
            ),
            figure: () => (
              <Plot
                label="PV বনাম P"
                xl="P"
                yl="PV"
                xmax={10}
                ymax={10}
                ymin={0}
                curves={[
                  { pts: [[0, 6], [10, 6]], c: "m", dash: true },
                  { pts: Array.from({ length: 21 }, (_, i) => [i * 0.5, 6 - 0.9 * i * 0.5 * (1 - (i * 0.5) / 7)] as [number, number]), c: "r" },
                ]}
                notes={g.picks[5] !== undefined ? [{ x: 7.4, y: 6.6, text: "আদর্শ", c: "m", anchor: "start" }, { x: 4, y: 2.2, text: "বাস্তব", c: "r", anchor: "start" }] : []}
              />
            ),
          },
          {
            title: "বেগ বণ্টন",
            text: "দুটি তাপমাত্রার বেগ বণ্টনের রেখা আঁকা আছে। কোনটি বেশি তাপমাত্রার?",
            locked: g.picks[6] === undefined,
            prompt: (
              <Choices
                options={["ডানে সরা চ্যাপ্টা রেখা", "বাঁয়ের উঁচু রেখা"]}
                answer={0}
                picked={g.picks[6]}
                onPick={g.pick(6)}
                explain="বেশি T তে অণুর বেগ বেশি, তাই শিখর ডানে সরে। মোট অণুর সংখ্যা একই, তাই শিখর নিচু আর রেখা চওড়া হয়।"
              />
            ),
            figure: () => (
              <Plot
                label="দুই তাপমাত্রার বেগ বণ্টন"
                xl="বেগ"
                yl="অণুর ভগ্নাংশ"
                xmax={2000}
                ymax={1.1}
                curves={[
                  { pts: dist(300), c: "p" },
                  { pts: dist(900), c: "r" },
                ]}
                notes={g.picks[6] !== undefined ? [{ x: 700, y: 1.0, text: "কম T", c: "p", anchor: "start" }, { x: 1300, y: 0.55, text: "বেশি T", c: "r", anchor: "start" }] : []}
              />
            ),
          },
        ],
        summary: [
          {
            title: "গ্রাফগুলো একসাথে",
            text: "সমোষ্ণ রেখা বাঁকা, P বনাম 1/V সোজা। কেলভিনে V-T আর P-T সোজা আর মূলবিন্দুগামী।",
            tex: ["P\\text{-}V:\\ \\text{বাঁকা}", "P\\text{-}\\dfrac1V,\\ V\\text{-}T,\\ P\\text{-}T:\\ \\text{সরলরেখা}"],
          },
          {
            title: "কোন রেখা কী বলে",
            text: "ওপরের সমোষ্ণ রেখা বেশি তাপমাত্রার। আদর্শ গ্যাসে PV বনাম P অনুভূমিক। বেশি তাপমাত্রায় বেগ বণ্টন ডানে সরে।",
            tex: []
          },
        ],
      })}
    />
  );
}
