import type { ComponentType } from "react";

export type IconProps = {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
};
export type IconType = ComponentType<IconProps>;

export {
  AtomIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  DnaIcon,
  FlaskIcon,
  HourglassIcon,
  LightbulbIcon,
  ListChecksIcon,
  ListIcon,
  LockSimpleIcon,
  PauseIcon,
  PencilSimpleIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SigmaIcon,
  SlidersHorizontalIcon,
  TargetIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
