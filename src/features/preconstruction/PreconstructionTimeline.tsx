import type { PreconstructionContent } from "@/content/preconstruction";
import { lightEyebrowClass, lightSectionTitleClass } from "./preconstruction-styles";

type PreconstructionTimelineProps = {
  copy: PreconstructionContent["timeline"];
};

export function PreconstructionTimeline({ copy }: PreconstructionTimelineProps) {
  return (
    <section
      data-preconstruction-block="timeline"
      aria-labelledby="preconstruction-timeline-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0A2540] text-white"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <p className={lightEyebrowClass}>{copy.eyebrow}</p>
            <h2 id="preconstruction-timeline-title" className={lightSectionTitleClass}>
              {copy.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">{copy.copy}</p>
          </div>

          <ol className="relative border-l border-[#D4AF37]/45 pl-7 sm:pl-9 lg:grid lg:grid-cols-5 lg:gap-0 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="relative pb-8 last:pb-0 lg:px-3 lg:pb-0 first:lg:pl-0 last:lg:pr-0">
                <span className="absolute -left-[2.08rem] top-0 flex h-3 w-3 rounded-full border-2 border-[#0A2540] bg-[#D4AF37] ring-4 ring-[#0A2540] sm:-left-[2.58rem] lg:-top-[2.45rem] lg:left-3 first:lg:left-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#D4AF37]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/66">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 border-t border-white/10 pt-5 text-sm font-semibold leading-6 text-[#F1D16A]">
          {copy.note}
        </p>
      </div>
    </section>
  );
}
