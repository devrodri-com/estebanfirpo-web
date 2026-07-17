"use client";

import { MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { darkButtonClass } from "./financing-styles";

type FinancingWhatsAppLinkProps = {
  href: string;
  label: string;
  locale: Locale;
};

export function FinancingWhatsAppLink({
  href,
  label,
  locale,
}: FinancingWhatsAppLinkProps) {
  function handleClick() {
    window.gtag?.("event", "click_whatsapp", {
      event_category: "engagement",
      event_label:
        locale === "en" ? "financing_whatsapp_en" : "financing_whatsapp_es",
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-analytics="financing:whatsapp"
      className={darkButtonClass}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
