"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ভৌত আলোকবিজ্ঞান অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "\\beta=\\dfrac{\\lambda D}{d}", meaning: "ইয়ংয়ের ঝালর প্রস্থ" },
    { tex: "d\\sin\\theta=n\\lambda", meaning: "গ্রেটিং" },
    { tex: "I=I_0\\cos^2\\theta", meaning: "ম্যালাসের সূত্র" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "মাধ্যম বদলালে আলোর কোন রাশি অপরিবর্তিত?", options: ["কম্পাঙ্ক", "বেগ", "তরঙ্গদৈর্ঘ্য", "তীব্রতা"], answer: 0, why: "কম্পাঙ্ক উৎস নির্ধারিত।" },
    { q: "গঠনমূলক ব্যতিচারে পথ পার্থক্য?", options: ["nλ", "(n + 1/2)λ", "λ/4", "λ/2"], answer: 0, why: "পূর্ণ গুণিতক।" },
    { q: "ইয়ংয়ের পরীক্ষায় d বাড়ালে β?", options: ["কমে", "বাড়ে", "একই", "শূন্য"], answer: 0, why: "β ∝ 1/d।" },
    { q: "পাতলা পর্দায় পথ পার্থক্য?", options: ["2nt", "nt", "t/n", "t"], answer: 0, why: "দুবার পর্দা পার।" },
    { q: "একক চিড়ে প্রথম অন্ধকার?", options: ["a sinθ = λ", "a sinθ = λ/2", "a = λ", "sinθ = aλ"], answer: 0, why: "n = 1।" },
    { q: "চিড় সরু করলে কেন্দ্রীয় উজ্জ্বল অংশ?", options: ["চওড়া হয়", "সরু হয়", "একই", "অদৃশ্য"], answer: 0, why: "W ∝ 1/a।" },
    { q: "5000 দাগ/cm গ্রেটিংয়ের d?", options: ["2 μm", "0.2 μm", "20 μm", "5 μm"], answer: 0, why: "10^-2 ÷ 5000।" },
    { q: "সমবর্তন কী প্রমাণ করে?", options: ["আলো অনুপ্রস্থ তরঙ্গ", "আলো কণা", "আলো দৈর্ঘ্য তরঙ্গ", "আলোর বেগ ধ্রুব"], answer: 0, why: "শুধু অনুপ্রস্থ তরঙ্গ সমবর্তিত হয়।" },
    { q: "তীব্রতা 100, θ = 30° এ ম্যালাস?", options: ["75", "50", "87", "25"], answer: 0, why: "100 cos²30°।" },
    { q: "কাচের (n = 1.5) ব্রুস্টার কোণ?", options: ["56.3°", "33.7°", "45°", "41.8°"], answer: 0, why: "tan⁻¹ 1.5।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "ইয়ংয়ের পরীক্ষায় 500 nm আলো ব্যবহার করা হলো। চিড়দ্বয়ের দূরত্ব 0.5 mm, পর্দা 1.5 m দূরে। (ক) সুসংগত উৎস কী? (খ) ঝালর প্রস্থ কত? (গ) কেন্দ্র থেকে 4র্থ উজ্জ্বল ঝালর ও প্রথম অন্ধকার ঝালর কত দূরে? (ঘ) কেন্দ্র থেকে 3 mm দূরের বিন্দুতে পথ পার্থক্য কত এবং বিন্দুটি উজ্জ্বল না অন্ধকার?",
      hint: "β = λD/d, Δ = yd/D।",
      steps: [
        { text: "(ক) সমান কম্পাঙ্ক ও স্থির দশা-পার্থক্যের উৎস।" },
        { text: "(খ) ঝালর প্রস্থ 1.5 mm।", tex: "\\beta=\\dfrac{5\\times10^{-7}\\times1.5}{5\\times10^{-4}}=1.5\\times10^{-3}" },
        { text: "(গ) 4র্থ উজ্জ্বল 6 mm, প্রথম অন্ধকার 0.75 mm।", tex: "4\\beta=6,\\quad \\dfrac\\beta2=0.75" },
        { text: "(ঘ) পথ পার্থক্য 1 μm, যা 2λ, তাই উজ্জ্বল।", tex: "\\Delta=\\dfrac{3\\times10^{-3}\\times5\\times10^{-4}}{1.5}=10^{-6}" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "একটি গ্রেটিংয়ে প্রতি cm এ 4000 দাগ। এর ওপর 650 nm আলো লম্বভাবে পড়ল। (ক) ব্যবর্তন কী? (খ) গ্রেটিং ধ্রুবক কত? (গ) প্রথম ও দ্বিতীয় ক্রমের কোণ কত? (ঘ) সর্বোচ্চ কত ক্রম পাওয়া যাবে?",
      hint: "d sinθ = nλ।",
      steps: [
        { text: "(ক) বাধার কিনারায় আলোর বেঁকে ছায়ার অংশে ঢোকাকে ব্যবর্তন বলে।" },
        { text: "(খ) গ্রেটিং ধ্রুবক 2.5 μm।", tex: "d=\\dfrac{10^{-2}}{4000}=2.5\\times10^{-6}" },
        { text: "(গ) প্রথম ক্রমে 15.1°, দ্বিতীয় ক্রমে 31.3°।", tex: "\\sin\\theta_1=\\dfrac{0.65}{2.5}=0.26,\\quad \\sin\\theta_2=0.52" },
        { text: "(ঘ) d/λ = 3.85, তাই সর্বোচ্চ ক্রম 3।" },
      ],
    },
  ],
};

const cards = [
  { q: "n, v ও λ মাধ্যম বদলালে কীভাবে বদলায়?", tex: "n=\\dfrac cv=\\dfrac{\\lambda_0}{\\lambda},\\quad f\\text{ অপরিবর্তিত}" },
  { q: "ব্যতিচারের শর্ত কী?", tex: "\\Delta=n\\lambda\\ (\\text{উজ্জ্বল}),\\quad \\Delta=\\left(n+\\tfrac12\\right)\\lambda\\ (\\text{অন্ধকার})" },
  { q: "ইয়ংয়ের ঝালর প্রস্থ ও পথ পার্থক্য কী?", tex: "\\beta=\\dfrac{\\lambda D}{d},\\quad \\Delta=\\dfrac{yd}{D}" },
  { q: "পাতলা পর্দা ও প্রলেপের সূত্র কী?", tex: "2nt=\\left(m+\\tfrac12\\right)\\lambda,\\quad t_{\\min}=\\dfrac{\\lambda}{4n}" },
  { q: "একক চিড়ের ব্যবর্তন কী?", tex: "a\\sin\\theta=n\\lambda,\\quad W=\\dfrac{2\\lambda D}{a}" },
  { q: "গ্রেটিং সূত্র কী?", tex: "d=\\dfrac1N,\\quad d\\sin\\theta=n\\lambda,\\quad n_{\\max}<\\dfrac d\\lambda" },
  { q: "ম্যালাসের সূত্র কী?", tex: "I=I_0\\cos^2\\theta,\\quad \\text{অসমবর্তিত}\\to\\dfrac{I_0}2" },
  { q: "ব্রুস্টারের সূত্র কী?", tex: "\\tan\\theta_p=n" },
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
