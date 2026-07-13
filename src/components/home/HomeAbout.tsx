import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";

type HomeAboutProps = {
  locale: Locale;
};

export function HomeAbout({ locale }: HomeAboutProps) {
  const copy = getHomeContent(locale).about;

  return (
    <section
      aria-labelledby="home-about-title"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-[#EEEAE1] py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-[#D9D5CC] shadow-[0_18px_55px_rgba(10,37,64,0.10)]">
          <Image
            src="/images/Esteban.jpg"
            alt="Esteban Firpo"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h2
            id="home-about-title"
            className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/72 sm:text-lg sm:leading-8">
            {copy.copy}
          </p>
          <div className="mt-6 flex items-center gap-3 border-l-2 border-[#D4AF37] pl-4">
            <div>
              <p className="text-sm font-semibold text-[#0A2540]">Esteban Firpo</p>
              <p className="text-xs leading-5 text-[#0D1521]/65">{copy.note}</p>
            </div>
          </div>
          <Link
            href={`/${locale}/sobre-mi`}
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#0A2540]/25 bg-white/50 px-4 text-sm font-semibold text-[#0A2540] transition hover:border-[#0A2540]/50 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
          >
            {copy.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
