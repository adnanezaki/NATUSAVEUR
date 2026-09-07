import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/contact";

export function WhatsAppButton({ text = "Bonjour NATUSAVEUR, j'ai une question." }: { text?: string }) {
  const href = getWhatsAppUrl(text);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter NATUSAVEUR sur WhatsApp (+212 666-082281)"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </a>
  );
}

