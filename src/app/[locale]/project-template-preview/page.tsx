import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/metadata";

type PreviewPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";
  const isEnglish = locale === "en";
  const canonicalPath = `/${locale}/proyectos/the-william`;

  return {
    metadataBase: SITE_URL,
    title: {
      absolute: isEnglish
        ? "The William project template preview | Esteban Firpo"
        : "Prototipo de ficha de The William | Esteban Firpo",
    },
    description: isEnglish
      ? "Private preview of the unified project-page proposal using The William Residences."
      : "Preview privado de la propuesta unificada de ficha usando The William Residences.",
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
      nosnippet: true,
    },
    alternates: {
      canonical: new URL(canonicalPath, SITE_URL).toString(),
      languages: {
        es: new URL("/es/proyectos/the-william", SITE_URL).toString(),
        en: new URL("/en/proyectos/the-william", SITE_URL).toString(),
        "x-default": new URL("/es/proyectos/the-william", SITE_URL).toString(),
      },
    },
  };
}

export default async function ProjectTemplatePreviewPage({ params }: PreviewPageProps) {
  if (process.env.VERCEL_ENV === "production") notFound();

  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  redirect(`/${locale}/project-template-preview/the-william`);
}
