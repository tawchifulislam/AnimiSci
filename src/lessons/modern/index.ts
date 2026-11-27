import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as relativityBasics from "./relativity-basics";
import * as timeDilation from "./time-dilation";
import * as lengthMass from "./length-mass";
import * as photonQuantum from "./photon-quantum";
import * as photoelectric from "./photoelectric";
import * as photoGraph from "./photo-graph";
import * as comptonPair from "./compton-pair";
import * as deBroglie from "./de-broglie";
import * as uncertainty from "./uncertainty";
import * as modernPractice from "./modern-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const modernLessons: Record<string, Entry> = {
  "relativity-basics": relativityBasics,
  "time-dilation": timeDilation,
  "length-mass": lengthMass,
  "photon-quantum": photonQuantum,
  photoelectric,
  "photo-graph": photoGraph,
  "compton-pair": comptonPair,
  "de-broglie": deBroglie,
  uncertainty,
  "modern-practice": modernPractice,
};
