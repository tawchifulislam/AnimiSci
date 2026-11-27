import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as stressStrain from "./stress-strain";
import * as hookeGraph from "./hooke-graph";
import * as elasticModuli from "./elastic-moduli";
import * as elasticEnergy from "./elastic-energy";

type Entry = { meta: LessonMeta; default: ComponentType };

export const matterLessons: Record<string, Entry> = {
  "stress-strain": stressStrain,
  "hooke-graph": hookeGraph,
  "elastic-moduli": elasticModuli,
  "elastic-energy": elasticEnergy,
};
