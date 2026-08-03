import type { Page } from "@playwright/test";
import { E2E_BASE_URL, NetworkHarness, expect, test } from "./fixtures";

const filteredCatalogUrl =
  "/es/proyectos?q=william&rental=90-days&min=300000&max=600000&sort=price-asc";

function catalogCards(page: Page) {
  return page.locator("main article");
}

async function expectDirectFilterState(page: Page) {
  const filters = page.getByRole("complementary", { name: "Filtros" });
  await expect(filters.getByRole("searchbox", { name: "Buscar proyectos" })).toHaveValue(
    "william",
  );
  await expect(filters.getByRole("combobox", { name: /Política de renta/ })).toContainText(
    "Mínimo 90 días",
  );
  await expect(filters.getByRole("textbox", { name: "Precio mínimo" })).toHaveValue("300");
  await expect(filters.getByRole("textbox", { name: "Precio máximo" })).toHaveValue("600");
  await expect(filters.getByRole("combobox", { name: /Ordenar por/ })).toContainText(
    "Precio más bajo",
  );

  const chips = page.getByLabel("Filtros activos");
  await expect(chips.getByRole("button")).toHaveCount(5);
  await expect(
    chips.getByRole("button", { name: "Quitar filtro: Búsqueda: “william”" }),
  ).toBeVisible();
  await expect(
    chips.getByRole("button", { name: "Quitar filtro: Mínimo 90 días" }),
  ).toBeVisible();
  await expect(chips.getByRole("button", { name: /Quitar filtro: Mínimo:.*300\.000/ })).toBeVisible();
  await expect(chips.getByRole("button", { name: /Quitar filtro: Máximo:.*600\.000/ })).toBeVisible();
  await expect(
    chips.getByRole("button", { name: "Quitar filtro: Precio más bajo" }),
  ).toBeVisible();
}

test("renders a direct filtered URL before hydration and preserves it through detail Back", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = window as Window & { __catalogArticleCounts?: number[] };
    state.__catalogArticleCounts = [];

    const record = () => {
      const main = document.querySelector("main");
      if (main) state.__catalogArticleCounts?.push(main.querySelectorAll("article").length);
    };
    new MutationObserver(record).observe(document, { childList: true, subtree: true });
    record();
  });

  const response = await page.goto(filteredCatalogUrl);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(`${E2E_BASE_URL}${filteredCatalogUrl}`);
  await expect(catalogCards(page)).toHaveCount(1);
  await expect(page.getByText("1 proyecto", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "The William Residences" }),
  ).toBeVisible();
  await expectDirectFilterState(page);

  const observedCounts = await page.evaluate(
    () => (window as Window & { __catalogArticleCounts?: number[] }).__catalogArticleCounts ?? [],
  );
  expect(observedCounts.length).toBeGreaterThan(0);
  expect(Math.max(...observedCounts)).toBe(1);

  await page
    .getByRole("link", { name: "Ver más detalles: The William Residences" })
    .click();
  await expect(page).toHaveURL(`${E2E_BASE_URL}/es/proyectos/the-william`);
  await expect(
    page.getByRole("heading", { level: 1, name: "The William Residences" }),
  ).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(`${E2E_BASE_URL}${filteredCatalogUrl}`);
  await expect(catalogCards(page)).toHaveCount(1);
  await expectDirectFilterState(page);
});

test("keeps filters, unknown query params, browser history, and reset coherent", async ({
  page,
}) => {
  const response = await page.goto("/es/proyectos?utm_source=e2e");
  expect(response?.status()).toBe(200);
  await expect(catalogCards(page)).toHaveCount(36);

  const filters = page.getByRole("complementary", { name: "Filtros" });
  await filters.getByRole("searchbox", { name: "Buscar proyectos" }).fill("william");
  await expect.poll(() => new URL(page.url()).searchParams.get("q")).toBe("william");
  expect(new URL(page.url()).searchParams.get("utm_source")).toBe("e2e");
  await expect(catalogCards(page)).toHaveCount(1);
  let chips = page.getByLabel("Filtros activos");
  await expect(chips.getByRole("button")).toHaveCount(1);
  await expect(
    chips.getByRole("button", { name: "Quitar filtro: Búsqueda: “william”" }),
  ).toBeVisible();

  await filters.getByRole("combobox", { name: /^Política de renta/ }).click();
  await page.getByRole("option", { name: /^Mínimo 90 días/ }).click();
  await expect.poll(() => new URL(page.url()).searchParams.get("rental")).toBe("90-days");
  expect(new URL(page.url()).searchParams.get("utm_source")).toBe("e2e");
  await expect(catalogCards(page)).toHaveCount(1);
  chips = page.getByLabel("Filtros activos");
  await expect(chips.getByRole("button")).toHaveCount(2);
  await expect(
    chips.getByRole("button", { name: "Quitar filtro: Mínimo 90 días" }),
  ).toBeVisible();

  await page.goBack();
  await expect.poll(() => new URL(page.url()).searchParams.get("rental")).toBeNull();
  expect(new URL(page.url()).searchParams.get("q")).toBe("william");
  await expect(catalogCards(page)).toHaveCount(1);
  await expect(filters.getByRole("searchbox", { name: "Buscar proyectos" })).toHaveValue(
    "william",
  );
  await expect(filters.getByRole("combobox", { name: /Política de renta/ })).toContainText(
    "Todas",
  );
  chips = page.getByLabel("Filtros activos");
  await expect(chips.getByRole("button")).toHaveCount(1);

  await page.goForward();
  await expect.poll(() => new URL(page.url()).searchParams.get("rental")).toBe("90-days");
  await expect(catalogCards(page)).toHaveCount(1);
  await expect(filters.getByRole("combobox", { name: /Política de renta/ })).toContainText(
    "Mínimo 90 días",
  );
  chips = page.getByLabel("Filtros activos");
  await expect(chips.getByRole("button")).toHaveCount(2);

  await filters.getByRole("button", { name: "Limpiar filtros" }).click();
  await expect(catalogCards(page)).toHaveCount(36);
  await expect.poll(() => new URL(page.url()).search).toBe("?utm_source=e2e");
  await expect(filters.getByRole("searchbox", { name: "Buscar proyectos" })).toHaveValue("");
  await expect(filters.getByRole("combobox", { name: /Política de renta/ })).toContainText(
    "Todas",
  );
  await expect(page.getByLabel("Filtros activos")).toHaveCount(0);
});

test("keeps direct filtered content and its detail link usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    baseURL: E2E_BASE_URL,
    javaScriptEnabled: false,
    serviceWorkers: "block",
  });
  const network = new NetworkHarness({ javaScriptDisabled: true });
  await network.install(context);

  try {
    const page = await context.newPage();
    const response = await page.goto(filteredCatalogUrl);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(
      page.getByRole("heading", { level: 1, name: "Proyectos inmobiliarios en Miami" }),
    ).toBeVisible();
    await expect(catalogCards(page)).toHaveCount(1);
    await expect(
      page.getByRole("heading", { level: 2, name: "The William Residences" }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: "Ver más detalles: The William Residences" })
      .click();
    await expect(page).toHaveURL(`${E2E_BASE_URL}/es/proyectos/the-william`);
    await expect(
      page.getByRole("heading", { level: 1, name: "The William Residences" }),
    ).toBeVisible();
    await page.waitForLoadState("networkidle");
  } finally {
    await context.close();
    network.assertClean();
  }
});
