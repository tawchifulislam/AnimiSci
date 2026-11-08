"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { ReadingProgress } from "@/components/lesson/ReadingProgress";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CheckCircleIcon, ChevronDownIcon, ClockIcon, HourglassIcon, LightbulbIcon } from "@/components/ui/icons";
import { Quiz } from "@/components/ui/Quiz";
import { Tex } from "@/components/ui/Tex";
import { getChapter } from "@/data/chapters";
import { getPaper, getSubject } from "@/data/subjects";
import { lessonRegistry } from "@/lessons/registry";
import { lessonKey } from "@/lib/lesson-key";
import { markDone, setLast, toggleDone, useProgress } from "@/lib/progress";
import { bn } from "@/lib/vec";

function Fold({ id, title, hint, open, children }: { id: string; title: string; hint?: string; open?: boolean; children: ReactNode }) {
  return (
    <details id={id} className="fold" open={open}>
      <summary>
        <span className="fold-title">{title}</span>
        {hint ? <small>{hint}</small> : null}
        <ChevronDownIcon size={20} weight="bold" />
      </summary>
      <div className="fold-body">{children}</div>
    </details>
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

  return (
    <>
      <ReadingProgress />
      <div className="shell page">
        <div className="lesson">
          <div className="lesson-head">
            <Breadcrumb
              items={[
                { label: s.name, href: `/${s.slug}` },
                { label: c.name, href: chapterHref },
                { label: info.title },
              ]}
            />
            <h1 className="lesson-title">{info.title}</h1>
            {stub ? null : <p className="lesson-goal">{meta.goal}</p>}
            <p className="lesson-meta">
              <span>
                পাঠ {bn(i + 1)}/{bn(lessons.length)}
              </span>
              <span>
                <ClockIcon size={16} /> প্রায় {bn(info.minutes)} মিনিট
              </span>
              {isDone ? (
                <span className="done">
                  <CheckCircleIcon size={16} weight="fill" /> শেষ হয়েছে
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
              <p className="hook">
                <b>গল্প</b>
                {meta.hook}
              </p>

              <Anim />

              {meta.formulas.length > 0 ? (
                <Fold id="formulas" title="সূত্র" hint={`${bn(meta.formulas.length)}টি`} open>
                  <div className="formula-grid">
                    {meta.formulas.map((f) => (
                      <div key={f.tex} className="formula-card">
                        <div className="tex">
                          <Tex display>{f.tex}</Tex>
                        </div>
                        <p className="muted" style={{ fontSize: "0.93rem" }}>
                          {f.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </Fold>
              ) : null}

              {meta.example.steps.length > 0 ? (
                <Fold id="example" title="একটা অঙ্ক করি">
                  <div className="example">
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
                </Fold>
              ) : null}

              {meta.mistakes.length > 0 ? (
                <Fold id="mistakes" title="এই ভুলগুলো করো না" hint={`${bn(meta.mistakes.length)}টি`}>
                  <ul className="mistake-grid">
                    {meta.mistakes.map((m) => (
                      <li key={m} className="mistake">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Fold>
              ) : null}

              {meta.recap && meta.recap.length > 0 ? (
                <Fold id="recap" title="সারকথা">
                  <ul className="recap">
                    {meta.recap.map((r) => (
                      <li key={r}>
                        <LightbulbIcon size={20} weight="duotone" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </Fold>
              ) : null}

              {meta.quiz.length > 0 ? (
                <Fold id="quiz" title="কুইজ" hint={`${bn(meta.quiz.length)}টি`}>
                  <Quiz items={meta.quiz} onDone={() => markDone(key)} />
                </Fold>
              ) : null}

              <div className="done-bar">
                <span>{isDone ? "পাঠটি শেষ হয়েছে" : "পাঠ শেষ করেছ?"}</span>
                <button type="button" onClick={() => toggleDone(key)} className={`btn ${isDone ? "btn-ghost" : "btn-primary"}`}>
                  <CheckCircleIcon size={20} weight={isDone ? "regular" : "fill"} /> {isDone ? "শেষ চিহ্ন সরাও" : "শেষ করেছি"}
                </button>
              </div>
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
