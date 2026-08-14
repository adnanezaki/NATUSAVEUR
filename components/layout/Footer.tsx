import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { href: "/food", label: "Food" },
      { href: "/beauty", label: "Beauty" },
      { href: "/shop", label: "Tous les produits" },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/stories", label: "Stories" },
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "Livraison" },
      { href: "/faq", label: "Retours" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/cookies", label: "Cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="font-display text-2xl tracking-wide">NATUSAVEUR</p>
            <p className="mt-3 max-w-xs font-body text-sm text-ivory/60">
              L&apos;Afrique dans votre quotidien.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NATUSAVEUR sur Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-ivory"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NATUSAVEUR sur Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-ivory"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-body text-xs uppercase tracking-[0.14em] text-ivory/50">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link, i) => (
                  <li key={col.title + link.label + i}>
                    <Link
                      href={link.href}
                      className="link-underline font-body text-sm text-ivory/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-10">
          <NewsletterForm dark />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ivory/10 pt-6 font-body text-xs text-ivory/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NATUSAVEUR. Tous droits réservés.</p>
          <p>Casablanca, Maroc</p>
        </div>
      </div>
    </footer>
  );
}
