"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "মহাকর্ষ ও অভিকর্ষ অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "F=G\\dfrac{m_1m_2}{r^2}", meaning: "মহাকর্ষ বল" },
    { tex: "v_e=\\sqrt{2gR}", meaning: "মুক্তিবেগ" },
    { tex: "T^2\\propto a^3", meaning: "কেপলারের তৃতীয় সূত্র" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "মহাকর্ষ বল দূরত্ব দ্বিগুণ হলে?", options: ["এক-চতুর্থাংশ", "অর্ধেক", "দ্বিগুণ", "একই"], answer: 0, why: "F ∝ 1/r²।" },
    { q: "G এর মান?", options: ["6.67 × 10^-11 N m² kg^-2", "9.8 m/s²", "6.67 × 10^11", "3 × 10^8"], answer: 0, why: "সার্বজনীন ধ্রুবক।" },
    { q: "ভূপৃষ্ঠে g = ?", options: ["GM/R²", "GM/R", "GMR²", "G/R²"], answer: 0, why: "বল ÷ ভর।" },
    { q: "পৃথিবীর কেন্দ্রে g?", options: ["শূন্য", "সর্বোচ্চ", "9.8", "অসীম"], answer: 0, why: "চারদিকের টান কাটাকাটি।" },
    { q: "ভূপৃষ্ঠে মহাকর্ষীয় বিভব?", options: ["−6.25 × 10^7 J/kg", "6.25 × 10^7 J/kg", "−9.8 J/kg", "শূন্য"], answer: 0, why: "−GM/R।" },
    { q: "পৃথিবীর মুক্তিবেগ?", options: ["11.2 km/s", "7.9 km/s", "9.8 km/s", "3 km/s"], answer: 0, why: "√(2gR)।" },
    { q: "ve ও vo এর সম্পর্ক?", options: ["ve = √2 vo", "ve = 2vo", "ve = vo", "ve = vo/2"], answer: 0, why: "2gR বনাম gR।" },
    { q: "ভূস্থির উপগ্রহের পর্যায়কাল?", options: ["24 h", "12 h", "1.5 h", "6 h"], answer: 0, why: "পৃথিবীর সাথে তাল মেলাতে।" },
    { q: "কেপলারের তৃতীয় সূত্র?", options: ["T² ∝ a³", "T ∝ a", "T² ∝ a²", "T ∝ a²"], answer: 0, why: "পর্যায়কালের বর্গ ∝ অক্ষের ঘন।" },
    { q: "মুক্তভাবে পড়ন্ত লিফটে আপাত ওজন?", options: ["শূন্য", "mg", "2mg", "অসীম"], answer: 0, why: "a = g।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "একটি উপগ্রহ ভূপৃষ্ঠ থেকে 600 km উচ্চতায় বৃত্তাকার কক্ষে ঘুরছে। GM = 4.01 × 10^14 m³/s², পৃথিবীর ব্যাসার্ধ 6.4 × 10^6 m। (ক) মুক্তিবেগ কী? (খ) কক্ষের ব্যাসার্ধ কত? (গ) কক্ষীয় বেগ কত? (ঘ) পর্যায়কাল কত মিনিট?",
      hint: "r = R + h, v = √(GM/r)।",
      steps: [
        { text: "(ক) পৃথিবীর আকর্ষণ কাটিয়ে অসীমে যাওয়ার ন্যূনতম বেগ।" },
        { text: "(খ) কক্ষের ব্যাসার্ধ 7.0 × 10^6 m।", tex: "r=6.4\\times10^6+6\\times10^5=7.0\\times10^6" },
        { text: "(গ) কক্ষীয় বেগ 7.57 km/s।", tex: "v=\\sqrt{\\dfrac{4.01\\times10^{14}}{7\\times10^6}}=7.57\\times10^3" },
        { text: "(ঘ) পর্যায়কাল 96.9 মিনিট।", tex: "T=\\dfrac{2\\pi r}{v}=\\dfrac{2\\pi\\times7\\times10^6}{7569}=5811\\ \\text{s}" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "70 kg ভরের একজন ব্যক্তি লিফটে ওজন মাপার যন্ত্রের ওপর দাঁড়িয়ে আছেন। লিফট 1.5 m/s² ত্বরণে প্রথমে ওপরে ওঠে, পরে নিচে নামে। (ক) আপাত ওজন কী? (খ) ওপরে ওঠার সময় রিডিং কত? (গ) নামার সময় রিডিং কত? (ঘ) দড়ি ছিঁড়ে গেলে রিডিং কত?",
      hint: "R = m(g ± a), g = 9.8।",
      steps: [
        { text: "(ক) ওজন মাপার যন্ত্রের তলের ওপর ব্যক্তির দেওয়া বল, যা যন্ত্রে মাপা হয়।" },
        { text: "(খ) রিডিং 791 N।", tex: "R=70\\times(9.8+1.5)=791" },
        { text: "(গ) রিডিং 581 N।", tex: "R=70\\times(9.8-1.5)=581" },
        { text: "(ঘ) মুক্তপতনে a = g, তাই রিডিং 0 N।" },
      ],
    },
  ],
};

const cards = [
  { q: "মহাকর্ষ বল ও G কী?", tex: "F=G\\dfrac{m_1m_2}{r^2},\\quad G=6.67\\times10^{-11}" },
  { q: "g ও তার পরিবর্তন কী?", tex: "g=\\dfrac{GM}{R^2},\\ g_h=g\\left(\\dfrac{R}{R+h}\\right)^2,\\ g_d=g\\left(1-\\dfrac dR\\right)" },
  { q: "বিভব ও বিভব শক্তি কী?", tex: "V=-\\dfrac{GM}{r},\\quad U=-\\dfrac{GMm}{r}" },
  { q: "মুক্তিবেগ ও কক্ষীয় বেগ কী?", tex: "v_e=\\sqrt{2gR}=11.2,\\ v_o=\\sqrt{gR}=7.9\\ \\text{km/s}" },
  { q: "উপগ্রহের বেগ ও পর্যায়কাল কী?", tex: "v=\\sqrt{\\dfrac{GM}{r}},\\quad T=2\\pi\\sqrt{\\dfrac{r^3}{GM}}" },
  { q: "উপগ্রহের মোট শক্তি কী?", tex: "E=-\\dfrac{GMm}{2r}=-K" },
  { q: "কেপলারের সূত্র কী?", tex: "v_1r_1=v_2r_2,\\quad T^2\\propto a^3" },
  { q: "লিফটে আপাত ওজন কী?", tex: "R=m(g\\pm a),\\quad a=g\\Rightarrow R=0" },
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
