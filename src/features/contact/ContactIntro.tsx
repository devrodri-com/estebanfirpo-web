import { Building2, Mail, MapPin, Phone } from "lucide-react";
import type { ContactContent } from "@/content/contact";
import type { Locale } from "@/i18n/config";
import { createWhatsAppUrl } from "@/lib/site";
import { ContactWhatsAppLink } from "./ContactWhatsAppLink";

const detailIcons = [MapPin, Building2, Phone, Mail] as const;

type ContactIntroProps = {
  locale: Locale;
  copy: ContactContent["intro"];
};

export function ContactIntro({ locale, copy }: ContactIntroProps) {
  return (
    <div className="flex flex-col rounded-t-2xl bg-[#0A2540] px-6 py-9 text-white shadow-[0_24px_70px_rgba(10,37,64,0.16)] sm:px-9 sm:py-11 lg:rounded-l-2xl lg:rounded-tr-none lg:px-10 lg:py-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E0C66B]">
          {copy.eyebrow}
        </p>
        <h1
          id="contact-page-title"
          className="mt-4 text-balance text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[3.25rem]"
        >
          {copy.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
          {copy.copy}
        </p>
        <p className="mt-6 border-l-2 border-[#D4AF37] pl-4 text-base font-semibold leading-7 text-white">
          {copy.highlight}
        </p>
        <p className="mt-3 text-sm leading-6 text-white/66">{copy.support}</p>
      </div>

      <div className="mt-8">
        <ContactWhatsAppLink
          href={createWhatsAppUrl(copy.whatsappMessage)}
          label={copy.whatsappLabel}
          locale={locale}
        />
      </div>

      <ul className="mt-9 grid gap-4 border-t border-white/14 pt-7 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1 lg:pt-8">
        {copy.details.map((detail, index) => {
          const Icon = detailIcons[index];
          const content = (
            <>
              <span className="sr-only">{detail.label}: </span>
              <span className="break-words">{detail.value}</span>
            </>
          );

          return (
            <li key={detail.label} className="flex min-h-7 items-start gap-3 text-sm leading-6 text-white/78">
              <Icon className="mt-1 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
              {detail.href ? (
                <a
                  href={detail.href}
                  className="rounded-sm underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
                >
                  {content}
                </a>
              ) : (
                <span>{content}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
