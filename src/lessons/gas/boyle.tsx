"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { GasBox } from "@/components/anim/gas";
import { Dot, Lab, Seg, Stage, Vec, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "তাপমাত্রা ধ্রুব রেখে আয়তন কমালে চাপ কেন বাড়ে বুঝবে এবং PV = ধ্রুব সূত্র দিয়ে অঙ্ক করতে পারবে।",
  hook: "সাইকেলের পাম্পের মুখ আঙুলে চেপে হাতল ঠেললে ভেতরে প্রতিরোধ বাড়ে। আয়তন কমছে, আর চাপ বাড়ছে।",
  formulas: [
    { tex: "PV=\\text{ধ্রুব}", meaning: "তাপমাত্রা আর অণুর সংখ্যা ধ্রুব থাকলে চাপ ও আয়তনের গুণফল একই থাকে।" },
    { tex: "P_1V_1=P_2V_2", meaning: "আগের অবস্থা আর পরের অবস্থার সম্পর্ক।" },
  ],
  example: {
    problem: "2 atm চাপে 6 L গ্যাসকে ধ্রুব তাপমাত্রায় 3 L-এ চাপা হলো। নতুন চাপ কত?",
    steps: [
      { text: "বয়েলের সূত্র বসাই।", tex: "P_1V_1=P_2V_2" },
      { text: "P2 বের করি।", tex: "P_2=\\dfrac{2\\times6}{3}=4\\ \\text{atm}" },
      { text: "উত্তর: 4 atm। আয়তন অর্ধেক হওয়ায় চাপ দ্বিগুণ।" },
    ],
  },
  mistakes: [
    "তাপমাত্রা বদলে গেলেও বয়েলের সূত্র লাগানো। সূত্র শুধু ধ্রুব তাপমাত্রায় খাটে।",
    "আয়তন কমলে চাপও কমে ভাবা। আসলে উল্টো, একটা বাড়লে আরেকটা কমে।",
    "P1V1 = P2V2 তে একক মেলানো ভুলে যাওয়া। দুই পাশে একই একক রাখো।",
  ],
  recap: [
    "আয়তন কমলে অণু কম জায়গায় বেশি বার দেয়ালে ধাক্কা দেয়, তাই চাপ বাড়ে।",
    "তাপমাত্রা আর অণুর সংখ্যা ধ্রুব হলে PV ধ্রুব।",
    "P-V গ্রাফ একটা বাঁকা রেখা (পরাবৃত্ত)। একটা বাড়লে অন্যটা কমে।",
    "অঙ্কে P1V1 = P2V2 ব্যবহার করো।",
  ],
  think: {
    scenario: "ডুবুরির মুখ থেকে বের হওয়া ছোট বুদবুদ পানির নিচে থাকে ছোট, কিন্তু ওপরে উঠতে উঠতে বড় হয়। ওপরে পানির চাপ কম।",
    points: [
      "ওপরে ওঠার সময় বুদবুদের চারপাশের চাপ কমে। বুদবুদের আয়তন কেন বাড়ে?",
      "ডুবুরি যদি দম আটকে দ্রুত ওপরে ওঠে, ফুসফুসের গ্যাসের কী হতে পারে?",
    ],
    hint: "ধরো তাপমাত্রা একই। P বাড়লে V কমে, তাহলে P কমলে V কী হবে?",
    traps: ["চাপ কমলে গ্যাসের আয়তনও কমে।", "বয়েলের সূত্রে তাপমাত্রা বদলাতে পারে।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "2 atm চাপে 6 L গ্যাসকে ধ্রুব তাপমাত্রায় 3 L-এ চাপা হলো। নতুন চাপ কত?",
      hint: "P1V1 = P2V2।",
      steps: [
        { text: "সূত্র বসাই।", tex: "P_2=\\dfrac{P_1V_1}{V_2}=\\dfrac{2\\times6}{3}" },
        { text: "উত্তর: 4 atm।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "1 atm চাপে 10 L গ্যাসের চাপ ধ্রুব তাপমাত্রায় 4 atm করা হলো। নতুন আয়তন কত?",
      hint: "এবার V2 বের করতে হবে।",
      steps: [
        { text: "সূত্র থেকে V2।", tex: "V_2=\\dfrac{P_1V_1}{P_2}=\\dfrac{1\\times10}{4}" },
        { text: "উত্তর: 2.5 L। চাপ 4 গুণ হওয়ায় আয়তন এক-চতুর্থাংশ।" },
      ],
    },
    {
      level: "কঠিন",
      q: "একটি 4 L সিলিন্ডারে 3 atm চাপে গ্যাস আছে। 1 atm চাপে প্রতিটি 2 L-এর কয়টি বেলুন ভরা যাবে? (ধ্রুব তাপমাত্রা, সিলিন্ডারে 1 atm গ্যাস থেকে যাবে)",
      hint: "আগে 1 atm এ সব গ্যাসের মোট আয়তন বের করো, তারপর সিলিন্ডারে থাকা অংশ বাদ দাও।",
      steps: [
        { text: "1 atm এ মোট গ্যাসের আয়তন।", tex: "V=\\dfrac{3\\times4}{1}=12\\ \\text{L}" },
        { text: "সিলিন্ডার নিজেই 4 L জায়গা দখল করে থাকবে। বেলুনের জন্য পাওয়া যাবে:", tex: "12-4=8\\ \\text{L}" },
        { text: "প্রতিটি বেলুন 2 L।", tex: "\\dfrac{8}{2}=4" },
        { text: "উত্তর: 4টি বেলুন।" },
      ],
    },
  ],
  concepts: [
    "P আর V এর গুণফল ধ্রুব হলে P-V গ্রাফ সরলরেখা হয় না কেন?",
    "পিস্টন দ্রুত চাপলে তাপমাত্রা একটু বেড়ে যায়। তখন বয়েলের সূত্র কেন ঠিকঠাক খাটে না?",
  ],
  quiz: [
    { q: "বয়েলের সূত্র কোন শর্তে খাটে?", options: ["ধ্রুব চাপ", "ধ্রুব তাপমাত্রা", "ধ্রুব আয়তন", "যেকোনো শর্তে"], answer: 1, why: "বয়েলের সূত্রে তাপমাত্রা আর অণুর সংখ্যা ধ্রুব থাকে। তখন PV ধ্রুব।" },
    { q: "আয়তন অর্ধেক করলে চাপ কী হয় (ধ্রুব তাপমাত্রা)?", options: ["অর্ধেক", "একই", "দ্বিগুণ", "চার গুণ"], answer: 2, why: "PV ধ্রুব, তাই V অর্ধেক হলে P দ্বিগুণ।" },
    { q: "12 atm·L ধ্রুবক হলে V = 4 L এ চাপ কত?", options: ["3 atm", "8 atm", "16 atm", "48 atm"], answer: 0, why: "P = 12 ÷ 4 = 3 atm।" },
    { q: "P-V গ্রাফের আকৃতি কেমন?", options: ["সরলরেখা", "বাঁকা রেখা (পরাবৃত্ত)", "বৃত্ত", "উল্লম্ব রেখা"], answer: 1, why: "PV ধ্রুব মানে P = k ÷ V, যার গ্রাফ বাঁকা। একটা বাড়লে অন্যটা কমে।" },
    { q: "2 atm এ 6 L গ্যাস 3 L হলে নতুন চাপ কত?", options: ["1 atm", "4 atm", "6 atm", "9 atm"], answer: 1, why: "P2 = (2 × 6) ÷ 3 = 4 atm।" },
  ],
};

function PVGraph({ v, point }: { v: number; point: boolean }) {
  const O = pt(60, 220);
  const kx = 36;
  const ky = 24;
  const at = (V: number) => pt(O.x + V * kx, O.y - (12 / V) * ky);
  const d = Array.from({ length: 17 }, (_, i) => {
    const p = at(2 + i * 0.5);
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join("");
  const cur = at(v);
  return (
    <Stage w={440} h={260} label="P-V গ্রাফ, PV = 12">
      <Vec a={O} b={pt(430, O.y)} c="m" w={2} />
      <Vec a={O} b={pt(O.x, 36)} c="m" w={2} />
      <Lab p={pt(414, 242)} c="m" anchor="end">V (L)</Lab>
      <Lab p={pt(72, 40)} c="m" anchor="start">P (atm)</Lab>
      <path d={d} fill="none" strokeWidth={4} strokeLinecap="round" style={{ stroke: col.p }} />
      <Seg a={cur} b={pt(cur.x, O.y)} dash c="m" w={1.5} show={point} />
      <Seg a={cur} b={pt(O.x, cur.y)} dash c="m" w={1.5} show={point} />
      {point ? <Dot p={cur} c="r" r={7} /> : null}
      <Lab p={pt(cur.x, O.y + 18)} c="r" show={point}>{`${v}`}</Lab>
      <Lab p={pt(O.x - 8, cur.y + 4)} c="r" anchor="end" show={point}>{`${(12 / v).toFixed(v === 4 ? 0 : 1)}`}</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [vol, setVol] = useState(6);
  const pres = 12 / vol;

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "পিস্টন অর্ধেক চাপলে",
            text: "অণুর সংখ্যা আর তাপমাত্রা একই। পিস্টন চেপে আয়তন অর্ধেক করলে দেয়ালে ধাক্কার হার কী হবে?",
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["অর্ধেক", "একই", "দ্বিগুণ"]}
                answer={2}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="কম জায়গায় অণুগুলো দ্রুত দেয়ালে ফিরে আসে, তাই ধাক্কার হার প্রায় দ্বিগুণ হয়। চাপও দ্বিগুণ।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="পিস্টন চাপলে ধাক্কার হার বাড়ে">
                <GasBox n={26} speed={3} width={g.picks[0] !== undefined ? 150 : 300} />
              </Stage>
            ),
          },
          {
            title: "কেন চাপ বাড়ে?",
            text: (
              <>
                জায়গা ছোট হলে অণুকে একই দেয়ালে ফিরে আসতে কম পথ যেতে হয়। ফলে <C k="r">ধাক্কা ঘন ঘন</C> হয়। নিচের ধাক্কার সংখ্যা মিলিয়ে দেখো।
              </>
            ),
            replay: true,
            figure: (phase) => (
              <Stage w={440} h={260} label="আয়তন কমলে চাপ বাড়ে">
                <GasBox n={26} speed={3} width={phase === 1 ? 150 : 300} />
              </Stage>
            ),
          },
          {
            title: "আয়তন বদলে দেখো",
            text: (
              <>
                <b>V</b> বদলাও আর <C k="r">P × V</C> লক্ষ করো।
              </>
            ),
            prompt: (
              <Play
                label="V"
                value={vol}
                min={2}
                max={10}
                suffix=" L"
                onChange={setVol}
                chips={[2, 4, 6, 10]}
                read={
                  <>
                    <span>
                      P = <C k="r">{pres.toFixed(2)} atm</C>
                    </span>
                    <span>P × V = 12</span>
                  </>
                }
                note="আয়তন যতই বদলাও, চাপ আর আয়তনের গুণফল একই থাকে।"
              />
            ),
            figure: () => (
              <Stage w={440} h={260} label="আয়তনের সাথে চাপের সম্পর্ক">
                <GasBox n={26} speed={3} width={vol * 30} showRate={false} />
              </Stage>
            ),
          },
          {
            title: "P-V গ্রাফ",
            text: "V = 4 L হলে চাপ কত? গ্রাফে বিন্দুটা কোথায় পড়বে ভেবে বলো।",
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["3 atm", "8 atm", "48 atm"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="P = 12 ÷ 4 = 3 atm। গ্রাফটা সরলরেখা নয়, বাঁকা। একটা বাড়লে অন্যটা কমে।"
              />
            ),
            figure: () => <PVGraph v={4} point={g.picks[3] !== undefined} />,
          },
          {
            title: "বয়েলের সূত্র",
            text: (
              <>
                তাপমাত্রা আর অণুর সংখ্যা ধ্রুব হলে <b>PV ধ্রুব</b>। তাই আগের আর পরের অবস্থা মেলানো যায়। 2 atm, 6 L গ্যাসকে 3 L করলে নতুন চাপ কত?
              </>
            ),
            tex: ["P_1V_1=P_2V_2"],
            locked: g.picks[4] === undefined,
            prompt: (
              <Choices
                options={["1 atm", "4 atm", "6 atm"]}
                answer={1}
                picked={g.picks[4]}
                onPick={g.pick(4)}
                explain="P2 = (2 × 6) ÷ 3 = 4 atm। আয়তন অর্ধেক, তাই চাপ দ্বিগুণ।"
              />
            ),
          },
        ],
        summary: [
          {
            title: "বয়েলের সূত্র",
            text: "ধ্রুব তাপমাত্রায় নির্দিষ্ট পরিমাণ গ্যাসের চাপ আর আয়তন একটা বাড়লে অন্যটা কমে।",
            tex: ["PV=\\text{ধ্রুব}", "P_1V_1=P_2V_2"],
          },
        ],
      })}
    />
  );
}
