import Link from "next/link";
import { subjects } from "@/data/subjects";

export function Footer() {
  return (
    <footer className="sx-foot">
      <div className="shell sx-foot-in">
        <div className="sx-foot-brand">
          <div className="sx-mark sx-mark-sm" aria-label="AnimiSci">
            <span>animi</span>
            <span className="sx-mark-s">sci</span>
          </div>
          <p className="sx-foot-slogan">See it. Change it. Get it.</p>
          <p className="sx-foot-note">HSC science, as living pictures.</p>
        </div>

        <div className="sx-foot-col">
          <h4>Subjects</h4>
          {subjects.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="sx-foot-link">
              <i style={{ background: s.tint }} />
              {s.en}
            </Link>
          ))}
        </div>

        <div className="sx-foot-col">
          <h4>Explore</h4>
          <Link href="/#how" className="sx-foot-link">
            How it works
          </Link>
          <Link href="/#subjects" className="sx-foot-link">
            All subjects
          </Link>
          <Link href="/physics/first/vector/addition" className="sx-foot-link">
            First lesson
          </Link>
        </div>
      </div>

      <div className="shell sx-foot-bar">
        <span>© {new Date().getFullYear()} AnimiSci</span>
        <span>Built for HSC students</span>
      </div>
    </footer>
  );
}
