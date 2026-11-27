"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "গতিশক্তি ½mv² এবং কাজ-শক্তি উপপাদ্য W = ΔKE বুঝবে ও প্রয়োগ করে বেগ ও থামার দূরত্ব বের করতে পারবে।",
  hook: "গাড়ি দ্রুত চললে থামাতে বেশি দূরত্ব লাগে। বেগ দ্বিগুণ হলে দূরত্ব দ্বিগুণ নয়, চার গুণ। কেন?",
  formulas: [
    { tex: "K=\\dfrac12mv^2", meaning: "গতিশক্তি। একক জুল।" },
    { tex: "W_{\\text{নিট}}=\\Delta K=\\dfrac12mv^2-\\dfrac12mu^2", meaning: "কাজ-শক্তি উপপাদ্য।" },
  ],
  example: {
    problem: "2 kg ভরের বস্তু স্থির অবস্থা থেকে 10 N বলে 4 m সরল। শেষ বেগ কত?",
    steps: [
      { text: "কাজ।", tex: "W=10\\times4=40" },
      { text: "কাজ-শক্তি উপপাদ্য।", tex: "\\dfrac12\\times2\\times v^2=40\\Rightarrow v=\\sqrt{40}" },
      { text: "উত্তর: প্রায় 6.3 m/s।" },
    ],
  },
  mistakes: [
    "গতিশক্তি mv²/2 এর জায়গায় mv লেখা। mv ভরবেগ।",
    "বেগ দ্বিগুণ হলে গতিশক্তি দ্বিগুণ ভাবা। চার গুণ হয়।",
    "শুধু একটি বলের কাজ নেওয়া। নিট কাজ নিতে হয়।",
  ],
  recap: [
    "K = ½mv²।",
    "নিট কাজ = গতিশক্তির পরিবর্তন।",
    "K সবসময় ধনাত্মক বা শূন্য।",
    "বেগ দ্বিগুণ হলে K চার গুণ।",
  ],
  think: {
    scenario: "একই গাড়ি 40 km/h আর 80 km/h বেগে থামানো হলো, ব্রেক বল সমান।",
    points: ["80 km/h থেকে থামাতে দূরত্ব কত গুণ?", "রাস্তার গতিসীমা কেন গুরুত্বপূর্ণ?"],
    hint: "d ∝ v²।",
    traps: ["দূরত্ব চার গুণ।", "বেগ সামান্য বাড়লেও থামার দূরত্ব বেশি বাড়ে।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "4 kg ভরের বস্তু 5 m/s বেগে চলছে। গতিশক্তি কত?",
      hint: "½mv²।",
      steps: [{ text: "গণনা।", tex: "K=\\dfrac12\\times4\\times25=50" }, { text: "উত্তর: 50 J।" }],
    },
    {
      level: "মাঝারি",
      q: "2 kg বস্তুর বেগ 3 m/s থেকে 5 m/s হলো। নিট কাজ কত?",
      hint: "ΔK।",
      steps: [{ text: "গণনা।", tex: "W=\\dfrac12\\times2\\times(25-9)=16" }, { text: "উত্তর: 16 J।" }],
    },
    {
      level: "কঠিন",
      q: "1000 kg গাড়ির বেগ 10 m/s থেকে 30 m/s করতে ইঞ্জিনকে কত কাজ করতে হবে?",
      hint: "½m(v² − u²)।",
      steps: [{ text: "গণনা।", tex: "W=\\dfrac12\\times1000\\times(900-100)=400000" }, { text: "উত্তর: 400000 J।" }],
    },
  ],
  concepts: ["গতিশক্তি কেন বেগের বর্গের সাথে বাড়ে?", "ঋণাত্মক নিট কাজে বস্তুর কী হয়?"],
  quiz: [
    { q: "গতিশক্তির সূত্র?", options: ["½mv²", "mv", "mv²", "½mv"], answer: 0, why: "কাজ-শক্তি উপপাদ্য থেকে।" },
    { q: "বেগ দ্বিগুণ হলে গতিশক্তি?", options: ["4 গুণ", "2 গুণ", "অর্ধেক", "একই"], answer: 0, why: "K ∝ v²।" },
    { q: "নিট কাজ কীসের সমান?", options: ["গতিশক্তির পরিবর্তন", "ভরবেগের পরিবর্তন", "বেগ", "ক্ষমতা"], answer: 0, why: "কাজ-শক্তি উপপাদ্য।" },
    { q: "2 kg, 3 m/s এ গতিশক্তি কত?", options: ["9 J", "18 J", "6 J", "4.5 J"], answer: 0, why: "½ × 2 × 9।" },
    { q: "গতিশক্তি কখনও?", options: ["ঋণাত্মক হয় না", "ঋণাত্মক হয়", "সবসময় শূন্য"], answer: 0, why: "m ধনাত্মক আর v² ধনাত্মক।" },
  ],
};

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "গতিশক্তি",
            text: (
              <>
                চলন্ত বস্তুর শক্তি <C k="r">K = ½mv²</C>। 2 kg ভরের বস্তু 3 m/s এ চললে গতিশক্তি কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["9 J", "18 J", "6 J"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="½ × 2 × 9 = 9 J।"
              />
            ),
          },
          {
            title: "বেগ দ্বিগুণ",
            text: "ওই বস্তুর বেগ দ্বিগুণ, মানে 6 m/s হলে গতিশক্তি কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["36 J", "18 J", "12 J"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="½ × 2 × 36 = 36 J, মানে চার গুণ। বেগের বর্গ বলেই এমন।"
              />
            ),
          },
          {
            title: "কাজ থেকে বেগ",
            text: "2 kg বস্তু স্থির থেকে 10 N বলে 4 m সরল। নিট কাজ 40 J। কাজ-শক্তি উপপাদ্য অনুযায়ী ½mv² = 40, বেগ কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["6.3 m/s", "20 m/s", "4 m/s"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="v² = 2 × 40 ÷ 2 = 40, তাই v ≈ 6.3 m/s।"
              />
            ),
          },
          {
            title: "ব্রেক কষা",
            text: "1000 kg গাড়ি 20 m/s এ চলছে, গতিশক্তি 200000 J। 5000 N ব্রেক বল কত দূরত্বে থামাবে?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["40 m", "20 m", "4 m"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="ব্রেকের কাজ F × d = 200000, তাই d = 200000 ÷ 5000 = 40 m। বেগ দ্বিগুণ হলে 160 m লাগত।"
              />
            ),
          },
        ],
        summary: [
          { title: "গতিশক্তি", text: "বেগের বর্গের সমানুপাতিক।", tex: ["K=\\dfrac12mv^2"] },
          { title: "কাজ-শক্তি উপপাদ্য", text: "নিট কাজ গতিশক্তির পরিবর্তনের সমান।", tex: ["W_{\\text{নিট}}=\\Delta K"] },
        ],
      })}
    />
  );
}
