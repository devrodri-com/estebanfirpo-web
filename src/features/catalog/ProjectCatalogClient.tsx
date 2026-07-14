"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { CatalogProjectCard } from "./CatalogProjectCard";
import { getCatalogCopy } from "./catalog-copy";
import {
  createCatalogHref,
  createCatalogSearchParams,
  parseCatalogFilters,
} from "./catalog-query";
import {
  filterAndSortCatalogProjects,
  hasInvalidPriceRange,
} from "./catalog-search";
import { ProjectCatalogDrawer } from "./ProjectCatalogDrawer";
import {
  ProjectCatalogFilters,
  type CatalogFilterChangeReason,
  type RentalFilterOption,
} from "./ProjectCatalogFilters";
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogFilters,
  type CatalogLocale,
  type CatalogRentalFilter,
  type ProjectCatalogCardViewModel,
} from "./project-catalog-types";

interface ProjectCatalogClientProps {
  locale: CatalogLocale;
  projects: ProjectCatalogCardViewModel[];
}

type ActiveFilterKey = "q" | "rental" | "min" | "max" | "sort";

interface ActiveFilterChip {
  key: ActiveFilterKey;
  label: string;
}

const URL_DEBOUNCE_MS = 300;

function countActiveFilters(filters: CatalogFilters): number {
  return [
    Boolean(filters.q.trim()),
    filters.rental !== DEFAULT_CATALOG_FILTERS.rental,
    typeof filters.min === "number",
    typeof filters.max === "number",
    filters.sort !== DEFAULT_CATALOG_FILTERS.sort,
  ].filter(Boolean).length;
}

export function ProjectCatalogClient({
  locale,
  projects,
}: ProjectCatalogClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();
  const copy = getCatalogCopy(locale);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rentalCounts = useMemo(() => {
    const counts: Record<CatalogRentalFilter, number> = {
      all: projects.length,
      flexible: 0,
      "30-days": 0,
      "60-days": 0,
      "90-days": 0,
      traditional: 0,
    };
    projects.forEach((project) => {
      if (project.rentalCategory) counts[project.rentalCategory] += 1;
    });
    return counts;
  }, [projects]);

  const sanitizeForAvailableRentals = useCallback(
    (next: CatalogFilters): CatalogFilters => {
      if (
        next.rental !== "all" &&
        rentalCounts[next.rental] === 0
      ) {
        return { ...next, rental: "all" };
      }
      return next;
    },
    [rentalCounts],
  );

  // Keep the prerendered markup and the first client render identical. The
  // locale layout is force-static, so URL state is applied immediately after
  // hydration instead of being read into the initial render.
  const [filters, setFilters] = useState<CatalogFilters>(
    DEFAULT_CATALOG_FILTERS,
  );

  const rentalOptions = useMemo<RentalFilterOption[]>(() => {
    const values: CatalogRentalFilter[] = [
      "all",
      "flexible",
      "30-days",
      "60-days",
      "90-days",
      "traditional",
    ];
    return values
      .filter((value) => value === "all" || rentalCounts[value] > 0)
      .map((value) => ({ value, count: rentalCounts[value] }));
  }, [rentalCounts]);

  const navigateToFilters = useCallback(
    (next: CatalogFilters, mode: "push" | "replace") => {
      const href = createCatalogHref(
        pathname,
        next,
        new URLSearchParams(searchParams.toString()),
      );
      if (mode === "push") router.push(href, { scroll: false });
      else router.replace(href, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const parsed = sanitizeForAvailableRentals(
      parseCatalogFilters(new URLSearchParams(queryKey)),
    );
    setFilters(parsed);

    const canonical = createCatalogSearchParams(
      parsed,
      new URLSearchParams(queryKey),
    ).toString();
    if (canonical !== queryKey) {
      const href = canonical ? `${pathname}?${canonical}` : pathname;
      router.replace(href, { scroll: false });
    }
  }, [pathname, queryKey, router, sanitizeForAvailableRentals]);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  const updateFilters = useCallback(
    (next: CatalogFilters, reason: CatalogFilterChangeReason) => {
      const sanitized = sanitizeForAvailableRentals(next);
      setFilters(sanitized);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = null;

      if (reason === "discrete") {
        navigateToFilters(sanitized, "push");
        return;
      }

      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        navigateToFilters(sanitized, "replace");
      }, URL_DEBOUNCE_MS);
    },
    [navigateToFilters, sanitizeForAvailableRentals],
  );

  const resetFilters = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = null;
    setFilters(DEFAULT_CATALOG_FILTERS);
    navigateToFilters(DEFAULT_CATALOG_FILTERS, "push");
  }, [navigateToFilters]);

  const invalidRange = hasInvalidPriceRange(filters);
  const results = useMemo(
    () => filterAndSortCatalogProjects(projects, filters, locale),
    [filters, locale, projects],
  );
  const activeFilterCount = countActiveFilters(filters);
  const hasActiveFilters = activeFilterCount > 0;
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const chips = useMemo<ActiveFilterChip[]>(() => {
    const values: ActiveFilterChip[] = [];
    if (filters.q.trim()) {
      values.push({ key: "q", label: copy.searchChip(filters.q.trim()) });
    }
    if (filters.rental !== "all") {
      values.push({
        key: "rental",
        label: copy.rentalLabel(filters.rental),
      });
    }
    if (typeof filters.min === "number") {
      values.push({
        key: "min",
        label: copy.minChip(currency.format(filters.min)),
      });
    }
    if (typeof filters.max === "number") {
      values.push({
        key: "max",
        label: copy.maxChip(currency.format(filters.max)),
      });
    }
    if (filters.sort !== "alpha-asc") {
      values.push({ key: "sort", label: copy.sortLabel(filters.sort) });
    }
    return values;
  }, [copy, currency, filters]);

  const removeFilter = useCallback(
    (key: ActiveFilterKey) => {
      const next: CatalogFilters = { ...filters };
      if (key === "q") next.q = "";
      if (key === "rental") next.rental = "all";
      if (key === "min") delete next.min;
      if (key === "max") delete next.max;
      if (key === "sort") next.sort = "alpha-asc";
      updateFilters(next, "discrete");
    },
    [filters, updateFilters],
  );

  const filterProps = {
    locale,
    value: filters,
    rentalOptions,
    invalidRange,
    hasActiveFilters,
    onChange: updateFilters,
    onReset: resetFilters,
  };

  return (
    <section className="py-8 sm:py-12" aria-labelledby="catalog-title">
      <div className="flex items-center justify-between gap-4">
        <h1
          id="catalog-title"
          className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl"
        >
          {copy.title}
        </h1>
        <ProjectCatalogDrawer
          {...filterProps}
          resultCount={results.length}
          activeFilterCount={activeFilterCount}
        />
      </div>

      <div className="mt-5 hidden sm:block">
        <ProjectCatalogFilters {...filterProps} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p
          className="text-sm font-semibold text-[#0A2540]"
          aria-live="polite"
          aria-atomic="true"
        >
          {copy.projectCount(results.length)}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center justify-center rounded-md px-2 text-sm font-medium text-[#0A2540] underline decoration-[#D4AF37] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            {copy.reset}
          </button>
        ) : null}
      </div>

      {chips.length ? (
        <div className="mt-3" aria-label={copy.activeFilters}>
          <ul className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={() => removeFilter(chip.key)}
                  aria-label={`${copy.removeFilter}: ${chip.label}`}
                  className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-[#0A2540]/15 bg-white px-3 py-2 text-left text-xs font-medium text-[#0A2540] transition hover:bg-[#F4F1E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                >
                  <span className="break-words">{chip.label}</span>
                  <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {results.length ? (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {results.map((project, index) => (
            <CatalogProjectCard
              key={project.slug}
              project={project}
              prioritizeImage={index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[14px] border border-[#0A2540]/12 bg-white px-5 py-12 text-center sm:px-8">
          <h2 className="text-xl font-semibold text-[#0A2540]">
            {copy.noResults}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#0A2540]/70">
            {copy.noResultsHelp}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            {copy.reset}
          </button>
        </div>
      )}
    </section>
  );
}
