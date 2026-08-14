"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useHasMounted } from "@/hooks/useHasMounted";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "@/components/search/SearchOverlay";

const LINKS = [
  { href: "/food", label: "Food" },
  { href: "/beauty", label: "Beauty" },
  { href: "/shop", label: "Shop" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "border-b border-charcoal/5 bg-ivory/90 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-6"
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
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
