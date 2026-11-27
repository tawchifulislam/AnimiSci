import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import { gasLessons } from "./gas";
import { atomLessons } from "./atom";
import { modernLessons } from "./modern";
import { energyLessons } from "./energy";
import { matterLessons } from "./matter";
import { thermoLessons } from "./thermo";
import { vectorLessons } from "./vector";

export type LessonEntry = { meta: LessonMeta; default: ComponentType };

/* chapter slug => (lesson slug => lesson module). Add one line per new chapter. */
export const lessonRegistry: Record<string, Record<string, LessonEntry>> = {
  vector: vectorLessons,
  "ideal-gas": gasLessons,
  thermodynamics: thermoLessons,
  "structural-properties": matterLessons,
  "work-energy-power": energyLessons,
  "atomic-nuclear": atomLessons,
  "modern-physics": modernLessons,
};
