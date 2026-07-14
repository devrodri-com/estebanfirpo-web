import { Check } from "lucide-react";
import type { PreconstructionContent } from "@/content/preconstruction";
import { eyebrowClass, sectionTitleClass } from "./preconstruction-styles";

type PreconstructionComparisonProps = {
  copy: PreconstructionContent["comparison"];
};

export function PreconstructionComparison({ copy }: PreconstructionComparisonProps) {
  return (
    <section
      data-preconstruction-block="comparison"
      aria-labelledby="preconstruction-comparison-title"
      className="py-16 sm:py-24"
    >
      <div className="max-w-3xl">
        <p className={eyebrowClass}>{copy.eyebrow}</p>
        <h2 id="preconstruction-comparison-title" className={sectionTitleClass}>
          {copy.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-white shadow-[0_12px_40px_rgba(10,37,64,0.06)]">
        <table className="hidden w-full table-fixed border-collapse md:table">
          <caption className="sr-only">{copy.title}</caption>
          <thead className="bg-[#0A2540] text-left text-white">
            <tr>
              <th scope="col" className="w-[24%] px-5 py-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                {copy.variableLabel}
              </th>
              <th scope="col" className="w-[76%] border-l border-white/10 px-5 py-5 text-sm font-semibold text-[#F1D16A]">
                {copy.advantageLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0A2540]/8">
            {copy.rows.map((row) => (
              <tr key={row.label} className="align-top">
                <th scope="row" className="bg-[#FBFAF7] px-5 py-4 text-left text-sm font-semibold leading-6 text-[#0A2540]">
                  {row.label}
                </th>
                <td className="border-l border-[#0A2540]/8 bg-[#F6F5F0] px-5 py-4 text-sm leading-6 text-[#0D1521]/76">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-white">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {row.advantage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="divide-y divide-[#0A2540]/10 md:hidden">
          {copy.rows.map((row) => (
            <div key={row.label} className="p-5 odd:bg-[#FBFAF7]">
              <dt className="text-sm font-semibold text-[#0A2540]">{row.label}</dt>
              <dd className="mt-3 flex items-start gap-3 text-sm leading-6 text-[#0D1521]/74">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {row.advantage}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
