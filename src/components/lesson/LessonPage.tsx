"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { LessonToc } from "@/components/lesson/LessonToc";
import { ReadingProgress } from "@/components/lesson/ReadingProgress";
import {
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  HourglassIcon,
  LightbulbIcon,
  TargetIcon,
} from "@/components/ui/icons";
import { Quiz } from "@/components/ui/Quiz";
import { Tex } from "@/components/ui/Tex";
import { getChapter } from "@/data/chapters";
import { getPaper, getSubject } from "@/data/subjects";
import { lessonRegistry } from "@/lessons/registry";
import { lessonKey } from "@/lib/lesson-key";
import { markDone, setLast, toggleDone, useProgress } from "@/lib/progress";
import { bn } from "@/lib/vec";

function Block({ id, n, title, hint, children }: { id: string; n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <section id={id} className="part">
      <div className="part-head">
        <span className="part-num">{bn(n)}</span>
        <div>
          <h2>{title}</h2>
          {hint ? <p>{hint}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function LessonPage({ subject, paper, chapter, slug }: { subject: string; paper: string; chapter: string; slug: string }) {
  const key = lessonKey(subject, paper, chapter, slug);
  const { done } = useProgress();
  const isDone = Boolean(done[key]);

  useEffect(() => {
    setLast(key);
  }, [key]);

  const s = getSubject(subject);
  const p = getPaper(paper);
  const c = getChapter(subject, paper, chapter);
  const entry = lessonRegistry[chapter]?.[slug];
  if (!s || !p || !c || !entry) return null;

  const lessons = c.lessons;
  const i = lessons.findIndex((l) => l.slug === slug);
  if (i < 0) return null;

  const info = lessons[i];
  const prev = i > 0 ? lessons[i - 1] : null;
  const next = i < lessons.length - 1 ? lessons[i + 1] : null;
  const chapterHref = `/${s.slug}/${p.slug}/${c.slug}`;
  const { meta } = entry;
  const Anim = entry.default;
  const stub = !meta.goal && !meta.hook && meta.formulas.length === 0 && meta.example.steps.length === 0 && meta.quiz.length === 0;

  const has = {
    formulas: meta.formulas.length > 0,
    example: meta.example.steps.length > 0,
    mistakes: meta.mistakes.length > 0,
    recap: Boolean(meta.recap && meta.recap.length > 0),
    quiz: meta.quiz.length > 0,
  };
  const order = ["animation", has.formulas && "formulas", has.example && "example", has.mistakes && "mistakes", has.recap && "recap", has.quiz && "quiz"].filter(
    (x): x is string => typeof x === "string",
  );
  const num = (id: string) => order.indexOf(id) + 1;
  const labels: Record<string, string> = { animation: "দেখো", formulas: "সূত্র", example: "অঙ্ক", mistakes: "ভুল", recap: "সারকথা", quiz: "কুইজ" };
  const toc = order.map((id) => ({ id, label: labels[id] }));

  return (
    <>
      <ReadingProgress />
      <div className="shell page">
        <div className="lesson">
          <div className="lesson-head">
            <Breadcrumb
              items={[
                { label: s.name, href: `/${s.slug}` },
                { label: p.name, href: `/${s.slug}/${p.slug}` },
                { label: c.name, href: chapterHref },
                { label: info.title },
              ]}
            />
            <p className="eyebrow">
              পাঠ {bn(i + 1)} / {bn(lessons.length)}
            </p>
            <h1 className="lesson-title">{info.title}</h1>
            <p className="lesson-meta">
              <span>
                <ClockIcon size={17} /> প্রায় {bn(info.minutes)} মিনিট
              </span>
              {isDone ? (
                <span className="done">
                  <CheckCircleIcon size={17} weight="fill" /> শেষ হয়েছে
                </span>
              ) : null}
            </p>
          </div>

          {stub ? (
            <div className="card soon">
              <span className="soon-icon">
                <HourglassIcon size={30} weight="duotone" />
              </span>
              <h2 style={{ fontSize: "1.3rem" }}>এই পাঠ তৈরি হচ্ছে</h2>
              <p className="muted">অ্যানিমেশন, সূত্র, অঙ্ক ও কুইজ নিয়ে পাঠটি শীঘ্রই আসছে।</p>
            </div>
          ) : (
            <>
              <LessonToc items={toc} />

              <div className="intro-grid">
                <div className="card intro-card">
                  <h2>
                    <TargetIcon size={22} weight="duotone" /> এই পাঠে যা শিখবে
                  </h2>
                  <p>{meta.goal}</p>
                </div>
                <div className="card intro-card">
                  <h2>
                    <BookOpenIcon size={22} weight="duotone" /> আগে একটা গল্প
                  </h2>
                  <p>{meta.hook}</p>
                </div>
              </div>

              <Block id="animation" n={num("animation")} title="ধাপে ধাপে দেখো" hint="বোতাম চাপো অথবা কিবোর্ডের ← → দিয়ে এগোও। স্লাইডার নাড়িয়ে নিজের সংখ্যা বসাও।">
                <div className="card pad">
                  <Anim />
                </div>
              </Block>

              {has.formulas ? (
                <Block id="formulas" n={num("formulas")} title="সূত্রগুলো মনে রাখো">
                  <div className="formula-grid">
                    {meta.formulas.map((f) => (
                      <div key={f.tex} className="card formula-card">
                        <div className="tex">
                          <Tex display>{f.tex}</Tex>
                        </div>
                        <p className="muted" style={{ fontSize: "0.93rem" }}>
                          {f.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </Block>
              ) : null}

              {has.example ? (
                <Block id="example" n={num("example")} title="একটা অঙ্ক করি">
                  <div className="card example">
                    <p style={{ fontWeight: 600, lineHeight: 1.9 }}>{meta.example.problem}</p>
                    <ol>
                      {meta.example.steps.map((st, k) => (
                        <li key={st.text}>
                          <span className="step-num">{bn(k + 1)}</span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <p style={{ lineHeight: 1.9 }}>{st.text}</p>
                            {st.tex ? (
                              <div style={{ overflowX: "auto" }}>
                                <Tex display>{st.tex}</Tex>
                              </div>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Block>
              ) : null}

              {has.mistakes ? (
                <Block id="mistakes" n={num("mistakes")} title="এই ভুলগুলো করো না">
                  <ul className="mistake-grid">
                    {meta.mistakes.map((m) => (
                      <li key={m} className="mistake">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {has.recap ? (
                <Block id="recap" n={num("recap")} title="সংক্ষেপে মনে রাখো">
                  <ul className="recap">
                    {meta.recap?.map((r) => (
                      <li key={r}>
                        <LightbulbIcon size={22} weight="duotone" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              ) : null}

              {has.quiz ? (
                <Block id="quiz" n={num("quiz")} title="নিজে পরীক্ষা করো" hint="কুইজ শেষ করলে পাঠটি নিজে থেকেই শেষ হিসেবে গোনা হবে।">
                  <Quiz items={meta.quiz} onDone={() => markDone(key)} />
                </Block>
              ) : null}

              <section className="card done-card">
                <div>
                  <h2>{isDone ? "পাঠটি শেষ হয়েছে" : "পাঠটা শেষ করলে?"}</h2>
                  <p className="muted" style={{ fontSize: "0.93rem" }}>
                    {isDone ? "দারুণ! এবার পরের পাঠে যাও।" : "শেষ চিহ্ন দিলে অধ্যায়ের অগ্রগতি জমা থাকবে।"}
                  </p>
                </div>
                <button type="button" onClick={() => toggleDone(key)} className={`btn ${isDone ? "btn-ghost" : "btn-primary"}`}>
                  <CheckCircleIcon size={20} weight={isDone ? "regular" : "fill"} /> {isDone ? "শেষ চিহ্ন সরাও" : "শেষ করেছি"}
                </button>
              </section>
            </>
          )}

          <nav aria-label="পাঠ নেভিগেশন" className="lesson-nav">
            {prev ? (
              <Link href={`${chapterHref}/${prev.slug}`} className="nav-card prev lift">
                <span>
                  <small>আগের পাঠ</small>
                  <strong>{prev.title}</strong>
                </span>
              </Link>
            ) : null}
            <Link href={next ? `${chapterHref}/${next.slug}` : chapterHref} className="nav-card next lift">
              <span>
                <small>{next ? "পরের পাঠ" : "শেষ পাঠ"}</small>
                <strong>{next ? next.title : "অধ্যায়ের তালিকায় ফিরে যাও"}</strong>
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
