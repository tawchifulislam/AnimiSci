import Link from "next/link";
import type { CSSProperties } from "react";
import { subjects } from "@/data/subjects";
import { SubjectArt } from "./SubjectArt";

export function HeroArt() {
  const columns = [subjects.filter((_, i) => i % 2 === 0), subjects.filter((_, i) => i % 2 === 1)];
  return (
    <div className="showcase">
      {columns.map((col, c) => (
        <div key={c} className="show-col">
          {col.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="show-tile lift" style={{ "--sc": s.color } as CSSProperties}>
              <div className="subject-art" aria-hidden>
                <SubjectArt kind={s.icon} />
              </div>
              <div className="show-label">
                <strong>{s.name}</strong>
                <small>{s.en}</small>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
