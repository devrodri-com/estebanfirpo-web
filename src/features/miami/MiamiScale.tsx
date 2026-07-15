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
              <div className="order-3 mt-auto border-t border-white/12 pt-4 text-xs leading-5 text-white/60">
                <p>{metric.geography}</p>
                <p>{metric.period}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-white/16 pt-5 text-xs leading-5 text-white/72">
          <p>{copy.verificationNote}</p>
          <details className="mt-2">
            <summary className="min-h-11 cursor-pointer py-3 font-semibold text-white/88 underline decoration-white/35 underline-offset-4 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]">
              {copy.sourcesSummary}
            </summary>
            <ul className="mt-4 grid gap-x-8 gap-y-5 border-t border-white/12 pt-5 md:grid-cols-2">
              {metrics.map((metric) => (
                <li key={metric.id} className="min-w-0">
                  <p className="font-semibold text-white/88">
                    <span className="text-[#E4C45C]">{metric.value}</span>
                    <span aria-hidden="true"> · </span>
                    {metric.label}
                  </p>
                  <dl className="mt-1 space-y-0.5 text-white/68">
                    <div className="flex flex-wrap gap-x-1.5">
                      <dt className="font-semibold text-white/82">{copy.sourceLabel}:</dt>
                      <dd>{metric.sourceName}</dd>
                    </div>
                    <div className="flex flex-wrap gap-x-1.5">
                      <dt className="font-semibold text-white/82">{copy.geographyLabel}:</dt>
                      <dd>{metric.geography}</dd>
                    </div>
                    <div className="flex flex-wrap gap-x-1.5">
                      <dt className="font-semibold text-white/82">{copy.periodLabel}:</dt>
                      <dd>{metric.period}</dd>
                    </div>
                    <div className="flex flex-wrap gap-x-1.5">
                      <dt className="font-semibold text-white/82">{copy.verifiedLabel}:</dt>
                      <dd>{metric.verifiedAt}</dd>
                    </div>
                  </dl>
                  {metric.methodologyNote ? (
                    <p className="mt-2 text-white/68">
                      <span className="font-semibold text-white/82">{copy.methodologyLabel}: </span>
                      {metric.methodologyNote}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
