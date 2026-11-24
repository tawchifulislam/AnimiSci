"use client";

import { GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ভেক্টর অধ্যায়ের সূত্র, সৃজনশীল প্রশ্ন ও MCQ একসাথে ঝালিয়ে নাও।",
  hook: "আগে সূত্রগুলো একবার মনে করো, তারপর সৃজনশীল প্রশ্ন আর MCQ সমাধান করো।",
  formulas: [
    { tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}", meaning: "লব্ধির মান" },
    { tex: "\\vec A\\cdot\\vec B=AB\\cos\\theta", meaning: "ডট গুণন" },
    { tex: "|\\vec A\\times\\vec B|=AB\\sin\\theta", meaning: "ক্রস গুণনের মান" },
  ],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [
    { q: "নিচের কোনটি স্কেলার রাশি?", options: ["সরণ", "বেগ", "দ্রুতি", "বল"], answer: 2, why: "দ্রুতির শুধু মান আছে, দিক নেই। সরণ, বেগ আর বল ভেক্টর।" },
    { q: "দুটি ভেক্টর একই দিকে (α = 0°) থাকলে লব্ধি কত?", options: ["P − Q", "P + Q", "√(P² + Q²)", "শূন্য"], answer: 1, why: "cos 0° = 1, তাই R = P + Q।" },
    { q: "3 N ও 4 N বল পরস্পর লম্ব। লব্ধি কত?", options: ["7 N", "5 N", "1 N", "12 N"], answer: 1, why: "√(3² + 4²) = 5 N। 7 N হলো সরাসরি যোগ করার ভুল।" },
    { q: "A⃗ = 3î + 4ĵ-এর দিকে একক ভেক্টর কোনটি?", options: ["(3î + 4ĵ)/5", "(3î + 4ĵ)/7", "3î + 4ĵ", "(3î + 4ĵ)/25"], answer: 0, why: "মান 5, তাই 5 দিয়ে ভাগ করলে একক ভেক্টর পাই।" },
    { q: "20 N বল x-অক্ষের সাথে 60° কোণে। এর x-উপাংশ কত?", options: ["10 N", "17.3 N", "20 N", "34.6 N"], answer: 0, why: "20 cos60° = 10 N। 17.3 N হলো y-উপাংশ।" },
    { q: "A⃗·B⃗ = 0 হলে (দুটোই অশূন্য) ভেক্টর দুটি কেমন?", options: ["সমান্তরাল", "পরস্পর লম্ব", "সমান", "বিপরীত"], answer: 1, why: "AB cosθ = 0 হলে cosθ = 0, তাই θ = 90°।" },
    { q: "θ কত হলে |A⃗ × B⃗| সবচেয়ে বড় হয়?", options: ["0°", "45°", "90°", "180°"], answer: 2, why: "sinθ-এর সর্বোচ্চ মান 1, যা θ = 90° এ পাওয়া যায়।" },
    { q: "∇·A⃗-এর ফল কোন ধরনের রাশি?", options: ["ভেক্টর", "স্কেলার", "শূন্য ভেক্টর", "একক ভেক্টর"], answer: 1, why: "তিন উপাংশের আংশিক অবকলনের যোগফল, একটা সংখ্যা। তাই স্কেলার।" },
    { q: "নৌকার বেগ 5 m/s, স্রোত 3 m/s। সোজা ওপারে যেতে নৌকার ওপারমুখী বেগ কত?", options: ["2 m/s", "4 m/s", "8 m/s", "5 m/s"], answer: 1, why: "√(5² − 3²) = 4 m/s।" },
    { q: "A⃗ − B⃗ আর B⃗ − A⃗-এর সম্পর্ক কী?", options: ["সমান", "মান সমান, দিক উল্টো", "মান ভিন্ন", "দুটোই শূন্য"], answer: 1, why: "B − A = −(A − B), তাই মান এক কিন্তু দিক উল্টো।" },
  ],
  problems: [
    {
      level: "সৃজনশীল 1",
      q: "একটি বস্তুর ওপর F⃗ = 6î + 8ĵ N বল কাজ করে বস্তুটিকে s⃗ = 4î + 3ĵ m সরণ ঘটায়। (ক) কাজ বলতে কী বোঝায়? (খ) কাজ কত? (গ) বল ও সরণের মাঝের কোণ কত? (ঘ) এই বল ও সরণের মান ঠিক রেখে সর্বোচ্চ কত কাজ হতে পারত?",
      hint: "কাজ হলো বল ও সরণের ডট গুণন।",
      steps: [
        { text: "(ক) কাজ হলো বল ও সরণের ডট গুণন। ফল একটা স্কেলার।", tex: "W=\\vec F\\cdot\\vec s" },
        { text: "(খ) একই দিকের উপাংশ গুণ করে যোগ করি। কাজ = 48 J।", tex: "W=6\\times4+8\\times3=48" },
        { text: "(গ) বলের মান 10 N, সরণের মান 5 m। তাই cosθ = 0.96।", tex: "\\cos\\theta=\\dfrac{48}{10\\times5}=0.96" },
        { text: "কোণ বের করি। θ = 16.3°।", tex: "\\theta=\\cos^{-1}0.96=16.3^\\circ" },
        { text: "(ঘ) সর্বোচ্চ কাজ হয় θ = 0° এ: 10 × 5 = 50 J। এখানে 48 J, তাই প্রায় সর্বোচ্চের কাছাকাছি।" },
      ],
    },
    {
      level: "সৃজনশীল 2",
      q: "একটি নদীর প্রস্থ 120 m, স্রোতের বেগ 3 m/s। নৌকার বেগ 5 m/s। (ক) সবচেয়ে কম সময়ে পার হতে কত সময় লাগবে? (খ) তখন কতটা ভেসে যাবে? (গ) সোজা ওপারে যেতে কত সময় লাগবে? (ঘ) সোজা পার হতে সময় বেশি লাগে কেন?",
      hint: "সবচেয়ে কম সময়ে নৌকার মুখ তীরের লম্বে থাকে।",
      steps: [
        { text: "(ক) মুখ তীরের লম্বে রাখলে সময় সবচেয়ে কম। সময় 24 s।", tex: "t_{\\min}=\\dfrac{120}{5}=24" },
        { text: "(খ) ভাসা = স্রোতের বেগ × সময় = 3 × 24 = 72 m।", tex: "x=3\\times24=72" },
        { text: "(গ) ওপারের দিকে বেগ 4 m/s, তাই সময় 30 s।", tex: "t=\\dfrac{120}{\\sqrt{5^2-3^2}}=\\dfrac{120}{4}=30" },
        { text: "(ঘ) সোজা যেতে নৌকার বেগের একটা অংশ স্রোত কাটাতে খরচ হয়। ওপারের দিকের বেগ 5 থেকে কমে 4 হয়, তাই সময় বাড়ে।" },
      ],
    },
  ],
};

const cards = [
  { q: "দুই ভেক্টরের লব্ধির মান কত?", tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}" },
  { q: "লব্ধি P-এর সাথে কত কোণে থাকে?", tex: "\\tan\\theta=\\dfrac{Q\\sin\\alpha}{P+Q\\cos\\alpha}" },
  { q: "A − B-এর মান কত?", tex: "|\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}" },
  { q: "A-এর দিকে একক ভেক্টর কীভাবে পাই?", tex: "\\hat A=\\dfrac{\\vec A}{|\\vec A|}" },
  { q: "F বলের লম্ব উপাংশ দুটি কী?", tex: "F_x=F\\cos\\theta,\\quad F_y=F\\sin\\theta" },
  { q: "দুই দিকে ভাগের সাইন সূত্র কী?", tex: "\\dfrac{P}{\\sin\\beta}=\\dfrac{Q}{\\sin\\alpha}=\\dfrac{R}{\\sin(\\alpha+\\beta)}" },
  { q: "ডট গুণনের দুই রূপ কী?", tex: "\\vec A\\cdot\\vec B=AB\\cos\\theta=A_xB_x+A_yB_y+A_zB_z" },
  { q: "ক্রস গুণনের মান আর ক্রম উল্টালে কী হয়?", tex: "|\\vec A\\times\\vec B|=AB\\sin\\theta,\\quad \\vec A\\times\\vec B=-\\vec B\\times\\vec A" },
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
