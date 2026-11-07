import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { ChapterProgress } from "@/components/progress/ChapterProgress";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ComingSoon } from "@/components/site/ComingSoon";
import { PageHeader } from "@/components/site/PageHeader";
import { LockSimpleIcon } from "@/components/ui/icons";
import { getChapters, isReady } from "@/data/chapters";
import { getPaper, getSubject, papers, subjects } from "@/data/subjects";
import { lessonKey } from "@/lib/lesson-key";
import { bn } from "@/lib/vec";

type Props = { params: Promise<{ subject: string; paper: string }> };

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

  return (
    <div className="shell page">
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: s.name, href: `/${s.slug}` }, { label: p.name }]} />
      <PageHeader
        eyebrow={s.en}
        title={
          <>
            {s.name} <em>{p.name}</em>
          </>
        }
        sub={chapters.length ? `${bn(chapters.length)}টি অধ্যায়, তার মধ্যে ${bn(readyCount)}টি চালু।` : undefined}
        color={s.color}
        art={s.icon}
      />

      {chapters.length ? (
        <div className="chapter-grid">
          {chapters.map((c) => {
            const ready = isReady(c);
            const top = (
              <div className="chapter-top">
                <span className="chapter-num">{bn(c.n)}</span>
                <div style={{ minWidth: 0 }}>
                  <h3 className="chapter-name">{c.name}</h3>
                  <p className="chapter-en">{c.en}</p>
                </div>
                {ready ? null : (
                  <span className="chapter-go">
                    <LockSimpleIcon size={20} />
                  </span>
                )}
              </div>
            );
            const style = { "--sc": s.color } as CSSProperties;
            return ready ? (
              <Link key={c.slug} href={`/${s.slug}/${p.slug}/${c.slug}`} className="chapter-card lift reveal" style={style}>
                {top}
                <ChapterProgress color={s.color} keys={c.lessons.map((l) => lessonKey(s.slug, p.slug, c.slug, l.slug))} />
              </Link>
            ) : (
              <div key={c.slug} className="chapter-card locked" style={style}>
                {top}
                <p className="chapter-en">শীঘ্রই আসছে</p>
              </div>
            );
          })}
        </div>
      ) : (
        <ComingSoon title={`${s.name} ${p.name}`} backHref={`/${s.slug}`} backLabel="আগের পাতায় ফিরে যাও" />
      )}
    </div>
  );
}
