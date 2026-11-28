"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "মহাকর্ষীয় ক্ষেত্র প্রাবল্য, বিভব ও বিভব শক্তি বুঝবে এবং ঋণাত্মক বিভবের তাৎপর্য ও কাজ হিসাব করতে পারবে।",
  hook: "পৃথিবী থেকে যত দূরে যাই, বিভব শূন্যের কাছে আসে অথচ মান ঋণাত্মক। ঋণাত্মক মানে কী?",
  formulas: [
    { tex: "E=\\dfrac{GM}{r^2}", meaning: "ক্ষেত্র প্রাবল্য (প্রতি একক ভরে বল), g এর সমান।" },
    { tex: "V=-\\dfrac{GM}{r}", meaning: "বিভব। অসীমে শূন্য ধরা হয়।" },
    { tex: "U=-\\dfrac{GMm}{r}", meaning: "বিভব শক্তি।" },
  ],
  example: {
    problem: "পৃথিবীর পৃষ্ঠে বিভব কত? (M = 6 × 10^24 kg, R = 6.4 × 10^6 m)",
    steps: [
      { text: "সূত্র।", tex: "V=-\\dfrac{6.67\\times10^{-11}\\times6\\times10^{24}}{6.4\\times10^6}" },
      { text: "উত্তর: −6.25 × 10^7 J/kg।" },
    ],
  },
  mistakes: [
    "বিভব ধনাত্মক ভাবা। আকর্ষণ ক্ষেত্রে বিভব ঋণাত্মক।",
    "বিভব শক্তির পরিবর্তন আর মানকে এক ভাবা। ΔU = U2 − U1।",
    "ক্ষেত্র প্রাবল্য আর বিভব একই নির্ভরতা ভাবা। E ∝ 1/r², V ∝ 1/r।",
  ],
  recap: [
    "ক্ষেত্র প্রাবল্য: প্রতি একক ভরে বল, ভেক্টর, পৃথিবীর দিকে।",
    "বিভব: অসীম থেকে বিন্দুতে একক ভর আনতে কাজ, ঋণাত্মক।",
    "দূরে গেলে V বাড়ে (শূন্যের দিকে)।",
    "বস্তুকে r1 থেকে r2 এ তুলতে কাজ = U2 − U1।",
  ],
  think: {
    scenario: "ভূপৃষ্ঠ থেকে একটি পাথরকে অসীম দূরত্বে নিতে কাজ করতে হয়।",
    points: ["বিভব শক্তি ঋণাত্মক কেন?", "বাঁধা অবস্থা বলতে কী বোঝায়?"],
    hint: "অসীমে U = 0, কাছে এলে আকর্ষণে কাজ পাই।",
    traps: ["বস্তু বাঁধা অবস্থায় আছে, তাই U < 0।", "মুক্ত করতে অন্তত |U| শক্তি দিতে হয়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "পৃথিবীর পৃষ্ঠে মহাকর্ষীয় বিভব কত? (GM/R = 6.25 × 10^7 J/kg)",
      hint: "V = −GM/R।",
      steps: [{ text: "গণনা।", tex: "V=-6.25\\times10^7" }, { text: "উত্তর: −6.25 × 10^7 J/kg।" }],
    },
    {
      level: "মাঝারি",
      q: "100 kg ভরের একটি বস্তুর ভূপৃষ্ঠে বিভব শক্তি কত?",
      hint: "U = mV।",
      steps: [{ text: "গণনা।", tex: "U=-100\\times6.25\\times10^7=-6.25\\times10^9" }, { text: "উত্তর: −6.25 × 10^9 J।" }],
    },
    {
      level: "কঠিন",
      q: "1 kg ভরকে ভূপৃষ্ঠ থেকে কেন্দ্র থেকে 2R দূরত্বে তুলতে কত কাজ লাগে?",
      hint: "W = GMm(1/R − 1/2R)।",
      steps: [{ text: "গণনা।", tex: "W=\\dfrac{GMm}{2R}=\\dfrac{6.25\\times10^7}{2}=3.13\\times10^7" }, { text: "উত্তর: 3.13 × 10^7 J।" }],
    },
  ],
  concepts: ["বিভব ঋণাত্মক কেন?", "ক্ষেত্র প্রাবল্য ও বিভবের সম্পর্ক কী?"],
  quiz: [
    { q: "মহাকর্ষীয় বিভব?", options: ["ঋণাত্মক", "ধনাত্মক", "শূন্য", "অসীম"], answer: 0, why: "আকর্ষণ ক্ষেত্রে অসীমকে শূন্য ধরায়।" },
    { q: "বিভব অসীমে?", options: ["শূন্য", "সর্বনিম্ন", "অসীম", "ঋণাত্মক অসীম"], answer: 0, why: "নির্ধারিত নির্দেশ বিন্দু।" },
    { q: "V = ?", options: ["−GM/r", "GM/r", "−GM/r²", "GM/r²"], answer: 0, why: "বিভবের সূত্র।" },
    { q: "পৃষ্ঠে বিভব প্রায়?", options: ["−6.25 × 10^7 J/kg", "6.25 × 10^7 J/kg", "−9.8 J/kg", "−6.25 × 10^3 J/kg"], answer: 0, why: "GM/R।" },
    { q: "ক্ষেত্র প্রাবল্য কীভাবে বদলায়?", options: ["1/r²", "1/r", "r", "r²"], answer: 0, why: "E = GM/r²।" },
  ],
};

const pot: Array<[number, number]> = Array.from({ length: 41 }, (_, i) => {
  const x = 1 + i * 0.1;
  return [x, -62.5 / x] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ক্ষেত্র প্রাবল্য",
            text: (
              <>
                প্রতি একক ভরে যে বল লাগে তা <C k="r">ক্ষেত্র প্রাবল্য</C>, E = GM/r²। এর মান আর g এর মধ্যে সম্পর্ক কী?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["একই রাশি", "E = 2g", "কোনো সম্পর্ক নেই"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="ভূপৃষ্ঠে E = GM/R² = g। অভিকর্ষজ ত্বরণ ও ক্ষেত্র প্রাবল্য একই রাশি।"
              />
            ),
          },
          {
            title: "বিভব ঋণাত্মক",
            text: "অসীমে বিভব শূন্য ধরা হয়। কাছে এলে আকর্ষণে কাজ পাওয়া যায়, তাই V = −GM/r। পৃষ্ঠে মান কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["−6.25 × 10^7 J/kg", "6.25 × 10^7 J/kg", "−9.8 J/kg"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="GM/R = 6.67 × 10^-11 × 6 × 10^24 ÷ 6.4 × 10^6 = 6.25 × 10^7। ঋণাত্মক চিহ্ন মানে বাঁধা অবস্থা।"
              />
            ),
            figure: () => (
              <Plot
                label="বিভব বনাম r/R (10^6 J/kg)"
                xl="r/R"
                yl="V (10^6 J/kg)"
                xmax={5}
                ymax={2}
                ymin={-70}
                curves={[{ pts: pot, c: "r" }]}
                marks={[{ x: 1, y: -62.5, label: "−62.5", c: "p", dx: 8, dy: 10 }, { x: 2, y: -31.25, label: "−31.3", c: "p", dx: 8, dy: 10 }]}
              />
            ),
          },
          {
            title: "বিভব শক্তি",
            text: "100 kg ভরের বিভব শক্তি U = mV। ভূপৃষ্ঠে মান কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["−6.25 × 10^9 J", "6.25 × 10^9 J", "−6.25 × 10^7 J"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="100 × (−6.25 × 10^7) = −6.25 × 10^9 J। অসীমে নিতে অন্তত এই পরিমাণ শক্তি দিতে হয়।"
              />
            ),
          },
          {
            title: "উপরে তোলার কাজ",
            text: "1 kg কে ভূপৃষ্ঠ (r = R) থেকে r = 2R তে তুলতে কাজ W = GMm/2R। কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["3.13 × 10^7 J", "6.25 × 10^7 J", "1.56 × 10^7 J"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="U(2R) − U(R) = −3.13 × 10^7 + 6.25 × 10^7 = 3.13 × 10^7 J। অর্ধেক পথেই অসীমে পৌঁছানোর অর্ধেক কাজ লাগে।"
              />
            ),
          },
        ],
        summary: [
          { title: "ক্ষেত্র ও বিভব", text: "E ∝ 1/r², V ∝ 1/r। V ঋণাত্মক।", tex: ["E=\\dfrac{GM}{r^2}", "V=-\\dfrac{GM}{r}"] },
          { title: "কাজ", text: "r1 থেকে r2 এ তুলতে কাজ বিভব শক্তির পার্থক্য।", tex: ["W=U_2-U_1"] },
        ],
      })}
    />
  );
}
