import {
  catalogRentalFilters,
  catalogSortOptions,
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
  type CatalogRentalFilter,
  type CatalogSort,
} from "./project-catalog-types";

export const CATALOG_QUERY_KEYS = ["q", "rental", "min", "max", "sort"] as const;
const CATALOG_QUERY_KEY_SET = new Set<string>(CATALOG_QUERY_KEYS);
const MAX_QUERY_LENGTH = 120;
const MAX_PRICE_USD = 100_000_000;

function firstValue(params: URLSearchParams, key: string): string | null {
  const values = params.getAll(key);
  return values.length ? values[0] : null;
}

function parsePrice(value: string | null): number | undefined {
  if (!value || !/^\d+$/.test(value)) return undefined;
  const parsed = Number(value);
  if (
    !Number.isSafeInteger(parsed) ||
    parsed <= 0 ||
    parsed > MAX_PRICE_USD ||
    parsed % 1000 !== 0
  ) {
    return undefined;
  }
  return parsed;
}

export function sanitizeCatalogSearchQuery(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, MAX_QUERY_LENGTH);
}

export function parseCatalogFilters(params: URLSearchParams): CatalogFilters {
  const rawRental = firstValue(params, "rental");
  const rawSort = firstValue(params, "sort");
  const rental = catalogRentalFilters.includes(rawRental as CatalogRentalFilter)
    ? (rawRental as CatalogRentalFilter)
    : DEFAULT_CATALOG_FILTERS.rental;
  const sort = catalogSortOptions.includes(rawSort as CatalogSort)
    ? (rawSort as CatalogSort)
    : DEFAULT_CATALOG_FILTERS.sort;

  return {
    q: sanitizeCatalogSearchQuery(firstValue(params, "q") ?? ""),
    rental,
    min: parsePrice(firstValue(params, "min")),
    max: parsePrice(firstValue(params, "max")),
    sort,
  };
}

export function createCatalogSearchParams(
  filters: CatalogFilters,
  currentParams?: URLSearchParams,
): URLSearchParams {
  const next = new URLSearchParams();
  const query = sanitizeCatalogSearchQuery(filters.q);

  if (query) next.set("q", query);
  if (filters.rental !== DEFAULT_CATALOG_FILTERS.rental) {
    next.set("rental", filters.rental);
  }
  if (typeof filters.min === "number") next.set("min", String(filters.min));
  if (typeof filters.max === "number") next.set("max", String(filters.max));
  if (filters.sort !== DEFAULT_CATALOG_FILTERS.sort) next.set("sort", filters.sort);

  currentParams?.forEach((value, key) => {
    if (!CATALOG_QUERY_KEY_SET.has(key) && !next.has(key)) next.set(key, value);
  });

  return next;
}

export function createCatalogHref(
  pathname: string,
  filters: CatalogFilters,
  currentParams?: URLSearchParams,
): string {
  const query = createCatalogSearchParams(filters, currentParams).toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function preserveCatalogQueryParams(
  pathname: string,
  params: URLSearchParams,
): string {
  if (!/^\/(es|en)\/proyectos\/?$/.test(pathname)) return "";
  const parsed = parseCatalogFilters(params);
  return createCatalogSearchParams(parsed).toString();
}
