"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Chips } from "@/components/anim/controls";
import { Particles, Quiver, fields, type FieldKey } from "@/components/anim/field";
import { Lab, Stage, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  goal: "ভেক্টর ক্ষেত্রের ডাইভারজেন্স বের করতে পারবে এবং ফল ধনাত্মক, ঋণাত্মক বা শূন্য হলে ক্ষেত্রে কী ঘটছে তা বলতে পারবে।",
  hook: "ফোয়ারার মুখ থেকে পানি চারদিকে ছড়ায়। নর্দমার মুখে চারদিক থেকে পানি জমা হয়। আবার সোজা নদীর স্রোতে একটা ছোট জায়গা ধরলে যত পানি ঢোকে, ঠিক তত বেরোয়। এই ছড়ানো বা জমার মাপই ডাইভারজেন্স।",
  formulas: [
    { tex: "\\nabla\\cdot\\vec A=\\dfrac{\\partial A_x}{\\partial x}+\\dfrac{\\partial A_y}{\\partial y}+\\dfrac{\\partial A_z}{\\partial z}", meaning: "ডাইভারজেন্স। ফল একটা স্কেলার।" },
    { tex: "\\nabla\\cdot\\vec A>0", meaning: "উৎস: ক্ষেত্র ওই বিন্দু থেকে ছড়াচ্ছে।" },
    { tex: "\\nabla\\cdot\\vec A<0", meaning: "গ্রাহক: ক্ষেত্র ওই বিন্দুতে জমছে।" },
    { tex: "\\nabla\\cdot\\vec A=0", meaning: "সলিনয়ডাল ক্ষেত্র: যত ঢোকে তত বেরোয়।" },
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
  quiz: [
    { q: "A⃗ = x î + y ĵ + z k̂ হলে ∇·A⃗ কত?", options: ["0", "1", "3", "x + y + z"], answer: 2, why: "∂x/∂x + ∂y/∂y + ∂z/∂z = 1 + 1 + 1 = 3।" },
    { q: "A⃗ = y î + x ĵ হলে ∇·A⃗ কত?", options: ["0", "2", "x + y", "1"], answer: 0, why: "Ax = y, তার x-এর সাপেক্ষে অবকলন 0। Ay = x, তার y-এর সাপেক্ষে অবকলন 0। যোগফল 0।" },
    { q: "∇·A⃗ < 0 মানে কী?", options: ["উৎস", "গ্রাহক", "ঘূর্ণি", "কিছুই না"], answer: 1, why: "ঋণাত্মক ডাইভারজেন্সে ক্ষেত্র ওই বিন্দুতে জমে, যাকে গ্রাহক বলে।" },
    { q: "A⃗ = 3x² î + 2y ĵ হলে ∇·A⃗ কত?", options: ["6x + 2", "3x² + 2y", "6x", "2"], answer: 0, why: "∂(3x²)/∂x = 6x এবং ∂(2y)/∂y = 2। যোগফল 6x + 2।" },
  ],
};

const stepField: FieldKey[] = ["source", "source", "source", "source", "sink", "uniform", "rotation"];

export default function Anim() {
  const [cur, setCur] = useState(0);
  const [pick, setPick] = useState<FieldKey>("source");

  const steps: LessonStep[] = [
    {
      title: "ফোয়ারা",
      text: "ছবির তীরগুলো পানির স্রোত। মাঝের বিন্দু থেকে চারদিকে ছড়াচ্ছে। হলুদ ফোঁটাগুলো দেখো, সব মাঝ থেকে বাইরে যাচ্ছে। এটা একটা উৎস।",
    },
    {
      title: "ছোট বাক্স",
      text: "মাঝে একটা ছোট বাক্স ধরো, ছবিতে ডোরাকাটা। বাক্সের ভেতরে উৎস আছে, তাই যত ঢুকছে তার চেয়ে বেশি বেরোচ্ছে।",
      note: "ডাইভারজেন্স মাপে: যত বেরোচ্ছে − যত ঢুকছে।",
    },
    {
      title: "ডাইভারজেন্স",
      text: "বেরোনো বেশি হলে ডাইভারজেন্স ধনাত্মক। এখানে A = x î + y ĵ। ∂Ax/∂x = 1 আর ∂Ay/∂y = 1, মোট 2।",
      tex: ["\\vec A=x\\hat\\imath+y\\hat\\jmath", "\\nabla\\cdot\\vec A=1+1=2"],
    },
    {
      title: "সূত্রটা কোথা থেকে এল",
      text: "ডানে গেলে Ax বাড়ছে, মানে ডান দিকের তীর লম্বা। এই বাড়ার হার ∂Ax/∂x। তিন দিকের হার যোগ করলেই ডাইভারজেন্সের সূত্র।",
      tex: ["\\nabla\\cdot\\vec A=\\frac{\\partial A_x}{\\partial x}+\\frac{\\partial A_y}{\\partial y}+\\frac{\\partial A_z}{\\partial z}"],
    },
    {
      title: "নর্দমা",
      text: "তীরগুলো উল্টে দিলে সব মাঝে জমে। এখন A = −x î − y ĵ। ডাইভারজেন্স −2, ঋণাত্মক। এটা গ্রাহক।",
      tex: ["\\vec A=-x\\hat\\imath-y\\hat\\jmath", "\\nabla\\cdot\\vec A=-1-1=-2"],
    },
    {
      title: "সমান স্রোত",
      text: "সোজা সমান স্রোতে বাক্সে যত ঢোকে তত বেরোয়। কোথাও জমে না, কোথাও ছড়ায় না। ডাইভারজেন্স শূন্য।",
      tex: ["\\vec A=2\\hat\\imath", "\\nabla\\cdot\\vec A=0"],
    },
    {
      title: "ঘূর্ণি",
      text: "ঘূর্ণির তীরগুলো বৃত্তে ঘুরছে। জমছেও না, ছড়াচ্ছেও না। A = −y î + x ĵ, ডাইভারজেন্স শূন্য।",
      tex: ["\\vec A=-y\\hat\\imath+x\\hat\\jmath", "\\nabla\\cdot\\vec A=0+0=0"],
    },
    {
      title: "নিজে বাছাই করো",
      text: "নিচের বোতাম থেকে ক্ষেত্র বাছাই করো। তীর আর ফোঁটা দেখে বলো ডাইভারজেন্স ধনাত্মক, ঋণাত্মক না শূন্য। তারপর ছবির ডান কোণের মানের সাথে মেলাও।",
    },
  ];

  const figure = (s: number) => {
    const f: FieldKey = s >= stepField.length ? pick : stepField[s];
    const def = fields[f];
    return (
      <Stage w={440} h={290} label="ভেক্টর ক্ষেত্রের তীর ও ডাইভারজেন্স">
        <Quiver field={f} c="p" />
        <Particles key={f} field={f} />
        <motion.rect
          initial={false}
          x={192}
          y={119}
          width={56}
          height={52}
          rx={6}
          fill="none"
          strokeWidth={2}
          strokeDasharray="5 4"
          animate={{ opacity: s === 1 || s === 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ stroke: col.r }}
        />
        <Lab p={{ x: 20, y: 26 }} anchor="start">{def.label}</Lab>
        <Lab p={{ x: 420, y: 26 }} anchor="end" c="r" show={s >= 2}>∇·A = {def.div}</Lab>
      </Stage>
    );
  };

  const options = (Object.keys(fields) as FieldKey[]).map((k) => ({ key: k, name: fields[k].name }));
  const extra = cur === 7 ? <Chips label="ক্ষেত্র বাছাই" value={pick} options={options} onChange={setPick} /> : null;

  return <Lesson steps={steps} figure={figure} extra={extra} onStep={setCur} />;
}
