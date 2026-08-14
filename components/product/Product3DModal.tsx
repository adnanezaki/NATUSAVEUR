"use client";

import { useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Box, X, Rotate3d, RotateCcw } from "lucide-react";
import type { Product } from "@/data/types";
import { Preloader } from "@/components/3d/Preloader";
import { Canvas3DFallback } from "@/components/3d/Canvas3DFallback";
import type { ProductViewerHandle } from "@/components/3d/ProductViewer3D";

const ProductViewer3D = dynamic(
  () => import("@/components/3d/ProductViewer3D").then((m) => m.ProductViewer3D),
  { ssr: false, loading: () => <Canvas3DFallback tone="dark" /> }
);

export function Product3DModal({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const viewerRef = useRef<ProductViewerHandle>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 flex items-center gap-2 border border-charcoal/20 px-5 py-3 font-body text-xs uppercase tracking-[0.1em] text-charcoal transition-colors hover:border-charcoal"
      >
        <Box className="h-4 w-4" strokeWidth={1.5} />
        Explorer en 3D
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-charcoal/95"
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse 3D"
          >
            <div className="flex items-center justify-between p-6">
              <p className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.14em] text-ivory/60">
                <Rotate3d className="h-4 w-4" strokeWidth={1.5} />
                Glissez pour faire pivoter · molette pour zoomer
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => viewerRef.current?.reset()}
                  aria-label="Réinitialiser la vue"
                  className="flex h-10 items-center gap-2 rounded-full bg-ivory/10 px-4 text-ivory hover:bg-ivory/20"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-body text-xs uppercase tracking-[0.08em]">Réinitialiser</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer la visionneuse 3D"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
            <div className="relative flex-1">
              <Suspense fallback={<Preloader dark />}>
                <ProductViewer3D ref={viewerRef} category={product.category} />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
