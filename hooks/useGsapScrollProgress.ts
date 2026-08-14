"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * GSAP ScrollTrigger-backed scroll progress (0 → 1) for a section, exposed
 * as a mutable ref so R3F `useFrame` loops can read it without React
 * re-renders driving the animation.
 */
export function useGsapScrollProgress(target: RefObject<HTMLElement | null>) {
  const progress = useRef(0);

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    const el = target.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [target]);

  return progress;
}
