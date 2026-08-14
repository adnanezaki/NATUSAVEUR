import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">404</p>
      <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">OUPS.</h1>
      <p className="mt-3 max-w-sm font-body text-sm text-muted">
        Cette page semble introuvable.
      </p>
      <ButtonLink href="/" className="mt-8">
        Retour à l&apos;accueil
      </ButtonLink>
    </div>
  );
}
