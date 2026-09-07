import type { Review } from "./types";

// Sample reviews for prototype purposes only — not real customer data.
export const reviews: Review[] = [
  {
    id: "r-01",
    productId: "f-01",
    author: "Aïcha K.",
    rating: 5,
    comment: "L'Attiéké Choco de Nourivoire est exceptionnel ! Grain très fin, léger et parfum authentique. Enfin disponible facilement au Maroc.",
    date: "2026-06-10",
  },
  {
    id: "r-02",
    productId: "f-01",
    author: "Junior D.",
    rating: 5,
    comment: "Format 1 kg très généreux et qualité premium incomparable. Livraison rapide à Casablanca !",
    date: "2026-05-22",
  },
  {
    id: "r-03",
    productId: "b-02",
    author: "Fatou S.",
    rating: 5,
    comment: "Beurre de karité pur, exactement comme je l'espérais.",
    date: "2026-04-30",
  },
];

export function getReviewsForProduct(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}
