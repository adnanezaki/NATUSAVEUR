"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const TABS = [
  { id: "orders", label: "Mes commandes" },
  { id: "wishlist", label: "Mes favoris" },
  { id: "addresses", label: "Mes adresses" },
  { id: "info", label: "Mes informations" },
  { id: "loyalty", label: "Mes points fidélité" },
] as const;

type Tab = (typeof TABS)[number]["id"];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("orders");

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Mon compte</p>
      <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">Bonjour.</h1>

      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
        <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "whitespace-nowrap px-4 py-3 text-left font-body text-sm transition-colors md:px-0",
                tab === t.id ? "text-deep-green" : "text-muted hover:text-charcoal"
              )}
            >
              {t.label}
            </button>
          ))}
          <button className="whitespace-nowrap px-4 py-3 text-left font-body text-sm text-terracotta md:px-0">
            Se déconnecter
          </button>
        </nav>

        <div>
          {tab === "orders" && (
            <div>
              <h2 className="mb-4 font-display text-xl text-charcoal">Mes commandes</h2>
              <p className="font-body text-sm text-muted">
                Vous n&apos;avez pas encore passé de commande.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-block font-body text-xs uppercase tracking-[0.1em] text-deep-green underline underline-offset-4"
              >
                Découvrir la boutique
              </Link>
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              <h2 className="mb-4 font-display text-xl text-charcoal">Mes favoris</h2>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 font-body text-sm text-deep-green underline underline-offset-4"
              >
                <Heart className="h-4 w-4" strokeWidth={1.5} />
                Voir mes favoris
              </Link>
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <h2 className="mb-4 font-display text-xl text-charcoal">Mes adresses</h2>
              <p className="font-body text-sm text-muted">Aucune adresse enregistrée pour le moment.</p>
            </div>
          )}

          {tab === "info" && (
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-xl text-charcoal">Mes informations</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-muted">Prénom</span>
                  <input className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-muted">Nom</span>
                  <input className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-muted">Email</span>
                  <input type="email" className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-muted">Téléphone</span>
                  <input type="tel" className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none" />
                </label>
              </div>
            </div>
          )}

          {tab === "loyalty" && (
            <div>
              <h2 className="mb-2 font-display text-xl text-charcoal">NATUSAVEUR Club</h2>
              <p className="font-body text-sm text-muted">1 DH dépensé = 1 point.</p>
              <p className="mt-6 font-display text-4xl text-deep-green">0 pts</p>
              <p className="mt-2 font-body text-xs text-muted">
                Programme de fidélité à venir — les points affichés sont indicatifs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
