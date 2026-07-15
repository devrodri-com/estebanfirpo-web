import Link from "next/link";
import { ArrowRight, Building2, ChartNoAxesCombined, House, KeyRound } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { MiamiContent } from "@/content/miami";
import { lightEyebrowClass, lightSectionTitleClass } from "./miami-styles";

const icons = [Building2, KeyRound, House, ChartNoAxesCombined] as const;

type MiamiStrategiesProps = {
  locale: Locale;
  copy: MiamiContent["strategies"];
};

export function MiamiStrategies({ locale, copy }: MiamiStrategiesProps) {
  return (
    <section
      data-miami-block="strategies"
      aria-labelledby="miami-strategies-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0A2540] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className={lightEyebrowClass}>{copy.eyebrow}</p>
          <h2 id="miami-strategies-title" className={lightSectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/72">{copy.copy}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.title} className="flex min-h-72 flex-col rounded-2xl border border-white/14 bg-white/[0.055] p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#E4C45C]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.copy}</p>
                {item.cta ? (
                  <Link
                    href={`/${locale}/precon`}
                    className="mt-auto inline-flex min-h-11 items-end gap-2 pt-5 text-sm font-semibold text-[#E4C45C] underline decoration-[#E4C45C]/35 underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
                  >
                    {item.cta}
                    <ArrowRight className="mb-0.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
