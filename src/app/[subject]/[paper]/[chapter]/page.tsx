import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterProgress } from "@/components/progress/ChapterProgress";
import { LessonCheck } from "@/components/progress/LessonCheck";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { ComingSoon } from "@/components/site/ComingSoon";
import { PageHeader } from "@/components/site/PageHeader";
import { ClockIcon } from "@/components/ui/icons";
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

export default async function ChapterPage({ params }: Props) {
  const { subject, paper, chapter } = await params;
  const s = getSubject(subject);
  const p = getPaper(paper);
  const c = getChapter(subject, paper, chapter);
  if (!s || !p || !c) notFound();

  const base = `/${s.slug}/${p.slug}`;
  const crumbs = [{ label: s.name, href: `/${s.slug}` }, { label: p.name, href: base }, { label: c.name }];

  if (!isReady(c)) {
    return (
      <div className="shell page">
        <Breadcrumb items={crumbs} />
        <ComingSoon title={c.name} backHref={base} backLabel="অধ্যায়ের তালিকায় ফিরে যাও" />
      </div>
    );
  }

  const total = c.lessons.reduce((sum, l) => sum + l.minutes, 0);

  return (
    <div className="shell page">
      <Breadcrumb items={crumbs} />
      <PageHeader
        eyebrow={`অধ্যায় ${bn(c.n)}`}
        title={c.name}
        sub={`${bn(c.lessons.length)}টি পাঠ, মোট প্রায় ${bn(total)} মিনিট। ক্রমানুসারে পড়লে সবচেয়ে ভালো, কারণ আগের পাঠের ধারণা পরের পাঠে কাজে লাগে।`}
        color={s.color}
        art={s.icon}
      >
        <div style={{ maxWidth: "26rem" }}>
          <ChapterProgress color={s.color} keys={c.lessons.map((l) => lessonKey(s.slug, p.slug, c.slug, l.slug))} />
        </div>
        <div>
          <Link href={`${base}/${c.slug}/${c.lessons[0].slug}`} className="btn btn-primary">
            প্রথম পাঠ থেকে শুরু
          </Link>
        </div>
      </PageHeader>

      <ol className="lesson-list">
        {c.lessons.map((l, i) => (
          <li key={l.slug}>
            <Link href={`${base}/${c.slug}/${l.slug}`} className="lesson-row lift">
              <span className="chip-num">{bn(i + 1)}</span>
              <div className="lesson-row-body">
                <strong>{l.title}</strong>
                <span>{l.short}</span>
                <small>
                  <ClockIcon size={14} /> {bn(l.minutes)} মিনিট
                </small>
              </div>
              <LessonCheck k={lessonKey(s.slug, p.slug, c.slug, l.slug)} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
