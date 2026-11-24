"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, type Built } from "@/components/lesson/guide-kit";
import { Particles, Quiver, fields, type FieldKey } from "@/components/anim/field";
import { Stage, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "ভেক্টর ক্ষেত্রের ডাইভারজেন্স বের করতে পারবে এবং ফল ধনাত্মক, ঋণাত্মক বা শূন্য হলে ক্ষেত্রে কী ঘটছে তা বলতে পারবে।",
  hook: "ফোয়ারার মুখ থেকে পানি চারদিকে ছড়ায়। নর্দমার মুখে চারদিক থেকে পানি জমা হয়। আবার সোজা নদীর স্রোতে একটা ছোট জায়গা ধরলে যত পানি ঢোকে, ঠিক তত বেরোয়। এই ছড়ানো বা জমার মাপই ডাইভারজেন্স।",
  look: "মাঝের ছোট বাক্সে কতটা ঢুকছে আর কতটা বেরোচ্ছে, তা তীরের দৈর্ঘ্য দেখে মেলাও। উৎস, গ্রাহক, সমান স্রোত আর ঘূর্ণিতে বাক্সের অবস্থা কেমন বদলায়, সেটাও দেখো।",
  formulas: [
    { tex: "\\nabla\\cdot\\vec A=\\dfrac{\\partial A_x}{\\partial x}+\\dfrac{\\partial A_y}{\\partial y}+\\dfrac{\\partial A_z}{\\partial z}", meaning: "ডাইভারজেন্স। ফল একটা স্কেলার।", step: 4 },
    { tex: "\\nabla\\cdot\\vec A>0", meaning: "উৎস: ক্ষেত্র ওই বিন্দু থেকে ছড়াচ্ছে।", step: 3 },
    { tex: "\\nabla\\cdot\\vec A<0", meaning: "গ্রাহক: ক্ষেত্র ওই বিন্দুতে জমছে।", step: 5 },
    { tex: "\\nabla\\cdot\\vec A=0", meaning: "সলিনয়ডাল ক্ষেত্র: যত ঢোকে তত বেরোয়।", step: 6 },
    { tex: "\\nabla\\cdot\\vec r=3", meaning: "অবস্থান ভেক্টর r⃗ = xî + yĵ + zk̂-এর ডাইভারজেন্স।" },
  ],
  example: {
    problem: "A⃗ = x²y î + y²z ĵ + z²x k̂ হলে (1, 1, 1) বিন্দুতে ∇·A⃗ বের করো।",
    steps: [
      { text: "প্রতিটি উপাংশকে তার নিজের দিকের চলরাশির সাপেক্ষে অবকলন করি।", tex: "\\frac{\\partial(x^2y)}{\\partial x}=2xy,\\quad \\frac{\\partial(y^2z)}{\\partial y}=2yz,\\quad \\frac{\\partial(z^2x)}{\\partial z}=2zx" },
      { text: "তিনটি যোগ করি।", tex: "\\nabla\\cdot\\vec A=2xy+2yz+2zx" },
      { text: "বিন্দুর মান বসাই।", tex: "\\nabla\\cdot\\vec A=2+2+2=6" },
      { text: "উত্তর: 6। ধনাত্মক, তাই ওই বিন্দুতে ক্ষেত্র ছড়াচ্ছে।" },
    ],
  },
  mistakes: [
    "ডাইভারজেন্সকে ভেক্টর ভাবা। এটা স্কেলার।",
    "∂Ax/∂y লেখা। Ax-কে x-এর সাপেক্ষে, Ay-কে y-এর সাপেক্ষে, Az-কে z-এর সাপেক্ষে অবকলন হয়।",
    "তীর ছড়ালেই ডাইভারজেন্স ধনাত্মক ভাবা। সমান্তরাল সমান তীরে ফল শূন্য।",
    "ঘূর্ণি ক্ষেত্রে ডাইভারজেন্স আছে ভাবা। বৃত্তাকারে ঘুরলে কোথাও জমে না, তাই ফল শূন্য।",
  ],
  recap: [
    "ডাইভারজেন্স মাপে একটা ছোট বাক্স থেকে ক্ষেত্র কতটা বেরোচ্ছে, বেরোনো আর ঢোকার পার্থক্য।",
    "∇·A = ∂Ax/∂x + ∂Ay/∂y + ∂Az/∂z। ফল স্কেলার।",
    "ধনাত্মক মানে উৎস, ঋণাত্মক মানে গ্রাহক, শূন্য মানে সলিনয়ডাল।",
    "সমান সোজা স্রোত আর ঘূর্ণি স্রোত দুটোরই ডাইভারজেন্স শূন্য।",
  ],
  think: {
    scenario: "একটা বাগানে স্প্রিংকলার চারদিকে পানি ছিটাচ্ছে। একটা নালার মুখে চারদিক থেকে পানি জমছে। আর একটা সোজা খালে পানি এক দিক থেকে আরেক দিকে বইছে।",
    points: [
      "স্প্রিংকলারের মুখ ঘিরে একটা ছোট বাক্স ধরলে ঢোকা আর বেরোনোর কোনটা বেশি? ডাইভারজেন্স ধনাত্মক না ঋণাত্মক?",
      "নালার মুখের জন্য একই প্রশ্নের উত্তর কী?",
      "সোজা খালের মাঝে ছোট বাক্স ধরলে কী ঘটে? ডাইভারজেন্স কত?",
      "ঘুরন্ত পানির ঘূর্ণিতে ডাইভারজেন্স কত? কেন?",
    ],
    hint: "ডাইভারজেন্স = যত বেরোচ্ছে − যত ঢুকছে। ছড়ালে ধনাত্মক, জমলে ঋণাত্মক, সমান হলে শূন্য। ঘুরন্ত পানি কোথাও জমে না, ছড়ায়ও না।",
    traps: [
      "ডাইভারজেন্স একটা ভেক্টর।",
      "তীর ছড়ালেই ডাইভারজেন্স ধনাত্মক হয়, সমান তীরেও।",
      "ঘূর্ণি ক্ষেত্রে ডাইভারজেন্স থাকে।",
      "∂Ax/∂y ডাইভারজেন্সের একটি পদ।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = x²y î + y²z ĵ + z²x k̂ হলে (1, 1, 1) বিন্দুতে ∇·A⃗ বের করো।",
      hint: "প্রতিটি উপাংশকে নিজের দিকের চলরাশির সাপেক্ষে অবকলন করো।",
      steps: [
        { text: "প্রতিটি উপাংশকে তার নিজের দিকের চলরাশির সাপেক্ষে অবকলন করি।", tex: "\\frac{\\partial(x^2y)}{\\partial x}=2xy,\\quad \\frac{\\partial(y^2z)}{\\partial y}=2yz,\\quad \\frac{\\partial(z^2x)}{\\partial z}=2zx" },
        { text: "তিনটি যোগ করি।", tex: "\\nabla\\cdot\\vec A=2xy+2yz+2zx" },
        { text: "বিন্দুর মান বসাই।", tex: "\\nabla\\cdot\\vec A=2+2+2=6" },
        { text: "উত্তর: 6। ধনাত্মক, তাই ক্ষেত্র ওই বিন্দুতে ছড়াচ্ছে।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A⃗ = 3x² î + 2y ĵ + z k̂ হলে ∇·A⃗ এবং (1, 2, 3) বিন্দুতে তার মান বের করো।",
      hint: "পদ তিনটির প্রতিটি নিজের চলরাশির সাপেক্ষে অবকলন করো।",
      steps: [
        { text: "তিনটি আংশিক অবকলন।", tex: "\\frac{\\partial(3x^2)}{\\partial x}=6x,\\quad \\frac{\\partial(2y)}{\\partial y}=2,\\quad \\frac{\\partial z}{\\partial z}=1" },
        { text: "যোগ করি।", tex: "\\nabla\\cdot\\vec A=6x+2+1=6x+3" },
        { text: "(1, 2, 3) বিন্দুতে x = 1।", tex: "\\nabla\\cdot\\vec A=6(1)+3=9" },
        { text: "উত্তর: 9, ধনাত্মক, তাই ক্ষেত্র ছড়াচ্ছে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "A⃗ = (x² + ax) î + (y² − 3y) ĵ হলে a-এর কোন মানের জন্য (1, 1) বিন্দুতে ∇·A⃗ = 0?",
      hint: "ডাইভারজেন্স লিখে (1, 1) বসাও, তারপর শূন্যের সমান ধরো।",
      steps: [
        { text: "ডাইভারজেন্স লিখি।", tex: "\\nabla\\cdot\\vec A=\\frac{\\partial(x^2+ax)}{\\partial x}+\\frac{\\partial(y^2-3y)}{\\partial y}=2x+a+2y-3" },
        { text: "(1, 1) বসাই।", tex: "\\nabla\\cdot\\vec A=2+a+2-3=a+1" },
        { text: "শূন্য ধরে a বের করি।", tex: "a+1=0\\Rightarrow a=-1" },
        { text: "উত্তর: a = −1।" },
      ],
    },
  ],
  concepts: [
    "ফুঁ দেওয়া বেলুনের ভেতরে বাতাসের বেগ ক্ষেত্রের ডাইভারজেন্স ধনাত্মক হবে কেন?",
    "সলিনয়ডাল ক্ষেত্রের তীর কি সব সময় সোজা? বৃত্তাকার বা বন্ধ লুপের মতোও কি হতে পারে?",
    "চৌম্বক ক্ষেত্রের রেখা কেন বন্ধ লুপ হয়? ইঙ্গিত: কোথাও কি উৎস বা গ্রাহক আছে?",
  ],
  quiz: [
    { q: "A⃗ = x î + y ĵ + z k̂ হলে ∇·A⃗ কত?", options: ["0", "1", "3", "x + y + z"], answer: 2, why: "∂x/∂x + ∂y/∂y + ∂z/∂z = 1 + 1 + 1 = 3।" },
    { q: "A⃗ = y î + x ĵ হলে ∇·A⃗ কত?", options: ["0", "2", "x + y", "1"], answer: 0, why: "Ax = y, তার x-এর সাপেক্ষে অবকলন 0। Ay = x, তার y-এর সাপেক্ষে অবকলন 0। যোগফল 0।" },
    { q: "∇·A⃗ < 0 মানে কী?", options: ["উৎস", "গ্রাহক", "ঘূর্ণি", "কিছুই না"], answer: 1, why: "ঋণাত্মক ডাইভারজেন্সে ক্ষেত্র ওই বিন্দুতে জমে, যাকে গ্রাহক বলে।" },
    { q: "A⃗ = 3x² î + 2y ĵ হলে ∇·A⃗ কত?", options: ["6x + 2", "3x² + 2y", "6x", "2"], answer: 0, why: "∂(3x²)/∂x = 6x এবং ∂(2y)/∂y = 2। যোগফল 6x + 2।" },
    { q: "A⃗ = 2x î + 3y ĵ হলে ∇·A⃗ কত?", options: ["5", "2x + 3y", "6xy", "0"], answer: 0, why: "∂(2x)/∂x = 2 আর ∂(3y)/∂y = 3। যোগফল 5, যা একটা ধ্রুবক সংখ্যা।" },
  ],
};

function FieldPic({ f, box }: { f: FieldKey; box?: boolean }) {
  return (
    <Stage w={440} h={290} label="ভেক্টর ক্ষেত্রের তীর ও কণা">
      <Quiver field={f} c="p" />
      <Particles key={f} field={f} />
      {box ? <rect x={192} y={119} width={56} height={52} rx={6} fill="none" strokeWidth={2} strokeDasharray="5 4" style={{ stroke: col.r }} /> : null}
    </Stage>
  );
}

export default function Anim() {
  const [pick, setPick] = useState<FieldKey>("source");
  const keys = Object.keys(fields) as FieldKey[];

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "স্প্রিংকলার",
            text: "একটা স্প্রিংকলার চারদিকে পানি ছিটাচ্ছে। তার মুখে একটা ছোট বাক্স (ডোরাকাটা) ধরো। বাক্সে যত পানি ঢুকছে, তার চেয়ে বেরোচ্ছে বেশি না কম?",
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["বেশি", "কম", "সমান"]} answer={0} picked={g.picks[0]} onPick={g.pick(0)} explain="বাক্সের ভেতরেই উৎস আছে, তাই যা ঢোকে তার চেয়ে বেশি বেরোয়। এই বেরোনো-বিয়োগ-ঢোকাই ডাইভারজেন্স, ধনাত্মক।" />,
            figure: () => <FieldPic f="source" box />,
          },
          {
            title: "নালার মুখ",
            text: "এবার তীরগুলো উল্টে গেছে, চারদিক থেকে পানি জমছে। ডাইভারজেন্স ধনাত্মক, ঋণাত্মক, না শূন্য?",
            locked: g.picks[1] === undefined,
            prompt: <Choices options={["ধনাত্মক", "ঋণাত্মক", "শূন্য"]} answer={1} picked={g.picks[1]} onPick={g.pick(1)} explain="বেরোনোর চেয়ে ঢোকা বেশি, তাই ঋণাত্মক। এমন বিন্দুকে বলে গ্রাহক।" />,
            figure: () => <FieldPic f="sink" box />,
          },
          {
            title: "সোজা সমান স্রোত",
            text: "খালের মাঝে সোজা সমান স্রোত বইছে। বাক্সে যত ঢোকে তত বেরোয়। ডাইভারজেন্স?",
            locked: g.picks[2] === undefined,
            prompt: <Choices options={["ধনাত্মক", "ঋণাত্মক", "শূন্য"]} answer={2} picked={g.picks[2]} onPick={g.pick(2)} explain="কোথাও জমছে না, কোথাও ছড়াচ্ছে না। যত ঢোকে তত বেরোয়, তাই ডাইভারজেন্স শূন্য।" />,
            figure: () => <FieldPic f="uniform" box />,
          },
          {
            title: "ঘূর্ণি",
            text: "ঘূর্ণিতে পানি বৃত্তে ঘুরছে। কণাগুলো ঘুরছে, কিন্তু বাক্সে জমছেও না, ছড়াচ্ছেও না। তাই ডাইভারজেন্স শূন্য। ঘূর্ণি মাপতে লাগবে আরেকটা জিনিস, কার্ল (পরের পাঠে)।",
            figure: () => <FieldPic f="rotation" box />,
          },
          {
            title: "সূত্রটা কোথা থেকে আসে",
            text: (
              <>
                ডানে গেলে Ax বাড়ছে, মানে ডান দিকের তীর লম্বা। এই বাড়ার হার ∂Ax/∂x। তিন দিকের বাড়ার হার যোগ করলেই ডাইভারজেন্স। <C k="r">A = x î + y ĵ</C> হলে হয় 1 + 1 = 2।
              </>
            ),
            tex: ["\\nabla\\cdot\\vec A=\\dfrac{\\partial A_x}{\\partial x}+\\dfrac{\\partial A_y}{\\partial y}+\\dfrac{\\partial A_z}{\\partial z}", "\\vec A=x\\hat\\imath+y\\hat\\jmath\\Rightarrow\\nabla\\cdot\\vec A=1+1=2"],
            figure: () => <FieldPic f="source" box />,
          },
          {
            title: "নিজে বেছে দেখো",
            text: "নিচের বোতাম থেকে একটা ক্ষেত্র বেছে নাও। তীর আর কণা দেখে আগে অনুমান করো, তারপর ফল মেলাও।",
            prompt: (
              <div className="guide-play">
                <div className="guide-chips">
                  {keys.map((k) => (
                    <button key={k} type="button" className={`guide-chip${pick === k ? " on" : ""}`} onClick={() => setPick(k)}>
                      {fields[k].name}
                    </button>
                  ))}
                </div>
                <div className="guide-read">
                  <span>
                    ∇·A = <C k="r">{fields[pick].div}</C>
                  </span>
                </div>
              </div>
            ),
            figure: () => <FieldPic f={pick} box />,
          },
        ],
        summary: [
          {
            title: "ডাইভারজেন্স",
            text: "ছোট বাক্স থেকে ক্ষেত্র কতটা বেরোচ্ছে, তার মাপ। ফল একটা স্কেলার। ধনাত্মক মানে উৎস, ঋণাত্মক মানে গ্রাহক, শূন্য মানে সলিনয়ডাল।",
            tex: ["\\nabla\\cdot\\vec A=\\dfrac{\\partial A_x}{\\partial x}+\\dfrac{\\partial A_y}{\\partial y}+\\dfrac{\\partial A_z}{\\partial z}"],
          },
          {
            title: "তিনটি ক্ষেত্র",
            text: "ছড়ালে ধনাত্মক, জমলে ঋণাত্মক, সমান স্রোত বা ঘূর্ণিতে শূন্য।",
            tex: ["\\nabla\\cdot\\vec A>0", "\\nabla\\cdot\\vec A<0", "\\nabla\\cdot\\vec A=0"],
          },
        ],
      })}
    />
  );
}
