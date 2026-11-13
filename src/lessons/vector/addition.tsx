"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LessonStep } from "@/components/ui/Lesson";
import { VideoLesson } from "@/components/lesson/VideoLesson";
import { Slider } from "@/components/ui/Slider";
import { Tex } from "@/components/ui/Tex";
import { Arc, Dot, Lab, Seg, Square, Stage, Vec, add, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad, resultant } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "দুটি ভেক্টর যোগ করলে লব্ধির মান ও দিক কীভাবে বের হয়, সেটা ছবি এঁকে নিজে প্রমাণ করতে পারবে এবং সূত্রটা কেন এমন, তা বুঝবে।",
  hook: "দুই বন্ধু একটা ভারী বাক্সকে আলাদা আলাদা দিকে ঠেলছে। একজনের জোর P, অন্যজনের Q, দুই দিকের মাঝের কোণ α। বাক্সটা শেষে কোন দিকে কতটা জোরে যাবে? দুই ঠেলার এই মিলিত ফলকেই বলে লব্ধি। আজ সেটা বের করার সূত্র নিজে বানাব।",
  look: "Q-কে সরালে তার মান আর দিক বদলায় কি না, লক্ষ করো। আর লাল তীরটা কেন P + Q-এর চেয়ে ছোট হচ্ছে, সেটাও খেয়াল করো।",
  formulas: [
    { tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}", meaning: "লব্ধির মান। α হলো দুই ভেক্টরের মাঝের কোণ।", step: 7 },
    { tex: "\\theta=\\tan^{-1}\\dfrac{Q\\sin\\alpha}{P+Q\\cos\\alpha}", meaning: "লব্ধি P-এর সাথে কত কোণে আছে।", step: 8 },
    { tex: "\\gamma=\\tan^{-1}\\dfrac{P\\sin\\alpha}{Q+P\\cos\\alpha}", meaning: "লব্ধি Q-এর সাথে কত কোণে আছে। আবার γ = α − θ।", step: 9 },
    { tex: "\\alpha=0^\\circ:\\ R=P+Q", meaning: "একই দিকে হলে সাধারণ যোগ।", step: 10 },
    { tex: "\\alpha=90^\\circ:\\ R=\\sqrt{P^2+Q^2}", meaning: "লম্ব হলে পিথাগোরাস।", step: 10 },
    { tex: "\\alpha=180^\\circ:\\ R=|P-Q|", meaning: "উল্টো দিকে হলে বিয়োগ।", step: 10 },
  ],
  example: {
    problem: "3 N ও 4 N মানের দুটি বল পরস্পর লম্বভাবে একটি বস্তুর ওপর কাজ করছে। লব্ধি বলের মান ও দিক নির্ণয় করো।",
    steps: [
      { text: "দেওয়া আছে P = 3, Q = 4, α = 90°। আমরা জানি cos 90° = 0 এবং sin 90° = 1।" },
      { text: "লব্ধির মান বের করি।", tex: "R=\\sqrt{3^2+4^2+2\\cdot3\\cdot4\\cdot0}=\\sqrt{25}=5\\ \\text{N}" },
      { text: "দিক বের করি (P-এর সাপেক্ষে)।", tex: "\\theta=\\tan^{-1}\\frac{4\\times1}{3+4\\times0}=\\tan^{-1}\\frac{4}{3}=53.1^\\circ" },
      { text: "উত্তর: লব্ধি 5 N, যা 3 N বলের সাথে 53.1° কোণ করে।" },
    ],
  },
  mistakes: [
    "দুই ভেক্টরের মান শুধু যোগ করে ফেলা। দিক আলাদা হলে R < P + Q হয়।",
    "α ভুল নেওয়া। α হলো দুই ভেক্টরের লেজ একই বিন্দুতে রেখে তাদের মাঝের কোণ।",
    "θ কার সাপেক্ষে সেটা গুলিয়ে ফেলা। θ সূত্রে লব বসে Q sinα, তাই θ হলো P-এর সাথে কোণ।",
    "ক্যালকুলেটর রেডিয়ান মোডে রেখে cos, sin বের করা।",
  ],
  recap: [
    "ত্রিভুজ সূত্র: দ্বিতীয় ভেক্টরের লেজ প্রথমটির মাথায় বসাও। শুরু থেকে শেষ মাথা পর্যন্ত তীরটাই লব্ধি।",
    "সামান্তরিক সূত্র: দুই ভেক্টরকে একই বিন্দু থেকে এঁকে সামান্তরিক পূর্ণ করো। কর্ণই লব্ধি।",
    "মান: R = √(P² + Q² + 2PQ cosα)। দিক: tanθ = Q sinα ÷ (P + Q cosα)।",
    "α = 0° হলে R সবচেয়ে বড় (P + Q)। α = 180° হলে সবচেয়ে ছোট (|P − Q|)।",
  ],
  think: {
    scenario: "তুমি আর তোমার বন্ধু একটা ভারী বাক্স ঠেলছ। তুমি ঠেলছ পূর্ব দিকে 6 N বলে। বন্ধু ঠেলছে 4 N বলে, তোমার দিকের সাথে 60° কোণে।",
    points: [
      "দুজনে ঠিক একই দিকে ঠেললে মোট বল কত হতো? এখন কোণ থাকায় মোট বল তার চেয়ে বেশি হবে না কম, আর কেন?",
      "বন্ধু যদি ঠিক উল্টো দিক থেকে (180° কোণে) ঠেলত, তাহলে বাক্সের কী হতো?",
      "কোন অবস্থায় বাক্স একেবারেই নড়ত না? দুই বলের মান আর মাঝের কোণ কেমন হতে হবে?",
      "লব্ধি বড় বলের দিকে বেশি হেলে থাকবে, না ছোট বলের দিকে? কেন?",
    ],
    hint: "শেষ ধাপে স্লাইডার পাবে। α-কে 0° আর 180° এ নিয়ে যাও। তারপর P = Q করে α = 180° দিয়ে লাল তীরের কী হয় দেখো।",
    traps: [
      "লব্ধির মান সব সময় P + Q হয়।",
      "α হলো যেকোনো দুই তীরের মাঝের কোণ, তীরের লেজ কোথায় আছে তাতে কিছু আসে না।",
      "θ হলো লব্ধি Q-এর সাথে যে কোণ করে তার মান।",
      "ক্যালকুলেটর রেডিয়ান মোডে থাকলেও cos আর sin-এর মান ঠিকই আসে।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "3 N ও 4 N বল পরস্পর লম্ব। লব্ধির মান এবং P-এর সাথে লব্ধির কোণ বের করো।",
      hint: "α = 90° হলে cos 90° = 0 আর sin 90° = 1।",
      steps: [
        { text: "লব্ধির মান বের করি।", tex: "R=\\sqrt{3^2+4^2+2\\cdot3\\cdot4\\cdot0}=\\sqrt{25}=5\\ \\text{N}" },
        { text: "দিক বের করি (3 N বলের সাপেক্ষে)।", tex: "\\theta=\\tan^{-1}\\frac{4\\times1}{3+4\\times0}=\\tan^{-1}\\frac{4}{3}=53.1^\\circ" },
        { text: "উত্তর: লব্ধি 5 N, যা 3 N বলের সাথে 53.1° কোণ করে।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "দুটি বল 5 N ও 8 N, তাদের মাঝের কোণ 60°। লব্ধির মান ও P-এর সাথে কোণ বের করো।",
      hint: "cos 60° = 0.5 এবং sin 60° = 0.866।",
      steps: [
        { text: "সূত্র লিখি। P = 5, Q = 8, α = 60°।", tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}" },
        { text: "সংখ্যা বসাই।", tex: "R=\\sqrt{25+64+2\\times5\\times8\\times0.5}=\\sqrt{129}=11.4\\ \\text{N}" },
        { text: "দিক বের করি (5 N বলের সাপেক্ষে)।", tex: "\\theta=\\tan^{-1}\\frac{8\\sin60^\\circ}{5+8\\cos60^\\circ}=\\tan^{-1}\\frac{6.93}{9}=37.6^\\circ" },
        { text: "যাচাই: লব্ধি অবশ্যই |P − Q| = 3 আর P + Q = 13-এর মাঝে থাকবে। 3 < 11.4 < 13, তাই উত্তর ঠিক আছে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "দুটি সমান বল F পরস্পর α কোণে আছে। লব্ধি ঠিক F-এর সমান হলে α কত?",
      hint: "লব্ধির সূত্রে P = Q = F বসাও, তারপর R = F ধরো।",
      steps: [
        { text: "সূত্রে P = Q = F বসাই।", tex: "R^2=F^2+F^2+2F^2\\cos\\alpha=2F^2(1+\\cos\\alpha)" },
        { text: "R = F দেওয়া আছে, তাই R² = F²।", tex: "F^2=2F^2(1+\\cos\\alpha)\\Rightarrow1+\\cos\\alpha=\\frac{1}{2}" },
        { text: "cosα বের করি।", tex: "\\cos\\alpha=-\\frac{1}{2}\\Rightarrow\\alpha=120^\\circ" },
        { text: "উত্তর: α = 120°। দুই সমান বলের মাঝের কোণ 120° হলে লব্ধি প্রতিটি বলের সমান হয়।" },
      ],
    },
  ],
  concepts: [
    "কোণ α বাড়ালে লব্ধি কমে কেন? দুই বল তখন পরস্পরকে কতটা সাহায্য করে আর কতটা কাটে, সেটা ভেবে বলো।",
    "লব্ধি কি কখনো দুই বলের ছোটটির চেয়েও ছোট হতে পারে? পারলে কখন, না পারলে কেন?",
    "দুই বলের মান সমান হলে লব্ধি কোন দিকে থাকে? ছবি না এঁকে যুক্তি দিয়ে বলো।",
  ],
  quiz: [
    { q: "দুটি ভেক্টর একই দিকে (α = 0°) হলে লব্ধি কত?", options: ["P − Q", "P + Q", "√(P² + Q²)", "শূন্য"], answer: 1, why: "cos 0° = 1, তাই R = √((P + Q)²) = P + Q। √(P² + Q²) হতো লম্ব হলে।" },
    { q: "3 N ও 4 N বল পরস্পর লম্ব। লব্ধি কত?", options: ["7 N", "1 N", "5 N", "12 N"], answer: 2, why: "α = 90° হলে R = √(3² + 4²) = 5 N। 7 N হলো সরাসরি যোগ করার ভুল।" },
    { q: "P = Q এবং α = 120° হলে লব্ধি R কত?", options: ["2P", "P", "P/2", "শূন্য"], answer: 1, why: "R² = 2P² + 2P² cos 120° = 2P² − P² = P², তাই R = P।" },
    { q: "α কত হলে লব্ধি সবচেয়ে ছোট হয়?", options: ["0°", "90°", "120°", "180°"], answer: 3, why: "180° এ দুই ভেক্টর উল্টো দিকে, একে অপরকে কাটে। R = |P − Q|। 0° এ লব্ধি সবচেয়ে বড়।" },
    { q: "5 N ও 12 N বল পরস্পর লম্বভাবে কাজ করছে। লব্ধি কত?", options: ["17 N", "7 N", "13 N", "60 N"], answer: 2, why: "√(5² + 12²) = √169 = 13 N। 17 N হলো মান সরাসরি যোগ করার ভুল ফল।" },
  ],
};

export default function Anim() {
  const [p, setP] = useState(6);
  const [q, setQ] = useState(4);
  const [alpha, setAlpha] = useState(60);

  const { r, theta, gamma } = resultant(p, q, alpha);
  const m = mk(150, 235, 16);
  const qx = q * Math.cos(rad(alpha));
  const qy = q * Math.sin(rad(alpha));
  const o = m(0, 0);
  const pE = m(p, 0);
  const qE = m(qx, qy);
  const rE = m(p + qx, qy);
  const foot = { x: rE.x, y: o.y };
  const dx = o.x - foot.x >= 0 ? 1 : -1;
  const rightSide = rE.x < 330;

  const steps: LessonStep[] = [
    {
      title: "দুজন মিলে ঠেলছে",
      text: "ছবিতে P আর Q দুজনের ঠেলা। দুটোই একই বিন্দু থেকে শুরু হয়েছে, মাঝের কোণ α। দুজনের মিলিত ফল একটা তীর, যার নাম লব্ধি R। প্রশ্ন: R কত বড় আর কোন দিকে?",
    },
    {
      title: "Q-কে সরাও",
      text: "Q-কে নিজের সমান্তরালে এমনভাবে সরাই যেন তার লেজ P-এর মাথায় লাগে। সরালে মান ও দিক একই থাকে, শুধু জায়গা বদলায়। একে ত্রিভুজ সূত্র বলে।",
      note: "ধরো তুমি P মিটার হাঁটলে, তারপর Q মিটার অন্য দিকে হাঁটলে। শেষ অবস্থান নির্ভর করে দুটো হাঁটাই জোড়া লাগানোর ওপর।",
    },
    {
      title: "লব্ধি R আঁকো",
      text: "শুরুর বিন্দু থেকে Q-এর নতুন মাথা পর্যন্ত তীর টানলেই লব্ধি R পাই। P আর Q মিলে একটা সামান্তরিক হয়েছে, R তার কর্ণ। একে সামান্তরিক সূত্র বলে।",
      tex: ["\\vec R=\\vec P+\\vec Q"],
    },
    {
      title: "লম্ব নামাও",
      text: "R-এর মাথা থেকে P-এর রেখার ওপর লম্ব নামাই। একটা সমকোণী ত্রিভুজ পেলাম, যার অতিভুজ R। সমকোণী ত্রিভুজের দুই বাহু জানলে পিথাগোরাস দিয়ে অতিভুজ বের হয়: অতিভুজ² = ভূমি² + লম্ব²।",
    },
    {
      title: "লম্ব h ও বাড়তি অংশ x",
      text: "Q-কে অতিভুজ ধরে P-এর মাথায় আরেকটা ছোট সমকোণী ত্রিভুজ পাই। এর কোণ α। লম্ব বাহুকে h আর P-এর রেখা বরাবর বাড়তি অংশকে x বলি।",
      tex: ["h=Q\\sin\\alpha", "x=Q\\cos\\alpha"],
      note: "sin = লম্ব ÷ অতিভুজ, cos = ভূমি ÷ অতিভুজ। তাই লম্ব = অতিভুজ × sin, ভূমি = অতিভুজ × cos।",
    },
    {
      title: "বড় ত্রিভুজের ভূমি",
      text: "বড় ত্রিভুজের ভূমি b হলো P আর বাড়তি অংশ x-এর যোগফল।",
      tex: ["b=P+x=P+Q\\cos\\alpha"],
    },
    {
      title: "পিথাগোরাস লাগাই",
      text: "এবার R² = b² + h² লিখি। বন্ধনী খুলে cos²α + sin²α = 1 বসালেই লব্ধির সূত্র পাওয়া যায়।",
      tex: [
        "R^2=b^2+h^2=(P+Q\\cos\\alpha)^2+(Q\\sin\\alpha)^2",
        "R^2=P^2+2PQ\\cos\\alpha+Q^2(\\cos^2\\alpha+\\sin^2\\alpha)",
        "R^2=P^2+Q^2+2PQ\\cos\\alpha",
        "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}",
      ],
    },
    {
      title: "দিক θ বের করি",
      text: "ত্রিভুজে tan θ = লম্ব ÷ ভূমি। এ থেকে R, P-এর সাথে কত কোণ করছে সেটা পাওয়া যায়।",
      tex: ["\\tan\\theta=\\frac{h}{b}=\\frac{Q\\sin\\alpha}{P+Q\\cos\\alpha}", "\\theta=\\tan^{-1}\\frac{Q\\sin\\alpha}{P+Q\\cos\\alpha}"],
    },
    {
      title: "Q-এর সাপেক্ষে কোণ γ",
      text: "R থাকে P আর Q-এর মাঝখানে, তাই α = θ + γ। আবার P আর Q-এর ভূমিকা অদলবদল করে একই যুক্তি দিলে γ-এর সূত্রও পাওয়া যায়।",
      tex: ["\\gamma=\\alpha-\\theta", "\\gamma=\\tan^{-1}\\frac{P\\sin\\alpha}{Q+P\\cos\\alpha}"],
    },
    {
      title: "নিজে যাচাই করো",
      text: "স্লাইডার সরিয়ে দেখো। বিশেষ তিনটি কোণে ফল সহজ হয়ে যায়: 0° হলে সোজা যোগ, 90° হলে পিথাগোরাস, 180° হলে বিয়োগ।",
      tex: [
        `R=${f1(r)},\\ \\theta=${f1(theta)}^\\circ,\\ \\gamma=${f1(gamma)}^\\circ`,
        "\\alpha=0^\\circ:\\ R=P+Q",
        "\\alpha=90^\\circ:\\ R=\\sqrt{P^2+Q^2}",
        "\\alpha=180^\\circ:\\ R=|P-Q|",
      ],
    },
  ];

  const figure = (s: number) => (
    <Stage w={440} h={215} label="দুটি ভেক্টরের লব্ধি নির্ণয়">
      <g transform="translate(0,-85)">
      <line x1={0} y1={o.y} x2={440} y2={o.y} strokeWidth={1} style={{ stroke: "var(--line)" }} />
      <motion.polygon
        initial={false}
        points={`${o.x},${o.y} ${foot.x},${foot.y} ${rE.x},${rE.y}`}
        animate={{ opacity: s >= 6 ? 0.13 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ fill: "var(--c-r)" }}
      />
      <Seg a={pE} b={rE} show={s >= 2} dash c="m" w={1.5} />
      <Seg a={qE} b={rE} show={s >= 2} dash c="m" w={1.5} />

      <Arc o={o} r={28} from={0} to={alpha} c="f" w={1.5} />
      <Arc o={o} r={52} from={0} to={theta} c="p" show={s >= 7} />
      <Arc o={o} r={52} from={theta} to={alpha} c="q" show={s >= 8} />

      <Vec a={o} b={pE} c="p" />
      <Vec a={o} b={qE} c="q" dash={s >= 1} />
      <Vec a={s >= 1 ? pE : o} b={s >= 1 ? rE : qE} c="q" show={s >= 1} />
      <Seg a={o} b={rE} show={s >= 2} c="r" w={s === 6 ? 5 : 3.5} head />

      <Seg a={rE} b={foot} show={s >= 3} dash c="f" w={1.5} />
      <Square at={foot} d1={{ x: dx, y: 0 }} d2={{ x: 0, y: -1 }} show={s >= 3} />
      <Seg a={foot} b={rE} show={s >= 4} c="u" w={4.5} />
      <Seg a={add(pE, 0, 7)} b={add(rE, 0, 7)} show={s >= 4} c="t" w={4.5} />
      <Seg a={add(o, 0, 36)} b={add(foot, 0, 36)} show={s >= 5} c="v" w={4.5} />
      <Dot p={o} />

      <Lab p={add(mid(o, pE), 0, -10)} c="p">P</Lab>
      <Lab p={add(mid(o, qE), -12, -4)} c="q" anchor="end">Q</Lab>
      <Lab p={add(mid(pE, rE), 12, -6)} show={s >= 1} c="q" anchor="start">Q</Lab>
      <Lab p={add(mid(o, rE), -4, -10)} show={s >= 2} c="r" anchor="end">R</Lab>
      <Lab p={{ x: rightSide ? foot.x + 8 : foot.x - 8, y: (o.y + rE.y) / 2 }} show={s >= 4} c="u" anchor={rightSide ? "start" : "end"}>h = Q sinα</Lab>
      <Lab p={add(mid(pE, rE), 0, 24)} show={s >= 4} c="t">x = Q cosα</Lab>
      <Lab p={add(mid(o, foot), 0, 56)} show={s >= 5} c="v">b = P + x</Lab>
      <Lab p={pol(o, alpha / 2, 42)} c="f">α</Lab>
      <Lab p={pol(o, theta / 2, 68)} show={s >= 7} c="p">θ</Lab>
      <Lab p={pol(o, theta + (alpha - theta) / 2, 68)} show={s >= 8} c="q">γ</Lab>
      </g>
    </Stage>
  );

  const extra = (
    <div className="grid gap-4 rounded-xl p-4" style={{ border: "1px solid var(--line)" }}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Slider label={<Tex>{"P"}</Tex>} value={p} min={1} max={8} step={0.5} onChange={setP} />
        <Slider label={<Tex>{"Q"}</Tex>} value={q} min={1} max={8} step={0.5} onChange={setQ} />
        <Slider label={<Tex>{"\\alpha"}</Tex>} value={alpha} min={0} max={180} suffix="°" onChange={setAlpha} />
      </div>
      <div className="flex flex-wrap gap-2">
        {[0, 30, 60, 90, 120, 180].map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAlpha(a)}
            className="rounded-md px-3 py-1 text-xs font-medium"
            style={{
              border: "1px solid var(--line)",
              background: alpha === a ? "var(--c-accent)" : "transparent",
              color: alpha === a ? "#fff" : "inherit",
            }}
          >
            α = {a}°
          </button>
        ))}
      </div>
    </div>
  );

  const below = (
    <div className="try">
      <p className="try-title">নিজে বদলে দেখো</p>
      <p className="try-q">আগে অনুমান করো: α বাড়ালে লব্ধি R বাড়বে না কমবে? তারপর স্লাইডার টেনে মিলিয়ে নাও।</p>
      {extra}
    </div>
  );

  return <VideoLesson steps={steps} figure={figure} below={below} durations={[7, 7, 7, 7, 8, 6, 10, 8, 8, 9]} />;
}
