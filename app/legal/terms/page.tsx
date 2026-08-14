import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Conditions générales" };

export default function TermsPage() {
  return (
    <LegalPage title="Conditions générales">
      <p>
        Cette page est un espace réservé pour les conditions générales de
        vente de NATUSAVEUR. Le contenu définitif sera ajouté une fois les
        informations légales de l&apos;entreprise confirmées.
      </p>
    </LegalPage>
  );
}
