"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "সেমিকন্ডাক্টর ও ইলেকট্রনিক্স অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "I_E=I_B+I_C,\\quad \\beta=\\dfrac{I_C}{I_B}", meaning: "ট্রানজিস্টর" },
    { tex: "V_{dc}=\\dfrac{2V_m}{\\pi}", meaning: "পূর্ণতরঙ্গ একমুখীকরণ" },
    { tex: "A_v=-\\dfrac{R_f}{R_{in}}", meaning: "ইনভার্টিং বিবর্ধক" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "অর্ধপরিবাহীর রোধ তাপমাত্রা বাড়লে?", options: ["কমে", "বাড়ে", "একই", "অসীম"], answer: 0, why: "বাহক সংখ্যা বাড়ে।" },
    { q: "n-টাইপ তৈরিতে কোন ধরনের অপদ্রব্য?", options: ["পঞ্চযোজী", "ত্রিযোজী", "চতুর্যোজী", "দ্বিযোজী"], answer: 0, why: "বাড়তি ইলেকট্রন দেয়।" },
    { q: "Si ডায়োডের বাধা বিভব?", options: ["0.7 V", "0.3 V", "1.1 V", "5 V"], answer: 0, why: "মানক মান।" },
    { q: "সম্মুখ ঝোঁকে অবক্ষয় স্তর?", options: ["সরু হয়", "চওড়া হয়", "একই", "বিলুপ্ত"], answer: 0, why: "প্রবাহ বাড়ে।" },
    { q: "Vm = 10 V এ পূর্ণতরঙ্গ Vdc?", options: ["6.37 V", "3.18 V", "10 V", "7.07 V"], answer: 0, why: "2 × 10 ÷ π।" },
    { q: "ট্রানজিস্টরে I_E?", options: ["I_B + I_C", "I_B − I_C", "I_C − I_B", "I_B I_C"], answer: 0, why: "প্রবাহ সংরক্ষণ।" },
    { q: "α = 0.98 হলে β?", options: ["49", "98", "0.02", "50"], answer: 0, why: "α/(1 − α)।" },
    { q: "NAND গেটে A = 1, B = 1 হলে আউটপুট?", options: ["0", "1", "2", "অনির্ণেয়"], answer: 0, why: "AND এর বিপরীত।" },
    { q: "ইনভার্টিং গেইন?", options: ["−Rf/Rin", "1 + Rf/Rin", "Rf/Rin", "Rin/Rf"], answer: 0, why: "উল্টো চিহ্ন।" },
    { q: "আদর্শ অপ-অ্যাম্পের ইনপুট রোধ?", options: ["অসীম", "শূন্য", "1 kΩ", "ঋণাত্মক"], answer: 0, why: "ইনপুট প্রবাহ শূন্য।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "একটি সাধারণ এমিটার ট্রানজিস্টর বর্তনীতে V_CC = 10 V, R_C = 1 kΩ, β = 80 এবং বেস প্রবাহ 50 μA। (ক) α কী? (খ) কালেক্টর ও এমিটার প্রবাহ কত? (গ) V_CE কত? (ঘ) α এর মান কত?",
      hint: "I_C = β I_B, α = β/(1 + β)।",
      steps: [
        { text: "(ক) α = I_C/I_E, এমিটার প্রবাহের যে অংশ কালেক্টরে পৌঁছায় তার অনুপাত।" },
        { text: "(খ) কালেক্টর প্রবাহ 4 mA, এমিটার প্রবাহ 4.05 mA।", tex: "I_C=80\\times50\\ \\mu\\text{A}=4\\ \\text{mA},\\quad I_E=4+0.05=4.05" },
        { text: "(গ) V_CE = 6 V।", tex: "V_{CE}=10-4\\times1=6" },
        { text: "(ঘ) α = 0.988।", tex: "\\alpha=\\dfrac{80}{81}=0.988" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "একটি ট্রান্সফর্মারের গৌণ কুণ্ডলীর rms ভোল্টেজ 20 V, মেইন কম্পাঙ্ক 50 Hz। (ক) একমুখীকরণ কী? (খ) শীর্ষ মান কত? (গ) অর্ধতরঙ্গে গড় DC কত? (ঘ) পূর্ণতরঙ্গে গড় DC ও রিপলের কম্পাঙ্ক কত?",
      hint: "Vm = √2 Vrms।",
      steps: [
        { text: "(ক) AC কে DC তে রূপান্তরের প্রক্রিয়া।" },
        { text: "(খ) শীর্ষ মান 28.28 V।", tex: "V_m=20\\times1.414=28.28" },
        { text: "(গ) গড় DC 9.00 V।", tex: "V_{dc}=\\dfrac{28.28}{\\pi}=9.00" },
        { text: "(ঘ) গড় DC 18.01 V, রিপল কম্পাঙ্ক 100 Hz।", tex: "V_{dc}=\\dfrac{2\\times28.28}{\\pi}=18.01" },
      ],
    },
  ],
};

const cards = [
  { q: "ব্যান্ড-গ্যাপ ও λmax কী?", tex: "E_g=E_c-E_v,\\quad \\lambda_{\\max}=\\dfrac{1240}{E_g}\\ \\text{nm}" },
  { q: "ভর-ক্রিয়া সূত্র কী?", tex: "np=n_i^2" },
  { q: "ডায়োড বর্তনীর প্রবাহ কী?", tex: "I=\\dfrac{V_s-V_B}{R},\\quad V_B=0.7\\ \\text{V (Si)}" },
  { q: "অর্ধ ও পূর্ণতরঙ্গের Vdc কী?", tex: "\\dfrac{V_m}{\\pi},\\quad \\dfrac{2V_m}{\\pi},\\quad V_m=\\sqrt2V_{rms}" },
  { q: "ট্রানজিস্টরের প্রবাহ সম্পর্ক কী?", tex: "I_E=I_B+I_C,\\quad \\beta=\\dfrac{\\alpha}{1-\\alpha}" },
  { q: "সাধারণ এমিটারের V_CE কী?", tex: "V_{CE}=V_{CC}-I_CR_C" },
  { q: "লজিক গেট ও সার্বজনীন গেট কী?", tex: "Y=A\\cdot B,\\ A+B,\\ \\bar A;\\quad \\text{NAND, NOR সার্বজনীন}" },
  { q: "অপ-অ্যাম্পের গেইন কী?", tex: "-\\dfrac{R_f}{R_{in}},\\quad 1+\\dfrac{R_f}{R_1},\\quad |V_{out}|\\le V_{sat}" },
];

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      limit={10}
      build={(g): Built => ({
        concept: cards.map((c, n) => ({
          tag: "সূত্র",
          title: `কার্ড ${n + 1}/${cards.length}`,
          text: c.q,
          prompt:
            g.picks[n] === 1 ? (
              <div className="guide-tex">
                <Tex display>{c.tex}</Tex>
              </div>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => g.pick(n)(1)}>
                আগে মনে করো, তারপর উত্তর দেখো
              </button>
            ),
        })),
        summary: [],
      })}
    />
  );
}
