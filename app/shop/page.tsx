import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop — Tous les produits NATUSAVEUR",
  description: "Produits africains alimentaires et de beauté, sélectionnés pour vous au Maroc.",
};

export default function ShopPage() {
  return (
    <div className="pt-32">
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Boutique</p>
        <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">Shop NATUSAVEUR</h1>
      </div>
      <Suspense fallback={null}>
        <ShopExperience products={products} />
      </Suspense>
    </div>
  );
}
