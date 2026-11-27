import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as work from "./work";
import * as variableForce from "./variable-force";
import * as workEnergyTheorem from "./work-energy-theorem";
import * as potentialEnergy from "./potential-energy";
import * as conservativeForces from "./conservative-forces";
import * as energyConservation from "./energy-conservation";
import * as power from "./power";
import * as efficiency from "./efficiency";
import * as massEnergy from "./mass-energy";
import * as energyPractice from "./energy-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const energyLessons: Record<string, Entry> = {
  work,
  "variable-force": variableForce,
  "work-energy-theorem": workEnergyTheorem,
  "potential-energy": potentialEnergy,
  "conservative-forces": conservativeForces,
  "energy-conservation": energyConservation,
  power,
  efficiency,
  "mass-energy": massEnergy,
  "energy-practice": energyPractice,
};
