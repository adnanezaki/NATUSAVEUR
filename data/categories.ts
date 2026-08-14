import type { Category } from "./types";

export const foodCategories: Category[] = [
  { id: "c-f1", slug: "manioc-derives", name: "Manioc & dérivés", category: "food" },
  { id: "c-f2", slug: "farines-cereales", name: "Farines & céréales", category: "food" },
  { id: "c-f3", slug: "surgeles", name: "Surgelés", category: "food" },
  { id: "c-f4", slug: "huiles", name: "Huiles", category: "food" },
  { id: "c-f5", slug: "condiments", name: "Condiments", category: "food" },
  { id: "c-f6", slug: "produits-du-terroir", name: "Produits du terroir", category: "food" },
];

export const beautyCategories: Category[] = [
  { id: "c-b1", slug: "cheveux", name: "Cheveux", category: "beauty" },
  { id: "c-b2", slug: "corps", name: "Corps", category: "beauty" },
  { id: "c-b3", slug: "visage", name: "Visage", category: "beauty" },
  { id: "c-b4", slug: "huiles", name: "Huiles", category: "beauty" },
  { id: "c-b5", slug: "soins-naturels", name: "Soins naturels", category: "beauty" },
];

export const categories: Category[] = [...foodCategories, ...beautyCategories];
