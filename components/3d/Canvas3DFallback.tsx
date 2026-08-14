import { cn } from "@/lib/utils";

/**
 * Shown by `next/dynamic`'s `loading` option while a 3D scene's JS chunk is
 * still downloading — before the component has even mounted, so it can't
 * rely on `useProgress` (see `Preloader`, which covers the later
 * asset-loading phase once the chunk has arrived).
 */
export function Canvas3DFallback({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full w-full",
        tone === "dark" ? "bg-charcoal" : "bg-ivory",
        className
      )}
      aria-hidden="true"
    />
  );
}
