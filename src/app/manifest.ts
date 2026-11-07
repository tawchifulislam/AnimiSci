import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnimiSci",
    short_name: "AnimiSci",
    description: "এইচএসসি বিজ্ঞান ও গণিত, ধাপে ধাপে অ্যানিমেশনে। বুঝে শেখো, মুখস্থ নয়।",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9f4",
    theme_color: "#3d52d9",
    lang: "bn",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
