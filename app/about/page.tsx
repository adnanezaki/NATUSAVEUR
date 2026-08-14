import type { Metadata } from "next";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About — Notre histoire",
  description:
    "NATUSAVEUR est un pont entre l'héritage africain et la vie moderne au Maroc.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Reveal>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">
            Notre histoire
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
            Not just products.
            <br />A connection to home.
          </h1>
        </Reveal>
      </section>

      <Reveal className="mx-auto max-w-6xl px-6">
        <div className="aspect-[21/9] overflow-hidden">
          <Placeholder seed="about-hero" tone="dark" />
        </div>
      </Reveal>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-2xl text-charcoal">Notre philosophie</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted">
            NATUSAVEUR est né d&apos;un constat simple : vivre au Maroc ne
            devrait jamais signifier renoncer aux produits, aux saveurs et aux
            rituels qui font partie de notre quotidien. Nous voulons être ce
            pont entre l&apos;héritage africain et la vie moderne que nous
            construisons ici.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl text-charcoal">Deux univers, une même mission</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted">
            NATUSAVEUR Food rassemble des produits alimentaires authentiques —
            de l&apos;attiéké au miel de forêt. NATUSAVEUR Beauty s&apos;inspire
            des rituels de beauté africains à travers une sélection de soins
            naturels. Deux univers, une même exigence de qualité.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-2xl text-charcoal">Une communauté</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted">
            Nous construisons NATUSAVEUR avec et pour la communauté africaine
            au Maroc — un espace où l&apos;on retrouve ce qui nous relie à la
            maison, tout en avançant dans notre vie ici.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-2xl text-charcoal">Notre vision</h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted">
            NATUSAVEUR a vocation à grandir avec sa communauté — de nouveaux
            produits, de nouvelles origines, et à terme, de nouveaux marchés au-delà du Maroc.
          </p>
        </Reveal>
      </section>

      <section className="bg-deep-green py-20 text-center text-ivory">
        <Reveal>
          <p className="font-display text-2xl sm:text-3xl">L&apos;Afrique dans votre quotidien.</p>
          <div className="mt-8 flex justify-center gap-4">
            <ButtonLink href="/food" variant="secondary">
              Découvrir Food
            </ButtonLink>
            <ButtonLink href="/beauty" variant="outline" className="border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10">
              Découvrir Beauty
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
