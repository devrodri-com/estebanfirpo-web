import { Compass, Route, Scale, Target } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getHomeContent } from "@/content/home";

type HomeDecisionsProps = {
  locale: Locale;
};

const decisionIcons = [Target, Compass, Scale, Route] as const;

export function HomeDecisions({ locale }: HomeDecisionsProps) {
  const copy = getHomeContent(locale).decisions;

  return (
    <section
      id="asesoramiento"
      aria-labelledby="home-decisions-title"
      tabIndex={-1}
      className="scroll-mt-20 py-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2540]/65">
            {copy.eyebrow}
          </p>
          <h2
            id="home-decisions-title"
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#0A2540] sm:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#0D1521]/70">{copy.copy}</p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {copy.items.map((item, index) => {
            const Icon = decisionIcons[index];
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-[#0A2540]/10 bg-white p-6 shadow-[0_8px_30px_rgba(10,37,64,0.05)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2540] text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-[#0A2540]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#0D1521]/68">{item.copy}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
