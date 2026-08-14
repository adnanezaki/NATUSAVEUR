import type { Review } from "./types";

// Sample reviews for prototype purposes only — not real customer data.
export const reviews: Review[] = [
  {
    id: "r-01",
    productId: "f-01",
    author: "Aïcha K.",
    rating: 5,
    comment: "Enfin de l'attiéké facilement accessible au Maroc. Texture parfaite.",
    date: "2026-06-10",
  },
  {
    id: "r-02",
    productId: "f-01",
    author: "Junior D.",
    rating: 4,
    comment: "Très bon produit, la livraison a été rapide.",
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
