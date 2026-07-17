import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FinancingContent } from "@/content/financing";
import type { Locale } from "@/i18n/config";
import { createWhatsAppUrl } from "@/lib/site";
import { FinancingWhatsAppLink } from "./FinancingWhatsAppLink";
import { eyebrowClass, lightButtonClass } from "./financing-styles";

type FinancingHeroProps = {
  locale: Locale;
  copy: FinancingContent["hero"];
};

export function FinancingHero({ locale, copy }: FinancingHeroProps) {
  return (
    <section
      data-financing-block="hero"
      aria-labelledby="financing-hero-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[#0A2540]/10 bg-[#F6F5F0]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:py-20 lg:min-h-[660px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        <div className="max-w-3xl">
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h1
            id="financing-hero-title"
            className="mt-5 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#0A2540] sm:text-6xl lg:text-[4rem]"
          >
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#0D1521]/78 sm:text-lg sm:leading-8">
            {copy.copy}
          </p>
          <p className="mt-6 max-w-xl border-l-2 border-[#D4AF37] pl-4 text-base font-semibold leading-7 text-[#0A2540] sm:text-lg">
            {copy.highlight}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <FinancingWhatsAppLink
              href={createWhatsAppUrl(copy.whatsappMessage)}
              label={copy.primaryCta}
              locale={locale}
            />
            <Link href={`/${locale}/proyectos`} className={lightButtonClass}>
              {copy.secondaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-5 max-w-2xl text-xs leading-5 text-[#0A2540]/65">
            {copy.microcopy}
          </p>
        </div>

        <aside
          aria-label={copy.eyebrow}
          className="relative w-full max-w-[420px] justify-self-center overflow-hidden rounded-2xl bg-[#0A2540] px-6 py-2 text-white shadow-[0_24px_70px_rgba(10,37,64,0.18)] sm:px-8 lg:justify-self-end"
        >
          <span
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/65 to-transparent"
            aria-hidden="true"
          />
          <ol className="divide-y divide-white/14">
            {copy.brief.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-3 py-5 sm:py-6"
              >
                <span className="text-xs font-semibold tracking-[0.14em] text-[#E0C66B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-semibold leading-6 text-white">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
