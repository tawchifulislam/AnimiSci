"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Plot } from "@/components/anim/plot";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "মুক্তিবেগ ও কক্ষীয় বেগের ধারণা বুঝবে, এদের সূত্র থেকে মান বের করবে এবং v_e = √2 v_o সম্পর্ক ব্যবহার করতে পারবে।",
  hook: "রকেট কত জোরে ছুটলে পৃথিবীর টান ছাড়িয়ে চিরতরে মহাকাশে চলে যেতে পারে? এই ন্যূনতম বেগের নাম মুক্তিবেগ।",
  formulas: [
    { tex: "v_e=\\sqrt{\\dfrac{2GM}{R}}=\\sqrt{2gR}", meaning: "মুক্তিবেগ। ভূপৃষ্ঠে প্রায় 11.2 km/s।" },
    { tex: "v_o=\\sqrt{\\dfrac{GM}{R}}=\\sqrt{gR}", meaning: "ভূপৃষ্ঠ ঘেঁষে কক্ষীয় বেগ, প্রায় 7.9 km/s।" },
    { tex: "v_e=\\sqrt2\\,v_o", meaning: "দুটির সম্পর্ক।" },
  ],
  example: {
    problem: "g = 9.8 m/s², R = 6.4 × 10^6 m। মুক্তিবেগ কত?",
    steps: [
      { text: "সূত্র।", tex: "v_e=\\sqrt{2\\times9.8\\times6.4\\times10^6}=1.12\\times10^4" },
      { text: "উত্তর: 11.2 km/s।" },
    ],
  },
  mistakes: [
    "মুক্তিবেগ বস্তুর ভরের ওপর নির্ভর করে ভাবা। করে না।",
    "মুক্তিবেগের সময় ধ্রুব বেগে উঠতে হয় ভাবা। একবার এই বেগ পেলে আর শক্তি লাগে না।",
    "কক্ষীয় বেগ আর মুক্তিবেগ এক ভাবা। ve = √2 vo।",
  ],
  recap: [
    "মুক্তিবেগে গতিশক্তি = |বিভব শক্তি|, মোট শক্তি শূন্য।",
    "ভূপৃষ্ঠে v_e = 11.2 km/s, v_o = 7.9 km/s।",
    "v_e = √2 v_o।",
    "দুটিই বস্তুর ভর নিরপেক্ষ।",
  ],
  think: {
    scenario: "চাঁদে কোনো বায়ুমণ্ডল নেই, অথচ পৃথিবীতে আছে।",
    points: ["কেন চাঁদ বায়ু ধরে রাখতে পারে না?", "এর সাথে মুক্তিবেগের সম্পর্ক কী?"],
    hint: "চাঁদের মুক্তিবেগ কম।",
    traps: ["চাঁদের মুক্তিবেগ মাত্র 2.37 km/s।", "গ্যাস অণুর গতিবেগ এর কাছাকাছি হলে পালিয়ে যায়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "g = 9.8 m/s², R = 6.4 × 10^6 m হলে পৃথিবী ঘেঁষে কক্ষীয় বেগ কত?",
      hint: "√(gR)।",
      steps: [{ text: "গণনা।", tex: "v_o=\\sqrt{9.8\\times6.4\\times10^6}=7.92\\times10^3" }, { text: "উত্তর: 7.92 km/s।" }],
    },
    {
      level: "মাঝারি",
      q: "চাঁদে g = 1.62 m/s², R = 1.74 × 10^6 m। চাঁদের মুক্তিবেগ কত?",
      hint: "√(2gR)।",
      steps: [{ text: "গণনা।", tex: "v_e=\\sqrt{2\\times1.62\\times1.74\\times10^6}=2.37\\times10^3" }, { text: "উত্তর: 2.37 km/s।" }],
    },
    {
      level: "কঠিন",
      q: "1 kg ভরকে পৃথিবী থেকে মুক্ত করতে (g = 9.8, R = 6.4 × 10^6 m) ন্যূনতম গতিশক্তি কত?",
      hint: "½ m v_e² = m g R।",
      steps: [{ text: "গণনা।", tex: "K=gR=9.8\\times6.4\\times10^6=6.27\\times10^7" }, { text: "উত্তর: 6.27 × 10^7 J, যা ভূপৃষ্ঠে বিভব শক্তির মানের সমান।" }],
    },
  ],
  concepts: ["মুক্তিবেগ ভরের ওপর নির্ভর করে না কেন?", "কৃষ্ণগহ্বরের মুক্তিবেগ কত হতে হয়?"],
  quiz: [
    { q: "পৃথিবীর মুক্তিবেগ?", options: ["11.2 km/s", "7.9 km/s", "9.8 km/s", "3 × 10^8 m/s"], answer: 0, why: "√(2gR)।" },
    { q: "ভূপৃষ্ঠ ঘেঁষে কক্ষীয় বেগ?", options: ["7.9 km/s", "11.2 km/s", "5.6 km/s", "9.8 km/s"], answer: 0, why: "√(gR)।" },
    { q: "ve ও vo এর সম্পর্ক?", options: ["ve = √2 vo", "ve = 2vo", "ve = vo", "ve = vo/√2"], answer: 0, why: "2gR বনাম gR।" },
    { q: "মুক্তিবেগ নির্ভর করে?", options: ["গ্রহের M ও R এর ওপর", "বস্তুর ভরের ওপর", "বস্তুর আকারের ওপর", "নিক্ষেপের কোণের ওপর"], answer: 0, why: "বস্তুর ভর কাটা যায়।" },
    { q: "চাঁদের মুক্তিবেগ প্রায়?", options: ["2.37 km/s", "11.2 km/s", "7.9 km/s", "1.62 km/s"], answer: 0, why: "√(2 × 1.62 × 1.74 × 10^6)।" },
  ],
};

const orb: Array<[number, number]> = Array.from({ length: 51 }, (_, i) => {
  const x = 1 + i * 0.1;
  return [x, 7.92 / Math.sqrt(x)] as [number, number];
});
const esc: Array<[number, number]> = Array.from({ length: 51 }, (_, i) => {
  const x = 1 + i * 0.1;
  return [x, 11.2 / Math.sqrt(x)] as [number, number];
});

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "মুক্তিবেগ",
            text: (
              <>
                মুক্ত হতে হলে গতিশক্তি অন্তত বিভব শক্তির মানের সমান হতে হয়: ½ m v² = GMm/R। তাই <C k="r">v_e = √(2gR)</C>। বস্তুর ভর m এখানে কী করে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["কেটে যায়, মুক্তিবেগ ভরের ওপর নির্ভর করে না", "বাড়ায়", "কমায়"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="দুই পাশেই m আছে, কাটা যায়। পিঁপড়া আর রকেটের মুক্তিবেগ সমান।"
              />
            ),
          },
          {
            title: "মান বের করি",
            text: "g = 9.8, R = 6.4 × 10^6 m হলে v_e = √(2gR) কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["11.2 km/s", "7.9 km/s", "9.8 km/s"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="2 × 9.8 × 6.4 × 10^6 = 1.2544 × 10^8, বর্গমূল 1.12 × 10^4 m/s = 11.2 km/s।"
              />
            ),
          },
          {
            title: "কক্ষীয় বেগ",
            text: "ভূপৃষ্ঠ ঘেঁষে বৃত্তাকার কক্ষে ঘুরতে মহাকর্ষ বল কেন্দ্রমুখী বল জোগায়: mg = mv²/R। v_o = √(gR) কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["7.92 km/s", "11.2 km/s", "5.6 km/s"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="√(9.8 × 6.4 × 10^6) = 7.92 km/s। এটি v_e এর 1/√2 গুণ, মানে v_e = √2 v_o।"
              />
            ),
            figure: () => (
              <Plot
                label="কক্ষীয় বেগ ও মুক্তিবেগ বনাম r/R"
                xl="r/R"
                yl="বেগ (km/s)"
                xmin={1}
                xmax={6}
                ymax={12}
                curves={[{ pts: orb, c: "p" }, { pts: esc, c: "r", dash: true }]}
                notes={[{ x: 3.4, y: 7.2, text: "মুক্তিবেগ (ডটেড)", c: "r", anchor: "start" }, { x: 3.4, y: 3.6, text: "কক্ষীয় বেগ", c: "p", anchor: "start" }]}
              />
            ),
          },
          {
            title: "উচ্চ কক্ষে",
            text: "ভূপৃষ্ঠ থেকে R উচ্চতায় (r = 2R) কক্ষীয় বেগ v = √(GM/r) = √(gR/2)। মান কত?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["5.60 km/s", "7.92 km/s", "3.96 km/s"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="√(9.8 × 6.4 × 10^6 ÷ 2) = 5.60 km/s। কক্ষ যত বড়, বেগ তত কম।"
              />
            ),
          },
        ],
        summary: [
          { title: "মুক্তিবেগ", text: "ভরের ওপর নির্ভর করে না, মান 11.2 km/s।", tex: ["v_e=\\sqrt{2gR}"] },
          { title: "কক্ষীয় বেগ", text: "ভূপৃষ্ঠ ঘেঁষে 7.9 km/s, v_e = √2 v_o।", tex: ["v_o=\\sqrt{gR}", "v_e=\\sqrt2\\,v_o"] },
        ],
      })}
    />
  );
}
