import { AtomIcon, BookOpenIcon, DnaIcon, FlaskIcon, SigmaIcon } from "@/components/ui/icons";
import type { IconType } from "@/components/ui/icons";

const map: Record<string, IconType> = {
  atom: AtomIcon,
  flask: FlaskIcon,
  dna: DnaIcon,
  sigma: SigmaIcon,
};

export const subjectIcon = (name: string): IconType => map[name] ?? BookOpenIcon;
