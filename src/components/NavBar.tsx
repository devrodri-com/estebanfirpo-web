"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Menu, MessageCircle, X } from "lucide-react";
import { createWhatsAppUrl } from "@/lib/site";
import { CatalogAwareLanguageLink } from "@/features/catalog/CatalogAwareLanguageLink";

type SupportedLocale = "es" | "en";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/es";
  const locale = (useLocale() as SupportedLocale) || "es";
  const isEnglish = locale === "en";
  const base = `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = mobileNavigationRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const labels = isEnglish
    ? {
        projects: "Projects",
        advisory: "How I help",
        precon: "Pre-construction",
        miami: "Miami",
        about: "About",
        financing: "Financing",
        contact: "Contact",
        whatsapp: "Talk on WhatsApp",
        menu: "Open menu",
        close: "Close menu",
        switchLanguage: "Switch to Spanish",
      }
    : {
        projects: "Proyectos",
        advisory: "Cómo te ayudo",
        precon: "Preconstrucción",
        miami: "Miami",
        about: "Sobre mí",
        financing: "Financiación",
        contact: "Contacto",
        whatsapp: "Hablar por WhatsApp",
        menu: "Abrir menú",
        close: "Cerrar menú",
        switchLanguage: "Cambiar a inglés",
      };

  const primaryItems = [
    { href: `${base}/proyectos`, label: labels.projects },
    { href: `${base}#asesoramiento`, label: labels.advisory },
    { href: `${base}/precon`, label: labels.precon },
    { href: `${base}/miami`, label: labels.miami },
    { href: `${base}/sobre-mi`, label: labels.about },
    { href: `${base}/contacto`, label: labels.contact },
  ];

  const secondaryItems = [
    { href: `${base}/financiacion`, label: labels.financing },
  ];

  const switchTo: SupportedLocale = isEnglish ? "es" : "en";
  const switchHref = `/${switchTo}${pathname.replace(/^\/(es|en)/, "")}`;
  const whatsappMessage = isEnglish
    ? "Hi Esteban, I’m considering a real estate purchase in Miami or South Florida."
    : "Hola Esteban, estoy evaluando una compra inmobiliaria en Miami o el sur de Florida.";

  function isActive(href: string) {
    if (href.includes("#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#0A2540] text-white transition-shadow ${
        scrolled
          ? "border-b border-white/10 shadow-[0_8px_24px_rgba(10,37,64,0.16)]"
          : "border-b border-white/8"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5 px-4">
        <Link
          href={base}
          className="shrink-0 rounded-sm text-sm font-semibold tracking-[-0.01em] text-white no-underline hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
        >
          Esteban Firpo <span className="font-normal text-white/62">· Miami Real Estate</span>
        </Link>

        <nav aria-label={isEnglish ? "Primary navigation" : "Navegación principal"} className="hidden items-center gap-5 xl:flex">
          {primaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-sm text-[13px] font-medium no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] ${
                isActive(item.href)
                  ? "text-white underline decoration-[#D4AF37] decoration-2 underline-offset-[10px]"
                  : "text-white/72 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Suspense
            fallback={
              <Link
                href={switchHref}
                title={switchTo.toUpperCase()}
                aria-label={labels.switchLanguage}
                className="inline-flex min-h-9 items-center rounded-full border border-white/22 px-2.5 text-xs font-semibold text-white no-underline transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                {switchTo.toUpperCase()}
              </Link>
            }
          >
            <CatalogAwareLanguageLink
              switchTo={switchTo}
              ariaLabel={labels.switchLanguage}
              className="inline-flex min-h-9 items-center rounded-full border border-white/22 px-2.5 text-xs font-semibold text-white no-underline transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
            >
              {switchTo.toUpperCase()}
            </CatalogAwareLanguageLink>
          </Suspense>
          <a
            href={createWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-3.5 text-[13px] font-semibold text-[#0A2540] no-underline transition hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {labels.whatsapp}
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label={labels.menu}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/16 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] xl:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div
          ref={mobileNavigationRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={isEnglish ? "Mobile navigation" : "Navegación mobile"}
          className="fixed inset-0 z-[60] bg-[#0A2540] text-white xl:hidden"
        >
          <div className="mx-auto flex h-full max-w-lg flex-col px-5 py-4">
            <div className="flex min-h-12 items-center justify-between border-b border-white/12 pb-4">
              <Link
                href={base}
                onClick={() => setOpen(false)}
                className="rounded-sm text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                Esteban Firpo <span className="font-normal text-white/60">· Miami</span>
              </Link>
              <button
                type="button"
                autoFocus
                aria-label={labels.close}
                onClick={() => {
                  setOpen(false);
                  requestAnimationFrame(() => menuButtonRef.current?.focus());
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/16 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label={isEnglish ? "Mobile navigation" : "Navegación mobile"} className="flex-1 overflow-y-auto py-5">
              <div className="divide-y divide-white/10">
                {primaryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-14 items-center py-3 text-xl font-medium no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#D4AF37] ${
                      isActive(item.href)
                        ? "text-white underline decoration-[#D4AF37] decoration-2 underline-offset-8"
                        : "text-white/88 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-white/12 pt-5">
                {secondaryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-10 items-center rounded-lg border border-white/18 px-3 text-sm text-white/75 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Suspense
                  fallback={
                    <Link
                      href={switchHref}
                      onClick={() => setOpen(false)}
                      aria-label={labels.switchLanguage}
                      className="inline-flex min-h-10 items-center rounded-lg border border-white/18 px-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                    >
                      {switchTo.toUpperCase()}
                    </Link>
                  }
                >
                  <CatalogAwareLanguageLink
                    switchTo={switchTo}
                    ariaLabel={labels.switchLanguage}
                    onNavigate={() => setOpen(false)}
                    className="inline-flex min-h-10 items-center rounded-lg border border-white/18 px-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                  >
                    {switchTo.toUpperCase()}
                  </CatalogAwareLanguageLink>
                </Suspense>
              </div>
            </nav>

            <a
              href={createWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-[#0A2540] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {labels.whatsapp}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
