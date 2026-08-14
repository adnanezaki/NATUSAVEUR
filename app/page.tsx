import { Hero } from "@/components/hero/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { FoodBeautySplit } from "@/components/sections/FoodBeautySplit";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { AfricaMoroccoStory } from "@/components/sections/AfricaMoroccoStory";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { Community } from "@/components/sections/Community";
import { StoriesPreview } from "@/components/sections/StoriesPreview";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <FoodBeautySplit />
      <FeaturedProducts />
      <AfricaMoroccoStory />
      <ProductCategories />
      <Community />
      <StoriesPreview />
      <NewsletterSection />
    </>
  );
}
