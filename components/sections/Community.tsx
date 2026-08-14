import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

const POSTS = [
  { id: "p1", text: "Quel produit de chez vous vous manque le plus au Maroc ?" },
  { id: "p2", text: "Tu connais le placali ?" },
  { id: "p3", text: "3 produits ivoiriens à découvrir." },
  { id: "p4", text: "Le goût de chez nous, au Maroc." },
];

export function Community() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">
            NATUSAVEUR Community
          </p>
          <h2 className="mt-4 max-w-lg font-display text-3xl text-charcoal sm:text-4xl">
            Une communauté. Une culture. Un quotidien.
          </h2>
          <p className="mt-4 max-w-lg font-body text-base text-muted">
            NATUSAVEUR rassemble ceux qui vivent l&apos;Afrique au Maroc, chaque jour.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {POSTS.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <Placeholder seed={post.id} tone={i % 2 === 0 ? "food" : "beauty"} />
                </div>
                <div className="absolute inset-0 flex items-end bg-charcoal/20 p-4">
                  <p className="font-body text-xs leading-snug text-ivory">{post.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-charcoal/10 pt-12 md:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-sand-dark text-sand-dark" />
                ))}
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 font-body text-xs uppercase tracking-[0.1em] text-muted">
                {t.author}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
