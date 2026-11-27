import type { ComponentType } from "react";
import type { LessonMeta } from "@/lessons/types";
import * as waveHuygens from "./wave-huygens";
import * as interferenceBasics from "./interference-basics";
import * as youngSlit from "./young-slit";
import * as thinFilm from "./thin-film";

type Entry = { meta: LessonMeta; default: ComponentType };

export const physoptLessons: Record<string, Entry> = {
  "wave-huygens": waveHuygens,
  "interference-basics": interferenceBasics,
  "young-slit": youngSlit,
  "thin-film": thinFilm,
};
