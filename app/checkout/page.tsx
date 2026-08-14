"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useHasMounted } from "@/hooks/useHasMounted";
import { formatPrice, generateOrderId, cn } from "@/lib/utils";
import { deliveryMethods } from "@/lib/delivery";
import { cashOnDeliveryProvider } from "@/lib/payment";
import type { Order } from "@/data/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export default function CheckoutPage() {
  const mounted = useHasMounted();
  const { items, subtotal, clearCart } = useCart();
  const [deliveryId, setDeliveryId] = useState(deliveryMethods[0].id);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const delivery = deliveryMethods.find((d) => d.id === deliveryId) ?? deliveryMethods[0];
  const total = subtotal() + delivery.price;

  useEffect(() => {
    if (mounted && items.length > 0) {
      trackEvent("begin_checkout", { value: subtotal(), itemCount: items.length });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const order: Order = {
      id: generateOrderId(),
      customer: {
        firstName: String(formData.get("firstName") ?? ""),
        lastName: String(formData.get("lastName") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? "") || undefined,
      },
      items,
      subtotal: subtotal(),
      deliveryFee: delivery.price,
      total,
      currency: "MAD",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await cashOnDeliveryProvider.createPayment(order);
    trackEvent("purchase", {
      orderId: order.id,
      value: order.total,
      itemCount: order.items.length,
    });
    setConfirmedOrder(order);
    clearCart();
    setSubmitting(false);
  }

  if (confirmedOrder) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 pt-32 pb-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-green">
          <Check className="h-6 w-6 text-ivory" strokeWidth={2} />
        </div>
        <h1 className="mt-6 font-display text-3xl text-charcoal">Commande confirmée</h1>
        <p className="mt-3 font-body text-sm text-muted">
          Merci {confirmedOrder.customer.firstName}, votre commande{" "}
          <span className="text-charcoal">#{confirmedOrder.id}</span> a bien été enregistrée.
          Vous serez contacté(e) au {confirmedOrder.customer.phone} pour confirmer la livraison.
        </p>
        <p className="mt-6 font-display text-xl text-charcoal">
          {formatPrice(confirmedOrder.total)}
        </p>
        <ButtonLink href="/" className="mt-8">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    );
  }

  if (mounted && items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-24 text-center">
        <h1 className="font-display text-3xl text-charcoal">VOTRE PANIER EST VIDE.</h1>
        <p className="mt-3 max-w-sm font-body text-sm text-muted">
          Ajoutez des produits avant de passer commande.
        </p>
        <ButtonLink href="/food" className="mt-8">
          Découvrir Food
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <h1 className="font-display text-3xl text-charcoal sm:text-4xl">Passer la commande</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-5 font-body text-xs uppercase tracking-[0.14em] text-muted">
              Informations
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Prénom" name="firstName" required />
              <Field label="Nom" name="lastName" required />
              <Field label="Téléphone" name="phone" type="tel" required />
              <Field label="Email (optionnel)" name="email" type="email" />
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-body text-xs uppercase tracking-[0.14em] text-muted">
              Adresse de livraison
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Adresse" name="address" required className="sm:col-span-2" />
              <Field label="Ville" name="city" required />
              <Field label="Quartier" name="neighborhood" />
              <Field
                label="Instructions de livraison (optionnel)"
                name="instructions"
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-body text-xs uppercase tracking-[0.14em] text-muted">
              Mode de livraison
            </h2>
            <div className="flex flex-col gap-3">
              {deliveryMethods.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between border px-5 py-4",
                    deliveryId === method.id ? "border-charcoal" : "border-charcoal/15"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryId === method.id}
                      onChange={() => setDeliveryId(method.id)}
                      className="h-4 w-4 accent-deep-green"
                    />
                    <span>
                      <span className="block font-body text-sm text-charcoal">{method.name}</span>
                      <span className="block font-body text-xs text-muted">
                        {method.estimatedTime}
                      </span>
                    </span>
                  </span>
                  <span className="font-body text-sm text-charcoal">
                    {formatPrice(method.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-body text-xs uppercase tracking-[0.14em] text-muted">
              Paiement
            </h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 border border-charcoal px-5 py-4">
                <input type="radio" name="payment" checked readOnly className="h-4 w-4 accent-deep-green" />
                <span className="font-body text-sm text-charcoal">Paiement à la livraison</span>
              </label>
              <div className="flex items-center justify-between border border-charcoal/10 px-5 py-4 opacity-50">
                <span className="font-body text-sm text-charcoal">Carte bancaire</span>
                <span className="font-body text-xs uppercase tracking-[0.08em] text-muted">
                  Bientôt disponible
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="h-fit border border-charcoal/10 p-6">
          <h2 className="font-display text-lg text-charcoal">Résumé de la commande</h2>
          <ul className="mt-5 flex flex-col gap-3 border-b border-charcoal/10 pb-5">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between font-body text-sm">
                <span className="text-muted">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-charcoal">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3 font-body text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Sous-total</span>
              <span className="text-charcoal">{formatPrice(subtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Livraison</span>
              <span className="text-charcoal">{formatPrice(delivery.price)}</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between border-t border-charcoal/10 pt-5 font-body text-base">
            <span className="text-charcoal">Total</span>
            <span className="text-charcoal">{formatPrice(total)}</span>
          </div>
          <Button type="submit" disabled={submitting} className="mt-6 w-full">
            {submitting ? "Traitement..." : "Confirmer la commande"}
          </Button>
          <p className="mt-4 text-center font-body text-xs text-muted">
            En confirmant, vous acceptez nos{" "}
            <Link href="/legal/terms" className="underline">
              conditions générales
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="font-body text-xs text-muted">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm text-charcoal focus:border-charcoal focus:outline-none"
      />
    </label>
  );
}
