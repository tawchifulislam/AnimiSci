import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as temperatureMeasurement from "./temperature-measurement";
import * as systemState from "./system-state";
import * as heatWork from "./heat-work";
import * as firstLaw from "./first-law";
import * as specificHeats from "./specific-heats";
import * as processes from "./processes";
import * as adiabatic from "./adiabatic";
import * as secondLaw from "./second-law";
import * as carnot from "./carnot";
import * as refrigerator from "./refrigerator";
import * as entropy from "./entropy";
import * as thermoPractice from "./thermo-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const thermoLessons: Record<string, Entry> = {
  "temperature-measurement": temperatureMeasurement,
  "system-state": systemState,
  "heat-work": heatWork,
  "first-law": firstLaw,
  "specific-heats": specificHeats,
  processes,
  adiabatic,
  "second-law": secondLaw,
  carnot,
  refrigerator,
  entropy,
  "thermo-practice": thermoPractice,
};
