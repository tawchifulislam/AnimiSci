"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Stage, Vec, add, col } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { rad } from "@/lib/vec";

export const meta: LessonMeta = {
  guided: true,
  goal: "একটি ভেক্টরকে যেকোনো দুই দিকে ভাগ করার সূত্র বানাতে পারবে এবং সাইন সূত্র দিয়ে উপাংশ দুটির মান বের করতে পারবে।",
  hook: "খালের মাঝ বরাবর একটা নৌকা টেনে নিতে দুই পাড় থেকে দুজন দড়ি টানছে। নৌকা সোজা যাবে, কিন্তু দড়ি দুটো সোজা নয়, দুই পাশে বাঁকা। প্রতিটি দড়িতে কত টান লাগবে? দড়ি পরস্পর লম্ব নয়, তাই cos আর sin সরাসরি চলে না। এখানে কাজে লাগে সাইন সূত্র।",
  look: "R-এর মাথা থেকে টানা সমান্তরাল রেখা দুটো কীভাবে সামান্তরিক বানায়, তা দেখো। আর সামান্তরিকের অর্ধেকটা ত্রিভুজে কোন কোণ কোন বাহুর বিপরীতে পড়ে, সেটাও খেয়াল করো।",
  formulas: [
    { tex: "\\dfrac{P}{\\sin\\beta}=\\dfrac{Q}{\\sin\\alpha}=\\dfrac{R}{\\sin(\\alpha+\\beta)}", meaning: "R-কে P ও Q-তে ভাগের মূল সূত্র। α হলো R ও P-এর মাঝের কোণ, β হলো R ও Q-এর মাঝের কোণ।", step: 6 },
    { tex: "P=\\dfrac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}", meaning: "P-এর মান। P-এর বিপরীত কোণ β।", step: 7 },
    { tex: "Q=\\dfrac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}", meaning: "Q-এর মান। Q-এর বিপরীত কোণ α।", step: 7 },
    { tex: "\\alpha+\\beta=90^\\circ:\\ P=R\\cos\\alpha,\\ Q=R\\sin\\alpha", meaning: "দুই দিক লম্ব হলে আগের পাঠের সূত্রেই ফিরে আসে।", step: 8 },
  ],
  example: {
    problem: "একটি নৌকাকে খালের মাঝ বরাবর 100 N বলে টানা হচ্ছে। এক পাড়ের দড়ি খালের সাথে 30° এবং অন্য পাড়ের দড়ি 60° কোণে আছে। দুই দড়িতে টান কত?",
    steps: [
      { text: "দেওয়া আছে R = 100 N, α = 30°, β = 60°। কোণ দুটির যোগফল 90°, তাই sin(α + β) = 1।" },
      { text: "P-এর বিপরীত কোণ β। তাই P বের করি।", tex: "P=\\frac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}=\\frac{100\\times0.866}{1}=86.6\\ \\text{N}" },
      { text: "Q-এর বিপরীত কোণ α। তাই Q বের করি।", tex: "Q=\\frac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}=\\frac{100\\times0.5}{1}=50\\ \\text{N}" },
      { text: "যাচাই: খালের লম্ব দিকের অংশ দুটি সমান হওয়া উচিত, তাহলে কাটাকাটি হয়ে নৌকা সোজা যাবে।", tex: "P\\sin30^\\circ=86.6\\times0.5=43.3,\\quad Q\\sin60^\\circ=50\\times0.866=43.3" },
      { text: "উত্তর: একটি দড়িতে 86.6 N এবং অন্যটিতে 50 N।" },
    ],
  },
  mistakes: [
    "সাইন সূত্রে বিপরীত কোণ ভুল বসানো। P-এর বিপরীতে বসে β, α নয়।",
    "α ও β-কে দুই ভেক্টরের মাঝের কোণ ভাবা। এরা প্রত্যেকে R-এর সাথে তৈরি কোণ।",
    "হরে sin α + sin β লেখা। হরে বসে sin(α + β)।",
    "দিক লম্ব না হলেও cos আর sin সরাসরি বসানো।",
  ],
  recap: [
    "R-কে দুই দিকে ভাগ করতে R-এর মাথা থেকে দুই দিকের সমান্তরাল রেখা টেনে সামান্তরিক আঁকো।",
    "সামান্তরিকের অর্ধেকটা একটা ত্রিভুজ, যার বাহু P, Q আর R।",
    "ত্রিভুজে বাহু ÷ বিপরীত কোণের sin সবার জন্য এক। এটাই সাইন সূত্র।",
    "α + β = 90° হলে সূত্র সরল হয়ে P = R cosα এবং Q = R sinα হয়।",
  ],
  think: {
    scenario: "একটা ভারী লণ্ঠন দুটো দড়িতে ঝুলছে, দড়ি দুটো ছাদের দুই বিন্দুতে বাঁধা। দড়ি দুটো খাড়ার সাথে সমান কোণে বাইরের দিকে হেলানো।",
    points: [
      "লণ্ঠন স্থির আছে। তাহলে দুই দড়ির টানের লব্ধি কোন দিকে আর কত?",
      "দড়ি দুটো আরও বেশি হেলিয়ে বাঁধলে প্রতিটি দড়ির টান বাড়বে না কমবে? কেন?",
      "দড়ি দুটো প্রায় আনুভূমিক করে টানটান বাঁধা কি সম্ভব? ছিঁড়ে যাওয়ার ঝুঁকি কেমন?",
      "দুই দড়ির কোণ আলাদা (একটা 30°, একটা 60°) হলে টান কি সমান হবে? কোনটায় বেশি?",
    ],
    hint: "দুই দড়ির লব্ধি ওজনের সমান ও বিপরীত। দড়ি যত বেশি হেলানো, লব্ধি ঠিক রাখতে টান তত বেশি লাগে। যে দড়ি লব্ধির দিকের বেশি কাছে, তার টান বেশি।",
    traps: [
      "সাইন সূত্রে P-এর বিপরীতে α বসে।",
      "α আর β হলো দুই ভেক্টর P ও Q-এর মাঝের কোণ।",
      "হরে sin α + sin β বসে।",
      "দিক লম্ব না হলেও P = R cosα হয়।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "একটি নৌকাকে খালের মাঝ বরাবর 100 N বলে টানা হচ্ছে। এক পাড়ের দড়ি খালের সাথে 30° এবং অন্য পাড়ের দড়ি 60° কোণে আছে। দুই দড়িতে টান কত?",
      hint: "α + β = 90° হলে sin(α + β) = 1।",
      steps: [
        { text: "দেওয়া আছে R = 100 N, α = 30°, β = 60°। কোণ দুটির যোগফল 90°, তাই sin(α + β) = 1।" },
        { text: "P-এর বিপরীত কোণ β। তাই P বের করি।", tex: "P=\\frac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}=\\frac{100\\times0.866}{1}=86.6\\ \\text{N}" },
        { text: "Q-এর বিপরীত কোণ α। তাই Q বের করি।", tex: "Q=\\frac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}=\\frac{100\\times0.5}{1}=50\\ \\text{N}" },
        { text: "যাচাই: খালের লম্ব দিকের অংশ দুটি সমান হওয়া উচিত।", tex: "P\\sin30^\\circ=86.6\\times0.5=43.3,\\quad Q\\sin60^\\circ=50\\times0.866=43.3" },
        { text: "উত্তর: একটি দড়িতে 86.6 N এবং অন্যটিতে 50 N।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "100 N ওজনের একটি লণ্ঠন দুটো দড়িতে ঝুলছে। দড়ি দুটো খাড়ার সাথে 45° করে হেলানো। প্রতিটি দড়ির টান কত?",
      hint: "দড়ির লব্ধি 100 N ওপরের দিকে। দড়ি দুটো লব্ধির সাথে α = β = 45°।",
      steps: [
        { text: "লণ্ঠন স্থির, তাই দুই দড়ির টানের লব্ধি ওজনের সমান, 100 N ওপরের দিকে। দুই কোণই 45°।" },
        { text: "সাইন সূত্র বসাই।", tex: "T=\\frac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}=\\frac{100\\sin45^\\circ}{\\sin90^\\circ}=70.7\\ \\text{N}" },
        { text: "দুই কোণ সমান, তাই দুই দড়ির টানও সমান।" },
        { text: "উত্তর: প্রতিটি দড়িতে 70.7 N। এটা ওজনের চেয়ে কম, কিন্তু দুটো মিলে ওজন সামলাচ্ছে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "R = 120 N, α = 30°, β = 90° হলে P ও Q কত? ফল দেখে কী বোঝা যায়?",
      hint: "sin(α + β) = sin 120° = 0.866।",
      steps: [
        { text: "α + β = 120°, তাই হরে sin 120° = 0.866।" },
        { text: "P বের করি।", tex: "P=\\frac{120\\sin90^\\circ}{\\sin120^\\circ}=\\frac{120}{0.866}=138.6\\ \\text{N}" },
        { text: "Q বের করি।", tex: "Q=\\frac{120\\sin30^\\circ}{\\sin120^\\circ}=\\frac{60}{0.866}=69.3\\ \\text{N}" },
        { text: "যাচাই: R-এর দিকে P cos30° + Q cos90° = 138.6 × 0.866 + 0 = 120 N। ঠিক আছে।" },
        { text: "উত্তর: P = 138.6 N, Q = 69.3 N। P লব্ধির চেয়েও বড়, কারণ Q-এর লম্ব অংশ কাটাতে P-কে অতিরিক্ত বল দিতে হচ্ছে।" },
      ],
    },
  ],
  concepts: [
    "α + β = 180° হলে sin(α + β) শূন্য হয়ে যায়। তখন P আর Q-এর কী হয়? এর মানে কী?",
    "কোন অবস্থায় P বা Q লব্ধি R-এর চেয়েও বড় হতে পারে? ছবি এঁকে দেখাতে পারো?",
    "লম্ব উপাংশে ভাগ আর সাইন সূত্রে ভাগ, দুটোর মধ্যে মিল কোথায়?",
  ],
  quiz: [
    { q: "R = 10, α = 30°, β = 30° হলে P কত?", options: ["5 N", "5.77 N", "8.66 N", "10 N"], answer: 1, why: "P = 10 sin30° ÷ sin60° = 5 ÷ 0.866 = 5.77 N। 5 N হলো হর ভুলে 1 ধরলে পাওয়া ফল।" },
    { q: "α + β = 90° হলে P কত?", options: ["R sinα", "R cosα", "R tanα", "R"], answer: 1, why: "sin β = sin(90° − α) = cos α এবং sin(α + β) = 1। তাই P = R cosα।" },
    { q: "সাইন সূত্রে P-এর বিপরীত কোণ কোনটি?", options: ["α", "β", "α + β", "α − β"], answer: 1, why: "P-এর বিপরীত কোণ β। Q-এর বিপরীতে α।" },
    { q: "R = 100 N, α = β = 45° হলে P কত?", options: ["50 N", "70.7 N", "100 N", "141 N"], answer: 1, why: "sin(α + β) = sin 90° = 1, তাই P = 100 sin45° = 70.7 N।" },
    { q: "R = 120 N, α = 30°, β = 90° হলে Q কত?", options: ["60 N", "69.3 N", "120 N", "138.6 N"], answer: 1, why: "Q = 120 sin30° ÷ sin120° = 60 ÷ 0.866 = 69.3 N। 138.6 N হলো P-এর মান।" },
  ],
};

const L = 120;
const SC = 0.85;

function LampFigure({ phi, resultant, para, arcs, vals }: { phi: number; resultant: boolean; para: boolean; arcs: boolean; vals: boolean }) {
  const sn = Math.sin(rad(phi));
  const cs = Math.cos(rad(phi));
  const lamp = pt(220, 70 + L * cs);
  const aL = pt(220 - L * sn, 70);
  const aR = pt(220 + L * sn, 70);
  const t = 100 / (2 * cs);
  const ts = t * SC;
  const t1 = pt(lamp.x - ts * sn, lamp.y - ts * cs);
  const t2 = pt(lamp.x + ts * sn, lamp.y - ts * cs);
  const rTip = pt(lamp.x, lamp.y - 100 * SC);
  return (
    <Stage w={440} h={260} label="দুই দড়িতে ঝোলানো লণ্ঠন">
      <Seg a={pt(60, 70)} b={pt(380, 70)} c="m" w={4} />
      <Seg a={lamp} b={aL} c="m" w={2.5} />
      <Seg a={lamp} b={aR} c="m" w={2.5} />
      <Seg a={t1} b={rTip} dash c="m" w={1.5} show={para} />
      <Seg a={t2} b={rTip} dash c="m" w={1.5} show={para} />
      <Vec a={lamp} b={pt(lamp.x, lamp.y + 60)} c="m" w={3} dash />
      <Vec a={lamp} b={t1} c="p" w={4} />
      <Vec a={lamp} b={t2} c="q" w={4} />
      <Vec a={lamp} b={resultant ? rTip : lamp} c="r" w={5} show={resultant} />
      <Arc o={lamp} r={34} from={90} to={90 + phi} c="f" w={1.5} show={arcs && phi > 3} />
      <Arc o={lamp} r={34} from={90 - phi} to={90} c="f" w={1.5} show={arcs && phi > 3} />
      <Lab p={pt(lamp.x - 30, lamp.y - 44)} show={arcs && phi > 3}>β</Lab>
      <Lab p={pt(lamp.x + 30, lamp.y - 44)} show={arcs && phi > 3}>α</Lab>
      <Dot p={lamp} c="f" r={9} />
      <Lab p={add(t1, -8, -6)} c="p" anchor="end">{vals ? `${t.toFixed(1)} N` : "T"}</Lab>
      <Lab p={add(t2, 8, -6)} c="q" anchor="start">{vals ? `${t.toFixed(1)} N` : "T"}</Lab>
      <Lab p={add(rTip, 12, 0)} c="r" anchor="start" show={resultant}>R = 100 N</Lab>
      <Lab p={pt(lamp.x + 14, lamp.y + 62)} c="m" anchor="start">ওজন 100 N</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [phi, setPhi] = useState(45);
  const tv = 100 / (2 * Math.cos(rad(phi)));
  const note =
    phi <= 3
      ? "দড়ি খাড়া: প্রতিটি দড়ি ওজনের অর্ধেক, 50 N।"
      : phi >= 70
        ? "দড়ি প্রায় আনুভূমিক: টান ওজনের কয়েক গুণ হয়ে যায়, দড়ি ছিঁড়ে যাওয়ার ঝুঁকি।"
        : "দড়ি যত বেশি হেলানো, প্রতিটি দড়ির টান তত বেশি।";

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ঝুলন্ত লণ্ঠন",
            text: (
              <>
                100 N ওজনের একটা লণ্ঠন দুই দড়িতে ঝুলছে, সে স্থির। দুই দড়ির টানের লব্ধি কত আর কোন দিকে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["100 N, ওপরের দিকে", "100 N, নিচের দিকে", "200 N, ওপরের দিকে"]} answer={0} picked={g.picks[0]} onPick={g.pick(0)} explain="লণ্ঠন স্থির, তাই টানের লব্ধি ওজনের সমান আর বিপরীত: 100 N ওপরের দিকে।" />,
            figure: () => <LampFigure phi={45} resultant={g.picks[0] !== undefined} para={false} arcs={false} vals={false} />,
          },
          {
            title: "সামান্তরিক আঁকো",
            text: (
              <>
                লব্ধি <C k="r">R</C>-এর মাথা থেকে দুই দড়ির সমান্তরাল রেখা টানো। ছবিটা একটা সামান্তরিক, যার কর্ণ R আর বাহু দুটো <C k="p">T</C> আর <C k="q">T</C>।
              </>
            ),
            replay: true,
            figure: (phase) => <LampFigure phi={45} resultant para={phase === 1} arcs={false} vals={false} />,
          },
          {
            title: "ত্রিভুজ আর সাইন সূত্র",
            text: (
              <>
                R আর দড়ির মাঝের কোণ দুটো α আর β। ত্রিভুজে প্রতিটি বাহুকে তার বিপরীত কোণের sin দিয়ে ভাগ করলে একই সংখ্যা পাই।
              </>
            ),
            tex: ["\\dfrac{P}{\\sin\\beta}=\\dfrac{Q}{\\sin\\alpha}=\\dfrac{R}{\\sin(\\alpha+\\beta)}"],
            figure: () => <LampFigure phi={45} resultant para arcs vals={false} />,
          },
          {
            title: "প্রতিটি দড়িতে কত টান?",
            text: (
              <>
                α = β = 45°, R = 100 N। সাইন সূত্রে T বের করলে প্রতিটি দড়িতে টান কত?
              </>
            ),
            tex: ["T=\\dfrac{R\\sin\\beta}{\\sin(\\alpha+\\beta)}=\\dfrac{100\\sin45^\\circ}{\\sin90^\\circ}"],
            locked: g.picks[3] === undefined,
            prompt: <Choices options={["50 N", "70.7 N", "100 N"]} answer={1} picked={g.picks[3]} onPick={g.pick(3)} explain="100 × 0.707 ÷ 1 = 70.7 N। প্রতিটি দড়ির টান ওজনের চেয়ে কম, কিন্তু দুটো মিলে ওজন সামলাচ্ছে।" />,
            figure: () => <LampFigure phi={45} resultant para arcs vals={g.picks[3] !== undefined} />,
          },
          {
            title: "দড়ি আরও হেলালে",
            text: (
              <>
                দড়ির হেলান <b>φ</b> বদলাও। প্রতিটি দড়ির টান কীভাবে বদলায়?
              </>
            ),
            prompt: (
              <Play
                label="φ"
                value={phi}
                min={0}
                max={75}
                suffix="°"
                onChange={setPhi}
                chips={[0, 30, 45, 60, 75]}
                read={
                  <span>
                    T = <C k="p">{tv.toFixed(1)} N</C>
                  </span>
                }
                note={note}
              />
            ),
            figure: () => <LampFigure phi={phi} resultant para={false} arcs={false} vals />,
          },
        ],
        summary: [
          {
            title: "সাইন সূত্র",
            text: "R-কে P আর Q-তে ভাগ করার সূত্র। α আর β হলো R-এর সাথে P ও Q-এর কোণ।",
            tex: ["\\dfrac{P}{\\sin\\beta}=\\dfrac{Q}{\\sin\\alpha}=\\dfrac{R}{\\sin(\\alpha+\\beta)}", "P=\\dfrac{R\\sin\\beta}{\\sin(\\alpha+\\beta)},\\quad Q=\\dfrac{R\\sin\\alpha}{\\sin(\\alpha+\\beta)}"],
          },
          {
            title: "লম্ব হলে সরল",
            text: "α + β = 90° হলে সূত্র আগের লম্ব উপাংশের সূত্রে ফিরে আসে।",
            tex: ["\\alpha+\\beta=90^\\circ:\\ P=R\\cos\\alpha,\\ Q=R\\sin\\alpha"],
          },
        ],
      })}
    />
  );
}
