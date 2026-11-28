export const semiIndex = [
  { slug: "band-theory", title: "শক্তি ব্যান্ড তত্ত্ব", short: "পরিবাহী, অন্তরক, অর্ধপরিবাহী", minutes: 10 },
  { slug: "doping", title: "ডোপিং: n-টাইপ ও p-টাইপ", short: "ইলেকট্রন আর হোলের গল্প", minutes: 10 },
  { slug: "pn-junction", title: "p-n জংশন ও ডায়োড", short: "একমুখী ভাল্ভ", minutes: 11 },
  { slug: "rectifier", title: "একমুখীকরণ", short: "AC থেকে DC", minutes: 11 },
  { slug: "transistor", title: "ট্রানজিস্টর", short: "ছোট প্রবাহে বড় নিয়ন্ত্রণ", minutes: 11 },
  { slug: "logic-gates", title: "লজিক গেট", short: "0 আর 1 এর গণিত", minutes: 10 },
  { slug: "opamp", title: "অপারেশনাল অ্যামপ্লিফায়ার", short: "ছোট সংকেত বড় করা", minutes: 10 },
  { slug: "semi-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল ও MCQ", minutes: 25 },
] as const;

export type SemiSlug = (typeof semiIndex)[number]["slug"];
