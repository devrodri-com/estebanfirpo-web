import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";

type HomeEducationProps = {
  locale: Locale;
};

export function HomeEducation({ locale }: HomeEducationProps) {
  const copy = getHomeContent(locale).education;
  const cards = [
    {
      key: "precon",
      content: copy.precon,
      href: `/${locale}/precon`,
      image: "/images/precon-hero.jpg",
      alt: locale === "en" ? "Miami pre-construction context" : "Contexto de preconstrucción en Miami",
    },
    {
      key: "miami",
      content: copy.miami,
      href: `/${locale}/miami`,
      image: "/images/miami-hero.jpg",
      alt: locale === "en" ? "Miami skyline and waterfront" : "Skyline y costa de Miami",
    },
  ] as const;

  return (
    <section aria-labelledby="home-education-title" className="py-16 sm:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
          {copy.eyebrow}
        </p>
        <h2
          id="home-education-title"
          className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
        >
          {copy.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.key}
            className="overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-white shadow-[0_8px_30px_rgba(10,37,64,0.05)]"
          >
            <div className="relative aspect-[16/7] overflow-hidden bg-[#E8E5DE]">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 to-transparent" />
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                {card.content.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#0D1521]/68">{card.content.copy}</p>
              <ul className="mt-5 space-y-3">
                {card.content.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[#0D1521]/75">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F6F5F0] text-[#0A2540]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={card.href}
                className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#0A2540] underline decoration-[#D4AF37]/55 decoration-2 underline-offset-4 hover:decoration-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0A2540]"
              >
                {card.content.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
