// Thin analytics abstraction. Wire up GA / Meta Pixel / TikTok Pixel by
// pushing to their respective globals here once tracking IDs are configured
// via the NEXT_PUBLIC_* env vars. No-ops until then.

type EventName =
  | "page_view"
  | "view_item"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, payload?: EventPayload) => void };
  }
}

export function trackEvent(name: EventName, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", name, payload);
  }
  if (window.fbq) {
    window.fbq("trackCustom", name, payload);
  }
  if (window.ttq) {
    window.ttq.track(name, payload);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, payload);
  }
}
