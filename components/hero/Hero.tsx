"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgressRef } from "@/hooks/useScrollProgressRef";
import { Preloader } from "@/components/3d/Preloader";
import { Canvas3DFallback } from "@/components/3d/Canvas3DFallback";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <Canvas3DFallback tone="dark" />,
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useScrollProgressRef(sectionRef);

  const show3D = !prefersReduced && isTablet;

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0">
        {show3D ? (
          <Suspense fallback={<Preloader dark />}>
            <HeroScene reduced={!isDesktop} progressRef={progressRef} />
          </Suspense>
        ) : (
          <Placeholder seed="hero" tone="dark" className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-6"
      >
        <motion.p
          variants={item}
          className="mb-5 font-body text-xs uppercase tracking-[0.24em] text-sand"
        >
          Food &amp; Beauty — Afrique / Maroc
        </motion.p>
        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-5xl leading-[1.05] text-ivory sm:text-6xl md:text-7xl"
        >
          L&apos;Afrique dans
          <br />
          votre quotidien.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-md font-body text-base leading-relaxed text-ivory/75"
        >
          Découvrez une sélection de produits alimentaires et de beauté inspirés
          de l&apos;Afrique, disponibles au Maroc.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/food" size="lg">
            Découvrir Food
          </ButtonLink>
          <ButtonLink href="/beauty" variant="outline" size="lg" className="border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10">
            Découvrir Beauty
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-body text-[11px] uppercase tracking-[0.2em] text-ivory/50"
      >
        Défiler
      </motion.div>
    </section>
  );
}
