"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { Tex } from "@/components/ui/Tex";
import { col, type Pt } from "@/components/anim/kit";
import { Guide, type GuideStep } from "@/components/lesson/Guide";
import type { ExampleStep, LessonMeta } from "@/lessons/types";
import { lessonKey } from "@/lib/lesson-key";
import { markDone } from "@/lib/progress";
import { pushDone } from "@/lib/progress-remote";

const tone = { p: col.p, q: col.q, r: col.r };

export const pt = (x: number, y: number): Pt => ({ x, y });

export function C({ k, children }: { k: "p" | "q" | "r"; children: ReactNode }) {
  return <b style={{ color: tone[k], fontWeight: 800 }}>{children}</b>;
}

export function Choices({
  options,
  answer,
  picked,
  onPick,
  explain,
}: {
  options: string[];
  answer: number;
  picked: number | undefined;
  onPick: (i: number) => void;
  explain: string;
}) {
  const shown = picked !== undefined;
  return (
    <div className="guide-opts">
      {options.map((o, i) => {
        const cls = shown && i === answer ? " ok" : shown && picked === i ? " bad" : "";
        return (
          <button key={o} type="button" className={`guide-opt${cls}`} disabled={shown} onClick={() => onPick(i)}>
            {o}
          </button>
        );
      })}
      {shown ? (
        <p className="guide-explain" aria-live="polite">
          {picked === answer ? <Check size={18} aria-hidden /> : <X size={18} aria-hidden />}
          <span>
            <b>{picked === answer ? "ঠিক। " : `সঠিক উত্তর: ${options[answer]}। `}</b>
            {explain}
          </span>
        </p>
      ) : null}
    </div>
  );
}

export function Play({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
  chips,
  read,
  note,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
  chips?: number[];
  read?: ReactNode;
  note?: string;
}) {
  return (
    <div className="guide-play">
      <label className="guide-range-l">
        <span>{label}</span>
        <input className="guide-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
        <b>
          {value}
          {suffix}
        </b>
      </label>
      {chips ? (
        <div className="guide-chips">
          {chips.map((v) => (
            <button key={v} type="button" className={`guide-chip${value === v ? " on" : ""}`} onClick={() => onChange(v)}>
              {v}
              {suffix}
            </button>
          ))}
        </div>
      ) : null}
      {read ? <div className="guide-read">{read}</div> : null}
      {note ? <p className="guide-note">{note}</p> : null}
    </div>
  );
}

export function Reveal({ steps, hint, shown, onShow }: { steps: ExampleStep[]; hint?: string; shown: number; onShow: (n: number) => void }) {
  return (
    <div className="guide-reveal">
      {hint ? (
        <details className="soft">
          <summary>ইঙ্গিত দেখো</summary>
          <p>{hint}</p>
        </details>
      ) : null}
      {shown > 0 ? (
        <ol className="guide-sol">
          {steps.slice(0, shown).map((s, i) => (
            <li key={s.text}>
              <span className="step-num">{i + 1}</span>
              <div>
                <p>{s.text}</p>
                {s.tex ? (
                  <div className="guide-tex">
                    <Tex display>{s.tex}</Tex>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
      {shown < steps.length ? (
        <button type="button" className="btn btn-ghost" onClick={() => onShow(shown + 1)}>
          {shown === 0 ? "নিজে চেষ্টা করো, তারপর প্রথম ধাপ দেখাও" : `পরের ধাপ দেখাও (${shown}/${steps.length})`}
        </button>
      ) : null}
    </div>
  );
}

export function useFinishMark(active: boolean) {
  const path = usePathname();
  useEffect(() => {
    if (!active) return;
    const parts = path.split("/").filter(Boolean);
    if (parts.length !== 4) return;
    const key = lessonKey(parts[0], parts[1], parts[2], parts[3]);
    markDone(key);
    pushDone(key, true);
  }, [active, path]);
}

export type SummaryItem = { title: string; text: ReactNode; tex: string[] };

type Ctx = {
  meta: LessonMeta;
  base: number;
  picks: Record<number, number>;
  setPick: (i: number, v: number) => void;
  reveal: Record<number, number>;
  setReveal: (i: number, n: number) => void;
  summary: SummaryItem[];
  limit?: number;
};

export function tailSteps({ meta, base, picks, setPick, reveal, setReveal, summary, limit = 5 }: Ctx): GuideStep[] {
  const out: GuideStep[] = [];
  const at = () => base + out.length;

  summary.forEach((s) => out.push({ tag: "সারকথা", title: s.title, text: s.text, tex: s.tex }));

  if (meta.think) {
    out.push({
      tag: "ভাবো",
      title: "এবার তুমি ভাবো",
      text: meta.think.scenario,
      prompt: (
        <div className="guide-think">
          <ol className="guide-list">
            {meta.think.points.slice(0, 2).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
          {meta.think.hint ? (
            <details className="soft">
              <summary>ইঙ্গিত দেখো</summary>
              <p>{meta.think.hint}</p>
            </details>
          ) : null}
        </div>
      ),
    });
  }

  const quiz = meta.quiz.slice(0, limit);
  const quizStart = at();
  quiz.forEach((it, n) => {
    const idx = at();
    out.push({
      tag: `কুইজ ${n + 1}/${quiz.length}`,
      title: `প্রশ্ন ${n + 1}`,
      text: it.q,
      locked: picks[idx] === undefined,
      prompt: <Choices options={it.options} answer={it.answer} picked={picks[idx]} onPick={(v) => setPick(idx, v)} explain={it.why} />,
    });
  });

  const problems = meta.problems ?? [];
  problems.forEach((pr, n) => {
    const idx = at();
    out.push({
      tag: `অঙ্ক ${n + 1}/${problems.length}`,
      title: pr.level,
      text: pr.q,
      prompt: <Reveal steps={pr.steps} hint={pr.hint} shown={reveal[idx] ?? 0} onShow={(v) => setReveal(idx, v)} />,
    });
  });

  const score = quiz.reduce((s, it, n) => s + (picks[quizStart + n] === it.answer ? 1 : 0), 0);
  out.push({
    tag: "শেষ",
    title: "পাঠ শেষ",
    text: quiz.length > 0 ? `কুইজে তোমার স্কোর ${score} / ${quiz.length}।` : "পাঠটি সম্পূর্ণ হয়েছে।",
    prompt:
      meta.recap && meta.recap.length > 0 ? (
        <div className="guide-think">
          <p className="guide-sub">আজ যা শিখলে</p>
          <ul className="guide-list bullets">
            {meta.recap.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      ) : undefined,
  });

  return out;
}

export type GuideCtx = { picks: Record<number, number>; pick: (i: number) => (v: number) => void };
export type Built = { concept: GuideStep[]; summary: SummaryItem[] };

export function GuidedLesson({ meta, build, limit }: { meta: LessonMeta; build: (g: GuideCtx) => Built; limit?: number }) {
  const router = useRouter();
  const path = usePathname();
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [reveal, setRevealState] = useState<Record<number, number>>({});

  const setPick = (i: number, v: number) => setPicks((p) => ({ ...p, [i]: v }));
  const setReveal = (i: number, n: number) => setRevealState((p) => ({ ...p, [i]: n }));

  const built = build({ picks, pick: (i) => (v) => setPick(i, v) });
  const concept = built.concept.map((s) => ({ ...s, tag: s.tag ?? "দেখো" }));
  const tail = tailSteps({ meta, base: concept.length, picks, setPick, reveal, setReveal, summary: built.summary, limit });
  const all: GuideStep[] = [...concept, ...tail];

  useFinishMark(step === all.length - 1);

  const chapterHref = `/${path.split("/").filter(Boolean).slice(0, 3).join("/")}`;

  return <Guide steps={all} step={step} onStep={setStep} onFinish={() => router.push(chapterHref)} />;
}
