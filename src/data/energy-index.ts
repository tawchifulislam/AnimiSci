export const energyIndex = [
  { slug: "work", title: "কাজ", short: "কখন কাজ হয়, কখন হয় না?", minutes: 9 },
  { slug: "variable-force", title: "চলমান বলের কাজ", short: "গ্রাফের ক্ষেত্রফল আর স্প্রিং", minutes: 10 },
  { slug: "work-energy-theorem", title: "গতিশক্তি ও কাজ-শক্তি উপপাদ্য", short: "ব্রেক কষতে কত দূরত্ব লাগে?", minutes: 10 },
  { slug: "potential-energy", title: "স্থিতিশক্তি", short: "ওপরে থাকলেই শক্তি জমে", minutes: 9 },
  { slug: "conservative-forces", title: "রক্ষণশীল ও অরক্ষণশীল বল", short: "ঘর্ষণ শক্তি নেয় কেন?", minutes: 9 },
  { slug: "energy-conservation", title: "যান্ত্রিক শক্তির সংরক্ষণ", short: "রোলার কোস্টারের গতি কোথা থেকে আসে?", minutes: 10 },
  { slug: "power", title: "ক্ষমতা", short: "দৌড়ে উঠলে বেশি ক্লান্ত লাগে কেন?", minutes: 9 },
  { slug: "efficiency", title: "দক্ষতা ও শক্তির উৎস", short: "বাল্বের শক্তি যায় কোথায়?", minutes: 9 },
  { slug: "mass-energy", title: "ভর-শক্তি সমতুল্যতা", short: "এক গ্রামে কত শক্তি?", minutes: 8 },
  { slug: "energy-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল প্রশ্ন ও MCQ", minutes: 15 },
] as const;

export type EnergySlug = (typeof energyIndex)[number]["slug"];
