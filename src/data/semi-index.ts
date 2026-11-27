export const semiIndex = [
  { slug: "band-theory", title: "শক্তি ব্যান্ড তত্ত্ব", short: "পরিবাহী, অন্তরক, অর্ধপরিবাহী", minutes: 10 },
  { slug: "doping", title: "ডোপিং: n-টাইপ ও p-টাইপ", short: "ইলেকট্রন আর হোলের গল্প", minutes: 10 },
  { slug: "pn-junction", title: "p-n জংশন ও ডায়োড", short: "একমুখী ভাল্ভ", minutes: 11 },
  { slug: "rectifier", title: "একমুখীকরণ", short: "AC থেকে DC", minutes: 11 },
] as const;

export type SemiSlug = (typeof semiIndex)[number]["slug"];
