import "server-only";

import { getPriorityProjectGovernance } from "./priority-projects";
import type {
  GovernedField,
  LocalizedText,
  PriorityProjectFields,
  PublicGovernedField,
  PublicPriorityProjectFields,
  PublicPriorityProjectGovernance,
  PublicProjectSource,
} from "./types";

type PublicFieldKey = Exclude<keyof PriorityProjectFields, "imageRights">;
type PublicFieldValue = LocalizedText | LocalizedText[];

const publicFieldNotes: Record<PublicFieldKey, LocalizedText> = {
  commercialStatus: {
    es: "El estado comercial y el inventario por unidad deben reconfirmarse antes de avanzar.",
    en: "Commercial status and unit-level inventory should be reconfirmed before proceeding.",
  },
  price: {
    es: "Precio e inventario actuales deben reconfirmarse. Solicitá el price sheet vigente antes de comparar.",
    en: "Current pricing and inventory should be reconfirmed. Request the latest price sheet before comparing.",
  },
  delivery: {
    es: "La entrega estimada requiere documentación actualizada.",
    en: "Estimated completion requires current documentation.",
  },
  rentalPolicy: {
    es: "Confirmá las reglas de renta y uso aplicables a la unidad.",
    en: "Confirm the rental and use rules that apply to the unit.",
  },
  financing: {
    es: "Confirmá alternativas, elegibilidad y condiciones aplicables a tu perfil.",
    en: "Confirm the options, eligibility, and terms that apply to your profile.",
  },
  availability: {
    es: "Solicitá inventario fechado antes de comparar opciones.",
    en: "Request dated inventory before comparing options.",
  },
  paymentPlan: {
    es: "El plan de pagos debe revisarse contra la versión comercial vigente.",
    en: "The payment plan should be checked against the current commercial version.",
  },
};

const buyerQuestions: LocalizedText[] = [
  {
    es: "¿Cuál es el precio vigente y qué unidades están disponibles hoy?",
    en: "What is the current price and which units are available today?",
  },
  {
    es: "¿Cuál es la entrega estimada y qué documento actualizado la respalda?",
    en: "What is the estimated completion and which current document supports it?",
  },
  {
    es: "¿Qué plan de pagos aplica a la unidad que estoy considerando?",
    en: "Which payment plan applies to the unit I am considering?",
  },
  {
    es: "¿Qué reglas de renta y uso aplican exactamente a esa unidad?",
    en: "Which rental and use rules apply specifically to that unit?",
  },
  {
    es: "¿Cuáles son el HOA estimado y los demás costos relevantes?",
    en: "What are the estimated HOA fees and other relevant costs?",
  },
  {
    es: "¿Existe financiación aplicable a mi perfil y cuáles son sus condiciones?",
    en: "Is financing available for my profile, and what are its terms?",
  },
  {
    es: "¿Qué documentos contractuales y de due diligence debería revisar antes de avanzar?",
    en: "Which contractual and due-diligence documents should I review before proceeding?",
  },
];

const officialSourceKinds = new Set([
  "official_project_site",
  "official_developer_site",
  "official_sales_site",
  "official_fact_sheet",
  "official_public_record",
]);

function cloneText(value: LocalizedText): LocalizedText {
  return { es: value.es, en: value.en };
}

function clonePublicValue<T extends PublicFieldValue>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(cloneText) as T;
  }

  return cloneText(value) as T;
}

function toPublicField<T extends PublicFieldValue>(
  key: PublicFieldKey,
  field: GovernedField<T>,
  publicSourcesById: ReadonlyMap<string, PublicProjectSource>,
): PublicGovernedField<T> {
  const sources = field.sourceIds.flatMap((sourceId) => {
    const source = publicSourcesById.get(sourceId);
    return source ? [source] : [];
  });
  const fieldValue = field.value;
  const canPublishValue =
    fieldValue !== null &&
    sources.length > 0 &&
    (field.status === "reviewed" || field.status === "reconfirmation_required");

  return {
    publicValue:
      canPublishValue && fieldValue !== null
        ? clonePublicValue(fieldValue as T)
        : null,
    status: field.status,
    sources,
    reviewedAt: field.reviewedAt,
    requiresReconfirmation:
      field.validity.kind === "reconfirm_before_use" ||
      field.status === "reconfirmation_required" ||
      field.status === "unverified",
    validUntil: field.validity.kind === "valid_until" ? field.validity.date : null,
    publicNote: cloneText(publicFieldNotes[key]),
  };
}

function latestObservedAt(sources: PublicProjectSource[]): string | null {
  return sources.reduce<string | null>(
    (latest, source) => (!latest || source.observedAt > latest ? source.observedAt : latest),
    null,
  );
}

export function getPublicPriorityProjectGovernance(
  slug: string,
): PublicPriorityProjectGovernance | null {
  const governance = getPriorityProjectGovernance(slug);
  if (!governance) return null;

  const publicSourcesById = new Map<string, PublicProjectSource>();
  governance.sources
    .filter(
      (source) =>
        source.public &&
        Boolean(source.url) &&
        officialSourceKinds.has(source.kind),
    )
    .forEach((source) => {
      publicSourcesById.set(source.id, {
        title: cloneText(source.title),
        url: source.url as string,
        scope: cloneText(source.note),
        observedAt: source.observedAt,
      });
    });
  const sources = [...publicSourcesById.values()];

  const fields: PublicPriorityProjectFields = {
    commercialStatus: toPublicField(
      "commercialStatus",
      governance.fields.commercialStatus,
      publicSourcesById,
    ),
    price: toPublicField("price", governance.fields.price, publicSourcesById),
    delivery: toPublicField("delivery", governance.fields.delivery, publicSourcesById),
    rentalPolicy: toPublicField(
      "rentalPolicy",
      governance.fields.rentalPolicy,
      publicSourcesById,
    ),
    financing: toPublicField("financing", governance.fields.financing, publicSourcesById),
    availability: toPublicField(
      "availability",
      governance.fields.availability,
      publicSourcesById,
    ),
    paymentPlan: toPublicField(
      "paymentPlan",
      governance.fields.paymentPlan,
      publicSourcesById,
    ),
  };

  return {
    slug: governance.slug,
    overallStatus: governance.overallStatus,
    location: cloneText(governance.location),
    developer: cloneText(governance.developer),
    summary: cloneText(governance.summary),
    profileFit: governance.profileFit.map(cloneText),
    factualHighlights: governance.factualHighlights.map(cloneText),
    fields,
    buyerQuestions: buyerQuestions.map(cloneText),
    ctaContext: {
      es: "Pedí inventario, precio, entrega y condiciones de uso vigentes antes de decidir si el proyecto encaja en tu selección.",
      en: "Request current inventory, pricing, completion, and use terms before deciding whether the project belongs on your shortlist.",
    },
    sourcesObservedAt: latestObservedAt(sources),
    sources,
  };
}
