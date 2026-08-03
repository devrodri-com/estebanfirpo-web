// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactContent } from "@/content/contact";
import { ContactForm } from "./ContactForm";

const testMocks = vi.hoisted(() => ({
  fetch: vi.fn(),
  routerPush: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: testMocks.routerPush }),
}));

const formCopy = {
  es: {
    eyebrow: "Tu consulta",
    title: "Contame qué estás buscando",
    copy: "Compartí tus datos para que pueda entender tu consulta.",
    fields: {
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Email", placeholder: "tu@email.com" },
      phone: {
        label: "Teléfono o WhatsApp",
        placeholder: "Número de teléfono",
        internationalPlaceholder: "+ Código de país + número",
      },
      message: {
        label: "¿Qué estás buscando?",
        placeholder: "Objetivo, presupuesto y zona.",
      },
    },
    submit: "Enviar consulta",
    submitting: "Enviando...",
    phoneInvalid: "Por favor, ingresá un número de teléfono válido.",
    sendError: "No se pudo enviar la consulta. Probá nuevamente.",
    rateLimited: "Demasiados intentos. Probá de nuevo en unos minutos.",
    success: "Consulta enviada. Me pondré en contacto con vos.",
    closeNotice: "Cerrar notificación",
  },
  en: {
    eyebrow: "Your inquiry",
    title: "Tell me what you are looking for",
    copy: "Share your details so I can understand your inquiry.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@email.com" },
      phone: {
        label: "Phone or WhatsApp",
        placeholder: "Phone number",
        internationalPlaceholder: "+ Country code + number",
      },
      message: {
        label: "What are you looking for?",
        placeholder: "Your goals, budget, and preferred area.",
      },
    },
    submit: "Send inquiry",
    submitting: "Sending...",
    phoneInvalid: "Please enter a valid phone number.",
    sendError: "The inquiry could not be sent. Please try again.",
    rateLimited: "Too many attempts. Please try again in a few minutes.",
    success: "Inquiry sent. I’ll be in touch.",
    closeNotice: "Close notification",
  },
} satisfies Record<"es" | "en", ContactContent["form"]>;

const countryCopy = {
  es: {
    selectCountry: "Seleccionar país",
    international: "Internacional",
    manualEntry: "Ingreso manual",
    search: "Buscar país...",
    noResults: "No se encontraron países",
  },
  en: {
    selectCountry: "Select country",
    international: "International",
    manualEntry: "Manual entry",
    search: "Search country...",
    noResults: "No countries found",
  },
} satisfies Record<"es" | "en", ContactContent["countrySelector"]>;

const validLead = {
  name: "Casey Example",
  email: "casey@example.com",
  phone: "+12025550123",
  message: "I am testing a fictional Miami inquiry.",
};

function makeResponse(status: number, body: string): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: vi.fn().mockResolvedValue(body),
  } as unknown as Response;
}

function renderForm(locale: "es" | "en" = "es") {
  return render(
    <ContactForm locale={locale} copy={formCopy[locale]} countryCopy={countryCopy[locale]} />,
  );
}

async function fillRequiredFields(
  user: ReturnType<typeof userEvent.setup>,
  locale: "es" | "en" = "es",
  phone = validLead.phone,
) {
  const copy = formCopy[locale];
  await user.type(screen.getByLabelText(copy.fields.name.label), validLead.name);
  await user.type(screen.getByLabelText(copy.fields.email.label), validLead.email);
  await user.type(screen.getByLabelText(copy.fields.phone.label), phone);
  await user.type(screen.getByLabelText(copy.fields.message.label), validLead.message);
}

beforeEach(() => {
  testMocks.fetch.mockReset();
  testMocks.routerPush.mockReset();
  vi.stubGlobal("fetch", testMocks.fetch);
  window.history.replaceState({}, "", "/es/contacto");
  window.sessionStorage.clear();
  delete window.gtag;
});

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  delete window.gtag;
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ContactForm", () => {
  it("renders the Spanish form with associated fields and current constraints", () => {
    const { container } = renderForm("es");

    expect(screen.getByRole("heading", { level: 2, name: formCopy.es.title })).toBeTruthy();

    const name = screen.getByLabelText("Nombre") as HTMLInputElement;
    const email = screen.getByLabelText("Email") as HTMLInputElement;
    const phone = screen.getByLabelText("Teléfono o WhatsApp") as HTMLInputElement;
    const message = screen.getByLabelText("¿Qué estás buscando?") as HTMLTextAreaElement;

    expect(name.type).toBe("text");
    expect(name.autocomplete).toBe("name");
    expect(name.required).toBe(true);
    expect(name.maxLength).toBe(100);
    expect(email.type).toBe("email");
    expect(email.autocomplete).toBe("email");
    expect(email.required).toBe(true);
    expect(email.maxLength).toBe(254);
    expect(phone.type).toBe("tel");
    expect(phone.autocomplete).toBe("tel");
    expect(message.required).toBe(true);
    expect(message.maxLength).toBe(4000);
    expect(screen.getByRole("button", { name: "Enviar consulta" })).toBeTruthy();
    expect(screen.queryByRole("status")).toBeNull();

    const honeypot = container.querySelector<HTMLInputElement>('input[name="company"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot?.maxLength).toBe(200);
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.queryByRole("textbox", { name: /company/i })).toBeNull();
  });

  it("renders the public labels and submit action in English", () => {
    renderForm("en");

    expect(screen.getByRole("heading", { level: 2, name: formCopy.en.title })).toBeTruthy();
    expect(screen.getByLabelText("Name")).toBeTruthy();
    expect(screen.getByLabelText("Email")).toBeTruthy();
    expect(screen.getByLabelText("Phone or WhatsApp")).toBeTruthy();
    expect(screen.getByLabelText("What are you looking for?")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Send inquiry" })).toBeTruthy();
  });

  it("blocks an invalid phone number with a localized accessible error", async () => {
    const user = userEvent.setup();
    renderForm("es");

    await fillRequiredFields(user, "es", "12345");
    await user.click(screen.getByRole("button", { name: "Enviar consulta" }));

    const phone = screen.getByLabelText("Teléfono o WhatsApp");
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain(formCopy.es.phoneInvalid);
    expect(phone.getAttribute("aria-invalid")).toBe("true");
    expect(phone.getAttribute("aria-describedby")).toBe("contact-phone-error");
    expect(alert.id).toBe("contact-phone-error");
    expect(testMocks.fetch).not.toHaveBeenCalled();
    expect((screen.getByRole("button", { name: "Enviar consulta" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("posts the normalized phone, country, UTMs, and honeypot to the current endpoint", async () => {
    window.history.replaceState(
      {},
      "",
      "/es/contacto?utm_source=%20newsletter%20&utm_medium=email&utm_campaign=summer&utm_content=hero&utm_term=miami",
    );
    testMocks.fetch.mockResolvedValue(makeResponse(500, JSON.stringify({ ok: false, error: "send_failed" })));
    const user = userEvent.setup();
    const { container } = renderForm("es");

    await fillRequiredFields(user);
    const honeypot = container.querySelector<HTMLInputElement>('input[name="company"]');
    expect(honeypot).not.toBeNull();
    fireEvent.change(honeypot as HTMLInputElement, { target: { value: "bot-company" } });
    await user.click(screen.getByRole("button", { name: "Enviar consulta" }));

    await waitFor(() => expect(testMocks.fetch).toHaveBeenCalledTimes(1));
    const [endpoint, init] = testMocks.fetch.mock.calls[0] as [string, RequestInit];
    expect(endpoint).toBe("/api/contact");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(String(init.body))).toEqual({
      nombre: validLead.name,
      email: validLead.email,
      mensaje: validLead.message,
      telefonoE164: validLead.phone,
      country: "US",
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "summer",
      utm_content: "hero",
      utm_term: "miami",
      company: "bot-company",
    });
    expect(window.sessionStorage.getItem("lead_utms")).toBe(
      JSON.stringify({
        utm_source: "newsletter",
        utm_medium: "email",
        utm_campaign: "summer",
        utm_content: "hero",
        utm_term: "miami",
      }),
    );
  });

  it("keeps a pending submission accessible and prevents a second request", async () => {
    let resolveRequest: (response: Response) => void = () => undefined;
    testMocks.fetch.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveRequest = resolve;
      }),
    );
    const user = userEvent.setup();
    renderForm("es");
    await fillRequiredFields(user);

    const submit = screen.getByRole("button", { name: "Enviar consulta" }) as HTMLButtonElement;
    await user.click(submit);
    expect(testMocks.fetch).toHaveBeenCalledTimes(1);

    const pendingSubmit = screen.getByRole("button", { name: "Enviando..." }) as HTMLButtonElement;
    expect(pendingSubmit.disabled).toBe(true);
    expect(pendingSubmit.getAttribute("aria-busy")).toBe("true");
    await user.click(pendingSubmit);
    expect(testMocks.fetch).toHaveBeenCalledTimes(1);

    resolveRequest(makeResponse(500, JSON.stringify({ ok: false, error: "send_failed" })));
    await screen.findByText(formCopy.es.sendError);
  });

  it("announces success, sends PII-free analytics, and redirects after the controlled delay", async () => {
    window.history.replaceState(
      {},
      "",
      "/es/contacto?utm_source=search&utm_medium=cpc&utm_campaign=miami",
    );
    testMocks.fetch.mockResolvedValue(makeResponse(200, JSON.stringify({ ok: true })));
    const gtag = vi.fn();
    window.gtag = gtag;
    const user = userEvent.setup();
    renderForm("es");
    await fillRequiredFields(user);

    vi.useFakeTimers();
    await act(async () => {
      fireEvent.submit(screen.getByRole("form", { name: formCopy.es.title }));
      await Promise.resolve();
      await Promise.resolve();
    });

    const status = screen.getByRole("status");
    expect(status.textContent).toContain(formCopy.es.success);
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      event_category: "form",
      event_label: "contacto",
      locale: "es",
      has_phone: "true",
      phone_country: "US",
      utm_source: "search",
      utm_medium: "cpc",
      utm_campaign: "miami",
    });

    const analyticsPayload = JSON.stringify(gtag.mock.calls[0]);
    for (const pii of [validLead.name, validLead.email, validLead.phone, validLead.message]) {
      expect(analyticsPayload).not.toContain(pii);
    }
    expect(testMocks.routerPush).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1200));
    expect(testMocks.routerPush).toHaveBeenCalledWith("/es/gracias");
  });

  it("uses the localized English success message and redirect", async () => {
    testMocks.fetch.mockResolvedValue(makeResponse(200, JSON.stringify({ ok: true })));
    const user = userEvent.setup();
    renderForm("en");
    await fillRequiredFields(user, "en");

    vi.useFakeTimers();
    await act(async () => {
      fireEvent.submit(screen.getByRole("form", { name: formCopy.en.title }));
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByRole("status").textContent).toContain(formCopy.en.success);
    act(() => vi.advanceTimersByTime(1200));
    expect(testMocks.routerPush).toHaveBeenCalledWith("/en/gracias");
  });

  it("shows the specific rate-limit notice and leaves the form recoverable", async () => {
    testMocks.fetch.mockResolvedValue(
      makeResponse(429, JSON.stringify({ ok: false, error: "rate_limited" })),
    );
    const gtag = vi.fn();
    window.gtag = gtag;
    const user = userEvent.setup();
    renderForm("es");
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Enviar consulta" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain(formCopy.es.rateLimited);
    expect(alert.getAttribute("aria-live")).toBe("assertive");
    expect((screen.getByRole("button", { name: "Enviar consulta" }) as HTMLButtonElement).disabled).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
    expect(testMocks.routerPush).not.toHaveBeenCalled();
  });

  it.each([
    ["HTTP 500", () => Promise.resolve(makeResponse(500, JSON.stringify({ ok: false, error: "send_failed" })))],
    ["a non-JSON response", () => Promise.resolve(makeResponse(200, "upstream unavailable"))],
    ["an unexpected JSON response", () => Promise.resolve(makeResponse(200, JSON.stringify({ status: "ok" })))],
    ["a rejected request", () => Promise.reject(new Error("network unavailable"))],
  ])("recovers with the generic localized error after %s", async (_scenario, responseFactory) => {
    testMocks.fetch.mockImplementationOnce(() => responseFactory());
    const gtag = vi.fn();
    window.gtag = gtag;
    const user = userEvent.setup();
    renderForm("es");
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Enviar consulta" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain(formCopy.es.sendError);
    expect((screen.getByRole("button", { name: "Enviar consulta" }) as HTMLButtonElement).disabled).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
    expect(testMocks.routerPush).not.toHaveBeenCalled();
  });
});
