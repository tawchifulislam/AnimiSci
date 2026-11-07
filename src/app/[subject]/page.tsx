import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { PageHeader } from "@/components/site/PageHeader";
import { SubjectCard } from "@/components/site/SubjectCard";
import { BookOpenIcon } from "@/components/ui/icons";
import { getChapters, isPaperLive } from "@/data/chapters";
import { getSubject, papers, subjects } from "@/data/subjects";
import { bn } from "@/lib/vec";

type Props = { params: Promise<{ subject: string }> };

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params;
  const s = getSubject(subject);
  return { title: s ? s.name : "পাওয়া যায়নি" };
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;
  const s = getSubject(subject);
  if (!s) notFound();

  return (
    <div className="shell page">
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: s.name }]} />
      <PageHeader eyebrow={s.en} title={s.name} sub={s.blurb} color={s.color} art={s.icon} />
      <div className="paper-grid" style={{ maxWidth: "46rem" }}>
        {papers.map((p) => {
          const live = isPaperLive(s.slug, p.slug);
          const count = getChapters(s.slug, p.slug).length;
          return (
            <SubjectCard
              key={p.slug}
              href={`/${s.slug}/${p.slug}`}
              title={`${s.name} ${p.name}`}
              sub={count ? `${bn(count)}টি অধ্যায়` : s.en}
              color={s.color}
              icon={BookOpenIcon}
              status={live ? "চালু" : "শীঘ্রই"}
              live={live}
              cta="অধ্যায় দেখো"
            />
          );
        })}
      </div>
    </div>
  );
}
