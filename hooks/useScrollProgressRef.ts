"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Tracks scroll progress (0 → 1) of an element without triggering React
 * re-renders — consumers (R3F `useFrame` loops) read `.current` directly
 * each frame instead of subscribing to state.
 */
export function useScrollProgressRef(target: RefObject<HTMLElement | null>) {
  const progress = useRef(0);

  useEffect(() => {
    let raf = 0;

    function measure() {
      raf = 0;
      const el = target.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height || 1;
      progress.current = Math.min(1, Math.max(0, -rect.top / total));
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  return progress;
}
