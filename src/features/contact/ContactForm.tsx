"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Send, X, XCircle } from "lucide-react";
import { parsePhoneNumber } from "libphonenumber-js";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en.json";
import esLabels from "react-phone-number-input/locale/es.json";
import "react-phone-number-input/style.css";
import type { ContactContent } from "@/content/contact";
import type { Locale } from "@/i18n/config";
import styles from "./ContactPhone.module.css";
import { CountrySelect } from "./CountrySelect";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean | undefined>,
    ) => void;
  }
}

type ContactApiResponse = { ok: true } | { ok: false; error: string };

type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

type ContactFormState = {
  nombre: string;
  email: string;
  mensaje: string;
  telefonoE164: string;
  country: Country | "" | "INTL";
};

type Notice = { type: "success" | "error"; text: string };

type ContactFormProps = {
  locale: Locale;
  copy: ContactContent["form"];
  countryCopy: ContactContent["countrySelector"];
};

const ALLOWED_COUNTRIES: Country[] = [
  "US",
  "CA",
  "ES",
  "MX",
  "AR",
  "CO",
  "CL",
  "PE",
  "VE",
  "EC",
  "DO",
  "GT",
  "HN",
  "NI",
  "CR",
  "PA",
  "CU",
  "PR",
  "BO",
  "PY",
  "UY",
  "BR",
];

const initialForm: ContactFormState = {
  nombre: "",
  email: "",
  mensaje: "",
  telefonoE164: "",
  country: "",
};

const inputClassName =
  "min-h-12 w-full rounded-lg border border-[#0A2540]/18 bg-white px-3.5 text-base text-[#0A2540] outline-none transition placeholder:text-[#0A2540]/42 hover:border-[#0A2540]/30 focus-visible:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/30 disabled:cursor-not-allowed disabled:bg-[#F6F5F0] disabled:opacity-70 sm:text-sm";

function isContactApiResponse(value: unknown): value is ContactApiResponse {
  if (typeof value !== "object" || value === null || !("ok" in value)) return false;

  const response = value as { ok?: unknown; error?: unknown };
  return response.ok === true || (response.ok === false && typeof response.error === "string");
}

export function ContactForm({ locale, copy, countryCopy }: ContactFormProps) {
  const isEnglish = locale === "en";
  const labels = isEnglish ? enLabels : esLabels;
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [companyHoneypot, setCompanyHoneypot] = useState("");
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [utms, setUtms] = useState<UtmParams>({});
  const ignoreNextPhoneChange = useRef(false);
  const redirectTimer = useRef<number | null>(null);
  const mounted = useRef(true);
  const submissionInFlight = useRef(false);
  const router = useRouter();

  useEffect(() => {
    mounted.current = true;
    const searchParams = new URLSearchParams(window.location.search);
    const nextUtms: UtmParams = {};
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ] as const;

    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) nextUtms[key] = value.trim().slice(0, 200);
    });

    if (Object.keys(nextUtms).length > 0) {
      setUtms(nextUtms);
      sessionStorage.setItem("lead_utms", JSON.stringify(nextUtms));
    }

    return () => {
      mounted.current = false;
      if (redirectTimer.current !== null) window.clearTimeout(redirectTimer.current);
    };
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handlePhoneChange(value: string | undefined) {
    const nextValue = value ?? "";

    if (ignoreNextPhoneChange.current) {
      ignoreNextPhoneChange.current = false;
      setPhoneInputValue("");
      setForm((current) => ({ ...current, telefonoE164: "", country: "" }));
      setPhoneError(null);
      return;
    }

    setPhoneInputValue(nextValue);

    if (!nextValue) {
      setForm((current) => ({ ...current, telefonoE164: "", country: "" }));
      setPhoneError(null);
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(nextValue);
      if (phoneNumber && isValidPhoneNumber(nextValue)) {
        const country = phoneNumber.country || "INTL";
        setForm((current) => ({
          ...current,
          telefonoE164: phoneNumber.format("E.164"),
          country,
        }));
        setPhoneError(null);
        return;
      }
    } catch {
      // The same localized validation message is handled below.
    }

    setForm((current) => ({ ...current, telefonoE164: "", country: "" }));
    setPhoneError(nextValue.length > 3 ? copy.phoneInvalid : null);
  }

  function handleCountryChange(country: Country | undefined) {
    setSelectedCountry(country);

    if (country === undefined) {
      ignoreNextPhoneChange.current = true;
      setPhoneInputValue("");
      setForm((current) => ({ ...current, telefonoE164: "", country: "" }));
    } else {
      setPhoneInputValue("");
      setForm((current) => ({ ...current, telefonoE164: "", country }));
    }

    setPhoneError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionInFlight.current) return;

    if (!form.telefonoE164 || !isValidPhoneNumber(form.telefonoE164)) {
      setPhoneError(copy.phoneInvalid);
      return;
    }

    submissionInFlight.current = true;
    setSending(true);
    setPhoneError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...utms, company: companyHoneypot }),
      });
      const raw = await response.text();
      let data: ContactApiResponse | null = null;

      try {
        const parsed: unknown = JSON.parse(raw);
        if (isContactApiResponse(parsed)) data = parsed;
      } catch {
        // Non-JSON responses use the generic delivery error below.
      }

      if (!mounted.current) return;

      if (response.status === 429 || (data?.ok === false && data.error === "rate_limited")) {
        setNotice({ type: "error", text: copy.rateLimited });
        return;
      }

      if (!response.ok || data?.ok !== true) throw new Error("send_failed");

      setNotice({ type: "success", text: copy.success });
      window.gtag?.("event", "generate_lead", {
        event_category: "form",
        event_label: isEnglish ? "contact" : "contacto",
        locale,
        has_phone: "true",
        phone_country: form.country || "INTL",
        ...(utms.utm_source && { utm_source: utms.utm_source }),
        ...(utms.utm_medium && { utm_medium: utms.utm_medium }),
        ...(utms.utm_campaign && { utm_campaign: utms.utm_campaign }),
      });

      if (redirectTimer.current !== null) window.clearTimeout(redirectTimer.current);
      redirectTimer.current = window.setTimeout(() => {
        router.push(`/${locale}/gracias`);
      }, 1200);
    } catch {
      if (mounted.current) setNotice({ type: "error", text: copy.sendError });
    } finally {
      if (mounted.current && redirectTimer.current === null) {
        submissionInFlight.current = false;
        setSending(false);
      }
    }
  }

  return (
    <div className="relative rounded-b-2xl bg-white px-6 py-9 shadow-[0_24px_70px_rgba(10,37,64,0.1)] ring-1 ring-inset ring-[#0A2540]/8 sm:px-9 sm:py-11 lg:rounded-bl-none lg:rounded-r-2xl lg:px-12 lg:py-12">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A6917]">
          {copy.eyebrow}
        </p>
        <h2
          id="contact-form-title"
          className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#0A2540] sm:text-[2.25rem]"
        >
          {copy.title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#0D1521]/68 sm:text-base sm:leading-7">
          {copy.copy}
        </p>

        <form className="mt-7 grid gap-5" onSubmit={handleSubmit} aria-labelledby="contact-form-title">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#0A2540]" htmlFor="contact-name">
              {copy.fields.name.label}
              <input
                id="contact-name"
                name="nombre"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={form.nombre}
                onChange={handleChange}
                disabled={sending}
                className={inputClassName}
                placeholder={copy.fields.name.placeholder}
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[#0A2540]" htmlFor="contact-email">
              {copy.fields.email.label}
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={form.email}
                onChange={handleChange}
                disabled={sending}
                className={inputClassName}
                placeholder={copy.fields.email.placeholder}
              />
            </label>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#0A2540]" htmlFor="contact-phone">
              {copy.fields.phone.label}
            </label>
            <div className={styles.phoneWrapper}>
              <PhoneInput
                id="contact-phone"
                name="telefonoE164"
                international
                defaultCountry={selectedCountry}
                country={selectedCountry}
                countryCallingCodeEditable
                countries={ALLOWED_COUNTRIES}
                labels={labels}
                countrySelectComponent={(props) => (
                  <CountrySelect {...props} labels={labels} copy={countryCopy} />
                )}
                value={phoneInputValue}
                onChange={handlePhoneChange}
                onCountryChange={handleCountryChange}
                autoComplete="tel"
                disabled={sending}
                aria-invalid={phoneError ? "true" : "false"}
                aria-describedby={phoneError ? "contact-phone-error" : undefined}
                placeholder={
                  selectedCountry
                    ? copy.fields.phone.placeholder
                    : copy.fields.phone.internationalPlaceholder
                }
              />
            </div>
            {phoneError ? (
              <p id="contact-phone-error" className="text-sm font-medium text-[#B42318]" role="alert">
                {phoneError}
              </p>
            ) : null}
          </div>

          <label className="grid gap-2 text-sm font-semibold text-[#0A2540]" htmlFor="contact-message">
            {copy.fields.message.label}
            <textarea
              id="contact-message"
              name="mensaje"
              required
              maxLength={4000}
              value={form.mensaje}
              onChange={handleChange}
              disabled={sending}
              className={`${inputClassName} min-h-40 resize-y py-3.5 leading-6`}
              placeholder={copy.fields.message.placeholder}
            />
          </label>

          <div className="sr-only" aria-hidden="true">
            <input
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              maxLength={200}
              value={companyHoneypot}
              onChange={(event) => setCompanyHoneypot(event.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            aria-busy={sending}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0A2540] px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(10,37,64,0.16)] transition hover:-translate-y-0.5 hover:bg-[#0B1F3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37] disabled:cursor-wait disabled:bg-[#0A2540]/65 disabled:shadow-none motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {sending ? copy.submitting : copy.submit}
          </button>
        </form>
      </div>

      {notice ? (
        <div
          role={notice.type === "error" ? "alert" : "status"}
          aria-live={notice.type === "error" ? "assertive" : "polite"}
          aria-atomic="true"
          className={`fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-md rounded-xl px-4 py-3 shadow-[0_18px_50px_rgba(10,37,64,0.24)] ring-1 sm:inset-x-auto sm:bottom-6 sm:right-6 ${
            notice.type === "success"
              ? "bg-white text-[#0A2540] ring-[#0A2540]/12"
              : "bg-[#9B1C1C] text-white ring-[#7F1D1D]"
          }`}
        >
          <div className="flex items-start gap-3">
            {notice.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16794C]" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <p className="flex-1 text-sm font-medium leading-5">{notice.text}</p>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md opacity-75 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              aria-label={copy.closeNotice}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
