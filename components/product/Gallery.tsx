"use client";

import { useState } from "react";
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

  return (
    <div>
      <button
        onClick={() => setFullscreen(true)}
        className="group relative block aspect-square w-full overflow-hidden bg-sand/20"
        aria-label="Agrandir l'image"
      >
        <ProductImage product={product} index={active} showLabel={false} />
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "aspect-square overflow-hidden border transition-colors",
                active === i ? "border-charcoal" : "border-transparent"
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
            <div className="aspect-square w-full max-w-xl overflow-hidden">
              <ProductImage product={product} index={active} showLabel={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
