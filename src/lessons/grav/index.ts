import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as newtonGravitation from "./newton-gravitation";
import * as gVariation from "./g-variation";
import * as fieldPotential from "./field-potential";
import * as escapeOrbit from "./escape-orbit";
import * as satelliteMotion from "./satellite-motion";
import * as keplerLaws from "./kepler-laws";
import * as weightlessness from "./weightlessness";
import * as gravPractice from "./grav-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const gravLessons: Record<string, Entry> = {
  "newton-gravitation": newtonGravitation,
  "g-variation": gVariation,
  "field-potential": fieldPotential,
  "escape-orbit": escapeOrbit,
  "satellite-motion": satelliteMotion,
  "kepler-laws": keplerLaws,
  weightlessness,
  "grav-practice": gravPractice,
};
