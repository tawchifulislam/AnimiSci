export const gravIndex = [
  { slug: "newton-gravitation", title: "নিউটনের মহাকর্ষ সূত্র", short: "আপেল আর চাঁদের একই বল", minutes: 9 },
  { slug: "g-variation", title: "অভিকর্ষজ ত্বরণ g", short: "উচ্চতা, গভীরতা আর ঘূর্ণনে g", minutes: 11 },
  { slug: "field-potential", title: "ক্ষেত্র প্রাবল্য ও বিভব", short: "বিভব ঋণাত্মক কেন?", minutes: 10 },
  { slug: "escape-orbit", title: "মুক্তিবেগ ও কক্ষীয় বেগ", short: "কত জোরে ছুটলে পৃথিবী ছাড়া যায়?", minutes: 11 },
  { slug: "satellite-motion", title: "উপগ্রহের গতি", short: "ভূস্থির উপগ্রহ আর পর্যায়কাল", minutes: 11 },
  { slug: "kepler-laws", title: "কেপলারের সূত্র", short: "গ্রহের গতির তিন নিয়ম", minutes: 10 },
  { slug: "weightlessness", title: "ওজন ও ওজনহীনতা", short: "লিফটে আর কক্ষে ওজনের কী হয়?", minutes: 10 },
  { slug: "grav-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল ও MCQ", minutes: 25 },
] as const;

export type GravSlug = (typeof gravIndex)[number]["slug"];
