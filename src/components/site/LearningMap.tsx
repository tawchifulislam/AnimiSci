"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ListChecksIcon, PencilSimpleIcon, PlayIcon, SlidersHorizontalIcon, TrophyIcon } from "@/components/ui/icons";
import { useReducedMotionPref } from "@/lib/motion-pref";
import { useInView } from "@/lib/use-in-view";
import { bn } from "@/lib/vec";

const stops = [
  { icon: PlayIcon, title: "দেখো", note: "ছবি এক ধাপ করে আঁকা হয়, তুমি শুধু দেখো।" },
  { icon: SlidersHorizontalIcon, title: "নাড়াও", note: "স্লাইডার টানো, ছবি আর সংখ্যা সাথে সাথে বদলায়।" },
  { icon: PencilSimpleIcon, title: "অঙ্ক", note: "সহজ সংখ্যায় একটা অঙ্ক, ধাপে ধাপে।" },
  { icon: ListChecksIcon, title: "যাচাই", note: "ছোট কুইজে বুঝলে কি না তখনই জানো।" },
  { icon: TrophyIcon, title: "বোঝা", note: "সূত্র এখন মুখস্থ নয়, তোমার নিজের।" },
];

export function LearningMap() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, 0.4);
  const reduce = useReducedMotionPref();
  const last = stops.length - 1;
  const [active, setActive] = useState(last);
  const live = seen && !reduce;

  useEffect(() => {
    if (!live) return;
    const id = setTimeout(() => setActive((a) => (a >= last ? 0 : a + 1)), active >= last ? 2800 : 1700);
    return () => clearTimeout(id);
  }, [live, active, last]);

  const shown = reduce ? last : active;

  return (
    <div className="journey" ref={ref} style={{ "--p": shown / last } as CSSProperties}>
      <div className="journey-track" aria-hidden>
        <span className="journey-fill" />
        {reduce ? null : <span className="journey-dot" />}
      </div>
      <ol className="journey-stops">
        {stops.map((s, i) => (
          <li key={s.title} className={i < shown ? "done" : i === shown ? "now" : ""}>
            <span className="jnode">
              <s.icon size={26} weight="duotone" />
            </span>
            <b>{s.title}</b>
          </li>
        ))}
      </ol>
      <div className="journey-cap" aria-live="off">
        {reduce ? (
          stops.map((s, i) => (
            <p key={s.title}>
              <b>{bn(i + 1)}.</b> {s.note}
            </p>
          ))
        ) : (
          <p key={shown}>
            <b>{bn(shown + 1)}.</b> {stops[shown].note}
          </p>
        )}
      </div>
    </div>
  );
}
