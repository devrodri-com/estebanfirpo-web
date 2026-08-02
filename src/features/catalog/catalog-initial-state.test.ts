import { describe, expect, it } from "vitest";
import {
  areCatalogFiltersEqual,
  createCatalogInitialState,
  toCatalogURLSearchParams,
} from "./catalog-initial-state";
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
  type ProjectCatalogCardViewModel,
  type ProjectRentalCategory,
} from "./project-catalog-types";

function project(
  slug: string,
  name: string,
  priceFromUsd: number,
  rentalCategory: ProjectRentalCategory,
): ProjectCatalogCardViewModel {
  return {
    id: slug,
    slug,
    name,
    location: "Miami",
    searchLocation: "Miami",
    image: `/images/${slug}.jpg`,
    priceFromUsd,
    rentalPolicy: rentalCategory,
    rentalCategory,
    highlights: [],
    locale: "es",
  };
}

const projects = [
  project("the-william", "The William Residences", 500_000, "90-days"),
  project("2200-brickell", "2200 Brickell", 830_000, "90-days"),
  project("frida-kahlo-wynwood", "Frida Kahlo", 700_000, "flexible"),
] satisfies ProjectCatalogCardViewModel[];

describe("catalog initial state contract", () => {
  it("resolves defaults in the Node environment", () => {
    const state = createCatalogInitialState(
      projects,
      "es",
      new URLSearchParams(),
    );

    expect(state.filters).toEqual(DEFAULT_CATALOG_FILTERS);
    expect(state.results).toHaveLength(projects.length);
    expect(state.sourceQueryKey).toBe("");
    expect(state.canonicalQueryKey).toBe("");
  });

  it("puts the direct filtered project first and only", () => {
    const params = new URLSearchParams(
      "q=william&rental=90-days&min=300000&max=600000&sort=price-asc",
    );
    const state = createCatalogInitialState(projects, "es", params);

    expect(state.results.map(({ slug }) => slug)).toEqual(["the-william"]);
    expect(state.results[0]?.image).toBe("/images/the-william.jpg");
    expect(state.sourceQueryKey).toBe(state.canonicalQueryKey);
  });

  it("produces an empty state from the first resolution", () => {
    const state = createCatalogInitialState(
      projects,
      "es",
      new URLSearchParams("q=william&rental=flexible"),
    );

    expect(state.results).toEqual([]);
  });

  it("sanitizes invalid filters while preserving unknown parameters", () => {
    const state = createCatalogInitialState(
      projects,
      "es",
      new URLSearchParams(
        "rental=unknown&min=-1&sort=unknown&utm_source=qa",
      ),
    );

    expect(state.filters).toEqual(DEFAULT_CATALOG_FILTERS);
    expect(state.canonicalQueryKey).toBe("utm_source=qa");
  });

  it("uses first public values and preserves repeated unknown values", () => {
    const params = toCatalogURLSearchParams({
      q: ["william", "ignored"],
      utm_source: ["first", "second"],
      omitted: undefined,
    });
    const state = createCatalogInitialState(projects, "es", params);

    expect(state.filters.q).toBe("william");
    expect(state.results.map(({ slug }) => slug)).toEqual(["the-william"]);
    expect(state.canonicalQueryKey).toBe(
      "q=william&utm_source=first&utm_source=second",
    );
  });

  it("resolves equivalent server and canonical client inputs identically", () => {
    const serverParams = toCatalogURLSearchParams({
      q: "  william  ",
      rental: "invalid",
      utm_source: "qa",
    });
    const serverState = createCatalogInitialState(projects, "es", serverParams);
    const clientState = createCatalogInitialState(
      projects,
      "es",
      new URLSearchParams(serverState.canonicalQueryKey),
    );

    expect(clientState.filters).toEqual(serverState.filters);
    expect(clientState.results).toEqual(serverState.results);
    expect(clientState.rentalCounts).toEqual(serverState.rentalCounts);
    expect(clientState.canonicalQueryKey).toBe(serverState.canonicalQueryKey);
  });

  it("falls back from an unavailable rental without losing unknown params", () => {
    const state = createCatalogInitialState(
      projects,
      "es",
      new URLSearchParams("rental=60-days&utm_campaign=summer"),
    );

    expect(state.filters.rental).toBe("all");
    expect(state.results).toHaveLength(projects.length);
    expect(state.rentalCounts["60-days"]).toBe(0);
    expect(state.canonicalQueryKey).toBe("utm_campaign=summer");
  });

  it("recognizes equivalent filters", () => {
    expect(
      areCatalogFiltersEqual(DEFAULT_CATALOG_FILTERS, {
        ...DEFAULT_CATALOG_FILTERS,
      }),
    ).toBe(true);
  });

  it.each([
    ["q", { q: "william" }],
    ["rental", { rental: "90-days" }],
    ["min", { min: 300_000 }],
    ["max", { max: 600_000 }],
    ["sort", { sort: "price-asc" }],
  ] as const)("detects a change to %s", (_field, change) => {
    const changed = { ...DEFAULT_CATALOG_FILTERS, ...change } as CatalogFilters;

    expect(areCatalogFiltersEqual(DEFAULT_CATALOG_FILTERS, changed)).toBe(
      false,
    );
  });
});
