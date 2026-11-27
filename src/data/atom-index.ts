export const atomIndex = [
  { slug: "rutherford", title: "রাদারফোর্ডের পরীক্ষা", short: "সোনার পাতে α কণা কী দেখাল?", minutes: 9 },
  { slug: "bohr-model", title: "বোর মডেল", short: "ইলেকট্রন কেন নিউক্লিয়াসে পড়ে না?", minutes: 10 },
  { slug: "hydrogen-energy", title: "হাইড্রোজেনের শক্তিস্তর", short: "স্তর বদলালে কোন রঙ বেরোয়?", minutes: 10 },
  { slug: "spectral-series", title: "বর্ণালী শ্রেণি", short: "লাইম্যান, বামার, প্যাশেন", minutes: 10 },
  { slug: "nucleus", title: "নিউক্লিয়াসের গঠন", short: "প্রোটন, নিউট্রন আর আইসোটোপ", minutes: 9 },
  { slug: "binding-energy", title: "বন্ধন শক্তি", short: "হারানো ভর গেল কোথায়?", minutes: 11 },
  { slug: "radioactivity", title: "তেজস্ক্রিয়তা", short: "α, β, γ আর ক্ষয়ের নিয়ম", minutes: 10 },
  { slug: "decay-law", title: "ক্ষয় সূত্র ও অর্ধায়ু", short: "কতক্ষণে অর্ধেক শেষ?", minutes: 11 },
  { slug: "nuclear-reactions", title: "ফিশন ও ফিউশন", short: "নিউক্লিয়ার শক্তির উৎস", minutes: 11 },
  { slug: "atom-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল ও MCQ", minutes: 25 },
] as const;

export type AtomSlug = (typeof atomIndex)[number]["slug"];
