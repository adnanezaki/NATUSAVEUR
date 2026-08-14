import type { DeliveryMethod } from "@/data/types";

// Placeholder delivery options — replace with real rates/timing once the
// logistics partner is confirmed.
export const deliveryMethods: DeliveryMethod[] = [
  {
    id: "standard",
    name: "Livraison standard",
    price: 25,
    estimatedTime: "estimation 24 à 72h",
  },
  {
    id: "express",
    name: "Livraison express",
    price: 45,
    estimatedTime: "estimation 24h",
  },
];
