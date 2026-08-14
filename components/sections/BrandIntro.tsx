import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";

export function BrandIntro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="aspect-[4/5] w-full overflow-hidden">
            <Placeholder seed="brand-intro" tone="neutral" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">
            Notre philosophie
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
            Des produits qui nous rappellent chez nous.
          </h2>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-muted">
            NATUSAVEUR crée un pont entre les produits, les saveurs et les
            rituels qui font partie de notre quotidien et la vie que nous
            construisons au Maroc.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
