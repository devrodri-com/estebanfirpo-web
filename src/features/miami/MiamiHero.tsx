import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MiamiContent } from "@/content/miami";
import { createWhatsAppUrl } from "@/lib/site";
import { darkButtonClass, lightButtonClass } from "./miami-styles";

type MiamiHeroProps = {
  locale: Locale;
  copy: MiamiContent["hero"];
};

export function MiamiHero({ locale, copy }: MiamiHeroProps) {
  return (
    <section
      data-miami-block="hero"
      aria-labelledby="miami-hero-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[#0A2540]/10 bg-[#F6F5F0]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:min-h-[690px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h1
            id="miami-hero-title"
            className="mt-5 max-w-3xl text-balance text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0A2540] sm:text-6xl lg:text-[4.15rem]"
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
            <Link href={`/${locale}/proyectos`} className={darkButtonClass}>
              {copy.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={createWhatsAppUrl(copy.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={lightButtonClass}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.secondaryCta}
            </a>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs font-medium leading-5 text-[#0A2540]/65">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
            {copy.microcopy}
          </p>
        </div>

        <div className="relative lg:justify-self-end">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0A2540] shadow-[0_24px_70px_rgba(10,37,64,0.17)] lg:w-[440px]">
            <Image
              src="/images/miami/miami-global-capital-hero.jpg"
              alt={copy.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
              className="object-cover object-[center_58%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
