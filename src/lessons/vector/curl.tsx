"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Chips } from "@/components/anim/controls";
import { Particles, Quiver, fields, type FieldKey } from "@/components/anim/field";
import { Lab, Stage, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  goal: "কার্ল দিয়ে কীভাবে বোঝা যায় ক্ষেত্রে ঘূর্ণি আছে কি না তা শিখবে। কার্ল বের করতে এবং অঘূর্ণনশীল ক্ষেত্র চিনতে পারবে।",
  hook: "নদীর পানিতে একটা ছোট পাখনাওয়ালা চাকা ভাসিয়ে দাও। চাকা যদি ঘুরতে শুরু করে, তাহলে ওই জায়গার স্রোতে ঘূর্ণি আছে। চাকা শুধু ভেসে চললে ঘূর্ণি নেই। কার্ল হলো এই চাকার ঘোরার মাপ।",
  look: "চাকাটা কোন ক্ষেত্রে ঘোরে আর কোনটিতে ঘোরে না, তা দেখো। আর কেন সোজা তীরের ক্ষেত্রেও চাকা ঘুরতে পারে, সেটাও খেয়াল করো।",
  formulas: [
    { tex: "\\nabla\\times\\vec A=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\\\partial/\\partial x&\\partial/\\partial y&\\partial/\\partial z\\\\A_x&A_y&A_z\\end{vmatrix}", meaning: "ডিটারমিন্যান্ট আকারে কার্ল। ফল একটা ভেক্টর।", step: 3 },
    { tex: "(\\nabla\\times\\vec A)_z=\\dfrac{\\partial A_y}{\\partial x}-\\dfrac{\\partial A_x}{\\partial y}", meaning: "দুই মাত্রার ক্ষেত্রে কার্ল শুধু z-দিকে। ধনাত্মক হলে চাকা উল্টো ঘড়ির দিকে ঘোরে।", step: 3 },
    { tex: "\\nabla\\times\\vec A=\\vec 0", meaning: "অঘূর্ণনশীল ক্ষেত্র। চাকা ঘোরে না।", step: 6 },
    { tex: "\\nabla\\times(\\nabla\\varphi)=\\vec 0", meaning: "যেকোনো স্কেলারের গ্র্যাডিয়েন্টের কার্ল শূন্য।", step: 6 },
    { tex: "\\nabla\\cdot(\\nabla\\times\\vec A)=0", meaning: "কার্লের ডাইভারজেন্স সব সময় শূন্য।" },
  ],
  example: {
    problem: "A⃗ = x²y î + y²z ĵ + z²x k̂ হলে (1, 1, 1) বিন্দুতে ∇×A⃗ বের করো।",
    steps: [
      { text: "ডিটারমিন্যান্ট সাজাই।", tex: "\\nabla\\times\\vec A=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\\\partial/\\partial x&\\partial/\\partial y&\\partial/\\partial z\\\\x^2y&y^2z&z^2x\\end{vmatrix}" },
      { text: "î-এর সহগ: ∂Az/∂y − ∂Ay/∂z।", tex: "\\hat\\imath\\left(\\frac{\\partial(z^2x)}{\\partial y}-\\frac{\\partial(y^2z)}{\\partial z}\\right)=\\hat\\imath(0-y^2)=-y^2\\hat\\imath" },
      { text: "ĵ-এর সহগে মাঝের পদ বলে বিয়োগ চিহ্ন বসে।", tex: "-\\hat\\jmath\\left(\\frac{\\partial(z^2x)}{\\partial x}-\\frac{\\partial(x^2y)}{\\partial z}\\right)=-\\hat\\jmath(z^2-0)=-z^2\\hat\\jmath" },
      { text: "k̂-এর সহগ: ∂Ay/∂x − ∂Ax/∂y।", tex: "\\hat k\\left(\\frac{\\partial(y^2z)}{\\partial x}-\\frac{\\partial(x^2y)}{\\partial y}\\right)=\\hat k(0-x^2)=-x^2\\hat k" },
      { text: "বিন্দুর মান বসাই।", tex: "\\nabla\\times\\vec A=-y^2\\hat\\imath-z^2\\hat\\jmath-x^2\\hat k=-\\hat\\imath-\\hat\\jmath-\\hat k" },
      { text: "উত্তর: (1, 1, 1) বিন্দুতে ∇×A⃗ = −î − ĵ − k̂।" },
    ],
  },
  mistakes: [
    "কার্লকে স্কেলার ভাবা। কার্ল একটা ভেক্টর, আর ডাইভারজেন্স স্কেলার।",
    "ĵ-এর সহগে চিহ্ন ভুলে যাওয়া। ডিটারমিন্যান্টের মাঝের পদে বিয়োগ বসে।",
    "তীর ঘুরলেই কার্ল আছে, না ঘুরলে নেই ভাবা। সোজা তীরেও শিয়ার থাকলে চাকা ঘোরে।",
    "ডাইভারজেন্স আর কার্লের সূত্র গুলিয়ে ফেলা। ডাইভারজেন্সে ডট, কার্লে ক্রস।",
  ],
  recap: [
    "কার্ল মাপে একটা ছোট পাখনা-চাকা ক্ষেত্রে কতটা ঘোরে। ফল ভেক্টর, দিক ঘূর্ণন অক্ষ বরাবর।",
    "∇×A হলো ডিটারমিন্যান্ট। দুই মাত্রায় (∇×A)z = ∂Ay/∂x − ∂Ax/∂y।",
    "ছড়ানো আর ঘোরা আলাদা। উৎসে ডাইভারজেন্স আছে কিন্তু কার্ল নেই। ঘূর্ণিতে উল্টো।",
    "কার্ল শূন্য হলে ক্ষেত্র অঘূর্ণনশীল। যেকোনো গ্র্যাডিয়েন্ট ক্ষেত্র অঘূর্ণনশীল।",
  ],
  think: {
    scenario: "একটা নদীর মাঝখানে স্রোত জোরালো, দুই পাড়ের কাছে ধীর। সব পানি এক দিকেই বইছে। নদীর ঠিক মাঝখানে নয়, একটু একপাশে তুমি একটা ছোট পাখনা-চাকা ভাসালে।",
    points: [
      "পানি সব এক দিকে বইছে, তবু কি চাকা ঘুরবে? কেন?",
      "চাকা ঠিক মাঝখানে, যেখানে স্রোত সবচেয়ে জোরালো, সেখানে ভাসালে ঘুরবে কি?",
      "চাকা কোন দিকে ঘুরবে? কোন পাশের পাখনা বেশি জোরে ধাক্কা খায়, তা ভেবে বলো।",
      "সমান গতিতে সোজা বইতে থাকা পানিতে চাকা ঘুরবে কি? ফোয়ারার ছড়ানো পানিতে?",
    ],
    hint: "চাকা ঘোরে যখন তার এক পাশে স্রোত অন্য পাশের চেয়ে বেশি জোরালো। সমান স্রোতে বা শুধু ছড়ানো স্রোতে দুই পাশ সমান ধাক্কা খায়, তাই ঘোরে না। স্রোতের মাঝের রেখায় দুই পাশের স্রোত সমান, তাই সেখানে চাকা ঘোরে না।",
    traps: [
      "তীর বৃত্তাকারে না ঘুরলে কার্ল শূন্য হবে।",
      "ছড়ানো ক্ষেত্রে কার্ল থাকে।",
      "কার্ল একটা স্কেলার।",
      "∇·A আর ∇×A দুটোই ভেক্টর।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = x²y î + y²z ĵ + z²x k̂ হলে (1, 1, 1) বিন্দুতে ∇×A⃗ বের করো।",
      hint: "ডিটারমিন্যান্টের ĵ-এর সহগে বিয়োগ চিহ্ন বসে।",
      steps: [
        { text: "î-এর সহগ।", tex: "\\hat\\imath\\left(\\frac{\\partial A_z}{\\partial y}-\\frac{\\partial A_y}{\\partial z}\\right)=\\hat\\imath(0-y^2)=-y^2\\hat\\imath" },
        { text: "ĵ-এর সহগ, বিয়োগ চিহ্ন সহ।", tex: "-\\hat\\jmath\\left(\\frac{\\partial A_z}{\\partial x}-\\frac{\\partial A_x}{\\partial z}\\right)=-\\hat\\jmath(z^2-0)=-z^2\\hat\\jmath" },
        { text: "k̂-এর সহগ।", tex: "\\hat k\\left(\\frac{\\partial A_y}{\\partial x}-\\frac{\\partial A_x}{\\partial y}\\right)=\\hat k(0-x^2)=-x^2\\hat k" },
        { text: "বিন্দুর মান বসাই।", tex: "\\nabla\\times\\vec A=-\\hat\\imath-\\hat\\jmath-\\hat k" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A⃗ = −2y î + 3x ĵ হলে (∇×A⃗)z কত? পাখনা-চাকা কোন দিকে ঘুরবে?",
      hint: "(∇×A)z = ∂Ay/∂x − ∂Ax/∂y।",
      steps: [
        { text: "Ax = −2y এবং Ay = 3x।", tex: "(\\nabla\\times\\vec A)_z=\\frac{\\partial(3x)}{\\partial x}-\\frac{\\partial(-2y)}{\\partial y}" },
        { text: "অবকলন করি।", tex: "(\\nabla\\times\\vec A)_z=3-(-2)=5" },
        { text: "উত্তর: 5, ধনাত্মক। তাই চাকা উল্টো ঘড়ির দিকে ঘুরবে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "A⃗ = (4x + 2y) î + (bx − y) ĵ ক্ষেত্রটি অঘূর্ণনশীল হলে b কত? তখন ∇·A⃗ কত?",
      hint: "অঘূর্ণনশীল মানে (∇×A)z = 0।",
      steps: [
        { text: "কার্লের z-উপাংশ লিখি।", tex: "(\\nabla\\times\\vec A)_z=\\frac{\\partial(bx-y)}{\\partial x}-\\frac{\\partial(4x+2y)}{\\partial y}=b-2" },
        { text: "অঘূর্ণনশীল হলে এটা শূন্য।", tex: "b-2=0\\Rightarrow b=2" },
        { text: "এবার ডাইভারজেন্স।", tex: "\\nabla\\cdot\\vec A=\\frac{\\partial(4x+2y)}{\\partial x}+\\frac{\\partial(2x-y)}{\\partial y}=4-1=3" },
        { text: "উত্তর: b = 2 এবং ∇·A⃗ = 3। অঘূর্ণনশীল ক্ষেত্রেও ডাইভারজেন্স শূন্য নাও হতে পারে।" },
      ],
    },
  ],
  concepts: [
    "যেকোনো গ্র্যাডিয়েন্ট ক্ষেত্র অঘূর্ণনশীল। পাহাড়ের ঢালের তীরের ক্ষেত্রে কি ঘূর্ণি থাকতে পারে?",
    "বল অঘূর্ণনশীল হলে তাকে সংরক্ষণশীল বলা যায়। এর অর্থ কী হতে পারে, ভেবে দেখো।",
    "এমন একটা ক্ষেত্র ভাবো যার ডাইভারজেন্স শূন্য নয় কিন্তু কার্ল শূন্য। আর এমনটাও, যার উল্টো।",
  ],
  quiz: [
    { q: "∇×(∇φ) কত?", options: ["∇φ", "φ", "শূন্য ভেক্টর", "3"], answer: 2, why: "যেকোনো স্কেলারের গ্র্যাডিয়েন্টের কার্ল শূন্য ভেক্টর, কারণ মিশ্র অবকলনগুলো কাটাকাটি হয়ে যায়।" },
    { q: "A⃗ = −y î + x ĵ হলে (∇×A⃗)z কত?", options: ["0", "1", "2", "−2"], answer: 2, why: "∂Ay/∂x − ∂Ax/∂y = 1 − (−1) = 2। চাকা উল্টো ঘড়ির দিকে ঘোরে।" },
    { q: "কার্ল শূন্য হলে ক্ষেত্রকে কী বলে?", options: ["সলিনয়ডাল", "অঘূর্ণনশীল", "উৎস", "গ্রাহক"], answer: 1, why: "কার্ল শূন্য মানে ঘূর্ণি নেই, তাই অঘূর্ণনশীল। ডাইভারজেন্স শূন্য হলে বলে সলিনয়ডাল।" },
    { q: "A⃗ = x î + y ĵ + z k̂ হলে ∇×A⃗ কত?", options: ["3", "শূন্য ভেক্টর", "î + ĵ + k̂", "সংখ্যা 0"], answer: 1, why: "এটা একটা গ্র্যাডিয়েন্ট ক্ষেত্র, তাই কার্ল শূন্য ভেক্টর। 3 হলো এর ডাইভারজেন্স, আর কার্ল স্কেলার নয়।" },
    { q: "A⃗ = y î হলে (∇×A⃗)z কত?", options: ["1", "−1", "0", "y"], answer: 1, why: "∂Ay/∂x − ∂Ax/∂y = 0 − 1 = −1। ঋণাত্মক, তাই চাকা ঘড়ির কাঁটার দিকে ঘোরে।" },
  ],
};

const stepField: FieldKey[] = ["uniform", "rotation", "rotation", "shear", "source", "source"];

function Wheel({ curl }: { curl: number }) {
  const spin = curl !== 0;
  const dur = 4 / Math.abs(curl || 1);
  return (
    <g>
      <circle cx={220} cy={145} r={44} strokeWidth={2.5} style={{ fill: "var(--surface)", stroke: "var(--edge)", opacity: 0.92 }} />
      <motion.g
        key={curl}
        animate={spin ? { rotate: curl > 0 ? [0, -360] : [0, 360] } : { rotate: 0 }}
        transition={spin ? { duration: dur, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        {[0, 90, 180, 270].map((a) => (
          <g key={a} transform={`rotate(${a} 220 145)`}>
            <line x1={220} y1={145} x2={220} y2={115} strokeWidth={3} style={{ stroke: col.f }} />
            <rect x={212} y={108} width={16} height={7} rx={2} style={{ fill: col.r }} />
          </g>
        ))}
        <circle cx={220} cy={145} r={5} style={{ fill: col.f }} />
      </motion.g>
    </g>
  );
}

export default function Anim() {
  const [cur, setCur] = useState(0);
  const [pick, setPick] = useState<FieldKey>("rotation");

  const steps: LessonStep[] = [
    {
      title: "ভাসমান চাকা",
      text: "ছবির মাঝে পাখনাওয়ালা একটা চাকা পানিতে ভাসছে। এখানে স্রোত সোজা সমান, সব তীর ডানে। চাকাটা শুধু ভেসে চলে, ঘোরে না।",
    },
    {
      title: "ঘূর্ণি স্রোত",
      text: "এবার স্রোত বৃত্তাকারে ঘুরছে। চাকাটা উল্টো ঘড়ির দিকে ঘুরতে শুরু করেছে। অর্থাৎ এখানে কার্ল আছে, আর সে ধনাত্মক।",
    },
    {
      title: "কার্লের সূত্র",
      text: "দুই মাত্রার ক্ষেত্রে কার্লের শুধু z-উপাংশ থাকে। A = −y î + x ĵ হলে Ax = −y আর Ay = x।",
      tex: ["(\\nabla\\times\\vec A)_z=\\frac{\\partial A_y}{\\partial x}-\\frac{\\partial A_x}{\\partial y}", "(\\nabla\\times\\vec A)_z=\\frac{\\partial x}{\\partial x}-\\frac{\\partial(-y)}{\\partial y}=1+1=2"],
    },
    {
      title: "সোজা তীর, তবু ঘোরে",
      text: "এই ক্ষেত্রে সব তীর ডানে, কিন্তু ওপরে স্রোত জোরালো, নিচে ধীর। চাকার ওপরের পাখনা বেশি জোরে ধাক্কা খায়, তাই চাকা ঘড়ির কাঁটার দিকে ঘোরে। কার্ল ঋণাত্মক।",
      tex: ["\\vec A=y\\hat\\imath", "(\\nabla\\times\\vec A)_z=0-\\frac{\\partial y}{\\partial y}=-1"],
    },
    {
      title: "ছড়ানো স্রোতে ঘোরে না",
      text: "উৎস থেকে চারদিকে ছড়ালে চাকা সোজা সরে যায়, ঘোরে না। ছড়ানো আর ঘোরা আলাদা জিনিস।",
      tex: ["\\vec A=x\\hat\\imath+y\\hat\\jmath", "(\\nabla\\times\\vec A)_z=0-0=0"],
    },
    {
      title: "অঘূর্ণনশীল ক্ষেত্র",
      text: "কার্ল শূন্য হলে ক্ষেত্র অঘূর্ণনশীল। কোনো স্কেলারের গ্র্যাডিয়েন্ট থেকে পাওয়া ক্ষেত্র সব সময় এমন। এই উৎস-ক্ষেত্র A = ∇(x² + y²)/2।",
      tex: ["\\nabla\\times\\vec A=\\vec 0", "\\nabla\\times(\\nabla\\varphi)=\\vec 0"],
    },
    {
      title: "নিজে বাছাই করো",
      text: "নিচের বোতাম থেকে ক্ষেত্র বাছাই করো। চাকা কোন দিকে ঘোরে বা ঘোরে না, দেখে কার্লের চিহ্ন আন্দাজ করো, তারপর ডান কোণের মানের সাথে মেলাও।",
    },
  ];

  const figure = (s: number) => {
    const f: FieldKey = s >= stepField.length ? pick : stepField[s];
    const def = fields[f];
    const dirText = def.curl > 0 ? "চাকা ঘোরে উল্টো ঘড়ির দিকে" : def.curl < 0 ? "চাকা ঘোরে ঘড়ির কাঁটার দিকে" : "চাকা ঘোরে না";
    return (
      <Stage w={440} h={290} label="ভেক্টর ক্ষেত্রে ভাসমান চাকা ও কার্ল">
        <Quiver field={f} c="p" />
        <Particles key={f} field={f} />
        <Wheel curl={def.curl} />
        <Lab p={{ x: 20, y: 26 }} anchor="start">{def.label}</Lab>
        <Lab p={{ x: 20, y: 48 }} anchor="start" c="m">{dirText}</Lab>
        <Lab p={{ x: 420, y: 26 }} anchor="end" c="r">(∇×A)z = {def.curl}</Lab>
      </Stage>
    );
  };

  const options = (Object.keys(fields) as FieldKey[]).map((k) => ({ key: k, name: fields[k].name }));
  const extra = cur === 6 ? <Chips label="ক্ষেত্র বাছাই" value={pick} options={options} onChange={setPick} /> : null;

  return <Lesson steps={steps} figure={figure} extra={extra} onStep={setCur} />;
}
