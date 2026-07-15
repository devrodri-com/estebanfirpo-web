import Image from "next/image";
import { Building2, CircleDollarSign, Globe2, UsersRound, Waypoints } from "lucide-react";
import type { MiamiContent } from "@/content/miami";
import { eyebrowClass, sectionTitleClass } from "./miami-styles";

const pointIcons = [Globe2, CircleDollarSign, Waypoints, Building2, UsersRound] as const;

type MiamiGlobalPlatformProps = {
  copy: MiamiContent["globalPlatform"];
};

export function MiamiGlobalPlatform({ copy }: MiamiGlobalPlatformProps) {
  return (
    <section
      data-miami-block="global-platform"
      aria-labelledby="miami-global-title"
      className="py-16 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14">
        <div>
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="miami-global-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#0D1521]/72">{copy.copy}</p>
          <p className="mt-6 border-l-2 border-[#D4AF37] pl-4 text-base font-semibold leading-7 text-[#0A2540]">
            {copy.highlight}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {copy.points.map((point, index) => {
              const Icon = pointIcons[index];
              return (
                <li key={point} className="flex min-h-14 items-center gap-3 rounded-xl border border-[#0A2540]/10 bg-white px-4 py-3 text-sm font-semibold leading-5 text-[#0A2540]">
                  <Icon className="h-4 w-4 shrink-0 text-[#9A7415]" aria-hidden="true" />
                  {point}
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-[#F6F5F0] shadow-[0_18px_55px_rgba(10,37,64,0.08)]">
          <Image
            src="/images/miami/miami-global-connections-editorial.jpg"
            alt={copy.imageAlt}
            width={1448}
            height={1086}
            loading="lazy"
            sizes="(min-width: 1280px) 616px, (min-width: 1024px) 53vw, calc(100vw - 2rem)"
            className="h-auto w-full object-contain"
          />
        </figure>
      </div>
    </section>
  );
}
