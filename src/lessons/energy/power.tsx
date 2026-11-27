"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ক্ষমতা P = W/t ও P = Fv বুঝবে, ওয়াট, কিলোওয়াট ও অশ্বক্ষমতার একক রূপান্তর করবে এবং বিদ্যুৎ ব্যয়ের কিলোওয়াট-ঘণ্টা হিসাব করতে পারবে।",
  hook: "একই সিঁড়ি দৌড়ে ওঠো বা হেঁটে ওঠো, কাজ সমান। কিন্তু দৌড়ে ওঠায় বেশি ক্লান্ত লাগে, কারণ ক্ষমতা বেশি লাগে।",
  formulas: [
    { tex: "P=\\dfrac Wt", meaning: "গড় ক্ষমতা। একক ওয়াট (W)।" },
    { tex: "P=Fv", meaning: "বল আর বেগ থাকলে তাৎক্ষণিক ক্ষমতা।" },
    { tex: "1\\ \\text{hp}=746\\ \\text{W},\\quad 1\\ \\text{kWh}=3.6\\times10^6\\ \\text{J}", meaning: "অশ্বক্ষমতা আর বিদ্যুৎ ব্যয়ের একক।" },
  ],
  example: {
    problem: "একটি ক্রেন 500 kg ভর 10 m ওপরে 20 s এ তোলে। ক্ষমতা কত? (g = 9.8)",
    steps: [
      { text: "কাজ।", tex: "W=500\\times9.8\\times10=49000" },
      { text: "ক্ষমতা।", tex: "P=\\dfrac{49000}{20}=2450" },
      { text: "উত্তর: 2450 W।" },
    ],
  },
  mistakes: [
    "ক্ষমতা আর কাজ এক ভাবা।",
    "kWh কে ক্ষমতার একক ভাবা। এটা শক্তির একক।",
    "P = Fv তে F আর v সমান্তরাল না হলে সরাসরি গুণ করা।",
  ],
  recap: [
    "P = W/t, একক ওয়াট।",
    "P = Fv।",
    "1 hp = 746 W।",
    "1 kWh = 3.6 × 10^6 J।",
  ],
  think: {
    scenario: "একই ওজনের দুজন একই সিঁড়ি ওঠে। একজন 5 s এ, অন্যজন 10 s এ।",
    points: ["কার কাজ বেশি?", "কার ক্ষমতা বেশি?"],
    hint: "কাজ সমান, সময় ভিন্ন।",
    traps: ["কাজ সমান।", "দ্রুত ওঠা ব্যক্তির ক্ষমতা দ্বিগুণ।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "5 s এ 600 J কাজ করলে ক্ষমতা কত?",
      hint: "W/t।",
      steps: [{ text: "গণনা।", tex: "P=\\dfrac{600}{5}=120" }, { text: "উত্তর: 120 W।" }],
    },
    {
      level: "মাঝারি",
      q: "60 kg এর একজন 4 m উঁচু সিঁড়ি 5 s এ ওঠে। ক্ষমতা কত? (g = 9.8)",
      hint: "কাজ mgh।",
      steps: [{ text: "গণনা।", tex: "P=\\dfrac{60\\times9.8\\times4}{5}=470.4" }, { text: "উত্তর: প্রায় 470 W।" }],
    },
    {
      level: "কঠিন",
      q: "1.5 kW পাম্প 20 m উঁচুতে প্রতি সেকেন্ডে কত kg পানি তুলতে পারে? (g = 9.8)",
      hint: "P = mgh/t।",
      steps: [{ text: "গণনা।", tex: "\\dfrac mt=\\dfrac{1500}{9.8\\times20}=7.65" }, { text: "উত্তর: প্রায় 7.7 kg/s।" }],
    },
  ],
  concepts: ["P = Fv কেন ঢালু পথে গাড়ির ধীর গতি ব্যাখ্যা করে?", "বিদ্যুৎ বিলে ইউনিট বলতে কী বোঝায়?"],
  quiz: [
    { q: "ক্ষমতার একক?", options: ["ওয়াট", "জুল", "নিউটন", "পাস্কাল"], answer: 0, why: "1 W = 1 J/s।" },
    { q: "P = Fv এ v হলো?", options: ["বল বরাবর বেগ", "ত্বরণ", "আয়তন", "সময়"], answer: 0, why: "বল আর বেগের স্কেলার গুণফল।" },
    { q: "1 hp কত ওয়াট?", options: ["746", "1000", "100", "3600"], answer: 0, why: "প্রচলিত মান 746 W।" },
    { q: "2 kW হিটার 3 ঘণ্টা চললে বিদ্যুৎ ব্যয়?", options: ["6 kWh", "5 kWh", "1.5 kWh", "6 kW"], answer: 0, why: "2 × 3 = 6 kWh।" },
    { q: "ক্রেন 49000 J কাজ 20 s এ করলে ক্ষমতা?", options: ["2450 W", "980000 W", "490 W", "245 W"], answer: 0, why: "49000 ÷ 20।" },
  ],
};

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "কাজের হার",
            text: (
              <>
                ক্ষমতা মানে কত দ্রুত কাজ হচ্ছে, <C k="r">P = W/t</C>। ক্রেন 500 kg ভর 10 m ওপরে 20 s এ তোলে। ক্ষমতা কত? (g = 9.8)
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["2450 W", "49000 W", "245 W"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="কাজ = 500 × 9.8 × 10 = 49000 J। ÷ 20 s = 2450 W।"
              />
            ),
          },
          {
            title: "বল আর বেগ",
            text: "একটি গাড়ি 2000 N বল দিয়ে 20 m/s ধ্রুব বেগে চলছে। P = Fv। ক্ষমতা কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["40 kW", "100 W", "400 W"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="2000 × 20 = 40000 W = 40 kW। একই ক্ষমতায় বেগ বাড়লে টানার বল কমে।"
              />
            ),
          },
          {
            title: "অশ্বক্ষমতা",
            text: "1 hp = 746 W। একটি মোটরের ক্ষমতা 7460 W। এটা কত অশ্বক্ষমতা?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["10 hp", "1 hp", "100 hp"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="7460 ÷ 746 = 10 hp।"
              />
            ),
          },
          {
            title: "বিদ্যুৎ বিল",
            text: "বিদ্যুৎ বিল কিলোওয়াট-ঘণ্টা (kWh) এ হয়, যা ক্ষমতা × সময়। 2 kW হিটার 3 ঘণ্টা চালালে কত ইউনিট?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["6 kWh", "5 kWh", "1.5 kWh"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="2 × 3 = 6 kWh। 1 kWh = 3.6 × 10^6 J। এটা শক্তির একক।"
              />
            ),
          },
        ],
        summary: [
          { title: "ক্ষমতা", text: "কাজের হার। বল আর বেগ থাকলে P = Fv।", tex: ["P=\\dfrac Wt=Fv"] },
          { title: "একক", text: "ওয়াট, কিলোওয়াট, অশ্বক্ষমতা আর kWh।", tex: ["1\\ \\text{hp}=746\\ \\text{W}", "1\\ \\text{kWh}=3.6\\times10^6\\ \\text{J}"] },
        ],
      })}
    />
  );
}
