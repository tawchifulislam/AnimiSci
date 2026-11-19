import { getChapters, isReady } from "@/data/chapters";
import { papers, subjects } from "@/data/subjects";
import { lessonKey } from "@/lib/lesson-key";

export type LessonRef = { key: string; title: string; chapter: string; subject: string; href: string; tint: string };
export type ChapterRef = { id: string; name: string; en: string; subject: string; tint: string; href: string; keys: string[] };

export function buildCatalog() {
  const lessons = new Map<string, LessonRef>();
  const chapters: ChapterRef[] = [];
  for (const s of subjects) {
    for (const p of papers) {
      for (const c of getChapters(s.slug, p.slug)) {
        if (!isReady(c)) continue;
        const keys: string[] = [];
        for (const l of c.lessons) {
          const key = lessonKey(s.slug, p.slug, c.slug, l.slug);
          keys.push(key);
          lessons.set(key, { key, title: l.title, chapter: c.name, subject: s.en, href: `/${s.slug}/${p.slug}/${c.slug}/${l.slug}`, tint: s.tint });
        }
        chapters.push({ id: `${s.slug}/${p.slug}/${c.slug}`, name: c.name, en: c.en, subject: s.en, tint: s.tint, href: `/${s.slug}/${p.slug}/${c.slug}`, keys });
      }
    }
  }
  return { lessons, chapters };
}

const DAY = 86400000;
const zone = "Asia/Dhaka";

export function dayKey(d: Date | string | number) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: zone }).format(new Date(d));
}

export function streakOf(days: Set<string>) {
  let t = Date.now();
  if (!days.has(dayKey(t))) t -= DAY;
  let n = 0;
  while (days.has(dayKey(t))) {
    n += 1;
    t -= DAY;
  }
  return n;
}

export function lastDays(count: number) {
  const out: { key: string; label: string }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const t = Date.now() - i * DAY;
    out.push({ key: dayKey(t), label: new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: zone }).format(new Date(t)) });
  }
  return out;
}

export const shortDate = (d: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: zone }).format(new Date(d));
