import type { CSSProperties } from "react";
import Link from "next/link";
import { ContinueCard } from "@/components/progress/ContinueCard";
import { LessonPeek } from "@/components/site/LessonPeek";
import { Marquee } from "@/components/site/Marquee";
import { StickerIcon } from "@/components/site/StickerIcon";
import { isSubjectLive } from "@/data/chapters";
import { subjects } from "@/data/subjects";

const steps = [
  { name: "দেখো", line: "ভিডিওর মতো অ্যানিমেশন, ধাপে ধাপে", tint: "#9ccbff", tilt: "-1.2deg" },
  { name: "সূত্র", line: "যা দেখলে, তা থেকেই সূত্র আসে", tint: "#ffe27a", tilt: "1deg" },
  { name: "ভাবো", line: "পরিস্থিতি পড়ে নিজে ভাবো", tint: "#e9ccff", tilt: "-0.8deg" },
  { name: "কুইজ", line: "পাঁচটি MCQ, ভুলের কারণসহ", tint: "#8be6bb", tilt: "1.2deg" },
  { name: "অঙ্ক", line: "সহজ থেকে কঠিন, ধাপে ধাপে", tint: "#ffb9a3", tilt: "-1deg" },
];

const tilts = ["-1deg", "1deg", "1deg", "-1deg"];

export default function Home() {
  return (
    <>
      <Marquee />

      <section className="sx-hero">
        <div className="shell sx-hero-grid">
          <div className="hero-copy">
            <span className="pill">HSC Science</span>
            <h1 className="sx-title">
              <span>See it.</span>
              <span>Change it.</span>
              <span>
                <b className="sx-hl">Get it.</b>
              </span>
            </h1>
            <p className="sx-sub">Learn HSC science by watching it work.</p>
            <p className="lead">
              পদার্থ, রসায়ন, জীব ও উচ্চতর গণিতের প্রতিটি সূত্র একেকটা জীবন্ত ছবি। স্লাইডার টানো, ছবি বদলাবে, সূত্র নিজেই বেরিয়ে আসবে।
            </p>
            <div className="cta-row">
              <Link href="/physics" className="btn btn-primary">
                Start Physics
              </Link>
              <Link href="#subjects" className="btn btn-ghost">
                All subjects
              </Link>
            </div>
            <ContinueCard />
          </div>

          <div className="sx-art">
            <span className="sx-disc" />
            <img src="/assets/animations/STUDENT.svg" alt="বই পড়ছে এক শিক্ষার্থী, মাথার ওপর বিজ্ঞানের ধারণা" decoding="async" />
            <span className="sx-sticker sx-s1">
              <StickerIcon kind="atom" />
            </span>
            <span className="sx-sticker sx-s2">
              <StickerIcon kind="flask" />
            </span>
            <span className="sx-sticker sx-s3">
              <StickerIcon kind="dna" />
            </span>
            <span className="sx-sticker sx-s4">
              <StickerIcon kind="sigma" />
            </span>
          </div>
        </div>
      </section>

      <section id="how" className="sx-band">
        <div className="shell section">
          <div className="section-head">
            <p className="eyebrow">At a glance</p>
            <h2 className="h2 sx-h2">Watch it. The formula follows.</h2>
          </div>
          <LessonPeek />
        </div>
      </section>

      <section id="subjects" className="sx-band sx-band-a">
        <div className="shell section">
          <div className="section-head">
            <p className="eyebrow">Subjects</p>
            <h2 className="h2 sx-h2">Four subjects, one style.</h2>
          </div>
          <div className="sx-cards">
            {subjects.map((s, i) => {
              const live = isSubjectLive(s.slug);
              const style = { "--tint": s.tint, "--tilt": tilts[i % tilts.length] } as CSSProperties;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="sx-card" style={style}>
                  <span className="sx-card-ic">
                    <StickerIcon kind={s.icon} />
                  </span>
                  <span className="sx-card-body">
                    <h3>{s.en}</h3>
                    <small>{s.name}</small>
                    <p>{s.blurb}</p>
                    <span className="sx-card-foot">
                      <span className="sx-chip">{live ? "Live" : "Soon"}</span>
                      <span className="sx-go">{live ? "Start →" : "Coming soon →"}</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sx-band sx-band-b">
        <div className="shell section">
          <div className="section-head">
            <p className="eyebrow">Every lesson</p>
            <h2 className="h2 sx-h2">Five steps to get it.</h2>
          </div>
          <div className="sx-steps">
            {steps.map((st, i) => (
              <div key={st.name} className="sx-step" style={{ "--tint": st.tint, "--tilt": st.tilt } as CSSProperties}>
                <span className="sx-step-no">{["১", "২", "৩", "৪", "৫"][i]}</span>
                <h3>{st.name}</h3>
                <p>{st.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sx-final">
        <div className="shell sx-final-inner">
          <div className="sx-mark" aria-label="AnimiSci">
            <span>animi</span>
            <span className="sx-mark-s">sci</span>
          </div>
          <p>প্রথম সূত্রটা নিজের চোখে দেখো। এক মিনিট লাগবে। একটা স্লাইডার টানলেই বুঝবে, মুখস্থ করার দরকার ছিল না।</p>
          <Link href="/physics/first/vector/addition" className="btn btn-primary">
            Start with Vectors
          </Link>
        </div>
      </section>
    </>
  );
}
