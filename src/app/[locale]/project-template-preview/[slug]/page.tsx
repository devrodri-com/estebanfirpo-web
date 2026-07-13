import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PUBLIC_PROJECT_SLUGS } from "@/data/projects/public-slugs.generated";
import CanonicalProjectPage from "@/features/projects/CanonicalProjectPage";
import { getCanonicalProject } from "@/features/projects/server/get-canonical-project";
import { isLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/metadata";

type PreviewPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLIC_PROJECT_SLUGS.map((slug) => ({
    slug: slug.slice("/proyectos/".length),
  }));
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";
  const model = getCanonicalProject(slug, locale);

  if (!model) {
    return {
      title: { absolute: "Project template preview | Esteban Firpo" },
      robots: { index: false, follow: false },
    };
  }

  return {
    metadataBase: SITE_URL,
    title: {
      absolute:
        locale === "en"
          ? `${model.identity.name} template preview | Esteban Firpo`
          : `Prototipo de ${model.identity.name} | Esteban Firpo`,
    },
    description:
      locale === "en"
        ? `Private preview of the unified project page for ${model.identity.name}.`
        : `Preview privado de la ficha unificada de ${model.identity.name}.`,
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
      nosnippet: true,
    },
    alternates: {
      canonical: model.identity.canonicalUrl,
      languages: {
        es: new URL(`/es/proyectos/${slug}`, SITE_URL).toString(),
        en: new URL(`/en/proyectos/${slug}`, SITE_URL).toString(),
        "x-default": new URL(`/es/proyectos/${slug}`, SITE_URL).toString(),
      },
    },
  };
}

export default async function ProjectTemplatePreviewPage({ params }: PreviewPageProps) {
  if (process.env.VERCEL_ENV === "production") notFound();

  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const model = getCanonicalProject(slug, rawLocale);
  if (!model) notFound();

  return <CanonicalProjectPage model={model} />;
}
