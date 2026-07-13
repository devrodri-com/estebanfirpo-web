import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  Images,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import GalleryLightbox from "@/components/GalleryLightbox";
import type {
  EditorialStatus,
  LocalizedText,
  PublicGovernedField,
  PublicPriorityProjectGovernance,
} from "@/data/project-governance/types";
import type { Project } from "@/data/types";
import { CALENDAR_URL, createWhatsAppUrl } from "@/lib/site";

type Locale = "es" | "en";
type PriorityProjectIdentity = Pick<Project, "name" | "image" | "images">;

type PriorityProjectPageProps = {
  project: PriorityProjectIdentity;
  governance: PublicPriorityProjectGovernance;
  locale: Locale;
};

const fieldOrder = [
  "commercialStatus",
  "price",
  "delivery",
  "rentalPolicy",
  "availability",
  "financing",
  "paymentPlan",
] as const;

function localize(value: LocalizedText, locale: Locale) {
  return value[locale];
}

function formatReviewDate(value: string | null, locale: Locale) {
  if (!value) return null;

  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function statusStyles(status: EditorialStatus) {
  if (status === "reviewed") {
    return "border-emerald-700/20 bg-emerald-50 text-emerald-900";
  }

  if (status === "inactive") {
    return "border-neutral-500/20 bg-neutral-100 text-neutral-700";
  }

  if (status === "reconfirmation_required") {
    return "border-amber-700/20 bg-amber-50 text-amber-950";
  }

  return "border-[#0A2540]/15 bg-[#F6F5F0] text-[#0A2540]";
}

function StatusIcon({ status }: { status: EditorialStatus }) {
  if (status === "reviewed") {
    return <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />;
  }

  if (status === "reconfirmation_required") {
    return <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />;
  }

  return <CircleAlert className="h-3.5 w-3.5" aria-hidden="true" />;
}

export function PriorityProjectPage({
  project,
  governance,
  locale,
}: PriorityProjectPageProps) {
  const isEnglish = locale === "en";
  const copy = {
    projects: isEnglish ? "Projects" : "Proyectos",
    eyebrow: isEnglish ? "Project to explore" : "Proyecto para explorar",
    summaryEyebrow: isEnglish ? "Project overview" : "Panorama del proyecto",
    reportedBySources: isEnglish
      ? "Information reported by official sources"
      : "Información comunicada por fuentes oficiales",
    reportedContext: isEnglish
      ? "These points describe the project; they do not confirm current inventory or commercial terms."
      : "Estos puntos describen el proyecto; no confirman inventario ni condiciones comerciales vigentes.",
    editorialFit: isEnglish ? "It may be relevant if…" : "Puede ser relevante si…",
    editorialContext: isEnglish
      ? "An editorial comparison frame, not a definitive recommendation."
      : "Un marco editorial de comparación, no una recomendación definitiva.",
    commercialTitle: isEnglish
      ? "Commercial information and review status"
      : "Información comercial y estado de revisión",
    commercialCopy: isEnglish
      ? "Each data point shows its status, the available source, the review date, and whether it needs reconfirmation."
      : "Cada dato indica su estado, la fuente disponible, la fecha de revisión y si necesita reconfirmación.",
    pendingValue: isEnglish ? "Pending verification" : "Pendiente de verificación",
    reviewedOn: isEnglish ? "Reviewed" : "Revisado",
    source: isEnglish ? "Source" : "Fuente",
    sources: isEnglish ? "Sources" : "Fuentes",
    reconfirmBeforeUse: isEnglish
      ? "Reconfirm before using in a decision"
      : "Reconfirmar antes de usar en una decisión",
    validUntil: isEnglish ? "Valid until" : "Vigente hasta",
    questionsTitle: isEnglish
      ? "What to confirm before proceeding"
      : "Qué conviene confirmar antes de avanzar",
    questionsCopy: isEnglish
      ? "Use these questions to compare options with the same level of current information and supporting documents."
      : "Usá estas preguntas para comparar opciones con el mismo nivel de información vigente y documentación de respaldo.",
    gallery: isEnglish ? "Existing project imagery" : "Imágenes existentes del proyecto",
    sourceTitle: isEnglish ? "Source register" : "Registro de fuentes",
    observedOn: isEnglish ? "Observed" : "Observada",
    ctaEyebrow: isEnglish ? "Compare with context" : "Comparar con contexto",
    ctaTitle: isEnglish
      ? `Review ${project.name} with Esteban`
      : `Revisá ${project.name} con Esteban`,
    whatsapp: isEnglish ? "Ask on WhatsApp" : "Consultar por WhatsApp",
    schedule: isEnglish ? "Schedule a conversation" : "Agendar una conversación",
    developer: isEnglish ? "Developer / team" : "Developer / equipo",
    location: isEnglish ? "Location" : "Ubicación",
  };

  const fieldLabels: Record<(typeof fieldOrder)[number], string> = {
    commercialStatus: isEnglish ? "Commercial status" : "Estado comercial",
    price: isEnglish ? "Price" : "Precio",
    delivery: isEnglish ? "Estimated completion" : "Entrega estimada",
    rentalPolicy: isEnglish ? "Rental policy" : "Política de renta",
    availability: isEnglish ? "Availability" : "Disponibilidad",
    financing: isEnglish ? "Financing" : "Financiación",
    paymentPlan: isEnglish ? "Payment plan" : "Plan de pagos",
  };

  const statusLabels: Record<EditorialStatus, string> = {
    reviewed: isEnglish ? "Reviewed" : "Revisado",
    reconfirmation_required: isEnglish
      ? "Subject to reconfirmation"
      : "Sujeto a reconfirmación",
    unverified: isEnglish ? "Unverified" : "Sin verificar",
    inactive: isEnglish ? "Inactive" : "Inactivo",
  };

  const publicSources = governance.sources;
  const sourceReviewDate = formatReviewDate(governance.sourcesObservedAt, locale);
  const sourceCopy = sourceReviewDate
    ? isEnglish
      ? `Public sources were last consulted on ${sourceReviewDate}. Commercial terms remain subject to reconfirmation.`
      : `Las fuentes públicas se consultaron por última vez el ${sourceReviewDate}. Las condiciones comerciales siguen sujetas a reconfirmación.`
    : isEnglish
      ? "Commercial terms remain subject to reconfirmation."
      : "Las condiciones comerciales siguen sujetas a reconfirmación.";
  const whatsappMessage = isEnglish
    ? `Hi Esteban, I am reviewing ${project.name}. Could you help me reconfirm current inventory, price, estimated completion, and use or rental terms?`
    : `Hola Esteban, estoy revisando ${project.name}. ¿Podés ayudarme a reconfirmar inventario, precio, entrega estimada y condiciones de uso o renta vigentes?`;

  function renderFieldValue(
    field: PublicGovernedField<LocalizedText> | PublicGovernedField<LocalizedText[]>,
  ) {
    if (!field.publicValue) return copy.pendingValue;

    if (Array.isArray(field.publicValue)) {
      return field.publicValue.map((item) => localize(item, locale)).join(" · ");
    }

    return localize(field.publicValue, locale);
  }

  return (
    <article className="relative left-1/2 w-screen -translate-x-1/2 bg-[#FBFAF7] text-[#0D1521]">
      <header className="mx-auto max-w-6xl px-4 pb-12 pt-7 sm:pb-16 sm:pt-10">
        <nav aria-label={isEnglish ? "Breadcrumb" : "Ruta de navegación"}>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#0A2540]/65">
            <li>
              <Link
                href={`/${locale}/proyectos`}
                className="rounded-sm underline decoration-[#D4AF37]/65 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
              >
                {copy.projects}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#0A2540]">
              {project.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0A2540] sm:text-6xl">
              {project.name}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles(governance.overallStatus)}`}
              >
                <StatusIcon status={governance.overallStatus} />
                {statusLabels[governance.overallStatus]}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0A2540]/12 bg-white px-3 py-1.5 text-xs font-medium text-[#0A2540]/75">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {localize(governance.location, locale)}
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#0D1521]/75 sm:text-lg sm:leading-8">
              {localize(governance.summary, locale)}
            </p>
          </div>

          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E8E5DE] shadow-[0_18px_55px_rgba(10,37,64,0.13)] sm:aspect-[16/10]">
              <Image
                src={project.image}
                alt={`${project.name} — ${localize(governance.location, locale)}`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/28 via-transparent to-transparent" />
            </div>
          </figure>
        </div>

        <dl className="mt-8 grid gap-3 border-y border-[#0A2540]/10 py-5 sm:grid-cols-2">
          <div>
              <dt className="flex items-start gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A2540]/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9A7610]" aria-hidden="true" />
                {copy.location}
              </dt>
              <dd className="ml-7 mt-1 text-sm leading-6 text-[#0A2540]">
                {localize(governance.location, locale)}
              </dd>
          </div>
          <div>
              <dt className="flex items-start gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0A2540]/70">
                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9A7610]" aria-hidden="true" />
                {copy.developer}
              </dt>
              <dd className="ml-7 mt-1 text-sm leading-6 text-[#0A2540]">
                {localize(governance.developer, locale)}
              </dd>
          </div>
        </dl>
      </header>

      <section className="border-y border-[#0A2540]/10 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/70">
              {copy.summaryEyebrow}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-4xl">
              {copy.reportedBySources}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#0D1521]/65">
              {copy.reportedContext}
            </p>
            <ul className="mt-7 space-y-4">
              {governance.factualHighlights.map((item) => (
                <li key={item.es} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                  <span className="text-base leading-7 text-[#0D1521]/80">
                    {localize(item, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#0A2540] p-6 text-white shadow-[0_18px_55px_rgba(10,37,64,0.14)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.025em]">
              {copy.editorialFit}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/65">{copy.editorialContext}</p>
            <ul className="mt-7 space-y-5">
              {governance.profileFit.map((item) => (
                <li key={item.es} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                  <span className="text-base leading-7 text-white/85">
                    {localize(item, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="commercial-review-title">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/70">
            {isEnglish ? "Traceable information" : "Información trazable"}
          </p>
          <h2
            id="commercial-review-title"
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
          >
            {copy.commercialTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">
            {copy.commercialCopy}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fieldOrder.map((key) => {
            const field = governance.fields[key];
            const fieldSources = field.sources;
            const reviewedOn = formatReviewDate(field.reviewedAt, locale);

            return (
              <article
                key={key}
                className="flex min-h-full flex-col rounded-2xl border border-[#0A2540]/10 bg-white p-5 shadow-[0_8px_30px_rgba(10,37,64,0.04)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-[#0A2540]">{fieldLabels[key]}</h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${statusStyles(field.status)}`}
                  >
                    <StatusIcon status={field.status} />
                    {statusLabels[field.status]}
                  </span>
                </div>
                <p className="mt-5 text-base font-semibold leading-6 text-[#0A2540]">
                  {renderFieldValue(field)}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#0D1521]/67">
                  {localize(field.publicNote, locale)}
                </p>
                <div className="mt-auto border-t border-[#0A2540]/8 pt-4 text-xs leading-5 text-[#0D1521]/72">
                  {reviewedOn ? (
                    <p>
                      {copy.reviewedOn}: <time dateTime={field.reviewedAt ?? undefined}>{reviewedOn}</time>
                    </p>
                  ) : null}
                  <p>
                    {field.validUntil
                      ? `${copy.validUntil}: ${formatReviewDate(field.validUntil, locale)}`
                      : field.requiresReconfirmation
                        ? copy.reconfirmBeforeUse
                        : null}
                  </p>
                  {fieldSources.length > 0 ? (
                    <p className="mt-2">
                      {fieldSources.length === 1 ? copy.source : copy.sources}: {fieldSources
                        .map((source) => localize(source.title, locale))
                        .join(" · ")}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="bg-[#0A2540] py-14 text-white sm:py-20"
        aria-labelledby="buyer-questions-title"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
              <h2
                id="buyer-questions-title"
                className="text-3xl font-semibold tracking-[-0.03em]"
              >
                {copy.questionsTitle}
              </h2>
            </div>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              {copy.questionsCopy}
            </p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/5 p-6 sm:p-8">
            <ol className="space-y-5">
              {governance.buyerQuestions.map((question, index) => (
                <li key={question.es} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/45 text-xs font-semibold text-[#D4AF37]">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-base leading-7 text-white/82">
                    {localize(question, locale)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {Array.isArray(project.images) && project.images.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="project-gallery-title">
          <div className="rounded-2xl bg-[#0A2540] p-5 text-white sm:p-8">
            <div className="flex items-center gap-3">
              <Images className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
              <h2 id="project-gallery-title" className="text-2xl font-semibold tracking-[-0.025em]">
                {copy.gallery}
              </h2>
            </div>
            <GalleryLightbox images={project.images} name={project.name} locale={locale} />
          </div>
        </section>
      ) : null}

      <section className="border-y border-[#0A2540]/10 bg-white py-14 sm:py-20" aria-labelledby="source-register-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/70">
              {isEnglish ? "Provenance" : "Procedencia"}
            </p>
            <h2
              id="source-register-title"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0A2540] sm:text-4xl"
            >
              {copy.sourceTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#0D1521]/68">{sourceCopy}</p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {publicSources.map((source) => (
              <li key={source.url} className="rounded-xl border border-[#0A2540]/10 bg-[#FBFAF7] p-5">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 rounded-sm font-semibold text-[#0A2540] underline decoration-[#D4AF37]/60 decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
                >
                  {localize(source.title, locale)}
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <p className="mt-3 text-sm leading-6 text-[#0D1521]/65">
                  {localize(source.scope, locale)}
                </p>
                <p className="mt-3 text-xs text-[#0D1521]/68">
                  {copy.observedOn}: {formatReviewDate(source.observedAt, locale)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20" aria-labelledby="project-contact-title">
        <div className="rounded-2xl bg-[#F1EDE3] p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/70">
            {copy.ctaEyebrow}
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2
                id="project-contact-title"
                className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
              >
                {copy.ctaTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">
                {localize(governance.ctaContext, locale)}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={createWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0A2540] px-5 text-sm font-semibold text-white transition hover:bg-[#0B1F3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {copy.whatsapp}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#0A2540]/25 px-5 text-sm font-semibold text-[#0A2540] transition hover:border-[#0A2540]/50 hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {copy.schedule}
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
