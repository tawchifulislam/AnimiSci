import Link from "next/link";
import { ContinueCard } from "@/components/progress/ContinueCard";
import { HeroDemo } from "@/components/site/HeroDemo";
import { LearningMap } from "@/components/site/LearningMap";
import { SubjectCard } from "@/components/site/SubjectCard";
import { subjectIcon } from "@/components/site/subject-icons";
import { isSubjectLive } from "@/data/chapters";
import { subjects } from "@/data/subjects";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="pill">এইচএসসি বিজ্ঞান</span>
            <h1 className="h1">
              নেড়ে দেখো,
              <br />
              <span className="accent">বুঝে</span> যাবে।
            </h1>
            <p className="lead">
              পদার্থ, রসায়ন, জীব ও উচ্চতর গণিতের প্রতিটি সূত্র একেকটা জীবন্ত ছবি। স্লাইডার টানো, ছবি বদলাবে, সূত্র নিজেই বেরিয়ে আসবে।
            </p>
            <div className="cta-row">
              <Link href="/physics" className="btn btn-primary">
                পদার্থবিজ্ঞান শুরু করো
              </Link>
              <Link href="#subjects" className="btn btn-ghost">
                সব বিষয় দেখো
              </Link>
            </div>
            <ContinueCard />
            <p className="hero-links">
              <span>ধাপে ধাপে ছবি</span>
              <span>নিজে নেড়ে দেখা</span>
              <span>ছোট কুইজ</span>
            </p>
          </div>
          <HeroDemo />
        </div>
      </section>

      <section id="subjects" className="shell section">
        <div className="section-head">
          <p className="eyebrow">বিষয়সমূহ</p>
          <h2 className="h2">চার বিষয়, একই ঢঙে</h2>
        </div>
        <div className="subject-grid">
          {subjects.map((s) => {
            const live = isSubjectLive(s.slug);
            return (
              <div key={s.slug} className="reveal">
                <SubjectCard
                  href={`/${s.slug}`}
                  title={s.name}
                  sub={s.en}
                  blurb={s.blurb}
                  color={s.color}
                  icon={subjectIcon(s.icon)}
                  status={live ? "চালু" : "শীঘ্রই"}
                  live={live}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section id="how" className="shell section">
        <div className="section-head">
          <p className="eyebrow">যাত্রাপথ</p>
          <h2 className="h2">প্রতিটি পাঠ এই পথ ধরে চলে</h2>
        </div>
        <LearningMap />
      </section>

      <section className="shell section" style={{ paddingTop: 0 }}>
        <div className="cta-panel">
          <div className="cta-inner">
            <h2 className="h2">প্রথম সূত্রটা নেড়ে দেখো</h2>
            <p>এক মিনিট লাগবে। একটা স্লাইডার টানলেই বুঝবে, মুখস্থ করার দরকার ছিল না।</p>
            <Link href="/physics/first/vector/addition" className="btn btn-light">
              ভেক্টরের যোগ দিয়ে শুরু
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
