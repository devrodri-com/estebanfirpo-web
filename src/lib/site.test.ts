import { describe, expect, it } from "vitest";
import { createWhatsAppUrl, WHATSAPP_NUMBER } from "./site";

describe("createWhatsAppUrl", () => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;

  it("uses the public number without an empty query", () => {
    expect(createWhatsAppUrl()).toBe(base);
    expect(createWhatsAppUrl("")).toBe(base);
  });

  it("encodes spaces, signs and percent exactly once", () => {
    const message = "Hello + 50%";
    const url = createWhatsAppUrl(message);

    expect(url).toBe(`${base}?text=Hello%20%2B%2050%25`);
    expect(new URL(url).searchParams.get("text")).toBe(message);
  });

  it("round-trips Unicode content", () => {
    const message = "¡Hola, Esteban! ¿Miami?";

    expect(new URL(createWhatsAppUrl(message)).searchParams.get("text")).toBe(
      message,
    );
  });
});
