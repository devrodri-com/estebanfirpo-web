import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type EmailPayload = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

const resendMock = vi.hoisted(() => ({
  constructor: vi.fn(),
  send: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: resendMock.send };

    constructor(apiKey: string) {
      resendMock.constructor(apiKey);
    }
  },
}));

const MAX_REQUEST_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const FAKE_API_KEY = "fictional-test-key";
const externalFetch = vi.fn(() => {
  throw new Error("Unexpected external request from Contact API test");
});

const validPayload = {
  nombre: "Ada Example",
  email: "ada@example.com",
  mensaje: "I am testing a fictional Miami inquiry.",
  telefonoE164: "+12025550123",
  country: "US",
  company: "",
};

type RequestOptions = {
  payload?: unknown;
  body?: BodyInit | null;
  contentType?: string | null;
  headers?: HeadersInit;
  autoIp?: boolean;
};

let ipSequence = 0;

function nextTestIp(): string {
  ipSequence += 1;
  return `192.0.2.${ipSequence}`;
}

async function sendRequest(options: RequestOptions = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  if (options.contentType !== null && !headers.has("content-type")) {
    headers.set("content-type", options.contentType ?? "application/json");
  }
  if (options.autoIp !== false && !headers.has("x-forwarded-for")) {
    headers.set("x-forwarded-for", nextTestIp());
  }

  const body =
    options.body === undefined
      ? JSON.stringify(options.payload ?? validPayload)
      : options.body;
  const request = new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body,
  });
  const { POST } = await import("./route");
  return POST(request);
}

async function expectJsonResponse(
  response: Response,
  status: number,
  body: unknown,
): Promise<void> {
  expect(response.status).toBe(status);
  expect(response.headers.get("content-type")).toContain("application/json");
  if (status >= 400) {
    expect(response.headers.get("cache-control")).toBe("no-store");
  }
  await expect(response.json()).resolves.toEqual(body);
}

function getOnlyEmailPayload(): EmailPayload {
  expect(resendMock.send).toHaveBeenCalledTimes(1);
  return resendMock.send.mock.calls[0][0] as EmailPayload;
}

beforeEach(() => {
  vi.resetModules();
  vi.useRealTimers();
  vi.stubEnv("RESEND_API_KEY", FAKE_API_KEY);
  vi.stubGlobal("fetch", externalFetch);
  resendMock.constructor.mockReset();
  resendMock.send.mockReset();
  resendMock.send.mockResolvedValue({ data: { id: "email_test" }, error: null });
  externalFetch.mockClear();
  ipSequence = 0;
});

afterEach(() => {
  expect(externalFetch).not.toHaveBeenCalled();
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("accepts a native JSON Request and returns the public success contract", async () => {
    const response = await sendRequest();

    await expectJsonResponse(response, 200, { ok: true });
    expect(resendMock.constructor).toHaveBeenCalledWith(FAKE_API_KEY);
    expect(resendMock.send).toHaveBeenCalledTimes(1);
  });

  it("accepts application/json with case-insensitive charset parameters", async () => {
    const response = await sendRequest({
      contentType: "Application/JSON; Charset=UTF-8",
    });

    await expectJsonResponse(response, 200, { ok: true });
    expect(resendMock.send).toHaveBeenCalledTimes(1);
  });

  it("rejects absent and unsupported content types before invoking Resend", async () => {
    for (const contentType of [null, "text/plain", "multipart/form-data"]) {
      const response = await sendRequest({ contentType });
      await expectJsonResponse(response, 415, {
        ok: false,
        error: "invalid_request",
      });
    }

    expect(resendMock.constructor).not.toHaveBeenCalled();
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON without invoking Resend", async () => {
    const response = await sendRequest({ body: '{"nombre":' });

    await expectJsonResponse(response, 400, {
      ok: false,
      error: "invalid_request",
    });
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("rejects an empty request body without invoking Resend", async () => {
    const response = await sendRequest({ body: null });

    await expectJsonResponse(response, 400, {
      ok: false,
      error: "invalid_request",
    });
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("rejects malformed or oversized Content-Length values before reading the body", async () => {
    const invalidLengths = ["-1", "1.5", "not-a-number", "9007199254740992"];
    for (const contentLength of invalidLengths) {
      const response = await sendRequest({
        headers: { "content-length": contentLength },
      });
      await expectJsonResponse(response, 400, {
        ok: false,
        error: "invalid_request",
      });
    }

    const oversized = await sendRequest({
      headers: { "content-length": String(MAX_REQUEST_BYTES + 1) },
    });
    await expectJsonResponse(oversized, 413, {
      ok: false,
      error: "invalid_request",
    });
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("accepts valid field boundaries in a payload close to the byte limit", async () => {
    const maxEmail = `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}`;
    const payload = {
      ...validPayload,
      nombre: "N".repeat(100),
      email: maxEmail,
      mensaje: "m".repeat(4_000),
      utm_source: "s".repeat(2_200),
      utm_medium: "m".repeat(2_200),
      utm_campaign: "c".repeat(2_200),
      utm_content: "o".repeat(2_200),
      utm_term: "t".repeat(2_200),
    };
    const body = JSON.stringify(payload);
    const bytes = new TextEncoder().encode(body).byteLength;
    expect(bytes).toBeGreaterThan(15_000);
    expect(bytes).toBeLessThanOrEqual(MAX_REQUEST_BYTES);

    const response = await sendRequest({ body });

    await expectJsonResponse(response, 200, { ok: true });
    const email = getOnlyEmailPayload();
    expect(email.replyTo).toBe(maxEmail);
    expect(email.text).toContain(`Source: ${"s".repeat(200)}`);
    expect(email.text).not.toContain("s".repeat(201));
  });

  it("enforces the byte limit on the streamed body even without Content-Length", async () => {
    const body = JSON.stringify({
      ...validPayload,
      mensaje: "é".repeat(MAX_REQUEST_BYTES),
    });
    expect(new TextEncoder().encode(body).byteLength).toBeGreaterThan(
      MAX_REQUEST_BYTES,
    );

    const response = await sendRequest({ body });

    await expectJsonResponse(response, 413, {
      ok: false,
      error: "invalid_request",
    });
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("rejects malformed UTF-8 without exposing decoder details", async () => {
    const invalidUtf8 = new Uint8Array([
      0x7b, 0x22, 0x78, 0x22, 0x3a, 0x22, 0xc3, 0x28, 0x22, 0x7d,
    ]);
    const response = await sendRequest({ body: invalidUtf8 });

    await expectJsonResponse(response, 400, {
      ok: false,
      error: "invalid_request",
    });
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("rejects required, type, length, phone, country, tracking, and strict-schema violations", async () => {
    const without = (key: keyof typeof validPayload) => {
      const payload: Record<string, unknown> = { ...validPayload };
      delete payload[key];
      return payload;
    };
    const invalidPayloads: Array<[string, unknown]> = [
      ["missing name", without("nombre")],
      ["blank name", { ...validPayload, nombre: " " }],
      ["long name", { ...validPayload, nombre: "n".repeat(101) }],
      ["wrong name type", { ...validPayload, nombre: 123 }],
      ["missing email", without("email")],
      ["invalid email", { ...validPayload, email: "not-an-email" }],
      ["long email", { ...validPayload, email: `${"a".repeat(243)}@example.com` }],
      ["missing message", without("mensaje")],
      ["blank message", { ...validPayload, mensaje: " " }],
      ["long message", { ...validPayload, mensaje: "m".repeat(4_001) }],
      ["missing phone", without("telefonoE164")],
      ["invalid phone", { ...validPayload, telefonoE164: "+123" }],
      ["missing country", without("country")],
      ["invalid country", { ...validPayload, country: "USA" }],
      ["wrong tracking type", { ...validPayload, utm_source: 123 }],
      ["unexpected field", { ...validPayload, page: "/es/contacto" }],
    ];

    for (const [label, payload] of invalidPayloads) {
      const response = await sendRequest({ payload });
      if (response.status !== 400) {
        throw new Error(`${label} returned ${response.status} instead of 400`);
      }
      expect(response.headers.get("cache-control")).toBe("no-store");
      await expect(response.json()).resolves.toEqual({
        ok: false,
        error: "invalid_request",
      });
    }

    expect(resendMock.constructor).not.toHaveBeenCalled();
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("trims and truncates UTM values while omitting empty tracking entries", async () => {
    const response = await sendRequest({
      payload: {
        ...validPayload,
        utm_source: `  ${"s".repeat(210)}  `,
        utm_medium: "   ",
        utm_campaign: "  fictional-campaign  ",
        utm_content: "  hero  ",
        utm_term: "  miami  ",
      },
    });

    await expectJsonResponse(response, 200, { ok: true });
    const email = getOnlyEmailPayload();
    expect(email.text).toContain(`Source: ${"s".repeat(200)}`);
    expect(email.text).toContain("Campaign: fictional-campaign");
    expect(email.text).toContain("Content: hero");
    expect(email.text).toContain("Term: miami");
    expect(email.text).not.toContain("Medium:");
  });

  it("returns silently for the honeypot before schema, rate limiting, or Resend", async () => {
    for (let attempt = 0; attempt < 7; attempt += 1) {
      const response = await sendRequest({
        payload: { ...validPayload, company: " fictional-bot-company " },
        headers: { "x-forwarded-for": "198.51.100.10" },
      });
      await expectJsonResponse(response, 200, { ok: true });
    }

    expect(resendMock.constructor).not.toHaveBeenCalled();
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("maps validated fields and tracking to the exact Resend envelope", async () => {
    const response = await sendRequest({
      payload: {
        ...validPayload,
        nombre: "Casey Example",
        email: "casey@example.com",
        mensaje: "A fictional request.",
        utm_source: "newsletter",
        utm_medium: "email",
        utm_campaign: "summer",
        utm_content: "hero",
        utm_term: "miami",
      },
    });

    await expectJsonResponse(response, 200, { ok: true });
    expect(resendMock.constructor).toHaveBeenCalledOnce();
    expect(resendMock.constructor).toHaveBeenCalledWith(FAKE_API_KEY);
    expect(getOnlyEmailPayload()).toEqual({
      from: "Leads Esteban <leads@estebanfirpo.com>",
      to: "esteban@miamiliferealty.com",
      replyTo: "casey@example.com",
      subject: "Nuevo mensaje desde estebanfirpo.com",
      text: expect.stringContaining(
        "Nombre: Casey Example\nEmail: casey@example.com\nTeléfono: +12025550123 (US)\nMensaje:\nA fictional request.",
      ),
      html: expect.stringContaining(
        "<p><strong>Email:</strong> casey@example.com</p>",
      ),
    });
    const email = getOnlyEmailPayload();
    expect(email.text).toContain("Source: newsletter");
    expect(email.text).toContain("Medium: email");
    expect(email.text).toContain("Campaign: summer");
    expect(email.text).toContain("Content: hero");
    expect(email.text).toContain("Term: miami");
    expect(email.text).not.toContain("company");
  });

  it("escapes user-controlled HTML and preserves message line breaks", async () => {
    const dangerousName = `A&B <Agent> ' "`;
    const dangerousMessage = `<script>alert("x")</script>\nSecond & final`;
    const dangerousCampaign = `<campaign attr="x">&`;
    const response = await sendRequest({
      payload: {
        ...validPayload,
        nombre: dangerousName,
        mensaje: dangerousMessage,
        utm_campaign: dangerousCampaign,
      },
    });

    await expectJsonResponse(response, 200, { ok: true });
    const email = getOnlyEmailPayload();
    expect(email.text).toContain(dangerousName);
    expect(email.text).toContain(dangerousMessage);
    expect(email.html).toContain("A&amp;B &lt;Agent&gt; &#39; &quot;");
    expect(email.html).toContain(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;<br/>Second &amp; final",
    );
    expect(email.html).toContain("&lt;campaign attr=&quot;x&quot;&gt;&amp;");
    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<Agent>");
    expect(email.html).not.toContain('<campaign attr="x">');
  });

  it("maps a Resend error object to a stable response without leaking details", async () => {
    resendMock.send.mockResolvedValueOnce({
      data: null,
      error: { message: "fictional provider detail" },
    });

    const response = await sendRequest();
    const responseText = await response.text();

    expect(response.status).toBe(500);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(JSON.parse(responseText)).toEqual({ ok: false, error: "send_failed" });
    expect(responseText).not.toContain("fictional provider detail");
    expect(resendMock.send).toHaveBeenCalledTimes(1);
  });

  it("maps a thrown provider failure to a stable response without leaking details", async () => {
    resendMock.send.mockRejectedValueOnce(
      new Error("fictional provider exception with private context"),
    );

    const response = await sendRequest();
    const responseText = await response.text();

    expect(response.status).toBe(500);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(JSON.parse(responseText)).toEqual({ ok: false, error: "send_failed" });
    expect(responseText).not.toContain("private context");
    expect(resendMock.send).toHaveBeenCalledTimes(1);
  });

  it("fails safely when the server-only API key is unavailable", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await sendRequest();

    await expectJsonResponse(response, 500, { ok: false, error: "send_failed" });
    expect(resendMock.constructor).not.toHaveBeenCalled();
    expect(resendMock.send).not.toHaveBeenCalled();
  });

  it("allows five attempts, blocks the sixth, and resets only after the exact window", async () => {
    vi.useFakeTimers();
    const start = new Date("2026-01-01T00:00:00.000Z");
    vi.setSystemTime(start);
    const headers = { "x-forwarded-for": "198.51.100.20" };

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await sendRequest({ headers });
      await expectJsonResponse(response, 200, { ok: true });
    }

    const sixth = await sendRequest({ headers });
    await expectJsonResponse(sixth, 429, {
      ok: false,
      error: "rate_limited",
    });
    expect(sixth.headers.get("retry-after")).toBeNull();

    vi.setSystemTime(start.getTime() + RATE_LIMIT_WINDOW_MS);
    const exactBoundary = await sendRequest({ headers });
    await expectJsonResponse(exactBoundary, 429, {
      ok: false,
      error: "rate_limited",
    });

    vi.setSystemTime(start.getTime() + RATE_LIMIT_WINDOW_MS + 1);
    const afterBoundary = await sendRequest({ headers });
    await expectJsonResponse(afterBoundary, 200, { ok: true });
    expect(resendMock.send).toHaveBeenCalledTimes(6);
  });

  it("isolates rate-limit counters between different client IPs", async () => {
    const blockedIp = { "x-forwarded-for": "198.51.100.30" };
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await expectJsonResponse(await sendRequest({ headers: blockedIp }), 200, {
        ok: true,
      });
    }

    await expectJsonResponse(await sendRequest({ headers: blockedIp }), 429, {
      ok: false,
      error: "rate_limited",
    });
    await expectJsonResponse(
      await sendRequest({ headers: { "x-forwarded-for": "198.51.100.31" } }),
      200,
      { ok: true },
    );
    expect(resendMock.send).toHaveBeenCalledTimes(6);
  });

  it("uses forwarded IP, then real IP, then user-agent fallback for rate-limit keys", async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await sendRequest({
        autoIp: false,
        headers: {
          "x-forwarded-for": "198.51.100.40, 203.0.113.40",
          "x-real-ip": `203.0.113.${attempt + 1}`,
        },
      });
    }
    await expectJsonResponse(
      await sendRequest({
        autoIp: false,
        headers: {
          "x-forwarded-for": "198.51.100.40, 203.0.113.99",
          "x-real-ip": "203.0.113.99",
        },
      }),
      429,
      { ok: false, error: "rate_limited" },
    );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await sendRequest({
        autoIp: false,
        headers: {
          "x-real-ip": "198.51.100.50",
          "user-agent": `Fictional Agent ${attempt}`,
        },
      });
    }
    await expectJsonResponse(
      await sendRequest({
        autoIp: false,
        headers: {
          "x-real-ip": "198.51.100.50",
          "user-agent": "Different Fictional Agent",
        },
      }),
      429,
      { ok: false, error: "rate_limited" },
    );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await sendRequest({
        autoIp: false,
        headers: { "user-agent": "Fictional Shared Agent" },
      });
    }
    await expectJsonResponse(
      await sendRequest({
        autoIp: false,
        headers: { "user-agent": "Fictional Shared Agent" },
      }),
      429,
      { ok: false, error: "rate_limited" },
    );
    await expectJsonResponse(
      await sendRequest({
        autoIp: false,
        headers: { "user-agent": "Fictional Independent Agent" },
      }),
      200,
      { ok: true },
    );
    expect(resendMock.send).toHaveBeenCalledTimes(16);
  });
});
