import "server-only";

import { ALL_PROJECTS } from "@/data/projects/index";
import type { Locale } from "@/i18n/config";
import type { CanonicalProjectViewModel } from "../project-view-model";
import { adaptLegacyProject } from "./adapt-legacy-project";

const projectsBySlug = new Map(
  ALL_PROJECTS.map((project) => [project.slug.slice("/proyectos/".length), project]),
);

export function getCanonicalProject(
  slug: string,
  locale: Locale,
): CanonicalProjectViewModel | null {
  const project = projectsBySlug.get(slug);
  return project ? adaptLegacyProject(project, locale) : null;
}

export function getAllCanonicalProjects(locale: Locale): CanonicalProjectViewModel[] {
  return ALL_PROJECTS.map((project) => adaptLegacyProject(project, locale));
}
