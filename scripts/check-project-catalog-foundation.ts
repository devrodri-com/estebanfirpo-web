import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createCatalogHref,
  createCatalogSearchParams,
  parseCatalogFilters,
  preserveCatalogQueryParams,
} from "../src/features/catalog/catalog-query";
import { getCatalogCopy } from "../src/features/catalog/catalog-copy";
import {
  filterAndSortCatalogProjects,
  hasInvalidPriceRange,
  normalizeCatalogText,
} from "../src/features/catalog/catalog-search";
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
  type ProjectCatalogCardViewModel,
} from "../src/features/catalog/project-catalog-types";
import {
  createCatalogInitialState,
  toCatalogURLSearchParams,
} from "../src/features/catalog/catalog-initial-state";
import { getProjectCatalogCardViewModels } from "../src/features/catalog/server/get-project-catalog";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const catalogFeatureRoot = path.join(
  repositoryRoot,
  "src/features/catalog",
);

function catalogJsxFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return catalogJsxFiles(fullPath);
    return /\.[jt]sx$/.test(entry.name) ? [fullPath] : [];
  });
}

const nativeSelectFiles = catalogJsxFiles(catalogFeatureRoot)
  .filter((file) => /<select(?=[\s/>])/.test(readFileSync(file, "utf8")))
  .map((file) => path.relative(repositoryRoot, file));

assert.deepEqual(
  nativeSelectFiles,
  [],
  `Native <select> is forbidden in the catalog; use CatalogSelect. Found: ${nativeSelectFiles.join(", ")}`,
);

const expectedKeys = [
  "delivery",
  "highlights",
  "id",
  "image",
  "locale",
  "location",
  "name",
  "priceFromUsd",
  "pricePerSfApprox",
  "rentalCategory",
  "rentalPolicy",
  "searchLocation",
  "slug",
].sort();

const es = getProjectCatalogCardViewModels("es");
const en = getProjectCatalogCardViewModels("en");
assert.equal(es.length, 36, "Spanish catalog must contain 36 cards");
assert.equal(en.length, 36, "English catalog must contain 36 cards");

for (const [locale, models] of [["es", es], ["en", en]] as const) {
  const slugs = new Set<string>();
  for (const model of models) {
    assert.deepEqual(
      Object.keys(model).sort(),
      expectedKeys,
      `${locale}/${model.slug} must expose only catalog fields`,
    );
    assert.equal(model.locale, locale);
    assert.ok(model.name.trim());
    assert.ok(model.location.trim());
    assert.ok(model.image.trim());
    assert.ok(model.slug.startsWith("/proyectos/"));
    assert.ok(model.highlights.length <= 2);
    assert.ok(!slugs.has(model.slug), `Duplicate ${locale} slug ${model.slug}`);
    slugs.add(model.slug);
  }
}

assert.equal(normalizeCatalogText("Jean‑Georges"), "jean georges");
assert.equal(normalizeCatalogText("  Málaga  " ), "malaga");
assert.equal(normalizeCatalogText("O’Kan"), "okan");
assert.equal(normalizeCatalogText("Frida—Kahlo"), "frida kahlo");

function search(query: string) {
  return filterAndSortCatalogProjects(
    es,
    { ...DEFAULT_CATALOG_FILTERS, q: query },
    "es",
  );
}

assert.deepEqual(search("Jean Georges").map((model) => model.slug), [
  "/proyectos/jean-georges-tropic",
]);
assert.deepEqual(search("Frida Kahlo").map((model) => model.slug), [
  "/proyectos/frida-kahlo",
]);
assert.deepEqual(search("  Frida   Kahlo  ").map((model) => model.slug), [
  "/proyectos/frida-kahlo",
]);
assert.deepEqual(search("Coral Gables").map((model) => model.slug), [
  "/proyectos/cassia",
]);
assert.equal(search("Wynwood").length, 4);
assert.ok(search("miámi").length > 0);
assert.equal(search("zzzz-no-project").length, 0);

const flowHouseEn = en.find((model) => model.slug === "/proyectos/flow-house");
assert.equal(
  flowHouseEn?.rentalPolicy,
  "30 días",
  "Shared legacy rental copy must remain unchanged in the English catalog",
);

const williamFilters: CatalogFilters = {
  q: "william",
  rental: "90-days",
  min: 300_000,
  max: 600_000,
  sort: "price-asc",
};
assert.deepEqual(
  filterAndSortCatalogProjects(es, williamFilters, "es").map(
    (model) => model.slug,
  ),
  ["/proyectos/the-william"],
);

const invalidRange: CatalogFilters = {
  ...DEFAULT_CATALOG_FILTERS,
  min: 700_000,
  max: 300_000,
};
assert.equal(hasInvalidPriceRange(invalidRange), true);
assert.equal(
  filterAndSortCatalogProjects(es, invalidRange, "es").length,
  36,
  "Invalid price range must not silently filter the catalog",
);

const withoutPrice: ProjectCatalogCardViewModel = {
  ...es[0],
  id: "fixture-without-price",
  slug: "/proyectos/fixture-without-price",
  name: "ZZ Fixture without price",
  priceFromUsd: undefined,
};
const priceSorted = filterAndSortCatalogProjects(
  [withoutPrice, ...es.slice(0, 2)],
  { ...DEFAULT_CATALOG_FILTERS, sort: "price-desc" },
  "es",
);
assert.equal(priceSorted.at(-1)?.id, withoutPrice.id);

for (const sort of ["price-asc", "price-desc"] as const) {
  const sorted = filterAndSortCatalogProjects(
    es,
    { ...DEFAULT_CATALOG_FILTERS, sort },
    "es",
  ).filter((model) => typeof model.priceFromUsd === "number");
  const direction = sort === "price-asc" ? 1 : -1;
  assert.ok(
    sorted.every(
      (model, index) =>
        index === 0 ||
        direction * (model.priceFromUsd! - sorted[index - 1].priceFromUsd!) >= 0,
    ),
    `${sort} must be monotonic`,
  );
}

const alphaAsc = filterAndSortCatalogProjects(
  es,
  { ...DEFAULT_CATALOG_FILTERS, sort: "alpha-asc" },
  "es",
).map((model) => model.name);
const alphaDesc = filterAndSortCatalogProjects(
  es,
  { ...DEFAULT_CATALOG_FILTERS, sort: "alpha-desc" },
  "es",
).map((model) => model.name);
assert.deepEqual(alphaDesc, alphaAsc.toReversed());

const directParams = new URLSearchParams(
  "q=william&rental=90-days&min=300000&max=600000&sort=price-asc",
);
assert.deepEqual(parseCatalogFilters(directParams), williamFilters);
assert.equal(
  createCatalogHref("/es/proyectos", williamFilters),
  "/es/proyectos?q=william&rental=90-days&min=300000&max=600000&sort=price-asc",
);
assert.equal(
  preserveCatalogQueryParams("/es/proyectos", directParams),
  directParams.toString(),
);
assert.equal(preserveCatalogQueryParams("/es", directParams), "");

const invalidParams = new URLSearchParams(
  "q=&rental=nope&min=-1&max=abc&sort=nope&x=1",
);
const parsedInvalid = parseCatalogFilters(invalidParams);
assert.deepEqual(parsedInvalid, DEFAULT_CATALOG_FILTERS);
assert.equal(createCatalogSearchParams(parsedInvalid, invalidParams).toString(), "x=1");

const subThousandParams = new URLSearchParams("min=1&max=999");
assert.deepEqual(
  parseCatalogFilters(subThousandParams),
  DEFAULT_CATALOG_FILTERS,
  "Price query values must match the UI's thousand-USD precision",
);

function initialState(
  locale: "es" | "en",
  input: Record<string, string | string[] | undefined>,
) {
  const projects = locale === "en" ? en : es;
  return createCatalogInitialState(
    projects,
    locale,
    toCatalogURLSearchParams(input),
  );
}

const defaultInitial = initialState("es", {});
assert.deepEqual(defaultInitial.filters, DEFAULT_CATALOG_FILTERS);
assert.equal(defaultInitial.sourceQueryKey, "");
assert.equal(defaultInitial.canonicalQueryKey, "");
assert.equal(defaultInitial.results.length, 36);

const williamInitialParams = {
  q: "william",
  rental: "90-days",
  min: "300000",
  max: "600000",
  sort: "price-asc",
};
for (const locale of ["es", "en"] as const) {
  const state = initialState(locale, williamInitialParams);
  assert.deepEqual(state.filters, williamFilters);
  assert.equal(state.results.length, 1);
  assert.equal(state.results[0]?.slug, "/proyectos/the-william");
  assert.equal(state.results[0]?.name, "The William Residences");
  assert.equal(state.results[0]?.locale, locale);
  assert.equal(
    getCatalogCopy(locale).projectCount(state.results.length),
    locale === "en" ? "1 project" : "1 proyecto",
  );
  assert.equal(state.sourceQueryKey, directParams.toString());
  assert.equal(state.canonicalQueryKey, directParams.toString());
}

const emptyInitial = initialState("es", {
  q: "william",
  rental: "flexible",
});
assert.equal(emptyInitial.results.length, 0);
assert.equal(emptyInitial.canonicalQueryKey, "q=william&rental=flexible");

const invalidInitial = initialState("es", {
  rental: "invalid",
  min: "abc",
  max: "-1",
  sort: "invalid",
  utm_source: "qa",
});
assert.deepEqual(invalidInitial.filters, DEFAULT_CATALOG_FILTERS);
assert.equal(invalidInitial.results.length, 36);
assert.equal(invalidInitial.canonicalQueryKey, "utm_source=qa");
const invalidCanonical = createCatalogInitialState(
  es,
  "es",
  new URLSearchParams(invalidInitial.canonicalQueryKey),
);
assert.equal(
  invalidCanonical.canonicalQueryKey,
  invalidInitial.canonicalQueryKey,
  "Canonical query state must be idempotent",
);

const unknownInitial = initialState("es", {
  utm_source: "qa",
  utm_campaign: "direct",
});
assert.deepEqual(unknownInitial.filters, DEFAULT_CATALOG_FILTERS);
assert.equal(unknownInitial.results.length, 36);
assert.equal(
  unknownInitial.canonicalQueryKey,
  "utm_source=qa&utm_campaign=direct",
);
assert.equal(
  createCatalogInitialState(
    es,
    "es",
    new URLSearchParams(unknownInitial.canonicalQueryKey),
  ).canonicalQueryKey,
  unknownInitial.canonicalQueryKey,
);

const unavailableRentalInitial = initialState("es", {
  rental: "60-days",
  utm_source: "qa",
});
assert.equal(unavailableRentalInitial.filters.rental, "all");
assert.equal(unavailableRentalInitial.results.length, 36);
assert.equal(unavailableRentalInitial.canonicalQueryKey, "utm_source=qa");
assert.equal(
  createCatalogInitialState(
    es,
    "es",
    new URLSearchParams(unavailableRentalInitial.canonicalQueryKey),
  ).canonicalQueryKey,
  unavailableRentalInitial.canonicalQueryKey,
);

const repeatedInitial = initialState("es", {
  q: ["  william  ", "ignored"],
  rental: ["90-days", "flexible"],
  utm_term: ["one", "two"],
  omitted: undefined,
});
assert.equal(repeatedInitial.filters.q, "william");
assert.equal(repeatedInitial.filters.rental, "90-days");
assert.equal(repeatedInitial.results.length, 1);
assert.equal(repeatedInitial.results[0]?.slug, "/proyectos/the-william");
assert.equal(
  repeatedInitial.canonicalQueryKey,
  "q=william&rental=90-days&utm_term=one&utm_term=two",
);
assert.equal(
  createCatalogInitialState(
    es,
    "es",
    new URLSearchParams(repeatedInitial.canonicalQueryKey),
  ).canonicalQueryKey,
  repeatedInitial.canonicalQueryKey,
);

console.log("Catalog foundation passed: 36 ES + 36 EN lightweight models, search, URL, range and sorting contracts.");
