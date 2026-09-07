"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, MessageCircle, CheckCircle2, Clock } from "lucide-react";
import type { Product } from "@/data/types";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/contact";

export function AddToCartPanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();
  const outOfStock = product.stock <= 0;

  const whatsappHref = outOfStock
    ? getWhatsAppUrl(
        `Bonjour NATUSAVEUR, je souhaite être informé dès que le produit "${product.name}" (${product.weight || ""}) sera de nouveau disponible.`
      )
    : getWhatsAppUrl(
        `Bonjour NATUSAVEUR, je souhaite commander : ${product.name} (Quantité : ${quantity}, Format : ${product.weight || "1 kg"}).`
      );

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-body text-xs uppercase tracking-[0.12em] text-muted">Quantité</span>
        <div className="flex items-center gap-4 rounded-full border border-charcoal/15 px-3 py-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={outOfStock}
            aria-label="Diminuer la quantité"
            className="text-charcoal/70 hover:text-charcoal disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-5 text-center font-body text-sm font-medium">{outOfStock ? 0 : quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            disabled={outOfStock}
            aria-label="Augmenter la quantité"
            className="text-charcoal/70 hover:text-charcoal disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!outOfStock ? (
        <div className="mt-4 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-md px-3 py-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span className="font-body text-xs font-medium">
            En Stock — Expédition rapide &amp; Commande WhatsApp disponible
          </span>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 text-amber-900 bg-amber-50 border border-amber-200/60 rounded-md px-3 py-2">
          <Clock className="h-4 w-4 shrink-0 text-amber-700" />
          <span className="font-body text-xs font-medium">
            Bientôt disponible — Réapprovisionnement en cours
          </span>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          onClick={() => addItem(product, quantity)}
          disabled={outOfStock}
          size="lg"
          className="w-full"
        >
          {outOfStock ? "Bientôt disponible" : "Ajouter au panier"}
        </Button>
        <Button
          onClick={() => {
            if (!outOfStock) {
              addItem(product, quantity);
              router.push("/checkout");
            }
          }}
          disabled={outOfStock}
          variant="outline"
          size="lg"
          className="w-full"
        >
          {outOfStock ? "Indisponible" : "Acheter maintenant"}
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={
            outOfStock
              ? "flex w-full items-center justify-center gap-2 border border-charcoal/20 bg-charcoal/5 px-6 py-3.5 font-body text-xs uppercase tracking-[0.08em] text-charcoal transition-colors hover:bg-charcoal/10"
              : "flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-4 font-body text-sm font-medium uppercase tracking-[0.08em] text-[#0b1a10] shadow-xs transition-colors hover:bg-[#1fb856]"
          }
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} />
          {outOfStock ? "M'avertir de la disponibilité sur WhatsApp" : "Commander sur WhatsApp"}
        </a>
      </div>
    </div>
  );
}

