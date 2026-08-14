import Link from "next/link";
import { foodCategories, beautyCategories } from "@/data/categories";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";

const displayCategories = [...foodCategories.slice(0, 3), ...beautyCategories.slice(0, 3)];

export function ProductCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Explorer</p>
        <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">Par catégorie</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {displayCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.05}>
            <Link
              href={`/shop?category=${cat.category}&sub=${cat.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden"
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <Placeholder seed={cat.slug} tone={cat.category === "food" ? "food" : "beauty"} />
              </div>
              <div className="absolute inset-0 bg-charcoal/25 transition-colors group-hover:bg-charcoal/35" />
              <span className="absolute bottom-4 left-4 font-display text-lg text-ivory md:text-xl">
                {cat.name}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
