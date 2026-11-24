"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Stage, Vec, add, col, mid, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { rad } from "@/lib/vec";

export const meta: LessonMeta = {
  guided: true,
  goal: "ক্রস গুণনের মান ও দিক দুটোই বের করতে পারবে, সামান্তরিকের ক্ষেত্রফলের সাথে সম্পর্কটা বুঝবে এবং ডান হাতের নিয়ম ও ডিটারমিন্যান্ট ব্যবহার করতে পারবে।",
  hook: "দরজা খুলতে কব্জার কাছে ঠেললে কষ্ট হয়, কিনারায় ঠেললে সহজে খোলে। আবার দরজার সমান্তরালে ঠেললে একেবারেই খোলে না। দূরত্ব, বল আর তাদের মাঝের কোণ, এই তিনটে মিলে ঘোরানোর ক্ষমতা ঠিক করে। এই হিসাবটাই ক্রস গুণন।",
  look: "সামান্তরিকের ক্ষেত্রফল আর |A × B|-এর মান কীভাবে মিলে যায়, তা দেখো। আর A ও B-এর ক্রম বদলালে ⊙ চিহ্নটা কেন ⊗ হয়ে যায়, সেটাও খেয়াল করো।",
  formulas: [
    { tex: "|\\vec A\\times\\vec B|=AB\\sin\\theta", meaning: "মান A ও B বাহুর সামান্তরিকের ক্ষেত্রফলের সমান।", step: 4 },
    { tex: "\\vec A\\times\\vec B=AB\\sin\\theta\\,\\hat n", meaning: "মান AB sinθ। দিক n̂ ঠিক হয় ডান হাতের নিয়মে।", step: 5 },
    { tex: "\\vec A\\times\\vec B=-\\vec B\\times\\vec A", meaning: "ক্রম উল্টালে দিক উল্টে যায়, মান একই থাকে।", step: 6 },
    { tex: "\\vec A\\parallel\\vec B\\ \\Leftrightarrow\\ \\vec A\\times\\vec B=\\vec 0", meaning: "সমান্তরাল হলে ক্রস গুণন শূন্য ভেক্টর। তাই A⃗ × A⃗ = 0⃗।", step: 7 },
    { tex: "\\hat\\imath\\times\\hat\\jmath=\\hat k,\\ \\hat\\jmath\\times\\hat k=\\hat\\imath,\\ \\hat k\\times\\hat\\imath=\\hat\\jmath", meaning: "একক ভেক্টরের চক্র। উল্টো ক্রমে চিহ্ন বদলে যায়।", step: 8 },
    { tex: "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\A_x&A_y&A_z\\\\B_x&B_y&B_z\\end{vmatrix}", meaning: "ডিটারমিন্যান্ট দিয়ে উপাংশে বের করার নিয়ম।", step: 8 },
  ],
  example: {
    problem: "A⃗ = î + 2ĵ + 3k̂ এবং B⃗ = 4î + 5ĵ + 6k̂ হলে A⃗ × B⃗ এবং সামান্তরিকের ক্ষেত্রফল বের করো।",
    steps: [
      { text: "ডিটারমিন্যান্ট সাজাই।", tex: "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\1&2&3\\\\4&5&6\\end{vmatrix}" },
      { text: "î-এর সহগ: î-এর কলাম বাদ দিয়ে বাকি চারটি সংখ্যার কর্ণ-গুণ।", tex: "\\hat\\imath(2\\times6-3\\times5)=\\hat\\imath(12-15)=-3\\hat\\imath" },
      { text: "ĵ-এর সহগে মাঝের পদ বলে বিয়োগ চিহ্ন বসে।", tex: "-\\hat\\jmath(1\\times6-3\\times4)=-\\hat\\jmath(6-12)=6\\hat\\jmath" },
      { text: "k̂-এর সহগ।", tex: "\\hat k(1\\times5-2\\times4)=\\hat k(5-8)=-3\\hat k" },
      { text: "ফল ও মান বের করি। মানই সামান্তরিকের ক্ষেত্রফল।", tex: "\\vec A\\times\\vec B=-3\\hat\\imath+6\\hat\\jmath-3\\hat k,\\quad |\\vec A\\times\\vec B|=\\sqrt{9+36+9}=\\sqrt{54}=7.35" },
      { text: "যাচাই: ফলটা A আর B দুজনেরই লম্ব, তাই ডট গুণন শূন্য হওয়া উচিত।", tex: "\\vec A\\cdot(\\vec A\\times\\vec B)=-3+12-9=0" },
    ],
  },
  mistakes: [
    "A × B আর B × A এক ভাবা। মান এক, দিক উল্টো।",
    "ডিটারমিন্যান্টে ĵ-এর চিহ্ন ভুলে যাওয়া। মাঝের পদে বিয়োগ বসে।",
    "sinθ-এর জায়গায় cosθ বসানো। ডট গুণনে cos, ক্রস গুণনে sin।",
    "ক্রস গুণনের ফলকে সংখ্যা ভাবা। ফল একটা ভেক্টর।",
  ],
  recap: [
    "ক্রস গুণনের মান AB sinθ, যা সামান্তরিকের ক্ষেত্রফল। ফল একটা ভেক্টর।",
    "দিক সামান্তরিকের তলের লম্ব, ডান হাতের নিয়মে। A থেকে B-তে ঘোরালে বুড়ো আঙুল দিক দেখায়।",
    "A × B = −(B × A)। সমান্তরাল ভেক্টরের ক্রস গুণন শূন্য ভেক্টর।",
    "উপাংশে বের করতে ডিটারমিন্যান্ট। î × ĵ = k̂, ĵ × k̂ = î, k̂ × î = ĵ।",
  ],
  think: {
    scenario: "তুমি একটা রেঞ্চ দিয়ে নাট খুলছ। রেঞ্চের হাতল 0.3 m লম্বা। তুমি হাতলের মাথায় 50 N বলে ঠেলছ। কখনো ঠেলা হাতলের সাথে ঠিক 90° কোণে, কখনো তির্যক।",
    points: [
      "বল হাতলের সাথে 90° কোণে হলে ঘোরানোর ক্ষমতা কত? কোণ 30° হলে তা বাড়বে না কমবে?",
      "বল হাতলের সোজা বরাবর (0°) টানলে নাট কি ঘুরবে? কেন?",
      "নাট খোলার ঘূর্ণন আর আটকানোর ঘূর্ণন, দুটোর ঘূর্ণন-ভেক্টরের দিক কেমন হবে?",
      "হাতল দ্বিগুণ লম্বা হলে একই বলে ঘোরানোর ক্ষমতা কত গুণ হবে?",
    ],
    hint: "ঘোরানোর ক্ষমতা = দূরত্ব × বল × sinθ। 90°-এ sinθ সবচেয়ে বড়, 0°-এ শূন্য। ঘূর্ণনের দিক ঠিক হয় ডান হাতের নিয়মে, তাই খোলা আর আটকানোর দিক উল্টো। দূরত্ব দ্বিগুণ হলে ক্ষমতাও দ্বিগুণ।",
    traps: [
      "A × B আর B × A সমান।",
      "ডিটারমিন্যান্টে ĵ-এর সহগে যোগ চিহ্ন বসে।",
      "ক্রস গুণনে cosθ বসে।",
      "ক্রস গুণনের ফল একটা সংখ্যা।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "A⃗ = î + 2ĵ + 3k̂ এবং B⃗ = 4î + 5ĵ + 6k̂ হলে A⃗ × B⃗ এবং সামান্তরিকের ক্ষেত্রফল বের করো।",
      hint: "ডিটারমিন্যান্টে ĵ-এর সহগে বিয়োগ চিহ্ন বসে।",
      steps: [
        { text: "ডিটারমিন্যান্ট সাজাই।", tex: "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\1&2&3\\\\4&5&6\\end{vmatrix}" },
        { text: "î-এর সহগ।", tex: "\\hat\\imath(2\\times6-3\\times5)=-3\\hat\\imath" },
        { text: "ĵ-এর সহগে মাঝের পদ বলে বিয়োগ চিহ্ন বসে।", tex: "-\\hat\\jmath(1\\times6-3\\times4)=6\\hat\\jmath" },
        { text: "k̂-এর সহগ।", tex: "\\hat k(1\\times5-2\\times4)=-3\\hat k" },
        { text: "ফল ও মান। মানই সামান্তরিকের ক্ষেত্রফল।", tex: "\\vec A\\times\\vec B=-3\\hat\\imath+6\\hat\\jmath-3\\hat k,\\quad |\\vec A\\times\\vec B|=\\sqrt{54}=7.35" },
        { text: "যাচাই: A আর B দুজনেরই লম্ব হওয়া উচিত।", tex: "\\vec A\\cdot(\\vec A\\times\\vec B)=-3+12-9=0" },
      ],
    },
    {
      level: "মাঝারি",
      q: "দুই মাত্রায় A⃗ = 2î + 3ĵ এবং B⃗ = 4î + 5ĵ। A⃗ × B⃗ এবং A ও B বাহুর সামান্তরিকের ক্ষেত্রফল বের করো।",
      hint: "দুই মাত্রায় ফল শুধু k̂ দিকে: AxBy − AyBx।",
      steps: [
        { text: "দুই মাত্রায় ক্রস গুণন শুধু k̂ দিকে থাকে।", tex: "\\vec A\\times\\vec B=(A_xB_y-A_yB_x)\\hat k" },
        { text: "সংখ্যা বসাই।", tex: "(2\\times5-3\\times4)\\hat k=-2\\hat k" },
        { text: "ক্ষেত্রফল হলো মান, ঋণ চিহ্ন বাদ।", tex: "|\\vec A\\times\\vec B|=2" },
        { text: "উত্তর: A⃗ × B⃗ = −2k̂, ক্ষেত্রফল 2। ঋণ চিহ্ন মানে দিক কাগজের ভেতরে, কারণ A থেকে B-তে ঘুরতে হয় ঘড়ির কাঁটার দিকে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "A⃗ = 3î − 2ĵ + k̂ এবং B⃗ = î + ĵ − k̂ বাহুবিশিষ্ট ত্রিভুজের ক্ষেত্রফল বের করো।",
      hint: "ত্রিভুজের ক্ষেত্রফল সামান্তরিকের অর্ধেক।",
      steps: [
        { text: "ডিটারমিন্যান্টের î-এর সহগ।", tex: "\\hat\\imath((-2)(-1)-(1)(1))=\\hat\\imath(2-1)=1\\hat\\imath" },
        { text: "ĵ-এর সহগ, বিয়োগ চিহ্ন সহ।", tex: "-\\hat\\jmath((3)(-1)-(1)(1))=-\\hat\\jmath(-4)=4\\hat\\jmath" },
        { text: "k̂-এর সহগ।", tex: "\\hat k((3)(1)-(-2)(1))=5\\hat k" },
        { text: "মান বের করি।", tex: "|\\vec A\\times\\vec B|=\\sqrt{1+16+25}=\\sqrt{42}=6.48" },
        { text: "ত্রিভুজের ক্ষেত্রফল এর অর্ধেক।", tex: "\\text{Area}=\\frac{6.48}{2}=3.24" },
        { text: "যাচাই: A⃗·(A⃗ × B⃗) = 3 − 8 + 5 = 0, তাই ফলটা A-এর লম্ব, ঠিক আছে।" },
      ],
    },
  ],
  concepts: [
    "ঘূর্ণনকে কেন একটা সোজা তীর (ভেক্টর) দিয়ে দেখানো হয়, যদিও ঘূর্ণন আসলে বৃত্তাকার?",
    "A × B-এর দিক A আর B-এর তলের লম্ব। তাহলে A × B কি কখনো A-এর সাথে একই দিকে হতে পারে?",
    "(AB sinθ)² আর (AB cosθ)² যোগ করলে কী পাও? ডট আর ক্রস গুণন একসাথে কী বলে?",
  ],
  quiz: [
    { q: "A⃗ ও B⃗ সমান্তরাল হলে |A⃗ × B⃗| কত?", options: ["AB", "0", "A + B", "A/B"], answer: 1, why: "সমান্তরালে θ = 0° বা 180°, sinθ = 0। তাই মান শূন্য।" },
    { q: "î × ĵ = ?", options: ["k̂", "−k̂", "শূন্য ভেক্টর", "1"], answer: 0, why: "চক্র অনুযায়ী î × ĵ = k̂। উল্টো ক্রম ĵ × î হলে −k̂ হতো।" },
    { q: "দুই ভেক্টরের মাঝের কোণ কত হলে |A⃗ × B⃗| সবচেয়ে বড় হয়?", options: ["0°", "45°", "90°", "180°"], answer: 2, why: "sinθ-এর সর্বোচ্চ মান 1, যা θ = 90° এ পাওয়া যায়।" },
    { q: "A = 2, B = 3 এবং θ = 30° হলে A ও B বাহুর সামান্তরিকের ক্ষেত্রফল কত?", options: ["6", "3", "5.2", "1.5"], answer: 1, why: "ক্ষেত্রফল = AB sinθ = 2 × 3 × 0.5 = 3। 5.2 হলো sin-এর বদলে cos বসানোর ভুল ফল।" },
    { q: "A⃗ = 3î এবং B⃗ = 4ĵ হলে A⃗ × B⃗ কত?", options: ["12 k̂", "−12 k̂", "7", "শূন্য ভেক্টর"], answer: 0, why: "î × ĵ = k̂, তাই 3 × 4 = 12 এবং দিক k̂। ফল সংখ্যা নয়, ভেক্টর।" },
  ],
};

function Wrench({ th, note }: { th: number; note: string }) {
  const P0 = pt(80, 150);
  const H = pt(240, 150);
  const c = Math.cos(rad(th));
  const s = Math.sin(rad(th));
  const tip = pt(H.x + 100 * c, H.y - 100 * s);
  return (
    <Stage w={440} h={260} label="রেঞ্চ দিয়ে নাট ঘোরানো">
      <Seg a={P0} b={H} c="m" w={12} />
      <Dot p={P0} c="f" r={12} />
      <Vec a={H} b={tip} c="r" w={5} />
      <Vec a={H} b={pt(H.x, H.y - 100 * s)} c="q" w={3} show={s > 0.03} />
      <Arc o={H} r={34} from={0} to={th} c="f" w={1.5} show={th > 3} />
      <Lab p={pol(H, th / 2, 52)} show={th > 3}>θ</Lab>
      <Lab p={pt(160, 184)} c="m">হাতল 0.3 m</Lab>
      <Lab p={add(tip, 10, -10)} c="r" anchor="start">F = 50 N</Lab>
      <Lab p={pt(220, 238)} c="q">{note}</Lab>
    </Stage>
  );
}

function Para({ on }: { on: boolean }) {
  const O = pt(80, 215);
  const a = pt(O.x + 150, O.y);
  const b = pt(O.x + 120 * Math.cos(rad(55)), O.y - 120 * Math.sin(rad(55)));
  const ab = pt(a.x + (b.x - O.x), b.y);
  return (
    <Stage w={440} h={260} label="সামান্তরিকের ক্ষেত্রফল">
      <polygon points={`${O.x},${O.y} ${a.x},${a.y} ${ab.x},${ab.y} ${b.x},${b.y}`} opacity={on ? 0.2 : 0} style={{ fill: col.r }} />
      <Seg a={b} b={pt(b.x, O.y)} dash c="u" w={2.5} show={on} />
      <Seg a={a} b={ab} dash c="m" w={1.5} show={on} />
      <Seg a={b} b={ab} dash c="m" w={1.5} show={on} />
      <Vec a={O} b={a} c="p" w={4} />
      <Vec a={O} b={b} c="q" w={4} />
      <Dot p={O} c="f" r={5} />
      <Lab p={add(mid(O, a), 0, 22)} c="p">A = 5</Lab>
      <Lab p={add(mid(O, b), -10, -4)} c="q" anchor="end">B = 4</Lab>
      <Lab p={add(mid(b, pt(b.x, O.y)), 10, 0)} c="u" anchor="start" show={on}>h = B sinθ</Lab>
    </Stage>
  );
}

function Dir({ out }: { out: boolean }) {
  const O = pt(120, 210);
  const a = pt(O.x + 160, O.y);
  const b = pt(O.x + 90, O.y - 126);
  const ab = pt(a.x + 90, b.y);
  const c0 = pt((O.x + ab.x) / 2, (O.y + b.y) / 2);
  return (
    <Stage w={440} h={260} label="ক্রস গুণনের দিক">
      <polygon points={`${O.x},${O.y} ${a.x},${a.y} ${ab.x},${ab.y} ${b.x},${b.y}`} opacity={0.15} style={{ fill: col.r }} />
      <Vec a={O} b={a} c="p" w={4} />
      <Vec a={O} b={b} c="q" w={4} />
      <Arc o={O} r={46} from={0} to={55} c="f" w={2} />
      <Lab p={pol(O, 27, 66)}>A থেকে B</Lab>
      <circle cx={c0.x} cy={c0.y} r={15} fill="none" strokeWidth={2.5} style={{ stroke: col.r }} />
      {out ? <circle cx={c0.x} cy={c0.y} r={4.5} style={{ fill: col.r }} /> : (
        <>
          <line x1={c0.x - 8} y1={c0.y - 8} x2={c0.x + 8} y2={c0.y + 8} strokeWidth={2.5} strokeLinecap="round" style={{ stroke: col.r }} />
          <line x1={c0.x - 8} y1={c0.y + 8} x2={c0.x + 8} y2={c0.y - 8} strokeWidth={2.5} strokeLinecap="round" style={{ stroke: col.r }} />
        </>
      )}
      <Lab p={add(c0, 0, 36)} c="r">{out ? "A × B: কাগজ থেকে বেরিয়ে আসছে" : "B × A: কাগজের ভেতরে ঢুকছে"}</Lab>
      <Dot p={O} c="f" r={5} />
    </Stage>
  );
}

export default function Anim() {
  const [th, setTh] = useState(60);
  const tq = 0.3 * 50 * Math.sin(rad(th));
  const note =
    th === 90
      ? "θ = 90°: সবচেয়ে বেশি ঘোরানোর ক্ষমতা, 15 N·m।"
      : th === 0 || th === 180
        ? "θ = 0° বা 180°: হাতল বরাবর টানা, নাট একটুও ঘোরে না।"
        : "θ 90° থেকে যত দূরে, ঘোরানোর ক্ষমতা তত কম।";

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "রেঞ্চ দিয়ে নাট খোলা",
            text: "রেঞ্চের হাতল 0.3 m লম্বা। তুমি হাতলের মাথায় 50 N বলে ঠেলছ। হাতলের সাথে বলের কোণ কত হলে নাট সবচেয়ে বেশি ঘোরে?",
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["0° (হাতল বরাবর)", "90° (হাতলের লম্বে)", "180° (হাতল বরাবর উল্টো)"]} answer={1} picked={g.picks[0]} onPick={g.pick(0)} explain="হাতল বরাবর টানলে নাট ঘোরে না। লম্বে ঠেললে সবচেয়ে বেশি ঘোরে। ঘোরানোর ক্ষমতা sinθ-এর সমানুপাতিক।" />,
            figure: () => <Wrench th={90} note={g.picks[0] !== undefined ? "লম্বে ঠেলা: সবচেয়ে বেশি ঘোরে" : "এভাবে ঠেললে কেমন?"} />,
          },
          {
            title: "কোণ বদলে দেখো",
            text: (
              <>
                <b>θ</b> বদলাও। ঘোরানোর ক্ষমতা = হাতলের দৈর্ঘ্য × বল × sinθ।
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
                chips={[0, 30, 90, 150, 180]}
                read={
                  <span>
                    ক্ষমতা = <C k="r">{tq.toFixed(1)} N·m</C>
                  </span>
                }
                note={note}
              />
            ),
            figure: () => <Wrench th={th} note="নীল অংশটাই ঘোরায়, F sinθ" />,
          },
          {
            title: "সামান্তরিকের ক্ষেত্রফল",
            text: (
              <>
                <C k="p">A</C> আর <C k="q">B</C>-কে দুই বাহু ধরে সামান্তরিক আঁকো। তার ক্ষেত্রফল আর ক্রস গুণনের মান একই: ভূমি × উচ্চতা = A × B sinθ।
              </>
            ),
            tex: ["|\\vec A\\times\\vec B|=AB\\sin\\theta", "=5\\times4\\times\\sin55^\\circ=16.4"],
            replay: true,
            figure: (phase) => <Para on={phase === 1} />,
          },
          {
            title: "ফলের দিক কোনটা?",
            text: "ক্রস গুণনের ফল একটা ভেক্টর, তার দিক সামান্তরিকের তলের লম্ব। ডান হাতের চার আঙুল A থেকে B-র দিকে ঘোরাও (এখানে উল্টো ঘড়ির দিকে)। বুড়ো আঙুল কোন দিকে?",
            locked: g.picks[3] === undefined,
            prompt: <Choices options={["কাগজ থেকে বেরিয়ে আসছে (⊙)", "কাগজের ভেতরে ঢুকছে (⊗)", "ডান দিকে"]} answer={0} picked={g.picks[3]} onPick={g.pick(3)} explain="উল্টো ঘড়ির দিকে ঘোরালে বুড়ো আঙুল কাগজ থেকে বেরিয়ে আসে। এই চিহ্নটা ⊙।" />,
            figure: () => <Dir out={g.picks[3] !== undefined} />,
          },
          {
            title: "ক্রম উল্টালে",
            text: "B × A করলে B থেকে A-তে ঘুরতে হয়, মানে ঘড়ির কাঁটার দিকে। তাই বুড়ো আঙুল কাগজের ভেতরে ঢোকে। মান একই, দিক উল্টো।",
            tex: ["\\vec A\\times\\vec B=-\\vec B\\times\\vec A"],
            replay: true,
            figure: (phase) => <Dir out={phase !== 1} />,
          },
          {
            title: "একক ভেক্টরের চক্র",
            text: "î, ĵ, k̂ একটা চক্রে সাজানো। চক্র বরাবর গুণ করলে পরের ভেক্টর পাই। উল্টো দিকে গেলে চিহ্ন বদলায়। ĵ × î কত?",
            locked: g.picks[5] === undefined,
            prompt: <Choices options={["k̂", "−k̂", "শূন্য ভেক্টর"]} answer={1} picked={g.picks[5]} onPick={g.pick(5)} explain="î থেকে ĵ চক্র বরাবর, তাই î × ĵ = k̂। ĵ থেকে î উল্টো দিকে, তাই ĵ × î = −k̂।" />,
            figure: () => {
              const i = pt(110, 200);
              const j = pt(330, 200);
              const k = pt(220, 70);
              return (
                <Stage w={440} h={260} label="î, ĵ, k̂ এর চক্র">
                  <Vec a={pt(i.x + 24, i.y)} b={pt(j.x - 24, j.y)} c="r" w={3} />
                  <Vec a={pt(j.x - 10, j.y - 20)} b={pt(k.x + 14, k.y + 24)} c="r" w={3} />
                  <Vec a={pt(k.x - 14, k.y + 24)} b={pt(i.x + 10, i.y - 20)} c="r" w={3} />
                  {[i, j, k].map((p, n) => (
                    <circle key={n} cx={p.x} cy={p.y} r={22} strokeWidth={3} style={{ fill: "var(--surface)", stroke: col.p }} />
                  ))}
                  <Lab p={pt(i.x, i.y + 6)}>î</Lab>
                  <Lab p={pt(j.x, j.y + 6)}>ĵ</Lab>
                  <Lab p={pt(k.x, k.y + 6)}>k̂</Lab>
                  <Lab p={pt(220, 240)} c="m">চক্র বরাবর: ধনাত্মক</Lab>
                </Stage>
              );
            },
          },
        ],
        summary: [
          {
            title: "মান আর দিক",
            text: "মান সামান্তরিকের ক্ষেত্রফল। দিক ডান হাতের নিয়মে। ক্রম উল্টালে দিক উল্টে যায়।",
            tex: ["|\\vec A\\times\\vec B|=AB\\sin\\theta", "\\vec A\\times\\vec B=-\\vec B\\times\\vec A"],
          },
          {
            title: "চক্র আর ডিটারমিন্যান্ট",
            text: "সমান্তরাল ভেক্টরের ক্রস গুণন শূন্য ভেক্টর। উপাংশ থাকলে ডিটারমিন্যান্ট।",
            tex: ["\\hat\\imath\\times\\hat\\jmath=\\hat k,\\ \\hat\\jmath\\times\\hat k=\\hat\\imath,\\ \\hat k\\times\\hat\\imath=\\hat\\jmath", "\\vec A\\times\\vec B=\\begin{vmatrix}\\hat\\imath&\\hat\\jmath&\\hat k\\\\A_x&A_y&A_z\\\\B_x&B_y&B_z\\end{vmatrix}"],
          },
        ],
      })}
    />
  );
}
