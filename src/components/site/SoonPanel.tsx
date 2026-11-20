import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Hourglass } from "lucide-react";

export function SoonPanel({ tint, backHref, backLabel }: { tint: string; backHref: string; backLabel: string }) {
  return (
    <div className="sx-soon" style={{ "--tint": tint } as CSSProperties}>
      <span className="sx-soon-ic">
        <Hourglass size={34} strokeWidth={1.8} aria-hidden />
      </span>
      <div className="sx-soon-body">
        <h2>Coming soon</h2>
        <p>এই অংশের কাজ চলছে।</p>
        <div className="sx-soon-cta">
          <Link href={backHref} className="sx-back">
            <ArrowLeft size={16} aria-hidden /> {backLabel}
          </Link>
          <Link href="/physics/first/vector" className="btn btn-primary">
            Try a live chapter: Vectors
          </Link>
        </div>
      </div>
    </div>
  );
}
