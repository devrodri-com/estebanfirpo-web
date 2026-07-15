import { ChartNoAxesCombined, ScanSearch, Workflow } from "lucide-react";
import type { AboutContent } from "@/content/about";
import { eyebrowClass, sectionTitleClass } from "./about-styles";

const pillarIcons = [ChartNoAxesCombined, ScanSearch, Workflow] as const;

type AboutApproachProps = {
  copy: AboutContent["approach"];
};

export function AboutApproach({ copy }: AboutApproachProps) {
  return (
    <section
      data-about-block="approach"
      aria-labelledby="about-approach-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#0A2540]/8 bg-[#F1EFE8]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="about-approach-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <article
                key={pillar.title}
                className="relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-white p-6 shadow-[0_14px_45px_rgba(10,37,64,0.055)] sm:p-7"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/75 to-transparent" aria-hidden="true" />
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A2540] text-[#E4C45C]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#0D1521]/68">{pillar.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
