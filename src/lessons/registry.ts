import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import { vectorLessons } from "./vector";

export type LessonEntry = { meta: LessonMeta; default: ComponentType };

/* chapter slug => (lesson slug => lesson module). Add one line per new chapter. */
export const lessonRegistry: Record<string, Record<string, LessonEntry>> = {
  vector: vectorLessons,
};
