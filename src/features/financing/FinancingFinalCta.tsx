import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FinancingContent } from "@/content/financing";
import type { Locale } from "@/i18n/config";
import { createWhatsAppUrl } from "@/lib/site";
import { FinancingWhatsAppLink } from "./FinancingWhatsAppLink";
import { lightButtonClass } from "./financing-styles";

type FinancingFinalCtaProps = {
  locale: Locale;
  copy: FinancingContent["finalCta"];
  whatsappMessage: string;
};

export function FinancingFinalCta({
  locale,
  copy,
  whatsappMessage,
}: FinancingFinalCtaProps) {
  return (
    <section
      data-financing-block="final-cta"
      aria-labelledby="financing-final-cta-title"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-paper"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
        <span className="mx-auto block h-px w-16 bg-[#D4AF37]" aria-hidden="true" />
        <h2
          id="financing-final-cta-title"
          className="mt-6 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#0A2540] sm:text-5xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#0D1521]/72 sm:text-lg sm:leading-8">
          {copy.copy}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <FinancingWhatsAppLink
            href={createWhatsAppUrl(whatsappMessage)}
            label={copy.primaryCta}
            locale={locale}
          />
          <Link href={`/${locale}/proyectos`} className={lightButtonClass}>
            {copy.secondaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-xs leading-5 text-[#0A2540]/65">
          {copy.microcopy}
        </p>
      </div>
    </section>
  );
}
