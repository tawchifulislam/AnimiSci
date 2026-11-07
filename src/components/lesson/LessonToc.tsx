"use client";

import { useEffect, useState } from "react";

export function LessonToc({ items }: { items: { id: string; label: string }[] }) {
  const ids = items.map((i) => i.id).join(",");
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => e !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ids]);

  return (
    <nav aria-label="পাঠের অংশ" className="toc">
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} aria-current={it.id === active}>
          {it.label}
        </a>
      ))}
    </nav>
  );
}
