import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  IdCard,
  Languages,
  MapPin,
  MessageCircle,
} from "lucide-react";
import type { AboutContent } from "@/content/about";
import type { Locale } from "@/i18n/config";
import { createWhatsAppUrl } from "@/lib/site";
import { darkButtonClass, lightButtonClass } from "./about-styles";

const credentialIcons = [MapPin, Languages, IdCard, Building2] as const;

type AboutHeroProps = {
  locale: Locale;
  copy: AboutContent["hero"];
};

export function AboutHero({ locale, copy }: AboutHeroProps) {
  return (
    <section
      data-about-block="hero"
      aria-labelledby="about-hero-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[#0A2540]/10 bg-[#F6F5F0]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:min-h-[680px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h1
            id="about-hero-title"
            className="mt-5 max-w-3xl text-balance text-[2.55rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#0A2540] sm:text-6xl lg:text-[4rem]"
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
            <a
              href={createWhatsAppUrl(copy.whatsappMessage)}
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

          <p className="mt-5 flex items-start gap-2 text-xs font-medium leading-5 text-[#0A2540]/65">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
            {copy.microcopy}
          </p>

          <ul className="mt-7 flex max-w-2xl flex-wrap gap-x-5 gap-y-3 border-t border-[#0A2540]/10 pt-5">
            {copy.credentials.map((credential, index) => {
              const Icon = credentialIcons[index];
              return (
                <li key={credential} className="flex min-h-6 items-center gap-2 text-xs font-semibold text-[#0A2540]/72">
                  <Icon className="h-4 w-4 shrink-0 text-[#9A761A]" aria-hidden="true" />
                  <span>{credential}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative isolate mx-auto w-full max-w-[420px] lg:mx-0 lg:justify-self-end">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-[#E9E6DD] shadow-[0_24px_70px_rgba(10,37,64,0.16)] lg:w-[420px]">
            <Image
              src="/images/Esteban.jpg"
              alt={copy.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 452px) 420px, calc(100vw - 32px)"
              className="object-cover object-center"
            />
          </div>
          <span
            className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-2xl border border-[#D4AF37]/45"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
