"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { useHasMounted } from "@/hooks/useHasMounted";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";

export default function WishlistPage() {
  const mounted = useHasMounted();
  const { productIds } = useWishlist();
  const items = mounted ? products.filter((p) => productIds.includes(p.id)) : [];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Mon compte</p>
      <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">Mes favoris</h1>

      {mounted && items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="font-body text-sm text-muted">Vous n&apos;avez pas encore de favoris.</p>
          <ButtonLink href="/shop" className="mt-6">
            Découvrir la boutique
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
