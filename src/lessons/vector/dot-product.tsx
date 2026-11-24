"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Stage, Vec, add, col, mid, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { rad } from "@/lib/vec";

export const meta: LessonMeta = {
  guided: true,
  goal: "ডট গুণন যে একটা ছায়া আর দৈর্ঘ্যের গুণফল এবং ফল যে স্কেলার, তা বুঝবে। cosθ-এর সূত্র ও উপাংশের সূত্র দুটোই ব্যবহার করে ডট গুণন ও দুই ভেক্টরের মাঝের কোণ বের করতে পারবে।",
  hook: "একজন দড়ি দিয়ে একটা ঠেলাগাড়ি টানছে, দড়িটা একটু ওপর দিকে বাঁকা। দড়ির পুরো টানের কতটুকু গাড়িকে সামনে এগিয়ে নিচ্ছে? যতটুকু সামনে এগোচ্ছে, সেটাই টানের সামনের দিকের ছায়া। এই ছায়াকে সরণ দিয়ে গুণ করলে কাজ পাওয়া যায়। এই গুণটাই ডট গুণন।",
  look: "B-এর ছায়া A-এর রেখায় কতটা পড়ছে আর কোণ বাড়লে সেই ছায়া কীভাবে ছোট হয়ে শূন্য হয়, তারপর উল্টো দিকে চলে যায়, তা খেয়াল করো।",
  formulas: [
    { tex: "\\vec A\\cdot\\vec B=AB\\cos\\theta", meaning: "θ হলো দুই ভেক্টরের মাঝের কোণ। ফল একটা সংখ্যা, ভেক্টর নয়।", step: 3 },
    { tex: "\\theta=0^\\circ,\\ 90^\\circ,\\ 180^\\circ:\\quad AB,\\ 0,\\ -AB", meaning: "তিন বিশেষ কোণে ডট গুণনের মান।", step: 4 },
    { tex: "\\vec A\\cdot\\vec B=\\vec B\\cdot\\vec A,\\quad \\vec A\\cdot\\vec A=A^2", meaning: "ক্রম বদলালে ফল বদলায় না। নিজের সাথে ডট গুণন মানের বর্গ।", step: 5 },
    { tex: "\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z", meaning: "উপাংশ দিয়ে: একই দিকের উপাংশ গুণ করে যোগ।", step: 6 },
    { tex: "\\hat\\imath\\cdot\\hat\\imath=\\hat\\jmath\\cdot\\hat\\jmath=\\hat k\\cdot\\hat k=1,\\quad \\hat\\imath\\cdot\\hat\\jmath=\\hat\\jmath\\cdot\\hat k=\\hat k\\cdot\\hat\\imath=0", meaning: "একক ভেক্টরের নিয়ম। একই দিকে 1, লম্ব দিকে 0।", step: 6 },
    { tex: "\\cos\\theta=\\dfrac{\\vec A\\cdot\\vec B}{AB}", meaning: "দুই ভেক্টরের মাঝের কোণ বের করার সূত্র।", step: 7 },
  ],
  example: {
    problem: "(ক) A⃗ = 3î + 4ĵ এবং B⃗ = 4î + 3ĵ হলে A⃗·B⃗ এবং তাদের মাঝের কোণ বের করো। (খ) C⃗ = 2î + 3ĵ ও D⃗ = 3î − 2ĵ কি পরস্পর লম্ব?",
    steps: [
      { text: "(ক) একই দিকের উপাংশ গুণ করে যোগ করি।", tex: "\\vec A\\cdot\\vec B=3\\times4+4\\times3=24" },
      { text: "দুজনের মানই 5।", tex: "A=\\sqrt{3^2+4^2}=5,\\quad B=\\sqrt{4^2+3^2}=5" },
      { text: "এবার কোণ বের করি।", tex: "\\cos\\theta=\\frac{24}{5\\times5}=0.96\\Rightarrow\\theta=16.3^\\circ" },
      { text: "(খ) লম্ব হলে ডট গুণন শূন্য হয়। তাই C⃗·D⃗ বের করি।", tex: "\\vec C\\cdot\\vec D=2\\times3+3\\times(-2)=6-6=0" },
      { text: "উত্তর: (ক) ডট গুণন 24, কোণ 16.3°। (খ) হ্যাঁ, ভেক্টর দুটি পরস্পর লম্ব।" },
    ],
  },
  mistakes: [
    "ডট গুণনের ফলকে ভেক্টর ভাবা। ফল একটা সাধারণ সংখ্যা।",
    "AB cosθ-তে θ ভুল নেওয়া। দুই ভেক্টরের লেজ একই বিন্দুতে রেখে মাঝের কোণ নিতে হয়।",
    "উপাংশে গুণ করার সময় î-এর সংখ্যার সাথে ĵ-এর সংখ্যা গুণ করা। শুধু একই দিকের সংখ্যা গুণ হয়।",
    "ডট গুণন শূন্য হলে একটা ভেক্টর শূন্য ভাবা। দুটোই অশূন্য থাকলে ফল শূন্য মানে তারা লম্ব।",
  ],
  recap: [
    "ডট গুণন = A × (B-এর ছায়া A-এর ওপর) = AB cosθ। ফল স্কেলার।",
    "θ = 0° হলে AB, 90° হলে 0, 180° হলে −AB। লম্ব মানে ডট গুণন শূন্য।",
    "উপাংশে: AxBx + AyBy + AzBz। একক ভেক্টরের নিজের সাথে 1, অন্যটির সাথে 0।",
    "কোণ বের করতে cosθ = (A·B) ÷ (AB)। কাজ W = F·s এর একটি উদাহরণ।",
  ],
  think: {
    scenario: "একজন দড়ি দিয়ে একটা ঠেলাগাড়ি 20 m টেনে নিয়ে গেল। দড়ি একটু ওপরে বাঁকা, সরণের সাথে 60° কোণে। টান 40 N।",
    points: [
      "40 N টানের কতটুকু গাড়িকে সামনে এগিয়েছে? বাকিটা কী করছে?",
      "দড়ি যদি সরণের সাথে 0° কোণে (সোজা সামনে) টানত, কাজ বেশি হতো না কম?",
      "দড়ি খাড়া ওপরে টানলে (90°) কাজ কত হতো? কেন?",
      "টান আর সরণ উল্টো দিকে (180°) হলে কাজের চিহ্ন কী হতো? এর মানে কী?",
    ],
    hint: "ডট গুণন মানে একটা ভেক্টরের ছায়া আরেকটির ওপর, গুণ দৈর্ঘ্য। 90°-এ ছায়া শূন্য। 180°-এ ছায়া উল্টো দিকে, তাই ফল ঋণাত্মক।",
    traps: [
      "ডট গুণনের ফল একটা ভেক্টর।",
      "θ হলো যেকোনো দুই তীরের মাঝের কোণ, লেজ কোথায় আছে তাতে কিছু আসে না।",
      "î·ĵ = 1।",
      "ডট গুণন শূন্য হলে একটা ভেক্টর শূন্য।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "(ক) A⃗ = 3î + 4ĵ এবং B⃗ = 4î + 3ĵ হলে A⃗·B⃗ এবং তাদের মাঝের কোণ বের করো। (খ) C⃗ = 2î + 3ĵ ও D⃗ = 3î − 2ĵ কি পরস্পর লম্ব?",
      hint: "একই দিকের উপাংশ গুণ করে যোগ করো।",
      steps: [
        { text: "(ক) একই দিকের উপাংশ গুণ করে যোগ করি।", tex: "\\vec A\\cdot\\vec B=3\\times4+4\\times3=24" },
        { text: "দুজনের মানই 5।", tex: "A=\\sqrt{3^2+4^2}=5,\\quad B=\\sqrt{4^2+3^2}=5" },
        { text: "এবার কোণ বের করি।", tex: "\\cos\\theta=\\frac{24}{5\\times5}=0.96\\Rightarrow\\theta=16.3^\\circ" },
        { text: "(খ) লম্ব হলে ডট গুণন শূন্য হয়। তাই C⃗·D⃗ বের করি।", tex: "\\vec C\\cdot\\vec D=2\\times3+3\\times(-2)=6-6=0" },
        { text: "উত্তর: (ক) ডট গুণন 24, কোণ 16.3°। (খ) হ্যাঁ, ভেক্টর দুটি পরস্পর লম্ব।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "A⃗ = 2î + 3ĵ + k̂ এবং B⃗ = 4î − ĵ + 2k̂ হলে A⃗·B⃗ এবং তাদের মাঝের কোণ বের করো।",
      hint: "ত্রিমাত্রায় তিন জোড়া উপাংশ গুণ করে যোগ করো।",
      steps: [
        { text: "তিন জোড়া উপাংশ গুণ করে যোগ করি।", tex: "\\vec A\\cdot\\vec B=2\\times4+3\\times(-1)+1\\times2=8-3+2=7" },
        { text: "দুই ভেক্টরের মান বের করি।", tex: "A=\\sqrt{4+9+1}=\\sqrt{14},\\quad B=\\sqrt{16+1+4}=\\sqrt{21}" },
        { text: "cosθ বের করি।", tex: "\\cos\\theta=\\frac{7}{\\sqrt{14}\\times\\sqrt{21}}=\\frac{7}{17.15}=0.41" },
        { text: "উত্তর: ডট গুণন 7, কোণ θ = cos⁻¹ 0.41 = 65.9°।" },
      ],
    },
    {
      level: "কঠিন",
      q: "m-এর কোন মানের জন্য A⃗ = î + mĵ + 2k̂ এবং B⃗ = 3î − 2ĵ + k̂ পরস্পর লম্ব হবে?",
      hint: "লম্ব হলে ডট গুণন শূন্য।",
      steps: [
        { text: "লম্ব হলে ডট গুণন শূন্য। ডট গুণন লিখি।", tex: "\\vec A\\cdot\\vec B=1\\times3+m\\times(-2)+2\\times1=5-2m" },
        { text: "শূন্যের সমান ধরি।", tex: "5-2m=0" },
        { text: "m বের করি।", tex: "m=\\frac{5}{2}=2.5" },
        { text: "উত্তর: m = 2.5।" },
      ],
    },
  ],
  concepts: [
    "A·B = A·C হলে কি B = C হবে? একটা উদাহরণ ভেবে দেখো।",
    "কাজ কেন স্কেলার, ভেক্টর নয়? কাজের দিক বলার দরকার পড়ে কি?",
    "θ কত হলে ডট গুণন সবচেয়ে বড় হয়? সবচেয়ে ছোট?",
  ],
  quiz: [
    { q: "θ = 90° হলে A⃗·B⃗ কত?", options: ["AB", "0", "−AB", "A + B"], answer: 1, why: "cos 90° = 0, তাই লম্ব ভেক্টরের ডট গুণন শূন্য।" },
    { q: "A⃗ = 2î + 3ĵ এবং B⃗ = î + 4ĵ হলে A⃗·B⃗ কত?", options: ["14", "11", "10", "12"], answer: 0, why: "2 × 1 + 3 × 4 = 2 + 12 = 14। 11 হলো গুণের বদলে যোগ করার ভুল।" },
    { q: "ডট গুণনের ফল কোন ধরনের রাশি?", options: ["ভেক্টর", "স্কেলার", "একক ভেক্টর", "শূন্য ভেক্টর"], answer: 1, why: "AB cosθ একটা সাধারণ সংখ্যা। এতে কোনো দিক নেই।" },
    { q: "A⃗ = 3î + 4ĵ হলে A⃗·A⃗ কত?", options: ["7", "5", "25", "12"], answer: 2, why: "A⃗·A⃗ = A² = 5² = 25। অথবা 3 × 3 + 4 × 4 = 25।" },
    { q: "A⃗ = 2î + 3ĵ + k̂ ও B⃗ = 4î − ĵ + 2k̂ হলে A⃗·B⃗ কত?", options: ["7", "13", "9", "5"], answer: 0, why: "2 × 4 + 3 × (−1) + 1 × 2 = 8 − 3 + 2 = 7। 13 হলো ঋণাত্মক চিহ্ন ভুলে যাওয়ার ফল।" },
  ],
};

function Cart({ done }: { done: boolean }) {
  const h = pt(170, 190);
  const tip = pt(240, 69);
  return (
    <Stage w={440} h={260} label="দড়ি দিয়ে গাড়ি টানা">
      <Seg a={pt(30, 215)} b={pt(410, 215)} c="m" w={3} />
      <rect x={90} y={180} width={80} height={32} rx={6} strokeWidth={2.5} style={{ fill: "#d9a35f", stroke: "#171a2c" }} />
      <circle cx={110} cy={212} r={8} style={{ fill: col.f }} />
      <circle cx={150} cy={212} r={8} style={{ fill: col.f }} />
      <Vec a={h} b={tip} c="r" w={4} />
      <Seg a={h} b={pt(240, 190)} dash c="p" w={5} show={done} />
      <Seg a={tip} b={pt(240, 190)} dash c="m" w={1.5} show={done} />
      <Lab p={pt(256, 90)} c="r" anchor="start">দড়ির টান 40 N</Lab>
      <Lab p={pt(205, 172)} c="p" show={done}>20 N</Lab>
      <Vec a={pt(90, 240)} b={pt(250, 240)} c="q" w={3} />
      <Lab p={pt(170, 256)} c="q">সরণ 20 m</Lab>
    </Stage>
  );
}

function Shadow({ th, on }: { th: number; on: boolean }) {
  const O = pt(80, 200);
  const aTip = pt(O.x + 6 * 28, O.y);
  const bTip = pt(O.x + 5 * 28 * Math.cos(rad(th)), O.y - 5 * 28 * Math.sin(rad(th)));
  const foot = pt(bTip.x, O.y);
  return (
    <Stage w={440} h={260} label="B-এর ছায়া A-এর রেখায়">
      <Seg a={pt(30, O.y)} b={pt(410, O.y)} dash c="m" w={1} />
      <Seg a={O} b={foot} c="u" w={9} show={on} />
      <Seg a={bTip} b={foot} dash c="m" w={1.5} show={on} />
      <Vec a={O} b={aTip} c="p" w={4} />
      <Vec a={O} b={bTip} c="q" w={4} />
      <Arc o={O} r={30} from={0} to={th} c="f" w={1.5} />
      <Lab p={pol(O, th / 2, 48)}>θ</Lab>
      <Dot p={O} c="f" r={5} />
      <Lab p={pt(aTip.x - 10, O.y + 22)} c="p" anchor="end">A = 6</Lab>
      <Lab p={add(bTip, -8, -8)} c="q" anchor="end">B = 5</Lab>
      <Lab p={add(mid(O, foot), 0, 38)} c="u" show={on}>ছায়া = B cosθ</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [th, setTh] = useState(50);
  const dp = 30 * Math.cos(rad(th));
  const note =
    th === 0
      ? "θ = 0°: ছায়া পুরো B, তাই A·B = 30, সবচেয়ে বড়।"
      : th === 90
        ? "θ = 90°: ছায়া শূন্য, তাই A·B = 0। লম্ব ভেক্টরের ডট গুণন শূন্য।"
        : th === 180
          ? "θ = 180°: ছায়া উল্টো দিকে, তাই A·B = −30, ঋণাত্মক।"
          : "কোণ বাড়লে ছায়া ছোট হয়, আর 90° পেরোলে উল্টো দিকে যায়।";

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "দড়ি দিয়ে গাড়ি টানা",
            text: (
              <>
                তুমি 40 N বলে দড়ি টানছ, দড়ি মাটির সাথে 60° কোণে ওপরে হেলানো। 40 N-এর কতটুকু গাড়িকে সামনে এগোচ্ছে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["40 N", "20 N", "0"]} answer={1} picked={g.picks[0]} onPick={g.pick(0)} explain="বলের সামনের দিকের ছায়া 40 cos60° = 20 N। বাকিটা ওপরে টানছে, গাড়িকে এগোচ্ছে না।" />,
            figure: () => <Cart done={g.picks[0] !== undefined} />,
          },
          {
            title: "এক ভেক্টরের ছায়া আরেকটায়",
            text: (
              <>
                <C k="p">A</C> আর <C k="q">B</C> একই বিন্দু থেকে আঁকা। ওপর থেকে আলো ফেললে B-এর ছায়া A-এর রেখায় পড়ে। ছায়ার দৈর্ঘ্য B cosθ।
              </>
            ),
            tex: ["s=B\\cos\\theta"],
            replay: true,
            figure: (phase) => <Shadow th={50} on={phase === 1} />,
          },
          {
            title: "ডট গুণন: ছায়া × A",
            text: (
              <>
                A-এর দৈর্ঘ্যকে B-এর ছায়ার দৈর্ঘ্য দিয়ে গুণ করলেই <b>ডট গুণন</b>। <b>θ</b> বদলাও, ফল কীভাবে বদলায় দেখো।
              </>
            ),
            prompt: (
              <Play
                label="θ"
                value={th}
                min={0}
                max={180}
                suffix="°"
                onChange={setTh}
                chips={[0, 60, 90, 120, 180]}
                read={
                  <span>
                    A·B = <C k="r">{dp.toFixed(1)}</C>
                  </span>
                }
                note={note}
              />
            ),
            figure: () => <Shadow th={th} on />,
          },
          {
            title: "কাজ কত?",
            text: "40 N বলে দড়ি টেনে গাড়িকে 20 m সরানো হলো, দড়ি 60° কোণে। বল যতটুকু এগোনোর কাজে লাগল, সেটা আর সরণ গুণ করলে কাজ পাই। কাজ কত?",
            locked: g.picks[3] === undefined,
            prompt: <Choices options={["800 J", "400 J", "200 J"]} answer={1} picked={g.picks[3]} onPick={g.pick(3)} explain="কাজ = F·s = 40 × 20 × cos60° = 400 J। অর্থাৎ বলের এগোনো অংশ (20 N) × সরণ (20 m)। কাজ একটা স্কেলার।" />,
            figure: () => <Cart done />,
          },
          {
            title: "উপাংশ থেকে ডট গুণন",
            text: "A = 3î + 4ĵ আর B = 4î + 3ĵ হলে A·B কত? একই দিকের সংখ্যা গুণ করে যোগ করো।",
            locked: g.picks[4] === undefined,
            prompt: <Choices options={["7", "12", "24"]} answer={2} picked={g.picks[4]} onPick={g.pick(4)} explain="3 × 4 + 4 × 3 = 24। কোণ বের করতে cosθ = 24 ÷ (5 × 5) = 0.96, তাই θ = 16.3°।" />,
            figure: () => {
              const done = g.picks[4] !== undefined;
              const O = pt(80, 220);
              const a = pt(O.x + 120, O.y - 160);
              const b = pt(O.x + 160, O.y - 120);
              return (
                <Stage w={440} h={260} label="A = 3î + 4ĵ আর B = 4î + 3ĵ">
                  <Vec a={O} b={a} c="p" w={4} />
                  <Vec a={O} b={b} c="q" w={4} />
                  <Arc o={O} r={70} from={36.87} to={53.13} c="f" w={1.5} show={done} />
                  <Dot p={O} c="f" r={5} />
                  <Lab p={add(a, -8, -4)} c="p" anchor="end">A</Lab>
                  <Lab p={add(b, 10, 4)} c="q" anchor="start">B</Lab>
                  <Lab p={pt(250, 60)} c="r" show={done}>θ = 16.3°</Lab>
                </Stage>
              );
            },
          },
        ],
        summary: [
          {
            title: "ডট গুণনের দুই রূপ",
            text: "ছায়ার সূত্র আর উপাংশের সূত্র, ফল একই। ফল একটা সংখ্যা, ভেক্টর নয়।",
            tex: ["\\vec A\\cdot\\vec B=AB\\cos\\theta", "\\vec A\\cdot\\vec B=A_xB_x+A_yB_y+A_zB_z"],
          },
          {
            title: "কোণ আর লম্ব",
            text: "ডট গুণন শূন্য মানে ভেক্টর দুটি পরস্পর লম্ব। কোণ বের করতে cosθ-এর সূত্র।",
            tex: ["\\theta=0^\\circ,\\ 90^\\circ,\\ 180^\\circ:\\ AB,\\ 0,\\ -AB", "\\cos\\theta=\\dfrac{\\vec A\\cdot\\vec B}{AB}"],
          },
        ],
      })}
    />
  );
}
