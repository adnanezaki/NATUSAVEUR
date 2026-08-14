"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatPrice } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductImage } from "@/components/product/ProductImage";

export function CartDrawer() {
  const mounted = useHasMounted();
  const { items, isOpen, close, removeItem, updateQuantity, subtotal } = useCart();

  const crossSell = mounted && items[0]
    ? (() => {
        const product = getProductBySlug(items[0].slug);
        return product ? getRelatedProducts(product, 3) : [];
      })()
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-charcoal/40"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-display text-lg text-charcoal">Votre panier</h2>
              <button
                onClick={close}
                aria-label="Fermer le panier"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-charcoal/5"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {!mounted || items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-xl text-charcoal">VOTRE PANIER EST VIDE.</p>
                <p className="mt-2 font-body text-sm text-muted">
                  Découvrez nos produits et trouvez quelque chose qui vous rappelle chez vous.
                </p>
                <ButtonLink href="/food" onClick={close} className="mt-6">
                  Découvrir Food
                </ButtonLink>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-5">
                    {items.map((item) => (
                      <li key={item.productId} className="flex gap-4">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={close}
                          className="h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-sand/40"
                        >
                          <div className="relative h-full w-full">
                            <div className="absolute inset-0 bg-sand/30" />
                          </div>
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link href={`/product/${item.slug}`} onClick={close}>
                              <p className="font-body text-sm text-charcoal">{item.name}</p>
                            </Link>
                            <button
                              onClick={() => removeItem(item.productId)}
                              aria-label={`Retirer ${item.name}`}
                              className="text-muted hover:text-charcoal"
                            >
                              <X className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          {item.weight && (
                            <p className="font-body text-xs text-muted">{item.weight}</p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-charcoal/15 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                aria-label="Diminuer la quantité"
                                className="text-charcoal/70 hover:text-charcoal"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-4 text-center font-body text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                aria-label="Augmenter la quantité"
                                className="text-charcoal/70 hover:text-charcoal"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="font-body text-sm text-charcoal">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {crossSell.length > 0 && (
                    <div className="mt-8 border-t border-charcoal/10 pt-6">
                      <h3 className="mb-3 font-body text-xs uppercase tracking-[0.14em] text-muted">
                        Ajoutez encore...
                      </h3>
                      <div className="flex flex-col gap-3">
                        {crossSell.map((p) => (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            onClick={close}
                            className="flex items-center gap-3"
                          >
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                              <ProductImage product={p} showLabel={false} />
                            </div>
                            <div className="flex-1">
                              <p className="font-body text-xs text-charcoal">{p.name}</p>
                              <p className="font-body text-xs text-muted">{formatPrice(p.price)}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-charcoal/10 px-6 py-6">
                  <div className="mb-4 flex items-center justify-between font-body text-sm">
                    <span className="text-muted">Sous-total</span>
                    <span className="text-charcoal">{formatPrice(subtotal())}</span>
                  </div>
                  <p className="mb-4 font-body text-xs text-muted">
                    Livraison calculée à l&apos;étape suivante.
                  </p>
                  <ButtonLink href="/checkout" onClick={close} className="w-full">
                    Passer la commande
                  </ButtonLink>
                  <ButtonLink
                    href="/cart"
                    variant="outline"
                    onClick={close}
                    className="mt-3 w-full"
                  >
                    Voir le panier
                  </ButtonLink>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
