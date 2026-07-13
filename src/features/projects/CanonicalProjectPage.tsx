import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  CalendarDays,
  CircleHelp,
  FileText,
  Images,
  LayoutGrid,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import FaqsBlock from "@/components/FaqsBlock";
import HighlightsBlock from "@/components/HighlightsBlock";
import { getProjectPageCopy } from "./project-page-copy";
import type { CanonicalProjectViewModel } from "./project-view-model";
import ProjectGalleryLightbox from "./ProjectGalleryLightbox";
import ProjectLocationMap from "./ProjectLocationMap";
import ProjectMetricsPanel from "./ProjectMetricsPanel";
import ProjectShareLink from "./ProjectShareLink";

const lightButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#0A2540]/20 bg-white px-4 text-sm font-semibold text-[#0A2540] no-underline transition hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]";
const darkButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0A2540] px-4 text-sm font-semibold text-white no-underline transition hover:bg-[#12385C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]";
const invertedButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 text-sm font-semibold text-white no-underline transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]";

function DarkSection({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative mt-10 overflow-hidden rounded-[10px] bg-[#0A2540] p-6 text-white ring-1 ring-white/10 sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.35), rgba(212,175,55,0))",
        }}
      />
      <div className="flex items-center gap-2">
        <span
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-[#D4AF37]"
          aria-hidden="true"
        >
          {icon}
        </span>
        <h2 id={headingId} className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ProjectAddress({ model }: { model: CanonicalProjectViewModel }) {
  const structured = model.location.structuredAddress;

  if (!structured) {
    return <span>{model.location.display}</span>;
  }

  return (
    <span itemScope itemType="https://schema.org/PostalAddress">
      <span itemProp="streetAddress">{structured.streetAddress}</span>,{" "}
      <span itemProp="addressLocality">{structured.addressLocality}</span>,{" "}
      <span itemProp="addressRegion">{structured.addressRegion}</span>{" "}
      <span itemProp="postalCode">{structured.postalCode}</span>
      <meta itemProp="addressCountry" content={structured.addressCountry} />
    </span>
  );
}

export default function CanonicalProjectPage({ model }: { model: CanonicalProjectViewModel }) {
  const copy = getProjectPageCopy(model.locale);
  const decisionCards = [
    { id: "price", label: copy.decisions.price, value: model.decisions.price },
    { id: "delivery", label: copy.decisions.delivery, value: model.decisions.delivery },
    { id: "rental", label: copy.decisions.rental, value: model.decisions.rental },
    { id: "condition", label: copy.decisions.condition, value: model.decisions.condition },
  ];

  return (
    <article className="mx-auto w-full max-w-5xl py-10 sm:py-12">
      <nav aria-label={copy.breadcrumbLabel}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[#0A2540]/62">
          <li>
            <Link
              href={`/${model.locale}/proyectos`}
              className="rounded-sm underline decoration-[#0A2540]/25 underline-offset-4 hover:text-[#0A2540] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
            >
              {copy.breadcrumb}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-[#0A2540]">
            {model.identity.name}
          </li>
        </ol>
      </nav>

      <section className="mt-6 grid items-start gap-x-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/55">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#0A2540] sm:text-4xl lg:text-[42px]">
            {model.identity.name}
          </h1>
          <address className="mt-3 flex items-start gap-2 text-sm not-italic leading-6 text-[#0D1521]/70">
            <MapPin
              className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <ProjectAddress model={model} />
          </address>
        </div>

        <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[14px] bg-[#0A2540]/5 ring-1 ring-black/10 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <Image
            src={model.hero.src}
            alt={model.hero.alt}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-6 lg:col-start-1 lg:row-start-2">
          <dl className="grid gap-3 sm:grid-cols-2">
            {decisionCards.map((item) => (
              <div
                key={item.id}
                className="rounded-[10px] border border-[#0A2540]/12 bg-white p-4 shadow-[0_1px_2px_rgba(10,37,64,0.04)]"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#0A2540]/52">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm font-medium leading-5 text-[#0A2540]">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-[#0D1521]/60">{model.decisions.note}</p>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:col-start-1 lg:row-start-3">
          <a
            href={model.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={darkButton}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {copy.ctas.whatsapp}
          </a>
          <a
            href={model.contact.calendarHref}
            target="_blank"
            rel="noopener noreferrer"
            className={lightButton}
          >
            <CalendarDays className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {copy.ctas.schedule}
          </a>
          <a href={model.contact.emailHref} className={lightButton}>
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {copy.ctas.email}
          </a>
          <ProjectShareLink
            canonicalUrl={model.contact.shareUrl}
            projectName={model.identity.name}
            shareText={copy.shareText(model.identity.name)}
            label={copy.ctas.share}
            className={lightButton}
          />
        </div>
      </section>

      <ProjectMetricsPanel
        title={copy.sections.metrics}
        metrics={model.metrics.items}
        note={model.metrics.note}
        emptyLabel={copy.empty.metrics}
      />

      <DarkSection
        id={`${model.identity.id}-gallery`}
        title={copy.sections.gallery}
        icon={<Images className="h-5 w-5" strokeWidth={1.75} />}
      >
        <ProjectGalleryLightbox
          images={model.gallery}
          name={model.identity.name}
          locale={model.locale}
          emptyLabel={copy.empty.gallery}
        />
      </DarkSection>

      <HighlightsBlock
        title={copy.sections.highlights}
        items={model.highlights}
        headingIcon={<Sparkles className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
        emptyLabel={copy.empty.highlights}
      />

      <DarkSection
        id={`${model.identity.id}-unit-types`}
        title={copy.sections.units}
        icon={<LayoutGrid className="h-5 w-5" strokeWidth={1.75} />}
      >
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/75">{copy.intros.units}</p>
        {model.unitTypes.length > 0 ? (
          <ul className="mt-4 space-y-3" role="list">
            {model.unitTypes.map((item, index) => (
              <li
                key={`${model.identity.id}-unit-${index + 1}`}
                className="flex items-start gap-3 text-base leading-7 text-white/95"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-6 text-white/75">{copy.empty.unitTypes}</p>
        )}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <a href={model.contact.plansHref} className={invertedButton}>
            <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {copy.ctas.requestPlans}
          </a>
          <a href={model.contact.availabilityHref} className={invertedButton}>
            <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {copy.ctas.requestAvailability}
          </a>
        </div>
      </DarkSection>

      <DarkSection
        id={`${model.identity.id}-features`}
        title={copy.sections.features}
        icon={<ListChecks className="h-5 w-5" strokeWidth={1.75} />}
      >
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/75">{copy.intros.features}</p>
        {model.features.length > 0 ? (
          <ul className="mt-4 grid gap-3 md:grid-cols-3" role="list">
            {model.features.map((item, index) => (
              <li
                key={`${model.identity.id}-feature-${index + 1}`}
                className="rounded-lg border border-white/12 bg-white/[0.04] p-4 text-sm leading-6 text-white/92"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-6 text-white/75">{copy.empty.features}</p>
        )}
        <a href={model.contact.materialsHref} className={`${invertedButton} mt-5`}>
          <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          {copy.ctas.requestMaterials}
        </a>
      </DarkSection>

      <DarkSection
        id={`${model.identity.id}-payment-plan`}
        title={copy.sections.payment}
        icon={<FileText className="h-5 w-5" strokeWidth={1.75} />}
      >
        {model.payment.kind === "steps" ? (
          <>
            <ol className="mt-5 space-y-3">
              {model.payment.steps.map((step, index) => (
                <li
                  key={`${model.identity.id}-payment-${index + 1}`}
                  className="flex items-start gap-3 text-base leading-7 text-white/95"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-semibold ring-1 ring-white/20">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-5 text-white/60">{copy.paymentStepsNote}</p>
          </>
        ) : (
          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/78">{model.payment.copy}</p>
        )}
        <a href={model.contact.paymentPlanHref} className={`${invertedButton} mt-5`}>
          <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          {copy.ctas.requestPaymentPlan}
        </a>
      </DarkSection>

      <FaqsBlock
        id={`${model.identity.id}-faq`}
        title={copy.sections.faq}
        headingIcon={<CircleHelp className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
        emptyLabel={copy.empty.faq}
        items={model.faqs.map((item, index) => ({
          id: item.id,
          q: item.question,
          a: item.answer,
          defaultOpen: index === 0,
        }))}
      />

      <section
        id={`${model.identity.id}-location`}
        aria-labelledby={`${model.identity.id}-location-heading`}
        className="mt-10 overflow-hidden rounded-[12px] border border-[#0A2540]/12 bg-white shadow-[0_1px_3px_rgba(10,37,64,0.05)]"
      >
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2 text-[#0A2540]">
              <MapPin
                className="h-5 w-5 shrink-0 text-[#D4AF37]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h2
                id={`${model.identity.id}-location-heading`}
                className="text-lg font-semibold tracking-tight sm:text-xl"
              >
                {copy.sections.location}
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#0D1521]/72">
              {copy.intros.location(model.location.display)}
            </p>
            <address className="mt-4 text-sm font-semibold not-italic leading-6 text-[#0A2540]">
              {model.location.display}
            </address>
          </div>
          <div className="overflow-hidden border-t border-[#0A2540]/10 lg:border-l lg:border-t-0">
            <ProjectLocationMap
              displayLocation={model.location.display}
              query={model.location.mapQuery}
              interactive={model.location.interactiveMap}
              locale={model.locale}
              title={copy.map.title(model.identity.name)}
              openLabel={copy.map.open}
              loadingLabel={copy.map.loading}
              unavailableLabel={copy.map.unavailable}
            />
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[12px] bg-[#0A2540] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Image
            src="/images/Esteban.jpg"
            alt="Esteban Firpo"
            width={96}
            height={96}
            sizes="72px"
            className="h-18 w-18 rounded-full object-cover ring-1 ring-[#D4AF37]/65"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {copy.sections.final(model.identity.name)}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">{copy.intros.final}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a
                href={model.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-[#0A2540] no-underline transition hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                {copy.ctas.finalWhatsapp(model.identity.name)}
              </a>
              <a
                href={model.contact.calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className={invertedButton}
              >
                <CalendarDays className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                {copy.ctas.schedule}
              </a>
            </div>
          </div>
        </div>
      </section>

      <aside
        aria-label={
          model.locale === "en"
            ? "Project information disclaimer"
            : "Aviso sobre la información del proyecto"
        }
        className="mt-6 rounded-[10px] border border-[#0A2540]/12 bg-[#F6F5F0] px-5 py-4"
      >
        <p className="text-xs leading-5 text-[#0D1521]/65">{model.disclaimer}</p>
      </aside>
    </article>
  );
}
