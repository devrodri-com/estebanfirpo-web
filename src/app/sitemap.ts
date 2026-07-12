import type { MetadataRoute } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import {
  absoluteUrl,
  localizedPath,
  staticRouteMetadata,
  type StaticRouteKey,
} from "@/lib/metadata";

const sitemapRoutes: StaticRouteKey[] = [
  "home",
  "miami",
  "precon",
  "proyectos",
  "contacto",
  "financiacion",
  "sobreMi",
];

function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))]),
    ),
    "x-default": absoluteUrl(localizedPath(defaultLocale, path)),
  };
}

function entriesForPath(path: string): MetadataRoute.Sitemap {
  const languages = languageAlternates(path);

  return locales.map((locale: Locale) => ({
    url: absoluteUrl(localizedPath(locale, path)),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.flatMap((route) =>
    entriesForPath(staticRouteMetadata[route].path),
  );
}
