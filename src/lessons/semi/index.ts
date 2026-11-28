import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as bandTheory from "./band-theory";
import * as doping from "./doping";
import * as pnJunction from "./pn-junction";
import * as rectifier from "./rectifier";
import * as transistor from "./transistor";
import * as logicGates from "./logic-gates";
import * as opamp from "./opamp";
import * as semiPractice from "./semi-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const semiLessons: Record<string, Entry> = {
  "band-theory": bandTheory,
  doping,
  "pn-junction": pnJunction,
  rectifier,
  transistor,
  "logic-gates": logicGates,
  opamp,
  "semi-practice": semiPractice,
};
