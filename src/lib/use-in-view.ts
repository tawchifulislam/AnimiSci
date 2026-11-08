import { useEffect, useState, type RefObject } from "react";

export function useInView(ref: RefObject<Element | null>, threshold = 0.3) {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return seen;
}
