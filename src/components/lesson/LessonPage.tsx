"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { CheckCircleIcon, ClockIcon, HourglassIcon } from "@/components/ui/icons";
import { getChapter } from "@/data/chapters";
import { getPaper, getSubject } from "@/data/subjects";
import { lessonRegistry } from "@/lessons/registry";
import { lessonKey } from "@/lib/lesson-key";
import { setLast, useProgress } from "@/lib/progress";
import { bn } from "@/lib/vec";

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
  const stub = !meta.guided;

  return (
    <div className="shell page">
      <div className="lesson narrow">
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
          <Anim />
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
  );
}
