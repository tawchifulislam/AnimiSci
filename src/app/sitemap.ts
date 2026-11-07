import type { MetadataRoute } from "next";
import { papers, subjects } from "@/data/subjects";
import { getChapters } from "@/data/chapters";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const urls = ["/"];
  for (const s of subjects) {
    urls.push(`/${s.slug}`);
    for (const p of papers) {
      urls.push(`/${s.slug}/${p.slug}`);
      for (const c of getChapters(s.slug, p.slug)) {
        urls.push(`/${s.slug}/${p.slug}/${c.slug}`);
        for (const l of c.lessons) urls.push(`/${s.slug}/${p.slug}/${c.slug}/${l.slug}`);
      }
    }
  }
  return urls.map((u) => ({ url: `${base}${u}`, lastModified: new Date() }));
}
