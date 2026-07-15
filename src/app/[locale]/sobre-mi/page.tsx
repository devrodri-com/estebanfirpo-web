import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AboutEstebanPage } from "@/features/about/AboutEstebanPage";
import { isLocale } from "@/i18n/config";
import { createStaticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata(locale, "sobreMi");
}

export default async function SobreMi({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  setRequestLocale(rawLocale);

  return <AboutEstebanPage locale={rawLocale} />;
}
