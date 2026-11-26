import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as temperatureMeasurement from "./temperature-measurement";
import * as systemState from "./system-state";
import * as heatWork from "./heat-work";
import * as firstLaw from "./first-law";

type Entry = { meta: LessonMeta; default: ComponentType };

export const thermoLessons: Record<string, Entry> = {
  "temperature-measurement": temperatureMeasurement,
  "system-state": systemState,
  "heat-work": heatWork,
  "first-law": firstLaw,
};
