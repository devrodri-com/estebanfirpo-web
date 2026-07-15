import { ExternalLink } from "lucide-react";
import type { MiamiContent, MiamiMetricView } from "@/content/miami";
import { lightEyebrowClass, lightSectionTitleClass } from "./miami-styles";

type MiamiScaleProps = {
  copy: MiamiContent["scale"];
  metrics: MiamiMetricView[];
};

export function MiamiScale({ copy, metrics }: MiamiScaleProps) {
  return (
    <section
      data-miami-block="scale"
      aria-labelledby="miami-scale-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0A2540] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className={lightEyebrowClass}>{copy.eyebrow}</p>
          <h2 id="miami-scale-title" className={lightSectionTitleClass}>
            {copy.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/72">{copy.copy}</p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric) => (
            <li key={metric.id} className="flex min-h-64 flex-col bg-[#0A2540] p-6 sm:p-7">
              <p className="order-2 mt-4 text-sm font-semibold leading-6 text-white">
                {metric.label}
              </p>
              <p className="order-1 text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-[#E4C45C] tabular-nums xl:text-3xl 2xl:text-4xl">
                {metric.value}
              </p>
              <div className="order-3 mt-5 border-t border-white/12 pt-4 text-xs leading-5 text-white/60">
                <p>{metric.geography}</p>
                <p>{metric.period}</p>
              </div>
              <a
                href={metric.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="order-4 mt-auto inline-flex min-h-11 items-end gap-1.5 pt-5 text-xs font-semibold leading-5 text-white/72 underline decoration-white/35 underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
              >
                {metric.sourceName}
                <ExternalLink className="mb-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
