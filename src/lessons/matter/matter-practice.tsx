"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "পদার্থের গাঠনিক ধর্ম অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "Y=\\dfrac{Fl}{A\\Delta l}", meaning: "ইয়ং গুণাঙ্ক" },
    { tex: "h=\\dfrac{2T\\cos\\theta}{\\rho g r}", meaning: "কৈশিক উচ্চতা" },
    { tex: "P+\\tfrac12\\rho v^2+\\rho gh=\\text{ধ্রুব}", meaning: "বার্নুলি" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "পীড়নের একক কী?", options: ["Pa", "N", "J", "এককহীন"], answer: 0, why: "F/A, N/m² বা Pa।" },
    { q: "হুকের সূত্র কখন খাটে?", options: ["সমানুপাতিক সীমার ভেতরে", "যেকোনো বলে", "ভাঙনের পর", "শূন্য বলে শুধু"], answer: 0, why: "সরলরেখা অংশে।" },
    { q: "ইয়ং গুণাঙ্কের ধর্ম কোনটি?", options: ["উপাদানের ধর্ম", "দৈর্ঘ্যের ওপর নির্ভর", "ক্ষেত্রফলের ওপর নির্ভর", "বলের ওপর নির্ভর"], answer: 0, why: "মাপ বদলালে Y বদলায় না।" },
    { q: "k = 500 N/m স্প্রিং 0.04 m টানলে সঞ্চিত শক্তি?", options: ["0.4 J", "20 J", "0.8 J", "0.04 J"], answer: 0, why: "½ × 500 × 0.04²।" },
    { q: "সাবান বুদবুদের অতিরিক্ত চাপ?", options: ["4T/r", "2T/r", "T/r", "8T/r"], answer: 0, why: "দুটি পৃষ্ঠ।" },
    { q: "কৈশিক নলে পারদ নামে কারণ?", options: ["θ > 90°", "θ < 90°", "θ = 0", "পৃষ্ঠটান শূন্য"], answer: 0, why: "ভেজায় না এমন তরল।" },
    { q: "ব্যাসার্ধ দ্বিগুণ হলে প্রান্তবেগ কত গুণ?", options: ["4", "2", "1/2", "8"], answer: 0, why: "v_t ∝ r²।" },
    { q: "পাইপের ব্যাস অর্ধেক হলে বেগ কত গুণ?", options: ["4", "2", "8", "1/4"], answer: 0, why: "ক্ষেত্রফল 1/4 হয়।" },
    { q: "বেগ বাড়লে প্রবাহীর চাপ?", options: ["কমে", "বাড়ে", "একই থাকে"], answer: 0, why: "বার্নুলি।" },
    { q: "5 m গভীরতার ছিদ্র থেকে পানির বেগ প্রায়?", options: ["9.9 m/s", "49 m/s", "5 m/s", "25 m/s"], answer: 0, why: "√(2 × 9.8 × 5)।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "2 m লম্বা, 1 mm² প্রস্থচ্ছেদের একটি ইস্পাতের তারে 100 N বল দেওয়া হলো। Y = 2 × 10^11 Pa। (ক) ইয়ং গুণাঙ্ক কী? (খ) তারের পীড়ন কত? (গ) দৈর্ঘ্য কত বাড়বে? (ঘ) সঞ্চিত শক্তি কত আর ক্রেনে মোটা তার কেন ভালো?",
      hint: "পীড়ন, বিকৃতি, তারপর Δl।",
      steps: [
        { text: "(ক) পীড়ন আর বিকৃতির অনুপাত, যা উপাদানের ধর্ম।" },
        { text: "(খ) পীড়ন 10^8 Pa।", tex: "\\dfrac{100}{10^{-6}}=10^8" },
        { text: "(গ) বিকৃতি 0.0005, দৈর্ঘ্য বৃদ্ধি 1 mm।", tex: "\\Delta l=0.0005\\times2=0.001\\ \\text{m}" },
        { text: "(ঘ) শক্তি 0.05 J।", tex: "U=\\dfrac12\\times100\\times0.001=0.05" },
        { text: "মোটা তারে একই বলে পীড়ন কম, তাই বিকৃতি কম আর ভাঙার ঝুঁকিও কম।" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "0.5 mm ব্যাসার্ধের একটি কাচের কৈশিক নল পানিতে আর পারদে ডোবানো হলো। পানির T = 0.072 N/m, θ = 0। পারদের T = 0.465 N/m, θ = 140°। (ক) স্পর্শ কোণ কী? (খ) পানি কতটা ওঠে? (গ) পারদ কতটা নামে? (ঘ) পারদ কেন নামে ব্যাখ্যা করো।",
      hint: "h = 2T cosθ/(ρgr), g = 9.8।",
      steps: [
        { text: "(ক) তরল আর কঠিনের স্পর্শ বিন্দুতে তরলের তল যে কোণ করে।" },
        { text: "(খ) পানি 2.9 cm ওঠে।", tex: "h=\\dfrac{2\\times0.072}{1000\\times9.8\\times5\\times10^{-4}}=0.0294" },
        { text: "(গ) পারদ প্রায় 1.1 cm নামে।", tex: "h=\\dfrac{2\\times0.465\\times(-0.766)}{13600\\times9.8\\times5\\times10^{-4}}=-0.0107" },
        { text: "(ঘ) পারদের সংসক্তি বল কাচের আসঞ্জনের চেয়ে বেশি, তাই θ > 90° আর মেনিস্কাস উত্তল। ফলে তরল নলে নিচে নামে।" },
      ],
    },
  ],
};

const cards = [
  { q: "পীড়ন, বিকৃতি ও ইয়ং গুণাঙ্ক কী?", tex: "\\dfrac FA,\\quad \\dfrac{\\Delta l}{l},\\quad Y=\\dfrac{Fl}{A\\Delta l}" },
  { q: "হুকের সূত্র আর সঞ্চিত শক্তি কী?", tex: "F=kx,\\quad U=\\dfrac12kx^2=\\dfrac12F\\Delta l" },
  { q: "আয়তন গুণাঙ্ক, কৃন্তন গুণাঙ্ক ও পয়সনের অনুপাত কী?", tex: "K=\\dfrac{\\Delta P}{\\Delta V/V},\\ \\eta=\\dfrac{F/A}{\\theta},\\ \\sigma=\\dfrac{\\text{পার্শ্ব}}{\\text{দৈর্ঘ্য}}" },
  { q: "পৃষ্ঠটান ও পৃষ্ঠশক্তি কী?", tex: "T=\\dfrac FL,\\quad W=T\\Delta A" },
  { q: "বুদবুদ ও ফোঁটার অতিরিক্ত চাপ কী?", tex: "\\Delta P=\\dfrac{4T}{r}\\ (\\text{বুদবুদ}),\\quad \\dfrac{2T}{r}\\ (\\text{ফোঁটা})" },
  { q: "কৈশিক উচ্চতা কী?", tex: "h=\\dfrac{2T\\cos\\theta}{\\rho g r}" },
  { q: "স্টোকসের সূত্র ও প্রান্তবেগ কী?", tex: "F=6\\pi\\eta rv,\\quad v_t=\\dfrac{2r^2(\\rho-\\sigma)g}{9\\eta}" },
  { q: "সন্ততা, বার্নুলি ও টরিসেলি কী?", tex: "A_1v_1=A_2v_2,\\ P+\\tfrac12\\rho v^2+\\rho gh=\\text{ধ্রুব},\\ v=\\sqrt{2gh}" },
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
