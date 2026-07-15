import { Building2, Plane, Ship, TrainFront } from "lucide-react";
import type { MiamiContent } from "@/content/miami";
import { eyebrowClass, sectionTitleClass } from "./miami-styles";

const icons = [Plane, Ship, TrainFront, Building2] as const;

type MiamiInfrastructureProps = {
  copy: MiamiContent["infrastructure"];
};

export function MiamiInfrastructure({ copy }: MiamiInfrastructureProps) {
  return (
    <section
      data-miami-block="infrastructure"
      aria-labelledby="miami-infrastructure-title"
      className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#0A2540]/8 bg-[#F6F5F0]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className={eyebrowClass}>{copy.eyebrow}</p>
          <h2 id="miami-infrastructure-title" className={sectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
        </div>

        <div className="relative mt-12">
          <span className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-[#0A2540]/18 lg:block" aria-hidden="true" />
          <ol className="grid gap-4 lg:grid-cols-4 lg:gap-6">
            {copy.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <li key={item.title} className="relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-[#0A2540]/10 bg-white p-5 shadow-[0_10px_35px_rgba(10,37,64,0.045)] lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                  <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#F6F5F0] bg-[#0A2540] text-[#E4C45C] lg:mx-auto">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="lg:mt-6 lg:text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#755B14]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-[#0A2540]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#0D1521]/68">{item.copy}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
