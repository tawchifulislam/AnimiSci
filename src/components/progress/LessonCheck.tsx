"use client";

import { CheckCircleIcon } from "@/components/ui/icons";
import { useProgress } from "@/lib/progress";

export function LessonCheck({ k }: { k: string }) {
  const { done } = useProgress();
  if (!done[k]) return null;
  return (
    <span className="check" aria-label="শেষ হয়েছে" role="img">
      <CheckCircleIcon size={24} weight="fill" />
    </span>
  );
}
