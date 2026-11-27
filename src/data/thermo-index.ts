export const thermoIndex = [
  { slug: "temperature-measurement", title: "তাপমাত্রা পরিমাপ", short: "স্কেল, শূন্যতম সূত্র আর পরম শূন্য", minutes: 8 },
  { slug: "system-state", title: "সিস্টেম, চলরাশি ও অবস্থা", short: "অবস্থা ফাংশন বনাম পথ ফাংশন", minutes: 8 },
  { slug: "heat-work", title: "তাপ, কাজ ও P-V ক্ষেত্রফল", short: "পিস্টন ঠেললে কাজ কত?", minutes: 10 },
  { slug: "first-law", title: "প্রথম সূত্র", short: "শক্তির হিসাব-বই", minutes: 10 },
  { slug: "specific-heats", title: "মোলার আপেক্ষিক তাপ", short: "সমচাপে বেশি তাপ কেন লাগে?", minutes: 10 },
  { slug: "processes", title: "চার প্রক্রিয়া", short: "সমআয়তন, সমচাপ, সমোষ্ণ, রুদ্ধতাপ", minutes: 10 },
  { slug: "adiabatic", title: "রুদ্ধতাপীয় প্রক্রিয়া", short: "তাপ না দিয়েও গরম হয় কীভাবে?", minutes: 10 },
  { slug: "second-law", title: "দ্বিতীয় সূত্র", short: "তাপ কেন উল্টো পথে যায় না?", minutes: 9 },
  { slug: "carnot", title: "কার্নো চক্র", short: "সবচেয়ে দক্ষ ইঞ্জিনের সীমা", minutes: 11 },
  { slug: "refrigerator", title: "রেফ্রিজারেটর", short: "ঠান্ডা থেকে গরমে তাপ পাম্প", minutes: 9 },
  { slug: "entropy", title: "এনট্রপি", short: "বিশৃঙ্খলার মাপ", minutes: 9 },
  { slug: "thermo-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল প্রশ্ন ও MCQ", minutes: 15 },
] as const;

export type ThermoSlug = (typeof thermoIndex)[number]["slug"];
