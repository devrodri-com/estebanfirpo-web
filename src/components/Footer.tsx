"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Mail, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  CALENDAR_URL,
  PUBLIC_EMAIL,
  PUBLIC_PHONE_DISPLAY,
  PUBLIC_PHONE_E164,
  createWhatsAppUrl,
} from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = (pathname?.split("/")[1] || "es") === "en" ? "en" : "es";
  const isEnglish = locale === "en";
  const base = `/${locale}`;

  const labels = isEnglish
    ? {
        tagline: "Personal real estate advisory for international investors evaluating Miami and South Florida.",
        affiliation: "Affiliated with Miami Life Realty",
        explore: "Explore",
        contact: "Contact",
        projects: "Projects",
        precon: "Pre-construction",
        miami: "Miami",
        financing: "Financing",
        about: "About Esteban",
        form: "Contact form",
        schedule: "Schedule a conversation",
        call: "Call Esteban",
        disclosure:
          "Website information is general and may change. Prices, availability, and conditions must be reconfirmed before making a decision.",
        rights: "All rights reserved.",
        made: "Made with Next.js by",
        whatsappMessage: "Hi Esteban, I’d like to discuss a possible purchase in Miami or South Florida.",
      }
    : {
        tagline: "Asesoría inmobiliaria personal para inversores internacionales que evalúan Miami y el sur de Florida.",
        affiliation: "Afiliado a Miami Life Realty",
        explore: "Explorar",
        contact: "Contacto",
        projects: "Proyectos",
        precon: "Preconstrucción",
        miami: "Miami",
        financing: "Financiación",
        about: "Sobre Esteban",
        form: "Formulario de contacto",
        schedule: "Agendar una conversación",
        call: "Llamar a Esteban",
        disclosure:
          "La información del sitio es general y puede cambiar. Precios, disponibilidad y condiciones deben reconfirmarse antes de tomar una decisión.",
        rights: "Todos los derechos reservados.",
        made: "Hecho con Next.js por",
        whatsappMessage: "Hola Esteban, quiero conversar sobre una posible compra en Miami o el sur de Florida.",
      };

  return (
    <footer className="mt-8 bg-[#0B1F3A] text-[#F6F5F0]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr_0.9fr] md:py-16">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">
            Esteban Firpo <span className="font-normal text-white/60">· Miami Real Estate</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/68">{labels.tagline}</p>
          <div className="mt-6 flex items-center gap-4">
            <Image
              src="/images/Esteban.jpg"
              alt="Esteban Firpo"
              width={96}
              height={96}
              sizes="48px"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-[#D4AF37]/55"
            />
            <div>
              <p className="text-sm font-semibold text-white">Esteban Firpo</p>
              <p className="mt-0.5 text-xs text-white/58">{labels.affiliation}</p>
            </div>
          </div>
          <div className="mt-5 inline-flex rounded-lg bg-white px-3 py-2">
            <Image
              src="/images/miamiliferealty_logo.png"
              alt="Miami Life Realty"
              width={160}
              height={40}
              sizes="140px"
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>

        <nav aria-label={labels.explore}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">
            {labels.explore}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              [`${base}/proyectos`, labels.projects],
              [`${base}/precon`, labels.precon],
              [`${base}/miami`, labels.miami],
              [`${base}/financiacion`, labels.financing],
              [`${base}/sobre-mi`, labels.about],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-sm text-white/72 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/48">
            {labels.contact}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/72">
            <li>
              <a
                href={createWhatsAppUrl(labels.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PUBLIC_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> {PUBLIC_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${PUBLIC_PHONE_E164}`}
                aria-label={labels.call}
                className="inline-flex items-center gap-2 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {PUBLIC_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> {labels.schedule}
              </a>
            </li>
            <li>
              <Link
                href={`${base}/contacto`}
                className="rounded-sm underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                {labels.form}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="max-w-4xl text-xs leading-5 text-white/48">{labels.disclosure}</p>
          <div className="mt-5 flex flex-col gap-2 border-t border-white/8 pt-5 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Esteban Firpo. {labels.rights}</p>
            <p>
              {labels.made}{" "}
              <a
                href="https://www.devrodri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm underline decoration-white/20 underline-offset-3 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                Rodrigo Opalo
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-[#D4AF37]" />
    </footer>
  );
}
