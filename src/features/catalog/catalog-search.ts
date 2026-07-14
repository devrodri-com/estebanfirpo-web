import type {
  CatalogFilters,
  CatalogLocale,
  ProjectCatalogCardViewModel,
} from "./project-catalog-types";

const DASHES = /[\u002D\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A-\u2E3B\u2E40\u301C\u3030\u30A0\uFE31-\uFE32\uFE58\uFE63\uFF0D]/gu;
const APOSTROPHES = /['\u2018\u2019\u201A\u201B\u2032\u2035\uFF07]/gu;
const PUNCTUATION = /[^\p{L}\p{N}]+/gu;

export function normalizeCatalogText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .replace(DASHES, " ")
    .replace(APOSTROPHES, "")
    .replace(PUNCTUATION, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase();
}

export function hasInvalidPriceRange(filters: CatalogFilters): boolean {
  return (
    typeof filters.min === "number" &&
    typeof filters.max === "number" &&
    filters.min > filters.max
  );
}

function matchesSearch(
  project: ProjectCatalogCardViewModel,
  normalizedQuery: string,
): boolean {
  if (!normalizedQuery) return true;

  const searchable = normalizeCatalogText(
    `${project.name} ${project.searchLocation}`,
  );
  return searchable.includes(normalizedQuery);
}

function compareNames(
  a: ProjectCatalogCardViewModel,
  b: ProjectCatalogCardViewModel,
  collator: Intl.Collator,
): number {
  return collator.compare(a.name, b.name) || a.slug.localeCompare(b.slug);
}

export function filterAndSortCatalogProjects(
  projects: readonly ProjectCatalogCardViewModel[],
  filters: CatalogFilters,
  locale: CatalogLocale,
): ProjectCatalogCardViewModel[] {
  const normalizedQuery = normalizeCatalogText(filters.q);
  const invalidRange = hasInvalidPriceRange(filters);
  const filtered = projects.filter((project) => {
    if (!matchesSearch(project, normalizedQuery)) return false;
    if (
      filters.rental !== "all" &&
      project.rentalCategory !== filters.rental
    ) {
      return false;
    }

    if (invalidRange) return true;

    const price = project.priceFromUsd;
    if (typeof filters.min === "number") {
      if (typeof price !== "number" || price < filters.min) return false;
    }
    if (typeof filters.max === "number") {
      if (typeof price !== "number" || price > filters.max) return false;
    }
    return true;
  });

  const collator = new Intl.Collator(locale === "en" ? "en-US" : "es-ES", {
    sensitivity: "base",
  });

  return filtered.toSorted((a, b) => {
    if (filters.sort === "alpha-desc") {
      return -compareNames(a, b, collator);
    }
    if (filters.sort === "price-asc" || filters.sort === "price-desc") {
      const aHasPrice = typeof a.priceFromUsd === "number";
      const bHasPrice = typeof b.priceFromUsd === "number";
      if (aHasPrice !== bHasPrice) return aHasPrice ? -1 : 1;
      if (aHasPrice && bHasPrice) {
        const difference = a.priceFromUsd! - b.priceFromUsd!;
        if (difference !== 0) {
          return filters.sort === "price-asc" ? difference : -difference;
        }
      }
    }
    return compareNames(a, b, collator);
  });
}
