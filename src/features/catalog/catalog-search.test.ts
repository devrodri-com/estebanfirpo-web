import { describe, expect, it } from "vitest";
import {
  filterAndSortCatalogProjects,
  normalizeCatalogText,
} from "./catalog-search";
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
  type ProjectCatalogCardViewModel,
  type ProjectRentalCategory,
} from "./project-catalog-types";

function project(
  slug: string,
  name: string,
  searchLocation: string,
  priceFromUsd: number,
  rentalCategory: ProjectRentalCategory,
): ProjectCatalogCardViewModel {
  return {
    id: slug,
    slug,
    name,
    location: searchLocation,
    searchLocation,
    image: `/images/${slug}.jpg`,
    priceFromUsd,
    rentalPolicy: rentalCategory,
    rentalCategory,
    highlights: [],
    locale: "es",
  };
}

const projects = [
  project(
    "jean-georges-miami-tropic-residences",
    "Jean-Georges Miami Tropic Residences",
    "Miami",
    600_000,
    "flexible",
  ),
  project("frida-kahlo-wynwood", "Frida Kahlo", "Wynwood", 700_000, "flexible"),
  project("cassia-coral-gables", "Cassia", "Coral Gables", 550_000, "traditional"),
  project(
    "the-william",
    "The William Residences",
    "North Miami Beach",
    450_000,
    "90-days",
  ),
] satisfies ProjectCatalogCardViewModel[];

describe("catalog search contract", () => {
  it.each([
    ["WYNWOOD", "wynwood"],
    ["miámi", "miami"],
    ["mia\u0301mi", "miami"],
    ["Jean   Georges", "jean georges"],
    ["Jean-Georges", "jean georges"],
    ["Jean‑Georges", "jean georges"],
    ["Frida—Kahlo", "frida kahlo"],
    ["O'Kan", "okan"],
    ["O’Kan", "okan"],
    ["  Brickell!!!   Bay  ", "brickell bay"],
    ["", ""],
  ])("normalizes %j as %j", (input, expected) => {
    expect(normalizeCatalogText(input)).toBe(expected);
  });

  it.each([
    ["Jean Georges", "jean-georges-miami-tropic-residences"],
    ["Frida.Kahlo", "frida-kahlo-wynwood"],
    ["Coral Gables", "cassia-coral-gables"],
    ["WYNWOOD", "frida-kahlo-wynwood"],
    ["miámi", "the-william"],
    ["The William", "the-william"],
  ])("finds %j using normalized name or location", (query, expectedSlug) => {
    const results = filterAndSortCatalogProjects(
      projects,
      { ...DEFAULT_CATALOG_FILTERS, q: query },
      "es",
    );

    expect(results.map(({ slug }) => slug)).toContain(expectedSlug);
  });

  it("ignores only price bounds when the range is invalid", () => {
    const filters: CatalogFilters = {
      q: "william",
      rental: "90-days",
      min: 900_000,
      max: 300_000,
      sort: "alpha-asc",
    };

    expect(
      filterAndSortCatalogProjects(projects, filters, "es").map(
        ({ slug }) => slug,
      ),
    ).toEqual(["the-william"]);
  });

  it("includes both price boundaries", () => {
    const filters: CatalogFilters = {
      ...DEFAULT_CATALOG_FILTERS,
      min: 550_000,
      max: 600_000,
    };

    expect(
      filterAndSortCatalogProjects(projects, filters, "es").map(
        ({ slug }) => slug,
      ),
    ).toEqual([
      "cassia-coral-gables",
      "jean-georges-miami-tropic-residences",
    ]);
  });

  it("sorts equal prices by name without mutating the input", () => {
    const input = [
      project("jean", "Jean", "Miami", 600_000, "flexible"),
      project("frida", "Frida", "Miami", 600_000, "flexible"),
    ];
    const originalOrder = input.map(({ slug }) => slug);

    const results = filterAndSortCatalogProjects(
      input,
      { ...DEFAULT_CATALOG_FILTERS, sort: "price-asc" },
      "es",
    );

    expect(results.map(({ slug }) => slug)).toEqual(["frida", "jean"]);
    expect(input.map(({ slug }) => slug)).toEqual(originalOrder);
  });
});
