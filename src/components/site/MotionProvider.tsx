"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig, MotionGlobalConfig } from "framer-motion";
import { useReducedMotionPref } from "@/lib/motion-pref";

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionPref();

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    MotionGlobalConfig.skipAnimations = reduced;
  }, [reduced]);

  return <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>;
}
