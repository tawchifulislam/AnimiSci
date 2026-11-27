"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "কম্পটন বিক্ষেপণ ও তরঙ্গদৈর্ঘ্য পরিবর্তন, যুগল উৎপাদন ও বিলোপ বুঝবে এবং সংশ্লিষ্ট হিসাব করতে পারবে।",
  hook: "এক্স-রে কোনো ইলেকট্রনে ধাক্কা খেয়ে ছিটকে গেলে তার তরঙ্গদৈর্ঘ্য বেড়ে যায়, ঠিক যেন বিলিয়ার্ড বলের সংঘর্ষ। আলোর কণা-ধর্মের এটি জোরালো প্রমাণ।",
  formulas: [
    { tex: "\\Delta\\lambda=\\dfrac h{m_0c}(1-\\cos\\theta)", meaning: "কম্পটন সরণ। h/m0c = 2.43 pm।" },
    { tex: "\\gamma\\to e^-+e^+,\\quad E\\ge2m_0c^2=1.02\\ \\text{MeV}", meaning: "যুগল উৎপাদন।" },
    { tex: "e^-+e^+\\to2\\gamma,\\quad E_\\gamma=0.511\\ \\text{MeV}", meaning: "যুগল বিলোপ।" },
  ],
  example: {
    problem: "কম্পটন বিক্ষেপণে ফোটন 90° কোণে ছিটকে গেলে তরঙ্গদৈর্ঘ্য কত বাড়ে?",
    steps: [
      { text: "cos 90° = 0।", tex: "\\Delta\\lambda=2.43\\times(1-0)" },
      { text: "উত্তর: 2.43 pm।" },
    ],
  },
  mistakes: [
    "বিক্ষেপণের পর তরঙ্গদৈর্ঘ্য কমে ভাবা। বাড়ে, কারণ ফোটন শক্তি হারায়।",
    "Δλ আপতিত তরঙ্গদৈর্ঘ্যের ওপর নির্ভর করে ভাবা। শুধু কোণের ওপর।",
    "যুগল উৎপাদন বায়ু বা শূন্যে হয় ভাবা। নিউক্লিয়াসের কাছে হয় (ভরবেগ সংরক্ষণের জন্য)।",
  ],
  recap: [
    "কম্পটন সরণ শুধু θ এর ওপর নির্ভর, 0° এ শূন্য, 180° এ সর্বোচ্চ 4.86 pm।",
    "ফোটন শক্তি হারালে λ বাড়ে।",
    "যুগল উৎপাদনে ন্যূনতম শক্তি 1.02 MeV।",
    "বিলোপে দুটি 0.511 MeV ফোটন বিপরীত দিকে যায়।",
  ],
  think: {
    scenario: "ফোটন-ইলেকট্রন সংঘর্ষে শক্তি ও ভরবেগ দুটোই সংরক্ষিত। ফোটন কিছু শক্তি ইলেকট্রনকে দেয়।",
    points: ["ফোটনের শক্তি কমলে λ কীভাবে বদলায়?", "কোন কোণে সরণ সর্বোচ্চ?"],
    hint: "λ = hc/E।",
    traps: ["E কমলে λ বাড়ে।", "θ = 180° এ cos = −1, তাই সরণ 2 × 2.43।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "θ = 180° এ কম্পটন সরণ কত?",
      hint: "1 − cos180° = 2।",
      steps: [{ text: "গণনা।", tex: "\\Delta\\lambda=2.43\\times2=4.86" }, { text: "উত্তর: 4.86 pm।" }],
    },
    {
      level: "মাঝারি",
      q: "ইলেকট্রন-পজিট্রন যুগল তৈরিতে ন্যূনতম ফোটন শক্তি কত? (m0c² = 0.511 MeV)",
      hint: "2m0c²।",
      steps: [{ text: "গণনা।", tex: "E=2\\times0.511=1.02" }, { text: "উত্তর: 1.02 MeV।" }],
    },
    {
      level: "কঠিন",
      q: "10 pm তরঙ্গদৈর্ঘ্যের ফোটন ইলেকট্রনে ধাক্কা খেয়ে 180° এ ফিরে এল। বিক্ষিপ্ত ফোটনের তরঙ্গদৈর্ঘ্য কত?",
      hint: "λ' = λ + Δλ।",
      steps: [{ text: "গণনা।", tex: "\\lambda'=10+4.86=14.86" }, { text: "উত্তর: 14.86 pm।" }],
    },
  ],
  concepts: ["কম্পটন ক্রিয়া ফোটনের ভরবেগের প্রমাণ কেন?", "যুগল উৎপাদনে নিউক্লিয়াস কেন লাগে?"],
  quiz: [
    { q: "কম্পটন বিক্ষেপণে তরঙ্গদৈর্ঘ্য?", options: ["বাড়ে", "কমে", "একই থাকে", "শূন্য হয়"], answer: 0, why: "ফোটন শক্তি হারায়।" },
    { q: "θ = 90° এ Δλ?", options: ["2.43 pm", "4.86 pm", "0", "1.2 pm"], answer: 0, why: "h/m0c × 1।" },
    { q: "যুগল উৎপাদনে ন্যূনতম শক্তি?", options: ["1.02 MeV", "0.511 MeV", "2.04 MeV", "10 MeV"], answer: 0, why: "2m0c²।" },
    { q: "যুগল বিলোপে কী উৎপন্ন হয়?", options: ["দুটি γ ফোটন", "একটি γ ফোটন", "নিউট্রন", "প্রোটন"], answer: 0, why: "ভরবেগ সংরক্ষণের জন্য দুটি।" },
    { q: "কম্পটন ক্রিয়া কী প্রমাণ করে?", options: ["ফোটনের ভরবেগ আছে", "আলো তরঙ্গ", "ইলেকট্রন তরঙ্গ", "ইথার আছে"], answer: 0, why: "কণা-সংঘর্ষের মতো আচরণ।" },
  ],
};

const shift: Array<[number, number]> = Array.from({ length: 19 }, (_, i) => {
  const th = i * 10;
  return [th, 2.43 * (1 - Math.cos((th * Math.PI) / 180))] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "কম্পটন সরণ",
            text: (
              <>
                ফোটন ইলেকট্রনে ধাক্কা খেয়ে θ কোণে ছিটকে গেলে <C k="r">Δλ = 2.43 (1 − cosθ) pm</C>। θ = 90° এ Δλ কত?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["2.43 pm", "4.86 pm", "0"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="cos90° = 0, তাই Δλ = 2.43 pm।"
              />
            ),
            figure: () => (
              <Plot
                label="কম্পটন সরণ বনাম θ"
                xl="θ (ডিগ্রি)"
                yl="Δλ (pm)"
                xmax={180}
                ymax={5.5}
                curves={[{ pts: shift, c: "r" }]}
                marks={g.picks[0] !== undefined ? [{ x: 90, y: 2.43, label: "2.43", c: "p", dx: 8, dy: -8 }, { x: 180, y: 4.86, label: "4.86", c: "p", dx: -40, dy: -8 }] : []}
              />
            ),
          },
          {
            title: "সর্বোচ্চ সরণ",
            text: "কোন কোণে সরণ সর্বোচ্চ এবং কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["180° এ 4.86 pm", "90° এ 2.43 pm", "0° এ 4.86 pm"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="180° এ 1 − cos = 2, Δλ = 4.86 pm। 0° এ সরণ শূন্য।"
              />
            ),
          },
          {
            title: "যুগল উৎপাদন",
            text: "উচ্চশক্তির γ ফোটন নিউক্লিয়াসের কাছে ইলেকট্রন ও পজিট্রন তৈরি করে। ন্যূনতম শক্তি কত? (m0c² = 0.511 MeV)",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["1.02 MeV", "0.511 MeV", "0.255 MeV"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="দুটি কণার স্থির ভরের শক্তি 2 × 0.511 = 1.02 MeV। এর কম হলে যুগল তৈরি হয় না।"
              />
            ),
          },
          {
            title: "যুগল বিলোপ",
            text: "ইলেকট্রন ও পজিট্রন মিলিত হয়ে মিলিয়ে গিয়ে কী ছাড়ে?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["বিপরীত দিকে দুটি 0.511 MeV ফোটন", "একটি 1.02 MeV ফোটন", "নিউট্রিনো"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="ভরবেগ সংরক্ষণে দুটি বিপরীতমুখী ফোটন লাগে, প্রতিটির শক্তি 0.511 MeV।"
              />
            ),
          },
        ],
        summary: [
          { title: "কম্পটন", text: "ফোটন শক্তি হারিয়ে λ বাড়ায়। Δλ শুধু θ এর ওপর নির্ভর।", tex: ["\\Delta\\lambda=\\dfrac h{m_0c}(1-\\cos\\theta)"] },
          { title: "যুগল", text: "উৎপাদনে ন্যূনতম 1.02 MeV, বিলোপে দুটি 0.511 MeV ফোটন।", tex: ["E\\ge2m_0c^2"] },
        ],
      })}
    />
  );
}
