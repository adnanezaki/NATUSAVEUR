import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/animations/Reveal";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">
          Vous pourriez aussi aimer
        </h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
