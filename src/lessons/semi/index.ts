import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as bandTheory from "./band-theory";
import * as doping from "./doping";
import * as pnJunction from "./pn-junction";
import * as rectifier from "./rectifier";

type Entry = { meta: LessonMeta; default: ComponentType };

export const semiLessons: Record<string, Entry> = {
  "band-theory": bandTheory,
  doping,
  "pn-junction": pnJunction,
  rectifier,
};
