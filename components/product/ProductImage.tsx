import { Placeholder } from "@/components/ui/Placeholder";
import type { Product } from "@/data/types";
import { cn } from "@/lib/utils";

export function ProductImage({
  product,
  index = 0,
  className,
  showLabel = true,
}: {
  product: Product;
  index?: number;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <Placeholder
      seed={product.images[index] ?? product.id}
      tone={product.category === "food" ? "food" : "beauty"}
      label={showLabel ? product.name : undefined}
      className={cn("rounded-none", className)}
    />
  );
}
