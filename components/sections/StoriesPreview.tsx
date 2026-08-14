import Link from "next/link";
import { stories } from "@/data/stories";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function StoriesPreview() {
  const featured = stories.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">
              Magazine
            </p>
            <h2 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">Stories</h2>
          </div>
          <ButtonLink href="/stories" variant="outline">
            Toutes les stories
          </ButtonLink>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {featured.map((story, i) => (
          <Reveal key={story.id} delay={i * 0.08}>
            <Link href={`/stories/${story.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <Placeholder seed={story.image} tone={i % 2 === 0 ? "food" : "beauty"} />
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
    </section>
  );
}
