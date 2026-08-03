import type { Page } from "@playwright/test";
import { E2E_BASE_URL, expect, test } from "./fixtures";

async function fillValidContact(page: Page) {
  const form = page.getByRole("form", { name: "Contame qué estás buscando" });
  await form.getByRole("textbox", { name: "Nombre" }).fill("Persona E2E");
  await form.getByRole("textbox", { name: "Email" }).fill("contacto.e2e@example.com");

  const country = form.getByRole("button", { name: "Seleccionar país" });
  await country.click();
  await page.getByRole("combobox", { name: "Buscar país..." }).fill("US");
  const unitedStates = page.getByRole("option").filter({ hasText: "+1" });
  await expect(unitedStates).toHaveCount(1);
  await unitedStates.click();
  await expect(country).toContainText("+1");
  await expect(country).not.toContainText("Internacional");

  await form
    .getByRole("textbox", { name: "Teléfono o WhatsApp" })
    .fill("+12025550123");
  await form
    .getByRole("textbox", { name: "¿Qué estás buscando?" })
    .fill("Consulta ficticia para validar el recorrido E2E.");

  return form;
}

test("rejects an invalid phone before any Contact API request", async ({
  page,
  contactApi,
}) => {
  const response = await page.goto("/es/contacto");
  expect(response?.status()).toBe(200);

  const form = page.getByRole("form", { name: "Contame qué estás buscando" });
  await form.getByRole("textbox", { name: "Nombre" }).fill("Persona E2E");
  await form.getByRole("textbox", { name: "Email" }).fill("contacto.e2e@example.com");
  await form.getByRole("textbox", { name: "Teléfono o WhatsApp" }).fill("12345");
  await form
    .getByRole("textbox", { name: "¿Qué estás buscando?" })
    .fill("Consulta ficticia para validar el recorrido E2E.");
  await form.getByRole("button", { name: "Enviar consulta" }).click();

  await expect(form.getByRole("alert")).toHaveText(
    "Por favor, ingresá un número de teléfono válido.",
  );
  await expect(form.getByRole("textbox", { name: "Teléfono o WhatsApp" })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(contactApi.posts).toHaveLength(0);
  await expect(page).toHaveURL(`${E2E_BASE_URL}/es/contacto`);
});

test("submits once to a controlled success mock and reaches localized Gracias", async ({
  page,
  contactApi,
}) => {
  contactApi.useDeferredSuccess();
  const response = await page.goto("/es/contacto");
  expect(response?.status()).toBe(200);
  const form = await fillValidContact(page);

  await form.getByRole("button", { name: "Enviar consulta" }).click();
  await contactApi.waitForRequest();
  await expect(form.getByRole("button", { name: "Enviando..." })).toBeDisabled();
  await expect(form.getByRole("button", { name: "Enviando..." })).toHaveAttribute(
    "aria-busy",
    "true",
  );

  expect(contactApi.posts).toHaveLength(1);
  expect(contactApi.posts[0].headers["content-type"]).toContain("application/json");
  expect(contactApi.posts[0].payload).toEqual({
    nombre: "Persona E2E",
    email: "contacto.e2e@example.com",
    mensaje: "Consulta ficticia para validar el recorrido E2E.",
    telefonoE164: "+12025550123",
    country: "US",
    company: "",
  });

  contactApi.releaseResponse();
  await expect(
    page.getByRole("status").filter({
      hasText: "Consulta enviada. Me pondré en contacto con vos.",
    }),
  ).toHaveText(
    "Consulta enviada. Me pondré en contacto con vos.",
  );
  await expect(page).toHaveURL(`${E2E_BASE_URL}/es/gracias`, { timeout: 5_000 });
  await expect(
    page.getByRole("heading", { level: 1, name: "¡Gracias por contactarnos!" }),
  ).toBeVisible();
});

test("shows the localized rate-limit response without leaving Contacto", async ({
  page,
  contactApi,
  network,
}) => {
  contactApi.useRateLimit();
  network.allowExpectedConsoleStatus(429);
  const response = await page.goto("/es/contacto");
  expect(response?.status()).toBe(200);
  const form = await fillValidContact(page);

  await form.getByRole("button", { name: "Enviar consulta" }).click();
  await expect(
    page.getByRole("alert").filter({
      hasText: "Demasiados intentos. Probá de nuevo en unos minutos.",
    }),
  ).toHaveText(
    "Demasiados intentos. Probá de nuevo en unos minutos.",
  );

  expect(contactApi.posts).toHaveLength(1);
  await expect(form.getByRole("button", { name: "Enviar consulta" })).toBeEnabled();
  await expect(page).toHaveURL(`${E2E_BASE_URL}/es/contacto`);
});
