"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/data/types";

export function ViewItemTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackEvent("view_item", {
      productId: product.id,
      productName: product.name,
      price: product.price,
    });
  }, [product.id, product.name, product.price]);

  return null;
}
