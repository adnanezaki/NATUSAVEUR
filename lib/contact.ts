export const CONTACT_PHONE_DISPLAY = "+212 666-082281";
export const CONTACT_PHONE_RAW = "212666082281";
export const CONTACT_PHONE_TEL = "+212666082281";
export const CONTACT_EMAIL = "contact@natusaveur.com";

// Strict WhatsApp destination URL: https://wa.me/212666082281
export const WHATSAPP_NUMBER = "212666082281";

export function getWhatsAppUrl(text?: string): string {
  if (!text) {
    return `https://wa.me/${WHATSAPP_NUMBER}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

