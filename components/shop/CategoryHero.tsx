import { Placeholder } from "@/components/ui/Placeholder";
import type { PlaceholderTone } from "@/components/ui/Placeholder";

export function CategoryHero({
  eyebrow,
  title,
  subtitle,
  tone,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone: PlaceholderTone;
}) {
  return (
    <section className="relative flex h-[52vh] min-h-[380px] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Placeholder seed={eyebrow} tone={tone} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-sand">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl text-ivory sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-lg font-body text-sm text-ivory/80">{subtitle}</p>
      </div>
    </section>
  );
}
