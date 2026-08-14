import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">
              Sélection
            </p>
            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">
              Les incontournables NATUSAVEUR
            </h2>
          </div>
          <ButtonLink href="/shop" variant="outline">
            Voir tout
          </ButtonLink>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {featured.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
