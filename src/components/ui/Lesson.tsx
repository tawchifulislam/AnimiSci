"use client";

import type { ReactNode } from "react";
import { VideoLesson } from "@/components/lesson/VideoLesson";

export type LessonStep = { title: string; text: string; tex?: string[]; note?: string };

export function Lesson({
  steps,
  figure,
  extra,
  extraFrom,
  onStep,
}: {
  steps: LessonStep[];
  figure: (step: number) => ReactNode;
  extra?: ReactNode;
  extraFrom?: number;
  onStep?: (step: number) => void;
}) {
  const below = extra ? (
    <div className="try">
      <p className="try-title">নিজে বদলে দেখো</p>
      {extra}
    </div>
  ) : undefined;

  return <VideoLesson steps={steps} figure={figure} below={below} onStep={onStep} focusStep={extraFrom} />;
}
