import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description: "Réponses aux questions fréquentes sur les commandes, la livraison et nos produits.",
};

const SECTIONS = [
  {
    title: "Commandes",
    items: [
      {
        question: "Comment commander ?",
        answer:
          "Vous pouvez commander directement sur le site via le panier, ou nous contacter sur WhatsApp pour passer commande.",
      },
      {
        question: "Quels sont les moyens de paiement ?",
        answer:
          "Le paiement à la livraison est disponible dès maintenant. D'autres moyens de paiement seront ajoutés prochainement.",
      },
      {
        question: "Puis-je commander sur WhatsApp ?",
        answer: "Oui, un bouton WhatsApp est disponible sur chaque produit et en bas de page.",
      },
    ],
  },
  {
    title: "Livraison",
    items: [
      {
        question: "Où livrez-vous ?",
        answer: "Nous livrons actuellement au Maroc. Les zones précises seront communiquées au moment de la commande.",
      },
      {
        question: "Quels sont les délais ?",
        answer: "Les délais varient selon la zone de livraison — une estimation vous sera communiquée à la commande.",
      },
      {
        question: "Combien coûte la livraison ?",
        answer: "Le tarif de livraison dépend du mode choisi et est affiché avant la validation de la commande.",
      },
    ],
  },
  {
    title: "Produits",
    items: [
      {
        question: "Comment conserver les produits ?",
        answer: "Chaque fiche produit indique les conditions de conservation recommandées.",
      },
      {
        question: "Quelle est leur origine ?",
        answer: "L'origine de chaque produit est précisée sur sa page dédiée.",
      },
    ],
  },
  {
    title: "Beauty",
    items: [
      {
        question: "Comment choisir mon produit ?",
        answer: "Chaque produit indique son type d'usage (cheveux, corps, visage) pour vous orienter.",
      },
      {
        question: "Comment utiliser les produits ?",
        answer: "Les instructions d'usage, quand disponibles, sont indiquées sur la fiche produit.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Reveal>
        <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Aide</p>
        <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">
          Questions fréquentes
        </h1>
      </Reveal>

      <div className="mt-14 flex flex-col gap-12">
        {SECTIONS.map((section, i) => (
          <Reveal key={section.title} delay={i * 0.05}>
            <h2 className="mb-4 font-body text-xs uppercase tracking-[0.14em] text-muted">
              {section.title}
            </h2>
            <Accordion items={section.items} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
