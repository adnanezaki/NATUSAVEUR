"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, CONTACT_EMAIL, getWhatsAppUrl } from "@/lib/contact";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <Reveal>
        <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Contact</p>
        <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
          Une question ? Écrivez-nous.
        </h1>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-6">
            <a
              href={getWhatsAppUrl("Bonjour NATUSAVEUR, je souhaite avoir des renseignements.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-body text-sm text-charcoal hover:text-deep-green transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.75} />
              <span>WhatsApp ({CONTACT_PHONE_DISPLAY})</span>
            </a>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="flex items-center gap-3 font-body text-sm text-charcoal hover:text-deep-green transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 font-body text-sm text-charcoal hover:text-deep-green transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 hover:border-charcoal"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 hover:border-charcoal"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <p className="font-body text-sm text-deep-green">
              Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-muted">Nom</span>
                  <input
                    required
                    className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-body text-xs text-muted">Email</span>
                  <input
                    type="email"
                    required
                    className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs text-muted">Sujet</span>
                <input className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-body text-xs text-muted">Message</span>
                <textarea
                  required
                  rows={5}
                  className="border-b border-charcoal/20 bg-transparent px-1 py-2 font-body text-sm focus:border-charcoal focus:outline-none"
                />
              </label>
              <Button type="submit" className="mt-2 self-start">
                Envoyer
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
