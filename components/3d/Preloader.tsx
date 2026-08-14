"use client";

import { useProgress } from "@react-three/drei";
import { cn } from "@/lib/utils";

export function Preloader({ dark = true, className }: { dark?: boolean; className?: string }) {
  const { progress } = useProgress();

  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex flex-col items-center justify-center",
        dark ? "bg-charcoal" : "bg-ivory",
        className
      )}
      aria-hidden="true"
    >
      <p
        className={cn(
          "font-display text-sm tracking-[0.4em]",
          dark ? "text-ivory/80" : "text-charcoal/80"
        )}
      >
        NATUSAVEUR
      </p>
      <div
        className={cn(
          "mt-6 h-px w-28 overflow-hidden",
          dark ? "bg-ivory/15" : "bg-charcoal/15"
        )}
      >
        <div
          className="h-full bg-sand-dark transition-[width] duration-200 ease-out"
          style={{ width: `${Math.round(progress)}%` }}
        />
      </div>
    </div>
  );
}
