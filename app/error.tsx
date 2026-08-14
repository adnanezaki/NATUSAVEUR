"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-terracotta">Erreur</p>
      <h1 className="mt-4 font-display text-4xl text-charcoal sm:text-5xl">OUPS.</h1>
      <p className="mt-3 max-w-sm font-body text-sm text-muted">
        Une erreur est survenue. Merci de réessayer.
      </p>
      <Button onClick={reset} className="mt-8">
        Réessayer
      </Button>
    </div>
  );
}
