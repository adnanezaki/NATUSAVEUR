import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryHero } from "@/components/shop/CategoryHero";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { foodProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Food — Produits africains authentiques au Maroc",
  description:
    "Attiéké, placali, alloco, gombo, farines, condiments et bien plus. Une sélection de produits africains authentiques disponibles au Maroc.",
};

export default function FoodPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Food"
        title="Les saveurs de chez nous"
        subtitle="Découvrez une sélection de produits africains authentiques disponibles au Maroc."
        tone="food"
      />
      <div className="pt-16">
        <Suspense fallback={null}>
          <ShopExperience products={foodProducts} fixedCategory="food" />
        </Suspense>
      </div>
    </>
  );
}
