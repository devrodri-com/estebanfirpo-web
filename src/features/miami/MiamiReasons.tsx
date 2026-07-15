import { BriefcaseBusiness, CircleDollarSign, Globe2, Landmark, UsersRound } from "lucide-react";
import type { MiamiContent } from "@/content/miami";
import { eyebrowClass, sectionTitleClass } from "./miami-styles";

const icons = [UsersRound, CircleDollarSign, BriefcaseBusiness, Globe2, Landmark] as const;

type MiamiReasonsProps = {
  copy: MiamiContent["reasons"];
};

export function MiamiReasons({ copy }: MiamiReasonsProps) {
  const [featured, ...supporting] = copy.items;
  const FeaturedIcon = icons[0];

  return (
    <section
      data-miami-block="reasons"
      aria-labelledby="miami-reasons-title"
      className="py-16 sm:py-24"
    >
      <div className="max-w-3xl">
        <p className={eyebrowClass}>{copy.eyebrow}</p>
        <h2 id="miami-reasons-title" className={sectionTitleClass}>
          {copy.title}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#0A2540] p-7 text-white shadow-[0_18px_55px_rgba(10,37,64,0.12)] sm:p-9">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-[#D4AF37]">
            <FeaturedIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">01</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
            {featured.title}
          </h3>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75">{featured.copy}</p>
          <p className="mt-8 border-t border-white/15 pt-6 text-sm font-semibold leading-6 text-[#E4C45C] lg:mt-auto">
            {featured.support}
          </p>
        </article>

        <div className="divide-y divide-[#0A2540]/10 border-y border-[#0A2540]/10">
          {supporting.map((item, index) => {
            const Icon = icons[index + 1];
            return (
              <article key={item.title} className="grid grid-cols-[auto_1fr] gap-4 py-6 sm:gap-5 sm:py-7">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F6F5F0] text-[#0A2540]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#755B14]">
                    {String(index + 2).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#0D1521]/68">{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
