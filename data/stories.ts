import type { Story } from "./types";

export const stories: Story[] = [
  {
    id: "s-01",
    slug: "comment-preparer-attieke",
    title: "Comment préparer l'attiéké ?",
    category: "Recettes",
    excerpt: "Le pas-à-pas pour réussir un attiéké moelleux, comme à la maison.",
    image: "story-attieke",
    date: "2026-06-02",
    readingTime: "4 min",
    content: [
      "L'attiéké est une semoule de manioc fermentée qui accompagne aussi bien le poisson braisé que le poulet ou les légumes sautés.",
      "Pour le préparer, il suffit de réhydrater la semoule à la vapeur pendant 5 à 10 minutes, en l'égrainant à la fourchette à mi-cuisson pour éviter les grumeaux.",
      "Servez chaud, avec une sauce tomate relevée, du piment et des oignons frais pour retrouver le goût de chez vous.",
    ],
    relatedProductSlugs: ["attieke-choco", "alloco-decoupe-surgele"],
  },
  {
    id: "s-02",
    slug: "attieke-vs-placali",
    title: "Attiéké vs Placali : quelle différence ?",
    category: "Culture",
    excerpt: "Deux piliers du manioc, deux textures, deux histoires.",
    image: "story-placali",
    date: "2026-05-18",
    readingTime: "5 min",
    content: [
      "L'attiéké et le placali sont tous deux issus du manioc fermenté, mais leur préparation et leur texture diffèrent profondément.",
      "L'attiéké se présente sous forme de semoule légère et aérée, tandis que le placali forme une pâte homogène et souple, plus proche du foutou.",
      "Le choix entre les deux dépend souvent de la région d'origine et du plat que l'on souhaite accompagner.",
    ],
    relatedProductSlugs: ["attieke-choco", "placali"],
  },
  {
    id: "s-03",
    slug: "5-produits-ivoiriens-a-decouvrir",
    title: "5 produits ivoiriens à découvrir",
    category: "Origines",
    excerpt: "Une sélection pour explorer la richesse du terroir ivoirien.",
    image: "story-terroir",
    date: "2026-04-30",
    readingTime: "3 min",
    content: [
      "De l'akpi au kaklou, en passant par le miel de forêt, la Côte d'Ivoire regorge de produits authentiques encore méconnus au Maroc.",
      "Chacun de ces produits raconte une histoire de terroir, de savoir-faire transmis et de saveurs uniques.",
      "Voici cinq incontournables à intégrer dans votre cuisine du quotidien.",
    ],
    relatedProductSlugs: ["akpi", "miel-de-foret", "kaklou-kple-sioko"],
  },
  {
    id: "s-04",
    slug: "afrique-dans-nos-cuisines-au-maroc",
    title: "L'Afrique dans nos cuisines au Maroc",
    category: "Communauté",
    excerpt: "Comment la communauté africaine réinvente son quotidien culinaire au Maroc.",
    image: "story-communaute",
    date: "2026-04-10",
    readingTime: "6 min",
    content: [
      "Vivre au Maroc ne veut pas dire renoncer aux saveurs de chez soi. De plus en plus de foyers africains recréent leurs plats traditionnels avec les moyens du bord.",
      "NATUSAVEUR est né de cette envie simple : rendre accessibles les produits qui nourrissent cette continuité culturelle.",
      "Une cuisine qui voyage, une communauté qui se retrouve autour d'une même table.",
    ],
    relatedProductSlugs: [],
  },
  {
    id: "s-05",
    slug: "rituels-de-beaute-africains",
    title: "Les rituels de beauté africains",
    category: "Beauty",
    excerpt: "Un aperçu des gestes et ingrédients qui traversent les générations.",
    image: "story-beauty",
    date: "2026-03-22",
    readingTime: "4 min",
    content: [
      "Karité, huile de baobab, savon noir : les rituels de beauté africains reposent sur des ingrédients naturels transmis de génération en génération.",
      "Ces gestes, souvent simples, s'inscrivent dans une routine quotidienne autant que dans un moment de soin de soi.",
      "NATUSAVEUR Beauty s'inspire de ces traditions pour proposer une sélection de produits pensée pour le quotidien.",
    ],
    relatedProductSlugs: ["huile-botanique-cheveux", "beurre-de-karite-corps"],
  },
];

export function getStoryBySlug(slug: string) {
  return stories.find((s) => s.slug === slug);
}
