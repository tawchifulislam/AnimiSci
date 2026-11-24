"use client";

import { useState } from "react";
import { C, Choices, GuidedLesson, Play, pt, type Built } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Square, Stage, Vec, add, mid, pol } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";
import { rad } from "@/lib/vec";

export const meta: LessonMeta = {
  guided: true,
  goal: "একটি ভেক্টরকে পরস্পর লম্ব দুই দিকে ভাগ করতে পারবে, cosθ ও sinθ কোন উপাংশের সাথে বসে তা বুঝবে এবং উপাংশ থেকে ভেক্টর ফিরে পেতে পারবে।",
  hook: "একটা কাঠি ঢালু করে ধরো। ওপর থেকে আলো ফেললে মেঝেতে একটা ছায়া পড়ে, পাশ থেকে ফেললে দেয়ালে আরেকটা। মেঝের ছায়া বলে কাঠিটা কতটা সামনে গেছে, দেয়ালের ছায়া বলে কতটা ওপরে উঠেছে। ভেক্টরকে লম্ব উপাংশে ভাগ করা মানে এই দুই ছায়া মাপা।",
  look: "θ বাড়লে মেঝের ছায়া আর দেয়ালের ছায়ার মধ্যে কোনটা ছোট হয় আর কোনটা বড়, তা খেয়াল করো। আর দুই ছায়া আর R মিলে কোন আকার তৈরি হয়, সেটাও দেখো।",
  formulas: [
    { tex: "R_x=R\\cos\\theta", meaning: "অনুভূমিক (x) উপাংশ। θ হলো ভেক্টর ও x-অক্ষের মাঝের কোণ।", step: 5 },
    { tex: "R_y=R\\sin\\theta", meaning: "উল্লম্ব (y) উপাংশ।", step: 6 },
    { tex: "R=\\sqrt{R_x^2+R_y^2}", meaning: "উপাংশ থেকে ভেক্টরের মান ফিরে পাওয়া।", step: 7 },
    { tex: "\\tan\\theta=\\dfrac{R_y}{R_x}", meaning: "উপাংশ থেকে ভেক্টরের দিক।", step: 7 },
    { tex: "\\theta=0^\\circ:\\ R_x=R,\\ R_y=0\\qquad\\theta=90^\\circ:\\ R_x=0,\\ R_y=R", meaning: "দুই সীমান্ত কোণে ফল।", step: 8 },
  ],
  example: {
    problem: "10 N মানের একটি বল অনুভূমিকের সাথে 30° কোণে কাজ করছে। এর অনুভূমিক ও উল্লম্ব উপাংশ বের করো। তারপর উপাংশ 6 N ও 8 N হলে বলের মান ও দিক কত?",
    steps: [
      { text: "অনুভূমিক উপাংশের জন্য cos বসে।", tex: "F_x=10\\cos30^\\circ=10\\times0.866=8.66\\ \\text{N}" },
      { text: "উল্লম্ব উপাংশের জন্য sin বসে।", tex: "F_y=10\\sin30^\\circ=10\\times0.5=5\\ \\text{N}" },
      { text: "যাচাই: উপাংশ দুটি থেকে মান ফিরে পাই।", tex: "F=\\sqrt{8.66^2+5^2}=\\sqrt{75+25}=10\\ \\text{N}" },
      { text: "এবার উল্টো পথ। উপাংশ 6 N ও 8 N হলে বল কত এবং দিক কোন দিকে?", tex: "F=\\sqrt{6^2+8^2}=10\\ \\text{N},\\quad \\theta=\\tan^{-1}\\frac{8}{6}=53.1^\\circ" },
      { text: "উত্তর: প্রথম বলের উপাংশ 8.66 N ও 5 N। দ্বিতীয় বলের মান 10 N, যা অনুভূমিকের সাথে 53.1° কোণে।" },
    ],
  },
  mistakes: [
    "cos আর sin উল্টে বসানো। কোণ x-অক্ষের সাথে মাপলে x-উপাংশে cos বসে, y-উপাংশে sin।",
    "কোণ y-অক্ষ থেকে মাপা থাকলে সূত্র সরাসরি বসানো। তখন x-উপাংশে sin আর y-উপাংশে cos বসে।",
    "উপাংশ দুটি সরাসরি যোগ করে মান বের করা। মান পাওয়া যায় পিথাগোরাস দিয়ে, 8.66 + 5 দিয়ে নয়।",
    "ক্যালকুলেটর রেডিয়ান মোডে রেখে cos, sin বের করা।",
  ],
  recap: [
    "লম্ব উপাংশ মানে ভেক্টরের দুটি ছায়া, একটা x-অক্ষে আর একটা y-অক্ষে।",
    "কোণ x-অক্ষ থেকে মাপা হলে Rx = R cosθ এবং Ry = R sinθ।",
    "উপাংশ জানলে ভেক্টর ফিরে পাওয়া যায়: মান পিথাগোরাস দিয়ে, দিক tanθ = Ry/Rx দিয়ে।",
    "θ = 0° হলে পুরোটাই x-উপাংশ। θ = 90° হলে পুরোটাই y-উপাংশ।",
  ],
  think: {
    scenario: "একটা ঠেলাগাড়িকে তুমি হাতল ধরে 50 N বলে ঠেলছ। হাতলটা মাটির সাথে 30° কোণে নিচের দিকে হেলানো।",
    points: [
      "50 N-এর সবটাই কি গাড়িকে সামনে এগোচ্ছে? বাকি অংশটা কোথায় যাচ্ছে?",
      "হাতল আরও নিচু করে (কোণ কমিয়ে) ঠেললে সামনে ঠেলার অংশ বাড়বে না কমবে? কেন?",
      "হাতল পুরো খাড়া ধরলে (90°) গাড়ি কি সামনে এগোবে?",
      "ঠেলার বদলে টানলে (হাতল ওপরে হেলানো) নিচের দিকের অংশের কী পরিবর্তন হবে?",
    ],
    hint: "বলের যে অংশ চলার দিকে নয়, সেটা মাটিকে চাপে। কোণ কমলে cosθ বাড়ে, sinθ কমে। 90°-এ cos 90° = 0। টানলে বলের লম্ব অংশ ওপরের দিকে যায়, ফলে মাটির ওপর চাপ কমে।",
    traps: [
      "কোণ x-অক্ষ থেকে মাপলেও x-উপাংশে sin বসে।",
      "কোণ y-অক্ষ থেকে মাপা থাকলেও সূত্র একই থাকে।",
      "উপাংশ দুটির মান সরাসরি যোগ করলে মূল বলের মান পাওয়া যায়।",
      "বলের উপাংশ বলের চেয়ে বড় হতে পারে।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "10 N মানের একটি বল অনুভূমিকের সাথে 30° কোণে কাজ করছে। এর অনুভূমিক ও উল্লম্ব উপাংশ বের করো। তারপর উপাংশ 6 N ও 8 N হলে বলের মান ও দিক কত?",
      hint: "x-অক্ষ থেকে কোণ মাপলে x-উপাংশে cos, y-উপাংশে sin।",
      steps: [
        { text: "অনুভূমিক উপাংশের জন্য cos বসে।", tex: "F_x=10\\cos30^\\circ=10\\times0.866=8.66\\ \\text{N}" },
        { text: "উল্লম্ব উপাংশের জন্য sin বসে।", tex: "F_y=10\\sin30^\\circ=10\\times0.5=5\\ \\text{N}" },
        { text: "যাচাই: উপাংশ দুটি থেকে মান ফিরে পাই।", tex: "F=\\sqrt{8.66^2+5^2}=\\sqrt{75+25}=10\\ \\text{N}" },
        { text: "এবার উল্টো পথ। উপাংশ 6 N ও 8 N হলে বল কত এবং দিক কোন দিকে?", tex: "F=\\sqrt{6^2+8^2}=10\\ \\text{N},\\quad \\theta=\\tan^{-1}\\frac{8}{6}=53.1^\\circ" },
        { text: "উত্তর: প্রথম বলের উপাংশ 8.66 N ও 5 N। দ্বিতীয় বলের মান 10 N, যা অনুভূমিকের সাথে 53.1° কোণে।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "50 N বল অনুভূমিকের সাথে 30° কোণে নিচের দিকে ঠেলছে। সামনে ঠেলার অংশ আর নিচে চাপার অংশ কত?",
      hint: "কোণ অনুভূমিকের সাথে, তাই সামনের অংশে cos।",
      steps: [
        { text: "সামনে ঠেলার অংশ অনুভূমিক উপাংশ, তাই cos।", tex: "F_x=50\\cos30^\\circ=50\\times0.866=43.3\\ \\text{N}" },
        { text: "নিচে চাপার অংশ উল্লম্ব উপাংশ, তাই sin।", tex: "F_y=50\\sin30^\\circ=50\\times0.5=25\\ \\text{N}" },
        { text: "যাচাই: উপাংশ থেকে বল ফিরে পাই।", tex: "\\sqrt{43.3^2+25^2}=50\\ \\text{N}" },
        { text: "উত্তর: সামনে ঠেলার অংশ 43.3 N, মাটিতে চাপার অংশ 25 N।" },
      ],
    },
    {
      level: "কঠিন",
      q: "একটি বলের দুই লম্ব উপাংশ সমান। বলের মান 20 N হলে প্রতিটি উপাংশ কত এবং বলটি অনুভূমিকের সাথে কত কোণে আছে?",
      hint: "উপাংশ সমান হলে tanθ কত হয়?",
      steps: [
        { text: "উপাংশ দুটি সমান, তাই tanθ = Fy ÷ Fx = 1।", tex: "F_x=F_y\\Rightarrow\\tan\\theta=1\\Rightarrow\\theta=45^\\circ" },
        { text: "এবার একটি উপাংশ বের করি।", tex: "F_x=20\\cos45^\\circ=20\\times0.707=14.14\\ \\text{N}" },
        { text: "যাচাই: দুই উপাংশ থেকে মান ফিরে পাই।", tex: "\\sqrt{14.14^2+14.14^2}=20\\ \\text{N}" },
        { text: "উত্তর: প্রতিটি উপাংশ 14.14 N, কোণ 45°।" },
      ],
    },
  ],
  concepts: [
    "কোন কোণে x-উপাংশ আর y-উপাংশ সমান হয়? তখন বল কোন দিকে?",
    "অক্ষ দুটি একটু ঘুরিয়ে নিলে উপাংশের মান কি বদলাবে? মূল ভেক্টরটা কি বদলাবে?",
    "ঢালু তলে রাখা বস্তুর ওজনকে কোন দুই লম্ব দিকে ভাগ করা সুবিধাজনক? কেন?",
  ],
  quiz: [
    { q: "20 N বল x-অক্ষের সাথে 60° কোণে আছে। এর x-উপাংশ কত?", options: ["10 N", "17.3 N", "20 N", "34.6 N"], answer: 0, why: "20 cos 60° = 20 × 0.5 = 10 N। 17.3 N হলো y-উপাংশ, ভুল করে sin বসালে পাওয়া যায়।" },
    { q: "কোন কোণে ভেক্টরের y-উপাংশ শূন্য হয়? (কোণ x-অক্ষ থেকে মাপা)", options: ["90°", "45°", "0°", "60°"], answer: 2, why: "sin 0° = 0, তাই ভেক্টর পুরোটা x-অক্ষ বরাবর শুয়ে থাকে।" },
    { q: "উপাংশ 3 ও 4 হলে ভেক্টরের মান কত?", options: ["7", "5", "1", "12"], answer: 1, why: "মান পাওয়া যায় পিথাগোরাস দিয়ে: √(3² + 4²) = 5। 7 হলো সরাসরি যোগ করার ভুল।" },
    { q: "কোণ y-অক্ষ থেকে মাপা থাকলে x-উপাংশ কত?", options: ["R cosθ", "R sinθ", "R tanθ", "R"], answer: 1, why: "y-অক্ষের পাশের কোণে cos যায় y-উপাংশে, আর বিপরীত x-উপাংশে বসে sin।" },
    { q: "30 N বল x-অক্ষ বরাবর (0° কোণে) থাকলে y-উপাংশ কত?", options: ["0", "30 N", "15 N", "60 N"], answer: 0, why: "sin 0° = 0, তাই y-উপাংশ শূন্য। 30 N হলো x-উপাংশ।" },
  ],
};

const O = pt(70, 70);

function ForceFigure({ th, comp, arc, vals }: { th: number; comp: boolean; arc: boolean; vals: boolean }) {
  const f = 50 * 3.6;
  const c = Math.cos(rad(th));
  const s = Math.sin(rad(th));
  const tip = pt(O.x + f * c, O.y + f * s);
  const corner = pt(tip.x, O.y);
  return (
    <Stage w={440} h={260} label="বল আর তার দুই লম্ব উপাংশ">
      <Seg a={pt(30, O.y)} b={pt(410, O.y)} dash c="m" w={1} />
      <Vec a={O} b={tip} c="r" w={5} />
      <Vec a={O} b={comp ? corner : O} c="p" w={4} show={comp} />
      <Vec a={corner} b={comp ? tip : corner} c="q" w={4} show={comp} />
      <Square at={corner} d1={{ x: -1, y: 0 }} d2={{ x: 0, y: 1 }} show={comp && th > 4 && th < 86} />
      <Arc o={O} r={36} from={-th} to={0} c="f" w={1.5} show={arc && th > 3} />
      <Lab p={pol(O, -th / 2, 56)} show={arc && th > 3}>θ</Lab>
      <Dot p={O} c="f" r={5} />
      <Lab p={add(mid(O, corner), 0, -12)} c="p" show={comp && th < 88}>{vals ? `Fx = ${(50 * c).toFixed(1)} N` : "Fx"}</Lab>
      <Lab p={add(mid(corner, tip), 12, 0)} c="q" anchor="start" show={comp && th > 2}>{vals ? `Fy = ${(50 * s).toFixed(1)} N` : "Fy"}</Lab>
      <Lab p={add(mid(O, tip), -10, 8)} c="r" anchor="end">F = 50 N</Lab>
    </Stage>
  );
}

export default function Anim() {
  const [ang, setAng] = useState(30);
  const cx = 50 * Math.cos(rad(ang));
  const cy = 50 * Math.sin(rad(ang));
  const note =
    ang === 0
      ? "θ = 0°: পুরোটাই সামনে, নিচে চাপ নেই।"
      : ang === 90
        ? "θ = 90°: পুরোটাই নিচে চাপছে, গাড়ি এগোবে না।"
        : "কোণ কমলে সামনের অংশ বাড়ে, কোণ বাড়লে নিচের অংশ বাড়ে।";

  return (
    <GuidedLesson
      meta={meta}
      build={(g): Built => ({
        concept: [
          {
            title: "ঠেলাগাড়ি",
            text: (
              <>
                তুমি হাতল ধরে 50 N বলে গাড়ি ঠেলছ। হাতল মাটির সাথে 30° কোণে নিচের দিকে হেলানো। পুরো 50 N কি গাড়িকে সামনে এগোচ্ছে?
              </>
            ),
            locked: g.picks[0] === undefined,
            prompt: <Choices options={["হ্যাঁ, পুরোটাই সামনে", "না, কিছুটা নিচে চাপছে", "না, পুরোটাই নিচে চাপছে"]} answer={1} picked={g.picks[0]} onPick={g.pick(0)} explain="বলের একটা অংশ গাড়িকে সামনে এগোয়, আরেকটা অংশ মাটিকে নিচে চাপে। বলকে এই দুই লম্ব অংশে ভাগ করা যায়।" />,
            figure: () => <ForceFigure th={30} comp={g.picks[0] !== undefined} arc={false} vals={false} />,
          },
          {
            title: "দুই অংশ",
            text: (
              <>
                সামনের অংশ <C k="p">Fx</C>, নিচের অংশ <C k="q">Fy</C>। দুটো একসাথে ঠিক 50 N-এর মতো কাজ করে, আর পরস্পর লম্ব।
              </>
            ),
            replay: true,
            figure: (phase) => <ForceFigure th={30} comp={phase === 1} arc vals />,
          },
          {
            title: "কোণ বদলে দেখো",
            text: (
              <>
                <b>θ</b> বদলাও। কোন কোণে সামনের অংশ সবচেয়ে বড়? কোন কোণে নিচের অংশ?
              </>
            ),
            prompt: (
              <Play
                label="θ"
                value={ang}
                min={0}
                max={90}
                suffix="°"
                onChange={setAng}
                chips={[0, 30, 45, 60, 90]}
                read={
                  <>
                    <span>
                      <C k="p">Fx = {cx.toFixed(1)} N</C>
                    </span>
                    <span>
                      <C k="q">Fy = {cy.toFixed(1)} N</C>
                    </span>
                  </>
                }
                note={note}
              />
            ),
            figure: () => <ForceFigure th={ang} comp arc vals />,
          },
          {
            title: "কোনটায় cos, কোনটায় sin?",
            text: "θ মাপা হয় অনুভূমিক দিক থেকে। কোণের গায়ে লাগানো অংশে cos, কোণের উল্টো দিকের অংশে sin।",
            tex: ["F_x=F\\cos\\theta", "F_y=F\\sin\\theta"],
            replay: true,
            figure: (phase) => <ForceFigure th={30} comp={phase === 1} arc vals />,
          },
          {
            title: "উপাংশ থেকে বল",
            text: "উল্টো পথেও যাওয়া যায়। দুই উপাংশ 6 N আর 8 N হলে মূল বল কত?",
            locked: g.picks[4] === undefined,
            prompt: <Choices options={["14 N", "10 N", "2 N"]} answer={1} picked={g.picks[4]} onPick={g.pick(4)} explain="মান পাই পিথাগোরাস দিয়ে: √(6² + 8²) = 10 N। দিক: tanθ = 8 ÷ 6, তাই θ = 53.1°।" />,
            figure: () => {
              const done = g.picks[4] !== undefined;
              const o = pt(80, 60);
              const t = pt(200, 220);
              return (
                <Stage w={440} h={260} label="উপাংশ 6 N আর 8 N থেকে মূল বল">
                  <Vec a={o} b={pt(200, 60)} c="p" w={4} />
                  <Vec a={pt(200, 60)} b={t} c="q" w={4} />
                  <Vec a={o} b={done ? t : o} c="r" w={5} show={done} />
                  <Square at={pt(200, 60)} d1={{ x: -1, y: 0 }} d2={{ x: 0, y: 1 }} />
                  <Dot p={o} c="f" r={5} />
                  <Lab p={pt(140, 44)} c="p">6 N</Lab>
                  <Lab p={pt(216, 140)} c="q" anchor="start">8 N</Lab>
                  <Lab p={pt(128, 150)} c="r" anchor="end" show={done}>F = 10 N</Lab>
                </Stage>
              );
            },
          },
        ],
        summary: [
          {
            title: "দুটি সূত্র",
            text: "কোণ অনুভূমিক দিক থেকে মাপলে:",
            tex: ["F_x=F\\cos\\theta", "F_y=F\\sin\\theta"],
          },
          {
            title: "উপাংশ থেকে বল",
            text: "উপাংশ জানলে মূল বলের মান আর দিক ফিরে পাওয়া যায়।",
            tex: ["F=\\sqrt{F_x^2+F_y^2}", "\\tan\\theta=\\dfrac{F_y}{F_x}"],
          },
        ],
      })}
    />
  );
}
