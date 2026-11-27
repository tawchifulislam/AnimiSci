"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "কাজের বৈজ্ঞানিক সংজ্ঞা, W = Fd cosθ, ধনাত্মক, ঋণাত্মক ও শূন্য কাজ বুঝবে এবং হিসাব করতে পারবে।",
  hook: "দেয়ালে সারাদিন ধাক্কা দিলে ক্লান্ত হও, কিন্তু পদার্থবিজ্ঞানে কাজ শূন্য। কাজের সংজ্ঞায় বল আর সরণ দুটোই লাগে।",
  formulas: [
    { tex: "W=\\vec F\\cdot\\vec d=Fd\\cos\\theta", meaning: "θ হলো বল আর সরণের মধ্যবর্তী কোণ। একক জুল (J)।" },
    { tex: "W=mgh", meaning: "ওজনের বিরুদ্ধে h উচ্চতায় তুলতে কাজ।" },
  ],
  example: {
    problem: "50 N বল ভূমির সাথে 60° কোণে একটি বাক্সকে 10 m টানল। বলের কাজ কত?",
    steps: [
      { text: "সূত্র।", tex: "W=50\\times10\\times\\cos60^\\circ=50\\times10\\times0.5" },
      { text: "উত্তর: 250 J।" },
    ],
  },
  mistakes: [
    "বল সরণের সাথে θ কোণে থাকলেও পুরো F গুণ করা। শুধু সরণ বরাবর উপাংশ কাজ করে।",
    "সরণ শূন্য হলেও কাজ আছে ভাবা। সরণ শূন্য মানে কাজ শূন্য।",
    "কাজকে ভেক্টর ভাবা। কাজ স্কেলার।",
  ],
  recap: [
    "W = Fd cosθ।",
    "θ = 0 হলে সর্বোচ্চ ধনাত্মক কাজ।",
    "θ = 90° হলে কাজ শূন্য।",
    "θ = 180° হলে কাজ ঋণাত্মক, যেমন ঘর্ষণ।",
  ],
  think: {
    scenario: "একজন কুলি মাথায় বোঝা নিয়ে সমতল পথে হাঁটছে। সে ক্লান্ত, কিন্তু পদার্থবিজ্ঞান বলছে বোঝার ওজনের বিরুদ্ধে কাজ শূন্য।",
    points: ["ওজন আর সরণের মধ্যবর্তী কোণ কত?", "ক্লান্তি কোথা থেকে আসে?"],
    hint: "ওজন নিচে, সরণ সামনে।",
    traps: ["কোণ 90°, cos90° = 0।", "শরীরের পেশি ভেতরে শক্তি খরচ করে, যা বোঝার ওপর কাজ নয়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "30 N বল সরণের দিকে প্রযুক্ত হয়ে একটি বস্তুকে 4 m সরাল। কাজ কত?",
      hint: "θ = 0।",
      steps: [{ text: "গণনা।", tex: "W=30\\times4=120" }, { text: "উত্তর: 120 J।" }],
    },
    {
      level: "মাঝারি",
      q: "100 N বল 30° কোণে 6 m সরণ ঘটাল। কাজ কত? (cos30° = 0.866)",
      hint: "W = Fd cosθ।",
      steps: [{ text: "গণনা।", tex: "W=100\\times6\\times0.866=519.6" }, { text: "উত্তর: প্রায় 520 J।" }],
    },
    {
      level: "কঠিন",
      q: "5 kg ভর 2 m ওপরে তুলতে কাজ কত? অভিকর্ষ বল কত কাজ করে? (g = 9.8)",
      hint: "অভিকর্ষ বল সরণের বিপরীতে।",
      steps: [
        { text: "আমাদের কাজ।", tex: "W=mgh=5\\times9.8\\times2=98" },
        { text: "অভিকর্ষ সরণের বিপরীতে, তাই এর কাজ ঋণাত্মক।" },
        { text: "উত্তর: আমরা 98 J করি, অভিকর্ষ −98 J করে।" },
      ],
    },
  ],
  concepts: ["কখন একটি বল কাজ করেও বস্তুর গতিশক্তি বদলায় না?", "চাঁদের কক্ষপথে অভিকর্ষ বল কত কাজ করে?"],
  quiz: [
    { q: "কাজের সূত্র কোনটি?", options: ["Fd cosθ", "Fd sinθ", "F/d", "Fd tanθ"], answer: 0, why: "বল আর সরণের স্কেলার গুণফল।" },
    { q: "বল সরণের সাথে 90° কোণে হলে কাজ?", options: ["শূন্য", "সর্বোচ্চ", "ঋণাত্মক", "অসীম"], answer: 0, why: "cos90° = 0।" },
    { q: "কাজ কী ধরনের রাশি?", options: ["স্কেলার", "ভেক্টর", "দুটোই", "কোনোটিই না"], answer: 0, why: "দুই ভেক্টরের স্কেলার গুণফল।" },
    { q: "ঘর্ষণ বলের কাজ?", options: ["ঋণাত্মক", "ধনাত্মক", "শূন্য"], answer: 0, why: "ঘর্ষণ সরণের বিপরীতে, θ = 180°।" },
    { q: "50 N বল 60° কোণে 10 m সরালে কাজ?", options: ["250 J", "500 J", "433 J", "50 J"], answer: 0, why: "50 × 10 × 0.5 = 250 J।" },
  ],
};

const wcurve: Array<[number, number]> = Array.from({ length: 19 }, (_, i) => [i * 5, 500 * Math.cos((i * 5 * Math.PI) / 180)] as [number, number]);

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "বল আর সরণ একদিকে",
            text: (
              <>
                বল সরণের দিকে হলে <C k="r">W = Fd</C>। 20 N বল দিয়ে বস্তুকে বলের দিকে 5 m সরালে কাজ কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["100 J", "25 J", "4 J"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="20 × 5 = 100 J। বল আর সরণ দুটোই লাগে।"
              />
            ),
          },
          {
            title: "কোণ বদলালে",
            text: "50 N বল ভূমির সাথে 60° কোণে বাক্সকে 10 m টানল। W = Fd cosθ। কাজ কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["250 J", "500 J", "433 J"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="50 × 10 × cos60° = 250 J। কোণ যত বাড়ে, কাজ তত কমে।"
              />
            ),
            figure: () => (
              <Plot
                label="কাজ বনাম কোণ (F = 50 N, d = 10 m)"
                xl="θ (ডিগ্রি)"
                yl="W (J)"
                xmax={90}
                ymax={520}
                curves={[{ pts: wcurve.slice(0, 19), c: "r" }]}
                marks={g.picks[1] !== undefined ? [{ x: 60, y: 250, label: "60°, 250 J", c: "p", dx: 6, dy: -10 }] : []}
              />
            ),
          },
          {
            title: "শূন্য কাজ",
            text: "একজন ব্যক্তি ব্যাগ হাতে নিয়ে সমতলে হেঁটে যাচ্ছে। ব্যাগের ওজন নিচে, সরণ সামনে। ওজনের কাজ কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["শূন্য", "ধনাত্মক", "ঋণাত্মক"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="কোণ 90°, cos90° = 0। তাই কাজ শূন্য।"
              />
            ),
          },
          {
            title: "ঋণাত্মক কাজ",
            text: "ঘর্ষণ বল সরণের বিপরীতে, θ = 180°। 10 N ঘর্ষণ বস্তুকে 3 m সরতে দিলে ঘর্ষণের কাজ কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["−30 J", "30 J", "0"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="10 × 3 × cos180° = −30 J। ঋণাত্মক মানে বস্তু শক্তি হারায়।"
              />
            ),
          },
        ],
        summary: [
          { title: "কাজের সূত্র", text: "বল আর সরণের কোণ θ। স্কেলার রাশি।", tex: ["W=Fd\\cos\\theta"] },
          { title: "কোণ ভেদে", text: "0° ধনাত্মক, 90° শূন্য, 180° ঋণাত্মক।", tex: ["\\theta=0^\\circ,\\ 90^\\circ,\\ 180^\\circ"] },
        ],
      })}
    />
  );
}
