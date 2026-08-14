"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { FacebookIcon } from "@/components/ui/SocialIcons";
import { MessageCircle } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function getUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs uppercase tracking-[0.1em] text-muted">Partager</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${getUrl()}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur WhatsApp"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 hover:border-charcoal"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur Facebook"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 hover:border-charcoal"
      >
        <FacebookIcon className="h-4 w-4" />
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copier le lien"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 hover:border-charcoal"
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
      </button>
    </div>
  );
}
