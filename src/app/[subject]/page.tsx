import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StickerIcon } from "@/components/site/StickerIcon";
import { getChapters, isReady } from "@/data/chapters";
import { getSubject, papers, subjects } from "@/data/subjects";

type Params = { subject: string };

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { subject } = await params;
  const s = getSubject(subject);
  return { title: s ? s.en : "Subject", description: s?.blurb };
}

const paperEn: Record<string, string> = { first: "First Paper", second: "Second Paper" };

export default async function SubjectPage({ params }: { params: Promise<Params> }) {
  const { subject } = await params;
  const s = getSubject(subject);
  if (!s) notFound();

  const data = papers.map((p) => {
    const chapters = getChapters(s.slug, p.slug);
    const live = chapters.some(isReady);
    const lessons = chapters.reduce((n, c) => n + c.lessons.length, 0);
    return { p, chapters, live, lessons };
  });
  const totalChapters = data.reduce((n, d) => n + d.chapters.length, 0);
  const totalLessons = data.reduce((n, d) => n + d.lessons, 0);

  return (
    <>
      <section className="sx-sp-hero" style={{ "--tint": s.tint } as CSSProperties}>
        <div className="shell sx-sp-grid">
          <div>
            <h1 className="sx-sp-title">{s.en}</h1>
            <p className="sx-sp-blurb">{s.blurb}</p>
            <div className="sx-sp-stats">
              <span className="sx-sp-stat">{papers.length} papers</span>
              {totalChapters > 0 ? <span className="sx-sp-stat">{totalChapters} chapters</span> : null}
              <span className="sx-sp-stat">{totalLessons > 0 ? `${totalLessons} lessons live` : "Coming soon"}</span>
            </div>
          </div>
          <div className="sx-sp-art" aria-hidden>
            <i className="sx-sp-dot d1" />
            <i className="sx-sp-dot d2" />
            <i className="sx-sp-dot d3" />
            <span className="sx-sp-ic">
              <StickerIcon kind={s.icon} />
            </span>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="sx-papers">
          {data.map(({ p, chapters, live, lessons }, i) => {
            const style = { "--tint": s.tint, "--tilt": i % 2 === 0 ? "-1deg" : "1deg" } as CSSProperties;
            const shown = chapters.slice(0, 4);
            return (
              <Link key={p.slug} href={`/${s.slug}/${p.slug}`} className={`sx-paper${live ? "" : " soon"}`} style={style}>
                <span className="sx-paper-top">
                  <span className="sx-paper-no">{i + 1}</span>
                  <span className="sx-chip">{live ? "Live" : "Soon"}</span>
                </span>
                <h3>{paperEn[p.slug] ?? p.name}</h3>
                {shown.length > 0 ? (
                  <ul className="sx-paper-list">
                    {shown.map((c) => (
                      <li key={c.slug}>
                        <i>{c.n}</i>
                        {c.name}
                      </li>
                    ))}
                    {chapters.length > shown.length ? <li className="sx-paper-more">+ {chapters.length - shown.length} more chapters</li> : null}
                  </ul>
                ) : (
                  <span className="sx-paper-more">Chapter list is on its way.</span>
                )}
                <span className="sx-paper-foot">
                  {live ? <span>{`${chapters.length} chapters${lessons > 0 ? `, ${lessons} lessons` : ""}`}</span> : null}
                  <span>{live ? "Open →" : "Preview →"}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="shell section" style={{ paddingTop: 0 }}>
        <div className="sx-more">
          {subjects
            .filter((o) => o.slug !== s.slug)
            .map((o) => (
              <Link key={o.slug} href={`/${o.slug}`} style={{ "--tint": o.tint } as CSSProperties}>
                <i>
                  <StickerIcon kind={o.icon} />
                </i>
                {o.en}
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
