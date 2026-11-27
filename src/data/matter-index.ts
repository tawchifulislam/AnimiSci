export const matterIndex = [
  { slug: "stress-strain", title: "পীড়ন, বিকৃতি ও ইয়ং গুণাঙ্ক", short: "মোটা তার কম লম্বা হয় কেন?", minutes: 10 },
  { slug: "hooke-graph", title: "হুকের সূত্র ও পীড়ন-বিকৃতি গ্রাফ", short: "কোথায় ইলাস্টিক, কোথায় ভাঙন?", minutes: 10 },
  { slug: "elastic-moduli", title: "আয়তন ও কৃন্তন গুণাঙ্ক", short: "তিন রকম বিকৃতি, তিন রকম মাপ", minutes: 10 },
  { slug: "elastic-energy", title: "স্থিতিস্থাপক শক্তি", short: "টানা তারে শক্তি জমে কীভাবে?", minutes: 9 },
] as const;

export type MatterSlug = (typeof matterIndex)[number]["slug"];
