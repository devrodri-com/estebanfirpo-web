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

        <ol className="mt-12 grid lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li
              key={step.title}
              className={`border-t border-white/16 py-7 lg:border-l lg:border-t-0 lg:px-7 lg:py-2 ${
                index === 0 ? "lg:border-l-0 lg:pl-0" : ""
              } ${index === copy.steps.length - 1 ? "lg:pr-0" : ""}`}
            >
              <span className="text-xs font-semibold tracking-[0.16em] text-[#E4C45C]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.02em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/68">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-3xl border-t border-white/16 pt-8">
          <span className="block h-px w-12 bg-[#D4AF37]" aria-hidden="true" />
          <p className="mt-5 text-xl font-semibold leading-8 tracking-[-0.02em] text-white sm:text-2xl">
            {copy.highlight}
          </p>
        </div>
      </div>
    </section>
  );
}
