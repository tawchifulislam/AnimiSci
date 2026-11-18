export const vectorIndex = [
  { slug: "scalar-vector", title: "স্কেলার ও ভেক্টর", short: "কোন রাশির দিক আছে, কোনটার নেই?", minutes: 6 },
  { slug: "vector-types", title: "ভেক্টরের প্রকারভেদ", short: "সমান, বিপরীত, শূন্য ও একক ভেক্টর", minutes: 7 },
  { slug: "addition", title: "ভেক্টরের যোগ ও লব্ধি", short: "দুই টানের মিলিত ফল কত এবং কোন দিকে?", minutes: 12 },
  { slug: "subtraction", title: "ভেক্টরের বিয়োগ", short: "উল্টে দিয়ে যোগ করার কৌশল", minutes: 7 },
  { slug: "unit-vector", title: "একক ভেক্টর ও উপাংশ রূপ", short: "î, ĵ, k̂ দিয়ে যেকোনো ভেক্টর লেখা", minutes: 8 },
  { slug: "perpendicular-components", title: "লম্ব উপাংশে বিভাজন", short: "একটি ভেক্টরকে cos ও sin দিয়ে দুই ভাগ", minutes: 8 },
  { slug: "sine-rule-resolution", title: "দুই দিকে বিভাজন (সাইন সূত্র)", short: "যেকোনো দুই দিকে ভাগ করার সূত্র", minutes: 9 },
  { slug: "river-boat", title: "নদী ও নৌকা", short: "স্রোতের মধ্যে ওপারে যাওয়ার অঙ্ক", minutes: 12 },
  { slug: "relative-velocity", title: "আপেক্ষিক বেগ ও বৃষ্টির ফোঁটা", short: "চলন্ত গাড়ির কোন কাচ ভিজবে?", minutes: 12 },
  { slug: "dot-product", title: "ডট গুণন (স্কেলার গুণন)", short: "ছায়ার দৈর্ঘ্য দিয়ে গুণ", minutes: 9 },
  { slug: "cross-product", title: "ক্রস গুণন (ভেক্টর গুণন)", short: "ক্ষেত্রফল ও ঘূর্ণনের দিক", minutes: 10 },
  { slug: "del-gradient", title: "ক্ষেত্র, ডেল ও গ্র্যাডিয়েন্ট", short: "কোন দিকে সবচেয়ে দ্রুত বাড়ে?", minutes: 8 },
  { slug: "divergence", title: "ডাইভারজেন্স", short: "ক্ষেত্র কোথায় ছড়ায়, কোথায় জমে?", minutes: 7 },
  { slug: "curl", title: "কার্ল", short: "ক্ষেত্রে ঘূর্ণি আছে কি?", minutes: 7 },
  { slug: "vector-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল প্রশ্ন ও MCQ", minutes: 15 },
] as const;

export type VectorSlug = (typeof vectorIndex)[number]["slug"];
