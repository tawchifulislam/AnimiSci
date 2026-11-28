"use client";

import { useState, type CSSProperties } from "react";

const W = 640;
const H = 320;
const L = 50;
const R = 18;
const T = 34;
const B = 50;
const DAYS = 30;
const REVIEWS = [1, 3, 7, 14];
const TICKS = [0, 1, 3, 7, 14, 30];

const px = (d: number) => L + Math.sqrt(d / DAYS) * (W - L - R);
const py = (r: number) => T + (1 - r) * (H - T - B);

type Run = { line: string; area: string; end: number };

function build(n: number): Run {
  const marks = [0, ...REVIEWS.slice(0, n), DAYS];
  const steps = 60;
  let line = `M${px(0).toFixed(1)},${py(1).toFixed(1)}`;
  let end = 1;
  for (let k = 0; k < marks.length - 1; k++) {
    const a = marks[k];
    const b = marks[k + 1];
    const s = 1.5 * Math.pow(2.6, k);
    for (let i = 1; i <= steps; i++) {
      const x = a + ((b - a) * i) / steps;
      end = Math.exp(-(x - a) / s);
      line += ` L${px(x).toFixed(1)},${py(end).toFixed(1)}`;
    }
    if (k < marks.length - 2) line += ` L${px(b).toFixed(1)},${py(1).toFixed(1)}`;
  }
  const area = `${line} L${px(DAYS).toFixed(1)},${py(0).toFixed(1)} L${px(0).toFixed(1)},${py(0).toFixed(1)} Z`;
  return { line, area, end };
}

const RUNS = [0, 1, 2, 3, 4].map(build);

const schedule = ["আজ", "কাল", "3 দিন পর", "1 সপ্তাহ পর", "1 মাস পর"];

const card: CSSProperties = {
  borderRadius: 22,
  padding: "24px 24px 26px",
  color: "#141a2b",
  boxShadow: "6px 6px 0 rgba(10,14,26,0.55)",
};

const kicker: CSSProperties = { fontWeight: 800, fontSize: 13, opacity: 0.65, letterSpacing: 0.3 };
const head: CSSProperties = { margin: "8px 0 12px", fontSize: 22, lineHeight: 1.35 };
const body: CSSProperties = { margin: 0, lineHeight: 1.8, fontSize: 16 };

export default function RememberSection() {
  const [n, setN] = useState(2);
  const run = RUNS[n];
  const main = n === 0 ? "#ff8a66" : "#7fdcb4";
  const left = Math.round(run.end * 100);

  return (
    <section
      aria-labelledby="remember-title"
      style={{ padding: "76px 20px 84px", background: "#141c30", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <style>{`@keyframes rm-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}@keyframes rm-fade{from{opacity:0}to{opacity:1}}@media (prefers-reduced-motion: reduce){.rm-anim{animation:none!important}}`}</style>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "#ff8a66", fontWeight: 700, fontSize: 14, margin: 0, letterSpacing: 0.4 }}>একটা সত্যি কথা</p>
        <h2 id="remember-title" style={{ textAlign: "center", color: "#eef2ff", fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.3, margin: "10px 0 14px" }}>
          পড়েছিলে, তবু মাথা থেকে উধাও?
          <br />
          দোষটা তোমার না।
        </h2>
        <p style={{ textAlign: "center", color: "#aab4d0", maxWidth: 620, margin: "0 auto 40px", fontSize: 17, lineHeight: 1.8 }}>
          মস্তিষ্ক নতুন জিনিস আগে অস্থায়ীভাবে জমা রাখে, দরকার নেই মনে হলে ফেলে দেয়। তিনটা ছোট অভ্যাসে তাকে বোঝানো যায়, এটা দরকারি।
        </p>

        <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
          <article style={{ ...card, background: "#9dbdff" }}>
            <div style={kicker}>প্রথম কথা</div>
            <h3 style={head}>প্রথম দিনেই সবচেয়ে বেশি হারায়</h3>
            <p style={body}>
              1885 সালে হারম্যান এবিংহাউস নিজের ওপর পরীক্ষা চালিয়ে দেখলেন, নতুন শেখা জিনিস প্রথম কয়েক ঘণ্টায় আর প্রথম দিনে সবচেয়ে তাড়াতাড়ি হারিয়ে যায়। তারপর হারানোর গতি ধীরে ধীরে কমে। মানে, শেখার পরের একটা দিনই আসল লড়াই।
            </p>
          </article>

          <article style={{ ...card, background: "#ffd66b" }}>
            <div style={kicker}>দ্বিতীয় কথা</div>
            <h3 style={head}>ভোলার আগেই একবার ঝালিয়ে নাও</h3>
            <p style={{ ...body, marginBottom: 14 }}>
              একদিনে দশবার না পড়ে ব্যবধান বাড়িয়ে ঝালাও। ভুলে যাওয়ার ঠিক আগে মনে করতে পারলে স্মৃতি অনেক বেশিদিন টেকে। এই কৌশলের নাম spaced repetition।
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 8px" }}>
              {schedule.map((s, i) => (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ background: "#141a2b", color: "#ffd66b", borderRadius: 999, padding: "5px 12px", fontSize: 14, fontWeight: 700 }}>{s}</span>
                  {i < schedule.length - 1 && <span aria-hidden style={{ opacity: 0.5, fontWeight: 800 }}>›</span>}
                </span>
              ))}
            </div>
          </article>

          <article style={{ ...card, background: "#7fdcb4" }}>
            <div style={kicker}>তৃতীয় কথা</div>
            <h3 style={head}>আবার পড়া নয়, মনে করার চেষ্টা</h3>
            <p style={{ ...body, marginBottom: 12 }}>
              খাতা বন্ধ করো, তারপর নিজেকে প্রশ্ন করো। একে বলে retrieval practice। বারবার চোখ বুলানোর চেয়ে এটা অনেক বেশি কাজে লাগে। আবার পড়লে সবকিছু চেনা চেনা লাগে, আর সেই চেনা লাগাটাকেই আমরা শেখা ভেবে ভুল করি।
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, fontSize: 15, background: "rgba(20,26,43,0.12)", borderRadius: 12, padding: "10px 14px" }}>
              তাই AnimiSci এ উত্তর দেখার আগে তুমি নিজে ভাবো।
            </p>
          </article>
        </div>

        <div style={{ marginTop: 34, background: "#101727", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "26px 22px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ color: "#eef2ff", fontWeight: 800, fontSize: 20 }}>নিজের হাতে দেখো</div>
            <div style={{ color: "#8f9bbd", fontSize: 15, marginTop: 4 }}>কতবার ঝালাবে? বোতামে চাপ দাও, দেখো ঢাল কেমন চ্যাপ্টা হয়।</div>
          </div>

          <div role="group" aria-label="রিভিউয়ের সংখ্যা" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 18 }}>
            {[0, 1, 2, 3, 4].map((v) => {
              const active = v === n;
              return (
                <button
                  key={v}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setN(v)}
                  style={{
                    background: active ? (v === 0 ? "#ff8a66" : "#7fdcb4") : "#1b2540",
                    color: active ? "#141a2b" : "#c7d0ea",
                    border: 0,
                    borderRadius: 999,
                    padding: "9px 18px",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "background 0.2s ease, transform 0.2s ease",
                    transform: active ? "translateY(-1px)" : "none",
                  }}
                >
                  {v === 0 ? "রিভিউ ছাড়া" : `${v} বার`}
                </button>
              );
            })}
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`শেখার 30 দিন পর রিভিউ ছাড়া প্রায় 0 শতাংশ, ${n} বার রিভিউ করলে প্রায় ${left} শতাংশ মনে থাকে`} style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <linearGradient id="rm-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={main} stopOpacity="0.32" />
                <stop offset="100%" stopColor={main} stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 0.5, 1].map((r) => (
              <g key={r}>
                <line x1={L} x2={W - R} y1={py(r)} y2={py(r)} stroke="rgba(255,255,255,0.08)" strokeDasharray={r === 0 ? undefined : "3 6"} />
                <text x={L - 10} y={py(r) + 4} textAnchor="end" fontSize="12" fill="#7d89ab">{Math.round(r * 100)}%</text>
              </g>
            ))}

            {TICKS.map((d) => (
              <text key={d} x={px(d)} y={H - 26} textAnchor="middle" fontSize="12" fill="#7d89ab">{d === 0 ? "আজ" : d === DAYS ? "30 দিন" : d}</text>
            ))}
            <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" fontSize="12" fill="#5f6b8c">শেখার পর কত দিন গেছে</text>

            {REVIEWS.slice(0, n).map((d) => (
              <line key={d} x1={px(d)} x2={px(d)} y1={py(1)} y2={py(0)} stroke="rgba(255,214,107,0.18)" strokeDasharray="2 5" />
            ))}

            {n > 0 && <path d={RUNS[0].line} fill="none" stroke="#ff8a66" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />}

            <g key={n}>
              <path className="rm-anim" d={run.area} fill="url(#rm-fill)" stroke="none" style={{ animation: "rm-fade 0.6s ease both" }} />
              <path
                className="rm-anim"
                d={run.line}
                fill="none"
                stroke={main}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={0}
                style={{ animation: "rm-draw 0.9s ease-out both" }}
              />
              {REVIEWS.slice(0, n).map((d, i) => (
                <g key={d}>
                  <circle cx={px(d)} cy={py(1)} r="11" fill="#ffd66b" stroke="#101727" strokeWidth="3" />
                  <text x={px(d)} y={py(1)} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="800" fill="#141a2b">{i + 1}</text>
                </g>
              ))}
            </g>
          </svg>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 14 }}>
            <div style={{ background: "rgba(255,138,102,0.12)", color: "#ffb39d", borderRadius: 14, padding: "10px 16px", fontSize: 15 }}>
              রিভিউ ছাড়া, 30 দিন পর: <b style={{ fontSize: 18 }}>{Math.round(RUNS[0].end * 100)}%</b>
            </div>
            <div style={{ background: "rgba(127,220,180,0.12)", color: "#a5ecc9", borderRadius: 14, padding: "10px 16px", fontSize: 15, transition: "opacity 0.2s ease", opacity: n === 0 ? 0.45 : 1 }}>
              {n === 0 ? "রিভিউ করলে" : `${n} বার রিভিউ করলে`}, 30 দিন পর: <b style={{ fontSize: 18 }}>{left}%</b>
            </div>
          </div>
          <p style={{ color: "#6d7a9d", fontSize: 13, textAlign: "center", margin: "12px 0 0" }}>ধারণা বোঝানোর ছবি। আসল মান মানুষভেদে আলাদা।</p>
        </div>
      </div>
    </section>
  );
}
