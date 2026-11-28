"use client";

import { useState, type CSSProperties } from "react";

const W = 600;
const H = 250;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 34;
const DAYS = 30;
const REVIEWS = [1, 3, 7, 14];

const px = (d: number) => PAD_L + (d / DAYS) * (W - PAD_L - PAD_R);
const py = (r: number) => PAD_T + (1 - r) * (H - PAD_T - PAD_B);

function plain(): string {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const d = (i / 120) * DAYS;
    pts.push(`${i === 0 ? "M" : "L"}${px(d).toFixed(1)},${py(Math.exp(-d / 2)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function spaced(): string {
  const marks = [0, ...REVIEWS, DAYS];
  const out: string[] = [];
  for (let k = 0; k < marks.length - 1; k++) {
    const s = 2 * Math.pow(2.6, k);
    const a = marks[k];
    const b = marks[k + 1];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const d = a + ((b - a) * i) / steps;
      const r = Math.exp(-(d - a) / s);
      out.push(`${out.length === 0 || i === 0 ? "M" : "L"}${px(d).toFixed(1)},${py(r).toFixed(1)}`);
    }
  }
  return out.join(" ");
}

const schedule = ["আজ", "কাল", "3 দিন পর", "1 সপ্তাহ পর", "1 মাস পর"];

const card: CSSProperties = {
  borderRadius: 22,
  padding: "22px 22px 24px",
  color: "#141a2b",
  boxShadow: "6px 6px 0 rgba(10,14,26,0.55)",
};

export default function RememberSection() {
  const [on, setOn] = useState(true);

  return (
    <section
      aria-labelledby="remember-title"
      style={{ padding: "72px 20px", background: "#141c30", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "#ff8a66", fontWeight: 700, fontSize: 14, margin: 0, letterSpacing: 0.4 }}>পড়া মনে রাখার বিজ্ঞান</p>
        <h2 id="remember-title" style={{ textAlign: "center", color: "#eef2ff", fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.25, margin: "10px 0 12px" }}>
          কেন আমরা পড়া ভুলে যাই, আর কীভাবে ঠেকানো যায়
        </h2>
        <p style={{ textAlign: "center", color: "#aab4d0", maxWidth: 640, margin: "0 auto 36px", fontSize: 17, lineHeight: 1.7 }}>
          ভুলে যাওয়া তোমার দোষ নয়, মস্তিষ্ক এভাবেই কাজ করে। কিন্তু তিনটি সহজ কৌশলে একই পড়া অনেক বেশিদিন মনে থাকে।
        </p>

        <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
          <article style={{ ...card, background: "#9dbdff" }}>
            <div style={{ fontWeight: 800, fontSize: 14, opacity: 0.7 }}>1. ভুলে যাওয়ার বক্ররেখা</div>
            <h3 style={{ margin: "6px 0 10px", fontSize: 21, lineHeight: 1.35 }}>প্রথম দিনেই সবচেয়ে বেশি হারায়</h3>
            <p style={{ margin: 0, lineHeight: 1.75, fontSize: 16 }}>
              1885 সালে হারম্যান এবিংহাউস দেখালেন, নতুন শেখা জিনিস প্রথম কয়েক ঘণ্টা আর প্রথম দিনেই সবচেয়ে দ্রুত হারিয়ে যায়। তারপর ভুলে যাওয়ার গতি ধীর হয়ে আসে।
            </p>
          </article>

          <article style={{ ...card, background: "#ffd66b" }}>
            <div style={{ fontWeight: 800, fontSize: 14, opacity: 0.7 }}>2. সঠিক সময়ে রিভিউ</div>
            <h3 style={{ margin: "6px 0 10px", fontSize: 21, lineHeight: 1.35 }}>ভুলে যাওয়ার ঠিক আগে মনে করো</h3>
            <p style={{ margin: "0 0 12px", lineHeight: 1.75, fontSize: 16 }}>
              ভুলে যাওয়ার আগে একবার মনে করতে পারলে স্মৃতি অনেক বেশি টেকে। তাই একদিনে দশবার না পড়ে ব্যবধান বাড়িয়ে রিভিউ করো। একে বলে spaced repetition।
            </p>
            <ol style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
              {schedule.map((s, i) => (
                <li key={s} style={{ background: "#141a2b", color: "#ffd66b", borderRadius: 999, padding: "6px 12px", fontSize: 14, fontWeight: 700 }}>
                  {i + 1}. {s}
                </li>
              ))}
            </ol>
          </article>

          <article style={{ ...card, background: "#7fdcb4" }}>
            <div style={{ fontWeight: 800, fontSize: 14, opacity: 0.7 }}>3. মনে করার চেষ্টা</div>
            <h3 style={{ margin: "6px 0 10px", fontSize: 21, lineHeight: 1.35 }}>আবার পড়া নয়, নিজেকে প্রশ্ন করো</h3>
            <p style={{ margin: "0 0 12px", lineHeight: 1.75, fontSize: 16 }}>
              খাতা বন্ধ করে নিজেকে প্রশ্ন করা (retrieval practice) বারবার চোখ বুলানোর চেয়ে অনেক বেশি কার্যকর। রিরিড করলে সব চেনা চেনা লাগে, কিন্তু ওটা শুধু পরিচিতির অনুভূতি, শেখা নয়।
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, fontSize: 15, background: "rgba(20,26,43,0.12)", borderRadius: 12, padding: "10px 12px" }}>
              AnimiSci এর প্রতিটি পাঠে তাই উত্তর দেখার আগে তোমাকে নিজে ভাবতে হয়।
            </p>
          </article>
        </div>

        <div style={{ marginTop: 30, background: "#101727", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: "20px 18px 14px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ color: "#eef2ff", fontWeight: 800, fontSize: 18 }}>নিজে দেখো: রিভিউ করলে কী বদলায়?</div>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => setOn((v) => !v)}
              style={{ background: on ? "#ff6b4a" : "#2a3350", color: on ? "#141a2b" : "#eef2ff", border: 0, borderRadius: 999, padding: "9px 16px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}
            >
              {on ? "রিভিউ চালু" : "রিভিউ বন্ধ"}
            </button>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="ভুলে যাওয়ার বক্ররেখা: রিভিউ না করলে স্মৃতি দ্রুত নামে, রিভিউ করলে প্রতিবার ঢাল কমে" style={{ width: "100%", height: "auto", display: "block" }}>
            {[0, 0.25, 0.5, 0.75, 1].map((r) => (
              <g key={r}>
                <line x1={PAD_L} x2={W - PAD_R} y1={py(r)} y2={py(r)} stroke="rgba(255,255,255,0.08)" />
                <text x={PAD_L - 8} y={py(r) + 4} textAnchor="end" fontSize="12" fill="#8f9bbd">{Math.round(r * 100)}%</text>
              </g>
            ))}
            {[0, 7, 14, 21, 28].map((d) => (
              <text key={d} x={px(d)} y={H - 10} textAnchor="middle" fontSize="12" fill="#8f9bbd">{d} দিন</text>
            ))}
            <path d={plain()} fill="none" stroke={on ? "rgba(255,138,102,0.45)" : "#ff8a66"} strokeWidth={on ? 2 : 3.5} strokeLinecap="round" style={{ transition: "all 0.4s ease" }} />
            {on && (
              <>
                <path d={spaced()} fill="none" stroke="#7fdcb4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {REVIEWS.map((d) => (
                  <g key={d}>
                    <circle cx={px(d)} cy={py(1)} r="5" fill="#ffd66b" stroke="#141a2b" strokeWidth="2" />
                    <text x={px(d)} y={py(1) - 10} textAnchor="middle" fontSize="12" fill="#ffd66b">রিভিউ</text>
                  </g>
                ))}
              </>
            )}
          </svg>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, color: "#aab4d0", fontSize: 14, padding: "4px 6px 0" }}>
            <span><span style={{ color: "#ff8a66" }}>●</span> রিভিউ ছাড়া: দ্রুত নামে</span>
            {on && <span><span style={{ color: "#7fdcb4" }}>●</span> ব্যবধান বাড়িয়ে রিভিউ: প্রতিবার ঢাল কমে</span>}
          </div>
          <p style={{ color: "#7d89ab", fontSize: 13, margin: "8px 6px 0" }}>চিত্রটি ধারণা বোঝানোর জন্য আঁকা, প্রকৃত মান মানুষভেদে আলাদা।</p>
        </div>
      </div>
    </section>
  );
}
