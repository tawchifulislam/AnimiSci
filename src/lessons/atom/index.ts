import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as rutherford from "./rutherford";
import * as bohrModel from "./bohr-model";
import * as hydrogenEnergy from "./hydrogen-energy";
import * as spectralSeries from "./spectral-series";
import * as nucleus from "./nucleus";

type Entry = { meta: LessonMeta; default: ComponentType };

export const atomLessons: Record<string, Entry> = {
  rutherford,
  "bohr-model": bohrModel,
  "hydrogen-energy": hydrogenEnergy,
  "spectral-series": spectralSeries,
  nucleus,
};
