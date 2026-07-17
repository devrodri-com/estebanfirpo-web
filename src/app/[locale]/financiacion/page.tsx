import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { FinancingPage } from "@/features/financing/FinancingPage";
import { isLocale } from "@/i18n/config";
import { createStaticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createStaticPageMetadata(locale, "financiacion");
}

export default async function FinancingRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  setRequestLocale(rawLocale);

  return <FinancingPage locale={rawLocale} />;
}
