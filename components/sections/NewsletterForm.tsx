"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p
          className={cn(
            "font-display text-xl md:text-2xl",
            dark ? "text-ivory" : "text-charcoal"
          )}
        >
          Restez connecté à NATUSAVEUR.
        </p>
        <p className={cn("mt-1 font-body text-sm", dark ? "text-ivory/60" : "text-muted")}>
          Nouveautés, produits, recettes et histoires africaines directement dans votre boîte mail.
        </p>
      </div>

      {submitted ? (
        <p className={cn("font-body text-sm", dark ? "text-sand" : "text-deep-green")}>
          Merci, vous êtes inscrit(e) !
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
          <label htmlFor="newsletter-email" className="sr-only">
            Adresse email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className={cn(
              "w-full border-b bg-transparent px-1 py-2 font-body text-sm focus:outline-none",
              dark
                ? "border-ivory/30 text-ivory placeholder:text-ivory/40"
                : "border-charcoal/30 text-charcoal placeholder:text-muted"
            )}
          />
          <button
            type="submit"
            className={cn(
              "shrink-0 whitespace-nowrap px-5 py-2 font-body text-xs uppercase tracking-[0.1em] transition-colors",
              dark
                ? "bg-ivory text-charcoal hover:bg-sand"
                : "bg-deep-green text-ivory hover:bg-deep-green-dark"
            )}
          >
            S&apos;inscrire
          </button>
        </form>
      )}
    </div>
  );
}
