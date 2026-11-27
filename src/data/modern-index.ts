export const modernIndex = [
  { slug: "relativity-basics", title: "আপেক্ষিকতার ভিত্তি", short: "জড় প্রসঙ্গ, ইথার ও আইনস্টাইনের স্বীকার্য", minutes: 9 },
  { slug: "time-dilation", title: "কালদীর্ঘায়ন", short: "চলন্ত ঘড়ি কেন ধীর?", minutes: 11 },
  { slug: "length-mass", title: "দৈর্ঘ্য, ভর ও শক্তি", short: "সংকোচন, ভর বৃদ্ধি আর E = mc²", minutes: 11 },
  { slug: "photon-quantum", title: "ফোটন ও কোয়ান্টাম", short: "প্ল্যাঙ্কের ধারণা, E = hf", minutes: 10 },
  { slug: "photoelectric", title: "আলোক তড়িৎ ক্রিয়া", short: "কার্যাপেক্ষক, সূচন কম্পাঙ্ক, নিরোধ বিভব", minutes: 11 },
] as const;

export type ModernSlug = (typeof modernIndex)[number]["slug"];
