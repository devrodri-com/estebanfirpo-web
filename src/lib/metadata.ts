import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const FALLBACK_SITE_URL = "https://www.estebanfirpo.com";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return new URL(FALLBACK_SITE_URL);
  }

  try {
    return new URL(configuredUrl);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = "Esteban Firpo";
export const DEFAULT_OG_IMAGE = "/opengraph-image.jpg";

const siteCopy: Record<
  Locale,
  { title: string; description: string; openGraphLocale: string }
> = {
  es: {
    title: "Esteban Firpo | Real Estate Miami",
    description:
      "Sitio de Esteban Firpo sobre preconstrucción en Miami para inversores internacionales.",
    openGraphLocale: "es_ES",
  },
  en: {
    title: "Esteban Firpo | Miami Real Estate",
    description:
      "Esteban Firpo's website about Miami pre-construction for international investors.",
    openGraphLocale: "en_US",
  },
};

export const staticRouteMetadata = {
  home: {
    path: "",
    es: {
      title: null,
      description: siteCopy.es.description,
    },
    en: {
      title: null,
      description: siteCopy.en.description,
    },
  },
  miami: {
    path: "/miami",
    es: {
      title: "Por qué invertir en Miami",
      description:
        "Descubrí por qué Miami atrae capital internacional: activos en dólares, demanda global, infraestructura, economía y oportunidades inmobiliarias.",
    },
    en: {
      title: "Why Invest in Miami",
      description:
        "Discover why Miami attracts international capital through dollar-based assets, global demand, infrastructure, economic scale, and real estate opportunities.",
    },
  },
  precon: {
    path: "/precon",
    es: {
      title: "Preconstrucción en Miami",
      description:
        "Guía de preconstrucción en Miami: capital por etapas, selección de unidad, proceso remoto y criterios para comparar proyectos con Esteban Firpo.",
    },
    en: {
      title: "Miami Preconstruction",
      description:
        "A guide to Miami preconstruction: staged capital, unit selection, a remote process, and criteria for comparing projects with Esteban Firpo.",
    },
  },
  proyectos: {
    path: "/proyectos",
    es: {
      title: "Proyectos inmobiliarios",
      description: "Listado de proyectos inmobiliarios presentado por Esteban Firpo.",
    },
    en: {
      title: "Real Estate Projects",
      description: "A list of real estate projects presented by Esteban Firpo.",
    },
  },
  contacto: {
    path: "/contacto",
    es: {
      title: "Contacto",
      description: "Información de contacto de Esteban Firpo.",
    },
    en: {
      title: "Contact",
      description: "Contact information for Esteban Firpo.",
    },
  },
  financiacion: {
    path: "/financiacion",
    es: {
      title: "Financiación inmobiliaria",
      description:
        "Información general sobre financiación inmobiliaria para compradores internacionales.",
    },
    en: {
      title: "Real Estate Financing",
      description:
        "General information about real estate financing for international buyers.",
    },
  },
  sobreMi: {
    path: "/sobre-mi",
    es: {
      title: "Sobre Esteban Firpo",
      description:
        "Conocé la trayectoria y forma de trabajo de Esteban Firpo, asesor inmobiliario en Miami para compradores e inversores internacionales.",
    },
    en: {
      title: "About Esteban Firpo",
      description:
        "Learn about Esteban Firpo’s background and approach to guiding international buyers and investors in Miami real estate.",
    },
  },
  storages: {
    path: "/storages",
    es: {
      title: "Storages",
      description: "Información general sobre inversiones en storages en Estados Unidos.",
    },
    en: {
      title: "Storages",
      description: "General information about storage investments in the United States.",
    },
  },
  gracias: {
    path: "/gracias",
    es: {
      title: "Mensaje recibido",
      description: "Confirmación de recepción del formulario de contacto.",
    },
    en: {
      title: "Message Received",
      description: "Confirmation that the contact form was received.",
    },
  },
} as const;

export type StaticRouteKey = keyof typeof staticRouteMetadata;

export function getLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function localizedPath(locale: Locale, path: string) {
  return `/${locale}${normalizePath(path)}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function localizedAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      es: localizedPath("es", path),
      en: localizedPath("en", path),
      "x-default": localizedPath(defaultLocale, path),
    },
  };
}

type PageMetadataOptions = {
  locale: Locale;
  path: string;
  title: string | null;
  description: string;
  index?: boolean;
};

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
}: PageMetadataOptions): Metadata {
  const copy = siteCopy[locale];
  const fullTitle = title ? `${title} | ${SITE_NAME}` : copy.title;
  const alternateLocale = locale === "en" ? siteCopy.es.openGraphLocale : siteCopy.en.openGraphLocale;
  const socialImage = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: localizedAlternates(locale, path),
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: localizedPath(locale, path),
      locale: copy.openGraphLocale,
      alternateLocale: [alternateLocale],
      images: [{ url: socialImage, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}

export function createStaticPageMetadata(rawLocale: string, route: StaticRouteKey) {
  const locale = getLocale(rawLocale);
  const routeMetadata = staticRouteMetadata[route];
  const copy = routeMetadata[locale];

  return createPageMetadata({
    locale,
    path: routeMetadata.path,
    title: copy.title,
    description: copy.description,
    index: route !== "gracias",
  });
}

export function createProjectMetadata({
  rawLocale,
  slug,
  name,
  city,
}: {
  rawLocale: string;
  slug: string;
  name: string;
  city: string;
}) {
  const locale = getLocale(rawLocale);
  const path = `/proyectos/${slug}`;
  const title = city ? `${name} — ${city}` : name;
  const description = city
    ? locale === "en"
      ? `Information about ${name}, a real estate project in ${city}.`
      : `Información sobre ${name}, un proyecto inmobiliario en ${city}.`
    : locale === "en"
      ? `Information about the ${name} real estate project.`
      : `Información sobre el proyecto inmobiliario ${name}.`;

  return createPageMetadata({ locale, path, title, description });
}
