// src/components/HighlightsBlock.tsx
import React from "react";  

/** Conjunto de íconos soportados. Ampliable sin romper API. */
type IconKey =
  | "pool"
  | "beach"
  | "rooftop"
  | "cowork"
  | "gym"
  | "yoga"
  | "sofa"
  | "furniture"
  | "pet"
  | "view"
  | "sparkles"
  | "location"
  | "coffee"
  | "portal"
  | "spa"
  | "dock";

/** Item puede venir como string (solo título) o como objeto enriquecido. */
export type HighlightItem = {
  title: string;
  desc?: string;
  /** Si querés forzar un ícono particular. */
  iconKey?: IconKey;
  /** Permite sobreescribir completamente el ícono. */
  icon?: React.ReactNode | string;
};

export default function HighlightsBlock({
  items,
  title,
  headingIcon,
  emptyLabel,
  className = "",
}: {
  items: Array<string | HighlightItem>;
  title?: string;
  headingIcon?: React.ReactNode;
  emptyLabel?: React.ReactNode;
  className?: string;
}) {
  const normalized = items.map((it) =>
    typeof it === "string" ? ({ title: it } as HighlightItem) : it
  );

  return (
    <section className={"mt-10 rounded-[10px] bg-[#0A2540] p-6 sm:p-7 max-w-[1100px] mx-auto ring-1 ring-white/10 text-white relative overflow-hidden " + className}>
      <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 top-0 h-[1.5px] rounded-full" style={{background:'linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,.25), rgba(212,175,55,0))'}} />
      {title ? (
        <h2 id="highlights-heading" className="mb-2.5 flex items-center gap-2 text-[16px] sm:text-[17px] font-semibold tracking-tight text-white">
          {headingIcon ?? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
              <path d="M18 14l.8 1.8L21 16l-1.8.8L18 19l-.8-2.2L15 16l2.2-.2L18 14z" />
            </svg>
          )}
          {title}
        </h2>
      ) : null}
      {normalized.length > 0 ? (
        <ul className="mt-2 sm:mt-3 space-y-[11px] max-w-[1000px] lg:max-w-[960px] mx-auto" role="list" aria-labelledby="highlights-heading">
          {normalized.map((it, i) => (
            <li key={`${it.title}-${i}`} role="listitem" className="flex items-start gap-3">
              <span className="relative top-[9px] sm:top-[9px] inline-block h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] rounded-full bg-[#D4AF37] flex-shrink-0" aria-hidden />
              <div>
                <p className="text-[16px] leading-[26px] text-white/95">{it.title}</p>
                {it.desc ? (
                  <p className="mt-0.5 text-[13px] leading-6 text-white/70">{it.desc}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : emptyLabel ? (
        <p className="mt-3 text-sm leading-6 text-white/75">{emptyLabel}</p>
      ) : null}
    </section>
  );
}
