import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { ProjectCatalogClient } from "@/features/catalog/ProjectCatalogClient";
import {
  createCatalogInitialState,
  toCatalogURLSearchParams,
  type CatalogPageSearchParams,
} from "@/features/catalog/catalog-initial-state";
import { getProjectCatalogCardViewModels } from "@/features/catalog/server/get-project-catalog";

export const dynamic = "auto";

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<CatalogPageSearchParams>;
}) {
  const [{ locale: rawLocale }, rawSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  if (!isLocale(rawLocale)) notFound();

  const projects = getProjectCatalogCardViewModels(rawLocale);
  const initialState = createCatalogInitialState(
    projects,
    rawLocale,
    toCatalogURLSearchParams(rawSearchParams),
  );

  return (
    <ProjectCatalogClient
      locale={rawLocale}
      projects={projects}
      initialFilters={initialState.filters}
      initialQueryKey={initialState.sourceQueryKey}
    />
  );
}
