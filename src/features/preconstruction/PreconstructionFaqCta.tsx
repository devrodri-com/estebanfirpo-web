import Link from "next/link";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { PreconstructionContent } from "@/content/preconstruction";
import { createWhatsAppUrl } from "@/lib/site";
import { eyebrowClass, invertedButtonClass, outlineButtonClass, sectionTitleClass } from "./preconstruction-styles";

type PreconstructionFaqCtaProps = {
  locale: Locale;
  copy: PreconstructionContent["faq"];
};

export function PreconstructionFaqCta({ locale, copy }: PreconstructionFaqCtaProps) {
  return (
    <section
      data-preconstruction-block="faq-cta"
      aria-labelledby="preconstruction-faq-title"
      className="py-16 sm:py-24"
    >
      <div className="max-w-3xl">
        <p className={eyebrowClass}>{copy.eyebrow}</p>
        <h2 id="preconstruction-faq-title" className={sectionTitleClass}>
          {copy.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-start lg:gap-10">
        <div className="divide-y divide-[#0A2540]/10 border-y border-[#0A2540]/10">
          {copy.items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-semibold text-[#0A2540] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540] [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 transition group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-[#0D1521]/68">{item.answer}</p>
            </details>
          ))}
        </div>

        <aside className="relative overflow-hidden rounded-2xl bg-[#0A2540] p-6 text-white shadow-[0_18px_55px_rgba(10,37,64,0.14)] sm:p-8 lg:sticky lg:top-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Esteban Firpo · Miami Life Realty
          </p>
          <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
            {copy.ctaTitle}
          </h3>
          <p className="mt-4 text-sm leading-6 text-white/70">{copy.ctaCopy}</p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={createWhatsAppUrl(copy.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={invertedButtonClass}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.primaryCta}
            </a>
            <Link href={`/${locale}/proyectos`} className={outlineButtonClass}>
              {copy.secondaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
