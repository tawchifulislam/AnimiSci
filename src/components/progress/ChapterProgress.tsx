"use client";

import type { CSSProperties } from "react";
import { useProgress } from "@/lib/progress";
import { bn } from "@/lib/vec";

export function ChapterProgress({ keys, color }: { keys: string[]; color?: string }) {
  const { done } = useProgress();
  const n = keys.filter((k) => done[k]).length;
  const pct = keys.length ? Math.round((n / keys.length) * 100) : 0;
  return (
    <div className="progress" style={color ? ({ "--bar": color } as CSSProperties) : undefined}>
      <div className="progress-meta">
        <span>
          {bn(n)}/{bn(keys.length)} পাঠ শেষ
        </span>
        <span>{bn(pct)}%</span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
