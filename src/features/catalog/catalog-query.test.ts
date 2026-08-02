import { describe, expect, it } from "vitest";
import {
  createCatalogHref,
  createCatalogSearchParams,
  parseCatalogFilters,
  preserveCatalogQueryParams,
  sanitizeCatalogSearchQuery,
} from "./catalog-query";
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
} from "./project-catalog-types";

describe("catalog query contract", () => {
  it("uses the approved defaults for an empty query", () => {
    expect(parseCatalogFilters(new URLSearchParams())).toEqual(
      DEFAULT_CATALOG_FILTERS,
    );
    expect(createCatalogSearchParams(DEFAULT_CATALOG_FILTERS).toString()).toBe(
      "",
    );
  });

  it("parses and serializes every public filter", () => {
    const params = new URLSearchParams(
      "q=william&rental=90-days&min=300000&max=600000&sort=price-asc",
    );
    const filters: CatalogFilters = {
      q: "william",
      rental: "90-days",
      min: 300_000,
      max: 600_000,
      sort: "price-asc",
    };

    expect(parseCatalogFilters(params)).toEqual(filters);
    expect(createCatalogHref("/es/proyectos", filters)).toBe(
      "/es/proyectos?q=william&rental=90-days&min=300000&max=600000&sort=price-asc",
    );
  });

  it("sanitizes unknown and empty enum values without affecting search", () => {
    expect(
      parseCatalogFilters(
        new URLSearchParams("q=%20%20The%20%20William%20&rental=unknown&sort="),
      ),
    ).toEqual({
      ...DEFAULT_CATALOG_FILTERS,
      q: "The William",
    });
  });

  it.each([
    "abc",
    "-1000",
    "0",
    "",
    "   ",
    "999",
    "1500",
    "100001000",
    "9007199254741000",
  ])("rejects an invalid price value: %s", (value) => {
    expect(parseCatalogFilters(new URLSearchParams({ min: value })).min).toBe(
      undefined,
    );
  });

  it("uses the first value for repeated public parameters", () => {
    const params = new URLSearchParams([
      ["q", "  william  "],
      ["q", "ignored"],
      ["rental", "90-days"],
      ["rental", "flexible"],
      ["min", "300000"],
      ["min", "900000"],
      ["max", "600000"],
      ["max", "800000"],
      ["sort", "price-asc"],
      ["sort", "alpha-desc"],
    ]);

    expect(parseCatalogFilters(params)).toEqual({
      q: "william",
      rental: "90-days",
      min: 300_000,
      max: 600_000,
      sort: "price-asc",
    });
  });

  it("preserves unknown parameters, repeated UTMs and their order", () => {
    const current = new URLSearchParams([
      ["utm_source", "newsletter"],
      ["utm_term", "one"],
      ["utm_term", "two"],
      ["custom", "value"],
    ]);
    const filters = { ...DEFAULT_CATALOG_FILTERS, q: "william" };

    expect(createCatalogSearchParams(filters, current).toString()).toBe(
      "q=william&utm_source=newsletter&utm_term=one&utm_term=two&custom=value",
    );
    expect(createCatalogHref("/en/proyectos", filters, current)).toBe(
      "/en/proyectos?q=william&utm_source=newsletter&utm_term=one&utm_term=two&custom=value",
    );
  });

  it("canonicalizes invalid values without loops", () => {
    const source = new URLSearchParams(
      "q=%20william%20&rental=nope&min=-1&max=abc&sort=nope&utm_source=qa",
    );
    const first = createCatalogSearchParams(
      parseCatalogFilters(source),
      source,
    );
    const second = createCatalogSearchParams(
      parseCatalogFilters(first),
      first,
    );

    expect(first.toString()).toBe("q=william&utm_source=qa");
    expect(second.toString()).toBe(first.toString());
  });

  it("preserves the current invalid-range contract without swapping values", () => {
    const filters = parseCatalogFilters(
      new URLSearchParams("min=700000&max=300000"),
    );

    expect(filters.min).toBe(700_000);
    expect(filters.max).toBe(300_000);
    expect(createCatalogSearchParams(filters).toString()).toBe(
      "min=700000&max=300000",
    );
  });

  it("preserves catalog queries only on localized catalog indexes", () => {
    const params = new URLSearchParams(
      "q=william&rental=90-days&utm_source=qa",
    );

    expect(preserveCatalogQueryParams("/es/proyectos", params)).toBe(
      "q=william&rental=90-days&utm_source=qa",
    );
    expect(preserveCatalogQueryParams("/en/proyectos/", params)).toBe(
      "q=william&rental=90-days&utm_source=qa",
    );
    expect(preserveCatalogQueryParams("/es/proyectos/the-william", params)).toBe(
      "",
    );
    expect(preserveCatalogQueryParams("/es", params)).toBe("");
  });

  it("collapses whitespace and limits search input to 120 characters", () => {
    expect(sanitizeCatalogSearchQuery("  The   William  ")).toBe(
      "The William",
    );
    expect(sanitizeCatalogSearchQuery(`  ${"a".repeat(130)}  `)).toHaveLength(
      120,
    );
  });
});
