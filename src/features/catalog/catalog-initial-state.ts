import {
  createCatalogSearchParams,
  parseCatalogFilters,
} from "./catalog-query";
import { filterAndSortCatalogProjects } from "./catalog-search";
import {
  type CatalogFilters,
  type CatalogLocale,
  type CatalogRentalFilter,
  type ProjectCatalogCardViewModel,
} from "./project-catalog-types";

export type CatalogPageSearchParams = Readonly<
  Record<string, string | string[] | undefined>
>;

export type CatalogRentalCounts = Record<CatalogRentalFilter, number>;

export interface CatalogInitialState {
  filters: CatalogFilters;
  sourceQueryKey: string;
  canonicalQueryKey: string;
  results: ProjectCatalogCardViewModel[];
  rentalCounts: CatalogRentalCounts;
}

export function toCatalogURLSearchParams(
  input: CatalogPageSearchParams,
): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(input).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (typeof value === "string") {
      params.append(key, value);
    }
  });

  return params;
}

export function getCatalogRentalCounts(
  projects: readonly ProjectCatalogCardViewModel[],
): CatalogRentalCounts {
  const counts: CatalogRentalCounts = {
    all: projects.length,
    flexible: 0,
    "30-days": 0,
    "60-days": 0,
    "90-days": 0,
    traditional: 0,
  };

  projects.forEach((project) => {
    if (project.rentalCategory) counts[project.rentalCategory] += 1;
  });

  return counts;
}

export function sanitizeCatalogFiltersForAvailableRentals(
  filters: CatalogFilters,
  rentalCounts: CatalogRentalCounts,
): CatalogFilters {
  if (
    filters.rental !== "all" &&
    rentalCounts[filters.rental] === 0
  ) {
    return { ...filters, rental: "all" };
  }

  return filters;
}

export function areCatalogFiltersEqual(
  left: CatalogFilters,
  right: CatalogFilters,
): boolean {
  return (
    left.q === right.q &&
    left.rental === right.rental &&
    left.min === right.min &&
    left.max === right.max &&
    left.sort === right.sort
  );
}

export function createCatalogInitialState(
  projects: readonly ProjectCatalogCardViewModel[],
  locale: CatalogLocale,
  params: URLSearchParams,
): CatalogInitialState {
  const rentalCounts = getCatalogRentalCounts(projects);
  const filters = sanitizeCatalogFiltersForAvailableRentals(
    parseCatalogFilters(params),
    rentalCounts,
  );

  return {
    filters,
    sourceQueryKey: params.toString(),
    canonicalQueryKey: createCatalogSearchParams(filters, params).toString(),
    results: filterAndSortCatalogProjects(projects, filters, locale),
    rentalCounts,
  };
}
