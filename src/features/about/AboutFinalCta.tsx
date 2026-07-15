import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { AboutContent } from "@/content/about";
import type { Locale } from "@/i18n/config";
import { createWhatsAppUrl } from "@/lib/site";
import { darkButtonClass, lightButtonClass } from "./about-styles";

type AboutFinalCtaProps = {
  locale: Locale;
  copy: AboutContent["finalCta"];
  whatsappMessage: string;
};

export function AboutFinalCta({ locale, copy, whatsappMessage }: AboutFinalCtaProps) {
  return (
    <section
      data-about-block="final-cta"
      aria-labelledby="about-final-cta-title"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-[#F6F5F0]"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
        <span className="mx-auto block h-px w-16 bg-[#D4AF37]" aria-hidden="true" />
        <h2
          id="about-final-cta-title"
          className="mx-auto mt-7 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#0A2540] sm:text-5xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70 sm:text-lg sm:leading-8">
          {copy.copy}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={createWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={darkButtonClass}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {copy.primaryCta}
          </a>
          <Link href={`/${locale}/proyectos`} className={lightButtonClass}>
            {copy.secondaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-5 text-xs font-medium leading-5 text-[#0A2540]/70">{copy.microcopy}</p>
      </div>
    </section>
  );
}
