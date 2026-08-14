"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/types";
import { formatPrice, cn } from "@/lib/utils";
import { ProductImage } from "./ProductImage";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useHasMounted } from "@/hooks/useHasMounted";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const mounted = useHasMounted();
  const isWished = mounted && has(product.id);
  const outOfStock = product.stock <= 0;

  return (
    <div className="group relative flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-sand/20">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <ProductImage product={product} />
          </div>
          {product.compareAtPrice && (
            <span className="absolute left-3 top-3 bg-terracotta px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-ivory">
              Promo
            </span>
          )}
          {outOfStock && (
            <span className="absolute left-3 top-3 bg-charcoal px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-ivory">
              Rupture de stock
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label={isWished ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Heart
            className={cn("h-4 w-4", isWished ? "fill-terracotta text-terracotta" : "text-charcoal")}
            strokeWidth={1.5}
          />
        </button>
      </Link>

      <div className="mt-4 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-body text-sm text-charcoal transition-colors group-hover:text-deep-green">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 font-body text-xs text-muted">
              {product.origin} {product.originFlag} · {product.weight}
            </p>
          </div>
          {product.rating && (
            <div className="flex shrink-0 items-center gap-1 pt-0.5">
              <Star className="h-3 w-3 fill-sand-dark text-sand-dark" />
              <span className="font-body text-xs text-muted">{product.rating}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-body text-sm text-charcoal">{formatPrice(product.price)}</p>
          <button
            onClick={() => !outOfStock && addItem(product)}
            disabled={outOfStock}
            className="font-body text-[11px] uppercase tracking-[0.1em] text-deep-green underline-offset-4 hover:underline disabled:text-muted disabled:no-underline"
          >
            {outOfStock ? "Indisponible" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
