export type PaperSlug = "first" | "second";

export type Subject = {
  slug: string;
  name: string;
  en: string;
  blurb: string;
  color: string;
  tint: string;
  icon: "atom" | "flask" | "dna" | "sigma";
};

export const papers: { slug: PaperSlug; name: string }[] = [
  { slug: "first", name: "প্রথম পত্র" },
  { slug: "second", name: "দ্বিতীয় পত্র" },
];

export const subjects: Subject[] = [
  { slug: "physics", name: "পদার্থবিজ্ঞান", en: "Physics", blurb: "বলবিদ্যা, তরঙ্গ, তাপগতিবিদ্যা ও আধুনিক পদার্থবিজ্ঞান", color: "#3b5bdb", tint: "#9ccbff", icon: "atom" },
  { slug: "chemistry", name: "রসায়ন", en: "Chemistry", blurb: "পরমাণুর গঠন থেকে রাসায়নিক বিক্রিয়া ও জৈব রসায়ন", color: "#0b8f6a", tint: "#8be6bb", icon: "flask" },
  { slug: "biology", name: "জীববিজ্ঞান", en: "Biology", blurb: "কোষ, জেনেটিক্স ও জীবের শারীরতত্ত্ব", color: "#d6336c", tint: "#e9ccff", icon: "dna" },
  { slug: "higher-math", name: "উচ্চতর গণিত", en: "Higher Math", blurb: "ক্যালকুলাস, ভেক্টর ও জ্যামিতির ধারণা", color: "#e8590c", tint: "#ffe27a", icon: "sigma" },
];

export const getSubject = (slug: string) => subjects.find((s) => s.slug === slug);
export const getPaper = (slug: string) => papers.find((p) => p.slug === slug);
