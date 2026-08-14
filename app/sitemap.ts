import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { stories } from "@/data/stories";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://natusaveur.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/food",
    "/beauty",
    "/shop",
    "/stories",
    "/about",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const storyRoutes = stories.map((s) => ({
    url: `${siteUrl}/stories/${s.slug}`,
    lastModified: new Date(s.date),
  }));

  return [...staticRoutes, ...productRoutes, ...storyRoutes];
}
