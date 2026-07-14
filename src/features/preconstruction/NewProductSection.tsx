import Image from "next/image";
import { Check } from "lucide-react";
import type { PreconstructionContent } from "@/content/preconstruction";
import { eyebrowClass, sectionTitleClass } from "./preconstruction-styles";

type NewProductSectionProps = {
  copy: PreconstructionContent["newProduct"];
};

export function NewProductSection({ copy }: NewProductSectionProps) {
  return (
    <section
      data-preconstruction-block="new-product"
      aria-labelledby="preconstruction-new-product-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#0A2540]/8 bg-[#F1EEE7]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#E6E1D7] shadow-[0_20px_60px_rgba(10,37,64,0.11)] sm:aspect-[3/2] lg:aspect-[4/5]">
            <Image
              src="/images/miami-hero.jpg"
              alt={copy.imageAlt}
              fill
              sizes="(min-width: 1024px) 47vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 max-w-xl text-xs leading-5 text-[#0A2540]/72">
            {copy.imageCaption}
          </figcaption>
        </figure>

        <div>
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="preconstruction-new-product-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#0D1521]/72">{copy.copy}</p>

          <ul className="mt-8 divide-y divide-[#0A2540]/10 border-y border-[#0A2540]/10">
            {copy.points.map((point) => (
              <li key={point} className="flex items-start gap-3 py-4 text-sm leading-6 text-[#0D1521]/76">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-white">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-6 border-l-2 border-[#D4AF37] pl-4 text-sm leading-6 text-[#0D1521]/68">
            {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}
