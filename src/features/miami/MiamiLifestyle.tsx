import Image from "next/image";
import { Check } from "lucide-react";
import type { MiamiContent } from "@/content/miami";
import { eyebrowClass, sectionTitleClass } from "./miami-styles";

type MiamiLifestyleProps = {
  copy: MiamiContent["lifestyle"];
};

export function MiamiLifestyle({ copy }: MiamiLifestyleProps) {
  return (
    <section
      data-miami-block="lifestyle"
      aria-labelledby="miami-lifestyle-title"
      className="py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F6F5F0] shadow-[0_24px_70px_rgba(10,37,64,0.13)] lg:max-w-[470px]">
          <Image
            src="/images/miami/miami-lifestyle-demand-editorial.jpg"
            alt={copy.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 470px, calc(100vw - 32px)"
            className="object-cover object-[center_58%]"
          />
        </div>

        <div>
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="miami-lifestyle-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#0D1521]/72">{copy.copy}</p>

          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {copy.points.map((point) => (
              <li key={point} className="flex min-h-12 items-start gap-3 border-b border-[#0A2540]/10 py-3 text-sm font-semibold leading-6 text-[#0A2540]">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-[#E4C45C]">
                  <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
