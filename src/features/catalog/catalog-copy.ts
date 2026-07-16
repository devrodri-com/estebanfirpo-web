import type {
  CatalogLocale,
  CatalogRentalFilter,
  CatalogSort,
} from "./project-catalog-types";

export function getCatalogCopy(locale: CatalogLocale) {
  const isEnglish = locale === "en";

  return {
    eyebrow: isEnglish ? "PROJECT CATALOG" : "CATÁLOGO DE PROYECTOS",
    title: isEnglish
      ? "Miami real estate projects"
      : "Proyectos inmobiliarios en Miami",
    description: isEnglish
      ? "Search by name or area and compare price ranges and rental policies to narrow the catalog using clear criteria."
      : "Buscá por nombre o zona y compará rangos de precio y políticas de renta para acotar la búsqueda con criterios concretos.",
    filters: isEnglish ? "Filters" : "Filtros",
    closeFilters: isEnglish ? "Close filters" : "Cerrar filtros",
    search: isEnglish ? "Search projects" : "Buscar proyectos",
    rental: isEnglish ? "Rental policy" : "Política de renta",
    minPrice: isEnglish ? "Minimum price" : "Precio mínimo",
    maxPrice: isEnglish ? "Maximum price" : "Precio máximo",
    pricesHelp: isEnglish
      ? "Prices in thousands of USD (500 = USD 500,000)"
      : "Precios en miles de USD (500 = USD 500.000)",
    sort: isEnglish ? "Sort by" : "Ordenar por",
    reset: isEnglish ? "Clear filters" : "Limpiar filtros",
    removeFilter: isEnglish ? "Remove filter" : "Quitar filtro",
    activeFilters: isEnglish ? "Active filters" : "Filtros activos",
    noResults: isEnglish
      ? "We couldn’t find projects with these filters"
      : "No encontramos proyectos con estos filtros",
    noResultsHelp: isEnglish
      ? "Try changing your search or clearing the filters."
      : "Probá modificar la búsqueda o limpiar los filtros.",
    invalidRange: isEnglish
      ? "The minimum price cannot be higher than the maximum. The price range is not being applied."
      : "El precio mínimo no puede superar al máximo. El rango de precio no se está aplicando.",
    projectCount: (count: number) =>
      isEnglish
        ? `${count} ${count === 1 ? "project" : "projects"}`
        : `${count} ${count === 1 ? "proyecto" : "proyectos"}`,
    viewResults: (count: number) =>
      isEnglish
        ? `View ${count} ${count === 1 ? "project" : "projects"}`
        : `Ver ${count} ${count === 1 ? "proyecto" : "proyectos"}`,
    from: isEnglish ? "From" : "Desde",
    inquire: isEnglish ? "Inquire" : "Consultar",
    viewDetails: isEnglish ? "View details" : "Ver más detalles",
    searchChip: (value: string) =>
      isEnglish ? `Search: “${value}”` : `Búsqueda: “${value}”`,
    minChip: (value: string) =>
      isEnglish ? `Minimum: ${value}` : `Mínimo: ${value}`,
    maxChip: (value: string) =>
      isEnglish ? `Maximum: ${value}` : `Máximo: ${value}`,
    rentalLabel: (value: CatalogRentalFilter) => {
      const labels: Record<CatalogRentalFilter, string> = isEnglish
        ? {
            all: "All",
            flexible: "Flexible / short stays",
            "30-days": "30-day minimum",
            "60-days": "60-day minimum",
            "90-days": "90-day minimum",
            traditional: "Traditional / long-term",
          }
        : {
            all: "Todas",
            flexible: "Flexible / Renta Corta",
            "30-days": "Mínimo 30 días",
            "60-days": "Mínimo 60 días",
            "90-days": "Mínimo 90 días",
            traditional: "Tradicional / largo plazo",
          };
      return labels[value];
    },
    sortLabel: (value: CatalogSort) => {
      const labels: Record<CatalogSort, string> = {
        "alpha-asc": "A → Z",
        "alpha-desc": "Z → A",
        "price-asc": isEnglish ? "Lowest price" : "Precio más bajo",
        "price-desc": isEnglish ? "Highest price" : "Precio más alto",
      };
      return labels[value];
    },
  };
}
