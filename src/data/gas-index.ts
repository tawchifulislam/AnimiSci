export const gasIndex = [
  { slug: "gas-variables", title: "গ্যাসের চলরাশি", short: "চাপ, আয়তন, তাপমাত্রা আর অণুর সংখ্যা", minutes: 7 },
  { slug: "boyle", title: "বয়েলের সূত্র", short: "পিস্টন চাপলে চাপ কেন বাড়ে?", minutes: 9 },
  { slug: "charles-pressure", title: "চার্লসের ও চাপের সূত্র", short: "গরম করলে গ্যাস কী করে?", minutes: 9 },
] as const;

export type GasSlug = (typeof gasIndex)[number]["slug"];
