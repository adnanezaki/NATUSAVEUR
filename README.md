# NATUSAVEUR — L'Afrique dans votre quotidien.

A frontend prototype for NATUSAVEUR, a premium African lifestyle brand
(Food + Beauty) operating in Morocco. Built with Next.js, TypeScript,
Tailwind CSS, Framer Motion and React Three Fiber.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Environment

Copy `.env.example` to `.env.local` and fill in the values you have:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL, used for metadata/sitemap.
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID` —
  analytics IDs. Leave blank to keep tracking as a no-op (see `lib/analytics.ts`).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — international format, digits only (e.g. `212666082281`).

None of these are required to run the app locally.

## Project structure

- `app/` — routes (App Router). Each top-level folder is a page:
  `food`, `beauty`, `shop`, `product/[slug]`, `cart`, `checkout`, `stories`,
  `stories/[slug]`, `about`, `faq`, `contact`, `account`, `wishlist`,
  `legal/*`.
- `components/` — organized by domain: `layout`, `hero`, `product`, `shop`,
  `cart`, `stories`, `3d`, `animations`, `ui`, `sections`.
- `data/` — mock/demo content: `products.ts`, `categories.ts`, `stories.ts`,
  `testimonials.ts`, `reviews.ts`, `types.ts`. This is the single source of
  truth the UI reads from — swap it for a real backend/CMS without touching
  components (see "Future backend" below).
- `lib/` — `utils.ts` (formatting helpers), `analytics.ts` (event tracking
  abstraction), `payment.ts` (payment provider interface), `delivery.ts`
  (delivery method list).
- `hooks/` — `useCart`, `useWishlist` (Zustand stores, persisted to
  localStorage), `useMediaQuery`, `useReducedMotion`, `useHasMounted`.

## Images

No real product photography is available yet, so every image in the app —
product photos, editorial imagery, story covers — is rendered by
`components/ui/Placeholder.tsx`: a deterministic gradient + icon based on a
seed string. This avoids broken images and generic stock photography while
keeping the visual language on-brand. Product image *paths* are still
modeled realistically in `data/products.ts` (`images: string[]`); once real
photography exists, replace `ProductImage`/`Placeholder` usage with
`next/image` pointed at `/public/images/products/...`.

## 3D

- `components/3d/HeroScene.tsx` — the homepage hero background: a few
  distorted organic forms (drei's `MeshDistortMaterial`) with soft studio
  lighting and mouse-parallax rotation. Automatically disabled on mobile and
  when `prefers-reduced-motion` is set (falls back to a static gradient).
- `components/3d/ProductViewer.tsx` — a generic rotatable container mesh
  shown in the "Explorer en 3D" modal on flagship products
  (`product.has3DModel === true`). Replace `DemoContainer` with a real
  `useGLTF()`-loaded model once product-specific 3D assets exist.

Both are dynamically imported with `ssr: false` and only mount on
tablet/desktop viewports without reduced motion.

## Products

Edit `data/products.ts` (and `data/categories.ts`) directly — no build step
required. Each `Product` follows the shape in `data/types.ts`. Prices are in
MAD and are illustrative placeholders.

## Cart, wishlist & checkout

`hooks/useCart.ts` and `hooks/useWishlist.ts` are Zustand stores persisted
to `localStorage`. Checkout (`app/checkout/page.tsx`) builds a mock `Order`
and calls the cash-on-delivery `PaymentProvider` in `lib/payment.ts` — the
only active provider today. Add new providers by implementing the
`PaymentProvider` interface in `data/types.ts` and registering them in
`lib/payment.ts`.

## Future backend

The UI never hard-codes data fetching beyond importing from `data/`.
To connect a real backend (Shopify, Medusa, WooCommerce, Supabase, or a
custom API):

1. Replace the functions in `data/products.ts` (`getProductBySlug`,
   `getFeaturedProducts`, etc.) with calls to your API/CMS client.
2. Replace the Zustand cart store's local mutations with API calls, keeping
   the same interface so components don't change.
3. Implement a real `PaymentProvider` in `lib/payment.ts`.
4. Wire `lib/analytics.ts`'s `trackEvent` to real GA/Meta/TikTok SDKs once
   the env vars are set.

## Notes

- Language: French, with the data/component structure ready for future
  English/Arabic locales.
- Currency: MAD (DH).
- This is a frontend prototype. Reviews, order history, loyalty points and
  account data are mock/local — no production backend is wired up.
