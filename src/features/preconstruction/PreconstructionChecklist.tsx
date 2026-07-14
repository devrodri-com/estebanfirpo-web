import { Check } from "lucide-react";
import type { PreconstructionContent } from "@/content/preconstruction";
import { eyebrowClass, sectionTitleClass } from "./preconstruction-styles";

type PreconstructionChecklistProps = {
  copy: PreconstructionContent["checklist"];
};

export function PreconstructionChecklist({ copy }: PreconstructionChecklistProps) {
  return (
    <section
      data-preconstruction-block="checklist"
      aria-labelledby="preconstruction-checklist-title"
      className="py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="preconstruction-checklist-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
          <p className="mt-7 max-w-xl text-sm leading-6 text-[#0D1521]/62">{copy.closingCopy}</p>
        </div>

        <ol className="grid gap-x-8 border-y border-[#0A2540]/10 sm:grid-cols-2">
          {copy.items.map((item, index) => (
            <li key={item} className="flex items-start gap-3 border-b border-[#0A2540]/8 py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#F6F5F0] text-[#0A2540]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-6 text-[#0A2540]">
                <span className="sr-only">{index + 1}. </span>
                {item}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
