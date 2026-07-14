import type { Locale } from "@/i18n/config";

export type RemoteProcessFaq = {
  question: string;
  answer: string;
};

export const remoteProcessFaq: Record<Locale, RemoteProcessFaq> = {
  es: {
    question: "¿Puedo realizar todo el proceso desde fuera de Estados Unidos?",
    answer:
      "Sí. Todo el proceso puede coordinarse a distancia, desde la evaluación inicial hasta el cierre, sin necesidad de viajar. Esteban, junto con Miami Life Realty, coordina a los profesionales necesarios para cada operación, incluidos abogados y especialistas en financiación. La aprobación y las condiciones de financiación dependen del perfil del comprador y del proveedor.",
  },
  en: {
    question: "Can I complete the entire process from outside the United States?",
    answer:
      "Yes. The entire process can be coordinated remotely, from the initial evaluation through closing, without the need to travel. Esteban, together with Miami Life Realty, coordinates the professionals required for each transaction, including attorneys and financing specialists. Financing approval and terms depend on the buyer’s profile and the provider.",
  },
};

function normalizeQuestion(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const equivalenceSignals: Record<
  Locale,
  { remote: readonly RegExp[]; complete: readonly RegExp[] }
> = {
  es: {
    remote: [
      /\ba distancia\b/,
      /\bremot(?:o|a|os|as|amente)\b/,
      /\bdesde fuera(?: de estados unidos)?\b/,
      /\bfuera de estados unidos\b/,
      /\bdesde el extranjero\b/,
      /\bsin (?:necesidad de )?viajar\b/,
    ],
    complete: [
      /\btodo el proceso\b/,
      /\b(?:proceso|compra|operacion|transaccion) complet(?:o|a)\b/,
      /\bproceso entero\b/,
      /\bcompletar (?:todo )?(?:el |la )?(?:proceso|compra|operacion|transaccion)\b/,
      /\bhasta el cierre\b/,
      /\bde principio a fin\b/,
    ],
  },
  en: {
    remote: [
      /\bremot(?:e|ely)\b/,
      /\bfrom outside(?: the united states| the us)?\b/,
      /\boutside (?:the united states|the us)\b/,
      /\bfrom abroad\b/,
      /\bwithout (?:the need to )?travel(?:ing)?\b/,
    ],
    complete: [
      /\b(?:the )?entire process\b/,
      /\b(?:the )?(?:complete|full|whole) (?:process|purchase|transaction)\b/,
      /\bcomplete (?:the )?(?:process|purchase|transaction)\b/,
      /\bthrough closing\b/,
      /\bstart to finish\b/,
      /\bend to end\b/,
    ],
  },
};

export function isEquivalentRemoteProcessQuestion(
  question: string,
  locale: Locale,
): boolean {
  const normalized = normalizeQuestion(question);
  if (normalized === normalizeQuestion(remoteProcessFaq[locale].question)) return true;

  const signals = equivalenceSignals[locale];
  return (
    signals.remote.some((pattern) => pattern.test(normalized)) &&
    signals.complete.some((pattern) => pattern.test(normalized))
  );
}
