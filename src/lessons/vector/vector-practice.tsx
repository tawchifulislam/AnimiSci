"use client";

import { useState, type ReactNode } from "react";
import { Chips } from "@/components/anim/controls";
import { Tex } from "@/components/ui/Tex";
import type { LessonMeta } from "@/lessons/types";
import { bn } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "পুরো ভেক্টর অধ্যায় ঝালিয়ে নেবে। সূত্রগুলো ফ্ল্যাশকার্ডে নিজেকে পরীক্ষা করবে, দুটি সৃজনশীল প্রশ্নের উত্তর লেখার কৌশল দেখবে এবং ১০টি MCQ দিয়ে যাচাই করবে।",
  hook: "পরীক্ষার হলে সূত্র মনে না পড়লে সবচেয়ে বিপদ। তাই আগে ফ্ল্যাশকার্ডে নিজেকে পরীক্ষা করো: প্রশ্ন পড়ো, সূত্রটা মনে মনে বলো, তারপর কার্ডে চেপে মিলিয়ে নাও। এরপর সৃজনশীল প্রশ্ন নিজে করে তারপর উত্তর দেখো।",
  formulas: [
    { tex: "\\alpha=0^\\circ:\\ R=P+Q,\\qquad \\alpha=180^\\circ:\\ R=|P-Q|", meaning: "লব্ধির সীমা। উত্তর এর বাইরে গেলে ভুল।" },
    { tex: "\\vec A\\cdot\\vec B=0\\ \\Leftrightarrow\\ \\vec A\\perp\\vec B", meaning: "ডট গুণন শূন্য মানে অশূন্য ভেক্টর দুটি লম্ব।" },
    { tex: "\\vec A\\times\\vec B=\\vec 0\\ \\Leftrightarrow\\ \\vec A\\parallel\\vec B", meaning: "ক্রস গুণন শূন্য মানে অশূন্য ভেক্টর দুটি সমান্তরাল।" },
    { tex: "\\nabla\\times(\\nabla\\varphi)=\\vec 0,\\qquad \\nabla\\cdot(\\nabla\\times\\vec A)=0", meaning: "গ্র্যাডিয়েন্টের কার্ল আর কার্লের ডাইভারজেন্স সব সময় শূন্য।" },
    { tex: "\\nabla\\cdot\\vec r=3,\\qquad \\nabla\\times\\vec r=\\vec 0", meaning: "অবস্থান ভেক্টরের ডাইভারজেন্স 3, কার্ল শূন্য।" },
    { tex: "v_{AB}=v_A-v_B", meaning: "আপেক্ষিক বেগের মূল নিয়ম। উল্টো দিকে চললে মান যোগ হয়।" },
  ],
  example: {
    problem: "সৃজনশীল প্রশ্নের চার অংশ (ক, খ, গ, ঘ) কীভাবে লিখবে? নিচের দুটি প্রশ্নে এই কাঠামো দেখো।",
    steps: [
      { text: "ক (জ্ঞানমূলক, 1 নম্বর): সংজ্ঞা বা সূত্র এক-দুই লাইনে লেখো। এখানে অঙ্ক নেই।" },
      { text: "খ (অনুধাবনমূলক, 2 নম্বর): কেন বা কীভাবে, তা যুক্তি দিয়ে ব্যাখ্যা করো। দরকার হলে একটা সূত্র বসাও।" },
      { text: "গ (প্রয়োগমূলক, 3 নম্বর): উদ্দীপকের সংখ্যা বসিয়ে অঙ্ক করো। সূত্র, বসানো, ফল ও একক, এই চার ধাপ লেখো।" },
      { text: "ঘ (উচ্চতর দক্ষতা, 4 নম্বর): আগের অংশের ফল ব্যবহার করে তুলনা, বিশ্লেষণ বা মন্তব্য করো। শেষে একটা সিদ্ধান্ত লেখো।" },
    ],
  },
  mistakes: [
    "গ আর ঘ-তে সূত্র না লিখে শুধু উত্তর লেখা। সূত্র ও বসানোর ধাপে নম্বর থাকে।",
    "এককের ভুল বা একক না লেখা। বল N, বেগ m/s, কাজ J।",
    "ঘ-তে শুধু গণনা করে থামা। তুলনা বা মন্তব্য না লিখলে নম্বর কাটা যায়।",
    "MCQ-তে ডট ও ক্রস গুলিয়ে ফেলা। cos হলে ডট, sin হলে ক্রস।",
  ],
  recap: [
    "যোগ আর বিভাজন: লব্ধির সূত্র, লম্ব উপাংশে cos ও sin, আর দুই দিকে ভাগে সাইন সূত্র।",
    "গুণন: ডট গুণন cos, ফল স্কেলার। ক্রস গুণন sin, ফল ভেক্টর।",
    "প্রয়োগ: নদী পারে সময় d/(v sinα), আপেক্ষিক বেগে মানুষের বেগ বিয়োগ।",
    "ক্যালকুলাস: গ্র্যাডিয়েন্ট ভেক্টর, ডাইভারজেন্স স্কেলার, কার্ল ভেক্টর।",
  ],
  quiz: [
    { q: "নিচের কোনটি ভেক্টর রাশি?", options: ["কাজ", "ত্বরণ", "শক্তি", "দ্রুতি"], answer: 1, why: "ত্বরণের মান ও দিক দুটোই আছে। কাজ, শক্তি ও দ্রুতি স্কেলার।" },
    { q: "3 N ও 4 N বল পরস্পর লম্বভাবে কাজ করলে লব্ধি কত?", options: ["7 N", "1 N", "5 N", "12 N"], answer: 2, why: "লম্ব হলে R = √(3² + 4²) = 5 N।" },
    { q: "θ = 90° হলে A⃗·B⃗ কত?", options: ["AB", "0", "−AB", "A + B"], answer: 1, why: "cos 90° = 0, তাই লম্ব ভেক্টরের ডট গুণন শূন্য।" },
    { q: "î × ĵ কত?", options: ["k̂", "−k̂", "0", "î"], answer: 0, why: "চক্র অনুযায়ী î × ĵ = k̂। ĵ × î হলে −k̂ হতো।" },
    { q: "A⃗ = 3î − 4ĵ হলে A⃗-এর মান কত?", options: ["1", "5", "7", "−5"], answer: 1, why: "√(3² + (−4)²) = √25 = 5। মান কখনো ঋণাত্মক হয় না।" },
    { q: "দুটি অশূন্য ভেক্টর সমান্তরাল হলে তাদের ক্রস গুণফল কী?", options: ["AB", "শূন্য ভেক্টর", "সংখ্যা 1", "অসীম"], answer: 1, why: "θ = 0° বা 180°, sinθ = 0। ফল শূন্য ভেক্টর।" },
    { q: "A⃗ = x î + y ĵ + z k̂ হলে ∇·A⃗ কত?", options: ["0", "1", "3", "x + y + z"], answer: 2, why: "1 + 1 + 1 = 3।" },
    { q: "গ্র্যাডিয়েন্ট কোন দিকে নির্দেশ করে?", options: ["φ সবচেয়ে ধীরে বাড়ে যেদিকে", "φ সবচেয়ে দ্রুত বাড়ে যেদিকে", "φ স্থির থাকে যেদিকে", "সব সময় x-অক্ষ বরাবর"], answer: 1, why: "গ্র্যাডিয়েন্ট φ-এর সবচেয়ে দ্রুত বৃদ্ধির দিক দেখায়।" },
    { q: "বৃষ্টি 4 m/s বেগে খাড়া পড়ছে, মানুষ 3 m/s বেগে হাঁটছে। বৃষ্টির আপেক্ষিক বেগ কত?", options: ["1 m/s", "5 m/s", "7 m/s", "12 m/s"], answer: 1, why: "লম্ব দুই বেগ, তাই √(4² + 3²) = 5 m/s।" },
    { q: "নদীর প্রস্থ 100 m, নৌকার বেগ 5 m/s। সবচেয়ে কম সময়ে পার হতে কত সময় লাগে?", options: ["10 s", "20 s", "25 s", "500 s"], answer: 1, why: "t = d / v = 100 ÷ 5 = 20 s।" },
  ],
};

const cards: { q: string; tex: string }[] = [
  { q: "দুই ভেক্টরের লব্ধির মান", tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}" },
  { q: "লব্ধি P-এর সাথে কত কোণে থাকে", tex: "\\tan\\theta=\\dfrac{Q\\sin\\alpha}{P+Q\\cos\\alpha}" },
  { q: "ভেক্টর বিয়োগের মান", tex: "|\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}" },
  { q: "লম্ব উপাংশ", tex: "A_x=A\\cos\\theta,\\quad A_y=A\\sin\\theta" },
  { q: "দুই দিকে বিভাজনের সাইন সূত্র", tex: "\\dfrac{P}{\\sin\\beta}=\\dfrac{Q}{\\sin\\alpha}=\\dfrac{R}{\\sin(\\alpha+\\beta)}" },
  { q: "নদী পারের সবচেয়ে কম সময়", tex: "t_{\\min}=\\dfrac{d}{v}" },
  { q: "নদী সোজা পার হওয়ার সময়", tex: "t=\\dfrac{d}{\\sqrt{v^2-u^2}}" },
  { q: "ছাতা খাড়া থেকে কত কোণে হেলবে", tex: "\\tan\\theta=\\dfrac{v_m}{v_r}" },
  { q: "ডট গুণন", tex: "\\vec A\\cdot\\vec B=AB\\cos\\theta=A_xB_x+A_yB_y+A_zB_z" },
  { q: "ক্রস গুণনের মান", tex: "|\\vec A\\times\\vec B|=AB\\sin\\theta" },
  { q: "ডাইভারজেন্স", tex: "\\nabla\\cdot\\vec A=\\dfrac{\\partial A_x}{\\partial x}+\\dfrac{\\partial A_y}{\\partial y}+\\dfrac{\\partial A_z}{\\partial z}" },
  { q: "গ্র্যাডিয়েন্ট", tex: "\\nabla\\varphi=\\dfrac{\\partial\\varphi}{\\partial x}\\hat\\imath+\\dfrac{\\partial\\varphi}{\\partial y}\\hat\\jmath+\\dfrac{\\partial\\varphi}{\\partial z}\\hat k" },
];

type Part = { tag: string; kind: string; marks: number; q: string; a: ReactNode };

const q1: Part[] = [
  {
    tag: "ক",
    kind: "জ্ঞান",
    marks: 1,
    q: "স্কেলার রাশি কাকে বলে?",
    a: <p>যে ভৌত রাশির কেবল মান আছে, দিক নেই, তাকে স্কেলার রাশি বলে। যেমন দ্রুতি, ভর, সময়।</p>,
  },
  {
    tag: "খ",
    kind: "অনুধাবন",
    marks: 2,
    q: "নৌকার বেগ স্রোতের বেগের সমান বা কম হলে সোজা ওপারে যাওয়া যায় না কেন? ব্যাখ্যা করো।",
    a: (
      <>
        <p>সোজা পার হতে স্রোত বরাবর মোট বেগ শূন্য হতে হবে। নৌকার মুখ স্রোতের উল্টো দিকে φ কোণে রাখলে শর্ত হয়:</p>
        <div className="tex">
          <Tex display>{"v\\cos\\varphi=u\\ \\Rightarrow\\ \\cos\\varphi=\\frac{u}{v}"}</Tex>
        </div>
        <p>v &lt; u হলে u/v &gt; 1, যা cosφ-এর পক্ষে অসম্ভব। v = u হলে φ = 0°, তখন নৌকা পুরোটাই স্রোতের উল্টো দিকে যায়, ওপারের দিকে বেগ থাকে না। তাই দুই ক্ষেত্রেই সোজা পার হওয়া যায় না।</p>
      </>
    ),
  },
  {
    tag: "গ",
    kind: "প্রয়োগ",
    marks: 3,
    q: "মাঝি সোজা ওপারে যেতে চাইলে নৌকার মুখ কোন দিকে রাখবে এবং কত সময় লাগবে?",
    a: (
      <>
        <p>স্রোতের উল্টো দিকের সাথে কোণ φ হলে:</p>
        <div className="tex">
          <Tex display>{"\\cos\\varphi=\\frac{u}{v}=\\frac{3}{5}\\Rightarrow\\varphi=53.1^\\circ"}</Tex>
        </div>
        <div className="tex">
          <Tex display>{"t=\\frac{d}{\\sqrt{v^2-u^2}}=\\frac{120}{\\sqrt{5^2-3^2}}=\\frac{120}{4}=30\\ \\text{s}"}</Tex>
        </div>
        <p>উত্তর: স্রোতের উল্টো দিকের সাথে 53.1° কোণে, সময় 30 s।</p>
      </>
    ),
  },
  {
    tag: "ঘ",
    kind: "উচ্চতর দক্ষতা",
    marks: 4,
    q: "মাঝি সবচেয়ে কম সময়ে পার হতে চাইলে কত সময় লাগবে ও কতটা ভেসে যাবে? কোন পদ্ধতি সুবিধাজনক, মন্তব্য করো।",
    a: (
      <>
        <div className="tex">
          <Tex display>{"t_{\\min}=\\frac{d}{v}=\\frac{120}{5}=24\\ \\text{s},\\qquad x=u\\,t_{\\min}=3\\times24=72\\ \\text{m}"}</Tex>
        </div>
        <p>সবচেয়ে কম সময়ে পার হলে 24 s লাগে, যা সোজা পথের 30 s-এর চেয়ে 6 s কম। কিন্তু নৌকা ঠিক সামনের ঘাটের 72 m নিচে নামে।</p>
        <p>সিদ্ধান্ত: ঠিক সামনের ঘাটে নামতে হলে সোজা পথের পদ্ধতি সুবিধাজনক। শুধু সময় বাঁচাতে চাইলে মুখ লম্বে রাখা ভালো।</p>
      </>
    ),
  },
];

const q2: Part[] = [
  {
    tag: "ক",
    kind: "জ্ঞান",
    marks: 1,
    q: "ডট গুণন কাকে বলে?",
    a: (
      <>
        <p>দুটি ভেক্টরের মান ও তাদের মধ্যবর্তী কোণের cosine-এর গুণফলকে ডট গুণন বলে। ফল স্কেলার।</p>
        <div className="tex">
          <Tex display>{"\\vec A\\cdot\\vec B=AB\\cos\\theta"}</Tex>
        </div>
      </>
    ),
  },
  {
    tag: "খ",
    kind: "অনুধাবন",
    marks: 2,
    q: "দুটি অশূন্য সমান্তরাল ভেক্টরের ক্রস গুণফল শূন্য হয় কেন?",
    a: (
      <>
        <p>ক্রস গুণনের মান AB sinθ। সমান্তরাল ভেক্টরের মাঝের কোণ θ = 0° বা 180°। দুই ক্ষেত্রেই sinθ = 0।</p>
        <div className="tex">
          <Tex display>{"|\\vec A\\times\\vec B|=AB\\sin0^\\circ=0"}</Tex>
        </div>
        <p>তাই ক্রস গুণফল শূন্য ভেক্টর হয়।</p>
      </>
    ),
  },
  {
    tag: "গ",
    kind: "প্রয়োগ",
    marks: 3,
    q: "বল দ্বারা সম্পন্ন কাজ নির্ণয় করো।",
    a: (
      <>
        <p>কাজ হলো বল ও সরণের ডট গুণন:</p>
        <div className="tex">
          <Tex display>{"W=\\vec F\\cdot\\vec s=6\\times4+8\\times3=24+24=48\\ \\text{J}"}</Tex>
        </div>
        <p>উত্তর: 48 J।</p>
      </>
    ),
  },
  {
    tag: "ঘ",
    kind: "উচ্চতর দক্ষতা",
    marks: 4,
    q: "বল ও সরণের মাঝের কোণ বের করো। এই কোণে কাজ কি সর্বোচ্চ? বিশ্লেষণ করো।",
    a: (
      <>
        <div className="tex">
          <Tex display>{"F=\\sqrt{6^2+8^2}=10\\ \\text{N},\\quad s=\\sqrt{4^2+3^2}=5\\ \\text{m}"}</Tex>
        </div>
        <div className="tex">
          <Tex display>{"\\cos\\theta=\\frac{48}{10\\times5}=0.96\\Rightarrow\\theta=16.3^\\circ"}</Tex>
        </div>
        <p>কাজ সর্বোচ্চ হতো θ = 0° হলে, তখন W = Fs = 50 J। পাওয়া গেছে 48 J, যা 50 J-এর চেয়ে কম। তাই কাজ সর্বোচ্চ নয়।</p>
        <p>সিদ্ধান্ত: বলকে সরণের দিকে আরও 16.3° ঘুরিয়ে নিলে একই বলে কাজ 50 J হতো।</p>
      </>
    ),
  },
];

function Flash() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="flash-grid">
      {cards.map((c, i) => {
        const on = Boolean(open[i]);
        return (
          <button key={c.q} type="button" className="flash" aria-pressed={on} onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
            <span className="flash-q">{c.q}</span>
            {on ? (
              <span className="flash-a">
                <Tex display>{c.tex}</Tex>
              </span>
            ) : (
              <span className="flash-hint">সূত্রটা মনে মনে বলো, তারপর চাপো</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Creative({ stem, parts }: { stem: ReactNode; parts: Part[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="cq">
      <p className="cq-stem">{stem}</p>
      {parts.map((p, i) => (
        <div key={p.tag} className="cq-part">
          <div className="cq-q">
            <b>{p.tag}.</b> {p.q}{" "}
            <small>
              ({p.kind}, {bn(p.marks)} নম্বর)
            </small>
          </div>
          <button type="button" className="link-btn" onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}>
            {open[i] ? "উত্তর লুকাও" : "নিজে করে তারপর উত্তর দেখো"}
          </button>
          {open[i] ? <div className="cq-a">{p.a}</div> : null}
        </div>
      ))}
    </div>
  );
}

export default function Anim() {
  const [tab, setTab] = useState<"flash" | "q1" | "q2">("flash");
  return (
    <div className="grid gap-3">
      <Chips
        label="অংশ বাছাই"
        value={tab}
        options={[
          { key: "flash", name: "সূত্র ফ্ল্যাশকার্ড" },
          { key: "q1", name: "সৃজনশীল ১" },
          { key: "q2", name: "সৃজনশীল ২" },
        ]}
        onChange={setTab}
      />
      {tab === "flash" ? (
        <Flash />
      ) : tab === "q1" ? (
        <Creative stem="একটি নদীর প্রস্থ 120 m এবং স্রোতের বেগ 3 m/s। একজন মাঝি স্থির পানিতে 5 m/s বেগের নৌকা নিয়ে ঠিক বিপরীত তীরে সোজা পার হতে চায়।" parts={q1} />
      ) : (
        <Creative stem="একটি বাক্সের ওপর F⃗ = (6î + 8ĵ) N বল প্রয়োগ করায় বাক্সটির সরণ হলো s⃗ = (4î + 3ĵ) m।" parts={q2} />
      )}
    </div>
  );
}
