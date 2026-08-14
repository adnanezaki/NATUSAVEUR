import { Star } from "lucide-react";
import type { Product } from "@/data/types";
import { getReviewsForProduct } from "@/data/reviews";
import { Reveal } from "@/components/animations/Reveal";

export function ReviewsSection({ product }: { product: Product }) {
  const reviews = getReviewsForProduct(product.id);

  return (
    <div className="border-t border-charcoal/10 py-10">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl text-charcoal">Avis clients</h2>
        {product.rating && (
          <span className="flex items-center gap-1 font-body text-sm text-muted">
            <Star className="h-4 w-4 fill-sand-dark text-sand-dark" />
            {product.rating} ({product.reviewsCount ?? 0})
          </span>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="mt-4 font-body text-sm text-muted">
          Aucun avis pour le moment — soyez le premier à donner votre avis.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-sand-dark text-sand-dark" />
                ))}
              </div>
              <p className="mt-2 font-body text-sm text-charcoal/85">&ldquo;{r.comment}&rdquo;</p>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.1em] text-muted">
                {r.author}
              </p>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
