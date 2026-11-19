import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { ChapterProgress } from "@/components/progress/ChapterProgress";
import { LessonCheck } from "@/components/progress/LessonCheck";
import { SoonPanel } from "@/components/site/SoonPanel";
import { allChapterParams, getChapter, isReady } from "@/data/chapters";
import { getPaper, getSubject } from "@/data/subjects";
import { lessonKey } from "@/lib/lesson-key";
import { bn } from "@/lib/vec";

type Props = { params: Promise<{ subject: string; paper: string; chapter: string }> };

export function generateStaticParams() {
  return allChapterParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, paper, chapter } = await params;
  const c = getChapter(subject, paper, chapter);
  const s = getSubject(subject);
  return c
    ? { title: c.name, description: `${s?.name ?? ""} অধ্যায় ${bn(c.n)}: ${c.name}, অ্যানিমেশনসহ সব পাঠ` }
    : { title: "পাওয়া যায়নি" };
}

const duration = (min: number) => (min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`);

export default async function ChapterPage({ params }: Props) {
  const { subject, paper, chapter } = await params;
  const s = getSubject(subject);
  const p = getPaper(paper);
  const c = getChapter(subject, paper, chapter);
  if (!s || !p || !c) notFound();

  const base = `/${s.slug}/${p.slug}`;
  const tint = { "--tint": s.tint } as CSSProperties;

  if (!isReady(c)) {
    return (
      <div className="shell page">
        <SoonPanel tint={s.tint} backHref={base} backLabel="All chapters" />
      </div>
    );
  }

  const total = c.lessons.reduce((sum, l) => sum + l.minutes, 0);
  const keys = c.lessons.map((l) => lessonKey(s.slug, p.slug, c.slug, l.slug));

  return (
    <>
      <div className="shell sx-sp-crumb">
        <Link href={base} className="sx-back">
          ← All chapters
        </Link>
      </div>

      <section className="sx-sp-hero" style={tint}>
        <div className="shell sx-sp-grid">
          <div>
            <p className="sx-sp-eye">Chapter {String(c.n).padStart(2, "0")}</p>
            <h1 className="sx-sp-title sx-ch-title">{c.name}</h1>
            <div className="sx-sp-stats">
              <span className="sx-sp-stat">{c.lessons.length} lessons</span>
              <span className="sx-sp-stat">about {duration(total)}</span>
            </div>
            <div className="sx-ch-hero-prog">
              <ChapterProgress color="#171a2c" keys={keys} />
            </div>
            <Link href={`${base}/${c.slug}/${c.lessons[0].slug}`} className="btn btn-primary sx-start">
              Start lesson 1
            </Link>
          </div>
          <div className="sx-sp-art" aria-hidden>
            <i className="sx-sp-dot d1" />
            <i className="sx-sp-dot d2" />
            <i className="sx-sp-dot d3" />
            <span className="sx-sp-ic">
              <b className="sx-sp-num">{c.n}</b>
            </span>
          </div>
        </div>
      </section>

      <section className="shell section">
        <ol className="sx-lessons">
          {c.lessons.map((l, i) => (
            <li key={l.slug}>
              <Link href={`${base}/${c.slug}/${l.slug}`} className="sx-lrow" style={tint}>
                <span className="sx-lrow-no">{i + 1}</span>
                <span className="sx-lrow-body">
                  <strong>{l.title}</strong>
                  <span>{l.short}</span>
                </span>
                <span className="sx-lrow-meta">
                  <span className="sx-min">{l.minutes} min</span>
                  <LessonCheck k={lessonKey(s.slug, p.slug, c.slug, l.slug)} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
