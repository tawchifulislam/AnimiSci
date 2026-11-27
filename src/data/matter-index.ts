export const matterIndex = [
  { slug: "intermolecular", title: "আন্তঃআণবিক বল", short: "পানি ভেজায়, পারদ ভেজায় না কেন?", minutes: 8 },
  { slug: "stress-strain", title: "পীড়ন, বিকৃতি ও ইয়ং গুণাঙ্ক", short: "মোটা তার কম লম্বা হয় কেন?", minutes: 10 },
  { slug: "hooke-graph", title: "হুকের সূত্র ও পীড়ন-বিকৃতি গ্রাফ", short: "কোথায় ইলাস্টিক, কোথায় ভাঙন?", minutes: 10 },
  { slug: "elastic-moduli", title: "আয়তন ও কৃন্তন গুণাঙ্ক", short: "তিন রকম বিকৃতি, তিন রকম মাপ", minutes: 10 },
  { slug: "moduli-relations", title: "গুণাঙ্ক ও পয়সনের অনুপাতের সম্পর্ক", short: "একটি জানলে বাকিগুলো বের করো", minutes: 9 },
  { slug: "elastic-energy", title: "স্থিতিস্থাপক শক্তি", short: "টানা তারে শক্তি জমে কীভাবে?", minutes: 9 },
  { slug: "surface-tension", title: "পৃষ্ঠটান", short: "ফোঁটা গোল হয় কেন?", minutes: 10 },
  { slug: "surface-energy", title: "পৃষ্ঠশক্তি", short: "ফোঁটা ভাঙতে কাজ লাগে কেন?", minutes: 9 },
  { slug: "capillary", title: "কৈশিকতা ও স্পর্শ কোণ", short: "সরু নলে পানি ওঠে কেন?", minutes: 10 },
  { slug: "viscosity", title: "সান্দ্রতা ও প্রান্তবেগ", short: "মধু ধীরে নামে কেন?", minutes: 10 },
  { slug: "continuity", title: "প্রবাহীর সন্ততা", short: "পাইপ সরু হলে বেগ বাড়ে কেন?", minutes: 9 },
  { slug: "bernoulli", title: "বার্নুলির সূত্র", short: "বিমান ওড়ে কীভাবে?", minutes: 10 },
  { slug: "matter-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল প্রশ্ন ও MCQ", minutes: 15 },
] as const;

export type MatterSlug = (typeof matterIndex)[number]["slug"];
