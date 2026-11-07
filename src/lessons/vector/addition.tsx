"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Tex } from "@/components/ui/Tex";
import { Arc, Dot, Lab, Seg, Square, Stage, Vec, add, mid, mk, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { f1, rad, resultant } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "দুটি ভেক্টর যোগ করলে লব্ধির মান ও দিক কীভাবে বের হয়, সেটা ছবি এঁকে নিজে প্রমাণ করতে পারবে এবং সূত্রটা কেন এমন, তা বুঝবে।",
  hook: "দুই বন্ধু একটা ভারী বাক্সকে আলাদা আলাদা দিকে ঠেলছে। একজনের জোর P, অন্যজনের Q, দুই দিকের মাঝের কোণ α। বাক্সটা শেষে কোন দিকে কতটা জোরে যাবে? দুই ঠেলার এই মিলিত ফলকেই বলে লব্ধি। আজ সেটা বের করার সূত্র নিজে বানাব।",
  formulas: [
    { tex: "R=\\sqrt{P^2+Q^2+2PQ\\cos\\alpha}", meaning: "লব্ধির মান। α হলো দুই ভেক্টরের মাঝের কোণ।" },
    { tex: "\\theta=\\tan^{-1}\\dfrac{Q\\sin\\alpha}{P+Q\\cos\\alpha}", meaning: "লব্ধি P-এর সাথে কত কোণে আছে।" },
    { tex: "\\gamma=\\tan^{-1}\\dfrac{P\\sin\\alpha}{Q+P\\cos\\alpha}", meaning: "লব্ধি Q-এর সাথে কত কোণে আছে। আবার γ = α − θ।" },
    { tex: "\\alpha=0^\\circ:\\ R=P+Q", meaning: "একই দিকে হলে সাধারণ যোগ।" },
    { tex: "\\alpha=90^\\circ:\\ R=\\sqrt{P^2+Q^2}", meaning: "লম্ব হলে পিথাগোরাস।" },
    { tex: "\\alpha=180^\\circ:\\ R=|P-Q|", meaning: "উল্টো দিকে হলে বিয়োগ।" },
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
  quiz: [
    { q: "দুটি ভেক্টর একই দিকে (α = 0°) হলে লব্ধি কত?", options: ["P − Q", "P + Q", "√(P² + Q²)", "শূন্য"], answer: 1, why: "cos 0° = 1, তাই R = √((P + Q)²) = P + Q।" },
    { q: "3 N ও 4 N বল পরস্পর লম্ব। লব্ধি কত?", options: ["7 N", "1 N", "5 N", "12 N"], answer: 2, why: "α = 90° হলে R = √(3² + 4²) = 5 N।" },
    { q: "P = Q এবং α = 120° হলে লব্ধি R কত?", options: ["2P", "P", "P/2", "শূন্য"], answer: 1, why: "R² = 2P² + 2P² cos 120° = 2P² − P² = P², তাই R = P।" },
    { q: "α কত হলে লব্ধি সবচেয়ে ছোট হয়?", options: ["0°", "90°", "120°", "180°"], answer: 3, why: "180° এ দুই ভেক্টর উল্টো দিকে, একে অপরকে কাটে। R = |P − Q|।" },
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
    <Stage w={440} h={300} label="দুটি ভেক্টরের লব্ধি নির্ণয়">
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

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
