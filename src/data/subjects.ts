export type PaperSlug = "first" | "second";

export type Subject = {
  slug: string;
  name: string;
  en: string;
  blurb: string;
  color: string;
  icon: "atom" | "flask" | "dna" | "sigma";
};

export const papers: { slug: PaperSlug; name: string }[] = [
  { slug: "first", name: "প্রথম পত্র" },
  { slug: "second", name: "দ্বিতীয় পত্র" },
];

export const subjects: Subject[] = [
  { slug: "physics", name: "পদার্থবিজ্ঞান", en: "Physics", blurb: "বল, গতি, তরঙ্গ ও শক্তির রহস্য অ্যানিমেশনে", color: "#3b5bdb", icon: "atom" },
  { slug: "chemistry", name: "রসায়ন", en: "Chemistry", blurb: "পরমাণু থেকে বিক্রিয়া, ধাপে ধাপে", color: "#0b8f6a", icon: "flask" },
  { slug: "biology", name: "জীববিজ্ঞান", en: "Biology", blurb: "কোষ থেকে জীবজগৎ, ছবি দেখে বোঝা", color: "#d6336c", icon: "dna" },
  { slug: "higher-math", name: "উচ্চতর গণিত", en: "Higher Math", blurb: "কঠিন সূত্রের পেছনের সহজ যুক্তি", color: "#e8590c", icon: "sigma" },
];

export const getSubject = (slug: string) => subjects.find((s) => s.slug === slug);
export const getPaper = (slug: string) => papers.find((p) => p.slug === slug);
