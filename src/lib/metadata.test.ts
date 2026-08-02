import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getLocale,
  localizedAlternates,
  localizedPath,
} from "./metadata";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("metadata URL helpers", () => {
  it("uses the default locale for unsupported values", () => {
    expect(getLocale("es")).toBe("es");
    expect(getLocale("en")).toBe("en");
    expect(getLocale("pt")).toBe("es");
  });

  it.each([
    ["", "/en"],
    ["/", "/en"],
    ["contacto", "/en/contacto"],
    ["/contacto/", "/en/contacto"],
  ])("localizes %j as %j", (path, expected) => {
    expect(localizedPath("en", path)).toBe(expected);
  });

  it("builds canonical, ES, EN and x-default alternates", () => {
    expect(localizedAlternates("es", "/proyectos/")?.canonical).toBe(
      "/es/proyectos",
    );
    expect(localizedAlternates("en", "/proyectos/")).toEqual({
      canonical: "/en/proyectos",
      languages: {
        es: "/es/proyectos",
        en: "/en/proyectos",
        "x-default": "/es/proyectos",
      },
    });
  });

  it.each(["", "not a valid URL"])(
    "falls back to the public www origin for %j configuration",
    async (configuredUrl) => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", configuredUrl);
      vi.resetModules();

      const { absoluteUrl, SITE_URL } = await import("./metadata");

      expect(SITE_URL.origin).toBe("https://www.estebanfirpo.com");
      expect(absoluteUrl("/opengraph-image.jpg")).toBe(
        "https://www.estebanfirpo.com/opengraph-image.jpg",
      );
    },
  );
});
