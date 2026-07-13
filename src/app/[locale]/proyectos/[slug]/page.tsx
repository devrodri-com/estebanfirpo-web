// src/app/[locale]/proyectos/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PROJECTS } from "@/data/projects/index";
import type { Project } from "@/data/types";
import GalleryLightbox from "@/components/GalleryLightbox";
import HighlightsBlock, { type HighlightItem } from "@/components/HighlightsBlock";
import FaqsBlock, { type FaqItem } from "@/components/FaqsBlock";
import PaymentPlan from "@/components/PaymentPlan";
import {
  Sparkles,
  LayoutGrid,
  ListChecks,
  MapPin,
  Images as ImagesIcon,
} from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { PriorityProjectPage } from "@/components/projects/PriorityProjectPage";
import { getPublicPriorityProjectGovernance } from "@/data/project-governance/public-priority-projects";
import { createProjectMetadata } from "@/lib/metadata";
type Params = { params: Promise<{ locale: string; slug: string }> };

function pickBySlug(slug: string): Project | null {
  // projects store slug like "/proyectos/72-park"; normalize for match
  const want = `/proyectos/${slug}`;
  return ALL_PROJECTS.find(p => p.slug === want) ?? null;
}

function fmtUSD(n: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isEN = locale === "en";
  const p = pickBySlug(slug);

  if (!p) {
    return {
      title: {
        absolute: isEN
          ? "Project not found | Esteban Firpo"
          : "Proyecto no encontrado | Esteban Firpo",
      },
      robots: { index: false, follow: false },
    };
  }

  const governance = getPublicPriorityProjectGovernance(slug);

  return createProjectMetadata({
    rawLocale: locale,
    slug,
    name: p.name,
    city: governance
      ? governance.location[isEN ? "en" : "es"]
      : p.city,
  });
}

export default async function Proyecto({ params }: Params) {
  const { locale, slug } = await params;
  const isEN = locale === "en";
  const p = pickBySlug(slug);
  if (!p) notFound();

  const governance = getPublicPriorityProjectGovernance(slug);
  if (governance) {
    return (
      <PriorityProjectPage
        project={{ name: p.name, image: p.image, images: p.images }}
        governance={governance}
        locale={isEN ? "en" : "es"}
      />
    );
  }

  const policy = isEN
    ? (p.rentalPolicyEn ?? p.rentalPolicy)
    : (p.rentalPolicyEs ?? p.rentalPolicy);

  const payment = (isEN ? p.paymentPlanEn : p.paymentPlanEs) ?? [];
  const faqs = (isEN ? p.faqsEn : p.faqsEs) ?? [];
  const unitMix = (isEN ? p.unitMixEn : p.unitMixEs) ?? [];
  const features = (isEN ? p.featuresEn : p.featuresEs) ?? [];

  const t = {
    breadcrumb: isEN ? "Projects" : "Proyectos",
    from: isEN ? "From" : "Desde",
    delivery: isEN ? "Completion" : "Entrega",
    rental: isEN ? "Rental policy" : "Política de renta",
    gallery: isEN ? "Gallery" : "Galería",
    highlights: isEN ? "Highlights" : "Destacados",
    mix: isEN ? "Unit mix" : "Tipologías",
    features: isEN ? "Features" : "Características",
    payments: isEN ? "Payment plan" : "Plan de pagos",
    faqsTitle: isEN ? "FAQs" : "Preguntas frecuentes",
    brochure: isEN ? "Download brochure" : "Descargar brochure",
    ctas: {
      schedule: isEN ? "Schedule Meeting" : "Agendar Reunión",
      whatsapp: "WhatsApp",
      email: isEN ? "Email Esteban" : "Email a Esteban",
    },
  };

  const bookingUrl = process.env.NEXT_PUBLIC_CALENDAR_URL || `/${locale}/agendar`;
  const hasCoords = typeof (p as Project).lat === "number" && typeof (p as Project).lng === "number";
  const addressQuery = p.city && /\d/.test(p.city) ? p.city : `${p.name} ${p.city}`;
  const mapSrc = hasCoords
    ? `https://www.google.com/maps?q=${p.lat},${p.lng}&hl=${isEN ? "en" : "es"}&z=15&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(addressQuery)}&hl=${isEN ? "en" : "es"}&z=15&output=embed`;
  const waNumber = "17542673931"; // +1 754 267 3931
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    isEN
      ? `Hi Esteban, I'm interested in ${p.name}. Could you please send me more information?`
      : `Hola Esteban, estoy interesado/a en ${p.name}. ¿Podés enviarme más información?`
  )}`;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.estebanfirpo.com";
  const shareUrl = `${base}/${locale}/proyectos/${slug}`.replace(/(?<!:)\/\/+/, "/");

  // Extra policy chips for mobile only
  const policyChips = [
    ...(policy ? [policy] : []),
    ...(p.hoa ? [`HOA ${p.hoa}`] : []),
    ...(typeof p.furnished === "boolean"
      ? [isEN ? (p.furnished ? "Furnished" : "Unfurnished") : (p.furnished ? "Amueblado" : "Sin amueblar")]
      : []),
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-3 sm:mb-6 text-sm text-neutral-500">
        <Link href={`/${locale}/proyectos`} className="underline">{t.breadcrumb}</Link>
        <span className="mx-1">/</span>
        <span className="text-neutral-700">{p.name}</span>
      </div>

      {/* Title + meta */}
      <h1 className="mt-2 sm:mt-0 text-3xl sm:text-4xl font-semibold tracking-tight text-[#0A2540]">{p.name}</h1>
      {/* Meta — mobile condensed */}
      <p className="mt-1 text-sm text-[#0A2540]/70 sm:hidden">
        {typeof p.priceFromUsd === "number" ? (
          <>
            {t.from} {fmtUSD(p.priceFromUsd, locale)}
            {typeof p.pricePerSfApprox === "number" && (
              <span className="opacity-60"> · ~${p.pricePerSfApprox}/sf</span>
            )}
          </>
        ) : (
          isEN ? "Inquire" : "Consultar"
        )}
        {p.delivery ? <span className="opacity-60"> · {t.delivery} {p.delivery}</span> : null}
      </p>
      {/* Meta — desktop/full */}
      <p className="hidden sm:block mt-2 text-base text-[#0A2540]/70">
        {typeof p.priceFromUsd === "number" ? (
          <>
            {t.from} {fmtUSD(p.priceFromUsd, locale)}
            {typeof p.pricePerSfApprox === "number" && (
              <span className="opacity-60"> · ~${p.pricePerSfApprox}/sf</span>
            )}
          </>
        ) : (
          isEN ? "Inquire" : "Consultar"
        )}
        {p.delivery ? <> · {t.delivery} {p.delivery}</> : null}
        {policy ? <> · {t.rental} {policy}</> : null}
        {p.hoa ? <> · HOA {p.hoa}</> : null}
        {typeof p.furnished === "boolean" ? (
          <> · {isEN ? (p.furnished ? "Furnished" : "Unfurnished") : (p.furnished ? "amueblado" : "Sin amueblar")}</>
        ) : null}
      </p>


      {/* Micro‑claims / Chips */}
      {(() => {
        type WithClaims = Project & { microClaimsEs?: string[]; microClaimsEn?: string[] };
        const pp = p as WithClaims;
        const claims = (isEN ? pp.microClaimsEn : pp.microClaimsEs) ?? [];
        if (!Array.isArray(claims) || claims.length === 0) return null;

        // Desktop (wrap) + Mobile (horizontal scroll)
        const Chip = ({ children }: { children: React.ReactNode }) => (
          <span className="inline-flex items-center rounded-full bg-white text-[#0A2540] ring-1 ring-[#0A2540]/15 px-3 py-[6px] text-[12.5px] font-medium leading-tight whitespace-nowrap">
            {children}
          </span>
        );

        // Combine extra policy chips for mobile only
        const mobileChips = [...claims, ...policyChips];

        return (
          <>
            {/* Desktop / tablet: tidy wrap */}
            <div className="mt-2 hidden sm:flex sm:flex-wrap sm:gap-2.5">
              {claims.map((c, i) => (
                <Chip key={`claim-d-${i}`}>{c}</Chip>
              ))}
            </div>

            {/* Mobile: single-row horizontal carousel (no wrap) */}
            <div className="sm:hidden mt-2 -mx-4 px-4 overflow-x-auto">
              <ul className="flex gap-2 snap-x snap-mandatory">
                {mobileChips.map((c, i) => (
                  <li key={`claim-m-${i}`} className="snap-start shrink-0">
                    <Chip>{c}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      })()}

      {/* Hero */}
      <section className="mt-3 sm:mt-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[14px] ring-1 ring-black/10">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width:1024px) 960px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start">
        <Link
          href={bookingUrl}
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#0A2540] px-5 text-sm font-medium text-white hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
        >
          {t.ctas.schedule}
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/25 px-5 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
        >
          {t.ctas.whatsapp}
        </a>
        <a
          href="mailto:esteban@miamiliferealty.com"
          className="inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/25 px-5 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
        >
          {t.ctas.email}
        </a>
        <ShareButtons
          url={shareUrl}
          text={p.name}
          locale={isEN ? "en" : "es"}
          variant="light"
          iconSrc="/icons/whatsapp.svg"
          buttonClassName="inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/25 px-5 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40 w-full sm:w-auto"
        />
      </div>

      {/* Gallery */}
      {Array.isArray(p.images) && p.images.length > 0 && (
        <section className="mt-8 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
          <div className="mb-2.5 flex items-center gap-2">
            <ImagesIcon className="h-5 w-5 text-white stroke-[1.5]" aria-hidden />
            <h2 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">{t.gallery}</h2>
          </div>
          <GalleryLightbox
            images={p.images}
            name={p.name}
            locale={isEN ? "en" : "es"}
          />
        </section>
      )}

      {(() => {
        const lines = (isEN ? p.highlightsEn : p.highlights) ?? [];
        if (!Array.isArray(lines) || lines.length === 0) return null;
        const items: HighlightItem[] = lines.map((line: string) => ({ title: line }));
        return (
          <HighlightsBlock title={t.highlights} items={items} />
        );
      })()}


      {unitMix.length > 0 && (() => {
        const items = (isEN ? p.unitMixEn : p.unitMixEs) ?? [];
        const mailtoPlans = `mailto:esteban@miamiliferealty.com?subject=${encodeURIComponent(
          isEN ? `Floor plans (PDF) — ${p.name}` : `Planos (PDF) — ${p.name}`
        )}&body=${encodeURIComponent(
          isEN
            ? `Hi Esteban,\n\nI’m interested in ${p.name}. Please send me floor plans (PDF).\n\nThanks.`
            : `Hola Esteban,\n\nEstoy interesado/a en ${p.name}. Por favor envíame los planos (PDF).\n\nGracias.`
        )}`;
        const mailtoAvail = `mailto:esteban@miamiliferealty.com?subject=${encodeURIComponent(
          isEN ? `Availability by typology — ${p.name}` : `Disponibilidad por tipología — ${p.name}`
        )}&body=${encodeURIComponent(
          isEN
            ? `Hi Esteban,\n\nI’m interested in ${p.name}. Please send availability by typology (Jr‑1 / 1BR / 2BR / 3BR).\n\nThanks.`
            : `Hola Esteban,\n\nEstoy interesado/a en ${p.name}. Por favor envíame disponibilidad por tipología (Jr‑1 / 1BR / 2BR / 3BR).\n\nGracias.`
        )}`;
        return (
          <section className="mt-8 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
            <div className="mb-2.5 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-white stroke-[1.5]" aria-hidden />
              <h2 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">{t.mix}</h2>
            </div>
            <ul className="mt-2 sm:mt-3 space-y-[11px] max-w-[1000px] lg:max-w-[960px] mx-auto" role="list">
              {items.map((line, i) => {
                const label = typeof line === 'string' ? line : line?.label;
                if (!label) return null;
                return (
                  <li key={`mix-${i}`} role="listitem" className="flex items-start gap-3">
                    <span className="relative top-[9px] inline-block h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden />
                    <p className="text-[16px] leading-[26px] text-white/95">{label}</p>
                  </li>
                );
              })}
            </ul>
            {/* CTAs */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a href={mailtoPlans} className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white hover:bg-white/10">
                {isEN ? 'Request floor plans (PDF)' : 'Solicitar planos (PDF)'}
              </a>
              <a href={mailtoAvail} className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white hover:bg-white/10">
                {isEN ? 'Check availability by typology' : 'Ver disponibilidad por tipología'}
              </a>
            </div>
          </section>
        );
      })()}

      {features.length > 0 && (() => {
        const items = (isEN ? p.featuresEn : p.featuresEs) ?? [];
        const mailtoMaterials = `mailto:esteban@miamiliferealty.com?subject=${encodeURIComponent(
          isEN ? `Materials list (PDF) — ${p.name}` : `Lista de materiales (PDF) — ${p.name}`
        )}&body=${encodeURIComponent(
          isEN
            ? `Hi Esteban,\n\nI’m interested in ${p.name}. Please send me the materials list (PDF).\n\nThanks.`
            : `Hola Esteban,\n\nEstoy interesado/a en ${p.name}. Por favor envíame la lista de materiales (PDF).\n\nGracias.`
        )}`;
        return (
          <section className="mt-8 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
            <div className="mb-2.5 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-white stroke-[1.5]" aria-hidden />
              <h2 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">{t.features}</h2>
            </div>
            <ul className="mt-2 sm:mt-3 space-y-[11px] max-w-[1000px] lg:max-w-[960px] mx-auto" role="list">
              {items.map((line, i) => {
                const label = typeof line === 'string' ? line : line?.label;
                if (!label) return null;
                return (
                  <li key={`feat-${i}`} role="listitem" className="flex items-start gap-3">
                    <span className="relative top-[9px] inline-block h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden />
                    <p className="text-[16px] leading-[26px] text-white/95">{label}</p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4">
              <a href={mailtoMaterials} className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-4 text-sm font-medium text-white hover:bg-white/10">
                {isEN ? 'Request materials (PDF)' : 'Solicitar materiales (PDF)'}
              </a>
            </div>
          </section>
        );
      })()}

      {/* WhyBlock */}
      {(() => {
        type WithClaims = Project & { microClaimsEs?: string[]; microClaimsEn?: string[] };
        const pp = p as WithClaims;
        const whyClaims = (isEN ? pp.microClaimsEn : pp.microClaimsEs) ?? [];
        if (!Array.isArray(whyClaims) || whyClaims.length === 0) return null;
        return (
          <section className="mt-8 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
            <div className="mb-2.5 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white stroke-[1.5]" aria-hidden />
              <h2 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">{isEN ? `Why ${p.name}?` : `¿Por qué ${p.name}?`}</h2>
            </div>
            <ul className="mt-2 sm:mt-3 space-y-[11px] max-w-[1000px] lg:max-w-[960px] mx-auto" role="list">
              {whyClaims.map((c, i) => (
                <li key={`why-${i}`} role="listitem" className="flex items-start gap-3">
                  <span className="relative top-[9px] inline-block h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden />
                  <p className="text-[16px] leading-[26px] text-white/95">{c}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })()}

      {/* FAQs */}
      {faqs.length > 0 && (() => {
        // Mailto helpers for inline CTAs
        const mailtoAvail = `mailto:esteban@miamiliferealty.com?subject=${encodeURIComponent(
          isEN ? `Availability by typology — ${p.name}` : `Disponibilidad por tipología — ${p.name}`
        )}&body=${encodeURIComponent(
          isEN
            ? `Hi Esteban,\n\nI’m interested in ${p.name}. Please send availability by typology (Jr‑1 / 1BR / 2BR / 3BR).\n\nThanks.`
            : `Hola Esteban,\n\nEstoy interesado/a en ${p.name}. Por favor envíame disponibilidad por tipología (Jr‑1 / 1BR / 2BR / 3BR).\n\nGracias.`
        )}`;
        const mailtoMaterials = `mailto:esteban@miamiliferealty.com?subject=${encodeURIComponent(
          isEN ? `Materials list (PDF) — ${p.name}` : `Lista de materiales (PDF) — ${p.name}`
        )}&body=${encodeURIComponent(
          isEN
            ? `Hi Esteban,\n\nI’m interested in ${p.name}. Please send me the materials list (PDF).\n\nThanks.`
            : `Hola Esteban,\n\nEstoy interesado/a en ${p.name}. Por favor envíame la lista de materiales (PDF).\n\nGracias.`
        )}`;

        // Rank FAQs by sales impact
        const rank = (q: string) => {
          const s = q.toLowerCase();
          if (s.includes("renta") || s.includes("short")) return 0; // STR
          if (s.includes("playa") || s.includes("beach")) return 1; // beach club
          if (s.includes("amoblad") || s.includes("furnish")) return 2; // furnished
          if (s.includes("ubic") || s.includes("where")) return 3; // location
          if (s.includes("entreg") || s.includes("deliver")) return 4; // delivery
          if (s.includes("cowork")) return 5;
          if (s.includes("mascota") || s.includes("pets")) return 6;
          if (s.includes("certific") || s.includes("leed")) return 7;
          if (s.includes("diferenc") || s.includes("differ")) return 8;
          return 99;
        };

        const sorted = [...faqs].sort((a: { q: string }, b: { q: string }) => rank(a.q) - rank(b.q));

        const faqItems: FaqItem[] = sorted.map((f: { q: string; a: string }, i: number) => {
          const ql = f.q.toLowerCase();
          let answer: React.ReactNode = <span>{f.a}</span>;
          // Inject inline CTAs in critical answers
          if (ql.includes("renta") || ql.includes("short")) {
            answer = (
              <span>
                {f.a}{" "}
                <a href={mailtoAvail} className="underline">{isEN ? "Check availability by typology" : "Ver disponibilidad por tipología"}</a>
              </span>
            );
          } else if (ql.includes("playa") || ql.includes("beach")) {
            answer = (
              <span>
                {f.a}{" "}
                <a href={mailtoAvail} className="underline">{isEN ? "Check availability by typology" : "Ver disponibilidad por tipología"}</a>
              </span>
            );
          } else if (ql.includes("amoblad") || ql.includes("furnish")) {
            answer = (
              <span>
                {f.a}{" "}
                <a href={mailtoMaterials} className="underline">{isEN ? "Request materials (PDF)" : "Solicitar materiales (PDF)"}</a>
              </span>
            );
          } else if (ql.includes("ubic") || ql.includes("where")) {
            answer = (
              <span>
                {f.a}{" "}
                <a href="#ubicacion" className="underline">{isEN ? "See map" : "Ver mapa"}</a>
              </span>
            );
          }
          return {
            id: rank(f.q) === 0 ? "faq-str" : undefined,
            q: f.q,
            a: answer,
            defaultOpen: i === 0, // STR open after sort
          } as FaqItem;
        });

        return (
          <FaqsBlock id="faqs" title={t.faqsTitle} items={faqItems} className="mt-8" />
        );
      })()}

      {/* CTAs */}
      <section className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href={bookingUrl} className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md bg-[#0A2540] px-4 text-sm font-medium text-white hover:opacity-95">
          {t.ctas.schedule}
        </Link>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]">
          {t.ctas.whatsapp}
        </a>
        <a href="mailto:esteban@miamiliferealty.com" className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB]">
          {t.ctas.email}
        </a>
        <ShareButtons
          url={shareUrl}
          text={p.name}
          locale={isEN ? "en" : "es"}
          variant="light"
          iconSrc="/icons/whatsapp.svg"
          buttonClassName="inline-flex h-10 items-center justify-center rounded-md border border-[#0A2540]/20 px-4 text-sm font-medium text-[#0A2540] hover:bg-[#F9FAFB] w-full sm:w-auto"
        />
      </section>

      {/* Payment plan */}
      <PaymentPlan
        title={t.payments}
        steps={payment.map((label: string) => ({ label }))}
        project={p.name}
        locale={locale === "en" ? "en" : "es"}
        className="mt-8"
      />

      {/* Location */}
      <section id="ubicacion" className="mt-8 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
        <div className="mb-2.5 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-white stroke-[1.5]" aria-hidden />
          <h2 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">{isEN ? 'Location' : 'Ubicación'}</h2>
        </div>
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
          <iframe
            src={mapSrc}
            title={isEN ? `${p.name} location map` : `Mapa de ubicación de ${p.name}`}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}

// EditorialRow is unused and not needed; removed image usage from Tipologías and Características sections.
