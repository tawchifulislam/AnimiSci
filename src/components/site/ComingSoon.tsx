import Link from "next/link";
import { HourglassIcon } from "@/components/ui/icons";

export function ComingSoon({ title, backHref, backLabel }: { title: string; backHref: string; backLabel: string }) {
  return (
    <div className="card soon">
      <span className="soon-icon">
        <HourglassIcon size={30} weight="duotone" />
      </span>
      <h2 style={{ fontSize: "1.3rem" }}>{title}</h2>
      <p className="muted">এই অংশের পাঠ তৈরি হচ্ছে। একটু ধৈর্য ধরো, শীঘ্রই আসছে।</p>
      <Link href={backHref} className="btn btn-primary">
        {backLabel}
      </Link>
    </div>
  );
}
