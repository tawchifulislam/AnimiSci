"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lesson, type LessonStep } from "@/components/ui/Lesson";
import { Slider } from "@/components/ui/Slider";
import { Arc, Dot, Lab, Seg, SliderCard, Stage, Vec, add, col, mid, pol, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { deg, f1, rad } from "@/lib/vec";

export const meta: LessonMeta = {
  goal: "স্রোতের নদীতে নৌকার মোট বেগ বের করতে পারবে, সবচেয়ে কম সময়ে এবং সোজা ওপারে পৌঁছানোর শর্ত দুটি আলাদা করে বলতে পারবে।",
  hook: "নদীর এপারে তুমি, ঠিক সামনে ওপারে তোমার বন্ধু। নৌকা সোজা বন্ধুর দিকে মুখ করে চালালে কি বন্ধুর কাছে পৌঁছাবে? না। স্রোত তোমাকে নিচে ভাসিয়ে নেবে। তাহলে মুখ কোন দিকে রাখলে সোজা ওপারে নামা যায়? আর কোন দিকে রাখলে সবচেয়ে তাড়াতাড়ি পৌঁছানো যায়? দুটো প্রশ্নের উত্তর আলাদা।",
  formulas: [
    { tex: "\\vec g=\\vec v+\\vec u", meaning: "ঘাট থেকে দেখা মোট বেগ g। v নৌকার নিজের বেগ, u স্রোতের বেগ।" },
    { tex: "t=\\dfrac{d}{v\\sin\\alpha}", meaning: "পার হওয়ার সময়। α হলো নৌকার মুখ ও স্রোতের দিকের মাঝের কোণ, d নদীর প্রস্থ।" },
    { tex: "x=(u+v\\cos\\alpha)\\,t", meaning: "স্রোত বরাবর কতটা ভেসে যাবে।" },
    { tex: "t_{\\min}=\\dfrac{d}{v}\\quad(\\alpha=90^\\circ)", meaning: "সবচেয়ে কম সময়। নৌকার মুখ তীরের সাথে লম্ব রাখতে হয়।" },
    { tex: "\\cos\\varphi=\\dfrac{u}{v},\\quad t=\\dfrac{d}{\\sqrt{v^2-u^2}}", meaning: "সোজা ওপারে যেতে নৌকার মুখ স্রোতের উল্টো দিকে φ কোণে রাখতে হয়। শর্ত v > u।" },
  ],
  example: {
    problem: "একটি নদীর প্রস্থ 120 m, স্রোতের বেগ 3 m/s। নৌকার বেগ 5 m/s। (ক) সবচেয়ে কম সময়ে পার হতে কত সময় লাগবে এবং কতটা ভেসে যাবে? (খ) সোজা ওপারে যেতে হলে মুখ কোন দিকে রাখতে হবে এবং কত সময় লাগবে?",
    steps: [
      { text: "(ক) সবচেয়ে কম সময়ে নৌকার মুখ তীরের লম্বে রাখি।", tex: "t_{\\min}=\\frac{d}{v}=\\frac{120}{5}=24\\ \\text{s}" },
      { text: "এই সময়ে স্রোত নৌকাকে নিচে ভাসিয়ে নেয়।", tex: "x=u\\,t=3\\times24=72\\ \\text{m}" },
      { text: "(খ) সোজা পার হতে স্রোত বরাবর বেগ শূন্য করতে হবে। মুখ স্রোতের উল্টো দিকে হেলাই।", tex: "\\cos\\varphi=\\frac{u}{v}=\\frac{3}{5}\\Rightarrow\\varphi=53.1^\\circ" },
      { text: "তখন ওপারের দিকে বেগ হয় √(v² − u²) = √(25 − 9) = 4 m/s।", tex: "t=\\frac{d}{\\sqrt{v^2-u^2}}=\\frac{120}{4}=30\\ \\text{s}" },
      { text: "উত্তর: (ক) 24 s, 72 m ভাসবে। (খ) স্রোতের উল্টো দিকের সাথে 53.1° কোণে মুখ রাখতে হবে, সময় 30 s।" },
    ],
  },
  mistakes: [
    "সবচেয়ে কম সময় আর সবচেয়ে কম পথ একই ভাবা। কম সময়ে পৌঁছালে নিচে নামতে হয়, সোজা নামতে চাইলে সময় বাড়ে।",
    "সোজা ওপারে যেতে নৌকার মুখ সোজা ওপারের দিকে রাখা। তাহলে স্রোত ভাসিয়ে নেবে।",
    "স্রোত বাড়লে পার হওয়ার সময়ও বাড়ে ভাবা। নৌকার মুখ লম্ব থাকলে সময় স্রোতের ওপর নির্ভর করে না।",
    "v ≤ u হলেও সোজা পার হওয়ার সূত্র বসানো। তখন √(v² − u²) পাওয়াই যায় না, কারণ সোজা পার অসম্ভব।",
  ],
  recap: [
    "ঘাট থেকে নৌকার মোট বেগ হলো নৌকার বেগ আর স্রোতের বেগের ভেক্টর যোগফল।",
    "ওপারের দিকে কাজ করে শুধু v sinα। তাই স্রোত পার হওয়ার সময় বদলায় না, শুধু কোথায় নামবে তা বদলায়।",
    "সবচেয়ে কম সময়: মুখ তীরের লম্বে, t = d/v, ভেসে যাওয়া x = u d / v।",
    "সোজা ওপারে: মুখ স্রোতের উল্টো দিকে, cosφ = u/v, t = d/√(v² − u²)। শর্ত v > u।",
  ],
  quiz: [
    { q: "সবচেয়ে কম সময়ে নদী পার হতে নৌকার মুখ কোন দিকে রাখতে হয়?", options: ["স্রোতের দিকে", "স্রোতের উল্টো দিকে", "তীরের সাথে লম্ব", "তীরের সমান্তরাল"], answer: 2, why: "ওপারের দিকে বেগ v sinα, যা α = 90° এ সবচেয়ে বড়। তাই মুখ তীরের লম্বে।" },
    { q: "নদীর প্রস্থ 100 m, নৌকার বেগ 4 m/s। সবচেয়ে কম সময় কত?", options: ["4 s", "25 s", "40 s", "400 s"], answer: 1, why: "t = d / v = 100 ÷ 4 = 25 s।" },
    { q: "স্রোতের বেগ 5 m/s, নৌকার বেগ 3 m/s। সোজা ওপারে পৌঁছানো যাবে কি?", options: ["যাবে, মুখ লম্ব রাখলে", "যাবে, মুখ উল্টো দিকে রাখলে", "যাবে না, কারণ v < u", "যাবে, সময় বেশি লাগবে"], answer: 2, why: "সোজা যেতে cosφ = u/v = 5/3 > 1 হতে হয়, যা অসম্ভব। তাই কোনো কোণেই সোজা পার হওয়া যায় না।" },
    { q: "d = 120 m, v = 5 m/s, u = 3 m/s হলে সোজা পার হতে সময় কত?", options: ["24 s", "30 s", "15 s", "40 s"], answer: 1, why: "t = d / √(v² − u²) = 120 ÷ 4 = 30 s। 24 s হলো সবচেয়ে কম সময়ের পদ্ধতির ফল।" },
  ],
};

const D = 120;
const X0 = 50;
const YB = 225;
const YT = 75;
const PXM = (YB - YT) / D;
const KV = 12;
const P = (x: number, y: number): Pt => ({ x, y });

function River() {
  return (
    <>
      <rect x={20} y={YT} width={400} height={YB - YT} style={{ fill: col.t, opacity: 0.12 }} />
      <line x1={20} y1={YT} x2={420} y2={YT} strokeWidth={4} strokeLinecap="round" style={{ stroke: col.m }} />
      <line x1={20} y1={YB} x2={420} y2={YB} strokeWidth={4} strokeLinecap="round" style={{ stroke: col.m }} />
      <Lab p={P(24, YT - 10)} anchor="start" c="m">ওপার</Lab>
      <Lab p={P(24, YB + 22)} anchor="start" c="m">এপার</Lab>
    </>
  );
}

function Stream({ u }: { u: number }) {
  return (
    <>
      {[110, 230, 350].map((x) => (
        <line key={x} x1={x} y1={150} x2={x + 46} y2={150} strokeWidth={3} strokeLinecap="round" markerEnd="url(#ah-t)" style={{ stroke: col.t, opacity: 0.85 }} />
      ))}
      <Lab p={P(285, 172)} c="t">স্রোত u = {u}</Lab>
    </>
  );
}

export default function Anim() {
  const [v, setV] = useState(5);
  const [u, setU] = useState(3);
  const [al, setAl] = useState(110);

  const can = v > u;
  const aStraight = can ? 180 - deg(Math.acos(u / v)) : 90;
  const tAl = D / (v * Math.sin(rad(al)));
  const phi = can ? deg(Math.acos(u / v)) : 0;
  const tStraight = can ? D / Math.sqrt(v * v - u * u) : 0;

  const steps: LessonStep[] = [
    {
      title: "নদীর ওপারে",
      text: "এপারের বিন্দু A থেকে ঠিক সামনের ওপারের বিন্দু B-তে যেতে চাই। স্রোত ডান দিকে বইছে। নৌকা সোজা B-র দিকে চালালে কি B-তে পৌঁছাব?",
    },
    {
      title: "দুই বেগ",
      text: "নৌকার নিজের বেগ v আর স্রোতের বেগ u। ঘাটের মানুষ দেখে এই দুটোর ভেক্টর যোগফল, লাল তীর g।",
      tex: ["\\vec g=\\vec v+\\vec u"],
    },
    {
      title: "দুই উপাংশ",
      text: "নৌকার মুখ স্রোতের দিকের সাথে α কোণে। ওপারের দিকে বেগ v sinα। স্রোত বরাবর বেগ u + v cosα।",
      tex: ["v_{\\perp}=v\\sin\\alpha", "v_{\\parallel}=u+v\\cos\\alpha"],
    },
    {
      title: "পার হতে সময়",
      text: "নদীর প্রস্থ d। ওপারের দিকে শুধু v sinα কাজ করে। স্রোত এখানে কিছুই করে না।",
      tex: ["t=\\frac{d}{v\\sin\\alpha}", `t=\\frac{${D}}{${v}\\sin${al}^\\circ}=${f1(tAl)}\\ \\text{s}`],
      note: "স্রোত পার হওয়ার সময় বদলায় না। বদলায় শুধু কোথায় নামবে।",
    },
    {
      title: "সবচেয়ে কম সময়",
      text: "sinα সবচেয়ে বড় হয় α = 90° এ। তাই নৌকার মুখ তীরের লম্বে রাখলে সময় সবচেয়ে কম। কিন্তু স্রোত তোমাকে নিচে ভাসিয়ে নেবে।",
      tex: [`t_{\\min}=\\frac{d}{v}=\\frac{${D}}{${v}}=${f1(D / v)}\\ \\text{s}`, `x=u\\,t_{\\min}=${u}\\times${f1(D / v)}=${f1((u * D) / v)}\\ \\text{m}`],
    },
    {
      title: "সোজা ওপারে",
      text: can
        ? `ঠিক B-তে নামতে স্রোত বরাবর মোট বেগ শূন্য করতে হবে। তাই নৌকার মুখ স্রোতের উল্টো দিকে φ = ${f1(phi)}° কোণে হেলাতে হয়।`
        : "ঠিক B-তে নামতে স্রোত বরাবর মোট বেগ শূন্য করতে হবে। কিন্তু এখন v ≤ u, তাই এই বেগে তা সম্ভব নয়। v বাড়িয়ে দেখো।",
      tex: can
        ? ["u+v\\cos\\alpha=0", "\\cos\\varphi=\\frac{u}{v}", `t=\\frac{d}{\\sqrt{v^2-u^2}}=\\frac{${D}}{\\sqrt{${v}^2-${u}^2}}=${f1(tStraight)}\\ \\text{s}`]
        : ["u+v\\cos\\alpha=0", "\\cos\\varphi=\\frac{u}{v}\\ge1"],
      note: "φ মাপা হয় স্রোতের উল্টো দিক থেকে। সোজা পথে সময় সবচেয়ে কম সময়ের চেয়ে বেশি।",
    },
    {
      title: "যখন সম্ভব নয়",
      text: "v ≤ u হলে cosφ = u/v ≥ 1, এমন φ হয় না। স্রোত নৌকার চেয়ে জোরালো। মুখ যেদিকেই রাখো, মোট বেগ স্রোতের দিকেই থাকে।",
      tex: ["v\\le u\\Rightarrow\\cos\\varphi\\ge1"],
    },
    {
      title: "নিজে করো",
      text: "v, u আর α বদলাও। দেখো কখন সময় কমে, কখন নৌকা কতটা ভেসে যায়। তারপর α-কে 90° এ নিয়ে সবচেয়ে কম সময় যাচাই করো।",
      tex: [`t=${f1(tAl)}\\ \\text{s}`],
    },
  ];

  const stuck = () => {
    const S = P(X0 + 140, YB);
    return (
      <Stage w={440} h={290} label="নৌকার বেগ স্রোতের কম হলে সোজা পার হওয়া যায় না">
        <River />
        <Vec a={P(S.x, S.y - 20)} b={P(S.x + 5 * KV, S.y - 20)} c="q" w={4} />
        <Lab p={P(S.x + 5 * KV + 8, S.y - 16)} c="q" anchor="start">u = 5</Lab>
        <Vec a={P(S.x, S.y - 50)} b={P(S.x - 3 * KV, S.y - 50)} c="p" w={4} />
        <Lab p={P(S.x - 3 * KV - 8, S.y - 46)} c="p" anchor="end">v = 3</Lab>
        <Vec a={P(S.x, S.y - 80)} b={P(S.x + 2 * KV, S.y - 80)} c="r" w={4} />
        <Lab p={P(S.x + 2 * KV + 8, S.y - 76)} c="r" anchor="start">মোট বেগ = 2</Lab>
        <Lab p={P(220, 118)} c="r">v &lt; u, তাই মোট বেগ সব সময় স্রোতের দিকে</Lab>
        <Dot p={S} />
      </Stage>
    );
  };

  const figure = (s: number) => {
    if (s === 6) return stuck();
    const a = s === 4 ? 90 : s === 5 ? aStraight : al;
    const sa = Math.sin(rad(a));
    const ca = Math.cos(rad(a));
    const t = D / (v * sa);
    const gx = u + v * ca;
    const drift = gx * t;
    const S = P(X0, YB);
    const B = P(X0, YT);
    const end = P(Math.min(X0 + drift * PXM, 425), YT);
    const vv = P(S.x + v * ca * KV, S.y - v * sa * KV);
    const gg = P(S.x + gx * KV, S.y - v * sa * KV);

    return (
      <Stage w={440} h={290} label="নদী পার হওয়া নৌকার পথ ও বেগ">
        <River />
        <Stream u={u} />
        <Dot p={B} c="f" r={5} />
        <Lab p={add(B, -10, -4)} anchor="end">B</Lab>

        <Seg a={S} b={end} show={s >= 3} dash c="r" w={2} />
        <Seg a={B} b={end} show={s >= 4 && drift > 1} c="u" w={5} />
        <Lab p={add(mid(B, end), 0, -14)} show={s >= 4 && drift > 1} c="u">ভেসে যাওয়া = {f1(drift)} m</Lab>

        <Seg a={S} b={P(gg.x, S.y)} show={s === 2 || s === 3} dash c="u" w={2} />
        <Seg a={P(gg.x, S.y)} b={gg} show={s === 2 || s === 3} dash c="u" w={2} />
        <Lab p={P((S.x + gg.x) / 2, S.y + 18)} show={s === 2 || s === 3} c="u">u + v cosα</Lab>
        <Lab p={P(gg.x + 8, (S.y + gg.y) / 2)} show={s === 2 || s === 3} c="u" anchor="start">v sinα</Lab>

        <Vec a={S} b={vv} c="p" w={3.5} show={s >= 1} />
        <Vec a={vv} b={gg} c="q" w={3} show={s >= 1} />
        <Vec a={S} b={gg} c="r" w={4} show={s >= 1} />
        <Lab p={add(mid(S, vv), -8, -2)} show={s >= 1} c="p" anchor="end">v</Lab>
        <Lab p={add(mid(vv, gg), 0, -8)} show={s >= 1} c="q">u</Lab>
        <Lab p={add(mid(S, gg), 12, 14)} show={s >= 1} c="r" anchor="start">g</Lab>

        <Arc o={S} r={30} from={0} to={a} c="f" w={1.5} show={s >= 2 && s !== 5} />
        <Lab p={pol(S, a / 2, 46)} show={s >= 2 && s !== 5}>α</Lab>
        <Arc o={S} r={30} from={a} to={180} c="f" w={1.5} show={s === 5} />
        <Lab p={pol(S, (a + 180) / 2, 46)} show={s === 5}>φ</Lab>

        {s >= 3 ? (
          <motion.circle
            key={`${s}-${a}-${v}-${u}`}
            r={7}
            style={{ fill: col.r }}
            animate={{ cx: [S.x, end.x], cy: [S.y, end.y] }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
          />
        ) : null}
        <Dot p={S} />
        <Lab p={add(S, -10, 20)} anchor="end">A</Lab>

        <Lab p={P(418, 36)} anchor="end" show={s >= 3}>সময় t = {f1(t)} s</Lab>
        <Lab p={P(418, 56)} anchor="end" c="m" show={s >= 2}>নদীর প্রস্থ d = {D} m</Lab>
        <Lab p={P(220, 112)} c="r" show={s === 5 && !can}>v ≤ u, তাই সোজা পার হওয়া যায় না</Lab>
      </Stage>
    );
  };

  const extra = (
    <SliderCard>
      <Slider label="নৌকার বেগ v (m/s)" value={v} min={3} max={8} onChange={setV} />
      <Slider label="স্রোতের বেগ u (m/s)" value={u} min={1} max={6} onChange={setU} />
      <Slider label="নৌকার মুখ ও স্রোতের মাঝের কোণ α" value={al} min={50} max={150} step={5} suffix="°" onChange={setAl} />
    </SliderCard>
  );

  return <Lesson steps={steps} figure={figure} extra={extra} />;
}
