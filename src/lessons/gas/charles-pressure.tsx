"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { GasBox } from "@/components/anim/gas";
import { Dot, Lab, Seg, Stage, Vec, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ধ্রুব চাপে গরম করলে আয়তন, আর ধ্রুব আয়তনে গরম করলে চাপ কেন বাড়ে বুঝবে এবং V/T ও P/T সূত্রে অঙ্ক করতে পারবে।",
  hook: "ঠান্ডা ঘরে বেলুন একটু চুপসে থাকে, রোদে বা গরমে সে আবার ফুলে ওঠে। তাপমাত্রা আয়তনের সাথে কীভাবে বাঁধা?",
  formulas: [
    { tex: "\\dfrac{V}{T}=\\text{ধ্রুব}", meaning: "চার্লসের সূত্র। চাপ ধ্রুব হলে আয়তন তাপমাত্রার (K) সমানুপাতিক।" },
    { tex: "\\dfrac{P}{T}=\\text{ধ্রুব}", meaning: "চাপের সূত্র। আয়তন ধ্রুব হলে চাপ তাপমাত্রার (K) সমানুপাতিক।" },
  ],
  example: {
    problem: "300 K তাপমাত্রায় 6 L গ্যাসকে ধ্রুব চাপে 450 K-এ গরম করা হলো। নতুন আয়তন কত?",
    steps: [
      { text: "চার্লসের সূত্র।", tex: "\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}" },
      { text: "V2 বের করি।", tex: "V_2=6\\times\\dfrac{450}{300}=9\\ \\text{L}" },
      { text: "উত্তর: 9 L।" },
    ],
  },
  mistakes: [
    "সূত্রে সেলসিয়াস বসানো। T সব সময় কেলভিন।",
    "চার্লসের সূত্রে চাপ বদলাতে দেওয়া। চাপ ধ্রুব থাকতে হবে।",
    "চাপের সূত্রে আয়তন বদলাতে দেওয়া। আয়তন ধ্রুব থাকতে হবে।",
  ],
  recap: [
    "ধ্রুব চাপে গরম করলে অণু দ্রুত ছোটে, পিস্টনকে ঠেলে আয়তন বাড়ায়।",
    "ধ্রুব আয়তনে গরম করলে অণু জোরে আর ঘন ঘন ধাক্কা দেয়, তাই চাপ বাড়ে।",
    "V/T আর P/T দুটোই ধ্রুব। T সব সময় কেলভিনে।",
    "রেখা বাড়ালে আয়তন শূন্য হয় −273°C এ, তাই পরম শূন্য।",
  ],
  think: {
    scenario: "একটা প্লাস্টিকের বোতলে গরম পানি ভরে ঢাকনা আটকে ঠান্ডা করলে বোতল চুপসে যায়।",
    points: [
      "বোতলের ভেতরের বাতাস ঠান্ডা হলে চাপের কী হয়?",
      "বাইরের বাতাসের চাপ সেই তুলনায় কেমন, আর তাই বোতলের কী হয়?",
    ],
    hint: "T কমলে P/T ধ্রুব থাকার জন্য P কী হবে, তা ভাবো।",
    traps: ["ঠান্ডা করলে অণুর সংখ্যা কমে যায়।", "ঠান্ডা করলে চাপ বাড়ে।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "300 K তাপমাত্রায় 6 L গ্যাসকে ধ্রুব চাপে 450 K-এ গরম করা হলো। নতুন আয়তন কত?",
      hint: "V1/T1 = V2/T2।",
      steps: [
        { text: "V2 বের করি।", tex: "V_2=V_1\\dfrac{T_2}{T_1}=6\\times\\dfrac{450}{300}" },
        { text: "উত্তর: 9 L।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "একটি বদ্ধ পাত্রে 27°C তাপমাত্রায় গ্যাসের চাপ 2 atm। পাত্রটিকে 127°C এ গরম করলে চাপ কত হবে?",
      hint: "আগে কেলভিনে যাও। আয়তন ধ্রুব।",
      steps: [
        { text: "কেলভিনে রূপান্তর।", tex: "T_1=27+273=300\\ \\text{K},\\quad T_2=127+273=400\\ \\text{K}" },
        { text: "চাপের সূত্র বসাই।", tex: "P_2=2\\times\\dfrac{400}{300}=2.67\\ \\text{atm}" },
        { text: "উত্তর: 2.67 atm।" },
      ],
    },
    {
      level: "কঠিন",
      q: "27°C তাপমাত্রায় 5 L গ্যাসকে ধ্রুব চাপে এমন তাপমাত্রায় নেওয়া হলো যেখানে আয়তন 6 L হয়। নতুন তাপমাত্রা সেলসিয়াসে কত?",
      hint: "T2 বের করে 273 বিয়োগ করো।",
      steps: [
        { text: "প্রথম তাপমাত্রা কেলভিনে।", tex: "T_1=27+273=300\\ \\text{K}" },
        { text: "চার্লসের সূত্র থেকে T2।", tex: "T_2=T_1\\dfrac{V_2}{V_1}=300\\times\\dfrac{6}{5}=360\\ \\text{K}" },
        { text: "সেলসিয়াসে ফিরি।", tex: "t_2=360-273=87^\\circ\\text{C}" },
        { text: "উত্তর: 87°C। কেলভিনে এটা 360 K।" },
      ],
    },
  ],
  concepts: [
    "V-T গ্রাফের রেখা −273°C এ আয়তন শূন্য দেখায়। সত্যিই কি গ্যাসের আয়তন শূন্য হয়ে যায়?",
    "টায়ারে গরমকালে হাওয়া কম দিতে বলা হয় কেন?",
  ],
  quiz: [
    { q: "চার্লসের সূত্রে কোন রাশি ধ্রুব থাকে?", options: ["আয়তন", "চাপ", "তাপমাত্রা", "অণুর রং"], answer: 1, why: "চার্লসের সূত্রে চাপ ধ্রুব রেখে আয়তন আর তাপমাত্রার সম্পর্ক দেখা হয়।" },
    { q: "300 K এ 6 L গ্যাসকে ধ্রুব চাপে 450 K করলে আয়তন কত?", options: ["4 L", "9 L", "12 L"], answer: 1, why: "V2 = 6 × 450 ÷ 300 = 9 L।" },
    { q: "ধ্রুব আয়তনে তাপমাত্রা দ্বিগুণ (K) করলে চাপ কী হয়?", options: ["অর্ধেক", "একই", "দ্বিগুণ"], answer: 2, why: "P/T ধ্রুব, তাই T দ্বিগুণ হলে P দ্বিগুণ।" },
    { q: "গ্যাসের সূত্রে কোন তাপমাত্রা বসাতে হয়?", options: ["সেলসিয়াস", "ফারেনহাইট", "কেলভিন", "যেকোনোটা"], answer: 2, why: "কেলভিনে শূন্য মানে অণুর গতি শূন্যের কাছে। সমানুপাতিক সম্পর্ক শুধু কেলভিনেই খাটে।" },
    { q: "V-T গ্রাফের রেখা পেছনে বাড়ালে আয়তন কোথায় শূন্য হয়?", options: ["0°C", "−100°C", "−273°C", "−373°C"], answer: 2, why: "−273°C বা 0 K এ। এটাই পরম শূন্য।" },
  ],
};

function VTGraph({ t, point }: { t: number; point: boolean }) {
  const O = pt(60, 220);
  const kx = 0.6;
  const ky = 15;
  const at = (T: number) => pt(O.x + T * kx, O.y - (T / 50) * ky);
  const cur = at(t);
  return (
    <Stage w={440} h={260} label="V-T গ্রাফ, V ÷ T = 1 ÷ 50">
      <Vec a={O} b={pt(430, O.y)} c="m" w={2} />
      <Vec a={O} b={pt(O.x, 36)} c="m" w={2} />
      <Lab p={pt(414, 242)} c="m" anchor="end">T (K)</Lab>
      <Lab p={pt(72, 40)} c="m" anchor="start">V (L)</Lab>
      <Seg a={O} b={at(600)} c="p" w={4} />
      <Dot p={O} c="f" r={5} />
      <Lab p={pt(O.x + 6, O.y + 20)} anchor="start" c="m">0 K</Lab>
      <Seg a={cur} b={pt(cur.x, O.y)} dash c="m" w={1.5} show={point} />
      {point ? <Dot p={cur} c="r" r={7} /> : null}
      <Lab p={pt(cur.x, O.y + 18)} c="r" show={point}>{`${t} K`}</Lab>
      <Lab p={pt(250, 80)} c="p">রেখা 0 K এ গিয়ে আয়তন শূন্য</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [temp, setTemp] = useState(300);
  const vol = temp / 50;
  const sp = 3 * Math.sqrt(temp / 300);

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "বেলুন গরম করলে",
            text: "বেলুনের বাতাস গরম করা হলো। বাইরের চাপ একই। বেলুনের কী হবে?",
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["ফুলবে", "চুপসে যাবে", "একই থাকবে"]}
                answer={0}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="গরমে অণু দ্রুত ছোটে, পিস্টনকে (বেলুনের গা) জোরে ঠেলে। চাপ একই রাখতে আয়তন বাড়ে।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="গরম করলে আয়তন বাড়ে">
                <GasBox n={22} speed={g.picks[0] !== undefined ? 4.5 : 2.5} width={g.picks[0] !== undefined ? 330 : 240} />
              </Stage>
            ),
          },
          {
            title: "তাপমাত্রা বাড়িয়ে দেখো",
            text: (
              <>
                <b>T</b> বদলাও। পিস্টনের ওপর চাপ একই, তাই অণুর গতি বাড়লে <C k="q">পিস্টন সরে</C> যায়।
              </>
            ),
            prompt: (
              <Play
                label="T"
                value={temp}
                min={100}
                max={600}
                step={50}
                suffix=" K"
                onChange={setTemp}
                chips={[100, 300, 450, 600]}
                read={
                  <span>
                    V = <C k="r">{vol.toFixed(0)} L</C>
                  </span>
                }
                note="T যত বাড়ে, V ততটাই অনুপাতে বাড়ে। V ÷ T সব সময় একই থাকে।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="তাপমাত্রা বাড়লে পিস্টন সরে">
                <GasBox n={22} speed={sp} width={vol * 30} showRate={false} />
              </Stage>
            ),
          },
          {
            title: "চার্লসের সূত্র",
            text: (
              <>
                চাপ ধ্রুব হলে <b>V ÷ T ধ্রুব</b>। T অবশ্যই কেলভিনে। 300 K এ 6 L গ্যাসকে 450 K করলে আয়তন কত?
              </>
            ),
            tex: ["\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2}"],
            locked: g.picks[2] === undefined,
            prompt: (
              <Choices
                options={["4 L", "9 L", "12 L"]}
                answer={1}
                picked={g.picks[2]}
                onPick={g.pick(2)}
                explain="V2 = 6 × 450 ÷ 300 = 9 L। T দেড় গুণ, তাই V-ও দেড় গুণ।"
              />
            ),
          },
          {
            title: "রেখা কোথায় মেলে?",
            text: (
              <>
                V-T গ্রাফ সরলরেখা, আর সেটা মূলবিন্দু দিয়ে যায়। অর্থাৎ <b>0 K এ আয়তন শূন্য</b>। সেলসিয়াসে এটাই −273°C। এই তাপমাত্রার নাম পরম শূন্য।
              </>
            ),
            tex: ["0\\ \\text{K}=-273^\\circ\\text{C}"],
            figure: () => <VTGraph t={450} point />,
          },
          {
            title: "বদ্ধ পাত্রে গরম করলে",
            text: "এবার পিস্টন আটকে দেওয়া, আয়তন বদলাবে না। 2 atm, 300 K থেকে 600 K করলে চাপ কত হবে?",
            tex: ["\\dfrac{P_1}{T_1}=\\dfrac{P_2}{T_2}"],
            locked: g.picks[4] === undefined,
            prompt: (
              <Choices
                options={["1 atm", "2 atm", "4 atm"]}
                answer={2}
                picked={g.picks[4]}
                onPick={g.pick(4)}
                explain="P2 = 2 × 600 ÷ 300 = 4 atm। T দ্বিগুণ, তাই P দ্বিগুণ। একে চাপের সূত্র বলে।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="আয়তন ধ্রুব রেখে গরম করলে চাপ বাড়ে">
                <GasBox n={22} speed={g.picks[4] !== undefined ? 4.2 : 3} width={200} />
              </Stage>
            ),
          },
        ],
        summary: [
          {
            title: "দুটি সূত্র",
            text: "ধ্রুব চাপে আয়তন, আর ধ্রুব আয়তনে চাপ, দুটোই কেলভিন তাপমাত্রার সমানুপাতিক।",
            tex: ["\\dfrac{V}{T}=\\text{ধ্রুব}", "\\dfrac{P}{T}=\\text{ধ্রুব}"],
          },
        ],
      })}
    />
  );
}
