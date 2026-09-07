"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [hasError, setHasError] = useState(false);
  const imageSrc = product.images?.[index];

  // If there is an actual valid image source and no error occurred
  if (imageSrc && !hasError) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-sand/20", className)}>
        <Image
          src={imageSrc}
          alt={`${product.name} - Vue ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out"
          onError={() => setHasError(true)}
          priority={index === 0 && Boolean(product.featured)}
          unoptimized
        />
      </div>
    );
  }

  return (
    <Placeholder
      seed={imageSrc ?? product.id}
      tone={product.category === "food" ? "food" : "beauty"}
      label={showLabel ? product.name : undefined}
      className={cn("rounded-none", className)}
    />
  );
}

