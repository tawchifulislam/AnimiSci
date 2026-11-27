export const atomIndex = [
  { slug: "rutherford", title: "রাদারফোর্ডের পরীক্ষা", short: "সোনার পাতে α কণা কী দেখাল?", minutes: 9 },
  { slug: "bohr-model", title: "বোর মডেল", short: "ইলেকট্রন কেন নিউক্লিয়াসে পড়ে না?", minutes: 10 },
  { slug: "hydrogen-energy", title: "হাইড্রোজেনের শক্তিস্তর", short: "স্তর বদলালে কোন রঙ বেরোয়?", minutes: 10 },
  { slug: "spectral-series", title: "বর্ণালী শ্রেণি", short: "লাইম্যান, বামার, প্যাশেন", minutes: 10 },
  { slug: "nucleus", title: "নিউক্লিয়াসের গঠন", short: "প্রোটন, নিউট্রন আর আইসোটোপ", minutes: 9 },
] as const;

export type AtomSlug = (typeof atomIndex)[number]["slug"];
