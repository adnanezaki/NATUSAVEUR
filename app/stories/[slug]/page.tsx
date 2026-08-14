import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories, getStoryBySlug } from "@/data/stories";
import { products } from "@/data/products";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProductImage } from "@/components/product/ProductImage";
import { Reveal } from "@/components/animations/Reveal";
import { formatPrice } from "@/lib/utils";
import { ShareButtons } from "@/components/stories/ShareButtons";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: { title: story.title, description: story.excerpt, type: "article" },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const relatedProducts = products.filter((p) => story.relatedProductSlugs?.includes(p.slug));
  const relatedStories = stories.filter((s) => s.id !== story.id).slice(0, 3);

  return (
    <article className="pt-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-body text-xs uppercase tracking-[0.14em] text-terracotta">
          {story.category}
        </p>
        <h1 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl md:text-5xl">
          {story.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 font-body text-xs text-muted">
          <time dateTime={story.date}>
            {new Date(story.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{story.readingTime} de lecture</span>
        </div>
      </div>

      <Reveal className="mx-auto mt-10 max-w-5xl px-6">
        <div className="aspect-[16/9] overflow-hidden">
          <Placeholder seed={story.image} tone="food" />
        </div>
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="flex flex-col gap-6">
          {story.content.map((paragraph, i) => (
            <p key={i} className="font-body text-base leading-relaxed text-charcoal/85">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t border-charcoal/10 pt-6">
          <ShareButtons title={story.title} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 pb-20">
          <h2 className="mb-6 font-display text-xl text-charcoal">Produits liés</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group">
                <div className="aspect-square overflow-hidden">
                  <ProductImage product={p} showLabel={false} />
                </div>
                <p className="mt-2 font-body text-xs text-charcoal group-hover:text-deep-green">
                  {p.name}
                </p>
                <p className="font-body text-xs text-muted">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl border-t border-charcoal/10 px-6 py-16">
        <h2 className="mb-6 font-display text-xl text-charcoal">À lire aussi</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {relatedStories.map((s) => (
            <Link key={s.id} href={`/stories/${s.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden">
                <Placeholder seed={s.image} tone="beauty" />
              </div>
              <h3 className="mt-3 font-display text-lg text-charcoal group-hover:text-deep-green">
                {s.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
