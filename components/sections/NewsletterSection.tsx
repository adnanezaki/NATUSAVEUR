import { Reveal } from "@/components/animations/Reveal";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <div className="border-y border-charcoal/10 py-12">
          <NewsletterForm />
        </div>
      </Reveal>
    </section>
  );
}
