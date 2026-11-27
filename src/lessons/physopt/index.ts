import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as waveHuygens from "./wave-huygens";
import * as interferenceBasics from "./interference-basics";
import * as youngSlit from "./young-slit";
import * as thinFilm from "./thin-film";
import * as diffractionSingle from "./diffraction-single";
import * as grating from "./grating";
import * as polarization from "./polarization";
import * as physoptPractice from "./physopt-practice";

type Entry = { meta: LessonMeta; default: ComponentType };

export const physoptLessons: Record<string, Entry> = {
  "wave-huygens": waveHuygens,
  "interference-basics": interferenceBasics,
  "young-slit": youngSlit,
  "thin-film": thinFilm,
  "diffraction-single": diffractionSingle,
  grating,
  polarization,
  "physopt-practice": physoptPractice,
};
