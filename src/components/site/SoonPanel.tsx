import type { CSSProperties } from "react";
import Link from "next/link";
import { HourglassIcon } from "@/components/ui/icons";

export function SoonPanel({ tint, backHref, backLabel }: { tint: string; backHref: string; backLabel: string }) {
  return (
    <div className="sx-soon" style={{ "--tint": tint } as CSSProperties}>
      <span className="sx-soon-ic">
        <HourglassIcon size={34} weight="duotone" />
      </span>
      <div className="sx-soon-body">
        <h2>Coming soon</h2>
        <p>এই অংশের পাঠ তৈরি হচ্ছে। একটু ধৈর্য ধরো, শীঘ্রই আসছে।</p>
        <div className="sx-soon-cta">
          <Link href={backHref} className="sx-back">
            ← {backLabel}
          </Link>
          <Link href="/physics/first/vector" className="btn btn-primary">
            Try a live chapter: Vectors
          </Link>
        </div>
      </div>
    </div>
  );
}
