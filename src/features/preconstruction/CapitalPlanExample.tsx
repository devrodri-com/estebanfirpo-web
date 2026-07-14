import type { PreconstructionContent } from "@/content/preconstruction";
import { eyebrowClass, sectionTitleClass } from "./preconstruction-styles";

const segmentClasses = [
  "bg-[#D4AF37] text-[#0A2540]",
  "bg-[#C7AE5B] text-[#0A2540]",
  "bg-[#A99455] text-[#0A2540]",
  "bg-[#0A2540] text-white",
] as const;

type CapitalPlanExampleProps = {
  copy: PreconstructionContent["capital"];
};

export function CapitalPlanExample({ copy }: CapitalPlanExampleProps) {
  return (
    <section
      data-preconstruction-block="capital"
      aria-labelledby="preconstruction-capital-title"
      className="py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
        <div>
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="preconstruction-capital-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-white p-6 shadow-[0_18px_55px_rgba(10,37,64,0.08)] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0A2540]/70">
            {copy.examplePrice}
          </p>

          <div
            className="mt-6 flex h-14 overflow-hidden rounded-lg ring-1 ring-[#0A2540]/10"
            aria-label={copy.examplePrice}
          >
            {copy.segments.map((segment, index) => (
              <div
                key={segment.label}
                style={{ width: `${segment.width}%` }}
                className={`flex min-w-0 items-center justify-center border-r border-white/45 px-1 text-[11px] font-bold last:border-r-0 sm:text-sm ${segmentClasses[index]}`}
                title={`${segment.label}: ${segment.value}`}
              >
                {segment.value}
              </div>
            ))}
          </div>

          <dl className="mt-6 grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {copy.segments.map((segment, index) => (
              <div key={segment.label}>
                <dt className="flex items-start gap-3 text-xs font-medium leading-5 text-[#0D1521]/70">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-sm ${segmentClasses[index].split(" ")[0]}`}
                    aria-hidden="true"
                  />
                  {segment.label}
                </dt>
                <dd className="mt-0.5 pl-6 text-base font-semibold text-[#0A2540]">{segment.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-7 border-t border-[#0A2540]/10 pt-6 text-sm leading-6 text-[#0D1521]/72">
            {copy.explanation}
          </p>
          <p className="mt-4 border-l-2 border-[#D4AF37] pl-4 text-sm font-semibold leading-6 text-[#0A2540]">
            {copy.opportunity}
          </p>
          <p className="mt-3 text-xs font-medium leading-5 text-[#0A2540]/72">{copy.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
