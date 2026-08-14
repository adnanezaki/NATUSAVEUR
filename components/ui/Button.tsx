import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    "bg-deep-green text-ivory hover:bg-deep-green-dark",
  secondary:
    "bg-terracotta text-ivory hover:bg-terracotta-dark",
  outline:
    "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal/5",
  ghost: "text-charcoal hover:bg-charcoal/5",
  whatsapp: "bg-[#25D366] text-[#0b1a10] hover:bg-[#1fb856]",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4.5 text-sm",
};

const base =
  "inline-flex items-center justify-center gap-2 font-body font-medium uppercase tracking-[0.08em] transition-all duration-300 ease-out disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(base, VARIANT_STYLES[variant], SIZE_STYLES[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className={cn(base, VARIANT_STYLES[variant], SIZE_STYLES[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
