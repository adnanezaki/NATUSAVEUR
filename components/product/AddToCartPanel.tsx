"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, MessageCircle } from "lucide-react";
import type { Product } from "@/data/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "212600000000";

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();
  const outOfStock = product.stock <= 0;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Bonjour, je souhaite commander : ${product.name} (x${quantity}).`
  )}`;

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-body text-xs uppercase tracking-[0.12em] text-muted">Quantité</span>
        <div className="flex items-center gap-4 rounded-full border border-charcoal/15 px-3 py-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuer la quantité"
            className="text-charcoal/70 hover:text-charcoal"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-5 text-center font-body text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            aria-label="Augmenter la quantité"
            className="text-charcoal/70 hover:text-charcoal"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {product.stock > 0 && product.stock <= 5 && (
        <p className="mt-3 font-body text-xs text-terracotta">
          Plus que {product.stock} en stock
        </p>
      )}
      {outOfStock && (
        <p className="mt-3 font-body text-xs uppercase tracking-[0.1em] text-terracotta">
          Rupture de stock
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          onClick={() => addItem(product, quantity)}
          disabled={outOfStock}
          size="lg"
          className="w-full"
        >
          Ajouter au panier
        </Button>
        <Button
          onClick={() => {
            addItem(product, quantity);
            router.push("/checkout");
          }}
          disabled={outOfStock}
          variant="outline"
          size="lg"
          className="w-full"
        >
          Acheter maintenant
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-4 font-body text-sm font-medium uppercase tracking-[0.08em] text-[#0b1a10] transition-colors hover:bg-[#1fb856]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} />
          Commander sur WhatsApp
        </a>
      </div>
    </div>
  );
}
