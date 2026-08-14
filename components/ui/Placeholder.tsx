import { cn } from "@/lib/utils";
import { Leaf, Droplet, Sparkles, Flame, Sun, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PlaceholderTone = "food" | "beauty" | "neutral" | "dark";

const TONE_GRADIENTS: Record<PlaceholderTone, string> = {
  food: "bg-gradient-to-br from-terracotta via-[#b96f4f] to-sand",
  beauty: "bg-gradient-to-br from-deep-green via-forest to-sand",
  neutral: "bg-gradient-to-br from-sand via-ivory to-surface",
  dark: "bg-gradient-to-br from-charcoal via-deep-green-dark to-forest",
};

const TONE_ICON_COLOR: Record<PlaceholderTone, string> = {
  food: "text-ivory/25",
  beauty: "text-ivory/25",
  neutral: "text-charcoal/10",
  dark: "text-ivory/15",
};

const TONE_TEXT: Record<PlaceholderTone, string> = {
  food: "text-ivory",
  beauty: "text-ivory",
  neutral: "text-charcoal",
  dark: "text-ivory",
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const ICONS: LucideIcon[] = [Leaf, Droplet, Sparkles, Flame, Sun, Wheat];

export function Placeholder({
  seed,
  tone = "neutral",
  label,
  className,
  icon: IconOverride,
}: {
  seed: string;
  tone?: PlaceholderTone;
  label?: string;
  className?: string;
  icon?: LucideIcon;
}) {
  const Icon = IconOverride ?? ICONS[hashString(seed) % ICONS.length];

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        TONE_GRADIENTS[tone],
        className
      )}
      role="img"
      aria-label={label ?? "Image du produit"}
    >
      <Icon
        strokeWidth={0.75}
        className={cn("h-2/3 w-2/3 -rotate-6", TONE_ICON_COLOR[tone])}
      />
      {label && (
        <span
          className={cn(
            "absolute bottom-3 left-3 right-3 truncate font-body text-[11px] uppercase tracking-[0.14em]",
            TONE_TEXT[tone],
            "opacity-70"
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
