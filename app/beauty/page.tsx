import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryHero } from "@/components/shop/CategoryHero";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { beautyProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Beauty — Rituels de beauté africains au Maroc",
  description:
    "Découvrez une sélection de soins et ingrédients inspirés des traditions de beauté africaines, disponibles au Maroc.",
};

export default function BeautyPage() {
  return (
    <>
      <CategoryHero
        eyebrow="Beauty"
        title="Rituels de beauté africains"
        subtitle="Découvrez une sélection de soins et ingrédients inspirés des traditions de beauté africaines."
        tone="beauty"
      />
      <div className="pt-16">
        <Suspense fallback={null}>
          <ShopExperience products={beautyProducts} fixedCategory="beauty" />
        </Suspense>
      </div>
    </>
  );
}
