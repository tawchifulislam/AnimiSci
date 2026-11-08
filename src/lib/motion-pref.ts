import { useSyncExternalStore } from "react";

function query(q: string) {
  return {
    subscribe: (cb: () => void) => {
      const m = window.matchMedia(q);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    get: () => window.matchMedia(q).matches,
  };
}

const reduced = query("(prefers-reduced-motion: reduce)");
const wide = query("(min-width: 48rem)");

export const useReducedMotionPref = () => useSyncExternalStore(reduced.subscribe, reduced.get, () => false);
export const useWide = () => useSyncExternalStore(wide.subscribe, wide.get, () => false);
