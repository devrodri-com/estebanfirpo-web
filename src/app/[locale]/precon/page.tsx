import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PreconstructionPage } from "@/features/preconstruction/PreconstructionPage";
import { isLocale } from "@/i18n/config";
import { createStaticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata(locale, "precon");
}

export default async function Precon({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <PreconstructionPage locale={locale} />;
}
