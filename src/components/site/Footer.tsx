import Link from "next/link";
import { subjects } from "@/data/subjects";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-col footer-brand">
          <Logo />
          <p className="muted" style={{ marginTop: "0.8rem", maxWidth: "24rem", fontSize: "0.95rem" }}>
            এইচএসসি বিজ্ঞান ও গণিত, ধাপে ধাপে অ্যানিমেশনে। বুঝে শেখো, মুখস্থ নয়।
          </p>
        </div>
        <div className="footer-col">
          <h3>বিষয়সমূহ</h3>
          <ul>
            {subjects.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h3>দ্রুত লিংক</h3>
          <ul>
            <li>
              <Link href="/">হোম</Link>
            </li>
            <li>
              <Link href="/#how">কীভাবে শেখো</Link>
            </li>
            <li>
              <Link href="/#subjects">বিষয়সমূহ</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="shell">AnimiSci · চোখে দেখে শেখো</div>
      </div>
    </footer>
  );
}
