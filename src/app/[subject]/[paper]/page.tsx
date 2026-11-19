import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { ChapterProgress } from "@/components/progress/ChapterProgress";
import { ComingSoon } from "@/components/site/ComingSoon";
import { LockSimpleIcon } from "@/components/ui/icons";
import { getChapters, isReady } from "@/data/chapters";
import { getPaper, getSubject, papers, subjects } from "@/data/subjects";
import { lessonKey } from "@/lib/lesson-key";

type Props = { params: Promise<{ subject: string; paper: string }> };

const paperEn: Record<string, string> = { first: "First Paper", second: "Second Paper" };

export function generateStaticParams() {
  return subjects.flatMap((s) => papers.map((p) => ({ subject: s.slug, paper: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, paper } = await params;
  const s = getSubject(subject);
  const p = getPaper(paper);
  return { title: s && p ? `${s.name} ${p.name}` : "পাওয়া যায়নি" };
}

export default async function PaperPage({ params }: Props) {
  const { subject, paper } = await params;
  const s = getSubject(subject);
  const p = getPaper(paper);
  if (!s || !p) notFound();

  const chapters = getChapters(s.slug, p.slug);
  const readyCount = chapters.filter(isReady).length;
  const idx = papers.findIndex((x) => x.slug === p.slug) + 1;
  const tint = { "--tint": s.tint } as CSSProperties;

  return (
    <>
      <div className="shell sx-sp-crumb">
        <Link href={`/${s.slug}`} className="sx-back">
          ← All papers
        </Link>
      </div>

      <section className="sx-sp-hero" style={tint}>
        <div className="shell sx-sp-grid">
          <div>
            <h1 className="sx-sp-title">{paperEn[p.slug] ?? p.name}</h1>
            <p className="sx-sp-blurb">অধ্যায় বেছে নাও। ক্রমানুসারে পড়লে সবচেয়ে ভালো, কারণ আগের ধারণা পরে কাজে লাগে।</p>
            {chapters.length > 0 ? (
              <div className="sx-sp-stats">
                <span className="sx-sp-stat">{chapters.length} chapters</span>
                <span className="sx-sp-stat">{readyCount > 0 ? `${readyCount} live` : "Coming soon"}</span>
              </div>
            ) : null}
          </div>
          <div className="sx-sp-art" aria-hidden>
            <i className="sx-sp-dot d1" />
            <i className="sx-sp-dot d2" />
            <i className="sx-sp-dot d3" />
            <span className="sx-sp-ic">
              <b className="sx-sp-num">{idx}</b>
            </span>
          </div>
        </div>
      </section>

      <section className="shell section">
        {chapters.length ? (
          <div className="sx-chs">
            {chapters.map((c) => {
              const ready = isReady(c);
              const head = (
                <>
                  <span className="sx-ch-top">
                    <span className="sx-ch-no">{String(c.n).padStart(2, "0")}</span>
                    {ready ? (
                      <span className="sx-chip">{c.lessons.length} lessons</span>
                    ) : (
                      <span className="sx-ch-lock">
                        <LockSimpleIcon size={18} />
                        <span className="sx-chip">Soon</span>
                      </span>
                    )}
                  </span>
                  <h3>{c.name}</h3>
                  <span className="sx-ch-en">{c.en}</span>
                </>
              );
              return ready ? (
                <Link key={c.slug} href={`/${s.slug}/${p.slug}/${c.slug}`} className="sx-ch" style={tint}>
                  {head}
                  <span className="sx-ch-prog">
                    <ChapterProgress color="#171a2c" keys={c.lessons.map((l) => lessonKey(s.slug, p.slug, c.slug, l.slug))} />
                  </span>
                </Link>
              ) : (
                <div key={c.slug} className="sx-ch locked" style={tint}>
                  {head}
                </div>
              );
            })}
          </div>
        ) : (
          <ComingSoon title={`${s.name} ${p.name}`} backHref={`/${s.slug}`} backLabel="আগের পাতায় ফিরে যাও" />
        )}
      </section>
    </>
  );
}
