import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { ProjectCatalogClient } from "@/features/catalog/ProjectCatalogClient";
import { ProjectCatalogFallback } from "@/features/catalog/ProjectCatalogFallback";
import { getProjectCatalogCardViewModels } from "@/features/catalog/server/get-project-catalog";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const projects = getProjectCatalogCardViewModels(rawLocale);

  return (
    <Suspense
      fallback={
        <ProjectCatalogFallback locale={rawLocale} projects={projects} />
      }
    >
      <ProjectCatalogClient locale={rawLocale} projects={projects} />
    </Suspense>
  );
}
