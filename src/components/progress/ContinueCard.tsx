"use client";

import Link from "next/link";
import { PlayIcon } from "@/components/ui/icons";
import { getChapter } from "@/data/chapters";
import { useProgress } from "@/lib/progress";

export function ContinueCard() {
  const { last } = useProgress();
  if (!last) return null;
  const [subject, paper, chapter, slug] = last.split("/");
  const c = getChapter(subject, paper, chapter);
  const l = c?.lessons.find((x) => x.slug === slug);
  if (!c || !l) return null;

  return (
    <Link href={`/${last}`} className="continue lift">
      <span className="icon-dot">
        <PlayIcon size={16} weight="fill" />
      </span>
      <span className="continue-body">
        <small>যেখানে থেমেছিলে</small>
        <strong>{l.title}</strong>
      </span>
    </Link>
  );
}
