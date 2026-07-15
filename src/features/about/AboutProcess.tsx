import { Check, MessageCircleMore } from "lucide-react";
import type { AboutContent } from "@/content/about";
import { lightEyebrowClass, lightSectionTitleClass } from "./about-styles";

type AboutProcessProps = {
  copy: AboutContent["process"];
};

export function AboutProcess({ copy }: AboutProcessProps) {
  return (
    <section
      data-about-block="process"
      aria-labelledby="about-process-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0A2540] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid items-end gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div>
            <p className={lightEyebrowClass}>{copy.eyebrow}</p>
            <h2 id="about-process-title" className={lightSectionTitleClass}>
              {copy.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/72 lg:pb-1">
            {copy.copy}
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative min-h-full rounded-2xl border border-white/14 bg-white/[0.055] p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold tracking-[0.16em] text-[#E4C45C]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4C45C]/40 text-[#E4C45C]">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-7 text-xl font-semibold leading-snug tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/68">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex max-w-3xl items-start gap-3 border-t border-white/12 pt-7 text-base font-semibold leading-7 text-white">
          <MessageCircleMore className="mt-0.5 h-5 w-5 shrink-0 text-[#E4C45C]" aria-hidden="true" />
          <p>{copy.highlight}</p>
        </div>
      </div>
    </section>
  );
}
