"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";
import { Preloader } from "@/components/3d/Preloader";
import { Canvas3DFallback } from "@/components/3d/Canvas3DFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGsapScrollProgress } from "@/hooks/useGsapScrollProgress";

const JourneyScene = dynamic(() => import("@/components/3d/JourneyScene"), {
  ssr: false,
  loading: () => <Canvas3DFallback tone="dark" />,
});

export function AfricaMoroccoStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useGsapScrollProgress(sectionRef);
  const isTablet = useMediaQuery("(min-width: 768px)");
  const prefersReduced = useReducedMotion();
  const show3D = isTablet && !prefersReduced;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-deep-green py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-sand">
              Notre trajectoire
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              De l&apos;Afrique
              <br />
              au Maroc.
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ivory/75">
              NATUSAVEUR rapproche les produits, les saveurs et les rituels
              africains du quotidien de ceux qui vivent au Maroc.
            </p>

            <div className="mt-10 flex items-center gap-6 font-body text-xs uppercase tracking-[0.14em] text-ivory/50">
              <span>Afrique</span>
              <span className="h-px w-10 bg-sand" />
              <span>Maroc</span>
              <span className="h-px w-10 bg-sand" />
              <span>Quotidien</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="aspect-square w-full overflow-hidden rounded-[2rem]">
              {show3D ? (
                <Suspense fallback={<Preloader dark />}>
                  <JourneyScene progressRef={progressRef} />
                </Suspense>
              ) : (
                <Placeholder seed="africa-morocco" tone="dark" />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
