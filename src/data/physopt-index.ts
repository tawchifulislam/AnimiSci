export const physoptIndex = [
  { slug: "wave-huygens", title: "তরঙ্গমুখ ও হাইগেনসের নীতি", short: "আলো কীভাবে এগোয়?", minutes: 9 },
  { slug: "interference-basics", title: "আলোর ব্যতিচার", short: "আলো আর আলো মিলে অন্ধকার", minutes: 10 },
  { slug: "young-slit", title: "ইয়ংয়ের দ্বি-চিড় পরীক্ষা", short: "ঝালর প্রস্থ β = λD/d", minutes: 11 },
  { slug: "thin-film", title: "পাতলা পর্দায় ব্যতিচার", short: "সাবান বুদবুদে রঙ কেন?", minutes: 10 },
] as const;

export type PhysoptSlug = (typeof physoptIndex)[number]["slug"];
