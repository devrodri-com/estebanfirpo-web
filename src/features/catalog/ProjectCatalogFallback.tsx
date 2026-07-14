import { CatalogProjectCard } from "./CatalogProjectCard";
import { getCatalogCopy } from "./catalog-copy";
import { filterAndSortCatalogProjects } from "./catalog-search";
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogLocale,
  type ProjectCatalogCardViewModel,
} from "./project-catalog-types";

interface ProjectCatalogFallbackProps {
  locale: CatalogLocale;
  projects: ProjectCatalogCardViewModel[];
}

export function ProjectCatalogFallback({
  locale,
  projects,
}: ProjectCatalogFallbackProps) {
  const copy = getCatalogCopy(locale);
  const sorted = filterAndSortCatalogProjects(
    projects,
    DEFAULT_CATALOG_FILTERS,
    locale,
  );

  return (
    <section className="py-8 sm:py-12" aria-label={copy.title}>
      <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        {copy.title}
      </h1>
      <div className="mt-5 h-48 animate-pulse rounded-[10px] bg-[#0A2540] sm:h-40" />
      <p className="mt-6 text-sm font-semibold text-[#0A2540]">
        {copy.projectCount(sorted.length)}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {sorted.map((project) => (
          <CatalogProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
