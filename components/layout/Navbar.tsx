"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useHasMounted } from "@/hooks/useHasMounted";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, getWhatsAppUrl } from "@/lib/contact";

const LINKS = [
  { href: "/food", label: "Food" },
  { href: "/beauty", label: "Beauty" },
  { href: "/shop", label: "Shop" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mounted = useHasMounted();
  const { itemCount, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const count = mounted ? itemCount() : 0;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
        <div
          className={cn(
            "hidden border-b border-white/10 bg-charcoal text-ivory/85 text-[11px] font-body tracking-wider transition-all duration-300 md:block",
            scrolled ? "h-0 py-0 opacity-0 overflow-hidden border-none" : "py-1.5 px-6 opacity-100"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span>Livraison partout au Maroc · Casablanca</span>
            <div className="flex items-center gap-5">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center gap-1.5 text-ivory/90 hover:text-ivory transition-colors"
              >
                <Phone className="h-3 w-3 text-sand" />
                <span>Commandes : {CONTACT_PHONE_DISPLAY}</span>
              </a>
              <span className="text-white/20">|</span>
              <a
                href={getWhatsAppUrl("Bonjour NATUSAVEUR, je souhaite passer une commande.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="h-3 w-3" />
                <span>WhatsApp ({CONTACT_PHONE_DISPLAY})</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-500 ease-out",
            scrolled
              ? "border-b border-charcoal/5 bg-ivory/90 py-3 backdrop-blur-md shadow-xs"
              : "border-b border-transparent bg-ivory/80 md:bg-transparent py-4 md:py-5 backdrop-blur-xs md:backdrop-blur-none"
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <Link href="/" className="font-display text-xl tracking-wide text-charcoal">
              NATUSAVEUR
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline font-body text-[13px] uppercase tracking-[0.12em] text-charcoal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                aria-label={`Appeler ${CONTACT_PHONE_DISPLAY}`}
                className="hidden lg:flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3 py-1.5 font-body text-xs text-charcoal hover:border-charcoal hover:bg-charcoal/5 transition-colors mr-2"
              >
                <Phone className="h-3.5 w-3.5 text-deep-green" strokeWidth={1.75} />
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </a>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Rechercher"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <Link
                href="/account"
                aria-label="Mon compte"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5 md:flex"
              >
                <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Link>
              <button
                onClick={openCart}
                aria-label="Ouvrir le panier"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] text-ivory">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Ouvrir le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5 md:hidden"
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

