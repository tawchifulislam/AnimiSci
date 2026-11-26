"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, pt, type Built } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Stage, Vec } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "স্বাধীনতার মাত্রা কাকে বলে বুঝবে, এক, দ্বি ও ত্রি-পরমাণুক অণুর মাত্রা বলতে পারবে এবং সমবিভাজন নীতি দিয়ে অভ্যন্তরীণ শক্তি বের করতে পারবে।",
  hook: "হিলিয়ামের অণু বিন্দুর মতো, শুধু ছুটতে পারে। নাইট্রোজেনের অণু ছুটতেও পারে, লাটিমের মতো ঘুরতেও পারে। তাহলে কার ভেতরে বেশি শক্তি জমে?",
  formulas: [
    { tex: "f_{\\text{এক}}=3,\\quad f_{\\text{দ্বি}}=5,\\quad f_{\\text{ত্রি}}=6", meaning: "ঘরের তাপমাত্রায় স্বাধীনতার মাত্রা। ত্রি-পরমাণুক বলতে এখানে বাঁকা অণু (যেমন পানির বাষ্প)।" },
    { tex: "E=\\dfrac f2kT", meaning: "সমবিভাজন নীতি: প্রতি মাত্রায় গড়ে ½kT শক্তি।" },
    { tex: "U=\\dfrac f2nRT", meaning: "n মোল আদর্শ গ্যাসের অভ্যন্তরীণ শক্তি।" },
  ],
  example: {
    problem: "300 K তাপমাত্রায় 2 mol হিলিয়ামের অভ্যন্তরীণ শক্তি কত?",
    steps: [
      { text: "হিলিয়াম এক-পরমাণুক, তাই f = 3।", tex: "U=\\dfrac32nRT=1.5\\times2\\times8.314\\times300" },
      { text: "উত্তর: 7483 J।" },
    ],
  },
  mistakes: [
    "সব অণুর f সমান ভাবা। এক-পরমাণুকে 3, দ্বি-পরমাণুকে 5, ত্রি-পরমাণুকে 6।",
    "এক-পরমাণুকেও ঘূর্ণন ধরা। বিন্দুর মতো পরমাণুর ঘূর্ণন ধরা হয় না।",
    "U কে আয়তনের ওপর নির্ভর করে ভাবা। আদর্শ গ্যাসে U শুধু T আর n এর ওপর নির্ভর করে।",
  ],
  recap: [
    "স্বাধীনতার মাত্রা মানে শক্তি জমানোর স্বাধীন উপায়ের সংখ্যা।",
    "এক-পরমাণুক 3, দ্বি-পরমাণুক 5, ত্রি-পরমাণুক (বাঁকা) 6।",
    "সমবিভাজন নীতিতে প্রতি মাত্রায় ½kT।",
    "n মোল গ্যাসের অভ্যন্তরীণ শক্তি U = (f/2)nRT।",
  ],
  think: {
    scenario: "দুটি আলাদা বদ্ধ পাত্রে 1 mol করে হিলিয়াম আর 1 mol নাইট্রোজেন আছে। দুটোই 400 K তাপমাত্রায়।",
    points: [
      "কোন পাত্রের গ্যাসে মোট শক্তি বেশি আর কেন?",
      "দুই গ্যাসকে 1 K বাড়াতে কার বেশি তাপ লাগবে?",
    ],
    hint: "দুই গ্যাসেই প্রতি মাত্রায় ½kT। কার মাত্রা বেশি?",
    traps: ["একই তাপমাত্রায় সব গ্যাসের মোট শক্তি সমান।", "ঘূর্ণন শক্তি তাপমাত্রার ওপর নির্ভর করে না।"],
  },
  problems: [
    {
      level: "সহজ",
      q: "400 K তাপমাত্রায় 1 mol হিলিয়ামের অভ্যন্তরীণ শক্তি কত?",
      hint: "হিলিয়াম এক-পরমাণুক, f = 3।",
      steps: [
        { text: "সূত্রে বসাই।", tex: "U=\\dfrac32\\times1\\times8.314\\times400" },
        { text: "উত্তর: 4988 J।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "400 K তাপমাত্রায় 1 mol নাইট্রোজেনের অভ্যন্তরীণ শক্তি কত?",
      hint: "নাইট্রোজেন দ্বি-পরমাণুক, f = 5।",
      steps: [
        { text: "সূত্রে বসাই।", tex: "U=\\dfrac52\\times1\\times8.314\\times400" },
        { text: "উত্তর: 8314 J। একই T তে হিলিয়ামের চেয়ে বেশি।" },
      ],
    },
    {
      level: "কঠিন",
      q: "400 K তাপমাত্রায় 2 mol পানির বাষ্পের (বাঁকা অণু) অভ্যন্তরীণ শক্তি কত?",
      hint: "বাঁকা ত্রি-পরমাণুক অণুর f = 6।",
      steps: [
        { text: "সূত্রে বসাই।", tex: "U=\\dfrac62\\times2\\times8.314\\times400" },
        { text: "উত্তর: প্রায় 19954 J।" },
      ],
    },
  ],
  concepts: [
    "খুব উচ্চ তাপমাত্রায় দ্বি-পরমাণুক অণুর কম্পনও যোগ হয়। তখন f কত হতে পারে?",
    "একই তাপমাত্রায় কম গ্যাসের তাপ ধারণক্ষমতা কেন গ্যাস অনুযায়ী আলাদা?",
  ],
  quiz: [
    { q: "হিলিয়ামের স্বাধীনতার মাত্রা কত?", options: ["1", "3", "5", "6"], answer: 1, why: "এক-পরমাণুক অণু শুধু x, y, z দিকে সরতে পারে। তাই f = 3।" },
    { q: "নাইট্রোজেনের (দ্বি-পরমাণুক) f কত?", options: ["3", "5", "6", "7"], answer: 1, why: "3 টি স্থানান্তর আর 2 টি ঘূর্ণন, মোট 5।" },
    { q: "সমবিভাজন নীতিতে প্রতি স্বাধীনতার মাত্রায় গড় শক্তি কত?", options: ["kT", "½kT", "3kT", "2kT"], answer: 1, why: "প্রতি মাত্রায় গড়ে ½kT।" },
    { q: "1 mol হিলিয়ামের U এর সূত্র কোনটি?", options: ["½RT", "(3/2)RT", "(5/2)RT", "3RT"], answer: 1, why: "f = 3, তাই U = (3/2)RT।" },
    { q: "আদর্শ গ্যাসের অভ্যন্তরীণ শক্তি কিসের ওপর নির্ভর করে?", options: ["P আর V", "শুধু T (ও n)", "শুধু V", "শুধু P"], answer: 1, why: "আদর্শ গ্যাসে অণুদের মধ্যে টান নেই, তাই শক্তি শুধু গতি থেকে আসে। সেটা T আর n এর ওপর নির্ভর করে।" },
  ],
};

type Kind = "mono" | "di" | "tri";

const info: Record<Kind, { name: string; f: number }> = {
  mono: { name: "এক-পরমাণুক (He)", f: 3 },
  di: { name: "দ্বি-পরমাণুক (N2)", f: 5 },
  tri: { name: "ত্রি-পরমাণুক (H2O)", f: 6 },
};

function Molecule({ kind, spin }: { kind: Kind; spin: boolean }) {
  const O = pt(250, 130);
  const atoms = kind === "mono" ? [O] : kind === "di" ? [pt(226, 130), pt(274, 130)] : [pt(250, 108), pt(224, 150), pt(276, 150)];
  const bonds = kind === "di" ? [[atoms[0], atoms[1]]] : kind === "tri" ? [[atoms[0], atoms[1]], [atoms[0], atoms[2]]] : [];
  return (
    <Stage w={440} h={260} label={`${info[kind].name} অণুর স্বাধীনতার মাত্রা`}>
      <Vec a={pt(40, 60)} b={pt(100, 60)} c="p" w={3} />
      <Vec a={pt(40, 60)} b={pt(40, 12)} c="q" w={3} />
      <Vec a={pt(40, 60)} b={pt(80, 90)} c="u" w={3} />
      <Lab p={pt(106, 64)} c="p" anchor="start">x</Lab>
      <Lab p={pt(48, 16)} c="q" anchor="start">y</Lab>
      <Lab p={pt(86, 100)} c="u" anchor="start">z</Lab>
      {bonds.map(([a, b], i) => (
        <Seg key={i} a={a} b={b} c="f" w={4} />
      ))}
      {atoms.map((a, i) => (
        <Dot key={i} p={a} c="p" r={kind === "mono" ? 16 : 12} />
      ))}
      <Arc o={O} r={58} from={20} to={160} c="r" w={3} show={spin && kind !== "mono"} />
      <Arc o={O} r={58} from={200} to={340} c="r" w={3} show={spin && kind !== "mono"} />
      <Arc o={O} r={74} from={60} to={120} c="r" w={3} show={spin && kind === "tri"} />
      <Lab p={pt(250, 236)} c="m">{`স্থানান্তর 3টি${kind === "mono" ? "" : kind === "di" ? " + ঘূর্ণন 2টি" : " + ঘূর্ণন 3টি"}`}</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [kind, setKind] = useState<Kind>("di");
  const f = info[kind].f;
  const u = (f / 2) * 8.314 * 300;

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "বিন্দু পরমাণু কত দিকে ছোটে?",
            text: "হিলিয়ামের অণু একটা বিন্দুর মতো একটাই পরমাণু। সে কয়টি স্বাধীন দিকে সরতে পারে?",
            locked: g.picks[0] === undefined,
            prompt: (
              <Choices
                options={["1", "2", "3"]}
                answer={2}
                picked={g.picks[0]}
                onPick={g.pick(0)}
                explain="x, y আর z, মোট তিন দিকে। এই স্বাধীন উপায়গুলোকে বলে স্বাধীনতার মাত্রা। তাই এক-পরমাণুকের f = 3।"
              />
            ),
            figure: () => <Molecule kind="mono" spin={false} />,
          },
          {
            title: "দ্বি-পরমাণুক ঘুরতেও পারে",
            text: (
              <>
                নাইট্রোজেনের অণুতে দুটি পরমাণু আছে। সে তিন দিকে সরতে পারে, আর <C k="r">দুটি অক্ষের চারদিকে ঘুরতেও</C> পারে। (জোড়ার রেখা ধরে ঘূর্ণন ধরা হয় না।) মোট f কত?
              </>
            ),
            locked: g.picks[1] === undefined,
            prompt: (
              <Choices
                options={["3", "5", "6"]}
                answer={1}
                picked={g.picks[1]}
                onPick={g.pick(1)}
                explain="3 টি স্থানান্তর + 2 টি ঘূর্ণন = 5।"
              />
            ),
            figure: () => <Molecule kind="di" spin={g.picks[1] !== undefined} />,
          },
          {
            title: "অণু বেছে দেখো",
            text: "তিন ধরনের অণু বেছে দেখো। প্রতিটির স্বাধীনতার মাত্রা আর 300 K এ 1 mol এর অভ্যন্তরীণ শক্তি কেমন?",
            prompt: (
              <div className="guide-play">
                <div className="guide-chips">
                  {(Object.keys(info) as Kind[]).map((k) => (
                    <button key={k} type="button" className={`guide-chip${kind === k ? " on" : ""}`} onClick={() => setKind(k)}>
                      {info[k].name}
                    </button>
                  ))}
                </div>
                <div className="guide-read">
                  <span>
                    f = <C k="r">{f}</C>
                  </span>
                  <span>U = {u.toFixed(0)} J</span>
                </div>
                <p className="guide-note">মাত্রা যত বেশি, একই তাপমাত্রায় তত বেশি শক্তি জমে।</p>
              </div>
            ),
            figure: () => <Molecule kind={kind} spin />,
          },
          {
            title: "সমবিভাজন নীতি",
            text: (
              <>
                তাপ ছড়িয়ে পড়ে সব মাত্রায় সমানভাবে। প্রতি মাত্রায় গড়ে <C k="r">½kT</C> শক্তি। 2 mol হিলিয়াম 300 K এ থাকলে মোট শক্তি কত?
              </>
            ),
            tex: ["E=\\dfrac f2kT", "U=\\dfrac f2nRT"],
            locked: g.picks[3] === undefined,
            prompt: (
              <Choices
                options={["7483 J", "2494 J", "12471 J"]}
                answer={0}
                picked={g.picks[3]}
                onPick={g.pick(3)}
                explain="U = (3/2) × 2 × 8.314 × 300 = 7483 J। 12471 J হতো f = 5 ধরলে।"
              />
            ),
          },
        ],
        summary: [
          {
            title: "স্বাধীনতার মাত্রা",
            text: "এক-পরমাণুক 3, দ্বি-পরমাণুক 5, ত্রি-পরমাণুক (বাঁকা) 6।",
            tex: ["f=3,\\ 5,\\ 6"],
          },
          {
            title: "অভ্যন্তরীণ শক্তি",
            text: "প্রতি মাত্রায় ½kT। n মোলের মোট শক্তি তাই নিচের মতো।",
            tex: ["E=\\dfrac f2kT", "U=\\dfrac f2nRT"],
          },
        ],
      })}
    />
  );
}
