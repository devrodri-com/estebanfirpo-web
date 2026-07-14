import { Check, Clock3 } from "lucide-react";
import type { PreconstructionContent } from "@/content/preconstruction";
import { lightEyebrowClass, lightSectionTitleClass } from "./preconstruction-styles";

type PreconstructionBuyerFitProps = {
  copy: PreconstructionContent["fit"];
};

export function PreconstructionBuyerFit({ copy }: PreconstructionBuyerFitProps) {
  return (
    <section
      data-preconstruction-block="buyer-fit"
      aria-labelledby="preconstruction-fit-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0A2540] text-white"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className={lightEyebrowClass}>{copy.eyebrow}</p>
          <h2 id="preconstruction-fit-title" className={lightSectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">{copy.copy}</p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 lg:grid-cols-2">
          <article className="bg-[#0B1F3A] p-6 sm:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A2540]">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
              {copy.preconstructionTitle}
            </h3>
            <ul className="mt-6 space-y-3">
              {copy.preconstructionItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/72">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-[#102B47] p-6 sm:p-8">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
              {copy.completedTitle}
            </h3>
            <ul className="mt-6 space-y-3">
              {copy.completedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
