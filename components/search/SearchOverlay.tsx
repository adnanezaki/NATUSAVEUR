"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";
import { stories } from "@/data/stories";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product/ProductImage";
import { trackEvent } from "@/lib/analytics";

export function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { productResults: [], storyResults: [] };

    const productResults = products
      .filter((p) =>
        [p.name, p.category, p.subcategory, p.origin, ...(p.tags ?? []), ...(p.ingredients ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 8);

    const storyResults = stories
      .filter((s) => [s.title, s.category, s.excerpt].join(" ").toLowerCase().includes(q))
      .slice(0, 4);

    return { productResults, storyResults };
  }, [query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const timeout = setTimeout(() => trackEvent("search", { query: q }), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const hasQuery = query.trim().length >= 2;
  const hasResults = results.productResults.length > 0 || results.storyResults.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-ivory/98 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Rechercher"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 pt-24 pb-10 md:pt-32">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 border-b border-charcoal/20 pb-3">
                <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="attiéké, karité, akpi..."
                  className="w-full bg-transparent font-display text-2xl text-charcoal placeholder:text-muted/50 focus:outline-none md:text-3xl"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer la recherche"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-charcoal/5"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-10 flex-1 overflow-y-auto">
              {!hasQuery && (
                <p className="font-body text-sm text-muted">
                  Recherchez un produit, une catégorie ou une origine.
                </p>
              )}

              {hasQuery && !hasResults && (
                <div className="py-10 text-center">
                  <p className="font-display text-xl text-charcoal">AUCUN RÉSULTAT.</p>
                  <p className="mt-2 font-body text-sm text-muted">Essayez un autre mot-clé.</p>
                </div>
              )}

              {results.productResults.length > 0 && (
                <div className="mb-10">
                  <h3 className="mb-4 font-body text-xs uppercase tracking-[0.14em] text-muted">
                    Produits
                  </h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {results.productResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        onClick={onClose}
                        className="group"
                      >
                        <div className="aspect-square overflow-hidden rounded-sm">
                          <ProductImage product={p} showLabel={false} />
                        </div>
                        <p className="mt-2 font-body text-sm text-charcoal group-hover:text-deep-green">
                          {p.name}
                        </p>
                        <p className="font-body text-xs text-muted">{formatPrice(p.price)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.storyResults.length > 0 && (
                <div>
                  <h3 className="mb-4 font-body text-xs uppercase tracking-[0.14em] text-muted">
                    Stories
                  </h3>
                  <div className="flex flex-col gap-3">
                    {results.storyResults.map((s) => (
                      <Link
                        key={s.id}
                        href={`/stories/${s.slug}`}
                        onClick={onClose}
                        className="font-body text-sm text-charcoal link-underline"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
