"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const LINKS = [
  { href: "/food", label: "Food" },
  { href: "/beauty", label: "Beauty" },
  { href: "/shop", label: "Shop" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
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
          className="fixed inset-0 z-[70] flex flex-col bg-deep-green text-ivory md:hidden"
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

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
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
                  className="block py-3 font-display text-4xl uppercase tracking-tight"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory/15 px-6 py-8">
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-body text-sm uppercase tracking-[0.1em] text-ivory/70 hover:text-ivory"
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
