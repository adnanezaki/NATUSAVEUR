"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatPrice } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";
import { getProductBySlug, getRelatedProducts } from "@/data/products";

export default function CartPage() {
  const mounted = useHasMounted();
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const crossSell =
    mounted && items[0]
      ? (() => {
          const product = getProductBySlug(items[0].slug);
          return product ? getRelatedProducts(product, 4) : [];
        })()
      : [];

  if (mounted && items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">VOTRE PANIER EST VIDE.</h1>
        <p className="mt-3 max-w-sm font-body text-sm text-muted">
          Découvrez nos produits et trouvez quelque chose qui vous rappelle chez vous.
        </p>
        <ButtonLink href="/food" className="mt-8">
          Découvrir Food
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <h1 className="font-display text-3xl text-charcoal sm:text-4xl">Votre panier</h1>

      <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-[1fr_360px]">
        <div>
          <ul className="flex flex-col divide-y divide-charcoal/10">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-5 py-6">
                <Link
                  href={`/product/${item.slug}`}
                  className="h-28 w-28 shrink-0 overflow-hidden bg-sand/20"
                >
                  {(() => {
                    const product = getProductBySlug(item.slug);
                    return product ? (
                      <ProductImage product={product} showLabel={false} />
                    ) : (
                      <div className="h-full w-full bg-sand/40" />
                    );
                  })()}
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/product/${item.slug}`}>
                        <p className="font-body text-base text-charcoal">{item.name}</p>
                      </Link>
                      {item.weight && (
                        <p className="mt-1 font-body text-xs text-muted">{item.weight}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Retirer ${item.name}`}
                      className="text-muted hover:text-charcoal"
                    >
                      <X className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 rounded-full border border-charcoal/15 px-3 py-1.5">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        aria-label="Diminuer la quantité"
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center font-body text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        aria-label="Augmenter la quantité"
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-body text-base text-charcoal">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {crossSell.length > 0 && (
            <div className="mt-12 border-t border-charcoal/10 pt-8">
              <h2 className="mb-5 font-body text-xs uppercase tracking-[0.14em] text-muted">
                Ajoutez encore...
              </h2>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                {crossSell.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="group">
                    <div className="aspect-square overflow-hidden">
                      <ProductImage product={p} showLabel={false} />
                    </div>
                    <p className="mt-2 font-body text-xs text-charcoal group-hover:text-deep-green">
                      {p.name}
                    </p>
                    <p className="font-body text-xs text-muted">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-fit border border-charcoal/10 p-6">
          <h2 className="font-display text-lg text-charcoal">Résumé</h2>
          <div className="mt-5 flex flex-col gap-3 font-body text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Sous-total</span>
              <span className="text-charcoal">{formatPrice(subtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Livraison</span>
              <span className="text-muted">Calculée à l&apos;étape suivante</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between border-t border-charcoal/10 pt-5 font-body text-base">
            <span className="text-charcoal">Total</span>
            <span className="text-charcoal">{formatPrice(subtotal())}</span>
          </div>
          <ButtonLink href="/checkout" className="mt-6 w-full">
            Passer la commande
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
