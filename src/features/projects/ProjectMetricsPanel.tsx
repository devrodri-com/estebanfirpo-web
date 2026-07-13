import { Building2 } from "lucide-react";
import type { CanonicalProjectMetric } from "./project-view-model";

export default function ProjectMetricsPanel({
  title,
  metrics,
  note,
}: {
  title: string;
  metrics: readonly CanonicalProjectMetric[];
  note?: string;
}) {
  if (metrics.length === 0) return null;

  return (
    <section
      aria-labelledby="project-metrics-heading"
      className="mt-10 rounded-[12px] border border-[#0A2540]/12 bg-white p-6 shadow-[0_1px_3px_rgba(10,37,64,0.05)] sm:p-7"
    >
      <div className="flex items-center gap-2 text-[#0A2540]">
        <Building2
          className="h-5 w-5 shrink-0 text-[#D4AF37]"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <h2 id="project-metrics-heading" className="text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
      </div>

      <dl
        className="mt-5 grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))" }}
      >
        {metrics.map((metric) => (
          <div key={metric.id} className="rounded-[10px] bg-[#F6F5F0] p-4 text-[#0A2540]">
            {metric.label ? (
              <dt className="text-xs font-medium text-[#0A2540]/70">{metric.label}</dt>
            ) : (
              <dt className="sr-only">{title}</dt>
            )}
            <dd
              className={
                metric.label
                  ? "mt-1 text-xl font-semibold tracking-tight"
                  : "text-base font-semibold leading-6 tracking-tight"
              }
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      {note ? <p className="mt-4 text-xs leading-5 text-[#0D1521]/60">{note}</p> : null}
    </section>
  );
}
