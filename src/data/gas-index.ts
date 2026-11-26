export const gasIndex = [
  { slug: "gas-variables", title: "গ্যাসের চলরাশি", short: "চাপ, আয়তন, তাপমাত্রা আর অণুর সংখ্যা", minutes: 7 },
  { slug: "boyle", title: "বয়েলের সূত্র", short: "পিস্টন চাপলে চাপ কেন বাড়ে?", minutes: 9 },
  { slug: "charles-pressure", title: "চার্লসের ও চাপের সূত্র", short: "গরম করলে গ্যাস কী করে?", minutes: 9 },
  { slug: "ideal-gas-eq", title: "আদর্শ গ্যাস সমীকরণ", short: "তিন সূত্র মিলে এক সূত্র", minutes: 10 },
  { slug: "real-gas", title: "বাস্তব গ্যাস", short: "কখন আদর্শ সূত্র আর মেলে না?", minutes: 8 },
  { slug: "kinetic-pressure", title: "গতিতত্ত্ব ও গ্যাসের চাপ", short: "দেয়ালে ধাক্কা থেকে চাপের সূত্র", minutes: 10 },
  { slug: "kinetic-temperature", title: "অণুর গতিশক্তি ও তাপমাত্রা", short: "তাপমাত্রা আসলে কী মাপে?", minutes: 10 },
] as const;

export type GasSlug = (typeof gasIndex)[number]["slug"];
