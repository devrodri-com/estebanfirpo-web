import "server-only";

import type { Project } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/metadata";
import { CALENDAR_URL, PUBLIC_EMAIL, createWhatsAppUrl } from "@/lib/site";
import { getProjectPageCopy } from "../project-page-copy";
import type {
  CanonicalProjectFaq,
  CanonicalProjectMetric,
  CanonicalProjectViewModel,
} from "../project-view-model";
import { projectMigrationAdjustments } from "./project-migration-adjustments";

type LegacyLabel = string | { label: string; iconKey?: string };

const sharedRentalTranslations: Record<string, Record<Locale, string>> = {
  "30 días": { es: "30 días", en: "30 days" },
  "90 días": { es: "90 días", en: "90 days" },
  Tradicional: { es: "Tradicional", en: "Traditional leasing" },
  "No restr.": { es: "Sin restricciones", en: "No rental restrictions" },
  "Sin restricciones": { es: "Sin restricciones", en: "No rental restrictions" },
};

function labels(items: LegacyLabel[] | undefined): string[] {
  return (items ?? [])
    .map((item) => (typeof item === "string" ? item : item.label))
    .filter((item): item is string => item.trim().length > 0);
}

function formatUsd(value: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    maximumFractionDigits: 0,
  }).format(value);
  return locale === "en" ? `From US$${formatted}` : `Desde US$${formatted}`;
}

function createMailto(subject: string, body: string): string {
  return `mailto:${PUBLIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function localizeRental(project: Project, locale: Locale): string | undefined {
  const dedicated = locale === "en" ? project.rentalPolicyEn : project.rentalPolicyEs;
  if (dedicated?.trim()) return dedicated;

  const shared = project.rentalPolicy?.trim();
  if (!shared) return undefined;
  return sharedRentalTranslations[shared]?.[locale] ?? shared;
}

function mapQuery(project: Project): string {
  if (typeof project.lat === "number" && typeof project.lng === "number") {
    return `${project.lat},${project.lng}`;
  }
  return /\d/.test(project.city) ? project.city : `${project.name} ${project.city}`;
}

function adaptFaqs(project: Project, locale: Locale): CanonicalProjectFaq[] {
  const faqs = locale === "en" ? project.faqsEn ?? [] : project.faqsEs ?? [];
  const overrides = projectMigrationAdjustments[project.slug]?.faqAnswerOverrides?.[locale] ?? {};

  return faqs.map((faq, index) => ({
    id: `${project.id}-faq-${index + 1}`,
    question: faq.q,
    answer: overrides[faq.q] ?? faq.a,
  }));
}

function adaptMetrics(project: Project, locale: Locale): CanonicalProjectMetric[] {
  const adjusted = projectMigrationAdjustments[project.slug]?.metrics?.[locale];
  if (adjusted) return adjusted.map((item) => ({ ...item }));

  const claims = locale === "en" ? project.microClaimsEn ?? [] : project.microClaimsEs ?? [];
  return claims.map((value, index) => ({
    id: `${project.id}-metric-${index + 1}`,
    value,
  }));
}

export function adaptLegacyProject(
  project: Project,
  locale: Locale,
): CanonicalProjectViewModel {
  const copy = getProjectPageCopy(locale);
  const adjustment = projectMigrationAdjustments[project.slug];
  const publicPath = `/${locale}${project.slug}`;
  const price =
    adjustment?.price?.[locale] ??
    (typeof project.priceFromUsd === "number"
      ? formatUsd(project.priceFromUsd, locale)
      : locale === "en"
        ? "Inquire about current pricing and inventory"
        : "Consultar precio e inventario vigente");
  const priceWithRate =
    !adjustment?.price && typeof project.pricePerSfApprox === "number"
      ? `${price} · ~US$${new Intl.NumberFormat("en-US").format(project.pricePerSfApprox)}/sf`
      : price;
  const delivery =
    adjustment?.delivery?.[locale] ??
    project.delivery?.trim() ??
    (locale === "en" ? "Request the estimated completion" : "Consultar entrega estimada");
  const rental =
    adjustment?.rental?.[locale] ??
    localizeRental(project, locale) ??
    (locale === "en"
      ? "Ask about the applicable rental policy"
      : "Consultar política de renta aplicable");
  const condition =
    adjustment?.condition?.[locale] ??
    (typeof project.furnished === "boolean"
      ? locale === "en"
        ? project.furnished
          ? "Furnished"
          : "Unfurnished"
        : project.furnished
          ? "Amueblado"
          : "Sin amueblar"
      : locale === "en"
        ? "Ask about specifications and delivery condition"
        : "Consultar especificaciones y condición de entrega");
  const genericDecisionNote =
    locale === "en"
      ? "Pricing, availability, schedules, and conditions are subject to reconfirmation."
      : "Precios, disponibilidad, plazos y condiciones sujetos a reconfirmación.";
  const hoaNote = project.hoa ? ` HOA ${project.hoa}.` : "";
  const gallery = (project.images ?? []).map((image, index) => ({
    src: image.src,
    alt:
      image.alt?.trim() ||
      (locale === "en"
        ? `${project.name} — image ${index + 1}`
        : `${project.name} — imagen ${index + 1}`),
  }));
  const paymentSteps = locale === "en" ? project.paymentPlanEn ?? [] : project.paymentPlanEs ?? [];
  const messages = copy.messages;
  const resolvedMapQuery = mapQuery(project);

  return {
    locale,
    identity: {
      id: project.id,
      slug: project.slug.slice("/proyectos/".length),
      name: project.name,
      publicPath,
      canonicalUrl: new URL(publicPath, SITE_URL).toString(),
    },
    location: {
      display: project.city,
      mapQuery: resolvedMapQuery,
      interactiveMap: resolvedMapQuery.trim().length > 0,
      ...(adjustment?.structuredAddress
        ? { structuredAddress: { ...adjustment.structuredAddress } }
        : {}),
    },
    hero: {
      src: project.image,
      alt: `${project.name} — ${project.city}`,
    },
    decisions: {
      price: priceWithRate,
      delivery,
      rental,
      condition,
      note: `${adjustment?.decisionsNote?.[locale] ?? genericDecisionNote}${hoaNote}`,
    },
    metrics: {
      items: adaptMetrics(project, locale),
      note:
        adjustment?.metricsNote?.[locale] ??
        (locale === "en"
          ? "Figures and attributes from the current project page; subject to change."
          : "Cifras y atributos de la ficha actual; sujetos a cambios."),
    },
    gallery,
    highlights: locale === "en" ? [...(project.highlightsEn ?? [])] : [...(project.highlights ?? [])],
    unitTypes: labels(locale === "en" ? project.unitMixEn : project.unitMixEs),
    features: labels(locale === "en" ? project.featuresEn : project.featuresEs),
    faqs: adaptFaqs(project, locale),
    payment:
      adjustment?.paymentRequest || paymentSteps.length === 0
        ? { kind: "request", copy: copy.paymentRequest }
        : { kind: "steps", steps: [...paymentSteps] },
    contact: {
      whatsappHref: createWhatsAppUrl(messages.whatsapp(project.name)),
      calendarHref: CALENDAR_URL,
      emailHref: createMailto(
        messages.emailSubject(project.name),
        messages.emailBody(project.name),
      ),
      plansHref: createMailto(
        messages.plansSubject(project.name),
        messages.plansBody(project.name),
      ),
      availabilityHref: createMailto(
        messages.availabilitySubject(project.name),
        messages.availabilityBody(project.name),
      ),
      materialsHref: createMailto(
        messages.materialsSubject(project.name),
        messages.materialsBody(project.name),
      ),
      paymentPlanHref: createMailto(
        messages.paymentSubject(project.name),
        messages.paymentBody(project.name),
      ),
      shareUrl: new URL(publicPath, SITE_URL).toString(),
    },
    disclaimer: copy.disclaimer,
  };
}
