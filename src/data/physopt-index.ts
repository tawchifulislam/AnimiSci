export const physoptIndex = [
  { slug: "wave-huygens", title: "তরঙ্গমুখ ও হাইগেনসের নীতি", short: "আলো কীভাবে এগোয়?", minutes: 9 },
  { slug: "interference-basics", title: "আলোর ব্যতিচার", short: "আলো আর আলো মিলে অন্ধকার", minutes: 10 },
  { slug: "young-slit", title: "ইয়ংয়ের দ্বি-চিড় পরীক্ষা", short: "ঝালর প্রস্থ β = λD/d", minutes: 11 },
  { slug: "thin-film", title: "পাতলা পর্দায় ব্যতিচার", short: "সাবান বুদবুদে রঙ কেন?", minutes: 10 },
  { slug: "diffraction-single", title: "একক চিড়ে ব্যবর্তন", short: "আলো বাধার কিনারায় বাঁকে", minutes: 10 },
  { slug: "grating", title: "ব্যবর্তন গ্রেটিং", short: "d sinθ = nλ আর রঙের বর্ণালী", minutes: 10 },
  { slug: "polarization", title: "আলোর সমবর্তন", short: "ম্যালাসের সূত্র ও ব্রুস্টার কোণ", minutes: 10 },
  { slug: "physopt-practice", title: "অনুশীলন", short: "সূত্র, সৃজনশীল ও MCQ", minutes: 25 },
] as const;

export type PhysoptSlug = (typeof physoptIndex)[number]["slug"];
