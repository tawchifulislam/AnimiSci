"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { Guide, type GuideStep } from "@/components/lesson/Guide";
import { C, Choices, tailSteps, useFinishMark } from "@/components/lesson/guide-kit";
import { Arc, Dot, Lab, Seg, Square, Stage, Vec, add, col, mid, pol, type Pt } from "@/components/anim/kit";
import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  guided: true,
  goal: "স্কেলার ও ভেক্টরের পার্থক্য বুঝবে, দূরত্ব আর সরণের তফাত করতে পারবে এবং ভেক্টর লেখার নিয়ম শিখবে।",
  hook: "কেউ বলল, আমি তোমার থেকে 250 কিমি দূরে আছি। তুমি কি তাকে খুঁজে পাবে? দিক না বললে কথা অসম্পূর্ণ।",
  formulas: [
    { tex: "d=\\sqrt{x^2+y^2}", meaning: "পূর্ব দিকে x আর উত্তর দিকে y গেলে সরণের মান (পিথাগোরাস)।" },
    { tex: "\\tan\\theta=\\dfrac{y}{x}", meaning: "সরণ পূর্ব দিক থেকে কত কোণে আছে।" },
    { tex: "|\\vec A|=A\\ge 0", meaning: "ভেক্টরের মান কখনো ঋণাত্মক হয় না। ঋণ চিহ্ন শুধু উল্টো দিক বোঝায়।" },
  ],
  example: {
    problem: "একজন লোক 6 মিটার পশ্চিমে গিয়ে তারপর 8 মিটার দক্ষিণে গেল। মোট দূরত্ব, সরণের মান এবং সরণ পশ্চিম থেকে কত কোণে, বের করো।",
    steps: [
      { text: "দূরত্ব হলো পথের দৈর্ঘ্যের যোগফল।", tex: "s=6+8=14\\ \\text{m}" },
      { text: "পশ্চিম আর দক্ষিণ পরস্পর লম্ব, তাই সরণে পিথাগোরাস খাটে।", tex: "d=\\sqrt{6^2+8^2}=\\sqrt{100}=10\\ \\text{m}" },
      { text: "কোণ বের করতে tan ব্যবহার করি।", tex: "\\tan\\theta=\\frac{8}{6}\\;\\Rightarrow\\;\\theta=53.1^\\circ" },
      { text: "উত্তর: দূরত্ব 14 মিটার, সরণ 10 মিটার এবং সরণ পশ্চিম থেকে 53.1° দক্ষিণের দিকে। লক্ষ করো, সরণ দূরত্বের চেয়ে ছোট।" },
    ],
  },
  mistakes: [
    "দূরত্ব আর সরণকে এক ভাবা। পথ বাঁকা হলে দূরত্ব বড় হয়, সরণ ছোট হয়।",
    "দ্রুতি আর বেগকে এক ভাবা। দ্রুতি স্কেলার, বেগ ভেক্টর।",
    "ভেক্টরের মান ঋণাত্মক ধরা। মান সব সময় শূন্য বা ধনাত্মক। ঋণ চিহ্ন বোঝায় উল্টো দিক।",
    "'দিক আছে মানেই ভেক্টর' ভাবা। তড়িৎ প্রবাহের দিক আছে, কিন্তু সেটা ভেক্টর যোগের নিয়ম মানে না, তাই স্কেলার।",
  ],
  recap: [
    "স্কেলার: শুধু মান। যেমন দূরত্ব, দ্রুতি, ভর, সময়, কাজ, শক্তি, তাপমাত্রা।",
    "ভেক্টর: মান ও দিক দুটোই আছে। যেমন সরণ, বেগ, ত্বরণ, বল, ভরবেগ।",
    "দূরত্ব স্কেলার, সরণ ভেক্টর। সরণ সব সময় দূরত্বের সমান বা তার চেয়ে ছোট।",
    "ভেক্টরকে তীর দিয়ে আঁকি: তীরের দৈর্ঘ্য মান, তীরের মুখ দিক।",
  ],
  think: {
    scenario: "তুমি বাড়ি থেকে বেরিয়ে পূর্ব দিকে 300 m গেলে, তারপর উত্তর দিকে 400 m গিয়ে একটা দোকানে পৌঁছালে। কেনাকাটা শেষে ঠিক একই পথে বাড়ি ফিরে এলে।",
    points: [
      "দোকানে পৌঁছাতে তুমি কত পথ হেঁটেছ? আর বাড়ি থেকে দোকানের সরণ কত?",
      "বাড়ি ফিরে আসার পর তোমার মোট সরণ কত? কেন?",
      "পুরো যাত্রায় গড় দ্রুতি আর গড় বেগ কি সমান হবে? কখন সমান হতে পারত?",
      "দূরত্ব কি কখনো সরণের চেয়ে ছোট হতে পারে? পারলে কখন, না পারলে কেন?",
    ],
    hint: "সরণ শুধু শুরু আর শেষ বিন্দুর ওপর নির্ভর করে, পথের আকারের ওপর নয়। ফিরে এলে শুরু আর শেষ বিন্দু একই।",
    traps: [
      "বাড়ি ফিরে এলে দূরত্ব আর সরণ দুটোই শূন্য হয়।",
      "সরণ সব সময় দূরত্বের সমান।",
      "দ্রুতি আর বেগ একই রাশি।",
      "ভেক্টরের মান ঋণাত্মক হতে পারে।",
    ],
  },
  problems: [
    {
      level: "সহজ",
      q: "একজন লোক 6 m পশ্চিমে গিয়ে 8 m দক্ষিণে গেল। মোট দূরত্ব, সরণের মান এবং সরণ পশ্চিম থেকে কত কোণে, বের করো।",
      hint: "পশ্চিম আর দক্ষিণ লম্ব, তাই সরণে পিথাগোরাস।",
      steps: [
        { text: "দূরত্ব হলো পথের দৈর্ঘ্যের যোগফল।", tex: "s=6+8=14\\ \\text{m}" },
        { text: "দুই দিক লম্ব, তাই সরণে পিথাগোরাস খাটে।", tex: "d=\\sqrt{6^2+8^2}=\\sqrt{100}=10\\ \\text{m}" },
        { text: "কোণ বের করতে tan বসাই।", tex: "\\tan\\theta=\\frac{8}{6}\\Rightarrow\\theta=53.1^\\circ" },
        { text: "উত্তর: দূরত্ব 14 m, সরণ 10 m, সরণ পশ্চিম থেকে 53.1° দক্ষিণ দিকে। সরণ দূরত্বের চেয়ে ছোট।" },
      ],
    },
    {
      level: "মাঝারি",
      q: "একজন দৌড়বিদ 3 km পূর্বে, তারপর 4 km উত্তরে, তারপর 3 km পশ্চিমে দৌড়াল। মোট দূরত্ব ও সরণ কত?",
      hint: "পূর্ব-পশ্চিমের অংশ আর উত্তর-দক্ষিণের অংশ আলাদা করে মেলাও।",
      steps: [
        { text: "দূরত্ব হলো পথের দৈর্ঘ্যের যোগফল।", tex: "s=3+4+3=10\\ \\text{km}" },
        { text: "সরণের জন্য দুই দিক আলাদা মেলাই। পূর্বে 3 আর পশ্চিমে 3, কাটাকাটি হয়ে যায়।", tex: "x=3-3=0,\\quad y=4" },
        { text: "সরণের মান বের করি।", tex: "d=\\sqrt{0^2+4^2}=4\\ \\text{km}" },
        { text: "উত্তর: দূরত্ব 10 km, সরণ 4 km উত্তর দিকে।" },
      ],
    },
    {
      level: "কঠিন",
      q: "একটি গাড়ি 20 m ব্যাসার্ধের গোলাকার পথে ঠিক অর্ধেকটা ঘুরল। দূরত্ব ও সরণের মান কত? (π = 3.14)",
      hint: "অর্ধেক বৃত্তের শুরু আর শেষ বিন্দু ব্যাসের দুই মাথায়।",
      steps: [
        { text: "অর্ধেক বৃত্তের পথের দৈর্ঘ্যই দূরত্ব।", tex: "s=\\pi r=3.14\\times20=62.8\\ \\text{m}" },
        { text: "শুরু আর শেষ বিন্দু ব্যাসের দুই মাথায়। তাই সরণ ব্যাসের সমান।", tex: "d=2r=2\\times20=40\\ \\text{m}" },
        { text: "উত্তর: দূরত্ব 62.8 m, সরণ 40 m। সরণ ছোট, যেমন হওয়ার কথা।" },
      ],
    },
  ],
  concepts: [
    "দূরত্ব আর সরণ কোন অবস্থায় সমান হয়? কেন?",
    "একটা বস্তুর দ্রুতি ধ্রুব, কিন্তু বেগ বদলাচ্ছে। এমন একটা উদাহরণ ভাবো।",
    "তাপমাত্রা শুধু সংখ্যা, তাই স্কেলার। কিন্তু তড়িৎ প্রবাহের তো দিক আছে, তবু সে স্কেলার কেন?",
  ],
  quiz: [
    { q: "নিচের কোনটি ভেক্টর রাশি?", options: ["দ্রুতি", "ভর", "বেগ", "তাপমাত্রা"], answer: 2, why: "বেগের মান ও দিক দুটোই লাগে। দ্রুতি শুধু মান, তাই স্কেলার।" },
    { q: "3 মিটার পূর্বে, তারপর 4 মিটার উত্তরে গেলে সরণের মান কত?", options: ["7 m", "5 m", "1 m", "12 m"], answer: 1, why: "পিথাগোরাস: √(3² + 4²) = 5। 7 হলো দূরত্ব।" },
    { q: "একজন গোল মাঠ ঘুরে ঠিক যেখান থেকে শুরু করেছিল সেখানে ফিরে এল। তার সরণ কত?", options: ["মাঠের পরিধির সমান", "মাঠের ব্যাসের সমান", "শূন্য", "অসীম"], answer: 2, why: "সরণ শুধু শুরু আর শেষ বিন্দুর ওপর নির্ভর করে। দুটো এক বিন্দু হলে সরণ শূন্য।" },
    { q: "তড়িৎ প্রবাহের দিক আছে, তবুও এটি স্কেলার কেন?", options: ["কারণ এর মান নেই", "কারণ এটি ভেক্টর যোগের নিয়ম মানে না", "কারণ এর কোনো একক নেই", "কারণ এটি সব সময় ধনাত্মক"], answer: 1, why: "জংশনে দুই তার থেকে আসা প্রবাহ সাধারণ যোগ হয়, ত্রিভুজ বা সামান্তরিক সূত্রে নয়।" },
    { q: "6 m পশ্চিমে আর 8 m দক্ষিণে গেলে মোট দূরত্ব কত?", options: ["10 m", "14 m", "2 m", "48 m"], answer: 1, why: "দূরত্ব হলো পথের দৈর্ঘ্যের যোগফল, 6 + 8 = 14 m। 10 m হলো সরণ।" },
  ],
};

const pt = (x: number, y: number): Pt => ({ x, y });
const S0 = pt(270, 50);
const Wp = pt(150, 50);
const Ep = pt(150, 210);

const items = [
  { t: "ভর: 50 kg", dir: false, why: "ভর বোঝাতে শুধু সংখ্যাই যথেষ্ট।" },
  { t: "ঘরের তাপমাত্রা: 30°C", dir: false, why: "তাপমাত্রার কোনো দিক নেই।" },
  { t: "বাতাস: উত্তর দিকে 10 km/h", dir: true, why: "বাতাস কোন দিকে বইছে, সেটাও বলতে হয়।" },
  { t: "বল: নিচের দিকে 20 N", dir: true, why: "বলের দিক বদলালে ফলও বদলে যায়।" },
];

function Sorter({ sorts, onSort }: { sorts: Record<number, number>; onSort: (i: number, v: number) => void }) {
  return (
    <div className="guide-sort">
      {items.map((it, i) => {
        const v = sorts[i];
        const done = v !== undefined;
        const right = done && (v === 1) === it.dir;
        return (
          <div key={it.t} className="guide-sort-row">
            <p className="guide-sort-t">{it.t}</p>
            <div className="guide-sort-btns">
              {["শুধু মান", "মান ও দিক"].map((label, j) => {
                const cls = done && (j === 1) === it.dir ? " ok" : done && v === j ? " bad" : "";
                return (
                  <button key={label} type="button" disabled={done} className={`guide-opt${cls}`} onClick={() => onSort(i, j)}>
                    {label}
                  </button>
                );
              })}
            </div>
            {done ? (
              <p className="guide-explain" aria-live="polite">
                {right ? <Check size={18} aria-hidden /> : <X size={18} aria-hidden />}
                <span>{it.why}</span>
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function Anim() {
  const router = useRouter();
  const path = usePathname();
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [reveal, setRevealState] = useState<Record<number, number>>({});
  const [sorts, setSorts] = useState<Record<number, number>>({});

  const setPick = (i: number, v: number) => setPicks((p) => ({ ...p, [i]: v }));
  const setReveal = (i: number, n: number) => setRevealState((p) => ({ ...p, [i]: n }));
  const pick = (i: number) => (v: number) => setPick(i, v);
  const onSort = (i: number, v: number) => setSorts((s) => ({ ...s, [i]: v }));

  const compass = (
    <>
      <Lab p={pt(220, 22)} c="m">উত্তর</Lab>
      <Lab p={pt(220, 254)} c="m">দক্ষিণ</Lab>
      <Lab p={pt(22, 140)} c="m" anchor="start">পশ্চিম</Lab>
      <Lab p={pt(418, 140)} c="m" anchor="end">পূর্ব</Lab>
    </>
  );

  const raw: GuideStep[] = [
    {
      title: "বন্ধু কোথায়?",
      text: (
        <>
          বন্ধু ফোনে বলল, আমি তোমার থেকে <b>5 km</b> দূরে আছি। তাকে খুঁজে পেতে আর কী জানা দরকার?
        </>
      ),
      locked: picks[0] === undefined,
      prompt: <Choices options={["সময়", "দিক", "গতি"]} answer={1} picked={picks[0]} onPick={pick(0)} explain="5 km বললেও বন্ধু বৃত্তের যেকোনো জায়গায় থাকতে পারে। দিক বললে তবেই জায়গা ঠিক হয়।" />,
      figure: () => {
        const done = picks[0] !== undefined;
        const you = pt(220, 135);
        const friend = pol(you, 45, 90);
        return (
          <Stage w={440} h={260} label="বন্ধু তোমার থেকে 5 km দূরে, কিন্তু কোন দিকে?">
            {compass}
            <circle cx={you.x} cy={you.y} r={90} fill="none" strokeWidth={2} strokeDasharray="6 6" style={{ stroke: col.m }} />
            {[20, 70, 115, 160, 205, 250, 300, 340].map((d) => (
              <Lab key={d} p={pol(you, d, 90)} c="m" show={!done}>?</Lab>
            ))}
            <Vec a={you} b={done ? friend : you} c="r" w={4} show={done} />
            {done ? <Dot p={friend} c="r" r={7} /> : null}
            <Dot p={you} c="f" r={6} />
            <Lab p={add(you, 0, 24)}>তুমি</Lab>
            <Lab p={add(friend, 10, -10)} c="r" anchor="start" show={done}>5 km, উত্তর-পূর্বে</Lab>
          </Stage>
        );
      },
    },
    {
      title: "শুধু মান, নাকি দিকও?",
      text: "প্রতিটি জিনিস বোঝাতে কী লাগে, বেছে নাও।",
      locked: Object.keys(sorts).length < items.length,
      prompt: <Sorter sorts={sorts} onSort={onSort} />,
    },
    {
      title: "রহিমের হাঁটা: প্রথম পথ",
      text: (
        <>
          রহিম শুরুর বিন্দু থেকে <C k="p">6 m পশ্চিমে</C> হাঁটল।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        return (
          <Stage w={440} h={260} label="রহিম 6 m পশ্চিমে হাঁটছে">
            <Vec a={S0} b={on ? Wp : S0} c="p" w={4} />
            <Dot p={S0} c="f" r={6} />
            <Lab p={add(S0, 12, -8)} anchor="start">শুরু</Lab>
            <Lab p={add(mid(S0, Wp), 0, -12)} c="p" show={on}>6 m</Lab>
            <Lab p={pt(20, 246)} anchor="start" c="m">চলা পথ: {on ? "6" : "0"} m</Lab>
          </Stage>
        );
      },
    },
    {
      title: "দ্বিতীয় পথ",
      text: (
        <>
          তারপর <C k="q">8 m দক্ষিণে</C> হাঁটল। মোট হাঁটা পথ 6 + 8 = 14 m। একে বলে <b>দূরত্ব</b>।
        </>
      ),
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        return (
          <Stage w={440} h={260} label="রহিম 8 m দক্ষিণে হাঁটছে">
            <Vec a={S0} b={Wp} c="p" w={4} />
            <Vec a={Wp} b={on ? Ep : Wp} c="q" w={4} />
            <Dot p={S0} c="f" r={6} />
            <Lab p={add(S0, 12, -8)} anchor="start">শুরু</Lab>
            <Lab p={add(mid(S0, Wp), 0, -12)} c="p">6 m</Lab>
            <Lab p={add(mid(Wp, Ep), -12, 4)} c="q" anchor="end" show={on}>8 m</Lab>
            <Lab p={pt(20, 246)} anchor="start" c="m">চলা পথ: {on ? "14" : "6"} m</Lab>
          </Stage>
        );
      },
    },
    {
      title: "শুরু থেকে সোজা কত দূরে?",
      text: "রহিম এখন শেষ বিন্দুতে। শুরুর বিন্দু থেকে সোজা কত দূরে আছে?",
      locked: picks[4] === undefined,
      prompt: <Choices options={["14 m", "10 m", "2 m"]} answer={1} picked={picks[4]} onPick={pick(4)} explain="শুরু থেকে শেষ বিন্দুর সোজা তীরটাই সরণ। সমকোণী ত্রিভুজে পিথাগোরাস: √(6² + 8²) = 10 m।" />,
      figure: () => {
        const done = picks[4] !== undefined;
        return (
          <Stage w={440} h={260} label="শুরু থেকে শেষ বিন্দুর সোজা তীর">
            <Vec a={S0} b={Wp} c="p" w={4} />
            <Vec a={Wp} b={Ep} c="q" w={4} />
            <Vec a={S0} b={done ? Ep : S0} c="r" w={5} show={done} />
            <Square at={Wp} d1={{ x: 1, y: 0 }} d2={{ x: 0, y: 1 }} show={done} />
            <Dot p={S0} c="f" r={6} />
            <Lab p={add(S0, 12, -8)} anchor="start">শুরু</Lab>
            <Lab p={add(mid(S0, Wp), 0, -12)} c="p">6 m</Lab>
            <Lab p={add(mid(Wp, Ep), -12, 4)} c="q" anchor="end">8 m</Lab>
            <Lab p={add(mid(S0, Ep), 16, 0)} c="r" anchor="start" show={done}>সরণ = 10 m</Lab>
          </Stage>
        );
      },
    },
    {
      title: "ঘুরে এলে",
      text: "এবার রহিম একই পথে ফিরে এল। সে মোট 28 m হেঁটেছে। শুরুর বিন্দু থেকে তার সরণ এখন কত?",
      locked: picks[5] === undefined,
      prompt: <Choices options={["28 m", "14 m", "0"]} answer={2} picked={picks[5]} onPick={pick(5)} explain="সরণ শুধু শুরু আর শেষ বিন্দুর ওপর নির্ভর করে। দুটো একই বিন্দু, তাই সরণ 0। কিন্তু দূরত্ব 28 m।" />,
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        const done = picks[5] !== undefined;
        return (
          <Stage w={440} h={260} label="রহিম একই পথে ফিরে এল">
            <Vec a={S0} b={Wp} c="p" w={4} />
            <Vec a={Wp} b={Ep} c="q" w={4} />
            <Seg a={pt(Ep.x + 9, Ep.y)} b={pt(Wp.x + 9, on ? Wp.y : Ep.y)} dash c="m" w={2.5} />
            <Seg a={pt(Wp.x + 9, Wp.y + 9)} b={on ? pt(S0.x, S0.y + 9) : pt(Wp.x + 9, Wp.y + 9)} dash c="m" w={2.5} />
            {done ? <circle cx={S0.x} cy={S0.y} r={16} fill="none" strokeWidth={3} style={{ stroke: col.r }} /> : null}
            <Dot p={S0} c="f" r={6} />
            <Lab p={add(S0, 24, -8)} anchor="start">শুরু</Lab>
            <Lab p={pt(20, 246)} anchor="start" c="m">মোট পথ: {on ? "28" : "14"} m</Lab>
            <Lab p={add(S0, 24, 22)} c="r" anchor="start" show={done}>সরণ = 0</Lab>
          </Stage>
        );
      },
    },
    {
      title: "ভেক্টরকে তীর দিয়ে আঁকি",
      text: (
        <>
          তীরের <b>দৈর্ঘ্য</b> হলো মান, তীরের <b>মুখ</b> হলো দিক। মান কখনো ঋণাত্মক হয় না। উল্টো দিক বোঝাতে A-এর আগে ঋণ চিহ্ন বসাই: −A।
        </>
      ),
      tex: ["|\\vec A|\\ge0"],
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        return (
          <Stage w={440} h={260} label="ভেক্টর A আর তার উল্টো −A">
            <Vec a={pt(110, 100)} b={pt(330, 100)} c="p" w={5} />
            <Lab p={pt(220, 80)} c="p">A, মান = 5</Lab>
            <Vec a={pt(330, 180)} b={on ? pt(110, 180) : pt(330, 180)} c="q" w={5} dash show={on} />
            <Lab p={pt(220, 206)} c="q" show={on}>−A, মান একই, দিক উল্টো</Lab>
          </Stage>
        );
      },
    },
    {
      title: "সরণ কোন দিকে?",
      text: "রহিমের সরণ পশ্চিম থেকে কত কোণে দক্ষিণের দিকে হেলে আছে? ত্রিভুজ থেকে tan বের করি।",
      tex: ["\\tan\\theta=\\dfrac{8}{6}\\Rightarrow\\theta=53.1^\\circ"],
      replay: true,
      figure: (phase) => {
        const on = phase === 1;
        return (
          <Stage w={440} h={260} label="সরণের কোণ">
            <Vec a={S0} b={Wp} c="p" w={4} />
            <Vec a={Wp} b={Ep} c="q" w={4} />
            <Vec a={S0} b={Ep} c="r" w={5} />
            <Arc o={S0} r={40} from={180} to={233.1} c="f" w={1.5} show={on} />
            <Lab p={pol(S0, 206.5, 62)} show={on}>θ = 53.1°</Lab>
            <Lab p={add(mid(S0, Wp), 0, -12)} c="p">6</Lab>
            <Lab p={add(mid(Wp, Ep), -12, 4)} c="q" anchor="end">8</Lab>
            <Lab p={add(mid(S0, Ep), 16, 0)} c="r" anchor="start">10</Lab>
            <Dot p={S0} c="f" r={6} />
          </Stage>
        );
      },
    },
  ];

  const concept: GuideStep[] = raw.map((s) => ({ ...s, tag: "দেখো" }));

  const tail = tailSteps({
    meta,
    base: concept.length,
    picks,
    setPick,
    reveal,
    setReveal,
    summary: [
      {
        title: "দুটি জিনিস মনে রাখো",
        text: "স্কেলার শুধু মান, ভেক্টর মান আর দিক। দূরত্ব স্কেলার, সরণ ভেক্টর। সরণ কখনো দূরত্বের চেয়ে বেশি হয় না।",
        tex: ["d=\\sqrt{x^2+y^2}", "\\tan\\theta=\\dfrac{y}{x}"],
      },
    ],
  });

  const all = [...concept, ...tail];
  useFinishMark(step === all.length - 1);

  const chapterHref = `/${path.split("/").filter(Boolean).slice(0, 3).join("/")}`;

  return <Guide steps={all} step={step} onStep={setStep} onFinish={() => router.push(chapterHref)} />;
}
