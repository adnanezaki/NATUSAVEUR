"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, getWhatsAppUrl } from "@/lib/contact";

const LINKS = [
  { href: "/food", label: "Food" },
  { href: "/beauty", label: "Beauty" },
  { href: "/shop", label: "Shop" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SECONDARY_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex flex-col bg-deep-green text-ivory md:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-display text-lg tracking-wide">NATUSAVEUR</span>
            <button
              onClick={onClose}
              aria-label="Fermer le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ivory/10"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6 py-4">
            {LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-2.5 font-display text-3xl uppercase tracking-tight"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-ivory/15 px-6 py-6 font-body text-xs text-ivory/80">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="flex items-center gap-2.5 py-1 text-ivory hover:text-sand transition-colors"
            >
              <Phone className="h-4 w-4 text-sand" />
              <span>Appeler : {CONTACT_PHONE_DISPLAY}</span>
            </a>
            <a
              href={getWhatsAppUrl("Bonjour NATUSAVEUR, je souhaite commander.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 py-1 text-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp : {CONTACT_PHONE_DISPLAY}</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory/15 px-6 py-5">
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-body text-xs uppercase tracking-[0.1em] text-ivory/70 hover:text-ivory"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
