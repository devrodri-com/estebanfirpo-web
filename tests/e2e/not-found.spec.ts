import { E2E_BASE_URL, expect, test } from "./fixtures";

test("returns localized 404 content and a local recovery link", async ({ page, network }) => {
  network.allowIntentionalNotFound();
  const cases = [
    {
      path: "/es/ruta-inexistente-e2e",
      locale: "es",
      heading: "Página no encontrada",
      recovery: "Volver al inicio",
    },
    {
      path: "/en/missing-e2e",
      locale: "en",
      heading: "Page not found",
      recovery: "Back to home",
    },
  ] as const;

  for (const scenario of cases) {
    const response = await page.goto(scenario.path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", scenario.locale);
    await expect(
      page.getByRole("heading", { level: 1, name: scenario.heading }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: scenario.recovery })).toHaveAttribute(
      "href",
      `/${scenario.locale}`,
    );
    const robots = page.locator('meta[name="robots"]');
    expect(await robots.count()).toBeGreaterThan(0);
    for (let index = 0; index < (await robots.count()); index += 1) {
      await expect(robots.nth(index)).toHaveAttribute("content", /noindex/i);
    }
    await expect(page).toHaveURL(`${E2E_BASE_URL}${scenario.path}`);
  }
});
