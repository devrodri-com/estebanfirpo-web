"use client";

import { Search } from "lucide-react";
import { useId } from "react";
import { CatalogSelect } from "./CatalogSelect";
import { getCatalogCopy } from "./catalog-copy";
import {
  catalogSortOptions,
  type CatalogFilters,
  type CatalogLocale,
  type CatalogRentalFilter,
} from "./project-catalog-types";

export type CatalogFilterChangeReason = "search" | "price" | "discrete";

export interface RentalFilterOption {
  value: CatalogRentalFilter;
  count: number;
}

export interface ProjectCatalogFiltersProps {
  locale: CatalogLocale;
  value: CatalogFilters;
  rentalOptions: RentalFilterOption[];
  invalidRange: boolean;
  hasActiveFilters: boolean;
  onChange: (
    next: CatalogFilters,
    reason: CatalogFilterChangeReason,
  ) => void;
  onReset: () => void;
}

function displayThousands(value?: number): string {
  return typeof value === "number" ? String(Math.floor(value / 1000)) : "";
}

function parseThousands(value: string): number | undefined {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (!digits || Number(digits) === 0) return undefined;
  return Math.min(Number(digits), 100_000) * 1000;
}

export function ProjectCatalogFilters({
  locale,
  value,
  rentalOptions,
  invalidRange,
  hasActiveFilters,
  onChange,
  onReset,
}: ProjectCatalogFiltersProps) {
  const copy = getCatalogCopy(locale);
  const idPrefix = useId();
  const rangeErrorId = `${idPrefix}-price-range-error`;
  const pricesHelpId = `${idPrefix}-prices-help`;
  const priceDescription = invalidRange
    ? `${pricesHelpId} ${rangeErrorId}`
    : pricesHelpId;

  return (
    <aside
      aria-label={copy.filters}
      className="relative mx-auto rounded-[10px] bg-[#0A2540] p-4 text-white ring-1 ring-white/10 sm:p-5"
    >
      <div className="mb-3 h-[2px] w-full rounded-full bg-[linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,.45),rgba(212,175,55,0))]" />
      <div className="flex min-h-11 items-center justify-between gap-3">
        <p className="text-[13px] font-semibold text-white">{copy.filters}</p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 px-3 text-[12px] font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            {copy.reset}
          </button>
        ) : null}
      </div>

      <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block text-[12px] font-medium text-white/90 lg:col-span-1">
          {copy.search}
          <span className="relative mt-1 block">
            <input
              type="search"
              value={value.q}
              maxLength={120}
              onChange={(event) =>
                onChange({ ...value, q: event.target.value }, "search")
              }
              placeholder={copy.search}
              className="block min-h-11 w-full rounded-md border border-white/20 bg-white px-3 pr-10 text-sm text-[#0A2540] outline-none transition placeholder:text-black/40 focus:ring-2 focus:ring-[#D4AF37]/60"
            />
            <Search
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
              aria-hidden="true"
            />
          </span>
        </label>

        <CatalogSelect
          label={copy.rental}
          value={value.rental}
          options={rentalOptions.map((option) => ({
            ...option,
            label: copy.rentalLabel(option.value),
            countLabel: copy.projectCount(option.count),
          }))}
          onValueChange={(rental) =>
            onChange({ ...value, rental }, "discrete")
          }
        />

        <label className="block text-[12px] font-medium text-white/90">
          {copy.minPrice}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={displayThousands(value.min)}
            onChange={(event) =>
              onChange(
                { ...value, min: parseThousands(event.target.value) },
                "price",
              )
            }
            aria-invalid={invalidRange || undefined}
            aria-describedby={priceDescription}
            placeholder="500"
            className="mt-1 block min-h-11 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-[#0A2540] outline-none transition focus:ring-2 focus:ring-[#D4AF37]/60 aria-invalid:border-red-300 aria-invalid:ring-1 aria-invalid:ring-red-300"
          />
        </label>

        <label className="block text-[12px] font-medium text-white/90">
          {copy.maxPrice}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={displayThousands(value.max)}
            onChange={(event) =>
              onChange(
                { ...value, max: parseThousands(event.target.value) },
                "price",
              )
            }
            aria-invalid={invalidRange || undefined}
            aria-describedby={priceDescription}
            placeholder="800"
            className="mt-1 block min-h-11 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-[#0A2540] outline-none transition focus:ring-2 focus:ring-[#D4AF37]/60 aria-invalid:border-red-300 aria-invalid:ring-1 aria-invalid:ring-red-300"
          />
        </label>

        <CatalogSelect
          label={copy.sort}
          value={value.sort}
          options={catalogSortOptions.map((option) => ({
            value: option,
            label: copy.sortLabel(option),
          }))}
          onValueChange={(sort) => onChange({ ...value, sort }, "discrete")}
        />
      </div>

      <p id={pricesHelpId} className="mt-2 text-[11px] text-white/55">
        {copy.pricesHelp}
      </p>
      {invalidRange ? (
        <p
          id={rangeErrorId}
          role="alert"
          className="mt-2 rounded-md border border-red-200/40 bg-red-950/30 px-3 py-2 text-[12px] leading-relaxed text-white"
        >
          {copy.invalidRange}
        </p>
      ) : null}
    </aside>
  );
}
