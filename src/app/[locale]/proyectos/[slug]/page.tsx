import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PUBLIC_PROJECT_SLUGS } from "@/data/projects/public-slugs.generated";
import CanonicalProjectPage from "@/features/projects/CanonicalProjectPage";
import { getCanonicalProject } from "@/features/projects/server/get-canonical-project";
import { isLocale } from "@/i18n/config";
import { createProjectMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLIC_PROJECT_SLUGS.map((slug) => ({
    slug: slug.slice("/proyectos/".length),
  }));
}

function notFoundMetadata(isEnglish: boolean): Metadata {
  return {
    title: {
      absolute: isEnglish
        ? "Project not found | Esteban Firpo"
        : "Proyecto no encontrado | Esteban Firpo",
    },
    robots: { index: false, follow: false },
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    return notFoundMetadata(false);
  }

  const model = getCanonicalProject(slug, rawLocale);
  if (!model) {
    return notFoundMetadata(rawLocale === "en");
  }

  return createProjectMetadata({
    rawLocale,
    slug,
    name: model.identity.name,
    city: model.location.display,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) notFound();

  const model = getCanonicalProject(slug, rawLocale);
  if (!model) notFound();

  return <CanonicalProjectPage model={model} />;
}
