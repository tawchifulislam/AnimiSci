"use client";

import { C, Choices, GuidedLesson, pt, type Built } from "@/components/lesson/guide-kit";
import { Dot, Lab, Square, Stage, Vec, add, col, mid } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "î, ĵ, k̂ দিয়ে যেকোনো ভেক্টর লিখতে পারবে, তার মান বের করতে পারবে, কোনো ভেক্টরের দিকে একক ভেক্টর বানাতে এবং উপাংশ ধরে যোগ-বিয়োগ করতে পারবে।",
  hook: "মানচিত্রে কোনো জায়গা বোঝাতে আমরা বলি 'পূর্বে 3 কিমি, উত্তরে 4 কিমি'। দুই দিকের দুটো সংখ্যা জানলেই পুরো ভেক্টর জানা হয়ে যায়। î, ĵ, k̂ হলো সেই দিকগুলোর নাম, আর সংখ্যাগুলো হলো কতটা।",
  look: "î আর ĵ-কে কতগুণ লম্বা করে জোড়া দিলে A ভেক্টরটা তৈরি হয়, তা খেয়াল করো। আর Â-এর তীরটা কেন সব সময় একক বৃত্তের ওপর থাকে, সেটাও দেখো।",
  formulas: [
    { tex: "\\vec A=A_x\\hat\\imath+A_y\\hat\\jmath+A_z\\hat k", meaning: "ভেক্টরের উপাংশ রূপ। x, y, z দিকে কত কত অংশ।", step: 4 },
    { tex: "A=\\sqrt{A_x^2+A_y^2+A_z^2}", meaning: "ভেক্টরের মান। দুই মাত্রায় z-এর পদ থাকে না।", step: 5 },
    { tex: "\\hat A=\\dfrac{\\vec A}{A}", meaning: "A-এর দিকে একক ভেক্টর।", step: 6 },
    { tex: "\\vec A\\pm\\vec B=(A_x\\pm B_x)\\hat\\imath+(A_y\\pm B_y)\\hat\\jmath+(A_z\\pm B_z)\\hat k", meaning: "যোগ-বিয়োগ হয় একই দিকের উপাংশ ধরে ধরে।", step: 7 },
  ],
  example: {
    problem: "A⃗ = 2î − 3ĵ + 6k̂ এবং B⃗ = î + 2ĵ − 2k̂। A⃗-এর মান, A⃗-এর দিকে একক ভেক্টর এবং A⃗ + B⃗, A⃗ − B⃗ বের করো।",
    steps: [
      { text: "মান বের করি।", tex: "A=\\sqrt{2^2+(-3)^2+6^2}=\\sqrt{49}=7" },
      { text: "মান দিয়ে ভাগ করলে একক ভেক্টর পাই।", tex: "\\hat A=\\frac{2\\hat\\imath-3\\hat\\jmath+6\\hat k}{7}" },
      { text: "যোগ: একই দিকের সংখ্যা যোগ করি।", tex: "\\vec A+\\vec B=(2+1)\\hat\\imath+(-3+2)\\hat\\jmath+(6-2)\\hat k=3\\hat\\imath-\\hat\\jmath+4\\hat k" },
      { text: "বিয়োগ: একই দিকের সংখ্যা বিয়োগ করি।", tex: "\\vec A-\\vec B=(2-1)\\hat\\imath+(-3-2)\\hat\\jmath+(6+2)\\hat k=\\hat\\imath-5\\hat\\jmath+8\\hat k" },
    ],
  },
  mistakes: [
    "একক ভেক্টর বানাতে মান দিয়ে ভাগ না করে যোগ করে ফেলা।",
    "মান বের করতে ঋণাত্মক সংখ্যা আলাদা করে বর্গ না করা। (−3)² = 9, −9 নয়।",
    "î, ĵ, k̂ কে সাধারণ সংখ্যা ভেবে মিশিয়ে যোগ করা। î-এর সাথে ĵ-এর সংখ্যা যোগ হয় না।",
    "দুই মাত্রার প্রশ্নে z-এর পদ জোর করে বসানো।",
  ],
  recap: [
    "î, ĵ, k̂ হলো x, y, z অক্ষ বরাবর একক ভেক্টর। প্রত্যেকের মান 1।",
    "ভেক্টর = (x অংশ) î + (y অংশ) ĵ + (z অংশ) k̂।",
    "মান: সব অংশের বর্গের যোগফলের বর্গমূল।",
    "A-এর দিকে একক ভেক্টর = A ÷ A-এর মান। যোগ-বিয়োগ করতে হয় একই দিকের অংশ ধরে।",
  ],
  think: {
    scenario: "একটা শহরের রাস্তাগুলো পূর্ব-পশ্চিম আর উত্তর-দক্ষিণে সোজা সাজানো। একটা দোকান পূর্বে 3 ব্লক আর উত্তরে 4 ব্লক দূরে। এক পথচারী বলল, 'দোকানটা ওই দিকে সোজা 5 ব্লক।'",
    points: [
      "দুজনের কথা কি একই জায়গা বোঝায়? 3 আর 4 থেকে 5 কীভাবে এল?",
      "শুধু 'ওই দিকটা' বোঝাতে কেমন ভেক্টর লাগবে? তার মান কত হওয়া উচিত?",
      "দুটো দোকানের অবস্থান ভেক্টর যোগ করতে চাইলে কীভাবে করবে: দিক ধরে ধরে, নাকি শুধু মান ধরে?",
      "ভবনে ওপরতলায়ও উঠতে হলে আর কোন একক ভেক্টর লাগবে? মানের সূত্রে কী বাড়বে?",
    ],
    hint: "একক ভেক্টর শুধু দিক দেখায়, তার মান 1। একই দিকের উপাংশ আলাদা আলাদা যোগ হয়, ভিন্ন দিকের সংখ্যা মেশানো যায় না। ত্রিমাত্রায় z-এর বর্গও যোগ হয়।",
    traps: [
      "একক ভেক্টর বানাতে ভেক্টরকে মান দিয়ে ভাগ না করে যোগ করা যায়।",
      "(−3)² এর মান −9।",
      "î-এর সংখ্যার সাথে ĵ-এর সংখ্যা মিশিয়ে যোগ করা যায়।",
      "দুই মাত্রার প্রশ্নেও z-এর পদ বসাতে হয়।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = 2î − 3ĵ + 6k̂ এবং B⃗ = î + 2ĵ − 2k̂। A⃗-এর মান, A⃗-এর দিকে একক ভেক্টর এবং A⃗ + B⃗, A⃗ − B⃗ বের করো।",
      hint: "মান = তিন উপাংশের বর্গের যোগফলের বর্গমূল।",
      steps: [
        { text: "মান বের করি।", tex: "A=\\sqrt{2^2+(-3)^2+6^2}=\\sqrt{49}=7" },
        { text: "মান দিয়ে ভাগ করলে একক ভেক্টর পাই।", tex: "\\hat A=\\frac{2\\hat\\imath-3\\hat\\jmath+6\\hat k}{7}" },
        { text: "যোগ: একই দিকের সংখ্যা যোগ করি।", tex: "\\vec A+\\vec B=3\\hat\\imath-\\hat\\jmath+4\\hat k" },
        { text: "বিয়োগ: একই দিকের সংখ্যা বিয়োগ করি।", tex: "\\vec A-\\vec B=\\hat\\imath-5\\hat\\jmath+8\\hat k" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A⃗ = 3î + 4ĵ এবং B⃗ = −î + 2ĵ হলে 2A⃗ − B⃗ এবং তার মান বের করো।",
      hint: "আগে 2A⃗ বের করো, তারপর B⃗ বিয়োগ করো।",
      steps: [
        { text: "2A⃗ বের করি।", tex: "2\\vec A=6\\hat\\imath+8\\hat\\jmath" },
        { text: "এবার B⃗ বিয়োগ করি। একই দিকের সংখ্যা ধরে।", tex: "2\\vec A-\\vec B=(6+1)\\hat\\imath+(8-2)\\hat\\jmath=7\\hat\\imath+6\\hat\\jmath" },
        { text: "মান বের করি।", tex: "|2\\vec A-\\vec B|=\\sqrt{7^2+6^2}=\\sqrt{85}=9.22" },
      ],
    },
    {
      level: "কঠিন",
      q: "x-এর কোন মানের জন্য A⃗ = xî + 3ĵ + 4k̂ ভেক্টরের মান 13?",
      hint: "মান 13 মানে মানের বর্গ 169।",
      steps: [
        { text: "মানের বর্গ লিখি।", tex: "x^2+3^2+4^2=13^2" },
        { text: "সাজিয়ে x² বের করি।", tex: "x^2+25=169\\Rightarrow x^2=144" },
        { text: "বর্গমূল নিই। ধনাত্মক ও ঋণাত্মক দুটোই সম্ভব।", tex: "x=\\pm12" },
        { text: "উত্তর: x = 12 অথবা x = −12।" },
      ],
    },
  ],
  concepts: [
    "î, ĵ, k̂ কেন পরস্পর লম্ব রাখা হয়? লম্ব না হলে উপাংশ বের করতে কী অসুবিধা হতো?",
    "একক ভেক্টরের কি মিটারের মতো কোনো ভৌত একক থাকে? কেন বা কেন নয়?",
    "দুটি ভেক্টর একই দিকে থাকলে তাদের একক ভেক্টরের মধ্যে কী সম্পর্ক? উল্টো দিকে থাকলে?",
  ],
  quiz: [
    { q: "একক ভেক্টরের মান কত?", options: ["0", "1", "10", "যেকোনো সংখ্যা"], answer: 1, why: "একক ভেক্টরের মান সংজ্ঞা অনুযায়ী ঠিক 1।" },
    { q: "6î + 8ĵ-এর মান কত?", options: ["14", "10", "48", "2"], answer: 1, why: "√(6² + 8²) = √100 = 10। 14 হলো সরাসরি যোগ করার ভুল।" },
    { q: "3î + 4ĵ-এর দিকে একক ভেক্টর কোনটি?", options: ["3î + 4ĵ", "(3î + 4ĵ)/5", "(3î + 4ĵ)/7", "(3î + 4ĵ)/25"], answer: 1, why: "মান 5, তাই 5 দিয়ে ভাগ করতে হয়।" },
    { q: "A⃗ = 2î + 3ĵ এবং B⃗ = î − ĵ হলে A⃗ + B⃗ কত?", options: ["3î + 2ĵ", "3î + 4ĵ", "î + 4ĵ", "2î + 3ĵ"], answer: 0, why: "î-এর সংখ্যা 2 + 1 = 3, ĵ-এর সংখ্যা 3 − 1 = 2।" },
    { q: "A⃗ = 3î − 4ĵ হলে Â-এর ĵ উপাংশ কত?", options: ["−4", "−0.8", "0.8", "−4/3"], answer: 1, why: "Â = (3î − 4ĵ) ÷ 5, তাই ĵ-এর সহগ −4/5 = −0.8। −4 হলো A⃗-এর নিজের উপাংশ।" },
  ],
};

const U = 40;
const O = pt(60, 230);
const at = (x: number, y: number) => pt(O.x + x * U, O.y - y * U);

function Grid() {
  return (
    <g opacity={0.35}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`v${i}`} x1={O.x + i * U} y1={O.y} x2={O.x + i * U} y2={O.y - 4 * U} strokeWidth={1} style={{ stroke: col.m }} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`h${i}`} x1={O.x} y1={O.y - i * U} x2={O.x + 4 * U} y2={O.y - i * U} strokeWidth={1} style={{ stroke: col.m }} />
      ))}
    </g>
  );
}

export default function Anim() {
  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ব্লক ধরে হাঁটা",
            text: (
              <>
                দোকানটা <C k="p">পূর্বে 3 ব্লক</C> আর <C k="q">উত্তরে 4 ব্লক</C> দূরে। সোজা কত ব্লক দূরে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["7", "5", "12"]} answer={1} picked={g.picks[0]} onPick={g.pick(0)} explain="পূর্ব আর উত্তর পরস্পর লম্ব, তাই পিথাগোরাস: √(3² + 4²) = 5 ব্লক।" />,
            figure: () => {
              const done = g.picks[0] !== undefined;
              return (
                <Stage w={440} h={260} label="পূর্বে 3 আর উত্তরে 4 ব্লক">
                  <Grid />
                  <Vec a={at(0, 0)} b={at(3, 0)} c="p" w={4} />
                  <Vec a={at(3, 0)} b={at(3, 4)} c="q" w={4} />
                  <Vec a={at(0, 0)} b={done ? at(3, 4) : at(0, 0)} c="r" w={5} show={done} />
                  <Dot p={at(0, 0)} c="f" r={5} />
                  <Lab p={add(mid(at(0, 0), at(3, 0)), 0, 20)} c="p">3 ব্লক</Lab>
                  <Lab p={add(mid(at(3, 0), at(3, 4)), 14, 0)} c="q" anchor="start">4 ব্লক</Lab>
                  <Lab p={add(mid(at(0, 0), at(3, 4)), -12, -8)} c="r" anchor="end" show={done}>5 ব্লক</Lab>
                </Stage>
              );
            },
          },
          {
            title: "দিক দেখানোর একক",
            text: (
              <>
                পূর্বে ঠিক 1 ব্লকের তীরকে বলি <C k="p">î</C>, উত্তরে ঠিক 1 ব্লকের তীরকে বলি <C k="q">ĵ</C>। এদের মান 1, এরাই একক ভেক্টর। ওপরের দিকের জন্য আছে k̂।
              </>
            ),
            replay: true,
            figure: (phase) => (
              <Stage w={440} h={260} label="একক ভেক্টর î আর ĵ">
                <Grid />
                <Vec a={at(0, 0)} b={phase === 1 ? at(1, 0) : at(0, 0)} c="p" w={5} />
                <Vec a={at(0, 0)} b={phase === 1 ? at(0, 1) : at(0, 0)} c="q" w={5} />
                <Dot p={at(0, 0)} c="f" r={5} />
                <Lab p={add(at(0.5, 0), 0, 22)} c="p" show={phase === 1}>î</Lab>
                <Lab p={add(at(0, 0.5), -14, 0)} c="q" anchor="end" show={phase === 1}>ĵ</Lab>
              </Stage>
            ),
          },
          {
            title: "î আর ĵ জোড়া দাও",
            text: (
              <>
                3 ব্লক পূর্বে মানে 3 গুণ î, 4 ব্লক উত্তরে মানে 4 গুণ ĵ। দুটো জোড়া দিলে পুরো ভেক্টর A।
              </>
            ),
            tex: ["\\vec A=3\\hat\\imath+4\\hat\\jmath"],
            replay: true,
            figure: (phase) => (
              <Stage w={440} h={260} label="3î আর 4ĵ জোড়া দিয়ে A">
                <Grid />
                <Vec a={at(0, 0)} b={at(3, 0)} c="p" w={4} />
                <Vec a={at(3, 0)} b={phase === 1 ? at(3, 4) : at(3, 0)} c="q" w={4} />
                <Vec a={at(0, 0)} b={phase === 1 ? at(3, 4) : at(0, 0)} c="r" w={5} show={phase === 1} />
                <Dot p={at(0, 0)} c="f" r={5} />
                <Lab p={add(mid(at(0, 0), at(3, 0)), 0, 20)} c="p">3î</Lab>
                <Lab p={add(mid(at(3, 0), at(3, 4)), 14, 0)} c="q" anchor="start" show={phase === 1}>4ĵ</Lab>
                <Lab p={add(mid(at(0, 0), at(3, 4)), -12, -8)} c="r" anchor="end" show={phase === 1}>A</Lab>
              </Stage>
            ),
          },
          {
            title: "একক ভেক্টর বানাও",
            text: (
              <>
                A-এর মান 5। A-কে 5 দিয়ে ভাগ করলে A-এর দিকের একক ভেক্টর Â পাই। Â-এর মান কত হবে?
              </>
            ),
            tex: ["A=\\sqrt{3^2+4^2}=5", "\\hat A=\\dfrac{3\\hat\\imath+4\\hat\\jmath}{5}=0.6\\hat\\imath+0.8\\hat\\jmath"],
            locked: g.picks[3] === undefined,
            prompt: <Choices options={["0.6", "1", "5"]} answer={1} picked={g.picks[3]} onPick={g.pick(3)} explain="একক ভেক্টরের মান সব সময় ঠিক 1। শুধু দিক A-এর মতো, তাই মাথা একক বৃত্তের ওপর পড়ে।" />,
            figure: () => {
              const done = g.picks[3] !== undefined;
              return (
                <Stage w={440} h={260} label="A আর তার একক ভেক্টর Â">
                  <circle cx={O.x} cy={O.y} r={U} fill="none" strokeWidth={1.5} strokeDasharray="5 5" style={{ stroke: col.m }} />
                  <Vec a={at(0, 0)} b={at(3, 4)} c="r" w={4} />
                  <Vec a={at(0, 0)} b={done ? at(0.6, 0.8) : at(0, 0)} c="v" w={5} show={done} />
                  <Dot p={at(0, 0)} c="f" r={5} />
                  <Lab p={add(mid(at(0, 0), at(3, 4)), 14, 0)} c="r" anchor="start">A, মান = 5</Lab>
                  <Lab p={add(at(0.6, 0.8), 14, 8)} c="v" anchor="start" show={done}>Â, মান = 1</Lab>
                </Stage>
              );
            },
          },
          {
            title: "উপাংশ ধরে যোগ",
            text: (
              <>
                A = 3î + 4ĵ আর B = 2î + ĵ যোগ করলে î-এর সংখ্যা কত হবে?
              </>
            ),
            locked: g.picks[4] === undefined,
            prompt: <Choices options={["5", "6", "3"]} answer={0} picked={g.picks[4]} onPick={g.pick(4)} explain="একই দিকের সংখ্যা যোগ হয়: 3 + 2 = 5, 4 + 1 = 5। তাই A + B = 5î + 5ĵ।" />,
            figure: () => {
              const done = g.picks[4] !== undefined;
              return (
                <Stage w={440} h={260} label="উপাংশ ধরে যোগ">
                  <Vec a={at(0, 0)} b={at(3, 4)} c="p" w={4} />
                  <Vec a={at(3, 4)} b={at(5, 5)} c="q" w={4} />
                  <Vec a={at(0, 0)} b={done ? at(5, 5) : at(0, 0)} c="r" w={5} show={done} />
                  <Dot p={at(0, 0)} c="f" r={5} />
                  <Lab p={add(mid(at(0, 0), at(3, 4)), -12, 0)} c="p" anchor="end">A</Lab>
                  <Lab p={add(mid(at(3, 4), at(5, 5)), 6, -12)} c="q" anchor="start">B</Lab>
                  <Lab p={add(mid(at(0, 0), at(5, 5)), 16, 12)} c="r" anchor="start" show={done}>A + B = 5î + 5ĵ</Lab>
                </Stage>
              );
            },
          },
        ],
        summary: [
          {
            title: "ভেক্টর আর তার মান",
            text: "î, ĵ, k̂ হলো x, y, z অক্ষ বরাবর একক ভেক্টর। উপাংশ থেকে ভেক্টর লেখা যায়, আর তার মান পিথাগোরাস দিয়ে।",
            tex: ["\\vec A=A_x\\hat\\imath+A_y\\hat\\jmath+A_z\\hat k", "A=\\sqrt{A_x^2+A_y^2+A_z^2}"],
          },
          {
            title: "একক ভেক্টর আর যোগ-বিয়োগ",
            text: "একক ভেক্টর পেতে নিজের মান দিয়ে ভাগ করো। যোগ-বিয়োগ হয় একই দিকের সংখ্যা ধরে।",
            tex: ["\\hat A=\\dfrac{\\vec A}{A}", "\\vec A\\pm\\vec B=(A_x\\pm B_x)\\hat\\imath+(A_y\\pm B_y)\\hat\\jmath+(A_z\\pm B_z)\\hat k"],
          },
        ],
      })}
    />
  );
}
