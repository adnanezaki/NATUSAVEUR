import type { Metadata } from "next";
import Link from "next/link";
import { stories } from "@/data/stories";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Stories — Le magazine NATUSAVEUR",
  description:
    "Culture, recettes, beauté et origines : le magazine NATUSAVEUR raconte l'Afrique au quotidien.",
};

export default function StoriesPage() {
  const [featured, ...rest] = stories;

  return (
    <div className="pt-32">
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Magazine</p>
        <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">Stories</h1>
      </div>

      {featured && (
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <Reveal>
            <Link href={`/stories/${featured.slug}`} className="group grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
              <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <Placeholder seed={featured.image} tone="food" />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-body text-xs uppercase tracking-[0.14em] text-terracotta">
                  {featured.category}
                </p>
                <h2 className="mt-3 font-display text-3xl text-charcoal group-hover:text-deep-green sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <p className="mt-4 font-body text-xs text-muted">{featured.readingTime} de lecture</p>
              </div>
            </Link>
          </Reveal>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {rest.map((story, i) => (
            <Reveal key={story.id} delay={i * 0.06}>
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <Placeholder seed={story.image} tone={i % 2 === 0 ? "beauty" : "food"} />
                  </div>
                </div>
                <p className="mt-4 font-body text-xs uppercase tracking-[0.14em] text-terracotta">
                  {story.category}
                </p>
                <h3 className="mt-2 font-display text-xl text-charcoal group-hover:text-deep-green">
                  {story.title}
                </h3>
                <p className="mt-2 font-body text-sm text-muted">{story.readingTime} de lecture</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
