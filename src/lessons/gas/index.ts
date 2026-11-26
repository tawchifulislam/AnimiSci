import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as gasVariables from "./gas-variables";
import * as boyle from "./boyle";
import * as charlesPressure from "./charles-pressure";
import * as idealGasEq from "./ideal-gas-eq";
import * as realGas from "./real-gas";
import * as kineticPressure from "./kinetic-pressure";
import * as kineticTemperature from "./kinetic-temperature";
import * as equipartition from "./equipartition";
import * as humidity from "./humidity";
import * as gasPractice from "./gas-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const gasLessons: Record<string, Entry> = {
  "gas-variables": gasVariables,
  boyle,
  "charles-pressure": charlesPressure,
  "ideal-gas-eq": idealGasEq,
  "real-gas": realGas,
  "kinetic-pressure": kineticPressure,
  "kinetic-temperature": kineticTemperature,
  equipartition,
  humidity,
  "gas-practice": gasPractice,
};
