import {
  expect,
  test as base,
  type BrowserContext,
  type Page,
  type Route,
} from "@playwright/test";

export const E2E_BASE_URL = "http://127.0.0.1:3137";
const E2E_ORIGIN = new URL(E2E_BASE_URL).origin;
const TRANSPARENT_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAF/gL+Xw4AAAAASUVORK5CYII=",
  "base64",
);

type ContactMode = "deny" | "success" | "deferred-success" | "rate-limit";

type ContactPost = {
  headers: Record<string, string>;
  payload: unknown;
};

export class ContactApiMock {
  readonly posts: ContactPost[] = [];
  private mode: ContactMode = "deny";
  private requestSeen: (() => void) | null = null;
  private responseRelease: (() => void) | null = null;

  useSuccess() {
    this.mode = "success";
  }

  useDeferredSuccess() {
    this.mode = "deferred-success";
  }

  useRateLimit() {
    this.mode = "rate-limit";
  }

  async waitForRequest() {
    if (this.posts.length > 0) return;
    await new Promise<void>((resolve) => {
      this.requestSeen = resolve;
    });
  }

  releaseResponse() {
    if (!this.responseRelease) {
      throw new Error("No deferred Contact API response is waiting");
    }
    this.responseRelease();
    this.responseRelease = null;
  }

  dispose() {
    this.responseRelease?.();
    this.responseRelease = null;
    this.requestSeen?.();
    this.requestSeen = null;
  }

  async handle(route: Route) {
    if (this.mode === "deny") {
      throw new Error("Unexpected real Contact API attempt: no response mock was configured");
    }

    const request = route.request();
    let payload: unknown;
    try {
      payload = request.postDataJSON();
    } catch {
      payload = request.postData();
    }
    this.posts.push({ headers: request.headers(), payload });
    this.requestSeen?.();
    this.requestSeen = null;

    if (this.mode === "deferred-success") {
      await new Promise<void>((resolve) => {
        this.responseRelease = resolve;
      });
    }

    if (this.mode === "rate-limit") {
      await route.fulfill({
        status: 429,
        contentType: "application/json; charset=utf-8",
        headers: { "cache-control": "no-store" },
        body: JSON.stringify({ ok: false, error: "rate_limited" }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({ ok: true }),
    });
  }
}

export class NetworkHarness {
  readonly contactApi = new ContactApiMock();
  readonly stubbedExternalRequests: string[] = [];
  readonly expectedBrowserCancellations: string[] = [];
  private readonly violations: string[] = [];
  private intentionalNotFound = false;
  private readonly expectedConsoleStatuses = new Set<number>();

  constructor(private readonly options: { javaScriptDisabled?: boolean } = {}) {}

  allowIntentionalNotFound() {
    this.intentionalNotFound = true;
  }

  allowExpectedConsoleStatus(status: number) {
    this.expectedConsoleStatuses.add(status);
  }

  async install(context: BrowserContext) {
    context.on("page", (page) => this.watchPage(page));
    for (const page of context.pages()) this.watchPage(page);

    await context.route("**/*", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const method = request.method();

      if (url.origin === E2E_ORIGIN) {
        if (url.pathname === "/_next/image") {
          await route.fulfill({
            status: 200,
            contentType: "image/png",
            headers: { "cache-control": "public, max-age=3600" },
            body: TRANSPARENT_PNG,
          });
          return;
        }

        if (url.pathname === "/api/contact") {
          if (method !== "POST") {
            this.violations.push(`Unexpected Contact API method: ${method}`);
            await route.abort("blockedbyclient");
            return;
          }
          try {
            await this.contactApi.handle(route);
          } catch (error) {
            this.violations.push(error instanceof Error ? error.message : String(error));
            await route.abort("blockedbyclient");
          }
          return;
        }

        if (["GET", "HEAD", "OPTIONS"].includes(method)) {
          await route.continue();
          return;
        }

        this.violations.push(`Unexpected same-origin mutation: ${method} ${url.pathname}`);
        await route.abort("blockedbyclient");
        return;
      }

      if (url.hostname === "www.googletagmanager.com" && url.pathname === "/gtag/js") {
        this.stubbedExternalRequests.push(`${url.hostname}${url.pathname}`);
        await route.fulfill({
          status: 200,
          contentType: "application/javascript; charset=utf-8",
          body: "/* Playwright: GTM intentionally stubbed. */",
        });
        return;
      }

      if (url.hostname === "ik.imagekit.io") {
        this.stubbedExternalRequests.push(url.hostname);
        await route.fulfill({ status: 200, contentType: "image/png", body: TRANSPARENT_PNG });
        return;
      }

      if (
        url.hostname === "www.google.com" &&
        url.pathname.startsWith("/maps") &&
        request.resourceType() === "document" &&
        request.frame() !== request.frame().page().mainFrame()
      ) {
        this.stubbedExternalRequests.push(`${url.hostname}/maps`);
        await route.fulfill({
          status: 200,
          contentType: "text/html; charset=utf-8",
          body: "<!doctype html><html><body>Map stub</body></html>",
        });
        return;
      }

      if (
        [
          "www.google-analytics.com",
          "region1.google-analytics.com",
          "analytics.google.com",
          "stats.g.doubleclick.net",
        ].includes(url.hostname)
      ) {
        this.stubbedExternalRequests.push(url.hostname);
        await route.fulfill({ status: 204, body: "" });
        return;
      }

      this.violations.push(`Blocked unknown external request: ${method} ${url.origin}${url.pathname}`);
      await route.abort("blockedbyclient");
    });
  }

  assertClean() {
    expect(this.violations, this.violations.join("\n")).toEqual([]);
  }

  private watchPage(page: Page) {
    page.on("pageerror", (error) => {
      this.violations.push(`Page error: ${error.message}`);
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        if (
          this.intentionalNotFound &&
          message.text().includes("Failed to load resource") &&
          message.text().includes("404")
        ) {
          this.expectedBrowserCancellations.push(`Expected 404 console: ${message.text()}`);
          return;
        }
        const expectedStatus = [...this.expectedConsoleStatuses].find((status) =>
          message.text().includes(`status of ${status}`),
        );
        if (expectedStatus) {
          this.expectedBrowserCancellations.push(
            `Expected HTTP ${expectedStatus} console: ${message.text()}`,
          );
          return;
        }
        this.violations.push(`Console error: ${message.text()}`);
      }
    });
    page.on("websocket", (socket) => {
      this.violations.push(`Unexpected WebSocket: ${socket.url()}`);
    });
    page.on("requestfailed", (request) => {
      const url = new URL(request.url());
      if (url.origin === E2E_ORIGIN) {
        const errorText = request.failure()?.errorText ?? "unknown";
        if (
          errorText === "net::ERR_ABORTED" &&
          request.method() === "GET" &&
          request.resourceType() === "fetch" &&
          /^\/(es|en)\/proyectos$/.test(url.pathname)
        ) {
          this.expectedBrowserCancellations.push(
            `Cancelled Next prefetch: ${request.method()} ${url.pathname}`,
          );
          return;
        }
        if (
          this.options.javaScriptDisabled &&
          errorText === "csp" &&
          request.resourceType() === "script" &&
          url.pathname.startsWith("/_next/static/chunks/")
        ) {
          this.expectedBrowserCancellations.push(`JavaScript disabled: ${url.pathname}`);
          return;
        }
        this.violations.push(
          `Failed same-origin request: ${request.method()} ${url.pathname} (${errorText})`,
        );
      }
    });
    page.on("response", (response) => {
      const url = new URL(response.url());
      if (url.origin === E2E_ORIGIN && response.status() >= 500) {
        this.violations.push(`Same-origin HTTP ${response.status()}: ${url.pathname}`);
      }
    });
  }
}

type E2EFixtures = {
  network: NetworkHarness;
  contactApi: ContactApiMock;
};

export const test = base.extend<E2EFixtures>({
  network: [
    async ({ context }, provide) => {
      const network = new NetworkHarness();
      await network.install(context);
      try {
        await provide(network);
      } finally {
        network.contactApi.dispose();
        network.assertClean();
      }
    },
    { auto: true },
  ],
  contactApi: async ({ network }, provide) => {
    await provide(network.contactApi);
  },
});

export { expect };
