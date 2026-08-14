"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { Preloader } from "@/components/3d/Preloader";
import { Canvas3DFallback } from "@/components/3d/Canvas3DFallback";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const UniverseToggleScene = dynamic(() => import("@/components/3d/UniverseToggleScene"), {
  ssr: false,
  loading: () => <Canvas3DFallback tone="dark" />,
});

export function FoodBeautySplit() {
  const [active, setActive] = useState<"food" | "beauty">("food");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const prefersReduced = useReducedMotion();
  const show3D = isTablet && !prefersReduced;

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-2">
      {show3D && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Suspense fallback={<Preloader dark />}>
            <UniverseToggleScene active={active} />
          </Suspense>
        </div>
      )}

      <Reveal>
        <div
          onMouseEnter={() => setActive("food")}
          onFocus={() => setActive("food")}
          className="group relative flex h-[70vh] min-h-[480px] flex-col justify-end overflow-hidden"
        >
          {!show3D && (
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <Placeholder seed="food-universe" tone="food" />
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-opacity duration-500",
              show3D && active !== "food" && "opacity-70"
            )}
          />
          <div className="relative z-10 p-8 md:p-12">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-sand">Food</p>
            <h3 className="mt-3 font-display text-3xl text-ivory md:text-4xl">
              Les saveurs de chez nous
            </h3>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ivory/80">
              Une sélection de produits africains authentiques pour retrouver
              les saveurs qui nous sont familières.
            </p>
            <ButtonLink href="/food" variant="secondary" className="mt-6">
              Découvrir Food
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          onMouseEnter={() => setActive("beauty")}
          onFocus={() => setActive("beauty")}
          className="group relative flex h-[70vh] min-h-[480px] flex-col justify-end overflow-hidden"
        >
          {!show3D && (
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <Placeholder seed="beauty-universe" tone="beauty" />
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-opacity duration-500",
              show3D && active !== "beauty" && "opacity-70"
            )}
          />
          <div className="relative z-10 p-8 md:p-12">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-sand">Beauty</p>
            <h3 className="mt-3 font-display text-3xl text-ivory md:text-4xl">
              Rituels de beauté africains
            </h3>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ivory/80">
              Des soins et ingrédients inspirés des traditions et rituels de
              beauté africains.
            </p>
            <ButtonLink href="/beauty" variant="primary" className="mt-6">
              Découvrir Beauty
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
