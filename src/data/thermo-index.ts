export const thermoIndex = [
  { slug: "temperature-measurement", title: "তাপমাত্রা পরিমাপ", short: "স্কেল, শূন্যতম সূত্র আর পরম শূন্য", minutes: 8 },
  { slug: "system-state", title: "সিস্টেম, চলরাশি ও অবস্থা", short: "অবস্থা ফাংশন বনাম পথ ফাংশন", minutes: 8 },
  { slug: "heat-work", title: "তাপ, কাজ ও P-V ক্ষেত্রফল", short: "পিস্টন ঠেললে কাজ কত?", minutes: 10 },
  { slug: "first-law", title: "প্রথম সূত্র", short: "শক্তির হিসাব-বই", minutes: 10 },
] as const;

export type ThermoSlug = (typeof thermoIndex)[number]["slug"];
