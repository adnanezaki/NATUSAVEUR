import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Cette page est un espace réservé pour la politique de confidentialité
        de NATUSAVEUR. Le contenu définitif sera ajouté une fois les
        informations légales de l&apos;entreprise confirmées.
      </p>
      <p>
        NATUSAVEUR s&apos;engage à protéger les données personnelles de ses
        clients conformément à la réglementation en vigueur au Maroc.
      </p>
    </LegalPage>
  );
}
