"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "আধুনিক পদার্থবিজ্ঞানের সূচনা অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "\\gamma=\\dfrac1{\\sqrt{1-v^2/c^2}}", meaning: "লরেন্টজ গুণক" },
    { tex: "hf=W+K_{\\max}", meaning: "আলোক তড়িৎ সমীকরণ" },
    { tex: "\\lambda=\\dfrac hp", meaning: "দ্য ব্রগলি তরঙ্গদৈর্ঘ্য" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "আলোর বেগ সম্পর্কে আইনস্টাইনের স্বীকার্য?", options: ["সব জড় প্রসঙ্গে সমান", "উৎসের বেগ যোগ হয়", "পর্যবেক্ষকের বেগ বিয়োগ হয়", "মাধ্যম নির্ভর"], answer: 0, why: "দ্বিতীয় স্বীকার্য।" },
    { q: "0.6c এ γ?", options: ["1.25", "1.67", "0.8", "2.29"], answer: 0, why: "1/0.8।" },
    { q: "চলন্ত ঘড়ি স্থির দর্শকের কাছে?", options: ["ধীর", "দ্রুত", "সমান", "থামা"], answer: 0, why: "t = γ t0।" },
    { q: "0.6c এ 100 m যানের দৈর্ঘ্য?", options: ["80 m", "125 m", "60 m", "100 m"], answer: 0, why: "L0/γ।" },
    { q: "400 nm ফোটনের শক্তি?", options: ["3.1 eV", "1.55 eV", "6.2 eV", "0.31 eV"], answer: 0, why: "1240 ÷ 400।" },
    { q: "আলোক তড়িৎ ক্রিয়ায় তীব্রতা বাড়ালে?", options: ["ইলেকট্রন সংখ্যা বাড়ে", "K_max বাড়ে", "f0 বাড়ে", "W কমে"], answer: 0, why: "ফোটন সংখ্যা বাড়ে।" },
    { q: "K_max বনাম f গ্রাফের ঢাল?", options: ["h", "W", "e", "c"], answer: 0, why: "K = hf − W।" },
    { q: "কম্পটন বিক্ষেপণে তরঙ্গদৈর্ঘ্য?", options: ["বাড়ে", "কমে", "একই", "শূন্য"], answer: 0, why: "ফোটন শক্তি হারায়।" },
    { q: "100 V এ ত্বরিত ইলেকট্রনের λ?", options: ["0.123 nm", "1.23 nm", "0.0123 nm", "12.3 nm"], answer: 0, why: "1.227 ÷ 10।" },
    { q: "Δx কমালে Δp?", options: ["বাড়ে", "কমে", "একই", "শূন্য"], answer: 0, why: "Δx Δp ≥ h/4π।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "একটি ধাতুর কার্যাপেক্ষক 2.5 eV। এর ওপর 300 nm তরঙ্গদৈর্ঘ্যের আলো পড়ল। (ক) কার্যাপেক্ষক কী? (খ) আপতিত ফোটনের শক্তি কত? (গ) নির্গত ইলেকট্রনের সর্বোচ্চ গতিশক্তি ও নিরোধ বিভব কত? (ঘ) সূচন তরঙ্গদৈর্ঘ্য ও সূচন কম্পাঙ্ক কত?",
      hint: "E = 1240 ÷ λ, K = E − W।",
      steps: [
        { text: "(ক) ধাতুর পৃষ্ঠ থেকে ইলেকট্রন মুক্ত করতে প্রয়োজনীয় ন্যূনতম শক্তি।" },
        { text: "(খ) ফোটন শক্তি 4.13 eV।", tex: "E=\\dfrac{1240}{300}=4.13" },
        { text: "(গ) গতিশক্তি 1.63 eV, নিরোধ বিভব 1.63 V।", tex: "K=4.13-2.5=1.63" },
        { text: "(ঘ) সূচন তরঙ্গদৈর্ঘ্য 496 nm।", tex: "\\lambda_0=\\dfrac{1240}{2.5}=496" },
        { text: "সূচন কম্পাঙ্ক 6.03 × 10^14 Hz।", tex: "f_0=\\dfrac{2.5\\times1.6\\times10^{-19}}{6.63\\times10^{-34}}=6.03\\times10^{14}" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "পৃথিবী থেকে একটি তারা 4 আলোকবর্ষ দূরে। একটি মহাকাশযান 0.8c বেগে সেখানে যায়। (ক) স্বকাল কী? (খ) 0.8c এ γ কত? (গ) পৃথিবীর হিসাবে যাত্রায় কত সময় লাগবে? (ঘ) যানের যাত্রীর ঘড়িতে কত সময় লাগবে?",
      hint: "t = d/v, t0 = t/γ।",
      steps: [
        { text: "(ক) একই স্থানে অবস্থিত ঘড়ির মাপা দুই ঘটনার মধ্যবর্তী সময়।" },
        { text: "(খ) γ = 1.67।", tex: "\\gamma=\\dfrac1{\\sqrt{1-0.64}}=1.67" },
        { text: "(গ) পৃথিবীর হিসাবে 5 বছর।", tex: "t=\\dfrac{4}{0.8}=5" },
        { text: "(ঘ) যাত্রীর ঘড়িতে 3 বছর।", tex: "t_0=\\dfrac5{1.67}=3" },
      ],
    },
  ],
};

const cards = [
  { q: "লরেন্টজ গুণক ও কালদীর্ঘায়ন কী?", tex: "\\gamma=\\dfrac1{\\sqrt{1-v^2/c^2}},\\quad t=\\gamma t_0" },
  { q: "দৈর্ঘ্য সংকোচন ও গতিশীল ভর কী?", tex: "L=\\dfrac{L_0}\\gamma,\\quad m=\\gamma m_0" },
  { q: "বিশ্রামকালীন ও গতিশক্তি কী?", tex: "E_0=m_0c^2,\\quad K=(\\gamma-1)m_0c^2" },
  { q: "ফোটনের শক্তি ও ভরবেগ কী?", tex: "E=hf=\\dfrac{1240}{\\lambda\\ (\\text{nm})}\\ \\text{eV},\\quad p=\\dfrac h\\lambda" },
  { q: "আইনস্টাইনের আলোক তড়িৎ সমীকরণ কী?", tex: "hf=W+K_{\\max},\\quad eV_0=K_{\\max}" },
  { q: "K বনাম f গ্রাফে ঢাল ও ছেদ কী?", tex: "\\text{ঢাল}=h,\\quad f_0=\\dfrac Wh,\\quad K\\text{-ছেদ}=-W" },
  { q: "কম্পটন সরণ ও যুগল উৎপাদন কী?", tex: "\\Delta\\lambda=2.43(1-\\cos\\theta)\\ \\text{pm},\\quad E\\ge1.02\\ \\text{MeV}" },
  { q: "দ্য ব্রগলি তরঙ্গ ও অনিশ্চয়তা নীতি কী?", tex: "\\lambda=\\dfrac hp,\\quad \\Delta x\\Delta p\\ge\\dfrac h{4\\pi}" },
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
