"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
