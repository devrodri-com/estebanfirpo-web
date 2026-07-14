import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { PreconstructionContent } from "@/content/preconstruction";
import { createWhatsAppUrl } from "@/lib/site";
import { darkButtonClass, lightButtonClass } from "./preconstruction-styles";

type PreconstructionHeroProps = {
  locale: Locale;
  copy: PreconstructionContent["hero"];
};

export function PreconstructionHero({ locale, copy }: PreconstructionHeroProps) {
  return (
    <section
      data-preconstruction-block="hero"
      aria-labelledby="preconstruction-hero-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[#0A2540]/10 bg-[#F6F5F0]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:min-h-[680px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-14 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h1
            id="preconstruction-hero-title"
            className="mt-5 max-w-3xl text-balance text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0A2540] sm:text-6xl lg:text-[4.35rem]"
          >
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#0D1521]/78 sm:text-lg sm:leading-8">
            {copy.copy}
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

        <figure className="relative lg:justify-self-end">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0A2540] shadow-[0_24px_70px_rgba(10,37,64,0.17)] sm:aspect-[3/2] lg:aspect-[4/5] lg:w-[440px]">
            <Image
              src="/images/preconstruction/preconstruction-planning-model.jpg"
              alt={copy.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
              className="object-contain object-center lg:object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A2540]/28 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <figcaption className="absolute bottom-3 left-3 z-10 rounded bg-[#0A2540]/85 px-2 py-1 text-[10px] font-medium leading-4 text-white sm:bottom-4 sm:left-4 sm:text-[11px]">
            {copy.imageCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
