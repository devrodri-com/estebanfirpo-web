import { CatalogProjectCard } from "./CatalogProjectCard";
import { getCatalogCopy } from "./catalog-copy";
import { filterAndSortCatalogProjects } from "./catalog-search";
import { ProjectCatalogHeader } from "./ProjectCatalogHeader";
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
    <section className="py-8 sm:py-12" aria-labelledby="catalog-title">
      <ProjectCatalogHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        mobileAction={
          <span
            className="block h-11 w-24 animate-pulse rounded-md border border-black/10 bg-white"
            aria-hidden="true"
          />
        }
      />
      <div className="mt-10 hidden h-[22rem] animate-pulse rounded-[10px] bg-[#0A2540] sm:block lg:h-[12.25rem]" />
      <p className="mt-5 text-sm font-semibold text-[#0A2540]">
        {copy.projectCount(sorted.length)}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {sorted.map((project, index) => (
          <CatalogProjectCard
            key={project.slug}
            project={project}
            prioritizeImage={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
