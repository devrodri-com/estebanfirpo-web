"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

type MapStatus = "loading" | "loaded" | "failed";

export default function ProjectLocationMap({
  displayLocation,
  query,
  interactive,
  locale,
  title,
  openLabel,
  loadingLabel,
  unavailableLabel,
}: {
  displayLocation: string;
  query: string;
  interactive: boolean;
  locale: "es" | "en";
  title: string;
  openLabel: string;
  loadingLabel: string;
  unavailableLabel: string;
}) {
  const [status, setStatus] = useState<MapStatus>("loading");
  const normalizedQuery = query.trim();
  const hasQuery = normalizedQuery.length > 0;
  const mapSrc = interactive && hasQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(normalizedQuery)}&hl=${locale}&z=16&output=embed`
    : null;
  const externalHref = hasQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(normalizedQuery)}`
    : "https://www.google.com/maps";
  const showFallback = !mapSrc || status !== "loaded";

  return (
    <div
      className="relative h-80 overflow-hidden bg-[#F6F5F0] sm:h-[22rem] lg:h-full lg:min-h-[22rem]"
      aria-busy={Boolean(mapSrc) && status === "loading"}
      data-map-query={normalizedQuery || undefined}
    >
      <div
        aria-hidden={!showFallback}
        className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-opacity ${
          showFallback ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="max-w-sm text-[#0A2540]">
          <MapPin
            className="mx-auto h-7 w-7 text-[#D4AF37]"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <p className="mt-3 text-sm font-semibold leading-6">
            {status === "failed" || !mapSrc ? unavailableLabel : loadingLabel}
          </p>
          {displayLocation ? (
            <p className="mt-1 text-xs leading-5 text-[#0D1521]/60">{displayLocation}</p>
          ) : null}
        </div>
      </div>

      {mapSrc && status !== "failed" ? (
        <iframe
          src={mapSrc}
          title={title}
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={status === "loaded" ? 0 : -1}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
        />
      ) : null}

      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-3 z-10 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-3.5 text-sm font-semibold text-[#0A2540] no-underline shadow-[0_4px_18px_rgba(10,37,64,0.18)] ring-1 ring-[#0A2540]/15 transition hover:bg-[#F6F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#D4AF37]"
        aria-label={`${openLabel}: ${displayLocation || title}`}
      >
        <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        {openLabel}
      </a>
    </div>
  );
}
