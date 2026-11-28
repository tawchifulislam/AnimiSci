"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "উপগ্রহের কক্ষীয় বেগ, পর্যায়কাল, শক্তি এবং ভূস্থির উপগ্রহের শর্ত বুঝবে ও হিসাব করতে পারবে।",
  hook: "টিভির ডিশ সবসময় আকাশের একই বিন্দুর দিকে তাকিয়ে থাকে, কারণ সেখানে এমন একটি উপগ্রহ আছে যা পৃথিবীর সাথে তাল মিলিয়ে ঘুরছে।",
  formulas: [
    { tex: "v=\\sqrt{\\dfrac{GM}{r}},\\quad r=R+h", meaning: "কক্ষীয় বেগ।" },
    { tex: "T=2\\pi\\sqrt{\\dfrac{r^3}{GM}}", meaning: "পর্যায়কাল।" },
    { tex: "E=-\\dfrac{GMm}{2r}=-K", meaning: "মোট শক্তি। বিভব শক্তি −2K।" },
  ],
  example: {
    problem: "ভূপৃষ্ঠ থেকে 400 km উচ্চতায় উপগ্রহের কক্ষীয় বেগ কত? (GM = 4.01 × 10^14 m³/s², R = 6.4 × 10^6 m)",
    steps: [
      { text: "r।", tex: "r=6.4\\times10^6+4\\times10^5=6.8\\times10^6" },
      { text: "বেগ।", tex: "v=\\sqrt{\\dfrac{4.01\\times10^{14}}{6.8\\times10^6}}=7.68\\times10^3" },
      { text: "উত্তর: 7.68 km/s।" },
    ],
  },
  mistakes: [
    "r কে উচ্চতা h ধরা। r = R + h, কেন্দ্র থেকে দূরত্ব।",
    "ভারী উপগ্রহ ধীরে ঘোরে ভাবা। বেগ ভরের ওপর নির্ভর করে না।",
    "মোট শক্তি ধনাত্মক ভাবা। বাঁধা কক্ষে ঋণাত্মক।",
  ],
  recap: [
    "মহাকর্ষ বল কেন্দ্রমুখী বল জোগায়: GMm/r² = mv²/r।",
    "বড় কক্ষে বেগ কম, পর্যায়কাল বেশি।",
    "ভূস্থির উপগ্রহ: T = 24 h, পশ্চিম থেকে পূর্বে, বিষুবতলে, উচ্চতা প্রায় 36000 km।",
    "মোট শক্তি = −GMm/2r।",
  ],
  think: {
    scenario: "ভূস্থির উপগ্রহ ঠিক কক্ষে না থাকলে ডিশ অ্যান্টেনা ধীরে ধীরে সংকেত হারায়।",
    points: ["ভূস্থির উপগ্রহের কী কী শর্ত?", "কেন এটি শুধু বিষুবতলের ওপর থাকতে পারে?"],
    hint: "পৃথিবীর ঘূর্ণন কেন্দ্র বিষুবতলের ওপর।",
    traps: ["পর্যায়কাল 24 h ও ঘূর্ণনের দিক একই।", "কক্ষের তল পৃথিবীর ঘূর্ণন অক্ষের লম্ব, মানে বিষুবতল।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "400 km উচ্চতার উপগ্রহের কক্ষীয় বেগ কত? (GM = 4.01 × 10^14, R = 6.4 × 10^6 m)",
      hint: "r = 6.8 × 10^6 m।",
      steps: [{ text: "গণনা।", tex: "v=\\sqrt{\\dfrac{4.01\\times10^{14}}{6.8\\times10^6}}=7.68\\times10^3" }, { text: "উত্তর: 7.68 km/s।" }],
    },
    {
      level: "মাঝারি",
      q: "ওই উপগ্রহের পর্যায়কাল কত? (v = 7.68 km/s, r = 6.8 × 10^6 m)",
      hint: "T = 2πr/v।",
      steps: [{ text: "গণনা।", tex: "T=\\dfrac{2\\pi\\times6.8\\times10^6}{7683}=5561\\ \\text{s}" }, { text: "উত্তর: 92.7 মিনিট।" }],
    },
    {
      level: "কঠিন",
      q: "ভূস্থির উপগ্রহের কক্ষের ব্যাসার্ধ কত? (T = 86400 s)",
      hint: "r³ = GM T²/4π²।",
      steps: [
        { text: "গণনা।", tex: "r^3=\\dfrac{4.01\\times10^{14}\\times(86400)^2}{4\\pi^2}=7.59\\times10^{22}" },
        { text: "r = 4.23 × 10^7 m, উচ্চতা h = r − R = 3.59 × 10^7 m।" },
        { text: "উত্তর: r = 4.23 × 10^7 m।" },
      ],
    },
  ],
  concepts: ["কক্ষে মোট শক্তি ঋণাত্মক কেন?", "ভূস্থির উপগ্রহ কেন বিষুবতলেই থাকে?"],
  quiz: [
    { q: "কক্ষীয় বেগ?", options: ["√(GM/r)", "√(2GM/r)", "GM/r", "√(GM/r²)"], answer: 0, why: "কেন্দ্রমুখী বল = মহাকর্ষ বল।" },
    { q: "উচ্চতা বাড়লে কক্ষীয় বেগ?", options: ["কমে", "বাড়ে", "একই", "শূন্য"], answer: 0, why: "v ∝ 1/√r।" },
    { q: "ভূস্থির উপগ্রহের পর্যায়কাল?", options: ["24 h", "12 h", "1.5 h", "48 h"], answer: 0, why: "পৃথিবীর সাথে তাল মেলাতে।" },
    { q: "400 km উচ্চতার উপগ্রহের বেগ প্রায়?", options: ["7.68 km/s", "11.2 km/s", "3.08 km/s", "5.6 km/s"], answer: 0, why: "√(GM/r)।" },
    { q: "উপগ্রহের মোট শক্তি?", options: ["−GMm/2r", "GMm/2r", "−GMm/r", "শূন্য"], answer: 0, why: "K + U = GMm/2r − GMm/r।" },
  ],
};

const per: Array<[number, number]> = Array.from({ length: 61 }, (_, i) => {
  const x = 1 + i * 0.1;
  return [x, 1.41 * Math.pow(x, 1.5)] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "কেন পড়ে না",
            text: (
              <>
                উপগ্রহ পৃথিবীর দিকে পড়তে থাকে, কিন্তু পাশে এত দ্রুত ছোটে যে পৃথিবী বেঁকে সরে যায়। মহাকর্ষ বলই জোগায় <C k="r">কেন্দ্রমুখী বল</C>। এ থেকে কক্ষীয় বেগ কী?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["√(GM/r)", "GM/r", "√(GM r)"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="GMm/r² = mv²/r থেকে v² = GM/r। m কেটে যায়, তাই বেগ উপগ্রহের ভরের ওপর নির্ভর করে না।"
              />
            ),
          },
          {
            title: "বেগের মান",
            text: "400 km উচ্চতায় r = 6.8 × 10^6 m, GM = 4.01 × 10^14। v কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["7.68 km/s", "11.2 km/s", "3.08 km/s"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="√(4.01 × 10^14 ÷ 6.8 × 10^6) = 7.68 km/s, আর পর্যায়কাল 2πr/v = 92.7 মিনিট।"
              />
            ),
          },
          {
            title: "পর্যায়কাল",
            text: "কক্ষ যত বড়, পর্যায়কাল T ∝ r^(3/2) তত বেশি। গ্রাফে কোথায় T = 24 h পাই?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["r প্রায় 6.6 R এ (ভূস্থির কক্ষ)", "r = R এ", "r = 2R এ"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="r = 4.23 × 10^7 m, মানে 6.6R, উচ্চতা h = 3.59 × 10^7 m। এখানে উপগ্রহ পৃথিবীর সাথে তাল মিলিয়ে ঘোরে।"
              />
            ),
            figure: () => (
              <Plot
                label="পর্যায়কাল বনাম r/R"
                xl="r/R"
                yl="T (ঘণ্টা)"
                xmin={1}
                xmax={7}
                ymax={28}
                curves={[{ pts: per, c: "r" }]}
                marks={[{ x: 1.06, y: 1.54, label: "400 km", c: "p", dx: 8, dy: -8 }, { x: 6.62, y: 24, label: "ভূস্থির 24 h", c: "p", dx: -76, dy: -8 }]}
              />
            ),
          },
          {
            title: "ভূস্থির শর্ত",
            text: "ভূস্থির উপগ্রহ কোন তলে ঘোরে?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["বিষুবতলে, পশ্চিম থেকে পূর্বে", "যেকোনো তলে", "মেরুর ওপর দিয়ে"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="পৃথিবীর কেন্দ্র বিষুবতলে। ঘূর্ণনের দিক ও 24 h পর্যায়কাল মিললে উপগ্রহটি ভূপৃষ্ঠের একই বিন্দুর ওপর স্থির মনে হয়।"
              />
            ),
          },
        ],
        summary: [
          { title: "কক্ষীয় বেগ ও পর্যায়কাল", text: "বড় কক্ষে বেগ কম, সময় বেশি।", tex: ["v=\\sqrt{\\dfrac{GM}{r}}", "T=2\\pi\\sqrt{\\dfrac{r^3}{GM}}"] },
          { title: "ভূস্থির", text: "T = 24 h, বিষুবতলে, h প্রায় 36000 km।", tex: ["E=-\\dfrac{GMm}{2r}"] },
        ],
      })}
    />
  );
}
