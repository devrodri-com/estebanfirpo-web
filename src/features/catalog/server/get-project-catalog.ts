import "server-only";

import { ALL_PROJECTS } from "@/data/projects/index";
import type { Project } from "@/data/types";
import {
  isPublicProjectSlug,
  PROJECT_RENTAL_CATEGORY_BY_SLUG,
} from "../rental-classification";
import type {
  CatalogLocale,
  ProjectCatalogCardViewModel,
} from "../project-catalog-types";

function getVisibleRentalPolicy(
  project: Project,
  locale: CatalogLocale,
): string {
  const localized =
    locale === "en" ? project.rentalPolicyEn : project.rentalPolicyEs;
  if (localized?.trim()) return localized.trim();

  return project.rentalPolicy?.trim() ?? "";
}

function getHighlights(project: Project, locale: CatalogLocale): string[] {
  const values =
    locale === "en"
      ? project.highlightsEn ?? project.highlights
      : project.highlights;
  return values?.slice(0, 2) ?? [];
}

export function getProjectCatalogCardViewModels(
  locale: CatalogLocale,
): ProjectCatalogCardViewModel[] {
  return ALL_PROJECTS.map((project) => {
    if (!isPublicProjectSlug(project.slug)) {
      throw new Error(`Catalog project has an unexpected public slug: ${project.slug}`);
    }

    return {
      id: project.id,
      slug: project.slug,
      name: project.name,
      location: project.city,
      searchLocation: [project.city, project.locationLabel]
        .filter(Boolean)
        .join(" "),
      image: project.image,
      priceFromUsd: project.priceFromUsd,
      pricePerSfApprox: project.pricePerSfApprox,
      delivery: project.delivery,
      rentalPolicy: getVisibleRentalPolicy(project, locale),
      rentalCategory: PROJECT_RENTAL_CATEGORY_BY_SLUG[project.slug],
      highlights: getHighlights(project, locale),
      locale,
    };
  });
}
