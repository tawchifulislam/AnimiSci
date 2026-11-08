import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnimiSci",
    short_name: "AnimiSci",
    description: "দেখো। নাড়াও। বোঝো। এইচএসসি বিজ্ঞান ও গণিতের সূত্র, জীবন্ত ছবিতে।",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf6ea",
    theme_color: "#d63a22",
    lang: "bn",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
