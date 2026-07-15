import { Building2, CircleDollarSign, Globe2, UsersRound, Waypoints } from "lucide-react";
import type { MiamiContent } from "@/content/miami";
import { eyebrowClass, sectionTitleClass } from "./miami-styles";
import { MiamiConnectionsGraphic } from "./MiamiConnectionsGraphic";

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

        <MiamiConnectionsGraphic
          title={copy.visualTitle}
          description={copy.visualDescription}
          centerLabel={copy.centerLabel}
          regions={copy.regions}
        />
      </div>
    </section>
  );
}
