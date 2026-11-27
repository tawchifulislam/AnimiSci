export const energyIndex = [
  { slug: "work", title: "কাজ", short: "কখন কাজ হয়, কখন হয় না?", minutes: 9 },
  { slug: "variable-force", title: "চলমান বলের কাজ", short: "গ্রাফের ক্ষেত্রফল আর স্প্রিং", minutes: 10 },
  { slug: "work-energy-theorem", title: "গতিশক্তি ও কাজ-শক্তি উপপাদ্য", short: "ব্রেক কষতে কত দূরত্ব লাগে?", minutes: 10 },
  { slug: "potential-energy", title: "স্থিতিশক্তি", short: "ওপরে থাকলেই শক্তি জমে", minutes: 9 },
  { slug: "conservative-forces", title: "রক্ষণশীল ও অরক্ষণশীল বল", short: "ঘর্ষণ শক্তি নেয় কেন?", minutes: 9 },
] as const;

export type EnergySlug = (typeof energyIndex)[number]["slug"];
