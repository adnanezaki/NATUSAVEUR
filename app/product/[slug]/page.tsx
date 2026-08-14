import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Gallery } from "@/components/product/Gallery";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { Product3DModal } from "@/components/product/Product3DModal";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { ViewItemTracker } from "@/components/product/ViewItemTracker";
import { Star } from "lucide-react";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | NATUSAVEUR`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewsCount ?? 0,
      },
    }),
  };

  return (
    <div className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewItemTracker product={product} />

      <nav aria-label="Fil d'ariane" className="mx-auto max-w-7xl px-6">
        <ol className="flex flex-wrap items-center gap-2 font-body text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-charcoal">
              Accueil
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/${product.category}`} className="hover:text-charcoal capitalize">
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-charcoal">{product.name}</li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-8 md:grid-cols-2 md:gap-16">
        <Gallery product={product} />

        <div>
          <p className="font-body text-xs uppercase tracking-[0.14em] text-terracotta">
            {product.origin} {product.originFlag}
          </p>
          <h1 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">{product.name}</h1>

          {product.rating && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(product.rating ?? 0)
                        ? "h-4 w-4 fill-sand-dark text-sand-dark"
                        : "h-4 w-4 text-charcoal/15"
                    }
                  />
                ))}
              </div>
              <span className="font-body text-xs text-muted">
                {product.rating} ({product.reviewsCount ?? 0} avis)
              </span>
            </div>
          )}

          <div className="mt-5 flex items-baseline gap-3">
            <p className="font-display text-2xl text-charcoal">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="font-body text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
            {product.weight && (
              <p className="font-body text-sm text-muted">/ {product.weight}</p>
            )}
          </div>

          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {product.has3DModel && <Product3DModal product={product} />}

          <div className="mt-8 border-t border-charcoal/10 pt-8">
            <AddToCartPanel product={product} />
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-y-4 border-t border-charcoal/10 pt-8 font-body text-sm">
            {product.ingredients && product.ingredients.length > 0 && (
              <>
                <dt className="text-muted">Ingrédients</dt>
                <dd className="text-charcoal">{product.ingredients.join(", ")}</dd>
              </>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <>
                <dt className="text-muted">Allergènes</dt>
                <dd className="text-charcoal">{product.allergens.join(", ")}</dd>
              </>
            )}
            {product.storage && (
              <>
                <dt className="text-muted">Conservation</dt>
                <dd className="text-charcoal">{product.storage}</dd>
              </>
            )}
            {product.preparation && (
              <>
                <dt className="text-muted">Préparation</dt>
                <dd className="text-charcoal">{product.preparation}</dd>
              </>
            )}
            <dt className="text-muted">Origine</dt>
            <dd className="text-charcoal">
              {product.origin} {product.originFlag}
            </dd>
            <dt className="text-muted">SKU</dt>
            <dd className="text-charcoal">{product.sku}</dd>
          </dl>

          <ReviewsSection product={product} />
        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
