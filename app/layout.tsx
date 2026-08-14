import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://natusaveur.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NATUSAVEUR — L'Afrique dans votre quotidien.",
    template: "%s | NATUSAVEUR",
  },
  description:
    "Des produits alimentaires et de beauté inspirés de l'Afrique, sélectionnés pour vous au Maroc.",
  openGraph: {
    title: "NATUSAVEUR — L'Afrique dans votre quotidien.",
    description:
      "Des produits alimentaires et de beauté inspirés de l'Afrique, sélectionnés pour vous au Maroc.",
    url: siteUrl,
    siteName: "NATUSAVEUR",
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NATUSAVEUR — L'Afrique dans votre quotidien.",
    description:
      "Des produits alimentaires et de beauté inspirés de l'Afrique, sélectionnés pour vous au Maroc.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
