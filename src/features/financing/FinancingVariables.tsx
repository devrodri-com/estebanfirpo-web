import type { FinancingContent } from "@/content/financing";
import { eyebrowClass, sectionTitleClass } from "./financing-styles";

type FinancingVariablesProps = {
  copy: FinancingContent["variables"];
};

export function FinancingVariables({ copy }: FinancingVariablesProps) {
  return (
    <section
      data-financing-block="variables"
      aria-labelledby="financing-variables-title"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="max-w-xl">
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="financing-variables-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-[#0D1521]/72 sm:text-lg sm:leading-8">
            {copy.copy}
          </p>
        </div>

        <ol className="divide-y divide-[#0A2540]/12 border-y border-[#0A2540]/12">
          {copy.items.map((item, index) => (
            <li
              key={item.title}
              className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-4 py-6 sm:py-7"
            >
              <span className="pt-1 text-xs font-semibold tracking-[0.14em] text-[#755B14]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-[-0.015em] text-[#0A2540]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#0D1521]/68 sm:text-base sm:leading-7">
                  {item.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
