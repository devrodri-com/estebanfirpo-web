export const catalogRentalFilters = [
  "all",
  "flexible",
  "30-days",
  "60-days",
  "90-days",
  "traditional",
] as const;

export type CatalogRentalFilter = (typeof catalogRentalFilters)[number];
export type ProjectRentalCategory = Exclude<CatalogRentalFilter, "all">;

export const catalogSortOptions = [
  "alpha-asc",
  "alpha-desc",
  "price-asc",
  "price-desc",
] as const;

export type CatalogSort = (typeof catalogSortOptions)[number];
export type CatalogLocale = "es" | "en";

export interface CatalogFilters {
  q: string;
  rental: CatalogRentalFilter;
  min?: number;
  max?: number;
  sort: CatalogSort;
}

export interface ProjectCatalogCardViewModel {
  id: string;
  slug: string;
  name: string;
  location: string;
  searchLocation: string;
  image: string;
  priceFromUsd?: number;
  pricePerSfApprox?: number;
  delivery?: string;
  rentalPolicy: string;
  rentalCategory: ProjectRentalCategory | null;
  highlights: string[];
  locale: CatalogLocale;
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  q: "",
  rental: "all",
  min: undefined,
  max: undefined,
  sort: "alpha-asc",
};
