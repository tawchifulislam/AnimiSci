import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as scalarVector from "./scalar-vector";
import * as addition from "./addition";
import * as unitVector from "./unit-vector";
import * as perpendicularComponents from "./perpendicular-components";
import * as sineRuleResolution from "./sine-rule-resolution";
import * as riverBoat from "./river-boat";
import * as relativeVelocity from "./relative-velocity";
import * as dotProduct from "./dot-product";
import * as crossProduct from "./cross-product";
import * as delGradDivCurl from "./del-grad-div-curl";

type Entry = { meta: LessonMeta; default: ComponentType };

export const vectorLessons: Record<string, Entry> = {
  "scalar-vector": scalarVector,
  addition,
  "unit-vector": unitVector,
  "perpendicular-components": perpendicularComponents,
  "sine-rule-resolution": sineRuleResolution,
  "river-boat": riverBoat,
  "relative-velocity": relativeVelocity,
  "dot-product": dotProduct,
  "cross-product": crossProduct,
  "del-grad-div-curl": delGradDivCurl,
};
