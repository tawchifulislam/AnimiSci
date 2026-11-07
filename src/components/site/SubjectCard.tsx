import Link from "next/link";
import type { CSSProperties } from "react";
import type { IconType } from "@/components/ui/icons";

export function SubjectCard({
  href,
  title,
  sub,
  blurb,
  color,
  icon: Icon,
  status,
  live,
  cta = "খুলে দেখো",
}: {
  href: string;
  title: string;
  sub?: string;
  blurb?: string;
  color: string;
  icon: IconType;
  status: string;
  live: boolean;
  cta?: string;
}) {
  return (
    <Link href={href} className="subject-card lift" style={{ "--sc": color } as CSSProperties}>
      <span className="subject-ico" aria-hidden>
        <Icon size={26} weight="duotone" />
      </span>
      <span className="subject-main">
        <span className="subject-top">
          <h3 className="subject-name">{title}</h3>
          <span className={`status${live ? " live" : ""}`}>{status}</span>
        </span>
        {sub ? <span className="subject-en">{sub}</span> : null}
        {blurb ? <span className="subject-blurb">{blurb}</span> : null}
        <span className="subject-foot">{cta}</span>
      </span>
    </Link>
  );
}
