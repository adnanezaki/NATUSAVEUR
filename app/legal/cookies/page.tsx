import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Politique de cookies" };

export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies">
      <p>
        Cette page est un espace réservé pour la politique de cookies de
        NATUSAVEUR. Le contenu définitif sera ajouté une fois les
        informations légales de l&apos;entreprise confirmées.
      </p>
    </LegalPage>
  );
}
