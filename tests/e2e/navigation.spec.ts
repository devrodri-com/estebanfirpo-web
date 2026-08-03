import { E2E_BASE_URL, expect, test } from "./fixtures";

test("switches locale while preserving the current public route", async ({ page }) => {
  const response = await page.goto("/es/sobre-mi");
  expect(response?.status()).toBe(200);

  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Experiencia empresarial para decidir mejor en Miami",
    }),
  ).toBeVisible();

  const spanishNavigation = page.getByRole("navigation", {
    name: "Navegación principal",
  });
  await spanishNavigation.getByRole("link", { name: "Cambiar a inglés" }).click();

  await expect(page).toHaveURL(`${E2E_BASE_URL}/en/sobre-mi`);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Business experience for better real estate decisions in Miami",
    }),
  ).toBeVisible();

  const englishNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  await englishNavigation.getByRole("link", { name: "Switch to Spanish" }).click();
  await expect(page).toHaveURL(`${E2E_BASE_URL}/es/sobre-mi`);
});

test("keeps the mobile menu keyboard-safe at 390 by 844", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto("/es");
  expect(response?.status()).toBe(200);

  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Navegación mobile" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Cómo te ayudo" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Financiación" })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Contacto" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");

  await trigger.click();
  await page
    .getByRole("dialog", { name: "Navegación mobile" })
    .getByRole("link", { name: "Contacto" })
    .click();

  await expect(page).toHaveURL(`${E2E_BASE_URL}/es/contacto`);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Hablemos de tu próximo paso en Miami",
    }),
  ).toBeVisible();
});
