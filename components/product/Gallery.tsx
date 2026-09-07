"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/types";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

export function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const images = product.images.length > 0 ? product.images : [product.id];

  function next() {
    setActive((a) => (a + 1) % images.length);
  }
  function prev() {
    setActive((a) => (a - 1 + images.length) % images.length);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!fullscreen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setFullscreen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreen, images.length]);

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden bg-sand/20 border border-charcoal/10 rounded-sm">
        <button
          onClick={() => setFullscreen(true)}
          className="group relative block h-full w-full overflow-hidden"
          aria-label="Agrandir l'image"
        >
          <ProductImage product={product} index={active} showLabel={false} />
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-charcoal opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 text-charcoal backdrop-blur-xs transition-all hover:bg-ivory hover:scale-105 shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 text-charcoal backdrop-blur-xs transition-all hover:bg-ivory hover:scale-105 shadow-xs"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
            <div className="absolute top-3 right-3 rounded-full bg-charcoal/70 px-2.5 py-0.5 font-body text-[11px] text-ivory backdrop-blur-xs">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
          {images.map((imgSrc, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden border-2 transition-all rounded-xs bg-sand/15",
                active === i
                  ? "border-deep-green ring-1 ring-deep-green"
                  : "border-charcoal/10 opacity-70 hover:opacity-100"
              )}
              aria-label={`Voir l'image ${i + 1}`}
            >
              <ProductImage product={product} index={i} showLabel={false} />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-6"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setFullscreen(false)}
              aria-label="Fermer"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Image précédente"
                  className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  onClick={next}
                  aria-label="Image suivante"
                  className="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
                  style={{ right: "5.5rem" }}
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </>
            )}
            <div className="aspect-square w-full max-w-xl overflow-hidden rounded-sm bg-sand/20">
              <ProductImage product={product} index={active} showLabel={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

