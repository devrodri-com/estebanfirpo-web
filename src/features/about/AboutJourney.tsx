import { BriefcaseBusiness, Building2, GraduationCap, MapPin } from "lucide-react";
import type { AboutContent } from "@/content/about";
import { eyebrowClass, sectionTitleClass } from "./about-styles";

const milestoneIcons = [MapPin, GraduationCap, BriefcaseBusiness, Building2] as const;

type AboutJourneyProps = {
  copy: AboutContent["journey"];
};

export function AboutJourney({ copy }: AboutJourneyProps) {
  return (
    <section
      data-about-block="journey"
      aria-labelledby="about-journey-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-[#0A2540]/8 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className={eyebrowClass}>{copy.eyebrow}</p>
            <h2 id="about-journey-title" className={sectionTitleClass}>
              {copy.title}
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-[#0D1521]/72">
            <p>{copy.copy}</p>
            <p>{copy.secondaryCopy}</p>
          </div>
        </div>

        <div className="relative mt-12">
          <span className="absolute bottom-5 left-6 top-5 w-px bg-[#0A2540]/16 md:hidden" aria-hidden="true" />
          <span className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-[#0A2540]/16 md:block" aria-hidden="true" />
          <ol className="grid gap-0 md:grid-cols-4 md:gap-6">
            {copy.milestones.map((milestone, index) => {
              const Icon = milestoneIcons[index];
              return (
                <li key={milestone.title} className="relative flex gap-5 pb-9 last:pb-0 md:block md:pb-0 md:text-center">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#0A2540] text-[#E4C45C] md:mx-auto">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="pt-1 md:pt-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#755B14] md:mt-5">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#0D1521]/65">{milestone.copy}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
