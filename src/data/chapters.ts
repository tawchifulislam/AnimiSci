import { gasIndex } from "./gas-index";
import { atomIndex } from "./atom-index";
import { energyIndex } from "./energy-index";
import { matterIndex } from "./matter-index";
import { thermoIndex } from "./thermo-index";
import { vectorIndex } from "./vector-index";

export type LessonInfo = { slug: string; title: string; short: string; minutes: number };

export type Chapter = {
  n: number;
  slug: string;
  name: string;
  en: string;
  lessons: readonly LessonInfo[];
};

/*
 * Adding lessons for a new chapter:
 *  1. Create src/data/<chapter>-index.ts with the lesson list (same shape as vector-index.ts)
 *  2. Put that list in the chapter's `lessons` field below
 *  3. Register the chapter's lesson modules in src/lessons/registry.ts
 * A chapter with an empty `lessons` array is shown as "coming soon".
 */
const physicsFirst: Chapter[] = [
  { n: 1, slug: "measurement", name: "ভৌতজগৎ ও পরিমাপ", en: "Physical World & Measurement", lessons: [] },
  { n: 2, slug: "vector", name: "ভেক্টর", en: "Vector", lessons: vectorIndex },
  { n: 3, slug: "kinematics", name: "গতিবিদ্যা", en: "Kinematics", lessons: [] },
  { n: 4, slug: "newtonian-mechanics", name: "নিউটনীয় বলবিদ্যা", en: "Newtonian Mechanics", lessons: [] },
  { n: 5, slug: "work-energy-power", name: "কাজ, শক্তি ও ক্ষমতা", en: "Work, Energy & Power", lessons: energyIndex },
  { n: 6, slug: "gravitation", name: "মহাকর্ষ ও অভিকর্ষ", en: "Gravitation", lessons: [] },
  { n: 7, slug: "structural-properties", name: "পদার্থের গাঠনিক ধর্ম", en: "Structural Properties of Matter", lessons: matterIndex },
  { n: 8, slug: "periodic-motion", name: "পর্যাবৃত্ত গতি", en: "Periodic Motion", lessons: [] },
  { n: 9, slug: "waves", name: "তরঙ্গ", en: "Waves", lessons: [] },
  { n: 10, slug: "ideal-gas", name: "আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব", en: "Ideal Gas & Kinetic Theory", lessons: gasIndex },
];

const physicsSecond: Chapter[] = [
  { n: 1, slug: "thermodynamics", name: "তাপগতিবিদ্যা", en: "Thermodynamics", lessons: thermoIndex },
  { n: 2, slug: "static-electricity", name: "স্থির তড়িৎ", en: "Static Electricity", lessons: [] },
  { n: 3, slug: "current-electricity", name: "চল তড়িৎ", en: "Current Electricity", lessons: [] },
  { n: 4, slug: "magnetic-effect", name: "তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চুম্বকত্ব", en: "Magnetic Effects of Current & Magnetism", lessons: [] },
  { n: 5, slug: "induction", name: "তড়িৎচুম্বকীয় আবেশ ও পরবর্তী প্রবাহ", en: "Electromagnetic Induction & AC", lessons: [] },
  { n: 6, slug: "geometrical-optics", name: "জ্যামিতিক আলোকবিজ্ঞান", en: "Geometrical Optics", lessons: [] },
  { n: 7, slug: "physical-optics", name: "ভৌত আলোকবিজ্ঞান", en: "Physical Optics", lessons: [] },
  { n: 8, slug: "modern-physics", name: "আধুনিক পদার্থবিজ্ঞানের সূচনা", en: "Introduction to Modern Physics", lessons: [] },
  { n: 9, slug: "atomic-nuclear", name: "পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান", en: "Atomic Models & Nuclear Physics", lessons: atomIndex },
  { n: 10, slug: "semiconductor", name: "সেমিকন্ডাক্টর ও ইলেকট্রনিক্স", en: "Semiconductor & Electronics", lessons: [] },
  { n: 11, slug: "astronomy", name: "জ্যোতির্বিজ্ঞান", en: "Astronomy", lessons: [] },
];

const catalog: Record<string, Chapter[]> = {
  "physics/first": physicsFirst,
  "physics/second": physicsSecond,
};

export const getChapters = (subject: string, paper: string): Chapter[] => catalog[`${subject}/${paper}`] ?? [];

export const getChapter = (subject: string, paper: string, chapter: string) =>
  getChapters(subject, paper).find((c) => c.slug === chapter);

export const isReady = (c: Chapter) => c.lessons.length > 0;

export const isPaperLive = (subject: string, paper: string) => getChapters(subject, paper).some(isReady);

export const isSubjectLive = (subject: string) =>
  Object.entries(catalog).some(([key, list]) => key.startsWith(`${subject}/`) && list.some(isReady));

export const totalLessons = () =>
  Object.values(catalog).reduce((sum, list) => sum + list.reduce((s, c) => s + c.lessons.length, 0), 0);

export const allChapterParams = () =>
  Object.entries(catalog).flatMap(([key, list]) => {
    const [subject, paper] = key.split("/");
    return list.map((c) => ({ subject, paper, chapter: c.slug }));
  });
