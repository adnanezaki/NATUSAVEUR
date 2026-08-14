"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, ProductCategory } from "@/data/types";
import { categories as allCategories } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "En vedette" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];

export function ShopExperience({
  products,
  fixedCategory,
}: {
  products: Product[];
  fixedCategory?: ProductCategory;
}) {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<"all" | ProductCategory>(
    fixedCategory ?? (searchParams.get("category") as ProductCategory) ?? "all"
  );
  const [subcategories, setSubcategories] = useState<string[]>(
    searchParams.get("sub") ? [searchParams.get("sub") as string] : []
  );
  const [origins, setOrigins] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const activeCategory: ProductCategory | "all" = fixedCategory ?? tab;

  const categoryOptions = useMemo(
    () =>
      allCategories.filter((c) =>
        activeCategory === "all" ? true : c.category === activeCategory
      ),
    [activeCategory]
  );

  const originOptions = useMemo(() => {
    const set = new Set(products.map((p) => p.origin));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (subcategories.length > 0) {
      list = list.filter((p) =>
        subcategories.some(
          (s) => p.subcategory.toLowerCase() === s.replace(/-/g, " ").toLowerCase() ||
            categoryOptions.find((c) => c.slug === s)?.name.toLowerCase() === p.subcategory.toLowerCase()
        )
      );
    }
    if (origins.length > 0) {
      list = list.filter((p) => origins.includes(p.origin));
    }
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        sorted.reverse();
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return sorted;
  }, [products, activeCategory, subcategories, origins, query, sort, categoryOptions]);

  function toggleSubcategory(slug: string) {
    setSubcategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function toggleOrigin(origin: string) {
    setOrigins((prev) =>
      prev.includes(origin) ? prev.filter((o) => o !== origin) : [...prev, origin]
    );
  }

  function clearFilters() {
    setSubcategories([]);
    setOrigins([]);
    setQuery("");
  }

  const activeFilterCount = subcategories.length + origins.length;

  const FiltersPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 font-body text-xs uppercase tracking-[0.14em] text-muted">
          Catégorie
        </h3>
        <div className="flex flex-col gap-2">
          {categoryOptions.map((c) => (
            <label key={c.id} className="flex items-center gap-2 font-body text-sm text-charcoal">
              <input
                type="checkbox"
                checked={subcategories.includes(c.slug)}
                onChange={() => toggleSubcategory(c.slug)}
                className="h-4 w-4 accent-deep-green"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-body text-xs uppercase tracking-[0.14em] text-muted">Origine</h3>
        <div className="flex flex-col gap-2">
          {originOptions.map((origin) => (
            <label key={origin} className="flex items-center gap-2 font-body text-sm text-charcoal">
              <input
                type="checkbox"
                checked={origins.includes(origin)}
                onChange={() => toggleOrigin(origin)}
                className="h-4 w-4 accent-deep-green"
              />
              {origin}
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="self-start font-body text-xs uppercase tracking-[0.1em] text-terracotta underline underline-offset-4"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24">
      {!fixedCategory && (
        <div className="mb-8 flex gap-6 border-b border-charcoal/10">
          {(["all", "food", "beauty"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pb-4 font-body text-xs uppercase tracking-[0.14em] transition-colors",
                tab === t ? "border-b-2 border-deep-green text-charcoal" : "text-muted"
              )}
            >
              {t === "all" ? "Tout" : t === "food" ? "Food" : "Beauty"}
            </button>
          ))}
        </div>
      )}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 border border-charcoal/20 px-4 py-2.5 font-body text-xs uppercase tracking-[0.1em] text-charcoal md:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtres {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-48 border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:outline-none md:w-64"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border border-charcoal/20 bg-transparent px-3 py-2.5 font-body text-xs uppercase tracking-[0.08em] text-charcoal focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">{FiltersPanel}</aside>

        <div>
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-xl text-charcoal">AUCUN RÉSULTAT.</p>
              <p className="mt-2 font-body text-sm text-muted">Essayez un autre mot-clé ou filtre.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
                {filtered.slice(0, visibleCount).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="mt-14 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((v) => v + 12)}
                    className="border border-charcoal/20 px-8 py-3.5 font-body text-xs uppercase tracking-[0.1em] text-charcoal hover:border-charcoal"
                  >
                    Charger plus
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[80] flex md:hidden">
          <div className="flex-1 bg-charcoal/40" onClick={() => setFiltersOpen(false)} />
          <div className="w-full max-w-xs overflow-y-auto bg-surface p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg text-charcoal">Filtres</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Fermer les filtres">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            {FiltersPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full bg-deep-green py-3.5 font-body text-xs uppercase tracking-[0.1em] text-ivory"
            >
              Voir {filtered.length} résultats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
