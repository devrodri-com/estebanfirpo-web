import Image, { getImageProps } from "next/image";
import { CalendarDays, MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";
import { CALENDAR_URL, createWhatsAppUrl } from "@/lib/site";

type HomeHeroProps = {
  locale: Locale;
};

export function HomeHero({ locale }: HomeHeroProps) {
  const copy = getHomeContent(locale).hero;
  const isEnglish = locale === "en";

  const { props: desktopImage } = getImageProps({
    src: "/images/hero-fallback.jpg",
    alt: "",
    width: 1920,
    height: 927,
    sizes: "100vw",
    priority: true,
  });
  const { props: mobileImage } = getImageProps({
    src: "/images/hero-fallback-mobile.jpg",
    alt: "",
    width: 900,
    height: 1200,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[#0A2540]/10 bg-[#F6F5F0]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <source media="(max-width: 639px)" srcSet={mobileImage.srcSet} />
          <img
            {...desktopImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[#F6F5F0]/80 sm:bg-gradient-to-r sm:from-[#F6F5F0]/95 sm:via-[#F6F5F0]/88 sm:to-[#F6F5F0]/35" />
      </div>

      <div className="relative mx-auto grid min-h-[670px] max-w-6xl items-center gap-10 px-4 py-16 sm:min-h-[720px] sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A2540]/70 sm:text-xs">
            {copy.eyebrow}
          </p>
          <h1
            id="home-hero-title"
            className="max-w-3xl text-balance text-[2.55rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#0A2540] sm:text-6xl lg:text-[4.35rem]"
          >
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#0D1521]/80 sm:text-lg sm:leading-8">
            {copy.copy}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={createWhatsAppUrl(copy.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="hero:whatsapp"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0A2540] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(10,37,64,0.14)] transition hover:-translate-y-0.5 hover:bg-[#0B1F3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540] motion-reduce:transform-none"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {copy.primaryCta}
            </a>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="hero:cta_meeting"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#0A2540]/30 bg-white/60 px-5 text-sm font-semibold text-[#0A2540] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#0A2540]/55 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540] motion-reduce:transform-none"
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {copy.secondaryCta}
            </a>
          </div>

          <p className="mt-5 max-w-xl text-xs leading-5 text-[#0A2540]/65">
            {copy.marketNote}
          </p>
        </div>

        <div className="self-end lg:self-center">
          <div className="ml-auto max-w-sm rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_18px_55px_rgba(10,37,64,0.12)] backdrop-blur-md sm:p-5">
            <div className="flex items-center gap-4">
              <Image
                src="/images/Esteban.jpg"
                alt={isEnglish ? "Esteban Firpo" : "Esteban Firpo"}
                width={160}
                height={160}
                sizes="80px"
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-[#0A2540]/10"
              />
              <div>
                <p className="font-semibold text-[#0A2540]">Esteban Firpo</p>
                <p className="mt-1 text-sm leading-5 text-[#0D1521]/70">
                  {copy.portraitNote}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0A2540]/65">
                  Miami Life Realty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
