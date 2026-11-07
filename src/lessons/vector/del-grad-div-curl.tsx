"use client";

import type { LessonMeta } from "@/lessons/types";

export const meta: LessonMeta = {
  goal: "",
  hook: "",
  formulas: [],
  example: { problem: "", steps: [] },
  mistakes: [],
  quiz: [],
};

export default function Anim() {
  return <p className="text-sm">শীঘ্রই আসছে</p>;
}
