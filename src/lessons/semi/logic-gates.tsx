"use client";

import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ডিজিটাল সংকেত, মৌলিক ও সার্বজনীন লজিক গেট, সত্যক সারণি এবং বুলিয়ান বীজগণিত বুঝবে ও সরল বর্তনীর আউটপুট বের করতে পারবে।",
  hook: "ফোনের চিপে কোটি কোটি ট্রানজিস্টর শুধু 0 আর 1 নিয়ে কাজ করে। গণনার পুরো জগৎ গড়ে উঠেছে কয়েকটি সরল গেটের ওপর।",
  formulas: [
    { tex: "Y=A\\cdot B\\ (\\text{AND}),\\quad Y=A+B\\ (\\text{OR}),\\quad Y=\\bar A\\ (\\text{NOT})", meaning: "মৌলিক গেট।" },
    { tex: "\\overline{A\\cdot B}=\\bar A+\\bar B,\\quad \\overline{A+B}=\\bar A\\cdot\\bar B", meaning: "ডি মরগানের উপপাদ্য।" },
    { tex: "\\text{সারি সংখ্যা}=2^n", meaning: "n ইনপুটের সত্যক সারণি।" },
  ],
  example: {
    problem: "A = 1, B = 0 হলে AND, OR, NAND, NOR, XOR গেটের আউটপুট কত?",
    steps: [
      { text: "AND = 0, OR = 1।" },
      { text: "NAND = 1, NOR = 0।" },
      { text: "XOR = 1 (ইনপুট ভিন্ন)।" },
    ],
  },
  mistakes: [
    "NAND কে AND এর মতো ভাবা। NAND = AND এর বিপরীত।",
    "XOR আর OR এক ভাবা। দুটি ইনপুটই 1 হলে OR এ 1, XOR এ 0।",
    "সার্বজনীন গেট শুধু একটি। NAND ও NOR দুটিই সার্বজনীন।",
  ],
  recap: [
    "AND: দুটোই 1 হলে 1। OR: একটি 1 হলেই 1। NOT: উল্টে দেয়।",
    "NAND = NOT(AND), NOR = NOT(OR)।",
    "XOR: ইনপুট ভিন্ন হলে 1।",
    "NAND ও NOR দিয়ে সব গেট বানানো যায়, তাই সার্বজনীন।",
  ],
  think: {
    scenario: "একটি দরজার তালা খুলবে যদি পাসওয়ার্ড সঠিক হয় এবং (কার্ড সঠিক অথবা আঙুলের ছাপ সঠিক)।",
    points: ["বুলিয়ান রাশিটি কী?", "কোন কোন গেট লাগবে?"],
    hint: "Y = P · (C + F)।",
    traps: ["একটি OR ও একটি AND গেট।", "OR এর আউটপুট AND এর একটি ইনপুটে যায়।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "3 ইনপুটের গেটের সত্যক সারণিতে কয়টি সারি থাকে?",
      hint: "2^n।",
      steps: [{ text: "গণনা।", tex: "2^3=8" }, { text: "উত্তর: 8টি সারি।" }],
    },
    {
      level: "মাঝারি",
      q: "A = 1, B = 1 হলে NAND ও XOR এর আউটপুট কত?",
      hint: "NAND = AND এর উল্টো।",
      steps: [{ text: "AND = 1, তাই NAND = 0।" }, { text: "ইনপুট সমান, তাই XOR = 0।" }, { text: "উত্তর: NAND = 0, XOR = 0।" }],
    },
    {
      level: "কঠিন",
      q: "Y = (A + B) · C̄। A = 1, B = 0, C = 1 হলে Y কত?",
      hint: "C̄ = 0।",
      steps: [{ text: "A + B = 1।" }, { text: "C̄ = 0।" }, { text: "Y = 1 · 0 = 0।" }, { text: "উত্তর: Y = 0।" }],
    },
  ],
  concepts: ["NAND গেট সার্বজনীন কেন?", "ডি মরগানের উপপাদ্য কী সুবিধা দেয়?"],
  quiz: [
    { q: "AND গেটে A = 1, B = 0 হলে আউটপুট?", options: ["0", "1", "অনির্ণেয়", "2"], answer: 0, why: "দুটোই 1 হতে হয়।" },
    { q: "OR গেটে A = 1, B = 0 হলে আউটপুট?", options: ["1", "0", "অনির্ণেয়", "2"], answer: 0, why: "একটি 1 হলেই 1।" },
    { q: "NOT গেটে ইনপুট 1 হলে আউটপুট?", options: ["0", "1", "2", "অনির্ণেয়"], answer: 0, why: "উল্টে দেয়।" },
    { q: "সার্বজনীন গেট কোনগুলো?", options: ["NAND ও NOR", "AND ও OR", "XOR ও NOT", "শুধু AND"], answer: 0, why: "এগুলো দিয়ে সব গেট বানানো যায়।" },
    { q: "4 ইনপুটের সত্যক সারণিতে সারি?", options: ["16", "8", "4", "32"], answer: 0, why: "2^4।" },
  ],
};

const tables = [
  { name: "AND", rows: "00→0, 01→0, 10→0, 11→1" },
  { name: "OR", rows: "00→0, 01→1, 10→1, 11→1" },
  { name: "NAND", rows: "00→1, 01→1, 10→1, 11→0" },
  { name: "XOR", rows: "00→0, 01→1, 10→1, 11→0" },
];

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "AND আর OR",
            text: (
              <>
                ডিজিটাল সংকেত শুধু 0 বা 1। <C k="r">AND</C> গেটে দুটোই 1 হলে আউটপুট 1। <C k="p">OR</C> গেটে একটি 1 হলেই 1। A = 1, B = 0 হলে AND আর OR কত দেয়?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["AND = 0, OR = 1", "AND = 1, OR = 1", "AND = 0, OR = 0"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="AND এ দুটোই 1 লাগে, তাই 0। OR এ একটি 1 যথেষ্ট, তাই 1।"
              />
            ),
          },
          {
            title: "NAND ও NOR",
            text: "NAND মানে AND এর পর NOT। A = 1, B = 1 হলে AND = 1, তাই NAND কত?",
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["0", "1", "অনির্ণেয়"]}
                answer={0}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="NOT 1 = 0। NAND শুধু দুই ইনপুট 1 হলেই 0 দেয়, বাকি সব ক্ষেত্রে 1।"
              />
            ),
          },
          {
            title: "XOR",
            text: "XOR আউটপুট 1 দেয় যখন দুই ইনপুট ভিন্ন। A = 1, B = 1 হলে XOR কত?",
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["0", "1", "2"]}
                answer={0}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="ইনপুট সমান, তাই XOR = 0। সত্যক সারণির সারি: 00→0, 01→1, 10→1, 11→0।"
              />
            ),
            figure: () => (
              <div className="guide-card" style={{ padding: 12, lineHeight: 1.9 }}>
                {tables.map((t) => (
                  <div key={t.name}>
                    <strong>{t.name}</strong>: {t.rows}
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "সার্বজনীন গেট",
            text: "NAND গেটের দুটি ইনপুট একসাথে জুড়ে (A, A) দিলে আউটপুট কী হয়?",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["NOT A", "A", "A · A এর বিপরীত নয়"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="NAND(A, A) = NOT(A · A) = NOT A। এভাবে NAND থেকে NOT, তারপর AND ও OR বানানো যায়, তাই NAND সার্বজনীন।"
              />
            ),
          },
        ],
        summary: [
          { title: "মৌলিক গেট", text: "AND, OR, NOT। NAND ও NOR সার্বজনীন।", tex: ["Y=A\\cdot B", "Y=A+B", "Y=\\bar A"] },
          { title: "সারি সংখ্যা", text: "n ইনপুটে 2^n সারি।", tex: ["2^n"] },
        ],
      })}
    />
  );
}
