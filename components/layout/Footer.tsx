import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, getWhatsAppUrl } from "@/lib/contact";

const COLUMNS: { title: string; links: { href: string; label: string; isExternal?: boolean }[] }[] = [
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
    title: "Help & Contact",
    links: [
      { href: "/contact", label: "Contact" },
      { href: `tel:${CONTACT_PHONE_TEL}`, label: `Appel : ${CONTACT_PHONE_DISPLAY}`, isExternal: true },
      { href: getWhatsAppUrl("Bonjour NATUSAVEUR, j'ai une question."), label: "WhatsApp Direct", isExternal: true },
      { href: "/faq", label: "Livraison & Retours" },
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
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="link-underline font-body text-sm text-ivory/80 hover:text-ivory transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="link-underline font-body text-sm text-ivory/80 hover:text-ivory transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-ivory/10 pt-10">
          <NewsletterForm dark />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-6 font-body text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NATUSAVEUR. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="text-ivory/80 transition-colors hover:text-ivory"
            >
              📞 {CONTACT_PHONE_DISPLAY}
            </a>
            <span>•</span>
            <a
              href={getWhatsAppUrl("Bonjour NATUSAVEUR, j'ai une question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 transition-colors hover:text-[#25D366]"
            >
              WhatsApp : {CONTACT_PHONE_DISPLAY}
            </a>
            <span>•</span>
            <p>Casablanca, Maroc</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
