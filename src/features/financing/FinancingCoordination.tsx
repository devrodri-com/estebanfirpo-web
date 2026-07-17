import type { FinancingContent } from "@/content/financing";
import {
  lightEyebrowClass,
  lightSectionTitleClass,
} from "./financing-styles";

type FinancingCoordinationProps = {
  copy: FinancingContent["coordination"];
};

export function FinancingCoordination({ copy }: FinancingCoordinationProps) {
  return (
    <section
      data-financing-block="coordination"
      aria-labelledby="financing-coordination-title"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-[#0A2540] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className={lightEyebrowClass}>{copy.eyebrow}</p>
            <h2
              id="financing-coordination-title"
              className={lightSectionTitleClass}
            >
              {copy.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            {copy.copy}
          </p>
        </div>

        <ol className="mt-12 grid lg:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className={`border-t border-white/16 py-7 lg:border-t-0 lg:py-1 ${
                index === 0
                  ? "lg:pr-8"
                  : index === copy.steps.length - 1
                    ? "lg:border-l lg:pl-8"
                    : "lg:border-l lg:px-8"
              }`}
            >
              <span className="text-xs font-semibold tracking-[0.14em] text-[#E0C66B]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 border-t border-white/16 pt-8 sm:mt-12">
          <span className="mb-5 block h-px w-16 bg-[#D4AF37]" aria-hidden="true" />
          <p className="max-w-4xl text-pretty text-lg font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
            {copy.highlight}
          </p>
        </div>
      </div>
    </section>
  );
}
