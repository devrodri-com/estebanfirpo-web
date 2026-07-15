"use client";

import { MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";

type ContactWhatsAppLinkProps = {
  href: string;
  label: string;
  locale: Locale;
};

export function ContactWhatsAppLink({
  href,
  label,
  locale,
}: ContactWhatsAppLinkProps) {
  function handleClick() {
    window.gtag?.("event", "click_whatsapp", {
      event_category: "engagement",
      event_label:
        locale === "en" ? "contact_whatsapp_en" : "contact_whatsapp_es",
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#0A2540] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
