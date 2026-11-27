import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as intermolecular from "./intermolecular";
import * as stressStrain from "./stress-strain";
import * as hookeGraph from "./hooke-graph";
import * as elasticModuli from "./elastic-moduli";
import * as moduliRelations from "./moduli-relations";
import * as elasticEnergy from "./elastic-energy";
import * as surfaceTension from "./surface-tension";
import * as surfaceEnergy from "./surface-energy";
import * as capillary from "./capillary";
import * as viscosity from "./viscosity";
import * as continuity from "./continuity";
import * as bernoulli from "./bernoulli";
import * as matterPractice from "./matter-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const matterLessons: Record<string, Entry> = {
  intermolecular,
  "stress-strain": stressStrain,
  "hooke-graph": hookeGraph,
  "elastic-moduli": elasticModuli,
  "moduli-relations": moduliRelations,
  "elastic-energy": elasticEnergy,
  "surface-tension": surfaceTension,
  "surface-energy": surfaceEnergy,
  capillary,
  viscosity,
  continuity,
  bernoulli,
  "matter-practice": matterPractice,
};
