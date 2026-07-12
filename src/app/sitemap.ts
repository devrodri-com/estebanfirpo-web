import type { MetadataRoute } from "next";
import { ALL_PROJECTS } from "@/data/projects/index";
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
  "storages",
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
  const staticEntries = sitemapRoutes.flatMap((route) =>
    entriesForPath(staticRouteMetadata[route].path),
  );
  const projectPaths = [
    ...new Set(
      ALL_PROJECTS.map((project) =>
        project.slug.startsWith("/proyectos/")
          ? project.slug
          : `/proyectos/${project.slug.replace(/^\/+/, "")}`,
      ),
    ),
  ];
  const projectEntries = projectPaths.flatMap(entriesForPath);

  return [...staticEntries, ...projectEntries];
}
