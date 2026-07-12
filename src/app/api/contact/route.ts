import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16 * 1024;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RECIPIENT = "esteban@miamiliferealty.com";
const CONTACT_SENDER = "Leads Esteban <leads@estebanfirpo.com>";
const CONTACT_SUBJECT = "Nuevo mensaje desde estebanfirpo.com";

const optionalTrackingValue = z.preprocess(
  (value) =>
    typeof value === "string" ? value.trim().slice(0, 200) : value,
  z.string().max(200).optional(),
);

const contactSchema = z
  .object({
    nombre: z.string().trim().min(1).max(100),
    email: z.string().trim().max(254).email(),
    mensaje: z.string().trim().min(1).max(4_000),
    telefonoE164: z
      .string()
      .trim()
      .max(16)
      .refine((value) => isValidPhoneNumber(value)),
    country: z.union([z.literal("INTL"), z.string().regex(/^[A-Z]{2}$/)]),
    company: z.string().max(200).optional().default(""),
    utm_source: optionalTrackingValue,
    utm_medium: optionalTrackingValue,
    utm_campaign: optionalTrackingValue,
    utm_content: optionalTrackingValue,
    utm_term: optionalTrackingValue,
  })
  .strict();

type ContactPayload = z.infer<typeof contactSchema>;
type TrackingKey =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_content"
  | "utm_term";

const TRACKING_FIELDS: ReadonlyArray<{ key: TrackingKey; label: string }> = [
  { key: "utm_source", label: "Source" },
  { key: "utm_medium", label: "Medium" },
  { key: "utm_campaign", label: "Campaign" },
  { key: "utm_content", label: "Content" },
  { key: "utm_term", label: "Term" },
];

// This map is deliberately kept as a best-effort control only. In serverless,
// each instance has independent memory and entries disappear on cold starts.
// A shared rate-limit store requires separately approved infrastructure.
type RateLimitEntry = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateLimitEntry>();

type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415 };

function jsonError(status: number, error: string) {
  return NextResponse.json(
    { ok: false, error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

async function readJsonBody(req: Request): Promise<JsonBodyResult> {
  const mediaType = req.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (mediaType !== "application/json") {
    return { ok: false, status: 415 };
  }

  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader !== null) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isSafeInteger(contentLength) || contentLength < 0) {
      return { ok: false, status: 400 };
    }
    if (contentLength > MAX_REQUEST_BYTES) {
      return { ok: false, status: 413 };
    }
  }

  if (!req.body) {
    return { ok: false, status: 400 };
  }

  const reader = req.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytesRead = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      bytesRead += value.byteLength;
      if (bytesRead > MAX_REQUEST_BYTES) {
        try {
          await reader.cancel();
        } catch {
          // The size limit has already been enforced; cancellation is best effort.
        }
        return { ok: false, status: 413 };
      }

      body += decoder.decode(value, { stream: true });
    }

    body += decoder.decode();
    return { ok: true, value: JSON.parse(body) as unknown };
  } catch {
    return { ok: false, status: 400 };
  } finally {
    reader.releaseLock();
  }
}

function isHoneypotSubmission(value: unknown): boolean {
  if (typeof value !== "object" || value === null || !("company" in value)) {
    return false;
  }

  const company = (value as { company?: unknown }).company;
  return typeof company === "string" && company.trim() !== "";
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function getTrackingEntries(payload: ContactPayload) {
  return TRACKING_FIELDS.flatMap(({ key, label }) => {
    const value = payload[key];
    return value ? [{ label, value }] : [];
  });
}

// Simple hash for the user-agent fallback. It is not used for security.
function simpleHash(value: string): string {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash &= hash;
  }
  return Math.abs(hash).toString(36).substring(0, 8);
}

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP.trim();

  const userAgent = req.headers.get("user-agent") || "unknown";
  return `unknown:${simpleHash(userAgent)}`;
}

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  cleanupExpiredEntries();

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  const bodyResult = await readJsonBody(req);
  if (!bodyResult.ok) {
    return jsonError(bodyResult.status, "invalid_request");
  }

  // Preserve the silent honeypot response without sending email.
  if (isHoneypotSubmission(bodyResult.value)) {
    return NextResponse.json({ ok: true });
  }

  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    return jsonError(429, "rate_limited");
  }

  const parsedPayload = contactSchema.safeParse(bodyResult.value);
  if (!parsedPayload.success) {
    return jsonError(400, "invalid_request");
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return jsonError(500, "send_failed");
  }

  const payload = parsedPayload.data;
  const trackingEntries = getTrackingEntries(payload);
  const trackingText = trackingEntries.length
    ? `\n\n--- Tracking ---\n${trackingEntries
        .map(({ label, value }) => `${label}: ${value}`)
        .join("\n")}`
    : "";
  const trackingHtml = trackingEntries.length
    ? `
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
        <h3 style="margin: 20px 0 10px; font-size: 14px; font-weight: 600; color: #666;">Tracking</h3>
        ${trackingEntries
          .map(
            ({ label, value }) =>
              `<p style="margin: 5px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`,
          )
          .join("")}
      `
    : "";

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: CONTACT_RECIPIENT,
      replyTo: payload.email,
      subject: CONTACT_SUBJECT,
      text: `Nombre: ${payload.nombre}\nEmail: ${payload.email}\nTeléfono: ${payload.telefonoE164} (${payload.country})\nMensaje:\n${payload.mensaje}${trackingText}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(payload.nombre)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(payload.telefonoE164)} <small>(${escapeHtml(payload.country)})</small></p>
        <p><strong>Mensaje:</strong><br/>${escapeHtml(payload.mensaje).replace(/\r?\n/g, "<br/>")}</p>
        ${trackingHtml}
      `,
    });

    if (error) {
      return jsonError(500, "send_failed");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return jsonError(500, "send_failed");
  }
}
