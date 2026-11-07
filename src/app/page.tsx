import Link from "next/link";
import { ContinueCard } from "@/components/progress/ContinueCard";
import { HeroArt } from "@/components/site/HeroArt";
import { SubjectCard } from "@/components/site/SubjectCard";
import { subjectIcon } from "@/components/site/subject-icons";
import { ListChecksIcon, PencilSimpleIcon, PlayIcon, SlidersHorizontalIcon } from "@/components/ui/icons";
import type { IconType } from "@/components/ui/icons";
import { subjects } from "@/data/subjects";
import { isSubjectLive } from "@/data/chapters";
import { bn } from "@/lib/vec";

const loop: { icon: IconType; title: string; text: string }[] = [
  { icon: PlayIcon, title: "দেখো", text: "প্রতিটি ধারণা কীভাবে তৈরি হয়, তা চোখের সামনে এক ধাপ করে আঁকা হয়।" },
  { icon: SlidersHorizontalIcon, title: "বদলাও", text: "স্লাইডার টেনে সংখ্যা বদলাও, ফল কীভাবে বদলায় নিজের চোখে দেখো।" },
  { icon: PencilSimpleIcon, title: "অঙ্ক করো", text: "কঠিন শব্দ ছাড়া, রোজকার উদাহরণ দিয়ে ধাপে ধাপে অঙ্ক বোঝানো।" },
  { icon: ListChecksIcon, title: "যাচাই করো", text: "ছোট কুইজ দিয়ে বুঝলে কি না তখনই জেনে নাও।" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="pill">এইচএসসি · বিজ্ঞান ও গণিত</span>
            <h1 className="h1">
              বিজ্ঞান ও গণিত,
              <br />
              <span className="accent">চোখে দেখে শেখো</span>
            </h1>
            <p className="lead">পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও উচ্চতর গণিতের প্রতিটি ধারণা অ্যানিমেশনে, ধাপে ধাপে, সহজ বাংলায়।</p>
            <div className="cta-row">
              <Link href="#subjects" className="btn btn-primary">
                বিষয় দেখো
              </Link>
              <Link href="#how" className="btn btn-ghost">
                কীভাবে শেখো
              </Link>
            </div>
            <ContinueCard />
            <p className="hero-links">
              <span>ধাপে ধাপে অ্যানিমেশন</span>
              <span>নিজে বদলে দেখা</span>
              <span>ছোট কুইজ</span>
            </p>
          </div>
          <HeroArt />
        </div>
      </section>

      <section id="subjects" className="shell section">
        <div className="section-head">
          <p className="eyebrow">বিষয়সমূহ</p>
          <h2 className="h2">চারটি বিষয়, একই পদ্ধতিতে</h2>
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
          <p className="eyebrow">শেখার পদ্ধতি</p>
          <h2 className="h2">প্রতিটি পাঠ চার ধাপে</h2>
        </div>
        <ol className="loop-grid">
          {loop.map((f, i) => (
            <li key={f.title} className="loop-card reveal">
              <span className="loop-num" aria-hidden>
                {bn(i + 1)}
              </span>
              <span className="loop-icon">
                <f.icon size={24} weight="duotone" />
              </span>
              <div>
                <h3 className="loop-title">{f.title}</h3>
                <p className="loop-text">{f.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell section" style={{ paddingTop: 0 }}>
        <div className="cta-panel reveal">
          <div className="cta-inner">
            <h2 className="h2">বুঝে শেখার যাত্রা শুরু করো</h2>
            <p>একটা বিষয় বেছে নাও, অ্যানিমেশন দেখো, নিজে সংখ্যা বদলাও। সূত্র আর মুখস্থ করতে হবে না।</p>
            <Link href="#subjects" className="btn btn-light">
              বিষয় দেখো
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
