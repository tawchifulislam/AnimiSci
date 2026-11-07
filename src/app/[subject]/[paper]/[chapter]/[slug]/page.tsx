import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonPage } from "@/components/lesson/LessonPage";
import { allChapterParams, getChapter } from "@/data/chapters";

type Props = { params: Promise<{ subject: string; paper: string; chapter: string; slug: string }> };

export function generateStaticParams() {
  return allChapterParams().flatMap(({ subject, paper, chapter }) =>
    (getChapter(subject, paper, chapter)?.lessons ?? []).map((l) => ({ subject, paper, chapter, slug: l.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, paper, chapter, slug } = await params;
  const l = getChapter(subject, paper, chapter)?.lessons.find((x) => x.slug === slug);
  return l ? { title: l.title, description: l.short } : { title: "পাওয়া যায়নি" };
}

export default async function Page({ params }: Props) {
  const { subject, paper, chapter, slug } = await params;
  const c = getChapter(subject, paper, chapter);
  if (!c || !c.lessons.some((l) => l.slug === slug)) notFound();
  return <LessonPage subject={subject} paper={paper} chapter={chapter} slug={slug} />;
}
