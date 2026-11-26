import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as gasVariables from "./gas-variables";
import * as boyle from "./boyle";
import * as charlesPressure from "./charles-pressure";

type Entry = { meta: LessonMeta; default: ComponentType };

export const gasLessons: Record<string, Entry> = {
  "gas-variables": gasVariables,
  boyle,
  "charles-pressure": charlesPressure,
};
