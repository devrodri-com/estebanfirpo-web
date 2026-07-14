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
              <th scope="col" className="w-[22%] px-5 py-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                <span className="sr-only">Variable</span>
              </th>
              <th scope="col" className="w-[39%] border-l border-white/10 px-5 py-5 text-sm font-semibold">
                {copy.preconstructionLabel}
              </th>
              <th scope="col" className="w-[39%] border-l border-white/10 px-5 py-5 text-sm font-semibold">
                {copy.completedLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0A2540]/8">
            {copy.rows.map((row) => (
              <tr key={row.label} className="align-top odd:bg-[#FBFAF7]">
                <th scope="row" className="px-5 py-4 text-left text-sm font-semibold leading-6 text-[#0A2540]">
                  {row.label}
                </th>
                <td className="border-l border-[#0A2540]/8 px-5 py-4 text-sm leading-6 text-[#0D1521]/72">
                  {row.preconstruction}
                </td>
                <td className="border-l border-[#0A2540]/8 px-5 py-4 text-sm leading-6 text-[#0D1521]/68">
                  {row.completed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="divide-y divide-[#0A2540]/10 md:hidden">
          {copy.rows.map((row) => (
            <div key={row.label} className="p-5 odd:bg-[#FBFAF7]">
              <dt className="text-sm font-semibold text-[#0A2540]">{row.label}</dt>
              <dd className="mt-4 grid gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#755B14]">
                    {copy.preconstructionLabel}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#0D1521]/74">{row.preconstruction}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0A2540]/72">
                    {copy.completedLabel}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#0D1521]/68">{row.completed}</p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-6 max-w-3xl border-l-2 border-[#D4AF37] pl-4 text-sm leading-6 text-[#0D1521]/70">
        {copy.fitNote}
      </p>
    </section>
  );
}
